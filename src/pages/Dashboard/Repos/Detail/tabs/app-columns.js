import React from 'react';
import { Translation } from 'react-i18next';
import { get } from 'lodash';

import TdName from 'components/TdName';
import Status from 'components/Status';
import TimeShow from 'components/TimeShow';
import { getObjName, mappingStatus } from 'utils';
import routes, { toRoute } from 'routes';

export default function (users) {
  return [
    {
      title: <Translation>{t => <span>{t('App Name')}</span>}</Translation>,
      key: 'name',
      width: '165px',
      render: item => (
        <TdName
          name={item.name}
          description={item.app_id}
          image={item.icon || 'appcenter'}
          linkUrl={toRoute(routes.portal.appDetail, {
            appId: item.app_id
          })}
        />
      )
    },
    {
      title: (
        <Translation>{t => <span>{t('Latest Version')}</span>}</Translation>
      ),
      key: 'latest_version',
      width: '100px',
      render: item => get(item, 'latest_app_version.name', '')
    },
    {
      title: <Translation>{t => <span>{t('Status')}</span>}</Translation>,
      key: 'status',
      width: '100px',
      render: item => (
        <Status type={item.status} name={mappingStatus(item.status)} />
      )
    },
    {
      title: <Translation>{t => <span>{t('Categories')}</span>}</Translation>,
      key: 'category',
      render: item => (
        <Translation>
          {t => t(
            get(item, 'category_set', [])
              .filter(cate => cate.category_id && cate.status === 'enabled')
              .map(cate => cate.name)
              .join(', ')
          )
          }
        </Translation>
      )
    },
    {
      title: <Translation>{t => <span>{t('Developer')}</span>}</Translation>,
      key: 'owner',
      render: item => getObjName(users, 'user_id', item.owner, 'username') || item.owner
    },
    {
      title: <Translation>{t => <span>{t('Updated At')}</span>}</Translation>,
      key: 'status_time',
      width: '95px',
      render: item => <TimeShow time={item.status_time} />
    }
  ];
}
