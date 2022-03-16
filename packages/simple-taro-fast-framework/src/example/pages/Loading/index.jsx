import { View } from '@tarojs/components';

import {
  Space,
  Loading,
  ActivityIndicator,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  type: 'comet',
};

const config2 = {
  color: '#4589e1',
};

const config3 = {
  size: 48,
};

const config4 = {
  borderWidth: 8,
};

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

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="例子">
          <Loading />
        </SimpleBox>

        <SimpleBox header="图标" config={config1}>
          <Loading {...config1} />
        </SimpleBox>

        <SimpleBox header="设置颜色" config={config2}>
          <Loading {...config2} />
        </SimpleBox>

        <SimpleBox header="设置大小" config={config3}>
          <Loading {...config3} />
        </SimpleBox>

        <SimpleBox header="设置线条宽度" config={config4}>
          <Loading {...config4} />
        </SimpleBox>

        <SimpleBox header="加载提示">
          <ActivityIndicator />
        </SimpleBox>

        <SimpleBox header="加载提示图标" config={config5}>
          <ActivityIndicator {...config5} />
        </SimpleBox>

        <SimpleBox header="加载提示文字" config={config6}>
          <ActivityIndicator {...config6} />
        </SimpleBox>

        <SimpleBox header="居中显示" config={config7}>
          <View
            style={{
              border: 'var(--tfc-1) solid #ccc',
              height: 'var(--tfc-200)',
              position: 'relative',
            }}
          >
            <ActivityIndicator {...config7} />
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
