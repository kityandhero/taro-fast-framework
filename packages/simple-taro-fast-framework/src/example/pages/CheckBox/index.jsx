import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  CheckBox,
  Icon,
  Button,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import CodeBox from '../../../customComponents/CodeBox';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const extraStyle = {
  padding: `0 ${transformSize(12)}`,
  fontSize: transformSize(24),
  color: '#aaa',
  backgroundColor: '#f5f7fa',
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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '复选',
});

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
      },
    };
  }

  handleCheckBoxChange = (value) => {
    this.setState({
      checkBoxValue1: value,
    });
  };

  handleCheckBoxChangeSecond = (value) => {
    this.setState({
      checkBoxValue2: value,
    });
  };

  handleCheckBoxChangeThird = (value) => {
    this.setState({
      checkBoxValue3: value,
    });
  };

  toggleBorder = () => {
    const { border } = this.state;

    this.setState({
      border: !border,
    });
  };

  renderContent = () => {
    const { border } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <CheckBox
          header="基础用法"
          style={style}
          border={border}
          options={checkBoxOptions1}
          value={this.state.checkBoxValue1}
          extra={
            <Button
              style={{ marginRight: transformSize(10) }}
              size="column"
              onClick={this.toggleBorder}
            >
              切换边框
            </Button>
          }
        />

        <CheckBox
          header="Header Strip"
          style={style}
          border={border}
          options={checkBoxOptions1}
          value={this.state.checkBoxValue1}
          strip
          stripLeft={2}
          stripWidth={6}
          stripColor="#3378f4"
          extra={
            <Button size="mini" fill="none" onClick={this.toggleBorder}>
              切换边框
            </Button>
          }
        />

        <CheckBox
          header="自定义选中图标"
          style={style}
          options={checkBoxOptions1}
          value={this.state.checkBoxValue1}
          iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
          iconUncheck={<IconCheckCircle size={44} color="#ccc" />}
          extra={<View style={extraStyle}>layout: list</View>}
        />

        <CheckBox
          header="含有单项描述"
          style={style}
          options={checkBoxOptions2}
          value={this.state.checkBoxValue2}
          extra={<View style={extraStyle}>layout: list</View>}
        />

        <CheckBox
          header="单项禁用"
          style={style}
          options={checkBoxOptions3}
          value={this.state.checkBoxValue3}
          extra={<View style={extraStyle}>layout: list</View>}
        />

        <Card
          header="column默认布局"
          headerStyle={cardHeaderStyle}
          style={style}
          extraStyle={{ backgroundColor: '#f5f7fa' }}
        >
          <CheckBox
            layout="column"
            style={style}
            border={border}
            options={checkBoxOptions1}
            value={this.state.checkBoxValue1}
          />
        </Card>

        <Card
          header="column布局"
          headerStyle={cardHeaderStyle}
          style={style}
          extra={<View style={extraStyle}>column: 2</View>}
          extraStyle={{ backgroundColor: '#f5f7fa' }}
        >
          <CheckBox
            layout="column"
            style={style}
            border={border}
            options={checkBoxOptions2}
            value={this.state.checkBoxValue2}
            columns={2}
            columnGap={12}
          />
        </Card>

        <Card
          header="space布局"
          headerStyle={cardHeaderStyle}
          style={style}
          extra={<View style={extraStyle}>layout: space</View>}
          extraStyle={{ backgroundColor: '#f5f7fa' }}
        >
          <CheckBox
            layout="space"
            style={style}
            border={border}
            options={checkBoxOptions1}
            value={this.state.checkBoxValue1}
            spaceSize={24}
          />
        </Card>

        <CheckBox
          header="基础用法"
          layout="checkBox"
          style={style}
          border={border}
          options={checkBoxOptions1}
          value={this.state.checkBoxValue1}
          extra={<View style={extraStyle}>layout: checkBox</View>}
        />

        <CheckBox
          header="自定义选中图标"
          layout="checkBox"
          style={style}
          options={checkBoxOptions1}
          value={this.state.checkBoxValue1}
          iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
          iconUncheck={<IconCheckCircle size={44} color="#ccc" />}
          extra={<View style={extraStyle}>layout: checkBox</View>}
        />

        <CheckBox
          header="含有单项描述"
          layout="checkBox"
          style={style}
          options={checkBoxOptions2}
          value={this.state.checkBoxValue2}
          extra={<View style={extraStyle}>layout: checkBox</View>}
        />

        <CheckBox
          header="单项禁用"
          layout="checkBox"
          style={style}
          options={checkBoxOptions3}
          value={this.state.checkBoxValue3}
          extra={<View style={extraStyle}>layout: checkBox</View>}
        />

        <CheckBox
          header="更改回调"
          layout="checkBox"
          style={style}
          options={checkBoxOptions3}
          value={this.state.checkBoxValue3}
          extra={<View style={extraStyle}>layout: checkBox</View>}
          afterChange={(value) => {
            this.bannerNotify({
              message: `值已更改为:${value.join()}`,
            });
          }}
        />

        <CodeBox
          config={{
            header: '更改回调',
            layout: 'checkBox',
            style,
            border,
            options: checkBoxOptions1,
            value: this.state.checkBoxValue1,
            extra: <View style={extraStyle}>layout: checkBox</View>,
          }}
          componentName="CheckBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['extra']}
        />

        <PropertyBox config={CheckBox.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
