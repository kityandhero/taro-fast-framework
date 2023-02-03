import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Button, CheckBox, Icon, Space } from 'taro-fast-component';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';
import { cardStyle } from '../../../customConfig/constants';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

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

const checkBoxOptions2 = [
  {
    label: '复选项一',
    value: 'option1',
    description: '复选项描述一',
    extra: '扩展说明',
  },
  {
    label: '复选项二',
    value: 'option2',
    description: '复选项描述二',
    extra: '扩展说明',
  },
  {
    label: '复选项三',
    value: 'option3',
    description: '复选项描述三',
    extra: '扩展说明',
    span: 2,
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

const config1 = {
  header: '基础用法',
  style: style,
  options: checkBoxOptions1,
  value: '',
};

const config2 = {
  header: '无边框',
  style: style,
  border: false,
  options: checkBoxOptions1,
  value: '',
};

const config3 = {
  header: '扩展栏',
  style: style,
  border: true,
  options: checkBoxOptions1,
  value: '',
  extra: (
    <Button
      style={{ marginRight: transformSize(10) }}
      size="mini"
      fill="outline"
      onClick={() => {
        console.log('checkbox extra click');
      }}
    >
      扩展
    </Button>
  ),
};

const config4 = {
  header: 'Header Strip',
  style: style,
  border: true,
  options: checkBoxOptions1,
  value: '',
  strip: true,
  stripLeft: 2,
  stripWidth: 6,
  stripColor: '#3378f4',
};

const config5 = {
  header: '自定义选中图标',
  style,
  options: checkBoxOptions1,
  value: '',
  iconCheck: <IconCheckCircle size={44} color="#1677ff" />,
  iconUncheck: <IconCheckCircle size={44} color="#ccc" />,
};

const config6 = {
  header: '含有单项描述',
  style,
  options: checkBoxOptions2,
  value: '',
};

const config7 = {
  header: '单项禁用',
  style,
  options: checkBoxOptions3,
  value: '',
};

const config8 = {
  layout: 'column',
  options: checkBoxOptions1,
  value: '',
};

const config9 = {
  layout: 'column',
  options: checkBoxOptions2,
  value: '',
  columns: 2,
  columnGap: 12,
};

const config10 = {
  layout: 'space',
  spaceSize: 24,
  options: checkBoxOptions1,
  value: '',
};

const config11 = {
  header: 'checkBox布局',
  layout: 'checkBox',
  options: checkBoxOptions1,
  value: '',
};

const config12 = {
  header: 'checkBox布局 自定义选中图标',
  layout: 'checkBox',
  options: checkBoxOptions1,
  value: '',
  iconCheck: <IconCheckCircle size={44} color="#1677ff" />,
  iconUncheck: <IconCheckCircle size={44} color="#ccc" />,
};

const config13 = {
  header: 'checkBox布局 含有单项描述',
  style,
  layout: 'checkBox',
  options: checkBoxOptions2,
  value: '',
};

const config14 = {
  header: 'checkBox布局 单项禁用',
  style,
  layout: 'checkBox',
  options: checkBoxOptions3,
  value: '',
};

const config15 = {
  header: 'checkBox布局 更改回调',
  style,
  layout: 'checkBox',
  options: checkBoxOptions3,
  value: '',
  afterChange: (v) => {
    console.log({
      message: `值已更改为:${v.join()}`,
    });
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '复选',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'CheckBox',
    name: '复选',
    description: '复选组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        checkBoxValue1: ['option1'],
        checkBoxValue2: ['option1'],
        checkBoxValue3: ['option2'],
        header: '基础用法',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础用法',
        config: config1,
      },
      {
        header: '无边框',
        config: config2,
      },
      {
        header: '扩展栏',
        config: config3,
      },
      {
        header: 'Header Strip',
        config: config4,
      },
      {
        header: '自定义选中图标',
        config: config5,
      },
      {
        header: '含有单项描述',
        config: config6,
      },
      {
        header: '单项禁用',
        config: config7,
      },
      {
        header: 'column布局 默认',
        config: config8,
      },
      {
        header: 'column布局 2列',
        config: config9,
      },
      {
        header: 'space布局',
        config: config10,
      },
      {
        span: 2,
        header: 'checkBox布局',
        config: config11,
      },
      {
        span: 2,
        header: 'checkBox布局 自定义选中图标',
        config: config12,
      },
      {
        span: 2,
        header: 'checkBox布局 含有单项描述',
        config: config13,
      },
      {
        span: 2,
        header: 'checkBox布局 单项禁用',
        config: config14,
      },
      {
        span: 2,
        header: 'checkBox布局 更改回调',
        config: config15,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <CheckBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </CheckBox>
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
          componentName="CheckBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['extra', 'prefix']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={CheckBox.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
