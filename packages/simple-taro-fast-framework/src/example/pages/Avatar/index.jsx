import { View } from '@tarojs/components';

import { Card, Space, Avatar } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="Avatar" style={cardStyle} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Avatar circle text="头像" />
            <Avatar text="头像" />
            <Avatar circle image="https://jdc.jd.com/img/200" />
            <Avatar image="https://jdc.jd.com/img/200" />
          </Space>
        </Card>
      </View>
    );
  }
}
