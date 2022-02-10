import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, FlexBox, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const autoStyle = {
  height: transformSize(80),
  backgroundColor: '#ccc',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FlexBox',
    name: '自动布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="仅左侧布局" style={style} headerStyle={cardHeaderStyle}>
          <FlexBox left={<View style={boxStyle}></View>} />
        </Card>

        <Card header="左侧自动布局" style={style} headerStyle={cardHeaderStyle}>
          <FlexBox
            left={<View style={autoStyle}></View>}
            right={<View style={boxStyle}></View>}
          />
        </Card>

        <Card
          header="右侧自自动布局"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <FlexBox
            flexAuto="right"
            left={<View style={boxStyle}></View>}
            right={<View style={autoStyle}></View>}
          />
        </Card>

        <Card
          header="上下自动布局 , 下部固定高度"
          style={style}
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
      </Space>
    );
  };
}
