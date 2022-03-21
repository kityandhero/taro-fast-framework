import { InputItem, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

function afterChange(v) {
  console.log(v);
}

const config1 = {
  value: '1',
  afterChange,
};

const config111 = {
  value: '1',
  border: false,
  afterChange,
};

const config2 = {
  value: '1',
  label: '手机号',
  afterChange,
};

const config3 = {
  value: '1',
  label: '手机号',
  required: true,
  afterChange,
};

const config4 = {
  label: '用户名',
  labelStyle: {
    color: 'red',
  },
  afterChange,
};

const config5 = {
  label: '用户名',
  align: 'right',
  border: false,
  afterChange,
};

const config6 = {
  label: '用户名',
  clearable: true,
  afterChange,
};

const config7 = {
  label: '用户名',
  hidden: true,
  afterChange,
};

const config8 = {
  label: '用户名',
  extra: '扩展部分',
  afterChange,
};

const config9 = {
  label: '密码',
  password: true,
  afterChange,
};

const config10 = {
  label: '用户名',
  placeholder: '请输入用户名',
  afterChange,
};

const config11 = {
  label: '用户名',
  placeholder: '请输入用户名',
  placeholderStyle: { color: '#45e325' },
  afterChange,
};

const config12 = {
  label: '用户名',
  disabled: true,
  afterChange,
};

const config13 = {
  label: '用户名',
  maxlength: 5,
  afterChange,
};

const config14 = {
  label: '用户名',
  confirmType: 'go',
  afterChange,
};

const config15 = {
  label: '用户名',
  afterChange,
  onFocus: () => {
    console.log('onFocus');
  },
};

const config16 = {
  label: '用户名',
  afterChange,
  onBlur: () => {
    console.log('onBlur');
  },
};

const config17 = {
  label: '用户名',
  afterChange,
  onConfirm: () => {
    console.log('onConfirm');
  },
};

const config18 = {
  label: '用户名',
  afterChange,
  onKeyboardHeightChange: () => {
    console.log('onKeyboardHeightChange');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '输入项',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'InputItem',
    name: '输入项',
    description: '输入项组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="基础"
          config={config1}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config1} />
        </SimpleBox>

        <SimpleBox
          header="无下划线"
          config={config111}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config111} />
        </SimpleBox>

        <SimpleBox
          header="设置标签"
          config={config2}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config2} />
        </SimpleBox>

        <SimpleBox
          header="必填项"
          config={config3}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config3} />
        </SimpleBox>

        <SimpleBox
          header="标签样式"
          config={config4}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config4} />
        </SimpleBox>

        <SimpleBox
          header="输入右对齐"
          config={config5}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config5} />
        </SimpleBox>

        <SimpleBox
          header="可清除"
          config={config6}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config6} />
        </SimpleBox>

        <SimpleBox
          header="设置隐藏"
          config={config7}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox
        >
          <InputItem {...config7} />
        </SimpleBox>

        <SimpleBox
          header="Extra"
          config={config8}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config8} />
        </SimpleBox>

        <SimpleBox
          header="密码模式"
          config={config9}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config9} />
        </SimpleBox>

        <SimpleBox
          header="占位提示"
          config={config10}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config10} />
        </SimpleBox>

        <SimpleBox
          header="占位提示样式"
          config={config11}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config11} />
        </SimpleBox>

        <SimpleBox
          header="禁用模式"
          config={config12}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config12} />
        </SimpleBox>

        <SimpleBox
          header="最大输入长度"
          config={config13}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config13} />
        </SimpleBox>

        <SimpleBox
          header="确认文字"
          config={config14}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config14} />
        </SimpleBox>

        <SimpleBox
          header="获取焦点事件"
          config={config15}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config15} />
        </SimpleBox>

        <SimpleBox
          header="失去焦点事件"
          config={config16}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config16} />
        </SimpleBox>

        <SimpleBox
          header="onConfirm"
          config={config17}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config17} />
        </SimpleBox>

        <SimpleBox
          header="键盘高度变更事件"
          config={config18}
          space={false}
          componentName="InputItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <InputItem {...config18} />
        </SimpleBox>

        <PropertyBox config={InputItem.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
