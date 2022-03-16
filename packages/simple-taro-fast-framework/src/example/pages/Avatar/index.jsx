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

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="头像" config={config1}>
          <Avatar {...config1} />
        </SimpleBox>

        <SimpleBox header="圆形头像" config={config2}>
          <Avatar {...config2} />
        </SimpleBox>

        <SimpleBox header="文字" config={config3}>
          <Avatar {...config3} />
        </SimpleBox>

        <SimpleBox header="圆形文字" config={config4}>
          <Avatar {...config4} />
        </SimpleBox>

        <SimpleBox header="小尺寸" config={config5}>
          <Avatar {...config5} />
        </SimpleBox>

        <SimpleBox header="大尺寸" config={config6}>
          <Avatar {...config6} />
        </SimpleBox>

        <PropertyBox config={Avatar.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}
