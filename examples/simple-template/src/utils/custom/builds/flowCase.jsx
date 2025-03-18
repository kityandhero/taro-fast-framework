import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isFunction,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Avatar,
  Button,
  ColorText,
  FlexBox,
  Line,
  Tag,
} from 'taro-fast-component';

import { fieldDataWorkflowCase, userGreyImage } from '../../../customConfig';

const commonBoxStyle = {
  backgroundColor: '#fff',
  // borderWidth: transformSize(1),
  // borderRadius: transformSize(16),
  overflow: 'hidden',
  paddingTop: transformSize(12),
  paddingLeft: transformSize(16),
  paddingRight: transformSize(16),
  paddingBottom: transformSize(18),
  marginBottom: transformSize(10),
};

const createApproveItemBoxStyle = {
  ...commonBoxStyle,
};

const waitApproveItemBoxStyle = {
  ...commonBoxStyle,
};

const latestApproveItemBoxStyle = {
  ...commonBoxStyle,
};

const titleStyle = {
  color: '#181818',
  fontSize: transformSize(32),
  lineHeight: transformSize(46),
  fontWeight: 'bold',
  paddingTop: transformSize(12),
  paddingBottom: transformSize(12),
};

const descriptionStyle = {
  color: '#7e7e7e',
  fontSize: transformSize(30),
  lineHeight: transformSize(42),
  paddingBottom: transformSize(10),
};

export function buildCreateApproveItem({ key, data, onClick }) {
  const title = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.title.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const description = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.description.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userAvatar = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.userAvatar.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userRealName = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.userRealName.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const statusNote = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.statusNote.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const lastSubmitApprovalTime = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.lastSubmitApprovalTime.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  return (
    <View key={key} style={createApproveItemBoxStyle} onClick={onClick}>
      <View style={titleStyle}>{title}</View>

      <Line transparent height={10} />

      <Line color="#eee" height={2} />

      <Line transparent height={20} />

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <>
          <View style={descriptionStyle}>{description}</View>

          <Line transparent height={10} />
        </>
      )}

      <FlexBox
        style={{ width: '100%' }}
        flexAuto="right"
        leftStyle={{
          marginRight: transformSize(12),
        }}
        left={<Avatar circle size={40} image={userAvatar || userGreyImage} />}
        right={
          <FlexBox
            flexAuto="left"
            left={
              <View>
                <ColorText
                  color="#7d7d7d"
                  fontSize={30}
                  textPrefixStyle={{
                    fontWeight: 'bold',
                  }}
                  textPrefix={userRealName}
                  separator=""
                  separatorStyle={{
                    marginRight: transformSize(14),
                  }}
                  text={lastSubmitApprovalTime}
                />
              </View>
            }
            right={
              <Tag color="#71bcea" fill="outline">
                {statusNote}
              </Tag>
            }
          />
        }
      />
    </View>
  );
}

export function buildLatestApproveItem({ key, data, onClick }) {
  const title = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.title.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const description = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.description.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userAvatar = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.userAvatar.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userRealName = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.userRealName.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const statusNote = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.statusNote.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const lastSubmitApprovalTime = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.lastSubmitApprovalTime.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  return (
    <View
      key={key}
      style={latestApproveItemBoxStyle}
      onClick={(event) => {
        if (!isFunction(onClick)) {
          return;
        }

        onClick(event);
      }}
    >
      <View style={titleStyle}>{title}</View>

      <Line transparent height={10} />

      <Line color="#eee" height={2} />

      <Line transparent height={20} />

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <>
          <View style={descriptionStyle}>{description}</View>

          <Line transparent height={10} />
        </>
      )}

      <FlexBox
        style={{ width: '100%' }}
        flexAuto="right"
        leftStyle={{
          marginRight: transformSize(12),
        }}
        left={<Avatar circle size={42} image={userAvatar || userGreyImage} />}
        right={
          <FlexBox
            flexAuto="left"
            left={
              <View>
                <ColorText
                  color="#7d7d7d"
                  fontSize={30}
                  textPrefixStyle={{
                    fontWeight: 'bold',
                  }}
                  textPrefix={userRealName}
                  separator=""
                  separatorStyle={{
                    marginRight: transformSize(14),
                  }}
                  text={lastSubmitApprovalTime}
                />
              </View>
            }
            right={
              <Tag color="#71bcea" fill="outline">
                {statusNote}
              </Tag>
            }
          />
        }
      />
    </View>
  );
}

export function buildWaitApproveItem({ key, data, onClick }) {
  const title = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.title.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const description = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.description.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userAvatar = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.userAvatar.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userRealName = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.userRealName.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const statusNote = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.statusNote.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const lastSubmitApprovalTime = getValueByKey({
    data: data,
    key: fieldDataWorkflowCase.lastSubmitApprovalTime.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  return (
    <View key={key} style={waitApproveItemBoxStyle}>
      <FlexBox
        style={{ width: '100%' }}
        flexAuto="left"
        left={
          <FlexBox
            style={{ width: '100%' }}
            flexAuto="right"
            leftStyle={{
              marginRight: transformSize(24),
            }}
            left={
              <Avatar circle size="small" image={userAvatar || userGreyImage} />
            }
            right={
              <FlexBox
                flexAuto="left"
                left={
                  <FlexBox
                    flexAuto="bottom"
                    style={{
                      height: '100%',
                    }}
                    top={
                      <View
                        style={{
                          height: transformSize(34),
                          paddingBottom: transformSize(2),
                        }}
                      >
                        <ColorText
                          color="#181818"
                          fontSize={30}
                          style={{
                            fontWeight: 'bold',
                          }}
                          text={userRealName}
                        />
                      </View>
                    }
                    bottom={
                      <ColorText
                        color="#666"
                        fontSize={28}
                        text={lastSubmitApprovalTime}
                      />
                    }
                  />
                }
                right={
                  <Tag color="#71bcea" fill="outline">
                    {statusNote}
                  </Tag>
                }
              />
            }
          />
        }
        right={
          null

          // <View
          //   style={{
          //     width: transformSize(44),
          //   }}
          // >
          //   <ImageBox src={ellipsisVerticalImage} />
          // </View>
        }
      />

      <Line transparent height={20} />

      <Line color="#eee" height={2} />

      <Line transparent height={10} />

      <View style={titleStyle}>{title}</View>

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <View style={descriptionStyle}>{description}</View>
      )}

      <Line transparent height={10} />

      <Button
        weappButton
        text="去处理"
        fontColor="#fff"
        backgroundColor="#0075ff"
        fontSize={34}
        block
        circle
        size="middle"
        onClick={(event) => {
          if (!isFunction(onClick)) {
            return;
          }

          onClick(event);
        }}
      />

      <Line transparent height={10} />
    </View>
  );
}
