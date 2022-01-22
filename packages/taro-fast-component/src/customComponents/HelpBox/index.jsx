import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Divider from '../Divider';
import DataGrid from '../DataGrid';

import './index.less';

const defaultProps = {
  title: '帮助信息',
  showTitle: true,
  showNumber: true,
  labelWidth: null,
  list: [],
  useBackground: false,
  hidden: false,
};

class HelpBox extends ComponentBase {
  renderFurther() {
    const {
      title: titleValue,
      showTitle,
      showDivider,
      showNumber,
      labelWidth: labelWidthValue,
      list: listData,
      useBackground,
      hidden,
    } = {
      ...{
        title: '',
        showTitle: true,
        showNumber: true,
        showDivider: true,
        labelWidth: null,
        list: [],
        useBackground: false,
        hidden: false,
      },
      ...(this.props || {}),
    };

    if (hidden) {
      return null;
    }

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

    return (
      <View
        className={classNames(
          'tfc-help-box',
          useBackground
            ? 'tfc-help-box-background'
            : 'tfc-help-box-no-background',
        )}
      >
        {showTitle ? (
          showDivider ? (
            <Divider
              contentPosition="left"
              style={{
                marginTop: 4,
                marginBottom: 4,
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
            };
          })}
          bordered={false}
          colon={showNumber}
          column={1}
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
