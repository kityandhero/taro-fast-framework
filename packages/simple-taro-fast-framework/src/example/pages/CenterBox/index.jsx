import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  CenterBox,
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

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const containorStyle = {
  height: transformSize(400),
  backgroundColor: '#ccc',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'CenterBox',
    name: '容器居中',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="布局展示" style={style} headerStyle={cardHeaderStyle}>
          <View style={containorStyle}>
            <CenterBox style={containorStyle}>
              <View style={boxStyle}></View>
            </CenterBox>
          </View>
        </Card>
      </Space>
    );
  };
}
