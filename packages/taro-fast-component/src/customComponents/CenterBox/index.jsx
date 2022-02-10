import BaseComponent from '../BaseComponent';

import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
};

class CenterBox extends BaseComponent {
  renderFurther() {
    const { children } = this.props;

    return (
      <VerticalBox align="center" alignJustify="center">
        {children}
      </VerticalBox>
    );
  }
}

CenterBox.defaultProps = {
  ...defaultProps,
};

export default CenterBox;
