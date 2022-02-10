import { View } from '@tarojs/components';

import { Card, Space, Avatar } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import logoImg from '../../../assets/images/logo.png';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Avatar',
    name: '头像',
  };

  renderContent = () => {
    return (
      <View className="index">
        <Card header="头像" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Avatar circle text="头像" />
            <Avatar text="头像" />
            <Avatar circle image={logoImg} />
            <Avatar image={logoImg} />
          </Space>
        </Card>
      </View>
    );
  };
}
