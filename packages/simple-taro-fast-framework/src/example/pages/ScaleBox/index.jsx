import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { ScaleBox, Space } from 'taro-fast-component';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const style = {
  backgroundColor: '#ccc',
};

const config1 = { style };

const config2 = { style, aspectRatio: 0.5 };

const config3 = { style, aspectRatio: 1.3, padding: 30 };

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '比例容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'FadeInBox',
    name: '比例容器',
    description: '根据父容器大小，按照设定的长宽比等比例改变',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认展示',
        currentConfig: config1,
        description: '默认长宽比为1, 即正方形',
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认展示',
        config: config1,
        description: '默认长宽比为1, 即正方形',
      },
      {
        header: '设置长宽比',
        config: config2,
      },
      {
        header: '设置padding',
        config: config3,
        description: 'padding将根据长宽比进行同比例缩放',
        inner: (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
            }}
          />
        ),
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <ScaleBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </ScaleBox>
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
          componentName="ScaleBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={ScaleBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
