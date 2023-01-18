import { connect } from 'easy-soft-dva';

import { Footer, Space } from 'taro-fast-component/es/customComponents';

import logoImg from '../../../assets/images/logo.png';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const config1 = {
  image: logoImg,
};

const config2 = {
  text: '中国*******有限公司',
};

const config3 = {
  description: 'Copyright © 2018-2022 all rights reserved',
};

const config4 = {
  circle: true,
  image: logoImg,
  text: '中国*******有限公司',
  description: 'Copyright © 2018-2022 all rights reserved',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '脚部区域',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Footer',
    name: '底部',
    description: '底部组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '仅图片',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '仅图片',
        config: config1,
      },
      {
        header: '仅文字',
        config: config2,
      },
      {
        header: '仅描述',
        config: config3,
      },
      {
        header: '用法展示',
        config: config4,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Footer key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Footer>
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
          componentName="Footer"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Footer.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
