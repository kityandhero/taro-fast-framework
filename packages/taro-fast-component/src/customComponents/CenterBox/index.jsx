import BaseComponent from '../BaseComponent';
import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
  fillWidth: false,
};

class CenterBox extends BaseComponent {
  renderFurther() {
    const { style, fillWidth, innerStyle, children } = this.props;

    return (
      <VerticalBox
        align="center"
        alignJustify="center"
        style={style}
        innerStyle={innerStyle}
        fillWidth={fillWidth}
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
