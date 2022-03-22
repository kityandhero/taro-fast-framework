import {
  showInfoMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { Stepper, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

function onChangeCore(v) {
  console.log(v);
}

const config1 = {
  defaultValue: 1,
  onChange: onChangeCore,
};

const config3 = {
  step: 10,
  defaultValue: 10,
  onChange: onChangeCore,
};

const config4 = {
  min: -5,
  max: 5,
  onChange: onChangeCore,
};

const config5 = {
  digits: 0,
  onChange: onChangeCore,
};

const config6 = {
  digits: 1,
  step: 0.1,
  onChange: onChangeCore,
};

const config7 = {
  disabled: true,
};

const config8 = {
  inputReadOnly: true,
};

const config9 = {
  style: {
    width: transformSize(260),
  },
  defaultValue: 10000,
  step: 10000,
  onChange: onChangeCore,
};

const config10 = {
  operateColor: '#a923e1',
  defaultValue: 30,
  step: 1,
};

const config11 = {
  useBackground: false,
  defaultValue: 30,
  step: 1,
};

const config12 = {
  operateColor: '#fff',
  backgroundColor: '#a123e4',
  circle: true,
  defaultValue: 30,
  step: 1,
};

const config13 = {
  onFocus: () => {
    showInfoMessage({
      message: '获得焦点',
    });
  },
  onBlur: () => {
    showInfoMessage({
      message: '失去焦点',
    });
  },
};

const config14 = {
  style: {
    '--border': `${transformSize(1)} solid #f5f5f5`,
    '--border-inner': 'none',
    '--height': transformSize(36),
    '--input-width': transformSize(70),
    '--input-background-color': '#ffffff',
    width: transformSize(180),
  },
  defaultValue: 10000,
  step: 10000,
};

const config15 = {
  style: {
    '--border-inner': 'none',
    '--height': transformSize(36),
    '--input-width': transformSize(70),
    '--input-background-color': '#ffffff',
  },
  iconSize: 22,
  operateColor: '#fff',
  backgroundColor: '#a123e4',
  circle: true,
  defaultValue: 45,
  step: 1,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '进步器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Stepper',
    name: '进步器',
    description: '进步器组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="基础用法"
          config={config1}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config1} />
        </SimpleBox>

        <SimpleBox
          header="步长设置"
          config={config3}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config3} />
        </SimpleBox>

        <SimpleBox
          header="设置输入范围"
          config={config4}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config4} />
        </SimpleBox>

        <SimpleBox
          header="格式化到整数"
          config={config5}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config5} />
        </SimpleBox>

        <SimpleBox
          header="格式化到一位小数"
          config={config6}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config6} />
        </SimpleBox>

        <SimpleBox
          header="禁用状态"
          config={config7}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config7} />
        </SimpleBox>

        <SimpleBox
          header="输入框只读状态"
          config={config8}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config8} />
        </SimpleBox>

        <SimpleBox
          header="自定义宽度"
          config={config9}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config9} />
        </SimpleBox>

        <SimpleBox
          header="自定义颜色"
          config={config10}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config10} />
        </SimpleBox>

        <SimpleBox
          header="无背景模式"
          config={config11}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config11} />
        </SimpleBox>

        <SimpleBox
          header="圆形轮廓"
          config={config12}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config12} />
        </SimpleBox>

        <SimpleBox
          header="获得/失去焦点"
          config={config13}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config13} />
        </SimpleBox>

        <SimpleBox
          header="自定义css变量"
          config={config14}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config14} />
        </SimpleBox>

        <SimpleBox
          header="复杂配置"
          config={config15}
          componentName="Stepper"
          mockChildren={false}
          useInnerBox
        >
          <Stepper {...config15} />
        </SimpleBox>

        <PropertyBox config={Stepper.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}
