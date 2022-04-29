import { connect } from 'react-redux';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Icon,
  SearchBar,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconSketch } = Icon;

const config1 = {
  style: {},
  mode: 'search',
  onSearch: (v) => {
    console.log({
      message: `search ${v}`,
    });
  },
};

const config2 = {
  style: {
    borderRadius: transformSize(100),
  },
  mode: 'search',
  onSearch: (v) => {
    console.log({
      message: `search ${v}`,
    });
  },
};

const config3 = {
  style: {},
  mode: 'navigate',
  searchStyle: {},
  onNavigate: () => {
    console.log({
      message: `navigate`,
    });
  },
};

const config4 = {
  style: {
    borderRadius: transformSize(100),
  },
  mode: 'navigate',
  showSearch: false,
  onNavigate: () => {
    console.log({
      message: `navigate`,
    });
  },
};

const config5 = {
  style: {
    borderRadius: transformSize(100),
  },
  align: 'center',
  icon: <IconSketch size={28} color="#6b6ead" />,
  placeholder: '搜索商品',
  mode: 'navigate',
  searchStyle: {
    color: '#4532e5',
  },
  valueStyle: {
    color: '#4532e5',
    align: 'center',
  },
  placeholderStyle: {
    color: '#4532e5',
  },
  onNavigate: () => {
    console.log({
      message: `navigate`,
    });
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '搜索条',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'SearchBar',
    name: '搜索条',
    description: '搜索条组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '搜索模式',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '搜索模式',
        config: config1,
      },
      {
        header: '搜索模式 半圆形',
        config: config2,
      },
      {
        header: '跳转模式',
        config: config3,
      },
      {
        header: '跳转模式 半圆形',
        config: config4,
      },
      {
        header: '自定义样式',
        config: config5,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <SearchBar key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </SearchBar>
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
          componentName="SearchBar"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={SearchBar.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
