import { connect } from 'react-redux';
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

function clickHandler() {
  console.log('click');
}

const config1 = [
  {
    label: '1',
  },
  {
    label: '2',
  },
  {
    label: '3',
  },
];

const config11 = [
  {
    label: '1',
    border: false,
  },
  {
    label: '2',
    border: false,
  },
  {
    label: '3',
    border: false,
  },
];

const config111 = [
  {
    label: '1',
    borderWidth: 6,
  },
  {
    label: '2',
    borderWidth: 6,
  },
  {
    label: '3',
    borderWidth: 6,
  },
];

const config112 = [
  {
    label: '1',
    borderColor: 'red',
  },
  {
    label: '2',
    borderColor: 'red',
  },
  {
    label: '3',
    borderColor: 'red',
  },
];

const config2 = [
  {
    label: '账单',
    arrow: true,
  },
  {
    label: '总资产',
    arrow: true,
  },
  {
    label: '设置',
    arrow: true,
  },
];

const config211 = [
  {
    label: '账单',
    arrow: true,
    arrowSize: 28,
  },
  {
    label: '总资产',
    arrow: true,
    arrowSize: 28,
  },
  {
    label: '设置',
    arrow: true,
    arrowSize: 28,
  },
];

const config212 = [
  {
    label: '账单',
    arrow: true,
    arrowColor: 'red',
  },
  {
    label: '总资产',
    arrow: true,
    arrowColor: 'red',
  },
  {
    label: '设置',
    arrow: true,
    arrowColor: 'red',
  },
];

const config3 = [
  {
    label: '账单',
    clickable: true,
    arrow: true,
    onClick: clickHandler,
  },
  {
    label: '总资产',
    clickable: true,
    arrow: true,
    onClick: clickHandler,
  },
  {
    label: '设置',
    clickable: true,
    arrow: true,

    onClick: clickHandler,
  },
];

const config4 = [
  {
    label: '新消息通知',
    extra: <Switch defaultChecked />,
  },
  {
    label: '大字号模式',
    extra: '未开启',
    clickable: true,
    arrow: true,
  },
  {
    label: '授权管理',
    description: '管理已授权的产品和设备',
    clickable: true,
    arrow: true,
  },
  {
    title: '这里是标题',
    label: '这里是主信息',
  },
];

const config5 = [
  {
    label: '账单',
    disabled: true,
    clickable: true,
    arrow: true,
    prefix: <IconSketch size={32} />,
  },
  {
    label: '总资产',
    disabled: true,
    prefix: <IconShoppingCart size={32} />,
  },
];

const config6 = users.map((user) => {
  return {
    label: user.name,
    description: user.description,
    prefix: (
      <Image
        src={user.avatar}
        style={{
          borderRadius: 20,
          width: transformSize(80),
          height: transformSize(80),
        }}
        fit="cover"
      />
    ),
  };
});

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '条目项',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Item',
    name: '条目项',
    description: '条目项组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '文字',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础用法',
        config: config1,
      },
      {
        header: '无底线',
        config: config11,
      },
      {
        header: '底线宽度',
        config: config111,
      },
      {
        header: '底线颜色',
        config: config112,
      },
      {
        header: '使用箭头',
        config: config2,
      },
      {
        header: '箭头大小',
        config: config211,
      },
      {
        header: '箭头颜色',
        config: config212,
      },
      {
        header: '可点击',
        config: config3,
      },
      {
        header: '复杂布局',
        config: config4,
      },
      {
        header: '禁用状态',
        config: config5,
      },
      {
        header: '用户列表布局',
        config: config6,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Item key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Item>
    );
  };

  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          space={false}
          componentName="Item"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['prefix', 'icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Item.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
