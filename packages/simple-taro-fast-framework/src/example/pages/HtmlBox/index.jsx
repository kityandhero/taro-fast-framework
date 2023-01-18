import { connect } from 'easy-soft-dva';

import { HtmlBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const config1 = {
  html: '<div>渲染内容</div>',
};

const config2 = {
  html: '<div>可点击</div>',
  onClick: () => {
    console.log('click');
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Html容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'HtmlBox',
    name: 'Html容器',
    description: 'Html容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '渲染Html',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '渲染Html',
        config: config1,
      },
      {
        header: '点击事件',
        config: config2,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <HtmlBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </HtmlBox>
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
          componentName="HtmlBox"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'top', 'bottom', 'left', 'right']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={HtmlBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
