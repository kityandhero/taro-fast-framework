import { View } from '@tarojs/components';

import { getRandomColor, transformSize } from 'taro-fast-common/es/utils/tools';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import {
  ScrollBox,
  Space,
  CenterBox,
  Button,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '滚动容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ScrollBox',
    name: '滚动容器',
    description: '滚动容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        current: 7,
      },
    };
  }

  setCurrent = (v) => {
    this.setState({
      current: toNumber(v),
    });
  };

  renderContent = () => {
    const { current } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="水平模式 [默认]"
          config={config1}
          componentName="ScrollBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['itemBuilder']}
        >
          <Space direction="vertical" size={30} fillWidth>
            <ScrollBox {...config1} current={current} />

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
          </Space>
        </SimpleBox>

        <SimpleBox
          header="垂直模式"
          config={config2}
          componentName="ScrollBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['itemBuilder']}
        >
          <Space direction="vertical" size={30} fillWidth>
            <ScrollBox {...config2} current={current} />

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
          </Space>
        </SimpleBox>

        <PropertyBox config={ScrollBox.defaultProps} labelWidth={250} />
      </Space>
    );
  };
}
