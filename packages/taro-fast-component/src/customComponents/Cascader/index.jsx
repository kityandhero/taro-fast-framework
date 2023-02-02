import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  find,
  isArray,
  isFunction,
  toMd5,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { Radio } from '../Radio';

import './index.less';

const classPrefix = `tfc-cascader`;

const defaultProps = {
  style: {},
  border: false,
  options: [],
  useOptionCompareFlag: false,
  optionCompareFlag: '',
  value: [],
  asyncLoad: false,
  afterChange: null,
  scroll: false,
  height: 'auto',
};

class Cascader extends BaseComponent {
  flag = '';

  selectedOptionList = [];

  constructor(props) {
    super(props);

    const {
      value,
      options,
      asyncLoad,
      useOptionCompareFlag,
      optionCompareFlag,
    } = props;

    const a = isArray(value) ? value : [];

    if (asyncLoad && useOptionCompareFlag) {
      throw new Error(
        'Cascader: useOptionCompareFlag not allow true when asyncLoad is true',
      );
    }

    if (
      useOptionCompareFlag &&
      checkStringIsNullOrWhiteSpace(optionCompareFlag)
    ) {
      throw new Error(
        'Cascader: optionCompareFlag not allow empty when useOptionCompareFlag is true',
      );
    }

    this.state = {
      ...this.state,
      ...{
        valueFlag: a,
        valueStage: a,
        optionCompareFlag: useOptionCompareFlag
          ? optionCompareFlag
          : toMd5(options),
        currentLevel: a.length === 0 ? 0 : a.length - 1,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      value: valueNext,
      options: optionsNext,
      useOptionCompareFlag,
      optionCompareFlag: optionCompareFlagNext,
      asyncLoad,
    } = nextProps;
    const { valueFlag: valuePrev, optionCompareFlag: optionCompareFlagPrev } =
      prevState;

    const valueNextAdjust = !isArray(valueNext) ? [] : valueNext;

    if (asyncLoad && useOptionCompareFlag) {
      throw new Error(
        'Cascader: useOptionCompareFlag not allow true when asyncLoad is true',
      );
    }

    if (
      useOptionCompareFlag &&
      checkStringIsNullOrWhiteSpace(optionCompareFlagNext)
    ) {
      throw new Error(
        'Cascader: optionCompareFlag is not allow empty when useOptionCompareFlag is true',
      );
    }

    const optionCompareFlagNextAdjust = useOptionCompareFlag
      ? optionCompareFlagNext
      : toMd5(optionsNext);

    const optionCompareFlagChanged =
      optionCompareFlagPrev !== optionCompareFlagNextAdjust;

    if (
      valueNextAdjust.join() === valuePrev.join() &&
      !optionCompareFlagChanged
    ) {
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
      ...(optionCompareFlagChanged
        ? {
            valueFlag: valueNextAdjust,
            valueStage: valueNextAdjust,
            currentLevel:
              valueNextAdjust.length === 0 ? 0 : valueNextAdjust.length - 1,
            optionCompareFlag: optionCompareFlagNextAdjust,
          }
        : {}),
    };
  }

  getBodyStyle = () => {
    const { scroll, height } = this.props;

    return {
      ...(scroll && height !== 'auto'
        ? {}
        : { height: transformSize(height), overflow: 'hidden' }),
    };
  };

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
          if (checkStringIsNullOrWhiteSpace(valueStage[i])) {
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

        const valueAdjust = [];

        value.forEach((vv, i) => {
          if (i <= currentLevel + 1) {
            valueAdjust.push(vv);
          }
        });

        value = valueAdjust;

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

      this.selectedOptionList.push(option);

      const selectedOptionListFiltered = [];

      value.forEach((one) => {
        const d = find(this.selectedOptionList, (o) => {
          return o.value === one;
        });

        if (d != null) {
          selectedOptionListFiltered.push(d);
        }
      });

      this.selectedOptionList = selectedOptionListFiltered;

      if (isFunction(afterChange)) {
        afterChange(value, this.selectedOptionList);
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
    const { style, border, scroll, height } = this.props;
    const { currentLevel, valueStage } = this.state;

    const barData = this.getBarData();
    const currentOptions = this.getIndexOptions(currentLevel);
    const currentValue = this.getIndexValue(currentLevel);

    const selectArea = (
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
    );

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
                      valueStage.length === 0 || o.value === currentValue,
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
        {scroll ? (
          <ScrollView
            style={{
              ...{
                height: transformSize(height),
              },
            }}
            scrollX={false}
            scrollY
            scrollWithAnimation
            scrollAnchoring
            enhanced
            bounces
            showScrollbar={false}
          >
            {selectArea}
          </ScrollView>
        ) : (
          <View>{selectArea}</View>
        )}
      </View>
    );
  }
}

Cascader.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Cascader };
