import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import {
  ColorText,
  IconShoppingCart,
  IconSketch,
  RadioPopup,
  Space,
  Tag,
} from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const radioOptions1 = [
  {
    label: '单选项一',
    value: 'option1',
    extra: '扩展说明',
  },
  {
    label: '单选项二',
    value: 'option2',
    extra: '扩展说明',
  },
  {
    label: '单选项三',
    value: 'option3',
    extra: '扩展说明',
  },
];

const radioOptions3 = [
  {
    label: '单选项一',
    value: 'option1',
    title: '选项的标题',
    description: '单选项的简介描述',
    prefix: <IconShoppingCart size={34} />,
    extra: '扩展说明',
  },
  {
    label: '单选项二',
    value: 'option2',
    title: '选项的标题',
    description: '单选项的简介描述',
    prefix: <IconSketch size={34} />,
    extra: '扩展说明',
  },
  {
    label: '单选项三禁用',
    value: 'option3',
    title: '选项的标题',
    description: '单选项的简介描述',
    disabled: true,
    prefix: <IconSketch size={34} />,
    extra: '扩展说明',
  },
];

const configCore = {
  viewBuilder: (o) => {
    console.log(o);

    return <View>视图部分-已选值- {o || '未选择'}</View>;
  },
  afterChange: (v, o) => {
    console.log({ v, o });
  },
};

const config1 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  options: radioOptions1,
};

const config2 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  options: radioOptions1,
};

const config3 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  options: radioOptions1,
  valueFormat: (v) => {
    return <Tag color="success">{v}</Tag>;
  },
};

const config4 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  options: radioOptions1,
};

const config5 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  arc: true,
  options: radioOptions1,
};

const config6 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  border: false,
  options: radioOptions1,
};

const config7 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  border: false,
  options: radioOptions1,
  position: 'center',
};

const config8 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  showClose: false,
  options: radioOptions1,
};

const config9 = {
  ...configCore,
  placeholder: '请选择类别',
  value: '',
  showClose: false,
  options: radioOptions3,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '自定义弹出式单选',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'RadioPopup',
    name: '自定义弹出式单选',
    description: '自定义弹出式单选组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      header: '默认展示',
      currentConfig: config1,
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认展示',
        config: config1,
      },
      {
        header: '内嵌容器',
        config: config2,
        inner: <ColorText color="red" text="类别" />,
      },
      {
        header: '格式化值',
        config: config3,
      },
      {
        header: '变化后触发',
        config: config4,
      },
      {
        header: '弧形边角',
        config: config5,
      },
      {
        header: '无底线',
        config: config6,
      },
      {
        header: '面色面板居中',
        config: config7,
      },
      {
        header: '隐藏关闭按钮',
        config: config8,
      },
      {
        header: '复杂选项',
        config: config9,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <RadioPopup key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </RadioPopup>
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
          componentName="RadioPopup"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={RadioPopup.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
