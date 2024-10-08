import { connect } from 'easy-soft-dva';
import { logConfig } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Ellipsis, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const config1 = {
  line: 1,
  width: transformSize(250),
  height: transformSize(44),
  fontSize: transformSize(28),
  lineHeight: transformSize(44),
  text: '这是一段宽度限制长度的文字，后面的内容会省略。',
  onClick: (o) => {
    logConfig(o, 'ellipsis click');
  },
};

const config2 = {
  line: 2,
  height: transformSize(88),
  fontSize: transformSize(28),
  lineHeight: transformSize(44),
  text: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字,后面的内容会省略。',
  onClick: (o) => {
    logConfig(o, 'ellipsis click');
  },
};

const config21 = {
  line: 2,
  height: transformSize(88),
  fontSize: transformSize(28),
  lineHeight: transformSize(44),
  onClick: (o) => {
    logConfig(o, '时间到');
  },
};

const config3 = {
  line: 3,
  height: transformSize(132),
  fontSize: transformSize(28),
  lineHeight: transformSize(44),
  text: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字,后面的内容会省略。',
  onClick: (o) => {
    logConfig(o, 'ellipsis click');
  },
};

const config4 = {
  line: 2,
  style: {
    height: transformSize(88),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
    backgroundColor: '#ccc',
  },
  onClick: (o) => {
    logConfig(o, 'ellipsis click');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '文字省略',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Ellipsis',
    name: '文字省略',
    description: '文字省略组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      header: '显示一行文字',
      currentConfig: config1,
    };
  }

  establishControlList = () => {
    return [
      {
        header: '显示一行文字',
        config: config1,
      },
      {
        header: '显示两行文字',
        config: config2,
      },
      {
        header: '显示三行文字',
        config: config3,
      },
      {
        header: '自定义样式',
        config: config4,
        inner:
          '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字, 后面的内容会省略。',
      },
      {
        header: '包裹模式',
        config: config21,
        inner:
          '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字, 后面的内容会省略。',
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Ellipsis key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Ellipsis>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Ellipsis"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Ellipsis.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
