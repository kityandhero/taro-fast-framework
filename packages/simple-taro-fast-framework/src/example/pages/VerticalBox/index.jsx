import { View } from '@tarojs/components';

import { Card, VerticalBox } from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = {
  border: '2rpx solid #ccc',
  height: '200rpx',
};

const boxStyle = {
  width: '80rpx',
  height: '80rpx',
  backgroundColor: 'blue',
  margin: '20rpx',
};

const alignList = [
  {
    label: 'top',
    value: 'top',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'bottom',
    value: 'bottom',
  },
];

const alignJustifyList = [
  {
    label: 'start',
    value: 'start',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'end',
    value: 'end',
  },
  {
    label: 'between',
    value: 'between',
  },
  {
    label: 'around',
    value: 'around',
  },
];

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        align: ['top'],
        alignJustify: ['start'],
      },
    };
  }

  setAlignChecked = (value) => {
    console.log(value);
    this.setState({
      align: value,
    });
  };

  setAlignJustifyChecked = (value) => {
    this.setState({
      alignJustify: value,
    });
  };

  renderFurther() {
    const { align, alignJustify } = this.state;

    return (
      <View className="index">
        <Card header="单元素布局展示" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <VerticalBox align={align[0]} alignJustify={alignJustify[0]}>
              <View style={boxStyle}></View>
            </VerticalBox>
          </View>
        </Card>

        <Card header="多元素布局展示" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <VerticalBox align={align[0]} alignJustify={alignJustify[0]}>
              <View style={boxStyle}></View>
              <View style={boxStyle}></View>
              <View style={boxStyle}></View>
            </VerticalBox>
          </View>
        </Card>

        <Card header="align" headerStyle={cardHeaderStyle}>
          <Selector
            options={alignList}
            defaultValue={align}
            onChange={this.setAlignChecked}
          />
        </Card>

        <Card header="alignJustify" headerStyle={cardHeaderStyle}>
          <Selector
            options={alignJustifyList}
            defaultValue={alignJustify}
            onChange={this.setAlignJustifyChecked}
          />
        </Card>
      </View>
    );
  }
}
