import { Space, Avatar } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import logoImg from '../../../assets/images/logo.png';

const config1 = {
  image: logoImg,
};

const config2 = {
  circle: true,
  image: logoImg,
};

const config3 = {
  text: '头像',
};

const config4 = {
  circle: true,
  text: '头像',
};

const config5 = {
  circle: true,
  image: logoImg,
  size: 'small',
};

const config6 = {
  circle: true,
  image: logoImg,
  size: 'large',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '头像',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Avatar',
    name: '头像',
    description: '头像组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '头像',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '头像',
        config: config1,
      },
      {
        header: '圆形头像',
        config: config2,
      },
      {
        header: '文字',
        config: config3,
      },
      {
        header: '圆形文字',
        config: config4,
      },
      {
        header: '小尺寸',
        config: config5,
      },
      {
        header: '大尺寸',
        config: config6,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Avatar key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Avatar>
    );
  };

  renderContent = () => {
    const { header, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          config={currentConfig}
          componentName="Avatar"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Avatar.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
