import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Radio from '../Radio';

import './index.less';

const classPrefix = `tfc-cascader`;

const defaultProps = {
  style: {},
  border: false,
  options: [],
  value: [],
};

class Cascader extends ComponentBase {
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
      const v = this.getIndexValue(i);

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
          if (o.value === valueStage[i]) {
            result.push(o);

            return true;
          }
        });
      }
    }

    return result;
  };

  triggerChange = (v) => {
    const { onChange } = this.props;
    const { valueStage, currentLevel } = this.state;

    valueStage[currentLevel] = v;

    this.setState({
      valueStage: [...valueStage],
    });

    if (isFunction(onChange)) {
      onChange(valueStage);
    }
  };

  changeLevel = (index) => {
    this.setState({
      currentLevel: index,
    });
  };

  renderFurther() {
    const { style, border } = this.props;
    const { currentLevel } = this.state;

    const barData = this.getBarData();
    const currentOptions = this.getIndexOptions(currentLevel);
    const currentValue = this.getIndexValue(currentLevel);

    return (
      <View className={classNames(classPrefix)}>
        <View className={classNames(`${classPrefix}__bar`)}>
          {barData.map((o, i) => {
            const key = `bar_${i}`;

            return (
              <View
                className={classNames(`${classPrefix}__bar__item`)}
                key={key}
                onClick={() => {
                  this.changeLevel(i);
                }}
              >
                {o.label}
              </View>
            );
          })}
        </View>
        <View>
          <Radio
            style={style}
            border={border}
            options={currentOptions}
            value={currentValue}
            onChange={this.triggerChange}
          />
        </View>
      </View>
    );
  }
}

Cascader.defaultProps = {
  ...defaultProps,
};

export default Cascader;
