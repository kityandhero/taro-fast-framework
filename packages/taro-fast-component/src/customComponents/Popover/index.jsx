import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  getGuid,
  getRect,
  inCollection,
  transformSize,
} from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

import Transition from '../Transition';

import './index.less';

const classPrefix = `tfc-popover`;

const positionCollection = ['top', 'bottom'];

const defaultProps = {
  style: {},
  arrow: true,
  arrowDistance: 10,
  arrowSize: 20,
  backgroundColor: '#ccc',
  panel: null,
  height: 40,
  position: 'top',
  panelPaddingLeft: 10,
  panelPaddingRight: 10,
  panelPaddingTop: 10,
  panelPaddingBottom: 10,
  panelShadow: false,
  panelShadowColor: '#ccc',
  panelBorderRadius: 0,
};

export const dot = Symbol();

class Popover extends BaseComponent {
  contentId = '';

  timerAdjust = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        contentHeight: 0,
        visible: false,
      },
    };

    this.contentId = getGuid();

    this.timerAdjust = null;
  }

  doWorkAfterDidMount = () => {
    this.adjustLayout();
  };

  doWorkBeforeUnmount = () => {
    clearTimeout(this.timerAdjust);
  };

  adjustLayout = () => {
    const that = this;

    that.timerAdjust = setTimeout(() => {
      getRect(`#${that.contentId}`).then((rect) => {
        if ((rect || null) != null) {
          const { left, right, top, bottom, height } = rect;

          that.setState({
            left,
            right,
            top,
            bottom,
            contentHeight: height,
          });
        }
      });
    }, 200);
  };

  getPosition = () => {
    const { position } = this.props;

    return inCollection(positionCollection, position) ? position : 'top';
  };

  buildStyle = () => {
    const {
      style,
      arrowSize,
      arrowDistance,
      height,
      panelShadow,
      panelShadowColor,
      panelPaddingLeft,
      panelPaddingRight,
      panelPaddingTop,
      panelPaddingBottom,
      backgroundColor,
    } = this.props;
    const { left } = this.state;

    const position = this.getPosition();

    return {
      ...style,
      ...{
        position: 'relative',
      },
      ...{
        '--background-color': backgroundColor,
      },
      ...(position === 'top'
        ? {
            '--arrow-top': `calc((${transformSize(arrowSize)} + ${transformSize(
              arrowDistance,
            )}) * -1)`,
            '--arrow-left': `calc(50% - ${transformSize(arrowSize)})`,
            '--arrow-border-top': `${transformSize(
              arrowSize,
            )} solid var(--background-color)`,
            '--arrow-border-left': `${transformSize(
              arrowSize,
            )} solid transparent`,
            '--arrow-border-right': `${transformSize(
              arrowSize,
            )} solid transparent`,
            '--arrow-border-bottom': `${transformSize(
              arrowSize,
            )} solid transparent`,
            '--panel-top': `calc((${transformSize(height)} + ${transformSize(
              arrowSize,
            )} * 3 / 4 + ${transformSize(arrowDistance)}) * -1)`,
            '--panel-left': `${0 - left}px`,
          }
        : {}),
      ...(position === 'bottom'
        ? {
            '--arrow-top': `calc(${transformSize(
              arrowSize,
            )} * -1 + ${transformSize(arrowDistance)})`,
            '--arrow-left': `calc(50% - ${transformSize(arrowSize)})`,
            '--arrow-border-top': `${transformSize(
              arrowSize,
            )} solid transparent`,
            '--arrow-border-left': `${transformSize(
              arrowSize,
            )} solid transparent`,
            '--arrow-border-right': `${transformSize(
              arrowSize,
            )} solid transparent`,
            '--arrow-border-bottom': `${transformSize(
              arrowSize,
            )} solid var(--background-color)`,
            '--panel-top': `calc((${transformSize(
              arrowSize,
            )} * 3 / 4 + ${transformSize(arrowDistance)}))`,
            '--panel-left': `${0 - left}px`,
          }
        : {}),
      ...{
        '--panel-height': transformSize(height),
        '--panel-z-index': 11,
        '--panel-padding-left': transformSize(panelPaddingLeft),
        '--panel-padding-right': transformSize(panelPaddingRight),
        '--panel-padding-top': transformSize(panelPaddingTop),
        '--panel-padding-bottom': transformSize(panelPaddingBottom),
      },
      ...(panelShadow
        ? {
            '--panel-shadow-color': panelShadowColor,
          }
        : {}),
    };
  };

  toggleVisible = () => {
    const { visible } = this.state;

    this.setState({
      visible: !!!visible,
    });
  };

  buildPopoverPanel = () => {
    const { panelShadow, panel, panelBorderRadius } = this.props;
    const { visible } = this.state;

    const position = this.getPosition();

    const mode = inCollection(['top', 'bottom'], position)
      ? 'horizontal'
      : 'vertical';

    return (
      <Transition
        show={visible}
        className={classNames(`${classPrefix}__outline`, [
          `${classPrefix}__outline--${mode}`,
        ])}
        name="fade"
      >
        <View
          className={classNames(`${classPrefix}__outline__arrow`, {
            [`${classPrefix}__outline__arrow--${position}`]: true,
          })}
        />

        {/* <Overlay
        visible
        lockScroll
        transparent
        zIndex={10}
        width="100vw"
        height="100vh"
        mode="fullScreen"
        onClick={this.toggleVisible}
      /> */}

        <View className={classNames(`${classPrefix}__outline__panel`)}>
          <View
            className={classNames(`${classPrefix}__outline__panel__inner`, {
              [`${classPrefix}__outline__panel__inner--shadow`]: panelShadow,
            })}
            style={{
              borderRadius: transformSize(panelBorderRadius),
              overflow: 'hidden',
            }}
          >
            {panel}
          </View>
        </View>
      </Transition>
    );
  };

  renderFurther() {
    const { children } = this.props;

    const style = this.buildStyle();
    const position = this.getPosition();

    return (
      <View
        id={this.contentId}
        className={classNames(classPrefix)}
        style={style}
        onClick={this.toggleVisible}
      >
        {position === 'top' ? this.buildPopoverPanel() : null}

        <View className={classNames(`${classPrefix}__content`)}>
          {children}
        </View>

        {position === 'bottom' ? this.buildPopoverPanel() : null}
      </View>
    );
  }
}

Popover.dot = Symbol();

Popover.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Popover;
