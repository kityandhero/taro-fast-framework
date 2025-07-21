import { PopupExtra } from '../../components';
import { buildPrimaryCallName } from '../definition';
import { InteractiveCloseableBase } from '../InteractiveCloseableBase';

const primaryCallName = buildPrimaryCallName('PopupWrapperBase');

const defaultProperties = {
  upperBuilder: null,
  footerBuilder: null,
};

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

  buildUpperView = () => null;

  buildFooterView = () => null;

  renderFurther() {
    this.logRenderCallTrack({}, primaryCallName, 'renderFurther');

    const { upperBuilder, footerBuilder, children, ...rest } = this.props;

    const upper = this.buildUpperView() ?? null;
    const footer = this.buildFooterView() ?? null;

    return (
      <PopupExtra
        {...rest}
        flag={this.getVisibleFlag()}
        onClose={this.handleClose}
      >
        {upper}

        {children}

        {footer}
      </PopupExtra>
    );
  }
}

PopupWrapperBase.defaultProps = {
  ...InteractiveCloseableBase.defaultProps,
  ...defaultProperties,
};

export { PopupWrapperBase };
