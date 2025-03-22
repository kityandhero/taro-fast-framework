import { connect } from 'easy-soft-dva';
import { logConsole } from 'easy-soft-utility';

import { DatetimeRangePicker } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {
  defaultValue: ['', ''],
  afterChange: (o) => {
    logConsole(o, 'afterChange');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '日期时间范围选择器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'DatetimeRangePicker',
    name: '日期时间范围选择器',
    description: '日期时间范围选择器组件',
  };

  targetComponentName = 'DatetimeRangePicker';

  constructor(properties) {
    super(properties, configCore);

    this.state = {
      ...this.state,
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <DatetimeRangePicker key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </DatetimeRangePicker>
    );
  };
}
