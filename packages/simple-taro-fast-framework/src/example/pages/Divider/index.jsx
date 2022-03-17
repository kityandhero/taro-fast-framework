import { Text } from '@tarojs/components';

import {
  Divider,
  Space,
  Icon,
  ActivityIndicator,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconSearch } = Icon;
const { buildDivider } = Divider;

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Divider',
    name: '间隔线',
    description: '间隔线组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="默认"
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider />
        </SimpleBox>

        <SimpleBox
          header="含有内容"
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider>默认内容在中间</Divider>
        </SimpleBox>

        <SimpleBox
          header="方向 left"
          config={config1}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config1}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="方向 right"
          config={config2}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config2}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="设定颜色"
          config={config3}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config3}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="设定线宽度"
          config={config4}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config4}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="线条类型 dashed"
          config={config5}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config5}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="线条类型 dotted"
          config={config6}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config6}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="设定上下间距"
          config={config7}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config7}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="设定内容高度"
          config={config8}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config8}>内容</Divider>
        </SimpleBox>

        <SimpleBox
          header="附带图标"
          config={config9}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config9}>
            <Space>
              <IconSearch size={32} />
              <Text>搜索</Text>
            </Space>
          </Divider>
        </SimpleBox>

        <SimpleBox
          header="附带图标"
          config={config10}
          componentName="Divider"
          mockChildren={false}
          useInnerBox={false}
        >
          <Divider {...config10}>
            <ActivityIndicator content="加载中" />
          </Divider>
        </SimpleBox>

        <SimpleBox header="buildDivider">
          {buildDivider({
            contentPosition: 'left',
            style: {
              color: '#1677ff',
              borderColor: '#1677ff',
              borderStyle: 'dashed',
            },
            icon: <IconSearch size={32} />,
            text: '搜索',
          })}
        </SimpleBox>

        <PropertyBox config={Divider.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
