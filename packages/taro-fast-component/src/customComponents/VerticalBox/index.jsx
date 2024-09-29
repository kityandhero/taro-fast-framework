import { View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

const defaultProps = {
  style: {},
  innerStyle: {},
  align: 'center',
  alignJustify: 'flex-start',
  fillWidth: false,
  onClick: null,
};

class VerticalBox extends BaseComponent {
  triggerClick = (event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  renderFurther() {
    const { style, fillWidth, innerStyle, align, alignJustify, children } =
      this.props;

    let alignStyle = 'center';

    switch (align) {
      case 'top': {
        alignStyle = 'flex-start';
        break;
      }

      case 'center': {
        alignStyle = 'center';
        break;
      }

      case 'bottom': {
        alignStyle = 'flex-end';
        break;
      }

      default: {
        alignStyle = 'center';
        break;
      }
    }

    let alignJustifyStyle = 'flex-start';

    switch (alignJustify) {
      case 'start': {
        alignJustifyStyle = 'flex-start';
        break;
      }

      case 'center': {
        alignJustifyStyle = 'center';
        break;
      }

      case 'end': {
        alignJustifyStyle = 'flex-end';
        break;
      }

      case 'between': {
        alignJustifyStyle = 'space-between';
        break;
      }

      case 'around': {
        alignJustifyStyle = 'space-around';
        break;
      }

      default: {
        alignJustifyStyle = 'flex-start';
        break;
      }
    }

    const flexStyle = {
      ...innerStyle,
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: alignStyle,
      justifyContent: alignJustifyStyle,
    };

    return (
      <View
        style={{
          ...style,
          height: '100%',
          ...(fillWidth
            ? {
                width: '100%',
              }
            : {}),
        }}
        onClick={this.triggerClick}
      >
        <View style={flexStyle}>{children}</View>
      </View>
    );
  }
}

VerticalBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { VerticalBox };
