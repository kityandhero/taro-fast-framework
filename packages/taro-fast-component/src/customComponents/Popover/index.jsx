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
  fillWidth: true,
  panelWidth: '100vw',
  panelAlign: 'center',
  panelPaddingLeft: 0,
  panelPaddingRight: 0,
  panelPaddingTop: 0,
  panelPaddingBottom: 0,
  panelShadow: false,
  panelShadowHorizontal: 0,
  panelShadowVertical: 0,
  panelShadowBlur: 10,
  panelShadowSpread: 5,
  panelShadowColor: '#ccc',
  panelShadowMode: 'outset',
  panelBorderRadius: 0,
  closeOnClick: false,
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
        contentWidth: 0,
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
          const { left, right, top, bottom, width, height } = rect;

          that.setState({
            left,
            right,
            top,
            bottom,
            contentWidth: width,
            contentHeight: height,
          });
        }
      });
    }, 200);
  };

  getFillWidth = () => {
    const { fillWidth, panelWidth } = this.props;

    return !!fillWidth || panelWidth === '100vw';
  };

  getPosition = () => {
    const { position } = this.props;

    return inCollection(positionCollection, position) ? position : 'top';
  };

  getPanelLayout = () => {
    const {
      panelPaddingLeft,
      panelPaddingRight,
      panelPaddingTop,
      panelPaddingBottom,
      panelWidth,
      panelAlign,
    } = this.props;
    const { left, contentWidth } = this.state;

    const fillWidth = this.getFillWidth();

    if (fillWidth) {
      return {
        panelPaddingLeft,
        panelPaddingRight,
        panelPaddingTop,
        panelPaddingBottom,
        left: `${0 - left}px`,
        panelWidth: '100vw',
      };
    }

    const centerAlign = `calc((${contentWidth}px - ${transformSize(
      panelWidth,
    )}) / 2)`;

    const leftAlign = `0`;

    const rightAlign = `calc((${contentWidth}px - ${transformSize(
      panelWidth,
    )}))`;

    return {
      panelPaddingLeft: 0,
      panelPaddingRight: 0,
      panelPaddingTop,
      panelPaddingBottom,
      left:
        panelAlign === 'left'
          ? leftAlign
          : panelAlign === 'right'
          ? rightAlign
          : centerAlign,
      panelWidth,
    };
  };

  buildStyle = () => {
    const {
      style,
      arrowSize,
      arrowDistance,
      height,
      panelShadow,
      panelShadowColor,
      backgroundColor,
      panelShadowHorizontal,
      panelShadowVertical,
      panelShadowBlur,
      panelShadowSpread,
      panelShadowMode,
    } = this.props;

    const position = this.getPosition();

    const {
      panelPaddingLeft,
      panelPaddingRight,
      panelPaddingTop,
      panelPaddingBottom,
      left,
      panelWidth,
    } = this.getPanelLayout();

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
            '--panel-left': left,
            '--panel-width': transformSize(panelWidth),
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
            '--panel-left': left,
            '--panel-width': transformSize(panelWidth),
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
            '--panel-shadow': `${transformSize(
              panelShadowHorizontal,
            )} ${transformSize(panelShadowVertical)} ${transformSize(
              panelShadowBlur,
            )} ${transformSize(panelShadowSpread)} ${panelShadowColor} ${
              panelShadowMode === 'inset' ? 'inset' : ''
            }`,
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
    const { panelShadow, panel, panelBorderRadius, closeOnClick } = this.props;
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
          onClick={() => {
            if (closeOnClick) {
              this.toggleVisible();
            }
          }}
        />

        <View className={classNames(`${classPrefix}__outline__panel`)}>
          <View
            className={classNames(`${classPrefix}__outline__panel__inner`, {
              [`${classPrefix}__outline__panel__inner--shadow`]: panelShadow,
            })}
            style={{
              borderRadius: transformSize(panelBorderRadius),
              height: '100%',
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
      >
        {position === 'top' ? this.buildPopoverPanel() : null}

        <View
          className={classNames(`${classPrefix}__content`)}
          onClick={this.toggleVisible}
        >
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
