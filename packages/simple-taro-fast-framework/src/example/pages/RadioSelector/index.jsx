import {
  Icon,
  RadioSelector,
  Tag,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import CodeBox from '../../../customComponents/CodeBox';

const { IconSketch, IconShoppingCart } = Icon;

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

const radioOptions2 = [
  {
    label: '单选项一',
    value: 'option1',
    description: '单选项描述一',
    extra: '扩展说明',
  },
  {
    label: '单选项二',
    value: 'option2',
    description: '单选项描述二',
    extra: '扩展说明',
  },
  {
    label: '单选项三',
    value: 'option3',
    description: '单选项描述三',
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

const config1 = {
  placeholder: '请选择类别',
  value: radioOptions1[0].value,
  options: radioOptions1,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '弹出式单选',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'RadioSelector',
    name: '弹出式单选',
    description: '弹出式单选组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        radioValue1: 'option1',
        radioValue2: 'option1',
        radioValue3: '',
      },
    };
  }

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="下侧面板视图" space={false}>
          <RadioSelector {...config1}>类别</RadioSelector>

          <RadioSelector
            placeholder="请选择类别"
            value={this.state.radioValue1}
            valueFormat={(v) => {
              return <Tag color="default">{v}</Tag>;
            }}
            options={radioOptions1}
          >
            类别 [格式化值]
          </RadioSelector>

          <RadioSelector
            placeholder="请选择目标"
            value={this.state.radioValue2}
            arc
            options={radioOptions2}
          >
            目标
          </RadioSelector>

          <RadioSelector
            placeholder="请选择产地"
            showClose={false}
            border={false}
            value={this.state.radioValue3}
            options={radioOptions3}
          >
            产地
          </RadioSelector>
        </SimpleBox>

        <SimpleBox header="弹出面板视图" space={false}>
          <RadioSelector
            placeholder="请选择类别"
            position="center"
            value={this.state.radioValue1}
            options={radioOptions1}
          >
            类别
          </RadioSelector>

          <RadioSelector
            placeholder="请选择目标"
            position="center"
            value={this.state.radioValue2}
            arc
            options={radioOptions2}
          >
            目标
          </RadioSelector>

          <RadioSelector
            placeholder="请选择产地"
            position="center"
            showClose={false}
            border={false}
            value={this.state.radioValue3}
            options={radioOptions3}
          >
            产地
          </RadioSelector>
        </SimpleBox>

        <SimpleBox header="更改回调" space={false}>
          <RadioSelector
            placeholder="请选择类别"
            border={false}
            value={this.state.radioValue1}
            options={radioOptions1}
            afterChange={(value) => {
              this.bannerNotify({
                message: `值已更改为:${value}`,
              });
            }}
          >
            类别
          </RadioSelector>
        </SimpleBox>

        <CodeBox
          config={{
            placeholder: '请选择类别',
            value: radioOptions1[0].value,
            options: radioOptions1,
          }}
          componentName="RadioSelector"
          mockChildren={false}
          useInnerBox={false}
        />

        <PropertyBox config={RadioSelector.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
