import { connect } from 'easy-soft-dva';
import { logConsole } from 'easy-soft-utility';

import {
  Calendar,
  calendarSelectModeCollection,
} from 'taro-fast-component-extra';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInitialCurrentData, buildInteractiveConfigList } from './tools';

const configCore = {
  selectMode: calendarSelectModeCollection.single,
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
    id: 'Calendar',
    name: '日期时间选择',
    description: '日期时间选择器组件',
  };

  targetComponentName = 'Calendar';

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
      <Calendar key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Calendar>
    );
  };
}
