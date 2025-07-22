import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  mergeArrowText,
} from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';
import { BaseComponent } from 'taro-fast-component';

import { buildPrimaryCallName } from '../definition';

const primaryCallName = buildPrimaryCallName('InteractiveBase');

class InteractiveBase extends BaseComponent {
  /**
   * 可见性标记，通过构造函数赋值，请务必不要使用其他渠道赋值。
   * @member {string}
   */
  visibleFlag = '';

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
  constructor(properties, visibleFlag = '') {
    super(properties);

    if (checkStringIsNullOrWhiteSpace(visibleFlag || '')) {
      throw new Error(
        mergeArrowText(
          this.componentName,
          'constructor(properties, visibleFlag)',
          `visibleFlag disallow empty`,
        ),
      );
    }

    this.visibleFlag = visibleFlag;
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData };
  }

  /**
   * 切换为显示状态后的额外执行逻辑
   * @function
   * @example
   * doOtherWhenChangeVisibleToShow = () => {}
   */
  doOtherWhenChangeVisibleToShow = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToShow',
      emptyLogic,
    );
  };

  /**
   * 切换为显示状态后，doOtherWhenChangeVisibleToShow 执行后的附加逻辑, 默认为空逻辑，可根据需要重载。
   * @function
   * @example
   * executeAfterDoOtherWhenChangeVisibleToShow = () => {}
   */
  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
      emptyLogic,
    );
  };

  /**
   * 切换为隐藏状态后的额外执行逻辑, 在 doOtherWhenChangeVisible 中根据可见状态自动触发，当前为空逻辑，可根据需要重载。
   * @function
   * @example
   * doOtherWhenChangeVisibleToHide = () => {}
   */
  doOtherWhenChangeVisibleToHide = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 切换为隐藏状态后的额外附加执行逻辑, 在 doOtherWhenChangeVisible 中根据可见状态自动触发，排在 doOtherWhenChangeVisibleToHide 之后触发，当前为空逻辑，可根据需要重载。
   * @function
   * @example
   * executeAfterDoOtherWhenChangeVisibleToHide = () => {}
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 可见性变更后，doOtherWhenChangeVisible 执行后的附加逻辑
   * @function
   * @param {boolean} currentVisible 当前显示状态
   * @example
   * executeOtherAfterDoOtherWhenChangeVisible = (currentVisible) => {}
   */
  executeOtherAfterDoOtherWhenChangeVisible = (currentVisible) => {
    this.logEmptyCallTrack(
      {
        parameters: {
          currentVisible,
        },
      },
      primaryCallName,
      'executeOtherAfterDoOtherWhenChangeVisible',
      emptyLogic,
    );
  };

  /**
   * 可见性变更后执行的逻辑。
   * @function
   * @param {boolean} currentVisible 当前显示状态。
   */
  doOtherWhenChangeVisible = (currentVisible) => {
    this.logFunctionCallTrack(
      {
        parameter: { currentVisible },
      },
      primaryCallName,
      'doOtherWhenChangeVisible',
    );

    if (currentVisible) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'doOtherWhenChangeVisibleToShow',
      );

      this.doOtherWhenChangeVisibleToShow();

      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'executeAfterDoOtherWhenChangeVisibleToShow',
      );

      this.executeAfterDoOtherWhenChangeVisibleToShow();
    } else {
      const { afterClose } = this.props;

      if (isFunction(afterClose)) {
        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
        );

        afterClose();
      } else {
        this.logEmptyCallTrace(
          {},
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
          emptyLogic,
        );
      }

      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'doOtherWhenChangeVisibleToHide',
      );

      this.doOtherWhenChangeVisibleToHide();

      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'executeAfterDoOtherWhenChangeVisibleToHide',
      );

      this.executeAfterDoOtherWhenChangeVisibleToHide();
    }

    this.logFunctionCallTrace(
      {
        parameter: {
          currentVisible,
        },
      },
      primaryCallName,
      'doOtherWhenChangeVisible',
      'trigger',
      'executeOtherAfterDoOtherWhenChangeVisible',
    );

    this.executeOtherAfterDoOtherWhenChangeVisible(currentVisible);
  };

  getVisibleFlag() {
    this.logCallTrack({}, primaryCallName, 'getVisibleFlag');

    const { flag } = {
      flag: '',
      ...this.props,
    };

    return flag || this.visibleFlag;
  }
}

export { InteractiveBase };
