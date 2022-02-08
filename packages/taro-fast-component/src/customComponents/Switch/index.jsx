import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import {
  recordError,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isObject,
  isPromise,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { Spin } from '../Spin';

import './index.less';

const classPrefix = `tfc-switch`;

const defaultProps = {
  confirm: false,
  disabled: false,
  checked: false,
  checkedText: '',
  uncheckedText: '',
  size: 2,
  color: '',
  hidden: false,
  onChange: null,
  afterChange: null,
};

class Switch extends ComponentBase {
  constructor(props) {
    super(props);

    const { checked } = props;

    this.state = {
      checkedFlag: checked,
      checkedStage: checked,
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checked: checkedNext } = nextProps;
    const { checkedFlag: checkedPrev } = prevState;

    if (checkedNext !== checkedPrev) {
      return {
        checkedFlag: checkedNext,
        checkedStage: checkedNext,
      };
    }

    return {};
  }

  execChange = (v) => {
    const { onChange } = this.props;

    if (isPromise(onChange)) {
      this.setState({ loading: true });

      return onChange(v);
    }

    return new Promise((resolve, reject) => {
      try {
        this.setState({ loading: true });

        const changeResult = onChange(v);

        resolve(changeResult);
      } catch (e) {
        reject(e);
      }
    });
  };

  triggerChange = () => {
    const { disabled: disabledSource, confirm } = this.props;
    const { loading } = this.state;

    const disabled = disabledSource || loading || false;

    if (disabled) {
      return;
    }

    if (confirm) {
      this.confirmChange(confirm);
    } else {
      this.handleChange();
    }
  };

  handleChange = () => {
    const { disabled, onChange, afterChange } = this.props;
    const { checkedStage } = this.state;

    if (disabled) {
      return;
    }

    if (isFunction(onChange)) {
      this.execChange(!checkedStage)
        .then((v) => {
          if (v) {
            this.setState({ loading: false });

            this.setState({ checkedStage: !checkedStage });

            if (isFunction(afterChange)) {
              afterChange(!checkedStage);
            }
          } else {
            recordError('调用执行失败');
          }
        })
        .catch((res) => {
          recordError(res);
        });
    } else {
      this.setState({
        checkedStage: !checkedStage,
      });

      if (isFunction(afterChange)) {
        afterChange(!checkedStage);
      }
    }
  };

  confirmChange = (confirm) => {
    const {
      title,
      content,
      confirmText,
      confirmColor,
      cancelText,
      cancelColor,
    } = {
      ...{
        title: '状态变更',
        content: '状态即将发生改变,确定吗?',
        confirmText: '确定',
        confirmColor: '',
        cancelText: '取消',
        cancelColor: '',
      },
      ...(isObject(confirm) ? confirm : {}),
    };

    const that = this;

    Taro.showModal({
      title,
      content,
      confirmText: confirmText || '确定',
      confirmColor: !isString(confirmColor)
        ? ''
        : stringIsNullOrWhiteSpace(confirmColor)
        ? ''
        : confirmColor,
      cancelText: cancelText || '取消',
      cancelColor: !isString(cancelColor)
        ? ''
        : stringIsNullOrWhiteSpace(cancelColor)
        ? ''
        : cancelColor,
      success: ({ confirm: c }) => {
        if (c) {
          that.handleChange();
        }
      },
    });
  };

  renderFurther() {
    const {
      disabled: disabledSource,
      checkedText,
      uncheckedText,
      size,
      color,
      hidden,
    } = this.props;
    const { loading, checkedStage } = this.state;

    if (hidden) {
      return null;
    }

    const disabled = disabledSource || loading || false;

    return (
      <View
        className={classNames(classPrefix, {
          [`${classPrefix}-checked`]: checkedStage,
          [`${classPrefix}-disabled`]: disabled,
        })}
        style={{
          ...{
            '--width': transformSize(50 * size),
            '--height': transformSize(30 * size),
          },
          ...(!!color
            ? {
                '--checked-color': color,
              }
            : {}),
        }}
        onClick={this.triggerChange}
      >
        <View className={`${classPrefix}-checkbox`} hoverClass="none">
          <View className={`${classPrefix}-handle`} hoverClass="none">
            <Spin spin={loading}>
              <View
                style={{
                  width: transformSize(30 * size),
                  height: transformSize(30 * size),
                }}
              ></View>
            </Spin>
          </View>

          <View
            className={`${classPrefix}-inner`}
            hoverClass="none"
            style={{
              fontSize: transformSize(13 * size),
              padding: `0 var(--tfc-4)`,
            }}
          >
            {checkedStage ? checkedText : uncheckedText}
          </View>
        </View>
      </View>
    );
  }
}

Switch.defaultProps = {
  ...defaultProps,
};

export default Switch;
