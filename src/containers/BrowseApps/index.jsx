import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Nav from 'components/Nav';
import AppList from 'components/AppList';
import styles from './index.scss';

@inject(({ rootStore }) => ({
  appStore: rootStore.appStore,
  config: rootStore.config,
}))
@observer
export default class BrowseApps extends Component {
  static async onEnter({ appStore }) {
    await appStore.fetchApps();
  }

  render() {
    const { config, appStore } = this.props;

    return (
      <div className={styles.browse}>
        <Nav className={styles.nav} navs={config.navs}/>
        <AppList className={styles.apps} apps={appStore.apps} fold/>
      </div>
    );
  }
}
