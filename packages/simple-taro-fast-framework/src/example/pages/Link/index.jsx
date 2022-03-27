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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '仅头部',
        config: config1,
      },
      {
        header: '设置颜色',
        config: config2,
      },
      {
        header: '设置下划线',
        config: config3,
      },
      {
        header: '设置字体大小',
        config: config4,
      },
      {
        header: '复制提示',
        config: config5,
      },
      {
        header: '未配置链接的提示',
        config: config6,
      },
    ];
  };

  renderContent = () => {
    const { header, currentConfig } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          config={currentConfig}
          componentName="Link"
          mockChildren={false}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          <Link {...currentConfig} />
        </SimpleBox>

        <PropertyBox config={Link.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
