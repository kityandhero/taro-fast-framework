import { View } from '@tarojs/components';

import {
  Radio,
  Card,
  Icon,
  RadioSelector,
  Button,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = { backgroundColor: '#f5f7fa' };

const extraStyle = {
  padding: '0 12rpx',
  fontSize: '24rpx',
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

  renderFurther() {
    const { border } = this.state;

    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card
          header="通栏视图"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <RadioSelector
            value={this.state.radioValue1}
            options={this.state.radioOptions1}
          >
            类别
          </RadioSelector>
        </Card>
      </View>
    );
  }
}
