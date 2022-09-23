import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Input, View } from '@tarojs/components';

import { usePropsValue } from 'taro-fast-common/es/utils/hooks';
import {
  bound,
  mergeProps,
  transformSize,
  withNativeProps,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';
import Icon from '../Icon';

const { IconAdd, IconSubtract } = Icon;

const classPrefix = `tfc-stepper`;

const defaultProps = {
  defaultValue: 0,
  step: 1,
  min: 0,
  digits: 0,
  max: 100000,
  disabled: false,
  hidden: false,
  inputReadOnly: false,
  useBackground: true,
  backgroundColor: '',
  circle: false,
  operateColor: '',
  iconSize: 36,
  onChange: null,
  onIncrease: null,
  onReduce: null,
};

export const Stepper = (p) => {
  const props = mergeProps(defaultProps, p);

  const {
    disabled,
    step,
    max,
    min,
    inputReadOnly,
    useBackground,
    backgroundColor,
    operateColor,
    circle,
    iconSize,
    onChange,
    onIncrease,
    onReduce,
  } = props;

  const operateStyle = {
    ...(!!operateColor
      ? {
          '--button-text-color': operateColor,
        }
      : {}),
  };

  const colorStyle = {
    ...(useBackground
      ? !!backgroundColor
        ? {
            '--button-background-color': backgroundColor,
          }
        : {}
      : { '--button-background-color': 'transparent' }),
  };

  const circleStyle = {
    ...(circle
      ? {
          '--button-border-radius': '50%',
        }
      : {}),
  };

  const [value, setValue] = usePropsValue(props);
  const [inputValue, setInputValue] = useState(() => value.toString());

  function setValueWithCheck(v) {
    if (Number.isNaN(v)) {
      return;
    }

    let target = bound(v, props.min, props.max);

    if (props.digits || props.digits === 0) {
      target = parseFloat(target.toFixed(props.digits));
    }
    setValue(target);
  }

  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [hasFocus, value]);

  useEffect(() => {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [hasFocus, value]);

  const handleInputChange = (v) => {
    setInputValue(v);
    setValueWithCheck(parseFloat(v));

    if (isFunction(onChange)) {
      onChange(v);
    }
  };

  const handleMinus = () => {
    if (minusDisabled()) {
      return;
    }

    setValueWithCheck(value - step);

    if (isFunction(onReduce)) {
      onReduce(value - step);
    }
  };

  const handlePlus = () => {
    if (plusDisabled()) {
      return;
    }

    setValueWithCheck(value + step);

    if (isFunction(onIncrease)) {
      onIncrease(value - step);
    }
  };

  const minusDisabled = () => {
    if (min === undefined) {
      return disabled;
    } else {
      return disabled || value <= min;
    }
  };

  const plusDisabled = () => {
    if (max === undefined) {
      return disabled;
    } else {
      return disabled || value >= max;
    }
  };

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-active`]: hasFocus,
      })}
    >
      <View
        className={`${classPrefix}-minus`}
        onClick={handleMinus}
        disabled={minusDisabled()}
        style={{
          ...colorStyle,
          ...circleStyle,
          ...operateStyle,
        }}
      >
        <CenterBox>
          <IconSubtract size={iconSize} />
        </CenterBox>
      </View>

      <View className={`${classPrefix}-middle`}>
        <Input
          className={`${classPrefix}-input`}
          style={{
            ...{
              textAlign: 'center',
              fontSize: transformSize(26),
            },
            ...colorStyle,
            ...(circle ? { '--input-background-color': 'transparent' } : {}),
          }}
          onFocus={(e) => {
            setHasFocus(true);
            props.onFocus?.(e);
          }}
          value={inputValue}
          onChange={(val) => {
            disabled || handleInputChange(val);
          }}
          disabled={disabled || inputReadOnly}
          onBlur={(e) => {
            setHasFocus(false);
            props.onBlur?.(e);
          }}
        />
      </View>

      <View
        className={`${classPrefix}-plus`}
        onClick={handlePlus}
        disabled={plusDisabled()}
        style={{
          ...colorStyle,
          ...circleStyle,
          ...operateStyle,
        }}
      >
        <CenterBox>
          <IconAdd size={iconSize} />
        </CenterBox>
      </View>
    </View>,
  );
};

Stepper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};
