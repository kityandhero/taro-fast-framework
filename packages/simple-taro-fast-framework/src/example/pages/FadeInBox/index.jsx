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
      },
    };
  }

  doOtherWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ show: true });
    }, 800);
  };

  buildItem = () => {
    return (
      <FadeInBox style={style} duration={duration}>
        <CenterBox>FadeInBox</CenterBox>
      </FadeInBox>
    );
  };

  renderContent = () => {
    const { show } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="默认">
          <Space direction="vertical" fillWidth>
            {show ? this.buildItem() : null}

            {show ? this.buildItem() : null}

            {show ? this.buildItem() : null}

            {show ? this.buildItem() : null}

            {show ? this.buildItem() : null}

            {show ? this.buildItem() : null}
          </Space>
        </SimpleBox>

        <PropertyBox config={FadeInBox.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
