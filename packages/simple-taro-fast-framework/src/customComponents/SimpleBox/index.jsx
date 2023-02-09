import { Component } from 'react';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  isString,
  isUndefined,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Card,
  CenterBox,
  ColorText,
  Divider,
  HelpBox,
  IconBell,
  Space,
} from 'taro-fast-component';

import { cardHeaderStyle, cardStyle } from '../../customConfig';
import { buildComponentPrismCode } from '../../utils';

const style = {
  backgroundColor: '#f5f7fa',
  ...cardStyle,
};

const defaultProps = {
  space: true,
  header: '',
  prefix: '示例',
  helpTitle: '示例配置',
  config: {},
  description: null,
  extra: null,
  componentName: '',
  mockChildren: true,
  useInnerBox: true,
  innerBoxMinHeight: 120,
  innerBoxCenterMode: true,
  innerBoxPadding: true,
  controlBox: null,
};

class SimpleBox extends Component {
  getFirstConfig = () => {
    const { config } = this.props;

    if (isArray(config)) {
      return config[0];
    }

    return config;
  };

  buildList = () => {
    const { ignorePropertyList } = this.props;

    const config = this.getFirstConfig();

    const list = Object.entries(config).map((d) => {
      const [key, value] = d;

      if (!isUndefined(value)) {
        if (isBoolean(value) && value) {
          return {
            text: `${key}: ${toString(value)}`,
            ellipsis: true,
          };
        } else if (isString(value)) {
          return {
            text: `${key}: ${toString(value)}`,
            ellipsis: true,
          };
        } else if (isFunction(value)) {
          return {
            text: `${key}: function`,
            ellipsis: true,
          };
        } else if (isObject(value) || isArray(value)) {
          if (checkInCollection(ignorePropertyList, key)) {
            return {
              text: `${key}: data/component`,
              ellipsis: true,
            };
          }

          return {
            text: `${key}: ${JSON.stringify(value)}`,
            ellipsis: true,
          };
        } else {
          return {
            text: `${key}: ${toString(value)}`,
            ellipsis: true,
          };
        }
      }

      return {
        text: `${key}: null`,
        ellipsis: true,
      };
    });

    return list;
  };

  buildCode = () => {
    const { componentName, mockChildren, ignorePropertyList } = this.props;

    const config = this.getFirstConfig();

    return buildComponentPrismCode({
      componentName,
      config,
      mockChildren,
      ignorePropertyList,
    });
  };

  buildFooter = () => {
    const { footer } = this.props;

    let listData = [];

    if (isString(footer)) {
      if (checkStringIsNullOrWhiteSpace(footer || null)) {
        return null;
      }

      listData.push({
        text: footer,
      });
    }

    if (isArray(footer)) {
      listData = footer;
    }

    if (listData.length > 0) {
      return <HelpBox showTitle={false} showNumber={false} list={listData} />;
    }

    if (isObject(footer)) {
      return footer;
    }

    return null;
  };

  buildExhibitionArea = () => {
    const {
      useInnerBox,
      innerBoxCenterMode,
      innerBoxMinHeight,
      innerBoxPadding,
      innerBoxBackgroundColor,
      children,
    } = this.props;

    return useInnerBox ? (
      <View
        style={{
          minHeight: transformSize(innerBoxMinHeight || 120),
          border: 'var(--tfc-1) solid #f2e5c0',
          borderRadius: transformSize(6),
          ...(innerBoxBackgroundColor
            ? {
                backgroundColor: innerBoxBackgroundColor,
              }
            : {}),
          ...(innerBoxPadding
            ? {
                padding: 'var(--tfc-10) var(--tfc-10)',
              }
            : {
                width: 'calc(100% - var(--tfc-1) * 2)',
              }),
          ...(innerBoxCenterMode
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }
            : {}),
        }}
      >
        {children}
      </View>
    ) : (
      children
    );
  };

  buildDescriptionArea = () => {
    const { description } = this.props;

    if ((description || null) == null) {
      return null;
    }

    return description;
  };

  buildExtraArea = () => {
    const { extraArea } = this.props;

    if ((extraArea || null) == null) {
      return null;
    }

    return extraArea;
  };

  buildJointArea = () => {
    const exhibitionArea = this.buildExhibitionArea();
    const descriptionArea = this.buildDescriptionArea();
    const extraArea = this.buildExtraArea();

    if ((extraArea || null) == null && (descriptionArea || null) == null) {
      return exhibitionArea;
    }

    return (
      <Space direction="vertical" size={30} fillWidth>
        {exhibitionArea}

        {checkStringIsNullOrWhiteSpace(descriptionArea) ? null : isString(
            descriptionArea,
          ) ? (
          <CenterBox>
            <ColorText
              color="#aaa"
              icon={<IconBell size={30} />}
              text={`: ${descriptionArea}`}
            />
          </CenterBox>
        ) : (
          descriptionArea
        )}

        {extraArea}
      </Space>
    );
  };

  render() {
    const { space, prefix, header, helpTitle, extra, controlBox } = this.props;

    const list = this.buildList();

    const footer = this.buildFooter();

    return (
      <Card
        strip
        stripLeft={2}
        stripWidth={6}
        stripColor="#3378f4"
        header={
          <ColorText
            textPrefix={prefix}
            text={header}
            separatorStyle={{ padding: `0 ${transformSize(5)}` }}
          />
        }
        style={style}
        headerStyle={cardHeaderStyle}
        footer={footer}
        space={space}
        extra={extra}
      >
        {this.buildJointArea()}

        {controlBox ? <Divider>样例切换</Divider> : null}

        {controlBox}

        {list.length > 0 ? (
          <HelpBox
            title={helpTitle}
            showTitle
            showDivider
            showNumber={false}
            list={this.buildList()}
          />
        ) : null}

        {this.buildCode()}
      </Card>
    );
  }
}

SimpleBox.defaultProps = {
  ...defaultProps,
};

export { SimpleBox };
