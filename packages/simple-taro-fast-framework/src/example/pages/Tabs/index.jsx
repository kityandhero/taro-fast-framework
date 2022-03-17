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
const { TabPanel } = Tabs;

const tabList = [
  {
    title: '标签页1',
    useBadge: true,
    badgeColor: 'red',
    badgeContent: Badge.dot,
    icon: <IconSketch size={24} />,
  },
  {
    title: '标签页2',
    useBadge: true,
    badgeContent: '更多',
    badgeColor: '#58ab3d',
    icon: <Icon size={36} imageMode value={logoImg} />,
  },
  { title: '标签页3' },
];

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
        current1: 0,
        current2: 0,
        current3: 0,
        current4: 0,
      },
    };
  }

  handleClick1 = (value) => {
    this.setState({
      current1: value,
    });
  };

  handleClick2 = (value) => {
    this.setState({
      current2: value,
    });
  };

  handleClick3 = (value) => {
    this.setState({
      current3: value,
    });
  };

  handleClick4 = (value) => {
    this.setState({
      current4: value,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="基本用法" space={false}>
          <Tabs
            current={this.state.current1}
            tabList={tabList}
            onClick={(v) => {
              this.handleClick1(v);
            }}
          >
            <TabPanel current={this.state.current1} index={0}>
              <View
                style={{
                  padding: `${transformSize(100)} ${transformSize(50)}`,
                  backgroundColor: '#FAFBFC',
                  textAlign: 'center',
                }}
              >
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current1} index={1}>
              <View
                style={{
                  padding: `${transformSize(100)} ${transformSize(50)}`,
                  backgroundColor: '#FAFBFC',
                  textAlign: 'center',
                }}
              >
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current1} index={2}>
              <View
                style={{
                  padding: `${transformSize(100)} ${transformSize(50)}`,
                  backgroundColor: '#FAFBFC',
                  textAlign: 'center',
                }}
              >
                标签页三的内容
              </View>
            </TabPanel>
          </Tabs>
        </SimpleBox>

        <SimpleBox header="滚动标签栏" space={false}>
          <Tabs
            current={this.state.current2}
            scroll
            tabList={[
              { title: '标签页1' },
              { title: '标签页2' },
              { title: '标签页3' },
              { title: '标签页4' },
              { title: '标签页5' },
              { title: '标签页6' },
            ]}
            onClick={(v) => {
              this.handleClick2(v);
            }}
          >
            <TabPanel current={this.state.current2} index={0}>
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(100),
                }}
              >
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={1}>
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(100),
                }}
              >
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={2}>
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(100),
                }}
              >
                标签页三的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={3}>
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(100),
                }}
              >
                标签页四的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={4}>
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(100),
                }}
              >
                标签页五的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={5}>
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(100),
                }}
              >
                标签页六的内容
              </View>
            </TabPanel>
          </Tabs>
        </SimpleBox>

        <SimpleBox header="垂直模式" space={false}>
          <Tabs
            current={this.state.current3}
            scroll
            height={transformSize(200)}
            direction="vertical"
            tabList={[
              { title: '标签页1' },
              { title: '标签页2' },
              { title: '标签页3' },
              { title: '标签页4' },
              { title: '标签页5' },
              { title: '标签页6' },
            ]}
            onClick={(v) => {
              this.handleClick3(v);
            }}
          >
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={0}
            >
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(200),
                }}
              >
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={1}
            >
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(200),
                }}
              >
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={2}
            >
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(200),
                }}
              >
                标签页三的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={3}
            >
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(200),
                }}
              >
                标签页四的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={4}
            >
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(200),
                }}
              >
                标签页五的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={5}
            >
              <View
                style={{
                  fontSize: transformSize(28),
                  textAlign: 'center',
                  height: transformSize(200),
                }}
              >
                标签页六的内容
              </View>
            </TabPanel>
          </Tabs>
        </SimpleBox>

        <SimpleBox header="禁止内容切换动画" space={false}>
          <Tabs
            animated={false}
            current={this.state.current4}
            tabList={[
              { title: '标签页1' },
              { title: '标签页2' },
              { title: '标签页3' },
            ]}
            onClick={(v) => {
              this.handleClick4(v);
            }}
          >
            <TabPanel current={this.state.current4} index={0}>
              <View
                style={{
                  padding: `${transformSize(100)} ${transformSize(50)}`,
                  backgroundColor: '#FAFBFC',

                  textAlign: 'center',
                }}
              >
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current4} index={1}>
              <View
                style={{
                  padding: `${transformSize(100)} ${transformSize(50)}`,
                  backgroundColor: '#FAFBFC',

                  textAlign: 'center',
                }}
              >
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current4} index={2}>
              <View
                style={{
                  padding: `${transformSize(100)} ${transformSize(50)}`,
                  backgroundColor: '#FAFBFC',

                  textAlign: 'center',
                }}
              >
                标签页三的内容
              </View>
            </TabPanel>
          </Tabs>
        </SimpleBox>

        <PropertyBox
          header="Tabs 可配置项以及默认值"
          config={Tabs.defaultProps}
          labelWidth={150}
        />

        <PropertyBox
          header="TabPanel 可配置项以及默认值"
          config={TabPanel.defaultProps}
          labelWidth={150}
        />
      </Space>
    );
  };
}
