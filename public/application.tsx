/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { WorkbenchApp } from './components/app';
import { DataSourceManagementPluginSetup } from '../../../src/plugins/data_source_management/public';

export const renderApp = (
  { notifications, http, chrome, savedObjects }: CoreStart,
  { navigation, dataSource }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters,
  dataSourceManagement: DataSourceManagementPluginSetup
) => {
  ReactDOM.render(
    <WorkbenchApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      chrome={chrome}
      savedObjects={savedObjects}
      dataSourceEnabled={!!dataSource}
      dataSourceManagement={dataSourceManagement}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
