import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  style: {},
  innerStyle: {},
  align: 'center',
  alignJustify: 'flex-start',
  onClick: null,
};

class VerticalBox extends BaseComponent {
  triggerClick = (e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(e);
    }
  };

  renderFurther() {
    const { style, innerStyle, align, alignJustify } = this.props;

    let alignStyle = 'center';

    switch (align) {
      case 'top':
        alignStyle = 'flex-start';
        break;

      case 'center':
        alignStyle = 'center';
        break;

      case 'bottom':
        alignStyle = 'flex-end';
        break;

      default:
        alignStyle = 'center';
        break;
    }

    let alignJustifyStyle = 'flex-start';

    switch (alignJustify) {
      case 'start':
        alignJustifyStyle = 'flex-start';
        break;

      case 'center':
        alignJustifyStyle = 'center';
        break;

      case 'end':
        alignJustifyStyle = 'flex-end';
        break;

      case 'between':
        alignJustifyStyle = 'space-between';
        break;

      case 'around':
        alignJustifyStyle = 'space-around';
        break;

      default:
        alignJustifyStyle = 'flex-start';
        break;
    }

    const flexStyle = {
      ...(innerStyle || {}),
      ...{
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      ...{
        alignItems: alignStyle,
        justifyContent: alignJustifyStyle,
      },
    };

    return (
      <View
        style={{
          ...style,
          ...{
            height: '100%',
          },
        }}
        onClick={this.triggerClick}
      >
        <View style={flexStyle}>{this.props.children}</View>
      </View>
    );
  }
}

VerticalBox.defaultProps = {
  ...defaultProps,
};

export default VerticalBox;
