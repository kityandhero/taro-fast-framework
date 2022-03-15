import { View, ScrollView } from '@tarojs/components';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  style: {},
};

class HorizontalScrollBox extends BaseComponent {
  getStyle = () => {
    const { style } = this.props;

    return style || {};
  };

  renderFurther() {
    const { children } = this.props;

    const style = this.getStyle();

    return (
      <View style={style}>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
          }}
          scrollX
          scrollY={false}
          scrollWithAnimation
          scrollAnchoring
          scrollEnhanced
          scrollBounces
          scrollShowScrollbar={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
}

HorizontalScrollBox.defaultProps = {
  ...defaultProps,
};

export default HorizontalScrollBox;
