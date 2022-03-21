import { HelpBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const list = [
  {
    text: 'Html数据展示，空白将替换为Empty.',
  },
  {
    text: '帮助条目2.',
  },
  {
    text: '帮助条目3.',
  },
  {
    text: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的帮助条目.',
  },
];

const config1 = {
  list,
};

const config2 = {
  list,
  showTitle: false,
};

const config3 = {
  title: '操作说明',
  list,
  showTitle: true,
  showNumber: false,
};

const config4 = {
  title: '操作说明',
  list,
  showTitle: true,
  labelWidth: 80,
};

const config5 = {
  title: '操作说明',
  list,
  showTitle: true,
  useBackground: true,
};

const config6 = {
  title: '操作说明隐藏',
  list,
  hidden: true,
};

const config7 = {
  title: '操作说明',
  list,
  showTitle: true,
  useBackground: true,
  backgroundColor: '#34e245',
};

const config8 = {
  title: '操作说明',
  list,
  showTitle: true,
  color: '#34e245',
};

const config9 = {
  title: '操作说明',
  list,
  showTitle: true,
  fontSize: 24,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '帮助提示',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HelpBox',
    name: '帮助提示',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="一般用法"
          config={config1}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config1} />
        </SimpleBox>

        <SimpleBox
          header="隐藏标题"
          config={config2}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config2} />
        </SimpleBox>

        <SimpleBox
          header="不显示行号"
          config={config3}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config3} />
        </SimpleBox>

        <SimpleBox
          header="标题宽度"
          config={config4}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config4} />
        </SimpleBox>

        <SimpleBox
          header="使用背景"
          config={config5}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config5} />
        </SimpleBox>

        <SimpleBox
          header="设置背景颜色"
          config={config7}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config7} />
        </SimpleBox>

        <SimpleBox
          header="设置字体颜色"
          config={config8}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config8} />
        </SimpleBox>

        <SimpleBox
          header="设置字体大小"
          config={config9}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox={false}
        >
          <HelpBox {...config9} />
        </SimpleBox>

        <SimpleBox
          header="隐藏"
          config={config6}
          componentName="HelpBox"
          mockChildren={false}
          useInnerBox
        >
          <HelpBox {...config6} />
        </SimpleBox>

        <PropertyBox config={HelpBox.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}
