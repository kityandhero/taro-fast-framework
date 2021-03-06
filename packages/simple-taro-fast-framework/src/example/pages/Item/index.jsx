import { connect } from 'react-redux';
import { Image } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Icon,
  Item,
  Space,
  Switch,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

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

const config113 = [
  {
    label: '1',
    borderTopDistance: 0,
    borderColor: 'red',
  },
  {
    label: '2',
    borderTopDistance: 10,
    borderColor: 'red',
  },
  {
    label: '3',
    borderTopDistance: 20,
    borderColor: 'red',
  },
];

const config2 = [
  {
    label: '??????',
    arrow: true,
  },
  {
    label: '?????????',
    arrow: true,
  },
  {
    label: '??????',
    arrow: true,
  },
];

const config211 = [
  {
    label: '??????',
    arrow: true,
    arrowSize: 28,
  },
  {
    label: '?????????',
    arrow: true,
    arrowSize: 28,
  },
  {
    label: '??????',
    arrow: true,
    arrowSize: 28,
  },
];

const config212 = [
  {
    label: '??????',
    arrow: true,
    arrowColor: 'red',
  },
  {
    label: '?????????',
    arrow: true,
    arrowColor: 'red',
  },
  {
    label: '??????',
    arrow: true,
    arrowColor: 'red',
  },
];

const config3 = [
  {
    label: '??????',
    clickable: true,
    arrow: true,
    onClick: clickHandler,
  },
  {
    label: '?????????',
    clickable: true,
    arrow: true,
    onClick: clickHandler,
  },
  {
    label: '??????',
    clickable: true,
    arrow: true,

    onClick: clickHandler,
  },
];

const config4 = [
  {
    label: '???????????????',
    extra: <Switch defaultChecked />,
  },
  {
    label: '???????????????',
    extra: '?????????',
    clickable: true,
    arrow: true,
  },
  {
    label: '????????????',
    description: '?????????????????????????????????',
    clickable: true,
    arrow: true,
  },
  {
    title: '???????????????',
    label: '??????????????????',
  },
];

const config5 = [
  {
    label: '??????',
    disabled: true,
    clickable: true,
    arrow: true,
    prefix: <IconSketch size={32} />,
  },
  {
    label: '?????????',
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
  navigationBarTitleText: '?????????',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Item',
    name: '?????????',
    description: '???????????????',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '??????',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '????????????',
        config: config1,
      },
      {
        header: '?????????',
        config: config11,
      },
      {
        header: '????????????',
        config: config111,
      },
      {
        header: '????????????',
        config: config112,
      },
      {
        header: '???????????????',
        config: config113,
      },
      {
        header: '????????????',
        config: config2,
      },
      {
        header: '????????????',
        config: config211,
      },
      {
        header: '????????????',
        config: config212,
      },
      {
        header: '?????????',
        config: config3,
      },
      {
        header: '????????????',
        config: config4,
      },
      {
        header: '????????????',
        config: config5,
      },
      {
        header: '??????????????????',
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
      message: '????????????',
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
