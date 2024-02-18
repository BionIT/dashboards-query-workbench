/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import { DataSourcePluginStart } from '../../../src/plugins/data_source/public/types';
import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface WorkbenchPluginSetup {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WorkbenchPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
  dataSource: DataSourcePluginStart;
}
