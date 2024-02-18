/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import { ILegacyClusterClient, IRouter, OpenSearchServiceSetup } from '../../../../src/core/server';
import registerTranslateRoute from './translate';
import registerQueryRoute from './query';
import TranslateService from '../services/TranslateService';
import QueryService from '../services/QueryService';


export default function (router: IRouter, client: ILegacyClusterClient | undefined, openSearchServiceSetup: OpenSearchServiceSetup, dataSourceEnabled: boolean) {
  const translateService = new TranslateService(client, dataSourceEnabled);
  registerTranslateRoute(router, translateService, openSearchServiceSetup);

  const queryService = new QueryService(client, dataSourceEnabled);
  registerQueryRoute(router, queryService, openSearchServiceSetup);
}
