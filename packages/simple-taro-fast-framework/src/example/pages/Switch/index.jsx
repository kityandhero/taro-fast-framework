import { connect } from 'react-redux';

import { Switch, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  // eslint-disable-next-line no-unused-vars
  onChange: (value) => {},
};

const config2 = {
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

const config3 = {
  color: 'green',
};

const config4 = {
  hidden: true,
};

const config5 = {
  disabled: true,
  checked: true,
};

const config6 = {
  size: 1.5,
};

const config7 = {
  checkedText: '开',
  uncheckedText: '关',
};

const config8 = {
  afterChange: (v) => {
    console.log(v);
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '开关',
});

@connect(({ simulation, global }) => ({
  simulation,
  global,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Switch',
    name: '开关',
    description: '开关组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基础用法',
        currentConfig: {},
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
        config: {},
      },
      {
        header: '异步调用',
        config: {
          ...config1,
          onChange: this.changeStatus,
        },
      },
      {
        header: '异步调用前确认',
        config: {
          ...config2,
          onChange: this.simulationChangeStatus,
        },
      },
      {
        header: '自定义颜色',
        config: config3,
      },
      {
        header: '隐藏模式',
        config: config4,
      },
      {
        header: '禁用模式',
        config: config5,
      },
      {
        header: '大小',
        config: config6,
      },
      {
        header: '内嵌文字',
        config: config7,
      },
      {
        header: '操作后回调',
        config: config8,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Switch key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Switch>
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
          componentName="Switch"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['onChange']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Switch.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
