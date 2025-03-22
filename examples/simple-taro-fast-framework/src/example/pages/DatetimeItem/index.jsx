import { connect } from 'easy-soft-dva';
import { logConsole } from 'easy-soft-utility';

import { DatetimeItem } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {
  afterChange: (o) => {
    logConsole(o, 'afterChange');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '日期时间项',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'DatetimeItem',
    name: '日期时间项',
    description: '日期时间项组件',
  };

  targetComponentName = 'DatetimeItem';

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
      <DatetimeItem key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </DatetimeItem>
    );
  };
}
