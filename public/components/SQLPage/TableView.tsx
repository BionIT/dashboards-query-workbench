/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiEmptyPrompt, EuiIcon, EuiTreeView } from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { CoreStart } from '../../../../../src/core/public';
import { ON_LOAD_QUERY } from '../../../common/constants';
import { getJobId, pollQueryStatus } from './utils';

interface CustomView {
  http: CoreStart['http'];
  selectedItems: any[];
}

export const TableView = ({ http, selectedItems }: CustomView) => {
  const [tablenames, setTablenames] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [childData, setChildData] = useState<string[]>([]);
  const [selectedChildNode, setSelectedChildNode] = useState<string | null>(null);
  const [indexData, setIndexedData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [indiciesData, setIndiciesData] = useState<string []>([]);

  const get_async_query_results = (id, http, callback) => {
    pollQueryStatus(id, http, callback);
  };

  const getSidebarContent = () => {
    if (selectedItems[0].label == 'OpenSearch') {
      setTablenames([]);
      const query = { query: ON_LOAD_QUERY };
      http
        .post(`/api/sql_console/sqlquery`, {
          body: JSON.stringify(query),
        })
        .then((res) => {
          const responseObj = res.data.resp ? JSON.parse(res.data.resp) : '';
          const datarows: any[][] = _.get(responseObj, 'datarows');
          const fields = datarows.map((data) => {
            return data[2];
          });
          setTablenames(fields);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setTablenames([]);
      const query = {
        lang: 'sql',
        query: `SHOW SCHEMAS IN ${selectedItems[0]['label']}`,
        datasource: selectedItems[0]['label'],
      };
      getJobId(query, http, (id) => {
        get_async_query_results(id, http, (data) => {
          setTablenames(data);
        });
      });
    }
  };

  useEffect(() => {
    getSidebarContent();
  }, [selectedItems[0]['label']]);

  const handleNodeClick = (nodeLabel: string) => {
    setSelectedNode(nodeLabel);
    const query = {
      lang: 'sql',
      query: `SHOW TABLES IN ${selectedItems[0]['label']}.${nodeLabel}`,
      datasource: selectedItems[0]['label'],
    };
    getJobId(query, http, (id) => {
      get_async_query_results(id, http, (data) => {
        data = data.map((subArray) => subArray[1]);
        setChildData(data);
      });
    });
  };

  const callCoverQuery = (nodeLabel1: string) => {
    const coverQuery = {
      lang: 'sql',
      query: `SHOW INDEX ON ${selectedItems[0]['label']}.${selectedNode}.${nodeLabel1}`,
      datasource: selectedItems[0]['label'],
    };
    getJobId(coverQuery, http, (id) => {
      get_async_query_results(id, http, (data) => {
        data = [].concat(...data)
        indiciesData.push(data)
        setIndexedData(indiciesData);
      });
    });
  };
  const handleChildClick = (nodeLabel1: string) => {
    setSelectedChildNode(nodeLabel1);
    const skipQuery = {
      lang: 'sql',
      query: `DESC SKIPPING INDEX ON ${selectedItems[0]['label']}.${selectedNode}.${nodeLabel1}`,
      datasource: selectedItems[0]['label'],
    };
    getJobId(skipQuery, http, (id) => {
      get_async_query_results(id, http, (data) => {
        if (data.length > 0) {
            indiciesData.push('skip_index');
          callCoverQuery(nodeLabel1);
        }
      });
    });
  };

  const treeData = tablenames.map((database, index) => ({
    label: <div>{database}</div>,
    icon: <EuiIcon type="database" size="m" />,
    id: 'element_' + index,
    callback: () => {
      setChildData([]);
      setIsLoading(true);
      handleNodeClick(database);
    },
    isSelectable: true,
    isExpanded: true,
    children:
      selectedNode === database
        ? childData.map((table) => ({
            label: <div>{table}</div>,
            id: `${database}_${table}`,
            icon: <EuiIcon type="tableDensityCompact" size="s" />,
            callback: () => {
              setIndexedData([]);
              handleChildClick(table);
            },
            sSelectable: true,
            isExpanded: true,
            children:
              selectedChildNode === table
                ? indexData.map((indexChild) => ({
                    label: indexChild,
                    id: `${table}_${indexChild}`,
                    icon: <EuiIcon type="bolt" size="s" />,
                  }))
                : undefined,
          }))
        : undefined,
  }));

  return (
    <>
      {treeData.length > 0 ? (
        <EuiTreeView aria-label="Sample Folder Tree" items={treeData} />
      ) : (
        <EuiEmptyPrompt
          iconType="alert"
          iconColor="danger"
          title={<h2>Error loading Datasources</h2>}
        />
      )}
    </>
  );
};