import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Overlay from '../Overlay';
import Card from '../Card';
import Row from '../Flex/Row';
import Col from '../Flex/Col';

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
  onCancel: null,
  onConfirm: null,
  onClose: null,
};

class Modal extends ComponentBase {
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
      footerBorder,
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
                    className={classNames(
                      `${classPrefix}__container__action`,
                      `${classPrefix}__container__action__left`,
                    )}
                    hoverClass={`${classPrefix}__container__action--hover`}
                    style={cancelStyle}
                    onClick={this.triggerCancel}
                  >
                    {cancelText}
                  </View>
                </Col>
              ) : null}

              {showConfirm ? (
                <Col size={!!showCancel && !!showConfirm ? 6 : 12}>
                  <View
                    className={classNames(
                      `${classPrefix}__container__action`,
                      `${classPrefix}__container__action__right`,
                    )}
                    hoverClass={`${classPrefix}__container__action--hover`}
                    style={confirmStyle}
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
            footerBorder={footerBorder}
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
  ...defaultProps,
};

export default Modal;
