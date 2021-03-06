import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { getRandomColor, transformSize } from 'taro-fast-common/es/utils/tools';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import {
  Button,
  CenterBox,
  ScrollBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

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
          backgroundColor: getRandomColor({ seed: (index + 1) * 45 }),
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
          backgroundColor: getRandomColor({ seed: (index + 1) * 45 }),
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
          backgroundColor: getRandomColor({ seed: (index + 1) * 45 }),
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
          backgroundColor: getRandomColor({ seed: (index + 1) * 45 }),
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
          backgroundColor: getRandomColor({ seed: (index + 1) * 45 }),
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
  navigationBarTitleText: '????????????',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ScrollBox',
    name: '????????????',
    description: '??????????????????',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        current: 7,
        header: '????????????????????????',
        currentConfig: config11,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '????????????????????????',
        config: config11,
      },
      {
        header: '????????????',
        config: config1,
      },
      {
        header: '????????????????????????',
        config: config21,
      },
      {
        header: '????????????',
        config: config2,
      },
      {
        header: '????????????',
        config: config3,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { current } = this.state;

    return (
      <ScrollBox key={key} {...{ ...config, ...{ current } }}>
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
                  ????????? 0
                </Button>

                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.setCurrent(2);
                  }}
                >
                  ????????? 3
                </Button>

                <Button
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.setCurrent(4);
                  }}
                >
                  ????????? 5
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
