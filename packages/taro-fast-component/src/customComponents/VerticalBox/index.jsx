import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

class VerticalBox extends ComponentBase {
  render() {
    const { style, align, alignJustify } = this.props;

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
      ...(style || {}),
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
          height: '100%',
        }}
      >
        <View style={flexStyle}>{this.props.children}</View>
      </View>
    );
  }
}

VerticalBox.defaultProps = {
  fitWidth: true,
  style: {},
  align: 'center',
  alignJustify: 'flex-start',
};

export default VerticalBox;
