import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Ellipsis, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  line: 1,
  style: {
    width: transformSize(250),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
    height: transformSize(44),
  },
  text: '这是一段宽度限制长度的文字，后面的内容会省略。',
  onClick: () => {
    console.log('ellipsis click');
  },
};

const config2 = {
  line: 2,
  style: {
    height: transformSize(88),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
  },
  text: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字,后面的内容会省略。',
  onClick: () => {
    console.log('ellipsis click');
  },
};

const config21 = {
  line: 2,
  style: {
    height: transformSize(88),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
  },
  onClick: () => {
    console.log('ellipsis click');
  },
};

const config3 = {
  line: 3,
  style: {
    height: transformSize(132),
    fontSize: transformSize(28),
    lineHeight: transformSize(44),
  },
  text: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字,后面的内容会省略。',
  onClick: () => {
    console.log('ellipsis click');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '文字省略',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Ellipsis',
    name: '文字省略',
    description: '文字省略组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '显示一行文字',
        currentConfig: config1,
      },
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
        {inner}
      </Ellipsis>
    );
  };

  renderContent = () => {
    const { header, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
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
