import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  HorizontalCenterBox,
  HelpBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const containorStyle = {
  border: `${transformSize(2)} solid #ccc`,
  height: transformSize(200),
};

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
  margin: transformSize(20),
};

const horizontalCenterBoxStyle = {
  backgroundColor: '#ccc',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HorizontalCenterBox',
    name: '水平居中',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="默认布局" style={style} headerStyle={cardHeaderStyle}>
          <View style={containorStyle}>
            <HorizontalCenterBox style={horizontalCenterBoxStyle}>
              <View style={boxStyle}></View>
            </HorizontalCenterBox>
          </View>
        </Card>

        <Card
          header="不自动使用父级高度"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <View style={containorStyle}>
            <HorizontalCenterBox
              style={horizontalCenterBoxStyle}
              fillHeight={false}
            >
              <View style={boxStyle}></View>
            </HorizontalCenterBox>
          </View>
        </Card>

        <Card header="属性说明 :" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            list={[
              {
                text: 'style: 默认值为 null.',
              },
              {
                text: 'fillHeight: 默认值为 true.',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
