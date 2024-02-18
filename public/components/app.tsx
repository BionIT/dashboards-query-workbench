/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { I18nProvider } from '@osd/i18n/react';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { EuiPage, EuiPageBody } from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { Main } from './Main';

interface WorkbenchAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  chrome: CoreStart['chrome'];
  savedObjects: CoreStart['savedObjects'];
  dataSourceEnabled: boolean;
}

export const WorkbenchApp = ({
  basename,
  notifications,
  http,
  navigation,
  chrome,
  savedObjects,
  dataSourceEnabled,
}: WorkbenchAppDeps) => {
  return (
    <HashRouter>
      <I18nProvider>
        <div>
          <EuiPage>
            <EuiPageBody>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Main
                      httpClient={http}
                      {...props}
                      setBreadcrumbs={chrome.setBreadcrumbs}
                      isAccelerationFlyoutOpen={false}
                      urlDataSource=""
                      notifications={notifications}
                      savedObjects={savedObjects}
                      dataSourceEnabled={dataSourceEnabled}
                    />
                  )}
                />
                <Route
                  exact
                  path="/:dataSource"
                  render={(props) => (
                    <Main
                      httpClient={http}
                      {...props}
                      setBreadcrumbs={chrome.setBreadcrumbs}
                      isAccelerationFlyoutOpen={false}
                      urlDataSource={props.match.params.dataSource}
                      notifications={notifications}
                      savedObjects={savedObjects}
                      dataSourceEnabled={dataSourceEnabled}
                    />
                  )}
                />
                <Route
                  exact
                  path="/accelerate/:dataSource"
                  render={(props) => (
                    <Main
                      httpClient={http}
                      {...props}
                      setBreadcrumbs={chrome.setBreadcrumbs}
                      isAccelerationFlyoutOpen={true}
                      urlDataSource={props.match.params.dataSource}
                      notifications={notifications}
                      savedObjects={savedObjects}
                      dataSourceEnabled={dataSourceEnabled}
                    />
                  )}
                />
              </Switch>
            </EuiPageBody>
          </EuiPage>
        </div>
      </I18nProvider>
    </HashRouter>
  );
};
