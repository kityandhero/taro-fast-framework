import { connect } from 'easy-soft-dva';

import { Line, Space } from 'taro-fast-component';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const config1 = {
  width: 400,
};

const config2 = {
  height: 12,
};

const config3 = {
  color: '#45672e',
};

const config4 = {
  color: ['#45672e', '#01e456', '#de1245'],
  height: 12,
};

const config5 = {
  direction: 'vertical',
  width: 4,
  height: 40,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '线条',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Line',
    name: '线条',
    description: '线条组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '水平线',
        currentConfig: {},
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '水平线',
        config: {},
      },
      {
        header: '设置宽度',
        config: config1,
      },
      {
        header: '设置高度',
        config: config2,
      },
      {
        header: '设置颜色',
        config: config3,
      },
      {
        header: '颜色渐变',
        config: config4,
      },
      {
        header: '垂直线',
        config: config5,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Line key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Line>
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
          componentName="Line"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Line.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
