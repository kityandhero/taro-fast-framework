import { useCallback } from 'react';

import { mergeProps } from 'taro-fast-common/es/utils/tools';

import Transition from '../Transition';
import { defaultProps } from './tools';

import './index.less';

export function Overlay(props) {
  const {
    show,
    zIndex,
    style,
    className,
    lockScroll = true,
    duration = 300,
    children,
    ...others
  } = mergeProps(defaultProps, props);

  const _noop = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  return lockScroll ? (
    <Transition
      show={show}
      className={'tfc-overlay' + `  ${className}`}
      style={{
        ...{
          zIndex: zIndex,
        },
        ...style,
      }}
      duration={duration}
      onTouchMove={_noop}
      {...others}
    >
      {children}
    </Transition>
  ) : (
    <Transition
      show={show}
      className={'tfc-overlay' + `  ${className || ''}`}
      style={{
        ...{
          zIndex: zIndex,
        },
        ...style,
      }}
      duration={duration}
      {...others}
    >
      {children}
    </Transition>
  );
}

Overlay.defaultProps = {
  ...defaultProps,
};

export default Overlay;
