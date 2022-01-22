import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { View, Input } from '@tarojs/components';

import {
  withNativeProps,
  mergeProps,
  bound,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { usePropsValue } from 'taro-fast-common/es/utils/hooks';

import Button from '../Button';
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
  editable: true,
  onChange: null,
};

export const Stepper = (p) => {
  const props = mergeProps(defaultProps, p);
  const { disabled, step, max, min, inputReadOnly } = props;

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
  };

  const handleMinus = () => {
    if (minusDisabled()) {
      return;
    }

    setValueWithCheck(value - step);
  };

  const handlePlus = () => {
    if (plusDisabled()) {
      return;
    }

    setValueWithCheck(value + step);
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
      <Button
        className={`${classPrefix}-minus`}
        onClick={handleMinus}
        disabled={minusDisabled()}
        fill="none"
        color="primary"
      >
        <CenterBox>
          <IconSubtract size={36} />
        </CenterBox>
      </Button>

      <View className={`${classPrefix}-middle`}>
        <Input
          className={`${classPrefix}-input`}
          style={{ textAlign: 'center', fontSize: transformSize(26) }}
          onFocus={(e) => {
            setHasFocus(true);
            props.onFocus?.(e);
          }}
          value={inputValue}
          onChange={(val) => {
            disabled || handleInputChange(val);
          }}
          disabled={disabled}
          onBlur={(e) => {
            setHasFocus(false);
            props.onBlur?.(e);
          }}
          readOnly={inputReadOnly}
        />
      </View>

      <Button
        className={`${classPrefix}-plus`}
        onClick={handlePlus}
        disabled={plusDisabled()}
        fill="none"
        color="primary"
      >
        <CenterBox>
          <IconAdd size={36} />
        </CenterBox>
      </Button>
    </View>,
  );
};

Stepper.defaultProps = {
  ...defaultProps,
};
