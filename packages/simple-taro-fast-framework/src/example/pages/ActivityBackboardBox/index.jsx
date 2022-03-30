import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Space,
  ActivityBackboardBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const textBoxStyle = {
  color: '#fff',
};

const config1 = {
  style: {
    width: '100%',
  },
  height: 200,
  backboardStyle: {
    height: transformSize(100),
    backgroundColor: 'red',
    width: 'calc(100% - var(--tfc-40))',
    top: transformSize(-80),
    left: transformSize(20),
    right: transformSize(20),
    margin: 'auto',
    borderRadius: transformSize(10),
  },
  contentStyle: {
    height: transformSize(100),
    backgroundColor: '#ccc',
  },
  backboardChildren: <CenterBox style={textBoxStyle}>背板内容</CenterBox>,
};

const config2 = {
  style: {
    width: '100%',
  },
  height: 200,
  backboardStyle: {
    height: transformSize(100),
    backgroundColor: 'red',
    width: 'calc(100% + var(--tfc-40))',
    bottom: transformSize(-180),
    left: transformSize(-20),
    right: transformSize(-20),
    margin: 'auto',
    borderRadius: transformSize(10),
  },
  contentStyle: {
    height: transformSize(100),
    backgroundColor: '#ccc',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '背板容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ActivityBackboardBox',
    name: '背板容器',
    description: '背板容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '使用样例1',
        currentConfig: config1,
        inner: <CenterBox style={textBoxStyle}>容器内容</CenterBox>,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '使用样例1',
        config: config1,
        inner: <CenterBox style={textBoxStyle}>容器内容</CenterBox>,
      },
      {
        header: '使用样例2',
        config: config2,
        inner: <CenterBox style={textBoxStyle}>容器内容</CenterBox>,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <ActivityBackboardBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </ActivityBackboardBox>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="ActivityBackboardBox"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'backboardChildren']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          <View
            style={{
              width: '100%',
              height: transformSize(400),
              padding: transformSize(60),
            }}
          >
            <CenterBox>{this.buildSimpleList()}</CenterBox>
          </View>
        </SimpleBox>

        <PropertyBox
          config={ActivityBackboardBox.defaultProps}
          labelWidth={240}
        />
      </Space>
    );
  };
}