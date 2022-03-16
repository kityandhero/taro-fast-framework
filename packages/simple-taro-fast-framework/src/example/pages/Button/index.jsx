import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Space,
  Button,
  Icon,
  ColorText,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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

const config1 = {
  weappButton: true,
};

const config2 = {
  fill: 'solid',
};

const config3 = {
  backgroundColor: ['#f43f3b', ' #ec008c'],
};

const config4 = {
  backgroundColor: '#45e209',
};

const config5 = {
  backgroundColor: 'blue',
  fill: 'solid',
};

const config6 = {
  backgroundColor: 'blue',
  fill: 'outline',
};

const config7 = {
  backgroundColor: 'blue',
  fill: 'none',
};

const config8 = {
  size: 'mini',
  backgroundColor: 'purple',
};

const config9 = {
  size: 'small',
  backgroundColor: 'purple',
};

const config10 = {
  size: 'middle',
  backgroundColor: 'purple',
};

const config11 = {
  size: 'large',
  backgroundColor: 'purple',
};

const config12 = {
  block: true,
  size: 'mini',
};

const config13 = {
  block: true,
  size: 'small',
};

const config14 = {
  block: true,
  size: 'middle',
};

const config15 = {
  block: true,
  size: 'large',
};

const config16 = {
  block: true,
  size: 'large',
  ripple: true,
};

const config17 = {
  disabled: true,
  backgroundColor: 'blue',
};

const config18 = {
  backgroundColor: 'blue',
  loading: true,
  loadingType: 'comet',
  loadingText: '加载中',
};

const config19 = {
  loading: true,
  loadingMode: 'overlay',
};

const config20 = {
  shape: 'default',
  backgroundColor: 'blue',
};

const config21 = {
  shape: 'rounded',
  backgroundColor: 'olive',
};

const config22 = {
  shape: 'rectangular',
  backgroundColor: 'pink',
};

const config23 = {
  shape: 'default',
  backgroundColor: 'blue',
  paddingTop: 2,
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '按钮',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Button',
    name: '按钮',
    description: '按钮组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="普通按钮">
          <Button>按钮</Button>
        </SimpleBox>

        <SimpleBox header="微信按钮" config={config1}>
          <Button {...config1}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="内置颜色 附带阴影" config={config2}>
          <Space wrap size={16}>
            {colorList.map((o, i) => {
              return (
                <Button
                  key={`${i}`}
                  style={{
                    width: transformSize(180),
                  }}
                  backgroundColor={o}
                  {...config2}
                >
                  {o}
                </Button>
              );
            })}
          </Space>
        </SimpleBox>

        <SimpleBox header="渐变色" config={config3}>
          <Space wrap size={16}>
            <Button
              style={{
                width: transformSize(280),
              }}
              backgroundColor={['#f43f3b', ' #ec008c']}
            >
              gradual-red
            </Button>
            <Button
              style={{
                width: transformSize(280),
              }}
              backgroundColor={['#ff9700', ' #ed1c24']}
            >
              gradual-orange
            </Button>
            <Button
              style={{
                width: transformSize(280),
              }}
              backgroundColor={['#39b54a', ' #8dc63f']}
            >
              yellow-green
            </Button>
            <Button
              style={{
                width: transformSize(280),
              }}
              backgroundColor={['#9000ff', ' #5e00ff']}
            >
              olive-purple
            </Button>
            <Button
              style={{
                width: transformSize(280),
              }}
              backgroundColor={['#ec008c', ' #6739b6']}
            >
              gradual-pink
            </Button>
            <Button
              style={{
                width: transformSize(280),
              }}
              backgroundColor={['#0081ff', ' #1cbbb4']}
            >
              gradual-blue
            </Button>
          </Space>
        </SimpleBox>

        <SimpleBox header="设置颜色" config={config4}>
          <Space wrap size={16}>
            <Button backgroundColor="#45e209">Solid</Button>
            <Button backgroundColor="#99a2a9">Outline</Button>
            <Button backgroundColor="#a5ee0f">None</Button>{' '}
          </Space>
        </SimpleBox>

        <SimpleBox header="填充模式 solid" config={config5}>
          <Button {...config5}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="填充模式 outline" config={config6}>
          <Button {...config6}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="填充模式 none" config={config7}>
          <Button {...config7}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="大小 mini" config={config8}>
          <Button {...config8}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="大小 small" config={config9}>
          <Button {...config9}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="大小 middle" config={config10}>
          <Button {...config10}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="大小 large" config={config11}>
          <Button {...config11}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="块级按钮 mini" config={config12}>
          <Button {...config12}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="块级按钮 mini" config={config13}>
          <Button {...config13}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="块级按钮 mini" config={config14}>
          <Button {...config14}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="块级按钮 mini" config={config15}>
          <Button {...config15}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="涟漪效果" config={config16}>
          <Button {...config16}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="禁用状态" config={config17}>
          <Button {...config17}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="加载中" config={config18}>
          <Button {...config18}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="加载中" config={config18}>
          <Button {...config18}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="加载中 overlay" config={config19}>
          <Button {...config19}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="图标">
          <Button>
            <ColorText icon={<IconSearch size={38} />} text="搜索" />
          </Button>
        </SimpleBox>

        <SimpleBox header="形状 default" config={config20}>
          <Button {...config20}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="形状 rounded" config={config21}>
          <Button {...config21}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="形状 rectangular" config={config22}>
          <Button {...config22}>按钮</Button>
        </SimpleBox>

        <SimpleBox header="自定义间距边框" config={config23}>
          <Button {...config23}>按钮</Button>
        </SimpleBox>

        <PropertyBox config={Button.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
