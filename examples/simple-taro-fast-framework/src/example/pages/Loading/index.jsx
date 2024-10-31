import { connect } from 'easy-soft-dva';

import { Loading } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '加载提示',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'Loading',
    name: '加载提示',
    description: '加载提示组件',
  };

  targetComponentName = 'Loading';

  constructor(properties) {
    super(properties, configCore);

    this.state = {
      ...this.state,
      header: '基础使用',
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Loading key={key} {...config}>
        {this.buildSimpleItemInner(inner || '内部内容')}
      </Loading>
    );
  };
}
