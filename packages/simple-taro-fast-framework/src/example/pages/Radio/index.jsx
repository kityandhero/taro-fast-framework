import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Radio,
  Icon,
  Button,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const radioOptions1 = [
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

const radioOptions2 = [
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

const radioOptions3 = [
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
  options: radioOptions1,
  value: '',
};

const config2 = {
  header: '无边框',
  style: style,
  border: false,
  options: radioOptions1,
  value: '',
};

const config3 = {
  header: '扩展栏',
  style: style,
  border: true,
  options: radioOptions1,
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
  options: radioOptions1,
  value: '',
  strip: true,
  stripLeft: 2,
  stripWidth: 6,
  stripColor: '#3378f4',
};

const config5 = {
  header: '自定义选中图标',
  style,
  options: radioOptions1,
  value: '',
  iconCheck: <IconCheckCircle size={44} color="#1677ff" />,
  iconUncheck: <IconCheckCircle size={44} color="#ccc" />,
};

const config6 = {
  header: '含有单项描述',
  style,
  options: radioOptions2,
  value: '',
};

const config7 = {
  header: '单项禁用',
  style,
  options: radioOptions3,
  value: '',
};

const config8 = {
  layout: 'column',
  options: radioOptions1,
  value: '',
};

const config9 = {
  layout: 'column',
  options: radioOptions2,
  value: '',
  columns: 2,
  columnGap: 12,
};

const config10 = {
  layout: 'space',
  spaceSize: 24,
  options: radioOptions1,
  value: '',
};

const config11 = {
  header: 'radio布局',
  layout: 'radio',
  options: radioOptions1,
  value: '',
};

const config12 = {
  header: 'radio布局 自定义选中图标',
  layout: 'radio',
  options: radioOptions1,
  value: '',
  iconCheck: <IconCheckCircle size={44} color="#1677ff" />,
  iconUncheck: <IconCheckCircle size={44} color="#ccc" />,
};

const config13 = {
  header: 'radio布局 含有单项描述',
  style,
  layout: 'radio',
  options: radioOptions2,
  value: '',
};

const config14 = {
  header: 'radio布局 单项禁用',
  style,
  layout: 'radio',
  options: radioOptions3,
  value: '',
};

const config15 = {
  header: 'radio布局 更改回调',
  style,
  layout: 'radio',
  options: radioOptions3,
  value: '',
  afterChange: (v) => {
    console.log({
      message: `值已更改为:${v}`,
    });
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '单选',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Radio',
    name: '单选',
    description: '单选组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        radioValue1: 'option1',
        radioValue2: 'option1',
        radioValue3: 'option2',
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
      <Radio key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Radio>
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
          componentName="Radio"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['extra', 'prefix']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Radio.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
