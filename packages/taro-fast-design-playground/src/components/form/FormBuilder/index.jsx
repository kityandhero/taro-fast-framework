import React, { PureComponent } from 'react';
import { Input, Text, Textarea, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
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
  fontSize: 40,
  valueList: [],
  schemaList: [],
  attachmentList: [],
  remarkList: [],
  labelStyle: {},
  borderColor: '#ccc',
  backgroundColor: '#fff',
  onChange: null,
  onRemoveAttachment: null,
};

class FormBuilder extends PureComponent {
  // componentRef = null;

  // imageTargetRef = React.createRef();

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

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  // eslint-disable-next-line no-unused-vars
  // static getDerivedStateFromProps(nextProperties, previousState) {
  //   const { schema } = nextProperties;
  //   const { schemaTag } = previousState;

  //   if (toMd5(JSON.stringify(schema || {})) != schemaTag) {
  //     const { general, items } = adjustSchemaData(schema);

  //     return {
  //       schemaTag: toMd5(JSON.stringify(schema || [])),
  //       general,
  //       items: [...items],
  //       generalOriginal: general,
  //       itemsOriginal: [...items],
  //     };
  //   }

  //   return null;
  // }

  // setComponentRef = (reference) => {
  //   this.componentRef = reference;
  // };

  // initializeDesign = () => {
  //   const { itemsOriginal } = this.state;

  //   if (isArray(itemsOriginal)) {
  //     const itemsAdjust = itemsOriginal.map((o) => {
  //       return {
  //         ...getInitializeItem(),
  //         ...o,
  //       };
  //     });

  //     this.setState({
  //       general: getInitializeGeneral(),
  //       items: [...itemsAdjust],
  //     });
  //   } else {
  //     this.setState({ general: getInitializeGeneral(), items: [] });
  //   }
  // };

  // renderPrintContent = () => {
  //   return this.componentRef;
  // };

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

  renderFormItem = (o, index) => {
    const {
      fontSize,
      labelStyle,
      borderColor,
      backgroundColor,
      placeholderStyle,
    } = this.getProperties();

    const { required, title, type, enumList } = {
      title: '',
      type: '',
      required: false,
      enumList: [],
      ...o,
    };

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
      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Input
              type="text"
              style={{
                fontSize: transformSize(fontSizeAdjust),
              }}
              placeholder={placeholder}
              placeholderStyle={{
                ...placeholderStyle,
                fontSize: transformSize(fontSizeAdjust),
              }}
              cursor={-1}
              // onInput={throttle(this.onInput, 400)}
            />
          </View>
        </View>
      );
    }

    if (type === 'number') {
      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Input
              type="digit"
              style={{
                fontSize: transformSize(fontSizeAdjust),
              }}
              placeholder={placeholder}
              placeholderStyle={{
                ...placeholderStyle,
                fontSize: transformSize(fontSizeAdjust),
              }}
              cursor={-1}
              // onInput={throttle(this.onInput, 400)}
            />
          </View>
        </View>
      );
    }

    if (type === 'multiString') {
      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Textarea
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
              // onInput={throttle(this.onInput, 400)}
            />
          </View>
        </View>
      );
    }

    if (type === 'singleSelect') {
      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <Radio options={enumList} value="" />
          </View>
        </View>
      );
    }

    if (type === 'multiSelect') {
      return (
        <View key={key} style={itemBoxStyle}>
          {label}

          <View style={commonValueStyleAdjust}>
            <CheckBox options={enumList} value="" />
          </View>
        </View>
      );
    }

    return null;
  };

  buildAttachmentBox = () => {
    const { attachmentList, onRemoveAttachment } = this.props;

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

                        // <View
                        //   style={{
                        //     marginLeft: transformSize(10),
                        //   }}
                        // >
                        //   <View
                        //     onClick={() => {
                        //       if (existPdf === whetherNumber.yes) {
                        //         this.startDownload({ attachment: urlPdf });
                        //       } else {
                        //         this.startDownload({ attachment: url });
                        //       }
                        //     }}
                        //   >
                        //     查看
                        //   </View>

                        //   <Line direction="vertical" width={16} height="30" />

                        //   <View
                        //     onClick={() => {
                        //       if (existPdf === whetherNumber.yes) {
                        //         this.startDownload({ attachment: urlPdf });
                        //       } else {
                        //         this.startDownload({ attachment: url });
                        //       }
                        //     }}
                        //   >
                        //     查看
                        //   </View>
                        // </View>
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
    const { onRemoveAttachment } = this.props;
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
    const { schemaList, remarkList } = {
      ...defaultProperties,
      ...this.props,
    };

    return (
      <>
        <View>
          <View>
            {/* <View ref={this.imageTargetRef}>
              <DocumentContent ref={this.setComponentRef} {...p} />
            </View> */}

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
