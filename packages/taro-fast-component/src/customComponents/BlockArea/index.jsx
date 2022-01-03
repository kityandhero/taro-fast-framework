import classNames from 'classnames';
import { View } from '@tarojs/components';

import { mergeProps } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `tfc-block-area`;

const defaultProps = {
  title: '',
  style: {},
  titleStyle: {},
  contentStyle: {},
};

export const BlockArea = (p) => {
  const props = mergeProps(defaultProps, p);

  const { title, style, titleStyle, contentStyle } = props;

  const titleStyleAdjust = {
    ...{
      backgroundColor: '#f5f7fa',
    },
    ...(titleStyle || null),
  };

  const contentStyleAdjust = {
    ...{
      border: '',
      padding: '12px 12px',
      backgroundColor: '#ffffff',
    },
    ...(contentStyle || null),
  };

  return (
    <View className={classPrefix} style={style}>
      <View
        className={classNames(`${classPrefix}-title`)}
        style={titleStyleAdjust}
      >
        {title}
      </View>
      <View
        className={classNames(`${classPrefix}-content`)}
        style={contentStyleAdjust}
      >
        {props.children}
      </View>
    </View>
  );
};

BlockArea.defaultProps = {
  ...defaultProps,
};
