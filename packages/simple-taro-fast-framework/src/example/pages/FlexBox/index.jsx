import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, FlexBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const autoStyle = {
  height: transformSize(80),
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
            flexAuto="right"
            left={<View style={boxStyle}></View>}
            right={<View style={autoStyle}></View>}
          />
        </Card>

        <Card
          header="上下自适应布局 , 下部固定高度"
          headerStyle={cardHeaderStyle}
        >
          <FlexBox
            style={{ height: transformSize(300) }}
            direction="vertical"
            vertical={{
              bottomHeight: transformSize(80),
            }}
            top={
              <View
                style={{ ...autoStyle, ...{ width: '100%', height: '100%' } }}
              ></View>
            }
            bottom={
              <View
                style={{
                  ...boxStyle,
                  ...{ width: '100%', height: transformSize(80) },
                }}
              ></View>
            }
          />
        </Card>
      </View>
    );
  }
}
