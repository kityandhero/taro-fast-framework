import { connect } from 'easy-soft-dva';

import { Avatar } from 'taro-fast-component';

import logoImg from '../../../assets/images/logo.png';
import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {
  image: logoImg,
  onClick: () => {},
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '头像',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'Avatar',
    name: '头像',
    description: '头像组件',
  };

  configCore = configCore;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      header: '头像',
      currentConfig: configCore,
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Avatar key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Avatar>
    );
  };
}
