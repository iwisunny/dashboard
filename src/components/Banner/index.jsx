import React, { PureComponent } from 'react';

import Input from '../Base/Input';
import styles from './index.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.banner}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            Application Management Platform on Multi-Cloud Environment.
          </div>
          <Input.Search className={styles.search} placeholder="Search apps in Pitrix"/>
        </div>
      </div>
    );
  }
}
