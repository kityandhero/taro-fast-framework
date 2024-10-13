import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { isFunction, isObject } from 'easy-soft-utility';

import { AbstractComponent } from 'taro-fast-common';

const getClassNames = (name) => ({
  enter: `tfc-${name}-enter tfc-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `tfc-${name}-enter-to tfc-${name}-enter-active enter-to-class enter-active-class`,
  leave: `tfc-${name}-leave tfc-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `tfc-${name}-leave-to tfc-${name}-leave-active leave-to-class leave-active-class`,
});

export const defaultProps = {
  ...AbstractComponent.defaultProps,
  classes: '',
  show: false,
  duration: 300,
  name: 'fade',
  onBeforeEnter: null,
  onBeforeLeave: null,
  onAfterEnter: null,
  onAfterLeave: null,
  onEnter: null,
  onLeave: null,
  enterClass: '',
  enterActiveClass: '',
  enterToClass: '',
  leaveClass: '',
  leaveActiveClass: '',
  leaveToClass: '',
};

export function useTransition({
  show = false,
  duration = 300,
  name = 'fade',
  onBeforeEnter,
  onBeforeLeave,
  onAfterEnter,
  onAfterLeave,
  onEnter,
  onLeave,
  enterClass,
  enterActiveClass,
  enterToClass,
  leaveClass,
  leaveActiveClass,
  leaveToClass,
}) {
  const transitionEnded = useRef(false);
  const status = useRef('');
  const [display, setDisplay] = useState(false);
  const [initializationCompleted, setInitializationCompleted] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [classes, setClasses] = useState('');

  const classNames = useMemo(() => {
    const names = getClassNames(name);
    if (!name) {
      names['enter'] += ` ${enterClass ?? ''}`;
      names['enter-to'] += `${enterToClass ?? ''} ${enterActiveClass ?? ''} `;
      names['leave'] += `  ${leaveClass ?? ''}`;
      names['leave-to'] += ` ${leaveToClass ?? ''} ${leaveActiveClass ?? ''}`;
    }
    return names;
  }, [
    enterActiveClass,
    enterClass,
    enterToClass,
    leaveActiveClass,
    leaveClass,
    leaveToClass,
    name,
  ]);

  const onTransitionEnd = useCallback(() => {
    if (transitionEnded.current) {
      return;
    }
    transitionEnded.current = true;
    if (status.current === 'enter') {
      if (isFunction(onAfterEnter)) {
        onAfterEnter();
      }
    } else {
      if (isFunction(onAfterLeave)) {
        onAfterLeave();
      }
    }

    if (!show && display) {
      // this.setData({ display: false })
      setDisplay(false);
    }
  }, [display, onAfterEnter, onAfterLeave, show]);

  const _enter = useCallback(() => {
    // debugger
    // const { duration, name } = this.data

    const currentDurationTemporary = isObject(duration)
      ? duration.enter
      : duration;
    status.current = 'enter';

    // this.$emit('before-enter')

    if (isFunction(onBeforeEnter)) {
      onBeforeEnter();
    }

    requestAnimationFrame(() => {
      if (status.current !== 'enter') {
        return;
      }

      if (isFunction(onEnter)) {
        onEnter();
      }

      setInitializationCompleted(true);
      setDisplay(true);
      setClasses(classNames.enter);
      setCurrentDuration(currentDurationTemporary);

      requestAnimationFrame(() => {
        if (status.current !== 'enter') {
          return;
        }
        transitionEnded.current = false;
        setClasses(classNames['enter-to']);
      });
    });
  }, [duration, onBeforeEnter, onEnter, classNames]);

  const _leave = useCallback(() => {
    if (!display) {
      return;
    }
    const currentDurationTemporary = isObject(duration)
      ? duration.leave
      : duration;
    status.current = 'leave';

    if (isFunction(onBeforeLeave)) {
      onBeforeLeave();
    }

    requestAnimationFrame(() => {
      if (status.current !== 'leave') {
        return;
      }

      // this.$emit('leave')
      if (isFunction(onLeave)) {
        onLeave();
      }

      setClasses(classNames.leave);
      setCurrentDuration(currentDurationTemporary);

      requestAnimationFrame(() => {
        if (status.current !== 'leave') {
          return;
        }
        transitionEnded.current = false;
        setTimeout(() => onTransitionEnd(), currentDurationTemporary);
        setClasses(classNames['leave-to']);
      });
    });
  }, [classNames, display, duration, onBeforeLeave, onLeave, onTransitionEnd]);

  useEffect(() => {
    show ? _enter() : _leave();
  }, [_enter, _leave, show]);

  return {
    display,
    initializationCompleted,
    currentDuration,
    classes,
    onTransitionEnd,
  };
}
