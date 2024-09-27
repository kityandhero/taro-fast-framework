import { PopupExtra } from '../../components';
import { buildPrimaryCallName } from '../definition';
import { InteractiveCloseableBase } from '../InteractiveCloseableBase';

const primaryCallName = buildPrimaryCallName('PopupWrapperBase');

class PopupWrapperBase extends InteractiveCloseableBase {
  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
  constructor(properties, visibleFlag = '') {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  renderFurther() {
    this.logRenderCallTrack({}, primaryCallName, 'renderFurther');

    const { children, ...rest } = this.props;

    return (
      <PopupExtra
        {...rest}
        flag={this.getVisibleFlag()}
        onClose={this.handleClose}
      >
        {children}
      </PopupExtra>
    );
  }
}

export { PopupWrapperBase };
