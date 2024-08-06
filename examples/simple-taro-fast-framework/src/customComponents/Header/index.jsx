import { Component } from 'react';
import { View } from '@tarojs/components';

import './index.less';

class Header extends Component {
  render() {
    const { title, description } = this.props;

    return (
      <View className="doc-header">
        <View className="doc-header__title">
          <View>{title}</View>
          <View className="doc-header__title__description">
            {description || ''}
          </View>
        </View>
      </View>
    );
  }
}

Header.defaultProps = {
  title: '标题',
};

export { Header };
