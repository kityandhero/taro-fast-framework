import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  CheckBox,
  Icon,
  Button,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = { backgroundColor: '#f5f7fa' };

const extraStyle = {
  padding: `0 ${transformSize(12)}`,
  fontSize: transformSize(24),
  color: '#aaa',
  backgroundColor: '#f5f7fa',
};

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        checkBoxValue1: ['option1'],
        checkBoxValue2: ['option1'],
        checkBoxValue3: ['option2'],
        checkBoxOptions1: [
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
        ],
        checkBoxOptions2: [
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
            span: 2,
          },
        ],
        checkBoxOptions3: [
          {
            label: '单选项一',
            value: 'option1',
            title: '选项的标题',
            description: '单选项的简介描述',
            prefix: <IconShoppingCart />,
            extra: '扩展说明',
          },
          {
            label: '单选项二',
            value: 'option2',
            title: '选项的标题',
            description: '单选项的简介描述',
            prefix: <IconSketch />,
            extra: '扩展说明',
          },
          {
            label: '单选项三禁用',
            value: 'option3',
            title: '选项的标题',
            description: '单选项的简介描述',
            disabled: true,
            prefix: <IconSketch />,
            extra: '扩展说明',
          },
        ],
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

  renderFurther() {
    const { border } = this.state;

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <CheckBox
            header="基础用法"
            style={style}
            border={border}
            options={this.state.checkBoxOptions1}
            value={this.state.checkBoxValue1}
            extra={
              <Button
                style={{ marginRight: transformSize(10) }}
                size="mini"
                onClick={this.toggleBorder}
              >
                切换边框
              </Button>
            }
          />

          <CheckBox
            header="自定义选中图标"
            style={style}
            options={this.state.checkBoxOptions1}
            value={this.state.checkBoxValue1}
            iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
            iconUncheck={<IconCheckCircle size={44} color="#ccc" />}
            extra={<View style={extraStyle}>layout: list</View>}
          />

          <CheckBox
            header="含有单项描述"
            style={style}
            options={this.state.checkBoxOptions2}
            value={this.state.checkBoxValue2}
            extra={<View style={extraStyle}>layout: list</View>}
          />

          <CheckBox
            header="单项禁用"
            style={style}
            options={this.state.checkBoxOptions3}
            value={this.state.checkBoxValue3}
            extra={<View style={extraStyle}>layout: list</View>}
          />

          <Card
            header="基础布局"
            headerStyle={cardHeaderStyle}
            extra={<View style={extraStyle}>layout: mini</View>}
            extraStyle={{ backgroundColor: '#f5f7fa' }}
          >
            <CheckBox
              layout="mini"
              style={style}
              border={border}
              options={this.state.checkBoxOptions1}
              value={this.state.checkBoxValue1}
            />
          </Card>

          <Card
            header="自定义布局"
            headerStyle={cardHeaderStyle}
            extra={<View style={extraStyle}>layout: mini</View>}
            extraStyle={{ backgroundColor: '#f5f7fa' }}
          >
            <CheckBox
              layout="mini"
              style={style}
              border={border}
              options={this.state.checkBoxOptions2}
              value={this.state.checkBoxValue2}
              miniColumns={2}
              miniGap={12}
            />
          </Card>

          <CheckBox
            header="基础用法"
            layout="checkBox"
            style={style}
            border={border}
            options={this.state.checkBoxOptions1}
            value={this.state.checkBoxValue1}
            extra={<View style={extraStyle}>layout: checkBox</View>}
          />

          <CheckBox
            header="自定义选中图标"
            layout="checkBox"
            style={style}
            options={this.state.checkBoxOptions1}
            value={this.state.checkBoxValue1}
            iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
            iconUncheck={<IconCheckCircle size={44} color="#ccc" />}
            extra={<View style={extraStyle}>layout: checkBox</View>}
          />

          <CheckBox
            header="含有单项描述"
            layout="checkBox"
            style={style}
            options={this.state.checkBoxOptions2}
            value={this.state.checkBoxValue2}
            extra={<View style={extraStyle}>layout: checkBox</View>}
          />

          <CheckBox
            header="单项禁用"
            layout="checkBox"
            style={style}
            options={this.state.checkBoxOptions3}
            value={this.state.checkBoxValue3}
            extra={<View style={extraStyle}>layout: checkBox</View>}
          />

          <CheckBox
            header="更改回调"
            layout="checkBox"
            style={style}
            options={this.state.checkBoxOptions3}
            value={this.state.checkBoxValue3}
            extra={<View style={extraStyle}>layout: checkBox</View>}
            afterChange={(value) => {
              this.bannerNotify({
                message: `值已更改为:${value.join()}`,
              });
            }}
          />
        </Space>
      </View>
    );
  }
}
