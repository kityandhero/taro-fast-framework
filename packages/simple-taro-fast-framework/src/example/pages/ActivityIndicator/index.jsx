import { View } from '@tarojs/components';

import {
  Space,
  Loading,
  ActivityIndicator,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config5 = {
  type: 'comet',
};

const config6 = {
  content: 'loading',
};

const config7 = {
  mode: 'center',
  content: 'loading',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '加载提示',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Loading',
    name: '加载提示',
    description: '加载提示组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '加载提示',
        currentConfig: {},
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '加载提示',
        config: {},
      },
      {
        header: '设置图标',
        config: config5,
      },
      {
        span: 2,
        header: '加载提示文字',
        config: config6,
      },
    ];
  };

  renderContent = () => {
    const { header, currentConfig } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          config={currentConfig}
          componentName="ActivityIndicator"
          mockChildren={false}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          <ActivityIndicator {...currentConfig} />
        </SimpleBox>

        <SimpleBox
          header="居中显示"
          config={config7}
          componentName="ActivityIndicator"
          mockChildren={false}
          useInnerBox
        >
          <View
            style={{
              border: 'var(--tfc-1) solid #ccc',
              height: 'var(--tfc-200)',
              position: 'relative',
              width: '100%',
            }}
          >
            <ActivityIndicator
              {...config7}
              componentName="ActivityIndicator"
              mockChildren={false}
              useInnerBox
            />
          </View>
        </SimpleBox>

        <PropertyBox
          header="Loading 可配置项以及默认值"
          config={Loading.defaultProps}
          labelWidth={270}
        />

        <PropertyBox
          header="ActivityIndicator 可配置项以及默认值"
          config={ActivityIndicator.defaultProps}
          labelWidth={270}
        />
      </Space>
    );
  };
}
