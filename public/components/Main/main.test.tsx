/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { httpClientMock } from '../../../test/mocks';
import {
  mockDataSelectQuery,
  mockHttpQuery
} from '../../../test/mocks/mockData';
import { Main } from './main';

const setBreadcrumbsMock = jest.fn();

jest.mock('../../dependencies/register_observability_dependencies', () => ({
  getRenderAccelerationDetailsFlyout: jest.fn(() => jest.fn()),
  getRenderCreateAccelerationFlyout: jest.fn(() => jest.fn()),
  setRenderAccelerationDetailsFlyout: jest.fn(() => jest.fn()),
  setRenderCreateAccelerationFlyout: jest.fn(() => jest.fn()),
}));

jest.mock('../../framework/catalog_cache_refs', () => ({
  catalogCacheRefs: {
    CatalogCacheManager: {
      addOrUpdateAccelerationsByDataSource: () => ({
        dbCache: { status: 'empty' },
      }),
      getOrCreateDataSource: () => ({
        dsCache: { status: 'empty' },
      }),
    },
    useLoadDatabasesToCache: () => ({
      loadStatus: 'Scheduled',
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
    }),
    useLoadTablesToCache: () => ({
      loadStatus: 'Scheduled',
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
    }),
    useLoadTableColumnsToCache: () => ({
      loadStatus: 'Scheduled',
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
    }),
    useLoadAccelerationsToCache: () => ({
      loadStatus: 'Scheduled',
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
    }),
  },
}));

describe('<Main /> spec', () => {
  // it('renders the component', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);
  //   const asyncTest = () => {
  //     render(<Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  // it('renders the component and toggles ppl', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const pplButton = getByText('PPL');
  //   const asyncTest = () => {
  //     fireEvent.click(pplButton);
  //   };
  //   waitFor(() => {
  //     asyncTest();
  //   });
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  // it('renders the component and checks if Opensearch is selected', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDataSelectQuery);
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock}/>
  //   );
  //   expect(getByText('Indexes')).toBeInTheDocument();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  // it('renders the component and checks if Opensearch is selected', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDataSelectQuery);
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock}/>
  //   );
  //   fireEvent.click(getByText('Data source Connections'));
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  it('renders the component and checks if Data source connections is selected', async () => {
    const client = httpClientMock;
    client.post = jest.fn().mockResolvedValue(mockHttpQuery);
    client.get = jest.fn().mockResolvedValue(mockDataSelectQuery);
    const { getByText } = await render(
      <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
    );
    
    // client.get = jest.fn().mockResolvedValue(mockDataSelectQuery);
    const mockOnSelect = jest.fn();
    
    await waitFor(() => {
      expect(getByText('Data source Connections')).toBeInTheDocument();
  

    });
    const dataSourceButton = getByText('Data source Connections');
    const asyncTest = () => {
      fireEvent.click(dataSourceButton);
    };
    waitFor(() => {
      asyncTest();
    });

    // await waitFor(() => {
    //   fireEvent.click(getByText('Data source Connections'));
    // });

    
    // fireEvent.click(getByText('Data source Connections'));
    // await waitFor(() => {
    //   expect(getByText('OpenSearch Folder Tree')).toBeInTheDocument();
    // });
    
    //   expect(getByText('glue_1')).toBeInTheDocument();
    // fireEvent.click(getByText('Select data source Connection'));
    expect(document.body.children[0]).toMatchSnapshot();
  });
  // it('renders the component and checks if Opensearch is selected', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   expect(getByText('OpenSearch')).toBeInTheDocument();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  // it('renders the component and s3 glue component is present', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDataSelectQuery);
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   expect(getByText('OpenSearch')).toBeInTheDocument();
  //   fireEvent.click(getByText('OpenSearch'));
  //   await waitFor(() => {
  //     expect(getByText('glue_1')).toBeInTheDocument();
  //   });
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  // it('renders the component for s3 glue and check sample query button ', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDataSelectQuery);
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   await waitFor(() => {
  //     expect(getByText('OpenSearch')).toBeInTheDocument();
  //   });
  //   fireEvent.click(getByText('OpenSearch'));
  //   fireEvent.click(getByText('glue_1'));
  //   await waitFor(() => {
  //     expect(getByText('Sample Query')).toBeInTheDocument();
  //   });
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
  // it('renders the component and checks if side tree is loaded', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockHttpQuery);
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);

  //   client.post = jest.fn(() => {
  //     return (Promise.resolve(mockOpenSearchIndicies) as unknown) as HttpResponse;
  //   });
  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );

  //   await waitFor(() => {
  //     expect(getByText('.kibana_1')).toBeInTheDocument();
  //   });

  //   expect(document.body.children[0]).toMatchSnapshot();
  // });

  // it('click run button, and response is ok', async () => {
  //   const client = httpClientMock;
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);
  //   client.post = jest.fn().mockResolvedValue(mockQueryResultJDBCResponse);

  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const onRunButton = getByText('Run');
  //   const asyncTest = () => {
  //     fireEvent.click(onRunButton);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });

  // it('click run button, response fills null and missing values', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockResolvedValue(mockResultWithNull);
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);

  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const onRunButton = getByText('Run');
  //   const asyncTest = () => {
  //     fireEvent.click(onRunButton);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });

  // it('click run button, and response causes an error', async () => {
  //   const client = httpClientMock;
  //   client.post = jest.fn().mockRejectedValue('err');
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);

  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const onRunButton = getByText('Run');
  //   const asyncTest = () => {
  //     fireEvent.click(onRunButton);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });

  // it('click run button, and response is not ok', async () => {
  //   let postRequestFlag = 0;
  //   const client = httpClientMock;
  //   client.post = jest.fn(() => {
  //     if (postRequestFlag > 0)
  //       return Promise.resolve((mockNotOkQueryResultResponse as unknown) as HttpResponse);
  //     else {
  //       postRequestFlag = 1;
  //       return Promise.resolve((mockOpenSearchTreeQuery as unknown) as HttpResponse);
  //     }
  //   });
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);

  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const onRunButton = getByText('Run');
  //   const asyncTest = () => {
  //     fireEvent.click(onRunButton);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });

  // it('click translation button, and response is ok', async () => {
  //   let postRequestFlag = 0;
  //   const client = httpClientMock;
  //   client.post = jest.fn(() => {
  //     if (postRequestFlag > 0)
  //       return Promise.resolve((mockQueryTranslationResponse as unknown) as HttpResponse);
  //     else {
  //       postRequestFlag = 1;
  //       return Promise.resolve((mockOpenSearchTreeQuery as unknown) as HttpResponse);
  //     }
  //   });

  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const onTranslateButton = getByText('Explain');
  //   const asyncTest = () => {
  //     fireEvent.click(onTranslateButton);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });

  // it('click clear button', async () => {
  //   const client = httpClientMock;
  //   client.get = jest.fn().mockResolvedValue(mockDatasourcesQuery);
  //   client.post = jest.fn(() => {
  //     return Promise.resolve((mockOpenSearchTreeQuery as unknown) as HttpResponse);
  //   });

  //   const { getByText } = await render(
  //     <Main httpClient={client} setBreadcrumbs={setBreadcrumbsMock} />
  //   );
  //   const onClearButton = getByText('Clear');
  //   const asyncTest = () => {
  //     fireEvent.click(onClearButton);
  //   };
  //   await asyncTest();
  //   expect(document.body.children[0]).toMatchSnapshot();
  // });
});
