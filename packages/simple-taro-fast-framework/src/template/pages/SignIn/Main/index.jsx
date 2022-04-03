import classNames from 'classnames';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { CenterBox, Avatar } from 'taro-fast-component/es/customComponents';

import BasePageWrapper from '../../BasePageWrapper';

import './index.less';

export const classPrefix = `template-sign-in`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--登录页',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'entrance' });
  };

  renderFurther() {
    return (
      <View className={classNames(classPrefix)}>
        <View className={classNames(`${classPrefix}__logo`)}>
          <CenterBox>
            <View className={classNames(`${classPrefix}__logo__inner`)}>
              <Avatar
                className={classNames(`${classPrefix}__logo__inner__image`)}
                text="图"
              />
            </View>
          </CenterBox>
        </View>
      </View>
    );
  }
}
