import { View } from '@tarojs/components';

import Header from '../Header';
import PageWrapper from '../PageWrapper';

import './index.less';

export default class ContentPageBase extends PageWrapper {
  headerData = {};

  viewStyle = { backgroundColor: '#fff' };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        spin: true,
      },
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.setState({ spin: false });
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
    return this.renderContentView();
  }
}
