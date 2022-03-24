import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Space, Price } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  price: 4.78,
};

const config2 = {
  price: 4.78,
  prefix: '¥',
};

const config3 = {
  price: 4.78,
  itemStyle: { color: '#ccc' },
  strikethrough: true,
};

const config4 = {
  price: 4.78,
  bodyStyle: {
    border: `${transformSize(2)} solid #ccc`,
    padding: transformSize(6),
  },
};

const config5 = {
  price: 4.78,
  bodyStyle: {
    border: `${transformSize(2)} solid #ccc`,
    padding: transformSize(6),
  },
};

const config6 = {
  price: 4.78,
  prefix: '¥',
  itemStyle: {
    color: '#E04247',
    fontWeight: 'bold',
  },
  prefixStyle: {
    fontSize: transformSize(24),
    marginRight: transformSize(5),
  },
  integerPartStyle: { fontSize: transformSize(48) },
  pointStyle: { fontSize: transformSize(48) },
  decimalPartStyle: { fontSize: transformSize(48) },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '价格',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Price',
    name: '价格',
    description: '价格组件',
  };

  renderContent = () => {
    console.log(Price.defaultProps);

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="普通"
          config={config1}
          componentName="Price"
          mockChildren={false}
          useInnerBox
        >
          <Price {...config1} />
        </SimpleBox>

        <SimpleBox
          header="修饰符"
          config={config2}
          componentName="Price"
          mockChildren={false}
          useInnerBox
        >
          <Price {...config2} />
        </SimpleBox>

        <SimpleBox
          header="删除线"
          config={config3}
          componentName="Price"
          mockChildren={false}
          useInnerBox
        >
          <Price {...config3} />
        </SimpleBox>

        <SimpleBox
          header="外层样式"
          config={config4}
          componentName="Price"
          mockChildren={false}
          useInnerBox
        >
          <Price {...config4} />
        </SimpleBox>

        <SimpleBox
          header="元素通用样式"
          config={config5}
          componentName="Price"
          mockChildren={false}
          useInnerBox
        >
          <Price {...config5} />
        </SimpleBox>

        <SimpleBox
          header="复杂配置"
          config={config6}
          componentName="Price"
          mockChildren={false}
          useInnerBox
        >
          <Price {...config6} />
        </SimpleBox>

        <PropertyBox config={Price.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
