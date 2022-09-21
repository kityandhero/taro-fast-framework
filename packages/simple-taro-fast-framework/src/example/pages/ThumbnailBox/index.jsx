import { View } from '@tarojs/components';

import { Space, ThumbnailBox } from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const boxStyle = {
  backgroundColor: '',
};

const contentText =
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字';

const config1 = {
  expandText: '展开',
  shrinkText: '收缩',
};

const config2 = {
  repeatShrink: true,
};

const config3 = {
  height: 400,
  repeatShrink: true,
};

const config4 = {
  backgroundColor: 'blue',
  repeatShrink: true,
};

const config5 = {
  actionBackgroundColor: 'blue',
  repeatShrink: true,
};

const config6 = {
  actionColor: 'green',
  repeatShrink: true,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '缩略容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ThumbnailBox',
    name: '缩略容器',
    description: '缩略容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '简单使用',
        currentConfig: {},
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '简单使用',
        config: {},
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
      {
        header: '设置文字',
        config: config1,
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
      {
        header: '可收缩',
        config: config2,
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
      {
        header: '设置收缩高度',
        config: config3,
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
      {
        header: '背景',
        config: config4,
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
      {
        header: '操作栏背景',
        config: config5,
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
      {
        header: '操作栏颜色',
        config: config6,
        wrapBuilder: (o) => {
          return <View style={boxStyle}>{o}</View>;
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <ThumbnailBox key={key} {...config}>
        {this.buildSimpleItemInner(inner || contentText)}
      </ThumbnailBox>
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
          componentName="ThumbnailBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={ThumbnailBox.defaultProps} labelWidth={310} />
      </Space>
    );
  };
}
