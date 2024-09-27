import React, { PureComponent } from 'react';
import { View } from '@tarojs/components';

import { isArray, toMd5 } from 'easy-soft-utility';

import { Line } from 'taro-fast-component';

import {
  adjustSchemaData,
  getInitializeGeneral,
  getInitializeItem,
} from './DocumentContent/tools';
import { DocumentContent } from './DocumentContent';

const colorDefault = '#000';

const defaultProperties = {
  values: {},
  schema: {},
  style: null,
  color: colorDefault,
  title: '表格标题',
  titleContainerStyle: null,
  titleStyle: null,
  showTitle: true,
  labelColumnWidth: 140,
  labelColumnStyle: null,
  labelContainerStyle: null,
  labelStyle: null,
  signetStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
  showApply: false,
  applyList: [],
  showAttention: false,
  attentionList: [],
  approveList: [],
  allApproveProcessList: [],
  showRemark: true,
  remarkTitle: '备注',
  remarkName: 'remark',
  remarkList: [],
  showQRCode: false,
  qRCodeImage: '',
  qRCodeTitle: '防伪二维码:',
  qRCodeDescription: '扫码查看防伪标识',
  qRCodeHeight: 40,
  qRCodeStyle: {},
  showSerialNumber: false,
  serialNumberTitle: '流水号',
  serialNumberContent: '',
  onChange: null,
};

class DocumentPrintDesigner extends PureComponent {
  componentRef = null;

  imageTargetRef = React.createRef();

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      schemaTag: '',
      generalOriginal: {},
      itemsOriginal: [],
      general: {},
      items: [],
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { schema } = nextProperties;
    const { schemaTag } = previousState;

    if (toMd5(JSON.stringify(schema || {})) != schemaTag) {
      const { general, items } = adjustSchemaData(schema);

      return {
        schemaTag: toMd5(JSON.stringify(schema || [])),
        general,
        items: [...items],
        generalOriginal: general,
        itemsOriginal: [...items],
      };
    }

    return null;
  }

  setComponentRef = (reference) => {
    this.componentRef = reference;
  };

  initializeDesign = () => {
    const { itemsOriginal } = this.state;

    if (isArray(itemsOriginal)) {
      const itemsAdjust = itemsOriginal.map((o) => {
        return {
          ...getInitializeItem(),
          ...o,
        };
      });

      this.setState({
        general: getInitializeGeneral(),
        items: [...itemsAdjust],
      });
    } else {
      this.setState({ general: getInitializeGeneral(), items: [] });
    }
  };

  renderPrintContent = () => {
    return this.componentRef;
  };

  render() {
    const {
      showRemark,
      values,
      style,
      color,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
      signetStyle,
      showTitle,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      allApproveProcessList,
      remarkTitle,
      remarkName,
      remarkList,
      showQRCode,
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      showSerialNumber,
      serialNumberTitle,
      serialNumberContent,
    } = {
      ...defaultProperties,
      ...this.props,
    };
    const { general, items } = this.state;

    const p = {
      showRemark,
      values,
      general,
      items,
      style,
      color,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
      signetStyle,
      showTitle,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      allApproveProcessList,
      remarkTitle,
      remarkName,
      remarkList,
      showQRCode,
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      showSerialNumber,
      serialNumberTitle,
      serialNumberContent,
      onGeneralChange: this.onGeneralChange,
      onItemsChange: this.onItemsChange,
    };

    return (
      <>
        <View>
          <View>
            <View ref={this.imageTargetRef}>
              <DocumentContent ref={this.setComponentRef} {...p} />
            </View>
          </View>

          <Line transparent height={10} />
        </View>
      </>
    );
  }
}

DocumentPrintDesigner.defaultProps = {
  ...defaultProperties,
};

export { DocumentPrintDesigner };
