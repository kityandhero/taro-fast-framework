import classNames from 'classnames';
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import {
  Avatar,
  Button,
  CenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import BasePageWrapper from '../../BasePageWrapper';

import './index.less';

export const classPrefix = `template-sign-in`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--微信注页',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
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

        <View className={classNames(`${classPrefix}__button`)}>
          <Space direction="vertical" size={30} fillWidth>
            <Button
              text="使用微信进行注册/登录"
              backgroundColor={['#f43f3b', ' #ec008c']}
              block
              circle
              size="middle"
              shape="rounded"
            />

            <Button text="取消" block circle size="middle" shape="rounded" />
          </Space>
        </View>
      </View>
    );
  }
}
