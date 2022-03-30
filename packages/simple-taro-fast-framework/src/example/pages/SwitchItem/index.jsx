import { connect } from 'react-redux';

import {
  SwitchItem,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { IconSketch } = Icon;

function onSwitchChange(v) {
  console.log(v);
}

const config1 = {
  label: '开关',
  onChange: onSwitchChange,
};

const config2 = {
  label: '开关',
  border: false,
};

const config3 = {
  label: '开关',
  onChange: onSwitchChange,
};

const config4 = {
  label: '开关',
  confirm: {
    title: '状态变更',
    content: '状态即将发生改变,确定吗?',
    confirmText: '确定',
    confirmColor: '',
    cancelText: '取消',
    cancelColor: '',
  },
  // eslint-disable-next-line no-unused-vars
  onChange: (value) => {},
};

const config5 = {
  label: '开关',
  color: 'green',
};

const config6 = {
  label: '开关',
  hidden: true,
};

const config7 = {
  label: '开关',
  disabled: true,
  checked: true,
};

const config8 = {
  label: '开关',
  size: 1.5,
};

const config9 = {
  label: '开关',
  checkedText: '开',
  uncheckedText: '关',
};

const config10 = {
  prefix: <IconSketch size={36} />,
  title: '这里是标题',
  label: '开关',
  description: '管理已授权的产品和设备',
  confirm: true,
  checked: true,
  onChange: () => {
    console.log('onChange');
  },
  afterChange: () => {
    console.log('afterChange');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '开关项',
});

@connect(({ simulation, global }) => ({
  simulation,
  global,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'SwitchItem',
    name: '开关项',
    description: '开关项组件',
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

  getApiData = (props) => {
    const {
      simulation: { data },
    } = props;

    return data;
  };

  establishControlList = () => {
    return [
      {
        header: '基础用法',
        config: config1,
      },
      {
        header: '无下划线',
        config: config2,
      },
      {
        header: '异步调用',
        config: {
          ...config3,
          onChange: this.changeStatus,
        },
      },
      {
        header: '异步调用前确认',
        config: {
          ...config4,
          onChange: this.simulationChangeStatus,
        },
      },
      {
        header: '颜色',
        config: config5,
      },
      {
        header: '隐藏状态',
        config: config6,
      },
      {
        header: '不可用',
        config: config7,
      },
      {
        header: '大小',
        config: config8,
      },
      {
        header: '内嵌文字',
        config: config9,
      },
      {
        header: '复杂配置',
        config: {
          ...config10,
          onChange: this.changeStatus,
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <SwitchItem key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </SwitchItem>
    );
  };

  changeStatus = (value) => {
    return this.remoteRequest({
      type: 'simulation/switchStatus',
      payload: { status: value },
    }).then(
      (
        {
          // data
        },
      ) => {
        // console.log(data);

        return true;
      },
    );
  };

  simulationChangeStatus = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(true);
        } catch (e) {
          reject(true);
        }
      }, 2000);
    });
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="SwitchItem"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={SwitchItem.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
