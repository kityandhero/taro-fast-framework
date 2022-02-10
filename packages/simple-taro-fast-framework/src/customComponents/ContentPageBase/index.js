import { View } from '@tarojs/components';

import { FadeView, Spin } from 'taro-fast-component/es/customComponents';

import Header from '../Header';
import PageWrapper from '../PageWrapper';

import './index.less';

export default class ContentPageBase extends PageWrapper {
  headerData = {};

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: false,
      },
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ show: true });
    }, 800);
  };

  renderContent = () => {
    return null;
  };

  renderContentView = () => {
    const { id, name } = {
      ...{
        id: '',
        name: '',
      },
      ...this.headerData,
    };

    return (
      <>
        <Header title={`${id} ${name}`}></Header>

        <View className="doc-body">{this.renderContent()}</View>
      </>
    );
  };

  renderFurther() {
    const { show } = this.state;

    return (
      <Spin fullscreen spin={!show}>
        <FadeView show={show} className="page">
          {this.renderContentView()}
        </FadeView>
      </Spin>
    );
  }
}
