import { Button, View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Tabs,
  Badge,
  Icon,
  Space,
  Grid,
  ColorText,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import logoImg from '../../../assets/images/logo.png';

const { IconSketch } = Icon;

const singlePanelComponent = (
  <View
    style={{
      height: transformSize(800),
      padding: `${transformSize(100)} ${transformSize(50)}`,
      backgroundColor: '#FAFBFC',
      textAlign: 'center',
    }}
  >
    单面板
  </View>
);

function buildPanel(i, style) {
  return <View style={style}>标签页{i + 1}的内容</View>;
}

function buildTabList(size, hasBody = false, style = {}) {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push({
      ...{
        title: `标签页${i + 1}`,
      },
      ...(hasBody ? { body: buildPanel(i, style) } : {}),
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

const tabNoBodyScrollList = buildTabList(9, false, {});

const tabScrollList = buildTabList(9, true, {
  fontSize: transformSize(28),
  textAlign: 'center',
  padding: `${transformSize(100)} ${transformSize(50)}`,
});

const tabVerticalList = buildTabList(9, true, {
  fontSize: transformSize(28),
  textAlign: 'center',
  height: transformSize(200),
});

const tabVerticalDecorationList = tabVerticalList.map((item, index) => {
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

  return {
    ...item,
    ...{
      icon: <IconSketch size={24} />,
    },
  };
});

const configHorizontalHeight = {
  horizontalMultiPanelHeight: 238,
};

const config1 = {
  underline: true,
  underlineHorizontalHeight: 1,
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
    console.log({
      index,
      item,
    });
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
  underlineHorizontalHeight: 6,
  underlineHorizontalMargin: 40,
  underlineColor: 'red',
  tabList: tabNoBodyList,
};

const config61 = {
  current: 2,
  titleStyle: {
    color: 'blue',
    padding: `${transformSize(10)} ${transformSize(20)}`,
  },
  titleActiveStyle: {
    color: 'red',
    fontWeight: '800',
  },
  underline: false,
  tabList: tabNoBodyList,
};

const config7 = {
  height: transformSize(80),
  tabList: tabDecorationList,
};

const config71 = {
  showPanel: true,
  singlePanel: true,
  tabList: tabNoBodyList,
  panel: singlePanelComponent,
};

const config8 = {
  ...configHorizontalHeight,
  showPanel: true,
  singlePanel: false,
  tabList: tabList,
};

const config9 = {
  scroll: true,
  tabList: tabNoBodyScrollList,
};

const config10 = {
  ...configHorizontalHeight,
  scroll: true,
  showPanel: true,
  singlePanel: false,
  tabList: tabScrollList,
};

const config101 = {
  ...configHorizontalHeight,
  scroll: true,
  showPanel: true,
  singlePanel: true,
  tabList: tabScrollList,
  panel: singlePanelComponent,
};

const config11 = {
  current: 3,
  showPanel: true,
  singlePanel: false,
  verticalScrollHeight: transformSize(500),
  verticalTabWidth: transformSize(220),
  bodyStyle: {
    borderLeft: 'var(--tfc-1) solid var(--tfc-border-color)',
  },
  direction: 'vertical',
  tabList: tabVerticalDecorationList,
};

const config111 = {
  current: 3,
  showPanel: true,
  singlePanel: true,
  verticalTabWidth: transformSize(220),
  bodyStyle: {
    borderLeft: 'var(--tfc-1) solid var(--tfc-border-color)',
  },
  direction: 'vertical',
  tabList: tabVerticalDecorationList,
  panel: singlePanelComponent,
};

const config12 = {
  ...configHorizontalHeight,
  animated: false,
  showPanel: true,
  tabList: tabList,
};

const config13 = {
  horizontalMultiPanelHeight: 318,
  animated: false,
  showPanel: true,
  singlePanel: false,
  panelStyle: {
    backgroundColor: 'red',
    padding: transformSize(40),
  },
  tabList: tabList,
};

const config14 = {
  current: 3,
  scroll: true,
  showPanel: true,
  singlePanel: false,
  verticalScrollHeight: transformSize(400),
  bodyStyle: {
    borderLeft: 'var(--tfc-1) solid var(--tfc-border-color)',
  },
  direction: 'vertical',
  tabList: tabVerticalList,
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '仅头部',
        currentConfig: config1,
      },
    };
  }

  buildGridItem = ({ title, handler }) => {
    return (
      <Grid.Item>
        <CenterBox>
          <Button
            size="mini"
            style={{
              width: '98%',
            }}
            onClick={() => {
              handler(title);
            }}
          >
            <ColorText text={title} />
          </Button>
        </CenterBox>
      </Grid.Item>
    );
  };

  renderContent = () => {
    const { header, currentConfig } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          config={currentConfig}
          componentName="Tabs"
          mockChildren={false}
          useInnerBox
          innerBoxCenterMode={false}
          innerBoxPadding={false}
          ignorePropertyList={['icon', 'body', 'panel']}
          controlBox={
            <Grid columns={2} gap={12}>
              {this.buildGridItem({
                title: '仅头部',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config1,
                  });
                },
              })}

              {this.buildGridItem({
                title: '隐藏模式',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config2,
                  });
                },
              })}

              {this.buildGridItem({
                title: '点击事件',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config3,
                  });
                },
              })}

              {this.buildGridItem({
                title: '标头样式',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config4,
                  });
                },
              })}

              {this.buildGridItem({
                title: '头部背景',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config5,
                  });
                },
              })}

              {this.buildGridItem({
                title: '下划线样式',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config6,
                  });
                },
              })}

              {this.buildGridItem({
                title: '隐藏下划线',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config61,
                  });
                },
              })}

              {this.buildGridItem({
                title: '图标/徽记',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config7,
                  });
                },
              })}

              {this.buildGridItem({
                title: '单面板',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config71,
                  });
                },
              })}

              {this.buildGridItem({
                title: '多面板联动',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config8,
                  });
                },
              })}

              {this.buildGridItem({
                title: '滚动标签',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config9,
                  });
                },
              })}

              {this.buildGridItem({
                title: '滚动单面板',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config101,
                  });
                },
              })}

              {this.buildGridItem({
                title: '滚动多面板联动',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config10,
                  });
                },
              })}

              {this.buildGridItem({
                title: '禁止内容切换动画',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config12,
                  });
                },
              })}

              {this.buildGridItem({
                title: '面板样式',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config13,
                  });
                },
              })}

              {this.buildGridItem({
                title: '垂直模式',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config11,
                  });
                },
              })}

              {this.buildGridItem({
                title: '垂直单面板',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config111,
                  });
                },
              })}

              {this.buildGridItem({
                title: '垂直多面板滚动',
                handler: (text) => {
                  this.setState({
                    header: text,
                    currentConfig: config14,
                  });
                },
              })}
            </Grid>
          }
        >
          <Tabs {...currentConfig} />
        </SimpleBox>

        <PropertyBox
          header="Tabs 可配置项以及默认值"
          config={Tabs.defaultProps}
          labelWidth={370}
        />
      </Space>
    );
  };
}
