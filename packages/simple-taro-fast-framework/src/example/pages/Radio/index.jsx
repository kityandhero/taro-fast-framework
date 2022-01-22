import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Radio, Icon, Button } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = { backgroundColor: '#f5f7fa' };

const extraStyle = {
  padding: '0 var(--tfc-12)',
  fontSize: transformSize(24),
  color: '#aaa',
};

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        radioValue1: 'option1',
        radioValue2: 'option1',
        radioValue3: 'option2',
        radioOptions1: [
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
        radioOptions2: [
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
        ],
        radioOptions3: [
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

  handleRadioChange = (value) => {
    this.setState({
      radioValue1: value,
    });
  };

  handleRadioChangeSecond = (value) => {
    this.setState({
      radioValue2: value,
    });
  };

  handleRadioChangeThird = (value) => {
    this.setState({
      radioValue3: value,
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
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Radio
          header="基础用法"
          style={style}
          border={border}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          // showRenderCount
          extra={
            <Button
              style={{ marginRight: transformSize(10) }}
              size="mini"
              onClick={this.toggleBorder}
            >
              切换边框
            </Button>
          }
          onChange={this.handleRadioChange}
        />

        <Radio
          header="自定义选中图标"
          style={style}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          iconCheck={<IconCheckCircle size={38} color="#1677ff" />}
          extra={<View style={extraStyle}>layout: list</View>}
          onChange={this.handleRadioChange}
        />

        <Radio
          header="含有单项描述"
          style={style}
          options={this.state.radioOptions2}
          value={this.state.radioValue2}
          extra={<View style={extraStyle}>layout: list</View>}
          onChange={this.handleRadioChangeSecond}
        />

        <Radio
          header="单项禁用"
          style={style}
          options={this.state.radioOptions3}
          value={this.state.radioValue3}
          extra={<View style={extraStyle}>layout: list</View>}
          onChange={this.handleRadioChangeThird}
        />

        <Radio
          header="基础用法"
          layout="radio"
          style={style}
          border={border}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          extra={<View style={extraStyle}>layout: radio</View>}
          onChange={this.handleRadioChange}
        />

        <Radio
          header="自定义选中图标"
          layout="radio"
          style={style}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
          extra={<View style={extraStyle}>layout: radio</View>}
          onChange={this.handleRadioChange}
        />

        <Radio
          header="含有单项描述"
          layout="radio"
          style={style}
          options={this.state.radioOptions2}
          value={this.state.radioValue2}
          extra={<View style={extraStyle}>layout: radio</View>}
          onChange={this.handleRadioChangeSecond}
        />

        <Radio
          header="单项禁用"
          layout="radio"
          style={style}
          options={this.state.radioOptions3}
          value={this.state.radioValue3}
          extra={<View style={extraStyle}>layout: radio</View>}
          onChange={this.handleRadioChangeThird}
        />
      </View>
    );
  }
}
