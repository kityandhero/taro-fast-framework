import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { AngleBox, CenterBox } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {
  style: {
    backgroundColor: '#ddd',
    height: transformSize(180),
    width: transformSize(180),
  },
  backgroundColor: 'green',
  angleSize: 80,
  angle: '推荐',
  fontSize: 20,
  onClick: () => {},
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'AngleBox布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'AngleBox',
    name: '角标容器',
    description: '角标容器',
  };

  targetComponentName = 'AngleBox';

  constructor(properties) {
    super(properties, configCore);

    this.state = {
      ...this.state,
      showTransition: true,
      inner: <CenterBox>内部内容</CenterBox>,
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <AngleBox
        key={key}
        {...{
          ...config,
        }}
      >
        {this.buildSimpleItemInner(inner || '内部内容')}
      </AngleBox>
    );
  };
}
