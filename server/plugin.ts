/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  ILegacyClusterClient,
} from '../../../src/core/server';

import { WorkbenchPluginSetup, WorkbenchPluginStart } from './types';
import defineRoutes from './routes';
import sqlPlugin from './clusters/sql/sqlPlugin'; 
import { DataSourcePluginSetup } from '../../../src/plugins/data_source/server/types';
import { DataSourceManagementPlugin } from '../../../src/plugins/data_source_management/public/plugin';


export interface WorkbenchPluginSetupDependencies {
  dataSourceManagement: ReturnType<DataSourceManagementPlugin['setup']>;
  dataSource: DataSourcePluginSetup;
}

export class WorkbenchPlugin implements Plugin<WorkbenchPluginSetup, WorkbenchPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup, {dataSource} : WorkbenchPluginSetupDependencies) {
    this.logger.debug('queryWorkbenchDashboards: Setup');
    const router = core.http.createRouter();

    const dataSourceEnabled = !!dataSource;

    let client: ILegacyClusterClient | undefined = undefined;

    if (!dataSourceEnabled) {
      client = core.opensearch.legacy.createClient(
        'query_workbench',
        {
          plugins: [sqlPlugin]
        }
      )
    } else {
      dataSource.registerCustomApiSchema(sqlPlugin)
    }

    // Register server side APIs
    defineRoutes(router, client, core.opensearch, dataSourceEnabled);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('queryWorkbenchDashboards: Started');
    return {};
  }

  public stop() {}
}
