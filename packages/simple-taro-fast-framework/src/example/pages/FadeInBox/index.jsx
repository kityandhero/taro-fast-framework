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
  backgroundColor: '#ccc',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FadeInBox',
    name: '渐显容器',
  };

  doOtherWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ showTransition: false });
    }, 3000);
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <FadeInBox style={style}>
          <CenterBox>FadeInBox</CenterBox>
        </FadeInBox>

        <FadeInBox style={style}>
          <CenterBox>FadeInBox</CenterBox>
        </FadeInBox>

        <FadeInBox style={style}>
          <CenterBox>FadeInBox</CenterBox>
        </FadeInBox>

        <FadeInBox style={style}>
          <CenterBox>FadeInBox</CenterBox>
        </FadeInBox>

        <FadeInBox style={style}>
          <CenterBox>FadeInBox</CenterBox>
        </FadeInBox>

        <FadeInBox style={style}>
          <CenterBox>FadeInBox</CenterBox>
        </FadeInBox>
      </Space>
    );
  };
}
