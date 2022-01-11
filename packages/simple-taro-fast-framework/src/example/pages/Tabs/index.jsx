import { View } from '@tarojs/components';

import { BlockArea, Tabs } from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

const { TabPanel } = Tabs;

const tabList = [
  { title: '标签页1' },
  { title: '标签页2' },
  { title: '标签页3' },
];

const contentStyle = { padding: '0' };

export default class Index extends PageWrapper {
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

  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="基本用法" contentStyle={contentStyle}>
          <Tabs
            current={this.state.current1}
            tabList={tabList}
            onClick={(v) => {
              this.handleClick1(v);
            }}
          >
            <TabPanel current={this.state.current1} index={0}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current1} index={1}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current1} index={2}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页三的内容
              </View>
            </TabPanel>
          </Tabs>
        </BlockArea>

        <BlockArea title="滚动标签栏" contentStyle={contentStyle}>
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
              <View style="font-size:18px;text-align:center;height:100px;">
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={1}>
              <View style="font-size:18px;text-align:center;height:100px;">
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={2}>
              <View style="font-size:18px;text-align:center;height:100px;">
                标签页三的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={3}>
              <View style="font-size:18px;text-align:center;height:100px;">
                标签页四的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={4}>
              <View style="font-size:18px;text-align:center;height:100px;">
                标签页五的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current2} index={5}>
              <View style="font-size:18px;text-align:center;height:100px;">
                标签页六的内容
              </View>
            </TabPanel>
          </Tabs>
        </BlockArea>

        <BlockArea title="垂直模式" contentStyle={contentStyle}>
          <Tabs
            current={this.state.current3}
            scroll
            height="200px"
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
              <View style="font-size:18px;text-align:center;height:200px;">
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={1}
            >
              <View style="font-size:18px;text-align:center;height:200px;">
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={2}
            >
              <View style="font-size:18px;text-align:center;height:200px;">
                标签页三的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={3}
            >
              <View style="font-size:18px;text-align:center;height:200px;">
                标签页四的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={4}
            >
              <View style="font-size:18px;text-align:center;height:200px;">
                标签页五的内容
              </View>
            </TabPanel>
            <TabPanel
              direction="vertical"
              current={this.state.current3}
              index={5}
            >
              <View style="font-size:18px;text-align:center;height:200px;">
                标签页六的内容
              </View>
            </TabPanel>
          </Tabs>
        </BlockArea>

        <BlockArea title="禁止内容切换动画" contentStyle={contentStyle}>
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
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页一的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current4} index={1}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页二的内容
              </View>
            </TabPanel>
            <TabPanel current={this.state.current4} index={2}>
              <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                标签页三的内容
              </View>
            </TabPanel>
          </Tabs>
        </BlockArea>
      </View>
    );
  }
}
