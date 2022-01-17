import { View } from '@tarojs/components';

import { Card, FlexBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const boxStyle = {
  width: '80rpx',
  height: '80rpx',
  backgroundColor: 'blue',
};

const autoStyle = {
  height: '80rpx',
  backgroundColor: '#ccc',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="仅左侧布局" headerStyle={cardHeaderStyle}>
          <FlexBox left={<View style={boxStyle}></View>} />
        </Card>

        <Card header="左侧自适应布局" headerStyle={cardHeaderStyle}>
          <FlexBox
            left={<View style={autoStyle}></View>}
            right={<View style={boxStyle}></View>}
          />
        </Card>

        <Card header="右侧自适应布局" headerStyle={cardHeaderStyle}>
          <FlexBox
            left={<View style={boxStyle}></View>}
            right={<View style={autoStyle}></View>}
          />
        </Card>

        <Card
          header="上下自适应布局 , 下部固定高度"
          headerStyle={cardHeaderStyle}
        >
          <FlexBox
            left={<View style={boxStyle}></View>}
            right={<View style={autoStyle}></View>}
          />
        </Card>

        <Card header="FlexBox" headerStyle={cardHeaderStyle}>
          <FlexBox
            style={{ height: '300rpx' }}
            direction="vertical"
            vertical={{
              bottomHeight: '80rpx',
            }}
            top={
              <View
                style={{ ...autoStyle, ...{ width: '100%', height: '100%' } }}
              ></View>
            }
            bottom={
              <View
                style={{ ...boxStyle, ...{ width: '100%', height: '80rpx' } }}
              ></View>
            }
          />
        </Card>
      </View>
    );
  }
}
