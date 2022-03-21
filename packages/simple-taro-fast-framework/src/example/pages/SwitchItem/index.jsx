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
          config={config1}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['onChange']}
        >
          <SwitchItem {...config1} />
        </SimpleBox>

        <SimpleBox
          header="无下划线"
          config={config2}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['onChange']}
        >
          <SwitchItem {...config2} />
        </SimpleBox>

        <SimpleBox
          header="异步调用"
          config={config3}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['onChange']}
        >
          <SwitchItem {...config3} onChange={this.changeStatus} />
        </SimpleBox>

        <SimpleBox
          header="异步调用前确认"
          config={config4}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['onChange']}
        >
          <SwitchItem {...config4} onChange={this.simulationChangeStatus} />
        </SimpleBox>

        <SimpleBox
          header="颜色"
          config={config5}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <SwitchItem {...config5} />
        </SimpleBox>

        <SimpleBox
          header="隐藏状态"
          config={config6}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox
        >
          <SwitchItem {...config6} />
        </SimpleBox>

        <SimpleBox
          header="不可用"
          config={config7}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <SwitchItem {...config7} />
        </SimpleBox>

        <SimpleBox
          header="大小"
          config={config8}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <SwitchItem {...config8} />
        </SimpleBox>

        <SimpleBox
          header="内嵌文字"
          config={config9}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <SwitchItem {...config9} />
        </SimpleBox>

        <SimpleBox
          header="复杂配置"
          config={config10}
          space={false}
          componentName="SwitchItem"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['prefix']}
        >
          <SwitchItem {...config10} onChange={this.changeStatus} />
        </SimpleBox>

        <PropertyBox config={SwitchItem.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
