import { connect } from 'react-redux';

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
  itemStyle: {
    color: 'red',
  },
};

const config51 = {
  price: 4.78,
  unit: '元',
  unitStyle: {
    color: 'red',
  },
};

const config52 = {
  price: 4.78,
  unit: '元',
  unitStyle: {
    color: 'red',
  },
  showDecimal: false,
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
  unit: '元',
  unitStyle: {
    color: 'red',
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
    id: 'Price',
    name: '价格',
    description: '价格组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '普通',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '普通',
        config: config1,
      },
      {
        header: '修饰符',
        config: config2,
      },
      {
        header: '删除线',
        config: config3,
      },
      {
        header: '外层样式',
        config: config4,
      },
      {
        header: '元素通用样式',
        config: config5,
      },
      {
        header: '附带单位',
        config: config51,
      },
      {
        header: '隐藏小数部分',
        config: config52,
      },
      {
        header: '复杂配置',
        config: config6,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Price key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Price>
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
          componentName="Price"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Price.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
