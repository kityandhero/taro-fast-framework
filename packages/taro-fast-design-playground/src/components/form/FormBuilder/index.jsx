import React, { PureComponent } from 'react';
import { Input, Text, Textarea, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  filter,
  isArray,
  isFunction,
  logException,
  showSimpleWarnMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  downloadFileAndOpen,
  emptyImage,
  transformSize,
} from 'taro-fast-common';
import {
  ActionSheet,
  Card,
  CheckBox,
  ColorText,
  DatetimePicker,
  datetimePickerTypeCollection,
  DatetimeRangePicker,
  Empty,
  FlexBox,
  HelpBox,
  IconFileGeneric,
  IconTags,
  Line,
  MultiLineText,
  Popup,
  Radio,
  Space,
  VerticalBox,
} from 'taro-fast-component';

const fontSizeDefault = 34;

// const colorDefault = '#000';
const itemBoxStyle = {
  paddingTop: transformSize(10),
  paddingBottom: transformSize(10),
  paddingLeft: transformSize(20),
  paddingRight: transformSize(20),
};

const commonLabelStyle = {
  // backgroundColor: '#333',
  paddingTop: transformSize(10),
  paddingBottom: transformSize(10),
};

const commonValueStyle = {
  backgroundColor: '#fff',
  paddingTop: transformSize(10),
  paddingBottom: transformSize(10),
  paddingLeft: transformSize(10),
  paddingRight: transformSize(10),
  borderRadius: transformSize(8),
  borderWidth: transformSize(2),
  borderStyle: 'solid',
  marginBottom: transformSize(10),
};

const attachmentBoxStyle = {
  paddingTop: transformSize(16),
  paddingBottom: transformSize(16),
};

const attachmentIconStyle = {
  width: transformSize(46),
};

const attachmentTitleStyle = {
  // paddingBottom: transformSize(10),
  overflowX: 'hidden',
};

const defaultProperties = {
  attachmentList: [],
  backgroundColor: '#fff',
  borderColor: '#ccc',
  endYear: 2030,
  fontSize: 40,
  initialValueList: [],
  labelStyle: {},
  onChange: null,
  onRemoveAttachment: null,
  remarkList: [],
  schemaList: [],
  startYear: 2023,
};

class FormBuilder extends PureComponent {
  // componentRef = null;

  // imageTargetRef = React.createRef();

