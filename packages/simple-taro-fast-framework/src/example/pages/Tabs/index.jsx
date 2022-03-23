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
import CodeBox from '../../../customComponents/CodeBox';
import logoImg from '../../../assets/images/logo.png';

const { IconSketch } = Icon;

function buildPanel(i, style) {
  return <View style={style}>标签页{i + 1}的内容</View>;
}

function buildTabList(size, style) {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push({
      title: `标签页${i + 1}`,
      body: buildPanel(i, style),
    });
  }

  return result;
}

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
    const tabList = buildTabList(3, {
      padding: `${transformSize(100)} ${transformSize(50)}`,
      backgroundColor: '#FAFBFC',
      textAlign: 'center',
    });

    const tabDecorationList = tabList.map((item, index) => {
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

    const tabScrollList = buildTabList(6, {
      fontSize: transformSize(28),
      textAlign: 'center',
      padding: `${transformSize(100)} ${transformSize(50)}`,
    });

    const tabVerticalList = buildTabList(6, {
      fontSize: transformSize(28),
      textAlign: 'center',
      height: transformSize(200),
    });

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="仅头部" space={false}>
          <Tabs
            current={2}
            tabList={tabList}
            onClick={(i, e, item) => {
              console.log(item);
            }}
          />
        </SimpleBox>

        <SimpleBox header="标头样式" space={false}>
          <Tabs
            current={2}
            titleStyle={{
              color: 'blue',
              padding: `${transformSize(10)} ${transformSize(20)}`,
            }}
            titleActiveStyle={{
              color: 'red',
              fontWeight: '800',
            }}
            tabList={tabList}
            onClick={(i, e, item) => {
              console.log(item);
            }}
          />
        </SimpleBox>

        <SimpleBox header="头部背景" space={false}>
          <Tabs
            current={2}
            headerBackgroundColor="#ccc"
            tabList={tabList}
            onClick={(i, e, item) => {
              console.log(item);
            }}
          />
        </SimpleBox>

        <SimpleBox header="下划线样式" space={false}>
          <Tabs
            current={2}
            underlineHeight={6}
            underlineHorizontalMargin={40}
            underlineColor="red"
            tabList={tabList}
            onClick={(i, e, item) => {
              console.log(item);
            }}
          />
        </SimpleBox>

        <SimpleBox header="图标/徽记" space={false}>
          <Tabs
            current={2}
            titleStyle={{
              color: '',
            }}
            tabList={tabDecorationList}
            onClick={(i, e, item) => {
              console.log(item);
            }}
          />
        </SimpleBox>

        <SimpleBox header="Panel联动" space={false}>
          <Tabs showPanel tabList={tabList} />
        </SimpleBox>

        <SimpleBox header="滚动标签栏" space={false}>
          <Tabs scroll tabList={tabScrollList} />
        </SimpleBox>

        <SimpleBox header="滚动标签栏Panel联动" space={false}>
          <Tabs showPanel scroll tabList={tabScrollList} />
        </SimpleBox>

        <SimpleBox header="垂直模式" space={false}>
          <Tabs
            current={3}
            scroll
            showPanel
            height={transformSize(200)}
            direction="vertical"
            tabList={tabVerticalList}
          />
        </SimpleBox>

        <SimpleBox header="禁止内容切换动画" space={false}>
          <Tabs animated={false} showPanel tabList={tabList} />
        </SimpleBox>

        <SimpleBox header="Panel样式" space={false}>
          <Tabs
            showPanel
            tabList={tabList}
            animated={false}
            panelStyle={{
              backgroundColor: 'red',
              padding: transformSize(40),
            }}
          />
        </SimpleBox>

        <CodeBox
          componentName="Tabs"
          mockChildren
          useInnerBox={false}
          config={{
            scroll: true,
            showPanel: true,
            direction: 'vertical',
            tabList: [
              {
                title: '标签页1',
                body: null,
              },
              {
                title: '标签页2',
                body: null,
              },
              {
                title: '标签页3',
                body: null,
              },
              {
                title: '标签页4',
                body: null,
              },
              {
                title: '标签页5',
                body: null,
              },
              {
                title: '标签页6',
                body: null,
              },
            ],
            panelStyle: {
              backgroundColor: 'red',
              padding: transformSize(40),
            },
            onClick: () => {
              console.log('onClick');
            },
          }}
        />

        <PropertyBox
          header="Tabs 可配置项以及默认值"
          config={Tabs.defaultProps}
          labelWidth={360}
        />
      </Space>
    );
  };
}
