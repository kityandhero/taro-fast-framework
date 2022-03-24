import BaseComponent from '../BaseComponent';

import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
};

class CenterBox extends BaseComponent {
  renderFurther() {
    const { style, innerStyle, children } = this.props;

    return (
      <VerticalBox
        align="center"
        alignJustify="center"
        style={style}
        innerStyle={innerStyle}
      >
        {children}
      </VerticalBox>
    );
  }
}

CenterBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default CenterBox;
