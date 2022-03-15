import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';

import Divider from '../Divider';
import DataGrid from '../DataGrid';

import './index.less';

const classPrefix = `tfc-help-box`;

const defaultProps = {
  title: '帮助信息',
  showTitle: true,
  showNumber: true,
  labelWidth: null,
  list: [],
  useBackground: false,
  backgroundColor: '#e1e1e1',
  hidden: false,
};

class HelpBox extends BaseComponent {
  buildStyle = () => {
    const { useBackground, backgroundColor } = this.props;

    return {
      ...(useBackground && stringIsNullOrWhiteSpace(backgroundColor)
        ? {}
        : { '--background': backgroundColor }),
    };
  };

  renderFurther() {
    const {
      title: titleValue,
      showTitle,
      showDivider,
      showNumber,
      labelWidth: labelWidthValue,
      list: listData,
      useBackground,
    } = this.props;

    const title = titleValue || '帮助信息';
    let list = [];

    if (isArray(listData)) {
      list = listData.map((o, index) => {
        const d = {
          ...{
            key: '',
            label: '',
            text: '',
            span: 1,
            labelStyle: null,
            contentStyle: null,
            canCopy: false,
            copyData: null,
            ellipsis: false,
          },
          ...o,
        };

        d.key = `help_box_item_${index}`;
        d.no = index + 1;
        d.text = d.text || '';

        return d;
      });
    }

    const labelWidth = toNumber(labelWidthValue ?? null);

    const labelWidthStyle = labelWidth > 0 ? transformSize(labelWidth) : 0;

    const customLabelWidth = labelWidth > 0;

    const style = this.buildStyle();

    return (
      <View
        className={classNames(
          classPrefix,
          useBackground
            ? `${classPrefix}__background`
            : `${classPrefix}__no-background`,
        )}
        style={style}
      >
        {showTitle ? (
          showDivider ? (
            <Divider
              contentPosition="left"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                color: '#999',
              }}
            >
              {title}
            </Divider>
          ) : (
            <View
              style={{
                marginTop: transformSize(8),
                marginBottom: transformSize(8),
                color: '#999',
                fontWeight: 'normal',
                fontSize: transformSize(28),
                lineHeight: transformSize(44),
                height: transformSize(44),
              }}
            >
              {title}:
            </View>
          )
        ) : null}

        <DataGrid
          list={list.map((o) => {
            const {
              key,
              no,
              label,
              text,
              labelStyle,
              contentStyle,
              span,
              canCopy,
              copyData,
              ellipsis,
            } = o;

            return {
              key: key,
              label: stringIsNullOrWhiteSpace(label)
                ? showNumber
                  ? no
                  : '•'
                : label,
              value: text,
              labelStyle: labelStyle || null,
              contentStyle: contentStyle || null,
              span,
              canCopy,
              copyData,
              ellipsis,
            };
          })}
          border={false}
          colon={showNumber}
          column={1}
          columnVerticalAlign="flex-start"
          labelStyle={{
            width: customLabelWidth
              ? labelWidthStyle
              : showNumber
              ? transformSize(44)
              : transformSize(24),
            color: '#999',
            fontSize: transformSize(28),
          }}
          contentStyle={{
            color: '#999',
            fontSize: transformSize(28),
          }}
          itemStyle={{
            paddingBottom: transformSize(8),
          }}
        />
      </View>
    );
  }
}

HelpBox.defaultProps = {
  ...defaultProps,
};

export default HelpBox;
