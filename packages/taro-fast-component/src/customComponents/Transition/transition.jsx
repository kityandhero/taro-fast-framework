import { View } from '@tarojs/components';

import BaseComponent from '../BaseComponent';

import { defaultProps, useTransition } from './tools';

function buildRootStyle(data) {
  return {
    ...{
      transitionDuration: data.currentDuration + 'ms',
    },
    ...(data.display ? {} : { display: 'none' }),
    ...(data.style || {}),
  };
}

export function Transition(props) {
  const {
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
    duration,
    name,
    show,
    children,
    style,
    className,
    enterClass,
    enterActiveClass,
    enterToClass,
    leaveClass,
    leaveActiveClass,
    leaveToClass,
    ...others
  } = props;

  const { currentDuration, classes, display, onTransitionEnd } = useTransition({
    show,
    duration: duration,
    name: name,
    enterClass,
    enterActiveClass,
    enterToClass,
    leaveClass,
    leaveActiveClass,
    leaveToClass,
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
  });

  return (
    <>
      <View
        className={'tfc-transition ' + classes + ` ${className || ''}`}
        onTransitionEnd={onTransitionEnd}
        {...others}
        style={{
          ...buildRootStyle({
            currentDuration,
            display,
            style,
          }),
        }}
        catchMove
      >
        {children}
      </View>
    </>
  );
}

Transition.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Transition;
