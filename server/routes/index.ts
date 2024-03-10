/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import { ILegacyClusterClient, IRouter, Logger, OpenSearchServiceSetup } from '../../../../src/core/server';
import registerTranslateRoute from './translate';
import registerQueryRoute from './query';
import TranslateService from '../services/TranslateService';
import QueryService from '../services/QueryService';


export default function (router: IRouter, client: ILegacyClusterClient | undefined, openSearchServiceSetup: OpenSearchServiceSetup, dataSourceEnabled: boolean, logger: Logger) {
  const translateService = new TranslateService(client, dataSourceEnabled, logger);
  registerTranslateRoute(router, translateService, openSearchServiceSetup);

  const queryService = new QueryService(client, dataSourceEnabled, logger);
  registerQueryRoute(router, queryService, openSearchServiceSetup);
}
