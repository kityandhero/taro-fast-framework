import { Component } from 'react';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isBoolean,
  isEmptyArray,
  isFunction,
  isObject,
  isString,
  isUndefined,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Card, ColorText, Line, Space } from 'taro-fast-component';

import {
  cardHeaderStyle,
  cardStyle,
  interactiveConfigCollection,
} from '../../customConfig';

const style = {
  backgroundColor: '#f5f7fa',
  ...cardStyle,
};

const itemStyle = {
  paddingTop: transformSize(6),
  paddingBottom: transformSize(6),
};

const textPrefixStyle = {
  color: '#929292',
};

const textStyle = {
  color: '#929292',
};

const defaultProps = {
  header: '属性与示例值',
  list: [],
};

class PropertyInteractiveBox extends Component {
  buildList = () => {
    const { config, ignorePropertyList } = this.props;

    const list = Object.entries(config).map((d) => {
      const [key, value] = d;

      if (!isUndefined(value)) {
        if (isBoolean(value) && value) {
          return {
            label: key,
            value: toString(value),
            ellipsis: false,
            canCopy: true,
          };
        } else if (isString(value)) {
          return {
            label: key,
            value: toString(value),
            ellipsis: false,
            canCopy: true,
          };
        } else if (isFunction(value)) {
          return {
            label: key,
            value: 'function',
            ellipsis: false,
            canCopy: true,
          };
        } else if (isObject(value) || isArray(value)) {
          if (checkInCollection(ignorePropertyList, key)) {
            return {
              label: key,
              value: 'data/component',
              ellipsis: false,
              canCopy: true,
            };
          }

          return {
            label: key,
            value: JSON.stringify(value),
            ellipsis: false,
            canCopy: true,
          };
        } else {
          return {
            label: key,
            value: toString(value),
            ellipsis: false,
            canCopy: true,
          };
        }
      }

      return {
        label: key,
        value: 'null',
        ellipsis: false,
        canCopy: true,
      };
    });

    return list;
  };

  render() {
    const { header, list, onOptionalValueClick } = this.props;

    return (
      <Card
        strip
        stripLeft={2}
        stripWidth={6}
        stripColor="#ccc"
        header={header || '示例'}
        style={style}
        headerStyle={cardHeaderStyle}
      >
        <View
          style={{
            height: transformSize(300),
            overflowY: 'auto',
          }}
        >
          <Space
            direction="vertical"
            fillWidth
            split={<Line color="#ccc" height={2} />}
          >
            {list.map((o, index) => {
              const {
                name,
                description,
                valueType,
                defaultValue,
                optionalValues,
                simpleFunction,
              } = {
                name: '',
                description: '',
                valueType: '',
                defaultValue: '',
                simpleFunction: '',
                optionalValues: [],
                ...o,
              };

              const showOptionalValues =
                isArray(optionalValues) && !isEmptyArray(optionalValues);

              return (
                <View key={`p_${index}`}>
                  <View style={itemStyle}>
                    <ColorText
                      textPrefix="属性名"
                      textPrefixStyle={textPrefixStyle}
                      separatorStyle={{ marginRight: transformSize(10) }}
                      text={name}
                    />
                  </View>

                  {checkStringIsNullOrWhiteSpace(description) ? null : (
                    <View style={itemStyle}>
                      <ColorText
                        textPrefix="描述"
                        textPrefixStyle={textPrefixStyle}
                        separatorStyle={{ marginRight: transformSize(10) }}
                        text={description}
                      />
                    </View>
                  )}

                  <View style={itemStyle}>
                    <ColorText
                      textPrefix="值类型"
                      textPrefixStyle={textPrefixStyle}
                      separatorStyle={{ marginRight: transformSize(10) }}
                      text={
                        isArray(valueType) ? valueType.join(' || ') : valueType
                      }
                    />
                  </View>

                  <View style={itemStyle}>
                    <ColorText
                      textPrefix="默认值"
                      textPrefixStyle={textPrefixStyle}
                      separatorStyle={{ marginRight: transformSize(10) }}
                      text={JSON.stringify(defaultValue)}
                    />
                  </View>

                  {valueType.length === 1 &&
                  valueType[0] === interactiveConfigCollection.function &&
                  !checkStringIsNullOrWhiteSpace(simpleFunction) ? (
                    <View style={itemStyle}>
                      <ColorText
                        textPrefix="函数示例"
                        textPrefixStyle={textPrefixStyle}
                        separatorStyle={{ marginRight: transformSize(10) }}
                        text={simpleFunction}
                      />
                    </View>
                  ) : null}

                  {showOptionalValues ? (
                    <View style={itemStyle}>
                      <ColorText text="示例值集合: " textStyle={textStyle} />
                    </View>
                  ) : null}

                  {showOptionalValues ? (
                    <View
                      style={{
                        padding: transformSize(6),
                      }}
                    >
                      <Space wrap style={{ width: '100%' }}>
                        {optionalValues.map((one, index_) => {
                          const { title, value: ov } = one;

                          return (
                            <View
                              key={`opv_${index_}`}
                              style={{
                                paddingTop: transformSize(4),
                                paddingBottom: transformSize(4),
                                paddingLeft: transformSize(10),
                                paddingRight: transformSize(10),
                                color: '#333',
                                fontSize: transformSize(24),
                                borderRadius: transformSize(8),
                                borderWidth: transformSize(2),
                                borderColor: '#ccc',
                                borderStyle: 'solid',
                                overflow: 'hidden',
                              }}
                              onClick={() => {
                                if (!isFunction(onOptionalValueClick)) {
                                  return;
                                }

                                const data = {};

                                data[name] = ov;

                                onOptionalValueClick(data);
                              }}
                            >
                              {title}
                            </View>
                          );
                        })}
                      </Space>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </Space>
        </View>
      </Card>
    );
  }
}

PropertyInteractiveBox.defaultProps = {
  ...defaultProps,
};

export { PropertyInteractiveBox };
