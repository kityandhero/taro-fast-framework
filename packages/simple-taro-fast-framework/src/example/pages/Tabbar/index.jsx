import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { Space, Tabbar } from 'taro-fast-component';

import iconAction from '../../../assets/images/icon-list-action.png';
import iconBasic from '../../../assets/images/icon-list-basic.png';
import iconForm from '../../../assets/images/icon-list-form.png';
// import iconHOC from '../../../assets/images/icon-list-hoc.png';
import iconLayout from '../../../assets/images/icon-list-layout.png';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const itemsIcon = [
  {
    name: 'home',
    icon: 'home',
    text: '首页',
  },
  {
    name: 'mail',
    icon: 'mail',
    text: '邮箱',
  },
  {
    name: 'shopping-cart',
    icon: 'shopping-cart',
    text: '购物车',
  },
  {
    name: 'camera',
    icon: 'camera',
    text: '相机',
  },
  {
    name: 'user',
    icon: 'user',
    text: '用户',
  },
];

const itemsImage = [
  {
    name: 'action',
    image: iconAction,
    text: 'action',
  },
  {
    name: 'basic',
    image: iconBasic,
    text: 'basic',
  },
  {
    name: 'form',
    image: iconForm,
    text: 'form',
  },
  {
    name: 'layout',
    image: iconLayout,
    text: 'layout',
    hidden: true,
  },
];

const itemsMix = [
  {
    name: 'home',
    icon: 'home',
    text: '首页',
  },
  {
    name: 'basic',
    image: iconBasic,
    text: 'basic',
  },
  {
    name: 'form',
    image: iconForm,
    text: 'form',
  },
  {
    name: 'layout',
    image: iconLayout,
    text: 'layout',
  },
  {
    name: 'user',
    icon: 'user',
    text: '用户',
  },
];

const items2 = [
  {
    name: 'home',
    icon: 'home',
    text: '首页',
  },
  {
    name: 'mail',
    icon: 'mail',
    text: '邮箱',
  },
  {
    name: 'shopping-cart',
    icon: 'shopping-cart',
    text: '购物车',
    badgeContent: '12',
  },
  {
    name: 'camera',
    icon: 'camera',
    text: '相机',
    activeImage: iconLayout,
    dot: true,
  },
  {
    name: 'user',
    icon: 'user',
    activeIcon: 'sketch',
    text: '用户',
  },
];

const config1 = {
  items: itemsIcon,
};

const config2 = {
  items: itemsImage,
};

const config3 = {
  items: itemsMix,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '底部导航栏',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tabbar',
    name: '底部导航栏',
    description: '底部导航栏组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        value: 'user',
        header: '组件展示',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '图标模式',
        config: config1,
      },
      {
        header: '图片模式',
        config: config2,
      },
      {
        header: '图标图片混合模式',
        config: config3,
      },
      {
        header: '固定底部',
        config: {
          fixed: true,
          items: items2,
          onClick: this.changeTab,
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { value } = this.state;

    return (
      <Tabbar key={key} {...{ ...config, ...{ value } }}>
        {this.buildSimpleItemInner(inner)}
      </Tabbar>
    );
  };

  changeTab = (o) => {
    const { name } = o;

    if (!checkStringIsNullOrWhiteSpace(name)) {
      this.setState({ value: name });
    }
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Tabbar"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['onClick']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Tabbar.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
