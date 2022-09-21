import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Avatar, Badge, Space } from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const innerComponent = <Avatar text="图" />;

const config1 = {
  content: '5',
};

const config11 = {
  content: '5',
  fontSize: 30,
};

const config2 = {
  dot: true,
};

const config21 = {
  dot: true,
  dotSize: 30,
};

const config3 = {
  content: '新',
  color: '#108ee9',
};

const config4 = {
  content: '99+',
  style: { border: `${transformSize(1)} solid green` },
};

const config5 = {
  dot: true,
  color: '#108ee9',
  position: 'topLeft',
};

const config6 = {
  dot: true,
  color: '#87d068',
  position: 'topRight',
};

const config7 = {
  dot: true,
  position: 'bottomLeft',
};

const config8 = {
  dot: true,
  color: 'orange',
  position: 'bottomRight',
};

const config9 = {
  content: '99+',
};

const config10 = {
  content: '5',
  wrapCenter: true,
  wrapStyle: {
    padding: transformSize(20),
  },
  wrapHeight: 20,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '徽记',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Badge',
    name: '徽记',
    description: '徽记组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '文字',
        currentConfig: config1,
        inner: innerComponent,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '文字',
        config: config1,
        inner: innerComponent,
      },
      {
        header: '文字大小',
        config: config11,
        inner: innerComponent,
      },
      {
        header: '设置颜色',
        config: config3,
        inner: innerComponent,
      },
      {
        header: '设置样式',
        config: config4,
        inner: innerComponent,
      },
      {
        header: '圆点',
        config: config2,
        inner: innerComponent,
      },
      {
        header: '圆点大小',
        config: config21,
        inner: innerComponent,
      },
      {
        header: '位于左上角',
        config: config5,
        inner: innerComponent,
      },
      {
        header: '位于右上角',
        config: config6,
        inner: innerComponent,
      },
      {
        header: '位于左下角',
        config: config7,
        inner: innerComponent,
      },
      {
        header: '位于右下角',
        config: config8,
        inner: innerComponent,
      },
      {
        header: '单独使用',
        config: config9,
      },
      {
        header: '内层包裹',
        config: config10,
        inner: innerComponent,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Badge key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Badge>
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
          componentName="Badge"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Badge.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
