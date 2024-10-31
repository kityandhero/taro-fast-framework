import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { ActivityIndicator } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '活动提示器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'ActivityIndicator',
    name: '活动提示器',
    description: '活动提示器组件',
  };

  targetComponentName = 'ActivityIndicator';

  constructor(properties) {
    super(properties, configCore);

    this.state = {
      ...this.state,
      header: '加载提示',
      useWrapper: false,
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { useWrapper } = this.state;

    if (!useWrapper) {
      return (
        <ActivityIndicator key={`${key}_noWrapper`} {...config}>
          {this.buildSimpleItemInner(inner)}
        </ActivityIndicator>
      );
    }

    return (
      <View
        key={`${key}_Wrapper`}
        style={{
          border: 'var(--tfc-1) solid #ccc',
          height: 'var(--tfc-200)',
          position: 'relative',
          width: '100%',
        }}
      >
        <ActivityIndicator {...config}>
          {this.buildSimpleItemInner(inner)}
        </ActivityIndicator>
      </View>
    );
  };
}
