import { connect } from 'easy-soft-dva';

import {
  ActivityIndicator,
  ColorText,
  Divider,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const { IconSearch } = Icon;

const config1 = {
  contentPosition: 'left',
};

const config2 = {
  contentPosition: 'right',
};

const config3 = {
  lineColor: '#1677ff',
};

const config4 = {
  lineWidth: 20,
};

const config5 = {
  lineStyle: 'dashed',
};

const config6 = {
  lineStyle: 'dotted',
};

const config7 = {
  padding: 10,
};

const config8 = {
  height: 60,
};

const config9 = {
  style: {
    color: '#1677ff',
    borderColor: '#1677ff',
    borderStyle: 'dashed',
  },
};

const config10 = {
  style: {
    color: '#1677ff',
    borderColor: '#1677ff',
    borderStyle: 'dashed',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '间隔线',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Divider',
    name: '间隔线',
    description: '间隔线组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认',
        currentConfig: {},
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认',
        config: {},
      },
      {
        header: '含有内容',
        config: {},
        inner: '默认内容在中间',
      },
      {
        header: '方向 left',
        config: config1,
        inner: '内容',
      },
      {
        header: '方向 right',
        config: config2,
        inner: '内容',
      },
      {
        header: '设定颜色',
        config: config3,
        inner: '内容',
      },
      {
        header: '设定线宽度',
        config: config4,
        inner: '内容',
      },
      {
        header: '线条类型 dashed',
        config: config5,
        inner: '内容',
      },
      {
        header: '线条类型 dotted',
        config: config6,
        inner: '内容',
      },
      {
        header: '设定上下间距',
        config: config7,
        inner: '内容',
      },
      {
        header: '设定内容高度',
        config: config8,
        inner: '内容',
      },
      {
        header: '包裹组件 图标文字',
        config: config9,
        inner: <ColorText icon={<IconSearch size={32} />} text="搜索" />,
      },
      {
        header: '包裹组件 活动指示器',
        config: config10,
        inner: <ActivityIndicator content="加载中" />,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Divider key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Divider>
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
          componentName="Divider"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Divider.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
