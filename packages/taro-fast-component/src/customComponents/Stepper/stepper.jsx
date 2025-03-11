import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Input, View } from '@tarojs/components';

import {
  isFunction,
  mergeProperties,
  toBoundary,
  toNumber,
} from 'easy-soft-utility';

import {
  transformSize,
  usePropertiesValue,
  withNativeProperties,
} from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { IconAdd, IconSubtract } from '../Icon';

const classPrefix = `tfc-stepper`;

const defaultProps = {
  defaultValue: 0,
  step: 1,
  min: 0,
  cursor: -1,
  digits: 0,
  max: 100_000,
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
  const properties = mergeProperties(defaultProps, p);

  const {
    defaultValue: defaultValueSource,
    disabled,
    step,
    max,
    min,
    cursor,
    inputReadOnly,
    useBackground,
    backgroundColor,
    operateColor,
    circle,
    iconSize,
    onChange,
    onIncrease,
    onReduce,
  } = properties;

  const operateStyle = {
    ...(operateColor
      ? {
          '--button-text-color': operateColor,
        }
      : {}),
  };

  const colorStyle = {
    ...(useBackground
      ? backgroundColor
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

  const [defaultValue, setDefaultValue] = usePropertiesValue(properties);
  const [value, setValue] = usePropertiesValue(properties);
  const [inputValue, setInputValue] = useState(() => value.toString());

  if (defaultValue != toNumber(defaultValueSource)) {
    setDefaultValue(toNumber(defaultValueSource));
    setValue(toNumber(defaultValueSource));
    setInputValue(toNumber(defaultValueSource));
  }

  function setValueWithCheck(v) {
    if (Number.isNaN(v)) {
      return;
    }

    const { digits } = properties;

    let target = toBoundary(v, min, max);

    if (digits || digits === 0) {
      target = Number.parseFloat(target.toFixed(digits));
    }

    setValue(target);
  }

  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!hasFocus) {
      setInputValue(value.toString());
    }
  }, [hasFocus, value]);

  const handleInputChange = (v) => {
    setInputValue(v);
    setValueWithCheck(Number.parseFloat(v));

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
    return min === undefined ? disabled : disabled || value <= min;
  };

  const plusDisabled = () => {
    return max === undefined ? disabled : disabled || value >= max;
  };

  return withNativeProperties(
    properties,
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
            textAlign: 'center',
            fontSize: transformSize(26),
            ...colorStyle,
            ...(circle ? { '--input-background-color': 'transparent' } : {}),
          }}
          cursor={cursor}
          onFocus={(error) => {
            setHasFocus(true);

            if (isFunction(properties.onFocus)) {
              properties.onFocus(error);
            }
          }}
          value={inputValue}
          onChange={(v) => {
            disabled || handleInputChange(v);
          }}
          disabled={disabled || inputReadOnly}
          onBlur={(error) => {
            setHasFocus(false);

            if (isFunction(properties.onBlur)) {
              properties.onBlur(error);
            }
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
