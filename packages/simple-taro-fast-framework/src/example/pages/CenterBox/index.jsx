import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  CenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const style = {
  height: transformSize(400),
  backgroundColor: '#ccc',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="布局展示"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <View style={style}>
              <CenterBox style={style}>
                <View style={boxStyle}></View>
              </CenterBox>
            </View>
          </Card>
        </Space>
      </View>
    );
  }
}
