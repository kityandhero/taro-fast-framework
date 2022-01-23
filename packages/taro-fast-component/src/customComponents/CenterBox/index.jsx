import { ComponentBase } from 'taro-fast-common/es/customComponents';

import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
};

class CenterBox extends ComponentBase {
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
