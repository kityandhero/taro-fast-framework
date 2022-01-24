import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  isArray,
  isFunction,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Overlay from '../Overlay';
import CenterBox from '../CenterBox';

import ActionSheetItem from './body/item';
import ActionSheetBody from './body/index';
import ActionSheetFooter from './footer/index';
import ActionSheetHeader from './header/index';

import './index.less';

const defaultProps = {
  /**
   * 是否展示元素
   * @default false
   */
  visible: false,
  /**
   * 元素的标题
   */
  title: '',
  /**
   * 取消按钮的内容
   */
  cancelText: '取消',
  /**
   * 元素被关闭触发的事件
   */
  onClose: null,
  /**
   * 点击了底部取消按钮触发的事件
   */
  onCancel: null,
  options: [],
  style: {},
  headerStyle: {},
  bodyStyle: {},
  footerStyle: {},
};

class ActionSheet extends ComponentBase {
  constructor(props) {
    super(props);
    const { visible } = props;

    this.state = {
      visibleStage: visible,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible: visibleNext } = nextProps;
    const { visibleStage: visiblePrev } = prevState;

    if (visibleNext !== visiblePrev) {
      return {
        visibleStage: visibleNext,
      };
    }

    return {};
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visibleStage } = this.state;

    if (!visibleStage) {
      this.handleClose();
    }
  };

  handleClose = () => {
    const { onClose } = this.props;

    if (isFunction(onClose)) {
      onClose();
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;

    if (isFunction(onCancel)) {
      onCancel();
    }

    this.close();
  };

  close = () => {
    this.setState(
      {
        visibleStage: false,
      },
      this.handleClose,
    );
  };

  handleTouchMove = (e) => {
    this.ignoreTouchMove(e);
  };

  renderFurther() {
    const {
      style,
      title,
      cancelText,
      className,
      options,
      headerStyle,
      bodyStyle,
      footerStyle,
    } = this.props;
    const { visibleStage } = this.state;

    const rootClass = classNames(
      'tfc-action-sheet',
      {
        'tfc-action-sheet--active': visibleStage,
      },
      className,
    );

    return (
      <View
        className={rootClass}
        style={style}
        onTouchMove={this.handleTouchMove}
      >
        <Overlay
          visible={visibleStage}
          zIndex={0}
          lockScroll
          onClick={this.close}
        />

        <View
          className={classNames('tfc-action-sheet__container', {
            'tfc-action-sheet__container__active': visibleStage,
          })}
        >
          {!!title ? (
            <ActionSheetHeader style={headerStyle}>
              {isString(title) ? title : <CenterBox>{title}</CenterBox>}
            </ActionSheetHeader>
          ) : null}

          <ActionSheetBody style={bodyStyle}>
            {(isArray(options) ? options : []).map((o, index) => {
              const {
                className: classNameItem,
                style: styleItem,
                value,
                content,
                onClick: onItemClick,
              } = o;

              const key = `item_${index}`;

              return (
                <ActionSheetItem
                  key={key}
                  className={classNameItem}
                  style={styleItem}
                  value={value || ''}
                  onClick={(v, e) => {
                    onItemClick(v, e);

                    this.close();
                  }}
                >
                  {content}
                </ActionSheetItem>
              );
            })}
          </ActionSheetBody>

          {cancelText && (
            <ActionSheetFooter style={footerStyle} onClick={this.handleCancel}>
              {cancelText}
            </ActionSheetFooter>
          )}
        </View>
      </View>
    );
  }
}

ActionSheet.defaultProps = {
  ...defaultProps,
};

export default ActionSheet;
