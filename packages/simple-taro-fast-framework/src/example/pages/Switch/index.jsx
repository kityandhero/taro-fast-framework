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

  getApiData = (props) => {
    const {
      simulation: { data },
    } = props;

    return data;
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
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="基础用法"
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Switch />
        </SimpleBox>

        <SimpleBox
          header="异步调用"
          config={config1}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['onChange']}
        >
          <Switch onChange={this.changeStatus} />
        </SimpleBox>

        <SimpleBox
          header="异步调用前确认"
          config={config2}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['onChange']}
        >
          <Switch {...config2} onChange={this.simulationChangeStatus} />
        </SimpleBox>

        <SimpleBox
          header="自定义颜色"
          config={config3}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Switch {...config3} />
        </SimpleBox>

        <SimpleBox
          header="隐藏模式"
          config={config4}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Switch {...config4} />
        </SimpleBox>

        <SimpleBox
          header="禁用模式"
          config={config5}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Space>
            <Switch {...config5} />
          </Space>
        </SimpleBox>

        <SimpleBox
          header="大小"
          config={config6}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Switch {...config6} />
        </SimpleBox>

        <SimpleBox
          header="内嵌文字"
          config={config7}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Space>
            <Switch {...config7} />
          </Space>
        </SimpleBox>

        <SimpleBox
          header="操作后回调"
          config={config8}
          componentName="Switch"
          mockChildren={false}
          useInnerBox
        >
          <Space>
            <Switch {...config8} />
          </Space>
        </SimpleBox>

        <PropertyBox config={Switch.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
