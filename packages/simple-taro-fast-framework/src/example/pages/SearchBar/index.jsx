import {
  transformSize,
  showInfoMessage,
} from 'taro-fast-common/es/utils/tools';
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
  style: {
    margin: transformSize(40),
  },
  mode: 'search',
  onSearch: (v) => {
    console.log({
      message: `触发搜索 ${v}`,
    });
  },
};

const config2 = {
  style: {
    margin: transformSize(40),
    borderRadius: transformSize(100),
  },
  mode: 'search',
  onSearch: (v) => {
    console.log({
      message: `触发搜索 ${v}`,
    });
  },
};

const config3 = {
  style: {
    margin: transformSize(40),
  },
  mode: 'navigate',
  searchStyle: {},
  onNavigate: () => {
    console.log({
      message: `触发跳转`,
    });
  },
};

const config4 = {
  style: {
    margin: transformSize(40),
    borderRadius: transformSize(100),
  },
  mode: 'navigate',
  showSearch: false,
  onNavigate: () => {
    console.log({
      message: `触发跳转`,
    });
  },
};

const config5 = {
  style: {
    margin: transformSize(40),
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
      message: `触发跳转`,
    });
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '搜索条',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'SearchBar',
    name: '搜索条',
    description: '搜索条组件',
  };

  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  handleSearch = (v) => {
    showInfoMessage({
      message: `触发搜索 ${v}`,
    });
  };

  handleNavigate = () => {
    showInfoMessage({
      message: `触发跳转`,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="搜索模式"
          config={config1}
          extra="查看控制台"
          componentName="SearchBar"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <SearchBar {...config1} />
        </SimpleBox>

        <SimpleBox
          header="搜索模式 半圆形"
          config={config2}
          extra="查看控制台"
          componentName="SearchBar"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <SearchBar {...config2} />
        </SimpleBox>

        <SimpleBox
          header="跳转模式"
          config={config3}
          extra="查看控制台"
          componentName="SearchBar"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <SearchBar {...config3} />
        </SimpleBox>

        <SimpleBox
          header="跳转模式 半圆形"
          config={config4}
          extra="查看控制台"
          componentName="SearchBar"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <SearchBar {...config4} />
        </SimpleBox>

        <SimpleBox
          header="自定义样式"
          config={config5}
          extra="查看控制台"
          componentName="SearchBar"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['icon']}
        >
          <SearchBar {...config5} />
        </SimpleBox>

        <PropertyBox config={SearchBar.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
