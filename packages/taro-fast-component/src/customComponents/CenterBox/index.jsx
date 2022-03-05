import BaseComponent from '../BaseComponent';

import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
};

class CenterBox extends BaseComponent {
  renderFurther() {
    const { style, children } = this.props;

    return (
      <VerticalBox align="center" alignJustify="center" style={style}>
        {children}
      </VerticalBox>
    );
  }
}

CenterBox.defaultProps = {
  ...defaultProps,
};

export default CenterBox;
