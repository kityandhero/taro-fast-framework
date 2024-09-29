import React, { PureComponent } from 'react';
import { View } from '@tarojs/components';

import {
  canToNumber,
  checkInCollection,
  filter,
  isArray,
  isEmptyArray,
  toNumber,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  CenterBox,
  ColorText,
  FlexBox,
  ImageBox,
  VerticalBox,
} from 'taro-fast-component';

import { LineApply } from './Items/LineApply';
import { LineApprove } from './Items/LineApprove';
import {
  colorDefault,
  colorStyle,
  documentTitleStyle,
  fontFamilyStyle,
  labelFrontStyle,
  lineStyle,
  valueFrontStyle,
} from './constant';
import { LineItem, LineRemark } from './Items';
import { adjustItemCollection, adjustValueCollection } from './tools';

function transferNodeList(approveList, allApproveProcessList) {
  let nodeList = [];

  const approveListAdjust = isArray(approveList) ? approveList : [];
  const allApproveProcessListAdjust = isArray(allApproveProcessList)
    ? allApproveProcessList
    : [];

  if (isEmptyArray(allApproveProcessListAdjust)) {
    nodeList = [...approveListAdjust];
  } else {
    const approveNodeIdList = approveListAdjust.map((o) => o.nodeId);

    for (const one of allApproveProcessListAdjust) {
      const { nodeId } = {
        nodeId: '',
        ...one,
      };

      if (checkInCollection(approveNodeIdList, nodeId)) {
        const listFilter = filter(approveListAdjust, (item) => {
          const { nodeId: nodeIdItem } = {
            nodeId: '',
            ...item,
          };

          return nodeIdItem === nodeId;
        });

        if (listFilter.length > 0) {
          nodeList.push(listFilter[0]);
        } else {
          nodeList.push(one);
        }
      } else {
        nodeList.push(one);
      }
    }
  }

  const nodeListAdjust = nodeList.map((o) => {
    const { nodeId, title, note, name, signet, time } = {
      title: '',
      note: '',
      name: '',
      signet: '',
      time: '',
      ...o,
    };

    return {
      nodeId,
      title,
      note,
      name,
      signet,
      time,
    };
  });

  return nodeListAdjust;
}

const defaultProperties = {
  showRemark: true,
  showTitle: true,
  general: {},
  items: [],
  values: {},
  style: null,
  borderColor: colorDefault,
  title: '表格标题',
  titleContainerStyle: null,
  titleStyle: null,
  labelColumnWidth: 140,
  labelColumnStyle: null,
  labelContainerStyle: null,
  labelStyle: null,
  signetStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
  onItemsChange: null,
  onGeneralChange: null,
  showApply: false,
  applyList: [],
  showAttention: false,
  attentionList: [],
  approveList: [],
  allApproveProcessList: [],
  remarkTitle: '备注',
  remarkName: 'remark',
  remarkList: [],
  showQRCode: false,
  qRCodeTitle: '防伪二维码:',
  qRCodeDescription: '扫码查看防伪标识',
  qRCodeImage: '',
  qRCodeHeight: 74,
  qRCodeStyle: {},
  showSerialNumber: false,
  serialNumberTitle: '流水号',
  serialNumberContent: '',
};

