import { Line, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  width: 400,
};

const config2 = {
  height: 12,
};

const config3 = {
  color: '#45672e',
};

const config4 = {
  color: ['#45672e', '#01e456', '#de1245'],
  height: 12,
};

const config5 = {
  direction: 'vertical',
  width: 4,
  height: 40,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '线条',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Line',
    name: '线条',
    description: '线条组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="水平线"
          componentName="Line"
          mockChildren={false}
          useInnerBox
        >
          <Line />
        </SimpleBox>

        <SimpleBox
          header="设置宽度"
          config={config1}
          componentName="Line"
          mockChildren={false}
          useInnerBox
        >
          <Line {...config1} />
        </SimpleBox>

        <SimpleBox
          header="设置高度"
          config={config2}
          componentName="Line"
          mockChildren={false}
          useInnerBox
        >
          <Line {...config2} />
        </SimpleBox>

        <SimpleBox
          header="设置颜色"
          config={config3}
          componentName="Line"
          mockChildren={false}
          useInnerBox
        >
          <Line {...config3} />
        </SimpleBox>

        <SimpleBox
          header="颜色渐变"
          config={config4}
          componentName="Line"
          mockChildren={false}
          useInnerBox
        >
          <Line {...config4} />
        </SimpleBox>

        <SimpleBox
          header="垂直线"
          config={config5}
          componentName="Line"
          mockChildren={false}
          useInnerBox
        >
          <Line {...config5} />
        </SimpleBox>

        <PropertyBox config={Line.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
