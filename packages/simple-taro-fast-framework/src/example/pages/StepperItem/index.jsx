import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Icon,
  Space,
  StepperItem,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const { IconSketch } = Icon;

function onChangeCore(v) {
  console.log(v);
}

const config1 = {
  label: '购买数量',
  border: false,
  onChange: onChangeCore,
};

const config2 = {
  label: '购买数量',
  description: '请增减购买数量',
  clickable: true,
  arrow: true,
  onChange: onChangeCore,
};

const config3 = {
  label: '购买数量',
  disabled: true,
};

const config4 = {
  label: '购买数量',
  stepperStyle: {
    // '--border': `${transformSize(1)} solid #f5f5f5`,
    '--border-inner': 'none',
    '--height': transformSize(36),
    '--input-width': transformSize(70),
    '--input-background-color': '#ffffff',
  },
  iconSize: 20,
  operateColor: '#fff',
  backgroundColor: '#a123e4',
  circle: true,
  defaultValue: 45,
  step: 1,
};

const config5 = {
  ...{
    prefix: <IconSketch size={36} />,
    description: '请增减购买数量',
    clickable: true,
    arrow: true,
  },
  ...config4,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '进步项',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'StepperItem',
    name: '进步项',
    description: '进步项组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基础用法',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础用法',
        config: config1,
      },
      {
        header: '复杂布局',
        config: config2,
      },
      {
        header: '禁用状态',
        config: config3,
      },
      {
        header: '自定义样式',
        config: config4,
      },
      {
        header: '复杂配置',
        config: config5,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <StepperItem key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </StepperItem>
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
          componentName="StepperItem"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={StepperItem.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
