import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { FixedBox, Space } from 'taro-fast-component';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const style = {
  lineHeight: '1',
  padding: `${transformSize(40)} ${transformSize(80)}`,
  backgroundColor: '#ccc',
  textAlign: 'center',
};

const config1 = {
  zIndex: 1000,
  style,
};

const config2 = {
  zIndex: 1000,
  style,
  top: 0,
  right: 0,
};

const config3 = {
  zIndex: 1000,
  style,
  left: 0,
  bottom: 0,
};

const config4 = {
  zIndex: 1000,
  style,
  right: 0,
  bottom: 0,
};

const config5 = {
  zIndex: 1000,
  width: 200,
  height: 40,
  zIndex: 1000,
  center: true,
  useTransition: true,
  style: {
    ...style,
    ...{
      textAlign: 'center',
    },
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Flex布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Flex',
    name: '固定容器',
    description: '固定容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showTransition: true,
        header: '仅左侧布局',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '左上',
        config: config1,
      },
      {
        header: '右上',
        config: config2,
      },
      {
        header: '左下',
        config: config3,
      },
      {
        header: '右下',
        config: config4,
      },
      {
        header: '附带动画',
        config: config5,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { showTransition } = this.state;

    return (
      <FixedBox
        key={key}
        {...{
          ...config,
          ...{
            show: showTransition,
          },
        }}
      >
        {this.buildSimpleItemInner(inner || '内部内容')}
      </FixedBox>
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
          componentName="FlexBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={FixedBox.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
