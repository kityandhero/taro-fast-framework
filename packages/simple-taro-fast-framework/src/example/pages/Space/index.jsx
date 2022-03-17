import { View } from '@tarojs/components';

import { Space, Button, Line } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

import './index.less';

const config1 = {
  size: 24,
};

const config2 = {
  size: [8, 26],
  wrap: true,
};

const config3 = {
  direction: 'vertical',
};

const config4 = {
  wrap: true,
};

const config5 = {
  direction: 'vertical',
  fillWidth: true,
};

const config6 = {
  split: <Line direction="vertical" width={2} height={40} />,
};

const config7 = {
  align: 'center',
};

const config8 = {
  align: 'start',
};

const config9 = {
  align: 'end',
};

const config10 = {
  align: 'baseline',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '间隔布局',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Space',
    name: '间隔布局',
    description: '间隔布局组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="默认">
          <Space>
            {new Array(4).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </SimpleBox>

        <SimpleBox header="设定间隔" config={config1}>
          <Space {...config1}>
            {new Array(3).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </SimpleBox>

        <SimpleBox header="自动换行" config={config4}>
          <Space {...config4}>
            {new Array(8).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </SimpleBox>

        <SimpleBox header="设定双向间隔" config={config2}>
          <Space {...config2}>
            {new Array(10).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </SimpleBox>

        <SimpleBox header="设定方向" config={config3}>
          <Space {...config3}>
            {new Array(4).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </SimpleBox>

        <SimpleBox header="设定方向 center" config={config7}>
          <View className="space-align-block">
            <Space {...config7}>
              text
              <Button type="primary">Primary</Button>
              <View className="mock-block">Block</View>
            </Space>
          </View>
        </SimpleBox>

        <SimpleBox header="设定方向 start" config={config8}>
          <View className="space-align-block">
            <Space {...config8}>
              text
              <Button type="primary">Primary</Button>
              <View className="mock-block">Block</View>
            </Space>
          </View>
        </SimpleBox>

        <SimpleBox header="设定方向 end" config={config9}>
          <View className="space-align-block">
            <Space {...config9}>
              text
              <Button type="primary">Primary</Button>
              <View className="mock-block">Block</View>
            </Space>
          </View>
        </SimpleBox>

        <SimpleBox header="设定方向 end" config={config10}>
          <View className="space-align-block">
            <Space {...config10}>
              text
              <Button type="primary">Primary</Button>
              <View className="mock-block">Block</View>
            </Space>
          </View>
        </SimpleBox>

        <SimpleBox header="占满父级宽度" config={config5}>
          <Space {...config5}>
            {new Array(3).fill(null).map((_, index) => (
              <Button key={index} block color="primary" size="large">
                Button
              </Button>
            ))}
          </Space>
        </SimpleBox>

        <SimpleBox header="自定义间隔" config={config6}>
          <Space {...config6}>
            {new Array(3).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </SimpleBox>

        <PropertyBox config={Space.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
