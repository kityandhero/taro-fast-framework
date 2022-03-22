import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Icon,
  StepperItem,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconSketch } = Icon;

function onChangeCore(v) {
  console.log(v);
}

const config1 = {
  label: '购买数量',
  border: false,
  onChange: onChangeCore,
};

const config2 = {
  label: '购买数量',
  description: '请增减购买数量',
  clickable: true,
  arrow: true,
  onChange: onChangeCore,
};

const config3 = {
  label: '购买数量',
  disabled: true,
};

const config4 = {
  label: '购买数量',
  stepperStyle: {
    // '--border': `${transformSize(1)} solid #f5f5f5`,
    '--border-inner': 'none',
    '--height': transformSize(36),
    '--input-width': transformSize(70),
    '--input-background-color': '#ffffff',
  },
  iconSize: 20,
  operateColor: '#fff',
  backgroundColor: '#a123e4',
  circle: true,
  defaultValue: 45,
  step: 1,
};

const config5 = {
  ...{
    prefix: <IconSketch size={36} />,
    description: '请增减购买数量',
    clickable: true,
    arrow: true,
  },
  ...config4,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '进步项',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'StepperItem',
    name: '进步项',
    description: '进步项组件',
  };

  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="基础用法"
          config={config1}
          space={false}
          componentName="StepperItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <StepperItem {...config1} />
        </SimpleBox>
        <SimpleBox
          header="复杂布局"
          config={config2}
          space={false}
          componentName="StepperItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <StepperItem {...config2} />
        </SimpleBox>
        <SimpleBox
          header="禁用状态"
          config={config3}
          space={false}
          componentName="StepperItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <StepperItem {...config3} />
        </SimpleBox>
        <SimpleBox
          header="自定义样式"
          config={config4}
          space={false}
          componentName="StepperItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <StepperItem {...config4} />
        </SimpleBox>

        <SimpleBox
          header="复杂配置"
          config={config5}
          space={false}
          componentName="StepperItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <StepperItem prefix={<IconSketch size={36} />} {...config5} />
        </SimpleBox>

        <PropertyBox config={StepperItem.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
