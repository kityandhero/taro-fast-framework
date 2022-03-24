import classNames from 'classnames';
import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
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

    const { value } = {
      ...defaultProps,
      ...props,
    };

    const a = isArray(value) ? value : [];

    this.state = {
      ...this.state,
      ...{
        valueFlag: a,
        valueStage: a,
        currentLevel: a.length === 0 ? 0 : a.length - 1,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (!isArray(valueNext)) {
      return null;
    }

    if (valueNext.join() !== valuePrev.join()) {
      return {
        valueFlag: valueNext,
        valueStage: valueNext,
        currentLevel: valueNext.length === 0 ? 0 : valueNext.length - 1,
      };
    }

    return null;
  }

  filterOptions = () => {
    const { options } = this.props;

    return isArray(options) ? options : [];
  };

  getLastValue = () => {
    const { valueStage } = this.state;

    if (valueStage.length > 0) {
      const length = valueStage.length;

      return this.getIndexValue(length - 1);
    }

    return null;
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
    }

    return result;
  };

  triggerChange = (v, option) => {
    const { afterChange } = this.props;
    const { valueStage, currentLevel } = this.state;

    const value = [...valueStage];

    value[currentLevel] = v;

    if (value.join() !== valueStage.join()) {
      if (isArray(option.children) && option.children.length > 0) {
        value[currentLevel + 1] = '';
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
    const { currentLevel } = this.state;

    const barData = this.getBarData();
    const currentOptions = this.getIndexOptions(currentLevel);
    const currentValue = this.getIndexValue(currentLevel);

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
