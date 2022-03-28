import { transformSize } from 'taro-fast-common/es/utils/tools';

import {
  Space,
  FadeInBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const style = {
  lineHeight: '1',
  padding: transformSize(10),
  height: transformSize(60),
  backgroundColor: '#ccc',
};

const duration = 1200;

const config1 = {
  style,
  duration,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '渐显容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FadeInBox',
    name: '渐显容器',
    description: '渐显容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: false,
        header: '样例',
        currentConfig: config1,
      },
    };
  }

  doOtherWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ show: true });
    }, 800);
  };

  establishControlList = () => {
    return [
      {
        header: '样例',
        config: config1,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    const { show } = this.state;

    if (!show) {
      return null;
    }

    return (
      <FadeInBox key={key} {...config}>
        {this.buildSimpleItemInner(inner || <CenterBox>FadeInBox</CenterBox>)}
      </FadeInBox>
    );
  };

  renderContent = () => {
    const { header, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          config={currentConfig}
          componentName="FadeInBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={FadeInBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
