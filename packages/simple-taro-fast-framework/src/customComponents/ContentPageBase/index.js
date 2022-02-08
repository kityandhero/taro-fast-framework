import { View } from '@tarojs/components';

import Header from '../Header';
import PageWrapper from '../PageWrapper';

import './index.less';

export default class ContentPageBase extends PageWrapper {
  headerData = {};

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
      <View className="page">
        <Header title={`${id} ${name}`}></Header>

        <View className="doc-body">{this.renderContent()}</View>
      </View>
    );
  };

  renderFurther() {
    return this.renderContentView();
  }
}
