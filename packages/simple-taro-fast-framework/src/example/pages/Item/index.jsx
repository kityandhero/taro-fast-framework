import { View, Image } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Item,
  SwitchItem,
  Icon,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch, IconShoppingCart } = Icon;

const style = { backgroundColor: '#f5f7fa' };

const users = [
  {
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    description: 'Deserunt dolor ea eaque eos',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    name: 'Sara Koivisto',
    description: 'Animi eius expedita, explicabo',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Marco Gregg',
    description: 'Ab animi cumque eveniet ex harum nam odio omnis',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Edith Koenig',
    description: 'Commodi earum exercitationem id numquam vitae',
  },
];

export default class Index extends PageWrapper {
  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderFurther() {
    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card
          header="基础用法"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="1" />
          <Item label="2" />
          <Item label="3" />
        </Card>

        <Card
          header="箭头"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="账单" arrow />
          <Item label="总资产" arrow />
          <Item label="设置" arrow />
        </Card>

        <Card
          header="可点击"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="账单" clickable arrow onClick={this.handleClick} />
          <Item label="总资产" clickable arrow onClick={this.handleClick} />
          <Item label="设置" clickable arrow onClick={this.handleClick} />
        </Card>

        <Card
          header="复杂布局"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="新消息通知" extra={<SwitchItem defaultChecked />} />
          <Item label="大字号模式" extra="未开启" clickable arrow />
          <Item
            label="授权管理"
            description="管理已授权的产品和设备"
            clickable
            arrow
          />
          <Item title="这里是标题" label="这里是主信息" />
        </Card>

        <Card
          header="禁用状态"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="账单" disabled clickable arrow prefix={<IconSketch />} />
          <Item label="总资产" disabled prefix={<IconShoppingCart />} />
        </Card>

        <Card header="用户列表布局" headerStyle={cardHeaderStyle} space={false}>
          {users.map((user) => (
            <Item
              key={user.name}
              label={user.name}
              prefix={
                <Image
                  src={user.avatar}
                  style={{
                    borderRadius: 20,
                    width: transformSize(80),
                    height: transformSize(80),
                  }}
                  fit="cover"
                />
              }
              description={user.description}
            />
          ))}
        </Card>
      </View>
    );
  }
}
