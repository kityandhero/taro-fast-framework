import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  FixedBox,
  Space,
  TitleBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const configCore = {
  style: {
    backgroundColor: '#ddd',
    height: transformSize(80),
    paddingLeft: transformSize(20),
  },
  title: '这是标题',
  titleStyle: {
    color: 'blue',
    fontSize: transformSize(32),
  },
};

const config1 = {
  ...configCore,
};

const config2 = {
  ...configCore,
  ...{
    subtitle: '这是副标题',
    subtitleStyle: {
      color: 'green',
      fontSize: transformSize(26),
      paddingLeft: transformSize(14),
    },
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'TitleBox布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'TitleBox',
    name: '标题容器',
    description: '标题容器',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showTransition: true,
        header: '布局展示',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '仅标题',
        config: config1,
      },
      {
        header: '含有副标题',
        config: config2,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <TitleBox
        key={key}
        {...{
          ...config,
        }}
      >
        {this.buildSimpleItemInner(inner || '内部内容')}
      </TitleBox>
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
