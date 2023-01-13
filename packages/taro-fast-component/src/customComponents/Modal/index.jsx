import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import Card from '../Card';
import Col from '../Flex/Col';
import Row from '../Flex/Row';
import Overlay from '../Overlay';

import './index.less';

const classPrefix = `tfc-modal`;

const defaultProps = {
  style: {},
  width: '70vw',
  visible: false,
  color: '#000',
  alpha: 0.3,
  zIndex: 810,
  header: null,
  headerStyle: {},
  bodyBorder: true,
  bodyStyle: {},
  footer: null,
  footerBorder: true,
  footerStyle: {},
  space: true,
  extra: null,
  extraStyle: {},
  hideFooter: false,
  showCancel: true,
  showConfirm: true,
  cancelStyle: {},
  cancelText: '取消',
  confirmStyle: {},
  confirmText: '确定',
  buttonFill: true,
  onCancel: null,
  onConfirm: null,
  onClose: null,
};

class Modal extends BaseComponent {
  triggerCancel = () => {
    const { onCancel } = this.props;

    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  triggerConfirm = () => {
    const { onConfirm } = this.props;

    if (isFunction(onConfirm)) {
      onConfirm();
    }
  };

  renderFurther() {
    const {
      style,
      width,
      visible,
      color,
      alpha,
      zIndex,
      header,
      headerStyle,
      bodyBorder,
      bodyStyle,
      footer,
      footerStyle,
      space,
      extra,
      extraStyle,
      hideFooter,
      showCancel,
      cancelStyle,
      cancelText,
      showConfirm,
      confirmStyle,
      confirmText,
      buttonFill,
      onClose,
      children,
    } = this.props;

    let f = null;

    if (!hideFooter) {
      f = footer;

      if (!f) {
        if (!!showCancel || !!showConfirm) {
          f = (
            <Row>
              {showCancel ? (
                <Col size={!!showCancel && !!showConfirm ? 6 : 12}>
                  <View
                    className={classNames(`${classPrefix}__container__action`, {
                      [`${classPrefix}__container__action__fill`]: buttonFill,
                      [`${classPrefix}__container__action__split`]:
                        buttonFill && showCancel && showConfirm,
                      [`${classPrefix}__container__action__no__fill`]:
                        !buttonFill,
                    })}
                    hoverClass={
                      buttonFill
                        ? `${classPrefix}__container__action--hover`
                        : 'none'
                    }
                    style={{
                      ...(!buttonFill
                        ? {
                            border:
                              'var(--tfc-2) solid var(--tfc-color-primary)',
                            color: 'var(--tfc-color-primary)',
                          }
                        : {}),
                      ...cancelStyle,
                    }}
                    onClick={this.triggerCancel}
                  >
                    {cancelText}
                  </View>
                </Col>
              ) : null}

              {showConfirm ? (
                <Col size={!!showCancel && !!showConfirm ? 6 : 12}>
                  <View
                    className={classNames(`${classPrefix}__container__action`, {
                      [`${classPrefix}__container__action__fill`]: buttonFill,
                      [`${classPrefix}__container__action__no__fill`]:
                        !buttonFill,
                    })}
                    hoverClass={
                      buttonFill
                        ? `${classPrefix}__container__action--hover`
                        : 'none'
                    }
                    style={{
                      ...(!buttonFill
                        ? {
                            backgroundColor: 'var(--tfc-color-primary)',
                            color: '#fff',
                          }
                        : {}),
                      ...confirmStyle,
                    }}
                    onClick={this.triggerConfirm}
                  >
                    {confirmText}
                  </View>
                </Col>
              ) : null}
            </Row>
          );
        }
      }
    }

    return (
      <Overlay
        visible={visible}
        color={color}
        alpha={alpha}
        zIndex={zIndex}
        mode="fullParent"
        lockScroll
        duration={300}
        animal="ease-in"
        onClick={onClose}
      >
        <View
          className={classNames(`${classPrefix}`, {
            [`${classPrefix}__container`]: true,
            [`${classPrefix}__container--active`]: visible,
          })}
        >
          <Card
            mode="card"
            style={{ ...style, ...{ width: width } }}
            header={header}
            headerStyle={headerStyle}
            bodyBorder={bodyBorder}
            bodyStyle={bodyStyle}
            footer={f}
            footerBorder={!hideFooter && buttonFill}
            footerStyle={{ ...{ padding: '0' }, ...footerStyle }}
            space={space}
            extra={extra}
            extraStyle={extraStyle}
          >
            <View
              className={classNames({
                [`${classPrefix}__container__content`]: true,
              })}
            >
              {children}
            </View>
          </Card>
        </View>
      </Overlay>
    );
  }
}

Modal.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Modal;
