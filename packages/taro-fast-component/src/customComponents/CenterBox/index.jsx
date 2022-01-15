import { ComponentBase } from 'taro-fast-common/es/customComponents';

import HorizontalCenterBox from '../HorizontalCenterBox';
import VerticalBox from '../VerticalBox';

const defaultProps = {};

class CenterBox extends ComponentBase {
  render() {
    const { children } = this.props;

    console.log(this.props);

    return (
      <HorizontalCenterBox fillHeight>
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
