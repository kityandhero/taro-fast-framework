import { connect } from 'react-redux';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Stepper, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

function onChangeCore(v) {
  console.log(v);
}

const config1 = {
  defaultValue: 1,
  onChange: onChangeCore,
};

const config3 = {
  step: 10,
  defaultValue: 10,
  onChange: onChangeCore,
};

const config4 = {
  min: -5,
  max: 5,
  onChange: onChangeCore,
};

const config5 = {
  digits: 0,
  onChange: onChangeCore,
};

const config6 = {
  digits: 1,
  step: 0.1,
  onChange: onChangeCore,
};

const config7 = {
  disabled: true,
};

const config8 = {
  inputReadOnly: true,
};

const config9 = {
  style: {
    width: transformSize(260),
  },
  defaultValue: 10000,
  step: 10000,
  onChange: onChangeCore,
};

const config10 = {
  operateColor: '#a923e1',
  defaultValue: 30,
  step: 1,
};

const config11 = {
  useBackground: false,
  defaultValue: 30,
  step: 1,
};

const config12 = {
  operateColor: '#fff',
  backgroundColor: '#a123e4',
  circle: true,
  defaultValue: 30,
  step: 1,
};

const config13 = {
  onFocus: () => {
    console.log({
      message: '获得焦点',
    });
  },
  onBlur: () => {
    console.log({
      message: '失去焦点',
    });
  },
};

const config14 = {
  style: {
    '--border': `${transformSize(1)} solid #f5f5f5`,
    '--border-inner': 'none',
    '--height': transformSize(36),
    '--input-width': transformSize(70),
    '--input-background-color': '#ffffff',
    width: transformSize(180),
  },
  defaultValue: 10000,
  step: 10000,
};

const config15 = {
  style: {
    '--border-inner': 'none',
    '--height': transformSize(36),
    '--input-width': transformSize(70),
    '--input-background-color': '#ffffff',
  },
  iconSize: 22,
  operateColor: '#fff',
  backgroundColor: '#a123e4',
  circle: true,
  defaultValue: 45,
  step: 1,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '进步器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Stepper',
    name: '进步器',
    description: '进步器组件',
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
        header: '步长设置',
        config: config3,
      },
      {
        header: '设置输入范围',
        config: config4,
      },
      {
        header: '格式化到整数',
        config: config5,
      },
      {
        header: '格式化到一位小数',
        config: config6,
      },
      {
        header: '禁用状态',
        config: config7,
      },
      {
        header: '输入框只读状态',
        config: config8,
      },
      {
        header: '自定义宽度',
        config: config9,
      },
      {
        header: '自定义颜色',
        config: config10,
      },
      {
        header: '无背景模式',
        config: config11,
      },
      {
        header: '圆形轮廓',
        config: config12,
      },
      {
        header: '获得/失去焦点',
        config: config13,
      },
      {
        header: '自定义css变量',
        config: config14,
      },
      {
        header: '复杂配置',
        config: config15,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Stepper key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Stepper>
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
          componentName="Stepper"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Stepper.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
