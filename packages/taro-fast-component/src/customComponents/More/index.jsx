import classNames from 'classnames';
import { Text, View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { Icon } from '../Icon';

import './index.less';

const { IconChevronRight } = Icon;

const classPrefix = `tfc-more`;

const defaultProps = {
  style: {},
  text: '更多',
  icon: <IconChevronRight size={34} />,
  onClick: null,
};

class More extends BaseComponent {
  buildStyle = () => {
    const { style } = this.props;

    return style || {};
  };

  renderFurther() {
    const { text, icon, onClick } = this.props;

    const style = this.buildStyle();

    return (
      <View
        className={classNames(classPrefix)}
        style={style}
        onClick={() => {
          if (isFunction(onClick)) {
            onClick();
          }
        }}
      >
        <Text className={classNames(`${classPrefix}__text`)} userSelect>
          {text}
        </Text>

        {icon ? (
          <View className={classNames(`${classPrefix}__icon`)}>{icon}</View>
        ) : null}
      </View>
    );
  }
}

More.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { More };
