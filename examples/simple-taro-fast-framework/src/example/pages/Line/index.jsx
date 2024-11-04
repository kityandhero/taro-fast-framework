import { connect } from 'easy-soft-dva';

import { Line } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '线条',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'Line',
    name: '线条',
    description: '线条组件',
  };

  targetComponentName = 'Line';

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
      <Line key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Line>
    );
  };
}
