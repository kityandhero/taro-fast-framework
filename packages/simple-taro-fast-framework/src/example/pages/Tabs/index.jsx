import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Tabs,
  Badge,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import logoImg from '../../../assets/images/logo.png';

const { IconSketch } = Icon;

function buildPanel(i, style) {
  return <View style={style}>标签页{i + 1}的内容</View>;
}

function buildTabList(size, hasBody = false, style = {}) {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push({
      title: `标签页${i + 1}`,
      body: hasBody ? buildPanel(i, style) : null,
    });
  }

  return result;
}

const tabNoBodyList = buildTabList(3, false, {});

const tabList = buildTabList(3, true, {
  padding: `${transformSize(100)} ${transformSize(50)}`,
  backgroundColor: '#FAFBFC',
  textAlign: 'center',
});

const tabDecorationList = tabNoBodyList.map((item, index) => {
  if (index === 0) {
    return {
      ...item,
      ...{
        useBadge: true,
        badgeColor: 'red',
        badgeContent: Badge.dot,
        icon: <IconSketch size={24} />,
      },
    };
  }

  if (index === 1) {
    return {
      ...item,
      ...{
        useBadge: true,
        badgeContent: '更多',
        badgeColor: '#58ab3d',
        icon: <Icon size={36} imageMode value={logoImg} />,
      },
    };
  }

  return item;
});

const tabNoBodyScrollList = buildTabList(6, false, {});

const tabScrollList = buildTabList(6, true, {
  fontSize: transformSize(28),
  textAlign: 'center',
  padding: `${transformSize(100)} ${transformSize(50)}`,
});

const tabVerticalList = buildTabList(6, true, {
  fontSize: transformSize(28),
  textAlign: 'center',
  height: transformSize(200),
});

const config1 = {
  current: 2,
  tabList: tabNoBodyList,
};

const config2 = {
  hidden: true,
  tabList: tabNoBodyList,
};

const config3 = {
  tabList: tabNoBodyList,
  onClick: (index, e, item) => {
    console.log(item);
  },
};

const config4 = {
  titleStyle: {
    color: 'blue',
    padding: `${transformSize(10)} ${transformSize(20)}`,
  },
  titleActiveStyle: {
    color: 'red',
    fontWeight: '800',
  },
  tabList: tabNoBodyList,
};

const config5 = {
  current: 2,
  headerBackgroundColor: '#ccc',
  tabList: tabNoBodyList,
};

const config6 = {
  current: 2,
  underlineHeight: 6,
  underlineHorizontalMargin: 40,
  underlineColor: 'red',
  tabList: tabNoBodyList,
};

const config7 = {
  tabList: tabDecorationList,
};

const config8 = {
  showPanel: true,
  tabList: tabList,
};

const config9 = {
  scroll: true,
  tabList: tabNoBodyScrollList,
};

const config10 = {
  scroll: true,
  showPanel: true,
  tabList: tabScrollList,
};

const config11 = {
  current: 3,
  scroll: true,
  showPanel: true,
  height: transformSize(200),
  direction: 'vertical',
  tabList: tabVerticalList,
};

const config12 = {
  animated: false,
  showPanel: true,
  tabList: tabList,
};

const config13 = {
  animated: false,
  showPanel: true,
  panelStyle: {
    backgroundColor: 'red',
    padding: transformSize(40),
  },
  tabList: tabList,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '标签面板',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tabs',
    name: '标签面板',
    description: '标签面板组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="仅头部"
          config={config1}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
        >
          <Tabs {...config1} />
        </SimpleBox>

        <SimpleBox
          header="隐藏模式"
          config={config2}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox
        >
          <Tabs {...config2} />
        </SimpleBox>

        <SimpleBox
          header="点击事件"
          config={config3}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
        >
          <Tabs {...config3} />
        </SimpleBox>

        <SimpleBox
          header="标头样式"
          config={config4}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
        >
          <Tabs {...config4} />
        </SimpleBox>

        <SimpleBox
          header="头部背景"
          config={config5}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
        >
          <Tabs {...config5} />
        </SimpleBox>

        <SimpleBox
          header="下划线样式"
          config={config6}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
        >
          <Tabs {...config6} />
        </SimpleBox>

        <SimpleBox
          header="图标/徽记"
          config={config7}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['icon']}
        >
          <Tabs {...config7} />
        </SimpleBox>

        <SimpleBox
          header="Panel联动"
          config={config8}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['icon', 'body']}
        >
          <Tabs {...config8} />
        </SimpleBox>

        <SimpleBox
          header="滚动标签栏"
          config={config9}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
        >
          <Tabs {...config9} />
        </SimpleBox>

        <SimpleBox
          header="滚动标签栏Panel联动"
          config={config10}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['body']}
        >
          <Tabs {...config10} />
        </SimpleBox>

        <SimpleBox
          header="垂直模式"
          config={config11}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['body']}
        >
          <Tabs {...config11} />
        </SimpleBox>

        <SimpleBox
          header="禁止内容切换动画"
          config={config12}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['body']}
        >
          <Tabs {...config12} />
        </SimpleBox>

        <SimpleBox
          header="Panel样式"
          config={config13}
          space={false}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['body']}
        >
          <Tabs {...config13} />
        </SimpleBox>

        <PropertyBox
          header="Tabs 可配置项以及默认值"
          config={Tabs.defaultProps}
          labelWidth={360}
        />
      </Space>
    );
  };
}
