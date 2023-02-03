import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { ColorText, MultiLineText, Space } from 'taro-fast-component';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const longText =
  '长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本';

const config1 = {
  text: longText,
};

const config2 = {
  text: longText,
  style: { color: 'green' },
};

const config3 = {
  text: longText,
  lineHeight: 50,
};

const config4 = {
  text: longText,
  fontSize: 40,
  lineHeight: 50,
};

const config5 = {
  text: longText,
  prefixStyle: {
    backgroundColor: 'red',
    padding: `${transformSize(4)} ${transformSize(6)}`,
  },
  prefix: <ColorText text="前缀" />,
  lineHeight: 36,
};

const config6 = {
  text: longText,
  suffixStyle: {
    backgroundColor: 'red',
    padding: `${transformSize(4)} ${transformSize(6)}`,
  },
  suffix: <ColorText text="后缀" />,
  lineHeight: 36,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '多行文本',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'MultiLineText',
    name: '多行文本',
    description: '多行文本组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '仅文字',
        config: config1,
      },
      {
        header: '设置样式',
        config: config2,
      },
      {
        header: '设置行高',
        config: config3,
      },
      {
        header: '设置字体大小',
        config: config4,
      },
      {
        header: '前缀',
        config: config5,
      },
      {
        header: '后缀',
        config: config6,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <MultiLineText key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </MultiLineText>
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
          componentName="MultiLineText"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['prefix', 'suffix']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={MultiLineText.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
