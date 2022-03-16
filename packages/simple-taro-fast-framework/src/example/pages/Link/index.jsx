import { Space, Link } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const url = 'http://www.a.com';

const config1 = {
  href: url,
  text: '跳转链接',
};

const config2 = {
  href: url,
  text: '跳转链接',
  color: 'green',
};

const config3 = {
  href: url,
  text: '跳转链接',
  underLine: true,
};

const config4 = {
  href: url,
  text: '跳转链接',
  fontSize: 40,
};

const config5 = {
  href: url,
  text: '跳转链接',
  copyTips: '复制成功, 请使用外部浏览器访问',
};

const config6 = {
  text: '跳转链接',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '链接',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Link',
    name: '链接',
    description: '链接组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="默认" config={config1}>
          <Link {...config1} />
        </SimpleBox>

        <SimpleBox header="设置颜色" config={config2}>
          <Link {...config2} />
        </SimpleBox>

        <SimpleBox header="设置下划线" config={config3}>
          <Link {...config3} />
        </SimpleBox>

        <SimpleBox header="设置字体大小" config={config4}>
          <Link {...config4} />
        </SimpleBox>

        <SimpleBox header="复制提示" config={config5}>
          <Link {...config5} />
        </SimpleBox>

        <SimpleBox header="未配置链接的提示" config={config5}>
          <Link {...config5} />
        </SimpleBox>

        <SimpleBox header="未配置链接的提示" config={config6}>
          <Link {...config6} />
        </SimpleBox>

        <PropertyBox config={Link.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
