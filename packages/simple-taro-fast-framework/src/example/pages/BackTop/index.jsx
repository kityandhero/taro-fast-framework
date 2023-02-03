import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { getSystemInfo, pageScrollTo, transformSize } from 'taro-fast-common';
import { BackTop, HorizontalCenterBox, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const config1 = {};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '返回头部',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Badge',
    name: '返回头部',
    description: '返回头部组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible1: false,
        header: '样例1',
        currentConfig: config1,
      },
    };

    const { screenHeight } = getSystemInfo();

    this.thresholdDistance = screenHeight / 2;
  }

  establishControlList = () => {
    return [
      {
        header: '样例1',
        config: config1,
      },
      {
        header: '样例2',
        config: {
          right: 120,
          opacity: 0.4,
          circle: false,
          iconColor: 'red',
          backgroundColor: '#000',
        },
      },
      {
        header: '样例3',
        config: {
          bottom: 400,
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { visible1 } = this.state;

    return (
      <BackTop
        key={key}
        {...{
          ...config,
          ...{
            visible: visible1,
            onClick: this.scrollToTop,
          },
        }}
      >
        {this.buildSimpleItemInner(inner)}
      </BackTop>
    );
  };

  onPageScroll(e) {
    const { visible1 } = this.state;

    if (!visible1 && e.scrollTop >= this.thresholdDistance) {
      this.setState({
        visible1: true,
      });
    }

    if (visible1 && e.scrollTop < this.thresholdDistance) {
      this.setState({
        visible1: false,
      });
    }
  }

  scrollToTop = () => {
    pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <View
          style={{
            height: transformSize(1200),
            border: 'var(--tfc-2) solid #ccc',
            backgroundColor: '#ccc',
          }}
        >
          <HorizontalCenterBox>
            <View>向下滚动</View>
          </HorizontalCenterBox>
        </View>

        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="BackTop"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={BackTop.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
