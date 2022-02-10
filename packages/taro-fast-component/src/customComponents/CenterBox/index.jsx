import BaseComponent from '../BaseComponent';

import HorizontalCenterBox from '../HorizontalCenterBox';
import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
};

class CenterBox extends BaseComponent {
  renderFurther() {
    const { children } = this.props;

    return (
      <HorizontalCenterBox>
        <VerticalBox>{children}</VerticalBox>
      </HorizontalCenterBox>
    );
  }
}

CenterBox.defaultProps = {
  ...defaultProps,
};

export default CenterBox;
