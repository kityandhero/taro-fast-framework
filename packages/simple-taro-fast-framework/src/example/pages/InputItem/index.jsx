import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Icon, IconCheckCircle, InputItem, Space } from 'taro-fast-component';

import logoImage from '../../../assets/images/logo.png';
import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

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

const config113 = {
  value: '1',
  label: '手机号',
  borderTopDistance: 20,
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
    fontSize: transformSize(30),
  },
  icon: <Icon value={logoImage} size={30} imageMode />,
  afterChange,
};

const config41 = {
  label: '用户名',
  borderColor: 'red',
  afterChange,
};

const config42 = {
  label: '用户名',
  labelAlign: 'right',
  afterChange,
};

const config5 = {
  label: '用户名',
  align: 'right',
  border: false,
  afterChange,
};

const config51 = {
  label: '用户名',
  inputStyle: {
    color: 'red',
  },
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

const config112 = {
  required: true,
  label: '用户名',
  description: '填写用户的名称, 例如 李明',
  icon: <IconCheckCircle size={38} showInfo color="green" />,
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

const config19 = {
  required: true,
  layout: 'vertical',
  label: '用户名',
  description: '填写用户的名称, 例如 李明',
  icon: <IconCheckCircle size={38} showInfo color="green" />,
  placeholder: '请输入用户名',
  placeholderStyle: { color: '#45e325' },
};

const config191 = {
  required: true,
  layout: 'vertical',
  label: '描述',
  description: '填写用户的名称, 例如 李明',
  areaMode: true,
  icon: <IconCheckCircle size={38} showInfo color="green" />,
  placeholder: '请输入用户名',
  placeholderStyle: { color: '#45e325' },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '输入项',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'InputItem',
    name: '输入项',
    description: '输入项组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基础使用',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础使用',
        config: config1,
      },
      {
        header: '无下划线',
        config: config111,
      },
      {
        header: '下划线上间距',
        config: config113,
      },
      {
        header: '设置标签',
        config: config2,
      },
      {
        header: '必填项',
        config: config3,
      },
      {
        header: '标签样式',
        config: config4,
      },
      {
        header: '标签右对齐',
        config: config42,
      },
      {
        header: '底线颜色',
        config: config41,
      },
      {
        header: '输入右对齐',
        config: config5,
      },
      {
        header: '输入栏样式',
        config: config51,
      },
      {
        header: '可清除',
        config: config6,
      },
      {
        header: '设置隐藏',
        config: config7,
      },
      {
        header: 'Extra',
        config: config8,
      },
      {
        header: '密码模式',
        config: config9,
      },
      {
        header: '占位提示',
        config: config10,
      },
      {
        header: '占位提示样式',
        config: config11,
      },
      {
        header: '复杂配置',
        config: config112,
      },
      {
        header: '垂直布局',
        config: config19,
      },
      {
        header: '禁用模式',
        config: config12,
      },
      {
        header: '最大输入长度',
        config: config13,
      },
      {
        header: '文本域模式',
        config: config191,
      },
      {
        header: '确认文字',
        config: config14,
      },
      {
        header: '获取焦点事件',
        config: config15,
      },
      {
        header: '失去焦点事件',
        config: config16,
      },
      {
        header: 'onConfirm',
        config: config17,
      },
      {
        header: '键盘高度变更事件',
        config: config18,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <InputItem key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </InputItem>
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
          componentName="InputItem"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'extra']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={InputItem.defaultProps} labelWidth={350} />
      </Space>
    );
  };
}
