import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { logConsole } from 'easy-soft-utility';

import { DatetimePicker } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInitialCurrentData, buildInteractiveConfigList } from './tools';

const configCore = {
  viewBuilder: (o) => {
    const { integrityValue } = o;

    return <View>视图部分-已选值- {integrityValue || '未选择'}</View>;
  },
  afterChange: (o) => {
    logConsole(o, 'afterChange');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '日期时间选择',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'DatetimePicker',
    name: '日期时间选择',
    description: '日期时间选择器组件',
  };

  targetComponentName = 'DatetimePicker';

  constructor(properties) {
    super(properties, configCore, buildInitialCurrentData());

    this.state = {
      ...this.state,
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <DatetimePicker key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </DatetimePicker>
    );
  };
}
