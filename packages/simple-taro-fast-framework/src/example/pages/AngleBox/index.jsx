import { connect } from 'react-redux';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  AngleBox,
  CenterBox,
  FixedBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const configCore = {
  style: {
    backgroundColor: '#ddd',
    height: transformSize(180),
    width: transformSize(180),
  },
  backgroundColor: 'green',
  angleSize: 80,
  angle: '推荐',
  fontSize: 20,
};

const config1 = {
  ...configCore,
  ...{
    position: 'topLeft',
  },
};

const config2 = {
  ...configCore,
  ...{
    position: 'topRight',
  },
};

const config3 = {
  ...configCore,
  ...{
    position: 'bottomLeft',
  },
};

const config4 = {
  ...configCore,
  ...{
    position: 'bottomRight',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'AngleBox布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'AngleBox',
    name: '角标容器',
    description: '角标容器',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showTransition: true,
        header: '左上角标',
        currentConfig: config1,
        inner: <CenterBox>内部内容</CenterBox>,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '左上角标',
        config: config1,
        inner: <CenterBox>内部内容</CenterBox>,
      },
      {
        header: '右上角标',
        config: config2,
        inner: <CenterBox>内部内容</CenterBox>,
      },
      {
        header: '左下角标',
        config: config3,
        inner: <CenterBox>内部内容</CenterBox>,
      },
      {
        header: '右下角标',
        config: config4,
        inner: <CenterBox>内部内容</CenterBox>,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <AngleBox
        key={key}
        {...{
          ...config,
        }}
      >
        {this.buildSimpleItemInner(inner || '内部内容')}
      </AngleBox>
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