class DocumentContent extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      currentItem: null,
      currentHighlightMode: '',
    };
  }

  buildFooter = () => {
    const {
      showQRCode,
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      showSerialNumber,
      serialNumberTitle,
      serialNumberContent,
    } = this.props;

    const paddingTop = 8;

    const qRCodeHeightAdjust = canToNumber(qRCodeHeight)
      ? toNumber(qRCodeHeight)
      : defaultProperties.qRCodeHeight;

    if (!showQRCode && !showSerialNumber) {
      return null;
    }

    if (showQRCode && showSerialNumber) {
      return (
        <View
          style={{
            paddingTop: transformSize(paddingTop),
          }}
        >
          <FlexBox
            flexAuto="left"
            style={{ width: '100%' }}
            left={
              <FlexBox
                flexAuto="top"
                top={
                  <View>
                    <ColorText fontSize={24} text={serialNumberTitle} />
                  </View>
                }
                bottom={
                  <View>
                    <ColorText fontSize={24} text={serialNumberContent} />
                  </View>
                }
              />
            }
            right={
              <View
                style={{
                  ...qRCodeStyle,
                  width: transformSize(qRCodeHeightAdjust),
                }}
              >
                <ImageBox src={qRCodeImage} />
              </View>
            }
          />
        </View>
      );
    }

    if (showSerialNumber) {
      return (
        <View
          style={{
            height: transformSize(30),
            paddingTop: transformSize(paddingTop),
          }}
        >
          <VerticalBox fillWidth>
            <FlexBox
              flexAuto="left"
              style={{ width: '100%' }}
              left={<ColorText fontSize={24} text={serialNumberTitle} />}
              right={<ColorText fontSize={24} text={serialNumberContent} />}
            />
          </VerticalBox>
        </View>
      );
    }

    if (showQRCode) {
      return (
        <View
          style={{
            paddingTop: transformSize(paddingTop),
          }}
        >
          <FlexBox
            flexAuto="left"
            style={{ width: '100%' }}
            left={
              <FlexBox
                flexAuto="top"
                top={
                  <View>
                    <ColorText fontSize={24} text={qRCodeTitle} />
                  </View>
                }
                bottom={
                  <View>
                    <ColorText fontSize={24} text={qRCodeDescription} />
                  </View>
                }
              />
            }
            right={
              <View
                style={{
                  ...qRCodeStyle,
                  width: transformSize(qRCodeHeightAdjust),
                }}
              >
                <ImageBox src={qRCodeImage} />
              </View>
            }
          />
        </View>
      );
    }
  };

  render() {
    const {
      showRemark,
      values: valuesSource,
      general,
      items: itemsSource,
      style,
      borderColor,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
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
      signetStyle,
    } = this.props;
    const { currentItem, currentHighlightMode } = this.state;

    const { name: currentName } = { name: '', ...currentItem };

    const values = adjustValueCollection(valuesSource);
    const items = adjustItemCollection(itemsSource);

    const lineAdjustStyle = {
      borderBottom: `${transformSize(1)} solid ${borderColor}`,
      ...lineStyle,
    };

    const labelBoxStyle = {
      paddingTop: transformSize(12),
      paddingBottom: transformSize(12),
      paddingLeft: transformSize(10),
      paddingRight: transformSize(10),
      borderLeft: `${transformSize(1)} solid ${borderColor}`,
      borderRight: `${transformSize(1)} solid ${borderColor}`,
      width: transformSize(labelColumnWidth),
      textAlign: 'center',
      ...labelFrontStyle,
      ...colorStyle,
      ...fontFamilyStyle,
      ...labelColumnStyle,
    };

    const valueBoxStyle = {
      borderRight: `${transformSize(1)} solid ${borderColor}`,
      ...valueFrontStyle,
      ...colorStyle,
      ...fontFamilyStyle,
      ...valueColumnStyle,
    };

    const nodeListAdjust = transferNodeList(approveList, allApproveProcessList);

    const applyListAdjust = (isArray(applyList) ? applyList : []).map((o) => {
      const {
        nodeId,
        title: titleItem,
        note,
        name,
        signet,
        time,
      } = {
        title: '',
        note: '',
        name: '',
        signet: '',
        time: '',
        ...o,
      };

      return {
        nodeId,
        title: titleItem,
        note,
        name,
        signet,
        time,
      };
    });

    const attentionListAdjust = (
      isArray(attentionList) ? attentionList : []
    ).map((o) => {
      const {
        nodeId,
        title: titleItem,
        note,
        name,
        signet,
        time,
      } = {
        title: '',
        note: '',
        name: '',
        signet: '',
        time: '',
        ...o,
      };

      return {
        nodeId,
        title: titleItem,
        note,
        name,
        signet,
        time,
      };
    });

    return (
      <View
        style={{
          paddingBottom: '0',
          margin: '0 auto',
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            ...titleContainerStyle,
            paddingTop: '0',
            paddingBottom: '0',
            position: 'relative',
          }}
        >
          {showTitle ? (
            <CenterBox>
              <View
                style={{
                  textAlign: 'center',
                  ...documentTitleStyle,
                  ...colorStyle,
                  ...fontFamilyStyle,
                  ...titleStyle,
                }}
              >
                {title}
              </View>
            </CenterBox>
          ) : null}
        </View>

        <View
          style={{
            borderTop: `${transformSize(1)} solid ${borderColor}`,
            ...style,
          }}
        >
          {items.map((item) => {
            let itemAdjust;

            if (isArray(item)) {
              if (item.length <= 0) {
                return null;
              } else {
                itemAdjust = item[0];
              }
            } else {
              itemAdjust = item;
            }

            const { key } = itemAdjust;

            return (
              <LineItem
                key={key}
                values={values}
                general={general}
                data={item}
                currentName={currentName}
                highlightMode={currentHighlightMode}
                lineStyle={lineAdjustStyle}
                labelBoxStyle={labelBoxStyle}
                valueBoxStyle={valueBoxStyle}
                labelContainerStyle={labelContainerStyle}
                valueContainerStyle={valueContainerStyle}
                onClick={(o, highlightMode) => {
                  this.onCellClick(o, highlightMode);
                }}
                onChange={this.onItemChange}
              />
            );
          })}

          {showApply &&
          isArray(applyListAdjust) &&
          !isEmptyArray(applyListAdjust)
            ? applyListAdjust.map((o, index) => {
                return (
                  <LineApply
                    key={`attention_item_${index}`}
                    data={o}
                    general={general}
                    currentName={currentName}
                    highlightMode={currentHighlightMode}
                    lineStyle={lineAdjustStyle}
                    labelBoxStyle={labelBoxStyle}
                    valueBoxStyle={valueBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueContainerStyle={valueContainerStyle}
                    signetStyle={signetStyle}
                  />
                );
              })
            : null}

          {showAttention &&
          isArray(attentionListAdjust) &&
          !isEmptyArray(attentionListAdjust)
            ? attentionListAdjust.map((o, index) => {
                return (
                  <LineApprove
                    key={`attention_item_${index}`}
                    data={o}
                    general={general}
                    currentName={currentName}
                    highlightMode={currentHighlightMode}
                    lineStyle={lineAdjustStyle}
                    labelBoxStyle={labelBoxStyle}
                    valueBoxStyle={valueBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueContainerStyle={valueContainerStyle}
                    signetStyle={signetStyle}
                  />
                );
              })
            : null}

          {isArray(nodeListAdjust)
            ? nodeListAdjust.map((o, index) => {
                return (
                  <LineApprove
                    key={`approve_item_${index}`}
                    data={o}
                    general={general}
                    currentName={currentName}
                    highlightMode={currentHighlightMode}
                    lineStyle={lineAdjustStyle}
                    labelBoxStyle={labelBoxStyle}
                    valueBoxStyle={valueBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueContainerStyle={valueContainerStyle}
                    signetStyle={signetStyle}
                  />
                );
              })
            : null}

          {showRemark ? (
            <LineRemark
              title={remarkTitle}
              name={remarkName}
              value={
                isArray(remarkList)
                  ? remarkList.map((o) => toString(o)).join('')
                  : toString(remarkList)
              }
              general={general}
              currentName={currentName}
              highlightMode={currentHighlightMode}
              lineStyle={lineAdjustStyle}
              labelBoxStyle={labelBoxStyle}
              valueBoxStyle={valueBoxStyle}
              labelContainerStyle={labelContainerStyle}
              valueContainerStyle={valueContainerStyle}
            />
          ) : null}
        </View>

        {this.buildFooter()}
      </View>
    );
  }
}

DocumentContent.defaultProps = {
  ...defaultProperties,
};

export { DocumentContent };
