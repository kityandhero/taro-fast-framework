import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { isEmptyArray, logConsole } from 'easy-soft-utility';

import {
  CheckBoxPopup,
  ColorText,
  IconShoppingCart,
  IconSketch,
  Space,
  Tag,
} from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const checkBoxOptions1 = [
  {
    label: '复选项一',
    value: 'option1',
    extra: '扩展说明',
  },
  {
    label: '复选项二',
    value: 'option2',
    extra: '扩展说明',
  },
  {
    label: '复选项三',
    value: 'option3',
    extra: '扩展说明',
  },
];

const checkBoxOptions3 = [
  {
    label: '复选项一',
    value: 'option1',
    title: '选项的标题',
    description: '复选项的简介描述',
    prefix: <IconShoppingCart size={34} />,
    extra: '扩展说明',
  },
  {
    label: '复选项二',
    value: 'option2',
    title: '选项的标题',
    description: '复选项的简介描述',
    prefix: <IconSketch size={34} />,
    extra: '扩展说明',
  },
  {
    label: '复选项三禁用',
    value: 'option3',
    title: '选项的标题',
    description: '复选项的简介描述',
    disabled: true,
    prefix: <IconSketch size={34} />,
    extra: '扩展说明',
  },
];

const configCore = {
  viewBuilder: (value, option) => {
    logConsole(
      {
        value,
        option,
      },
      'viewBuilder',
    );

    // const o = option.map((one) => {
    //   const { label } = {
    //     label: '',
    //     ...one,
    //   };

    //   return label;
    // });

    return (
      <View>
        视图部分-已选值- {isEmptyArray(value) ? '未选择' : value.join(',')}
      </View>
    );
  },
};

const config1 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  options: checkBoxOptions1,
};

const config2 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  options: checkBoxOptions1,
};

const config3 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  options: checkBoxOptions1,
  valueFormat: (v) => {
    return (
      <Space>
        {v.map((o, index) => {
          return (
            <Tag key={`list_${index}`} color="success">
              {o}
            </Tag>
          );
        })}
      </Space>
    );
  },
};

const config4 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  options: checkBoxOptions1,
  afterChange: (v) => {
    console.log(v);
  },
};

const config5 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  arc: true,
  options: checkBoxOptions1,
};

const config6 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  border: false,
  options: checkBoxOptions1,
};

const config7 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  border: false,
  options: checkBoxOptions1,
  position: 'center',
};

const config8 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  showClose: false,
  options: checkBoxOptions1,
};

const config9 = {
  ...configCore,
  placeholder: '请选择类别',
  value: [],
  showClose: false,
  options: checkBoxOptions3,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '自定义弹出式复选',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'CheckBox',
    name: '自定义弹出式复选',
    description: '自定义弹出式复选组件',
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
      <CheckBoxPopup key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </CheckBoxPopup>
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
          componentName="CheckBoxPopup"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={CheckBoxPopup.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
