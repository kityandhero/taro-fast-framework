import { connect } from 'easy-soft-dva';

import { Link } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '链接',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'Link',
    name: '链接',
    description: '链接组件',
  };

  targetComponentName = 'Link';

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
      <Link key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Link>
    );
  };
}
