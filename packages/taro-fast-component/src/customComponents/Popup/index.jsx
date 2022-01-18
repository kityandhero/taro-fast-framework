import classNames from 'classnames';
import { View, Icon } from '@tarojs/components';
import { useState, useEffect, useCallback, useRef } from 'react';

import { inCollection, mergeProps } from 'taro-fast-common/es/utils/tools';

import { bem } from '../../utils/tools';
import Overlay from '../Overlay';
import Transition from '../Transition';
import { defaultProps as defaultPropsTransition } from '../Transition/tools';

import './index.less';

const defaultPropsOverlay = {};

const { useTransition } = Transition;

function popupStyle(data) {
  return {
    ...{
      zIndex: data.zIndex,
      transitionDuration: data.currentDuration + 'ms',
    },
    ...(data.display ? {} : { display: 'none' }),
  };
}

const positionCollection = ['center', 'top', 'bottom', 'right', 'left'];

export const defaultProps = {
  ...defaultPropsTransition,
  ...defaultPropsOverlay,
  ...{
    style: {},
    className: '',
    lockScroll: true,
    duration: 300,
    round: false,
    closeable: false,
    overlayStyle: {},
    transition: null,
    zIndex: 1010,
    overlay: true,
    closeIcon: <Icon size="18" type="clear" color="#ccc" />,
    closeIconPosition: 'top-right',
    closeOnClickOverlay: true,
    position: 'center',
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    onClickOverlay: null,
    onBeforeEnter: null,
    onBeforeLeave: null,
    onAfterEnter: null,
    onAfterLeave: null,
    onEnter: null,
    onLeave: null,
    onClose: null,
  },
};

export function Popup(props) {
  const {
    show,
    duration,
    round,
    closeable,
    overlayStyle,
    transition,
    zIndex,
    overlay,
    closeIcon,
    closeIconPosition,
    closeOnClickOverlay,
    position: positionSource,
    safeAreaInsetBottom,
    safeAreaInsetTop,
    lockScroll,
    children,
    onClickOverlay,
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
    onClose,
    style,
    className,
    ...others
  } = mergeProps(defaultProps, props);

  const position = inCollection(positionCollection, positionSource)
    ? positionSource
    : 'center';

  const _onClickCloseIcon = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const _onClickOverlay = useCallback(() => {
    onClickOverlay?.();
    if (closeOnClickOverlay) {
      onClose?.();
    }
  }, [closeOnClickOverlay, onClickOverlay, onClose]);

  const [_name, setName] = useState('');
  const [_duration, setDuration] = useState(duration);
  const originDuration = useRef(null);

  useEffect(() => {
    setName(transition || position);
    if (transition === 'none') {
      setDuration(0);
      originDuration.current = duration;
    } else if (originDuration.current != null) {
      setDuration(originDuration.current);
    }
  }, [duration, position, transition]);
  const {
    initializationCompleted,
    currentDuration,
    classes,
    display,
    onTransitionEnd,
  } = useTransition({
    show,
    duration: _duration,
    name: _name,
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
  });

  const getClassName = useCallback((name) => {
    return name.replace(/([A-Z])/g, (_, $1) => {
      return '-' + $1?.toLowerCase();
    });
  }, []);

  return (
    <>
      {overlay && (
        <Overlay
          show={show}
          zIndex={zIndex}
          style={overlayStyle}
          duration={duration}
          onClick={_onClickOverlay}
          lockScroll={lockScroll}
        />
      )}
      {initializationCompleted && (
        <View
          className={classNames(
            classes,
            bem('popup', [
              position,
              {
                round,
                safe: safeAreaInsetBottom,
                safeTop: safeAreaInsetTop,
              },
            ]),
            className,
          )}
          style={{
            ...popupStyle({
              zIndex,
              currentDuration,
              display,
            }),
            ...style,
          }}
          onTransitionEnd={onTransitionEnd}
          {...others}
        >
          {children}
          {closeable && (
            <View
              className={
                'close-icon-class tfc-popup__close-icon tfc-popup__close-icon--' +
                getClassName(closeIconPosition)
              }
              onClick={_onClickCloseIcon}
            >
              {closeIcon}
            </View>
          )}
        </View>
      )}
    </>
  );
}

Popup.defaultProps = {
  ...defaultProps,
};

export default Popup;
