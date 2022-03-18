import { Space, HtmlBox } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  html: '<div>1</div>',
};

const config2 = {
  html: '<div>1</div>',
  canCopy: false,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Html容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HtmlBox',
    name: 'Html容器',
    description: 'Html容器组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="渲染Html"
          config={config1}
          componentName="HtmlBox"
          mockChildren={false}
          useInnerBox
        >
          <HtmlBox {...config1} />
        </SimpleBox>

        <SimpleBox
          header="可复制"
          config={config2}
          componentName="HtmlBox"
          mockChildren={false}
          useInnerBox
        >
          <HtmlBox {...config2} />
        </SimpleBox>

        <PropertyBox config={HtmlBox.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}
