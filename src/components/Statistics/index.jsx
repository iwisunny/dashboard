import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from 'components/Base';
import Histogram from './Histogram';
import Progress from './Progress';
import styles from './index.scss';
import { getStasTotal, getTopTotal, getProgress, getHistograms } from 'utils';

export default class Statistics extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    iconName: PropTypes.string,
    total: PropTypes.number,
    centerName: PropTypes.string,
    progressTotal: PropTypes.number,
    progress: PropTypes.object,
    histograms: PropTypes.object,
    objs: PropTypes.array
  };

  static defaultProps = {
    iconName: 'appcenter'
  };

  render() {
    const {
      name,
      iconName,
      total,
      centerName,
      progressTotal,
      progress,
      histograms,
      objs
    } = this.props;

    const topList = getProgress(progress);
    const lastList = getHistograms(histograms);
    const topTotal = getTopTotal(topList);
    const lastedTotal = getStasTotal(histograms);

    return (
      <div className={styles.statistics}>
        <div className={styles.wrap}>
          <div className={styles.module}>
            <div className={styles.apps}>
              <Icon name={iconName} size="medium" className={styles.icon} type={'light'} />
              {name}
            </div>
            <div className={styles.word}>
              <div className={styles.name}>Total</div>
              <div className={styles.number}>{total}</div>
            </div>
          </div>

          <div className={styles.module}>
            <div className={styles.word}>
              <div className={styles.name}>{centerName}</div>
              <div className={styles.number}>{progressTotal}</div>
            </div>
            {topList && <Progress progress={topList} total={topTotal} type={name} objs={objs} />}
          </div>

          <div className={styles.module}>
            <div className={styles.word}>
              <div className={styles.name}>Lasted 2 Weeks</div>
              <div className={styles.number}>{lastedTotal}</div>
            </div>
            {lastList && <Histogram histograms={lastList} total={lastedTotal} />}
          </div>
        </div>
      </div>
    );
  }
}
