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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'More',
    name: '查看更多',
    description: '查看更多组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="更多"
          componentName="More"
          mockChildren={false}
          useInnerBox
        >
          <More />
        </SimpleBox>

        <SimpleBox
          header="设置文字"
          config={config1}
          componentName="More"
          mockChildren={false}
          useInnerBox
        >
          <More {...config1} />
        </SimpleBox>

        <SimpleBox
          header="设置图标"
          config={config2}
          componentName="More"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <More {...config2} />
        </SimpleBox>

        <SimpleBox
          header="设置样式"
          config={config3}
          componentName="More"
          mockChildren={false}
          useInnerBox
        >
          <More {...config3} />
        </SimpleBox>

        <SimpleBox
          header="点击事件"
          config={config4}
          componentName="More"
          mockChildren={false}
          useInnerBox
        >
          <More {...config4} />
        </SimpleBox>

        <PropertyBox
          config={More.defaultProps}
          labelWidth={270}
          ignorePropertyList={['icon']}
        />
      </Space>
    );
  };
}
