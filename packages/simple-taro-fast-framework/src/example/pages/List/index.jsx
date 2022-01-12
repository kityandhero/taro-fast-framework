import { View, Image } from '@tarojs/components';

import { List, AdvanceSwitch } from 'taro-fast-component/es/customComponents';
import { Icon } from 'taro-fast-component-extra/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

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
        <List header="基础用法" style={style}>
          <List.Item>1</List.Item>
          <List.Item>2</List.Item>
          <List.Item>3</List.Item>
        </List>

        <List header="箭头" style={style}>
          <List.Item arrow>账单</List.Item>
          <List.Item arrow>总资产</List.Item>
          <List.Item arrow>设置</List.Item>
        </List>

        <List header="可点击" style={style}>
          <List.Item clickable onClick={this.handleClick}>
            账单
          </List.Item>
          <List.Item clickable onClick={this.handleClick}>
            总资产
          </List.Item>
          <List.Item clickable onClick={this.handleClick}>
            设置
          </List.Item>
        </List>

        <List header="复杂布局" style={style}>
          <List.Item extra={<AdvanceSwitch defaultChecked />}>
            新消息通知
          </List.Item>
          <List.Item extra="未开启" clickable>
            大字号模式
          </List.Item>
          <List.Item description="管理已授权的产品和设备" clickable>
            授权管理
          </List.Item>
          <List.Item title="这里是标题">这里是主信息</List.Item>
        </List>

        <List header="列表项禁用" style={style}>
          <List.Item disabled clickable prefix={<IconSketch />}>
            账单
          </List.Item>
          <List.Item disabled prefix={<IconShoppingCart />}>
            总资产
          </List.Item>
        </List>

        <List mode="card" header="卡片模式" style={style}>
          <List.Item title="这里是标题">这里是主信息</List.Item>
          <List.Item title="这里是标题">这里是主信息</List.Item>
        </List>

        <List header="用户列表">
          {users.map((user) => (
            <List.Item
              key={user.name}
              prefix={
                <Image
                  src={user.avatar}
                  style={{ borderRadius: 20, width: '80rpx', height: '80rpx' }}
                  fit="cover"
                />
              }
              description={user.description}
            >
              {user.name}
            </List.Item>
          ))}
        </List>
      </View>
    );
  }
}
