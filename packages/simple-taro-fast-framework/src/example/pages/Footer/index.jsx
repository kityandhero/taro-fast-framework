import { Footer, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import logoImg from '../../../assets/images/logo.png';

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Footer',
    name: '底部',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="仅图片" config={config1}>
          <Footer {...config1} />
        </SimpleBox>

        <SimpleBox header="仅文字" config={config2}>
          <Footer {...config2} />
        </SimpleBox>

        <SimpleBox header="仅描述" config={config3}>
          <Footer {...config3} />
        </SimpleBox>

        <SimpleBox header="用法展示" config={config4}>
          <Footer {...config4} />
        </SimpleBox>

        <PropertyBox config={Footer.defaultProps} labelWidth={170} />
      </Space>
    );
  };
}
