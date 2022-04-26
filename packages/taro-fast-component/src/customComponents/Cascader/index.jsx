import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  dropRight,
  md5,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import Radio from '../Radio';

import './index.less';

const classPrefix = `tfc-cascader`;

const defaultProps = {
  style: {},
  border: false,
  options: [],
  value: [],
  afterChange: null,
};

class Cascader extends BaseComponent {
  flag = '';

  constructor(props) {
    super(props);

    const { value, options } = props;

    const a = isArray(value) ? value : [];

    this.state = {
      ...this.state,
      ...{
        valueFlag: a,
        valueStage: a,
        optionMd5Flag: md5(options),
        currentLevel: a.length === 0 ? 0 : a.length - 1,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext, options: optionsNext } = nextProps;
    const { valueFlag: valuePrev, optionMd5FlagPrev } = prevState;

    const valueNextAdjust = !isArray(valueNext) ? [] : valueNext;

    console.log({
      valueNextAdjust,
      valuePrev,
    });

    const optionMd5FlagNext = md5(optionsNext);

    const optionsChanged = optionMd5FlagPrev !== optionMd5FlagNext;

    if (valueNextAdjust.join() === valuePrev.join() && !optionsChanged) {
      return null;
    }

    return {
      ...(valueNextAdjust.join() !== valuePrev.join()
        ? {
            valueFlag: valueNextAdjust,
            valueStage: valueNextAdjust,
            currentLevel:
              valueNextAdjust.length === 0 ? 0 : valueNextAdjust.length - 1,
          }
        : {}),
      ...(optionsChanged
        ? {
            valueFlag: valueNextAdjust,
            valueStage: valueNextAdjust,
            currentLevel:
              valueNextAdjust.length === 0 ? 0 : valueNextAdjust.length - 1,
            optionMd5Flag: optionMd5FlagNext,
          }
        : {}),
    };
  }

  filterOptions = () => {
    const { options } = this.props;

    return isArray(options) ? options : [];
  };

  getIndexValue = (index) => {
    const { valueStage } = this.state;

    const length = valueStage.length;

    if (length > 0) {
      if (length < index + 1) {
        return null;
      }

      if (index < 0) {
        return null;
      }

      return valueStage[index];
    }

    return null;
  };

  getIndexOptions = (index) => {
    let result = this.getIndexOptionsCore(index);

    if (result.length === 0) {
      result = this.filterOptions();
    }

    return result;
  };

  getIndexOptionsCore = (index) => {
    if (index < 0) {
      return [];
    }

    let result = [];

    let children = this.filterOptions();

    for (let i = 0; i <= index; i++) {
      const v = this.getIndexValue(i) || this.flag;

      const exist = children.some((o) => {
        if (o.value === v) {
          result = children;
          children = o.children || [];

          return true;
        }
      });

      if (!exist) {
        result = [];

        return result;
      }

      if (result.length === 0) {
        return result;
      }
    }

    return result;
  };

  getBarData = () => {
    const { valueStage } = this.state;

    let result = [];

    if (valueStage.length > 0) {
      const count = valueStage.length;

      for (let i = 0; i < count; i++) {
        const options = this.getIndexOptions(i);

        options.some((o) => {
          if (stringIsNullOrWhiteSpace(valueStage[i])) {
            result.push({
              label: '请选择',
              value: '',
            });

            return true;
          } else {
            if (o.value === valueStage[i]) {
              result.push(o);

              return true;
            }
          }
        });
      }
    } else {
      result.push({
        label: '请选择',
        value: '',
      });
    }

    return result;
  };

  triggerChange = (v, option) => {
    const { afterChange } = this.props;
    const { valueStage, currentLevel } = this.state;

    let value = [...valueStage];

    value[currentLevel] = v;

    if (value.join() !== valueStage.join()) {
      if (isArray(option.children) && option.children.length > 0) {
        value[currentLevel + 1] = '';

        value = dropRight(value, value.length - (currentLevel + 1));

        this.flag = option.children[0].value;

        this.setState({
          valueStage: [...value],
          currentLevel: currentLevel + 1,
        });
      } else {
        this.setState({
          valueStage: [...value],
        });
      }

      if (isFunction(afterChange)) {
        afterChange(value);
      }
    }
  };

  changeLevel = (index) => {
    const { currentLevel } = this.state;

    if (index !== currentLevel) {
      this.setState({
        currentLevel: index,
      });
    }
  };

  renderFurther() {
    const { style, border } = this.props;
    const { currentLevel, valueStage } = this.state;

    const barData = this.getBarData();
    const currentOptions = this.getIndexOptions(currentLevel);
    const currentValue = this.getIndexValue(currentLevel);

    console.log({
      valueStage,
      barData,
      currentOptions,
      currentValue,
      currentLevel,
    });

    return (
      <View className={classNames(classPrefix)}>
        <View className={classNames(`${classPrefix}__header`)}>
          <View className={classNames(`${classPrefix}__header__bar`)}>
            {barData.map((o, i) => {
              const key = `bar_${i}`;

              return (
                <View
                  className={classNames(`${classPrefix}__header__bar__item`, {
                    [`${classPrefix}__header__bar__item__select`]:
                      o.value === currentValue,
                  })}
                  key={key}
                  onClick={() => {
                    this.changeLevel(i);
                  }}
                >
                  <View
                    className={classNames(
                      `${classPrefix}__header__bar__item__label`,
                    )}
                  >
                    {o.label}
                  </View>

                  <View
                    className={classNames(
                      `${classPrefix}__header__bar__item__line`,
                    )}
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View>
          <Radio
            style={{
              ...style,
              ...{
                border: '0',
              },
            }}
            bodyStyle={{
              border: '0',
            }}
            border={border}
            options={currentOptions}
            value={currentValue}
            afterChange={this.triggerChange}
          />
        </View>
      </View>
    );
  }
}

Cascader.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Cascader;
