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
        header: '默认',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '水平模式',
        config: config1,
      },
      {
        header: '垂直模式',
        config: config2,
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
    const { header, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
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
