import { View } from '@tarojs/components';

import Header from '../Header';
import PageWrapper from '../PageWrapper';

import './index.less';

export default class ContentPageBase extends PageWrapper {
  headerData = null;

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
        {(this.headerData || null) == null ? null : (
          <Header title={`${id} ${name}`}></Header>
        )}

        <View className="doc-body">{this.renderContent()}</View>
      </>
    );
  };

  renderFurther() {
    return this.renderContentView();
  }
}
