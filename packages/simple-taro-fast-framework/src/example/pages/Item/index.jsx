import { Image } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Item,
  Switch,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconSketch, IconShoppingCart } = Icon;

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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '条目项',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Item',
    name: '条目项',
    description: '条目项组件',
  };

  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="基础用法" space={false}>
          <Item label="1" />
          <Item label="2" />
          <Item label="3" border={false} />
        </SimpleBox>

        <SimpleBox header="箭头" space={false}>
          <Item label="账单" arrow />
          <Item label="总资产" arrow />
          <Item label="设置" arrow border={false} />
        </SimpleBox>

        <SimpleBox header="可点击" space={false}>
          <Item label="账单" clickable arrow onClick={this.handleClick} />
          <Item label="总资产" clickable arrow onClick={this.handleClick} />
          <Item
            label="设置"
            clickable
            arrow
            border={false}
            onClick={this.handleClick}
          />
        </SimpleBox>

        <SimpleBox header="复杂布局" space={false}>
          <Item label="新消息通知" extra={<Switch defaultChecked />} />
          <Item label="大字号模式" extra="未开启" clickable arrow />
          <Item
            label="授权管理"
            description="管理已授权的产品和设备"
            clickable
            arrow
          />
          <Item title="这里是标题" label="这里是主信息" border={false} />
        </SimpleBox>

        <SimpleBox header="禁用状态" space={false}>
          <Item label="账单" disabled clickable arrow prefix={<IconSketch />} />
          <Item
            label="总资产"
            disabled
            prefix={<IconShoppingCart />}
            border={false}
          />
        </SimpleBox>

        <SimpleBox header="用户列表布局" space={false}>
          {users.map((user, index) => (
            <Item
              key={user.name}
              label={user.name}
              border={index !== users.length - 1}
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
        </SimpleBox>

        <PropertyBox config={Item.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
