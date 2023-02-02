import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import {
  Button,
  ColorText,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const { IconSearch } = Icon;

const colorList = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'cyan',
  'blue',
  'purple',
  'mauve',
  'pink',
  'brown',
  'grey',
  'gray',
  'black',
];

const configCore = {
  text: '按钮',
};

const config0 = {
  ...configCore,
};

const config1 = {
  ...configCore,
  weappButton: true,
};

const config2 = {
  ...configCore,
  style: {
    width: transformSize(280),
  },
  backgroundColor: ['#f43f3b', ' #ec008c'],
};

const config211 = {
  ...configCore,
  fontColor: '#e1e111',
  icon: <IconSearch size={38} />,
};

const config212 = {
  fontColor: '#e1e111',
  icon: <IconSearch size={38} />,
};

const config3 = {
  ...configCore,
  style: {
    width: transformSize(180),
  },
  backgroundColor: '#45e209',
};

const config31 = {
  ...configCore,
  style: {
    width: transformSize(180),
  },
  fontColor: '#fff',
  backgroundColor: '#45e209',
};

const config5 = {
  ...configCore,
  backgroundColor: 'blue',
  fill: 'solid',
};

const config6 = {
  ...configCore,
  backgroundColor: 'blue',
  fill: 'outline',
};

const config7 = {
  ...configCore,
  backgroundColor: 'blue',
  fill: 'none',
};

const config8 = {
  ...configCore,
  size: 'mini',
  backgroundColor: 'purple',
};

const config9 = {
  ...configCore,
  size: 'small',
  backgroundColor: 'purple',
};

const config10 = {
  ...configCore,
  size: 'middle',
  backgroundColor: 'purple',
};

const config11 = {
  ...configCore,
  size: 'large',
  backgroundColor: 'purple',
};

const config12 = {
  ...configCore,
  block: true,
  size: 'small',
};

const config13 = {
  ...configCore,
  block: true,
  size: 'small',
};

const config14 = {
  ...configCore,
  block: true,
  size: 'middle',
};

const config15 = {
  ...configCore,
  block: true,
  size: 'large',
};

const config16 = {
  ...configCore,
  block: true,
  size: 'large',
  ripple: true,
};

const config17 = {
  ...configCore,
  disabled: true,
  backgroundColor: 'blue',
};

const config18 = {
  ...configCore,
  backgroundColor: 'blue',
  loading: true,
  loadingType: 'comet',
  loadingText: '加载中',
};

const config19 = {
  ...configCore,
  loading: true,
  loadingMode: 'overlay',
};

const config20 = {
  ...configCore,
  shape: 'default',
  backgroundColor: 'blue',
};

const config21 = {
  ...configCore,
  shape: 'rounded',
  backgroundColor: 'olive',
};

const config22 = {
  ...configCore,
  shape: 'rectangular',
  backgroundColor: 'pink',
};

const config23 = {
  ...configCore,
  shape: 'default',
  backgroundColor: 'blue',
  paddingTop: 2,
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20,
};

const config24 = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '按钮',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Button',
    name: '按钮',
    description: '按钮组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '普通按钮',
        currentConfig: config0,
      },
    };
  }

  establishColorList = () => {
    return colorList.map((item) => {
      return {
        header: `内置颜色 - ${item}`,
        config: {
          ...configCore,
          style: {
            width: transformSize(180),
          },
          backgroundColor: item,
          fill: 'solid',
        },
      };
    });
  };

  establishControlList = () => {
    return [
      {
        header: '普通按钮',
        config: config0,
      },
      ...this.establishColorList(),
      {
        header: '自定义颜色',
        config: config3,
      },
      {
        header: '设置文字颜色',
        config: config31,
      },
      {
        header: '渐变色',
        config: config2,
      },
      {
        header: '微信按钮模式',
        config: config1,
      },
      {
        header: '附带图标',
        config: config211,
      },
      {
        header: '仅图标',
        config: config212,
      },
      {
        header: '填充模式 solid',
        config: config5,
      },
      {
        header: '填充模式 outline',
        config: config6,
      },
      {
        header: '填充模式 none',
        config: config7,
      },
      {
        header: '大小 mini',
        config: config8,
      },
      {
        header: '大小 small',
        config: config9,
      },
      {
        header: '大小 middle',
        config: config10,
      },
      {
        header: '大小 large',
        config: config11,
      },
      {
        header: '块级按钮 mini',
        config: config12,
      },
      {
        header: '块级按钮 small',
        config: config13,
      },
      {
        header: '块级按钮 middle',
        config: config14,
      },
      {
        header: '块级按钮 large',
        config: config15,
      },
      {
        header: '涟漪效果',
        config: config16,
      },
      {
        header: '禁用状态',
        config: config17,
      },
      {
        header: '加载中',
        config: config18,
      },
      {
        header: '加载中 overlay',
        config: config19,
      },
      {
        header: '形状 default',
        config: config20,
      },
      {
        header: '形状 rounded',
        config: config21,
      },
      {
        header: '形状 rectangular',
        config: config22,
      },
      {
        header: '自定义间距边框',
        config: config23,
      },
      {
        header: '包裹模式',
        config: config24,
        inner: <ColorText icon={<IconSearch size={38} />} text="搜索" />,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Button key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Button>
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
          componentName="Button"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Button.defaultProps} labelWidth={300} />
      </Space>
    );
  };
}
