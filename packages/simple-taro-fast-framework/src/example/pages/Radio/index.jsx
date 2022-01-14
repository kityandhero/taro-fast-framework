import { View } from '@tarojs/components';

import { Radio, Icon, Button } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch, IconShoppingCart } = Icon;

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        radioValue1: 'option1',
        radioValue2: 'option1',
        radioValue3: 'option3',
        radioOptions1: [
          {
            label: '单选项一',
            value: 'option1',
          },
          {
            label: '单选项二',
            value: 'option2',
          },
          {
            label: '单选项三',
            value: 'option3',
          },
        ],
        radioOptions2: [
          {
            label: '单选项一',
            value: 'option1',
            description: '单选项描述一',
          },
          {
            label: '单选项二',
            value: 'option2',
            description: '单选项描述二',
          },
          {
            label: '单选项三',
            value: 'option3',
            description: '单选项描述三',
          },
        ],
        radioOptions3: [
          {
            label: '单选项一',
            value: 'option1',
            title: '选项的标题',
            description: '单选项的简介描述',
            prefix: <IconShoppingCart />,
          },
          {
            label: '单选项二',
            value: 'option2',
            title: '选项的标题',
            description: '单选项的简介描述',
            prefix: <IconSketch />,
          },
          {
            label: '单选项三禁用',
            value: 'option3',
            title: '选项的标题',
            description: '单选项的简介描述',
            disabled: true,
            prefix: <IconSketch />,
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
          extra={
            <Button
              style={{ marginRight: '10rpx' }}
              size="mini"
              onClick={this.toggleBorder}
            >
              切换边框
            </Button>
          }
          onClick={this.handleRadioChange}
        />

        <Radio
          header="含有单项描述"
          style={style}
          options={this.state.radioOptions2}
          value={this.state.radioValue2}
          onClick={this.handleRadioChangeSecond}
        />

        <Radio
          header="单项禁用"
          style={style}
          options={this.state.radioOptions3}
          value={this.state.radioValue3}
          onClick={this.handleRadioChangeThird}
        />
      </View>
    );
  }
}
