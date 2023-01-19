import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import {
  ActivityIndicator,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

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

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
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
        header: '加载提示文字',
        config: config6,
      },
      {
        header: '居中显示',
        config: config7,
        wrapBuilder: (one) => {
          return (
            <View
              style={{
                border: 'var(--tfc-1) solid #ccc',
                height: 'var(--tfc-200)',
                position: 'relative',
                width: '100%',
              }}
            >
              {one}
            </View>
          );
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <ActivityIndicator key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </ActivityIndicator>
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
          componentName="ActivityIndicator"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox
          header="ActivityIndicator 可配置项以及默认值"
          config={ActivityIndicator.defaultProps}
          labelWidth={270}
          description={[
            {
              text: 'center: 为true时, 需要父容器设置为相对定位',
            },
          ]}
        />
      </Space>
    );
  };
}
