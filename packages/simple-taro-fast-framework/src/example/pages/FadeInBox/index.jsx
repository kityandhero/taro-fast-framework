import { transformSize } from 'taro-fast-common/es/utils/tools';

import {
  Space,
  FadeInBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  lineHeight: '1',
  padding: transformSize(10),
  height: transformSize(60),
  backgroundColor: '#ccc',
};

const duration = 1200;

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FadeInBox',
    name: '渐显容器',
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
        {show ? this.buildItem() : null}

        {show ? this.buildItem() : null}

        {show ? this.buildItem() : null}

        {show ? this.buildItem() : null}

        {show ? this.buildItem() : null}

        {show ? this.buildItem() : null}
      </Space>
    );
  };
}
