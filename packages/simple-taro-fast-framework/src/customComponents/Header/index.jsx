import { Component } from 'react';
import { View } from '@tarojs/components';

import './index.less';

export default class DocsHeader extends Component {
  render() {
    const { title } = this.props;

    return (
      <View className="doc-header">
        <View className="doc-header__title">{title}</View>
      </View>
    );
  }
}

DocsHeader.defaultProps = {
  title: '标题',
};
