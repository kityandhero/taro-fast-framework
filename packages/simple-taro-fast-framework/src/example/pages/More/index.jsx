import { connect } from 'react-redux';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Space, More, Icon } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconShoppingCart } = Icon;

const config1 = {
  text: '查看更多',
};

const config2 = {
  icon: <IconShoppingCart size={30} />,
};

const config3 = {
  style: {
    border: `${transformSize(2)} solid #ccc`,
    padding: transformSize(6),
  },
};

const config4 = {
  onClick: () => {
    console.log('click');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '价格',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'More',
    name: '查看更多',
    description: '查看更多组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认',
        currentConfig: {},
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认',
        config: {},
      },
      {
        header: '设置文字',
        config: config1,
      },
      {
        header: '设置图标',
        config: config2,
      },
      {
        header: '设置样式',
        config: config3,
      },
      {
        header: '点击事件',
        config: config4,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <More key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </More>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="More"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={More.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
