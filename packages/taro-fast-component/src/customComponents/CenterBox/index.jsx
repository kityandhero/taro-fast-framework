import { ComponentBase } from 'taro-fast-common/es/customComponents';

import HorizontalCenterBox from '../HorizontalCenterBox';
import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
};

class CenterBox extends ComponentBase {
  renderFurther() {
    const { style, children } = this.props;

    return (
      <HorizontalCenterBox fillHeight style={style}>
        <VerticalBox align="center" alignJustify="flex-start">
          {children}
        </VerticalBox>
      </HorizontalCenterBox>
    );
  }
}

CenterBox.defaultProps = {
  ...defaultProps,
};

export default CenterBox;
