import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Button, CenterBox, ScrollBox, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const itemStyle = {
  backgroundColor: '#ccc',
};

const one = {
  width: 400,
  style: {
    ...itemStyle,
  },
};

const config1 = {
  height: 280,
  direction: 'horizontal',
  gap: 30,
  list: [one, one, one, one, one, one, one, one, one, one],
  itemBuilder: (item, index) => {
    return (
      <View
        style={{
          width: transformSize(80 + (index + 1) * 45),
          height: '100%',
          backgroundColor: buildRandomHexColor({ seed: (index + 1) * 45 }),
        }}
      ></View>
    );
  },
};

const config11 = {
  enableIndicator: true,
  height: 280,
  direction: 'horizontal',
  gap: 30,
  list: [one, one, one, one, one, one, one, one, one, one],
  itemBuilder: (item, index) => {
    return (
      <View
        style={{
          width: transformSize(80 + (index + 1) * 45),
          height: '100%',
          backgroundColor: buildRandomHexColor({ seed: (index + 1) * 45 }),
        }}
      ></View>
    );
  },
  indicatorContainerStyle: {
    bottom: transformSize(20),
    height: transformSize(12),
  },
  indicatorTrackStyle: {
    backgroundColor: '#ddd111',
    borderRadius: transformSize(10),
  },
  indicatorStyle: {
    backgroundColor: '#1ed1f1',
    borderRadius: transformSize(10),
  },
};

const config3 = {
  height: 280,
  direction: 'horizontal',
  enableScroll: false,
  gap: 30,
  list: [one, one, one, one, one, one, one, one, one, one],
  itemBuilder: (item, index) => {
    return (
      <View
        style={{
          width: transformSize(80 + (index + 1) * 45),
          height: '100%',
          backgroundColor: buildRandomHexColor({ seed: (index + 1) * 45 }),
        }}
      ></View>
    );
  },
};

const config2 = {
  height: 700,
  direction: 'vertical',
  gap: 30,
  list: [one, one, one, one, one, one, one, one, one, one],
  itemBuilder: (item, index) => {
    return (
      <View
        style={{
          width: '100%',
          height: transformSize(80 + (index + 1) * 45),
          backgroundColor: buildRandomHexColor({ seed: (index + 1) * 45 }),
        }}
      ></View>
    );
  },
};

const config21 = {
  height: 700,
  direction: 'vertical',
  gap: 30,
  list: [one, one, one, one, one, one, one, one, one, one],
  itemBuilder: (item, index) => {
    return (
      <View
        style={{
          width: '100%',
          height: transformSize(80 + (index + 1) * 45),
          backgroundColor: buildRandomHexColor({ seed: (index + 1) * 45 }),
        }}
      ></View>
    );
  },
  enableIndicator: true,
  indicatorContainerStyle: {
    bottom: transformSize(20),
    height: transformSize(20),
  },
  indicatorTrackStyle: {
    backgroundColor: '#ddd111',
  },
  indicatorStyle: {
    backgroundColor: '#1ed1f1',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '滚动容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ScrollBox',
    name: '滚动容器',
    description: '滚动容器组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      current: 7,
      header: '水平模式显示导轨',
      currentConfig: config11,
    };
  }

  establishControlList = () => {
    return [
      {
        header: '水平模式显示导轨',
        config: config11,
      },
      {
        header: '水平模式',
        config: config1,
      },
      {
        header: '垂直模式显示导轨',
        config: config21,
      },
      {
        header: '垂直模式',
        config: config2,
      },
      {
        header: '禁止滚动',
        config: config3,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { current } = this.state;

    return (
      <ScrollBox key={key} {...{ ...config, current }}>
        {this.buildSimpleItemInner(inner)}
      </ScrollBox>
    );
  };

  setCurrent = (v) => {
    this.setState({
      current: toNumber(v),
    });
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Divider"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['itemBuilder']}
          controlBox={this.buildControlBox(this.establishControlList())}
          extraArea={
            <CenterBox>
              <Space>
                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.setCurrent(0);
                  }}
                >
                  滑动到 0
                </Button>

                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.setCurrent(2);
                  }}
                >
                  滑动到 3
                </Button>

                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.setCurrent(4);
                  }}
                >
                  滑动到 5
                </Button>
              </Space>
            </CenterBox>
          }
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={ScrollBox.defaultProps} labelWidth={250} />
      </Space>
    );
  };
}
