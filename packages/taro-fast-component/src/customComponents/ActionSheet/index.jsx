import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isArray, isFunction, isString } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { Overlay } from '../Overlay';

import { ActionSheetBody } from './body/index';
import { ActionSheetItem } from './body/item';
import { ActionSheetFooter } from './footer/index';
import { ActionSheetHeader } from './header/index';

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
  onOptionClick: null,
  options: [],
  style: {},
  headerStyle: {},
  bodyStyle: {},
  footerStyle: {},
};

class ActionSheet extends BaseComponent {
  constructor(properties) {
    super(properties);

    const { visible } = properties;

    this.state = {
      visibleStage: visible,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { visible: visibleNext } = nextProperties;
    const { visibleStage: visiblePrevious } = previousState;

    if (visibleNext !== visiblePrevious) {
      return {
        visibleStage: visibleNext,
      };
    }

    return {};
  }

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

  handleTouchMove = (event) => {
    this.ignoreTouchMove(event);
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
      onOptionClick,
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
        catchMove
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
          {title ? (
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
              } = o;

              const key = `item_${index}`;

              return (
                <ActionSheetItem
                  key={key}
                  className={classNameItem}
                  style={styleItem}
                  value={value || ''}
                  onClick={(v, event) => {
                    this.close();

                    if (!isFunction(onOptionClick)) {
                      return;
                    }

                    onOptionClick(v, o, event);
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { ActionSheet };