  values = {};

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      filePreviewPopupVisible: false,
      removeAttachmentActionSheetVisible: false,
      currentAttachment: null,
      schemaTag: '',
      generalOriginal: {},
      itemsOriginal: [],
      general: {},
      items: [],
    };
  }

  componentDidMount() {
    const { initialValueList, schemaList } = this.getProperties();

    if (isArray(schemaList)) {
      for (const schema of schemaList) {
        const { name, type } = {
          name: '',
          type: '',
          ...schema,
        };

        let initialValue = null;

        if (!checkStringIsNullOrWhiteSpace(name)) {
          const listFilter = filter(initialValueList, (item) => {
            const { name: nameItem } = {
              name: '',
              ...item,
            };

            return nameItem === name;
          });

          if (listFilter.length > 0) {
            initialValue = listFilter[0];
          }
        }

        if (type === 'string') {
          const { value } = { name: '', value: '', ...initialValue };

          this.values[name] = value;
        }

        if (type === 'number') {
          const { value } = { name: '', value: '', ...initialValue };

          this.values[name] = value;
        }

        if (type === 'multiString') {
          const { value } = { name: '', value: '', ...initialValue };

          this.values[name] = value;
        }

        if (type === 'datetime') {
          const { value } = { name: '', value: '', ...initialValue };

          this.values[name] = value;
        }

        if (type === 'time') {
          const { value } = { name: '', value: '', ...initialValue };

          this.values[name] = value;
        }

        if (type === 'datetimeRange' || type === 'timeRange') {
          const { value } = {
            value: [],
            ...initialValue,
          };

          let valueAdjust = [];

          try {
            valueAdjust = checkStringIsNullOrWhiteSpace(value)
              ? []
              : isArray(value)
                ? [...value]
                : JSON.parse(value);
          } catch (error) {
            logException(
              error,
              `parse data error on componentDidMount in FormBuilder`,
            );

            valueAdjust = [];
          }

          this.values[name] = valueAdjust;
        }

        if (type === 'singleSelect') {
          const { value } = { name: '', value: '', ...initialValue };

          this.values[name] = value;
        }

        if (type === 'multiSelect') {
          const { value } = {
            value: [],
            ...initialValue,
          };

          let valueAdjust = [];

          try {
            valueAdjust = isArray(value) ? [...value] : JSON.parse(value);
          } catch (error) {
            logException(
              error,
              `parse data error on componentDidMount in FormBuilder`,
            );

            valueAdjust = [];
          }

          this.values[name] = valueAdjust;
        }
      }
    }

    this.triggerValuesChange();
  }

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  startDownload = ({ attachment }) => {
    const that = this;

    if (checkStringIsNullOrWhiteSpace(attachment)) {
      showSimpleWarnMessage('附件链接无效');

      return;
    }

    Taro.notifyMessage({
      message: '即将为您下载',
      type: 'info',
    });

    downloadFileAndOpen({
      url: attachment,
      successCallback: ({
        directlyOpen,
        // eslint-disable-next-line no-unused-vars
        filePath,
        // eslint-disable-next-line no-unused-vars
        extensionName,
        // eslint-disable-next-line no-unused-vars
        other,
      }) => {
        Taro.notifyMessage({
          message: '下载成功',
          type: 'success',
        });

        if (!directlyOpen) {
          const { hasContent = false, content = '' } = {
            hasContent: false,
            content: '',
            ...other,
          };

          if (hasContent && !checkStringIsNullOrWhiteSpace(content)) {
            that.showFilePreviewPopup(content);
          }
        }
      },
    });
  };

  showFilePreviewPopup = (o) => {
    this.setState({ previewContent: o, filePreviewPopupVisible: true });
  };

  closeFilePreviewPopup = () => {
    this.setState({ previewContent: null, filePreviewPopupVisible: false });
  };

  showRemoveAttachmentActionSheet = (o) => {
    this.setState({
      currentAttachment: o,
      removeAttachmentActionSheetVisible: true,
    });
  };

  closeRemoveAttachmentActionSheet = () => {
    this.setState({
      currentAttachment: null,
      removeAttachmentActionSheetVisible: false,
    });
  };

  triggerValuesChange = () => {
    const { afterFormChange } = this.getProperties();

    if (!isFunction(afterFormChange)) {
      return;
    }

    afterFormChange(this.values);
  };

  triggerInputChange = (event, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    const {
      detail: { value },
    } = event;

    this.values[name] = value;

    this.triggerValuesChange();
  };

  triggerTimeChange = (o, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    const { integrityValue } = { integrityValue: '', ...o };

    this.values[name] = integrityValue;

    this.triggerValuesChange();
  };

  triggerTimeRangeChange = (o, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    const { range } = { range: [], ...o };

    this.values[name] = range;

    this.triggerValuesChange();
  };

  triggerDatetimeChange = (o, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    const { integrityValue } = { integrityValue: '', ...o };

    this.values[name] = integrityValue;

    this.triggerValuesChange();
  };

  triggerDatetimeRangeChange = (o, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    const { range } = { range: [], ...o };

    this.values[name] = range;

    this.triggerValuesChange();
  };

  triggerRadioChange = (value, option, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    this.values[name] = value;

    this.triggerValuesChange();
  };

  triggerCheckBoxChange = (value, option, name) => {
    if (checkStringIsNullOrWhiteSpace(name)) {
      return;
    }

    this.values[name] = value;

    this.triggerValuesChange();
  };

  renderFormItem = (o, index) => {
    const {
      backgroundColor,
      borderColor,
      endYear,
      fontSize,
      initialValueList,
      labelStyle,
      placeholderStyle,
      startYear,
    } = this.getProperties();

    const { required, title, name, type, enumList } = {
      title: '',
      name: '',
      type: '',
      required: false,
      enumList: [],
      ...o,
    };

    let initialValue = null;

    if (!checkStringIsNullOrWhiteSpace(name)) {
      const listFilter = filter(initialValueList, (item) => {
        const { name: nameItem } = {
          name: '',
          ...item,
        };

        return nameItem === name;
      });

      if (listFilter.length > 0) {
        initialValue = listFilter[0];
      }
    }

    const fontSizeAdjust = canToNumber(fontSize)
      ? toNumber(fontSize)
      : fontSizeDefault;

    const key = `item_${index}`;

    if (checkStringIsNullOrWhiteSpace(type)) {
      return null;
    }

    const titleAdjust = `${title || '缺少标题'}:`;

    const placeholder = `请输入${title}`;

    const labelComponent = (
      <FlexBox
        style={{
          height: '100%',
        }}
        flexAuto="right"
        left={
          required ? (
            <VerticalBox>
              <Text
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                  width: transformSize(24),
                  height: transformSize(40),
                  lineHeight: transformSize(40),
                  color: 'red',
                }}
              >
                *
              </Text>
            </VerticalBox>
          ) : null
        }
        right={
          <VerticalBox alignJustify="start">
            <View
              style={{
                fontSize: transformSize(fontSizeAdjust),
                marginRight: transformSize(20),
                ...labelStyle,
              }}
            >
              <VerticalBox>
                <ColorText
                  text={titleAdjust}
                  textStyle={{
                    fontSize: transformSize(fontSizeAdjust),
                    ...labelStyle,
                  }}
                />
              </VerticalBox>
            </View>
          </VerticalBox>
        }
        rightStyle={{
          paddingRight: transformSize(40),
        }}
      />
    );

    const label = (
      <>
        <View
          style={{
            ...commonLabelStyle,
          }}
        >
          {labelComponent}
        </View>

        <Line transparent height={10} />
      </>
    );

    const commonValueStyleAdjust = {
      ...commonValueStyle,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    };

    if (type === 'string') {
      const { value } = {
        value: '',
        ...initialValue,
      };

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Input
              type="text"
              defaultValue={value}
              style={{
                fontSize: transformSize(fontSizeAdjust),
              }}
              placeholder={placeholder}
              placeholderStyle={{
                ...placeholderStyle,
                fontSize: transformSize(fontSizeAdjust),
              }}
              cursor={-1}
              onInput={(event) => {
                this.triggerInputChange(event, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'number') {
      const { value } = {
        value: '',
        ...initialValue,
      };

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Input
              type="digit"
              defaultValue={value}
              style={{
                fontSize: transformSize(fontSizeAdjust),
              }}
              placeholder={placeholder}
              placeholderStyle={{
                ...placeholderStyle,
                fontSize: transformSize(fontSizeAdjust),
              }}
              cursor={-1}
              onInput={(event) => {
                this.triggerInputChange(event, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'multiString') {
      const { value } = {
        value: '',
        ...initialValue,
      };

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Textarea
              defaultValue={value}
              style={{
                fontSize: transformSize(fontSizeAdjust),
                lineHeight: transformSize(fontSizeAdjust + 16),
              }}
              placeholder={placeholder}
              placeholderStyle={{
                ...placeholderStyle,
                fontSize: transformSize(fontSizeAdjust),
              }}
              autoHeight
              cursor={-1}
              onInput={(event) => {
                this.triggerInputChange(event, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'time') {
      const { value } = {
        value: '',
        ...initialValue,
      };

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <DatetimePicker
              defaultValue={value}
              startYear={startYear}
              endYear={endYear}
              type={datetimePickerTypeCollection.hourMinuteSecond}
              viewBuilder={(v) => {
                const { integrityValue } = v;

                return <View>{integrityValue || '请点击进行选择'}</View>;
              }}
              afterChange={(data) => {
                this.triggerTimeChange(data, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'datetime') {
      const { value } = {
        value: '',
        ...initialValue,
      };

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <DatetimePicker
              defaultValue={value}
              startYear={startYear}
              endYear={endYear}
              type={datetimePickerTypeCollection.yearMonthDayHourMinuteSecond}
              viewBuilder={(v) => {
                const { integrityValue } = v;

                return <View>{integrityValue || '请点击进行选择'}</View>;
              }}
              afterChange={(data) => {
                this.triggerDatetimeChange(data, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'timeRange') {
      const { value } = {
        value: [],
        ...initialValue,
      };

      let valueAdjust = [];

      try {
        valueAdjust = checkStringIsNullOrWhiteSpace(value)
          ? []
          : isArray(value)
            ? [...value]
            : JSON.parse(value);
      } catch (error) {
        logException(
          error,
          `parse data error on renderFormItem in FormBuilder`,
        );

        valueAdjust = [];
      }

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <DatetimeRangePicker
              defaultValue={valueAdjust}
              startYear={startYear}
              endYear={endYear}
              type={datetimePickerTypeCollection.hourMinuteSecond}
              startLabel="起始时间"
              endLabel="结束时间"
              afterChange={(data) => {
                this.triggerTimeRangeChange(data, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'datetimeRange') {
      const { value } = {
        value: [],
        ...initialValue,
      };

      let valueAdjust = [];

      try {
        valueAdjust = checkStringIsNullOrWhiteSpace(value)
          ? []
          : isArray(value)
            ? [...value]
            : JSON.parse(value);
      } catch (error) {
        logException(
          error,
          `parse data error on renderFormItem in FormBuilder`,
        );

        valueAdjust = [];
      }

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <DatetimeRangePicker
              defaultValue={valueAdjust}
              startYear={startYear}
              endYear={endYear}
              type={datetimePickerTypeCollection.yearMonthDayHourMinuteSecond}
              startLabel="起始日期"
              endLabel="结束日期"
              afterChange={(data) => {
                this.triggerDatetimeRangeChange(data, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'singleSelect') {
      const { value } = {
        value: '',
        ...initialValue,
      };

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Radio
              value={value}
              options={enumList}
              afterChange={(v, option) => {
                this.triggerRadioChange(v, option, name);
              }}
            />
          </View>
        </View>
      );
    }

    if (type === 'multiSelect') {
      const { value } = {
        value: [],
        ...initialValue,
      };

      let valueAdjust = [];

      try {
        valueAdjust = checkStringIsNullOrWhiteSpace(value)
          ? []
          : isArray(value)
            ? [...value]
            : JSON.parse(value);
      } catch (error) {
        logException(
          error,
          `parse data error on renderFormItem in FormBuilder`,
        );

        valueAdjust = [];
      }

      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <CheckBox
              value={valueAdjust}
              options={enumList}
              afterChange={(v, option) => {
                this.triggerCheckBoxChange(v, option, name);
              }}
            />
          </View>
        </View>
      );
    }

    return null;
  };

  buildAttachmentBox = () => {
    const { attachmentList, onRemoveAttachment } = this.getProperties();

    const existAttachment = isArray(attachmentList)
      ? attachmentList.length > 0
      : false;

    return (
      <Card
        header="附件:"
        headerStyle={{ paddingLeft: 0 }}
        space={false}
        border={false}
        headerEllipsis={false}
        extra={<IconTags size={36} color="#888" />}
      >
        {existAttachment ? (
          <View>
            <Space
              direction="vertical"
              fillWidth
              size={0}
              split={<Line height={2} />}
            >
              {attachmentList.map((o, index) => {
                const { alias, existPdf, url, urlPdf } = {
                  alias: '',
                  existPdf: whetherNumber.no,
                  url: '',
                  urlPdf: '',
                  ...o,
                };

                return (
                  <View key={`attachment_${index}`} style={attachmentBoxStyle}>
                    <FlexBox
                      flexAuto="left"
                      left={
                        <FlexBox
                          flexAuto="right"
                          leftStyle={{
                            marginRight: transformSize(10),
                          }}
                          left={
                            <VerticalBox>
                              <View style={attachmentIconStyle}>
                                <IconFileGeneric size={36} color="#888" />
                              </View>
                            </VerticalBox>
                          }
                          right={
                            <View style={attachmentTitleStyle}>
                              <MultiLineText
                                style={{
                                  color: '#333',
                                }}
                                fontSize={30}
                                lineHeight={36}
                                text={alias}
                              />
                            </View>
                          }
                        />
                      }
                      right={
                        <Space
                          style={{
                            marginLeft: transformSize(10),
                          }}
                          size={6}
                          split={
                            <Line direction="vertical" width={4} height="24" />
                          }
                        >
                          <ColorText
                            fontSize={28}
                            color="#518bc0"
                            text="查看"
                            onClick={() => {
                              if (existPdf === whetherNumber.yes) {
                                this.startDownload({ attachment: urlPdf });
                              } else {
                                this.startDownload({ attachment: url });
                              }
                            }}
                          />

                          <ColorText
                            fontSize={28}
                            color="#ccc"
                            text="移除"
                            onClick={() => {
                              if (!isFunction(onRemoveAttachment)) {
                                Taro.notifyMessage({
                                  message: '缺少 onRemoveAttachment 配置',
                                  type: 'error',
                                });

                                return;
                              }

                              this.showRemoveAttachmentActionSheet(o);
                            }}
                          />
                        </Space>
                      }
                    />
                  </View>
                );
              })}
            </Space>

            <View>
              <ColorText
                textPrefix="注"
                textPrefixStyle={{
                  color: '#a5a5a5',
                }}
                separator=":"
                separatorStyle={{
                  color: '#a5a5a5',
                  marginRight: transformSize(14),
                }}
                text="点查看进行预览，若文件较大，需要耗费时间下载."
                textStyle={{
                  color: '#a5a5a5',
                }}
              />
            </View>
          </View>
        ) : (
          <Empty
            icon=""
            image={emptyImage}
            imageAspectRatio={0.7156}
            description="无附件"
          />
        )}
      </Card>
    );
  };

  renderInteractiveArea = () => {
    const { onRemoveAttachment } = this.getProperties();
    const {
      removeAttachmentActionSheetVisible,
      filePreviewPopupVisible,
      previewContent,
      currentAttachment,
    } = this.state;

    return (
      <>
        <Popup
          visible={filePreviewPopupVisible || false}
          header="文件预览"
          mode="through"
          position="bottom"
          showClose
          closeWhenOverlayClick
          arcTop
          onClose={this.closeFilePreviewPopup}
        >
          <View
            style={{
              height: transformSize(640),
              overflowY: 'auto',
            }}
          >
            {previewContent}
          </View>
        </Popup>

        <ActionSheet
          visible={removeAttachmentActionSheetVisible || false}
          title="即将移除附件, 确定吗?"
          headerStyle={{
            color: '#999',
            fontWeight: 'bold',
          }}
          cancelText="取消"
          onCancel={this.closeRemoveAttachmentActionSheet}
          onClose={() => {
            this.closeRemoveAttachmentActionSheet();
          }}
          options={[
            {
              value: 'ok',
              content: '确定',
            },
          ]}
          onOptionClick={() => {
            if (!isFunction(onRemoveAttachment)) {
              Taro.notifyMessage({
                message: '缺少 onRemoveAttachment 配置',
                type: 'error',
              });

              return;
            }

            onRemoveAttachment(currentAttachment);
          }}
        >
          即将移除附件，确定吗？
        </ActionSheet>
      </>
    );
  };

  render() {
    const { schemaList, remarkList } = this.getProperties();

    return (
      <>
        <View>
          <View>
            <Space
              direction="vertical"
              fillWidth
              size={0}
              split={<Line height={2} />}
            >
              {schemaList.map((o, index) => {
                return this.renderFormItem(o, index);
              })}
            </Space>
          </View>

          <Line color="#eee" height={2} />

          <View style={itemBoxStyle}>{this.buildAttachmentBox()}</View>

          <Line color="#eee" height={2} />

          <View style={itemBoxStyle}>
            <HelpBox
              list={remarkList.map((o) => {
                return {
                  text: o,
                };
              })}
            />
          </View>

          <Line transparent height={10} />
        </View>

        {this.renderInteractiveArea()}
      </>
    );
  }
}

FormBuilder.defaultProps = {
  ...defaultProperties,
};

export { FormBuilder };
