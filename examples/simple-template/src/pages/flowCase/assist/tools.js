import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  logConsole,
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

import { userGreyImage } from '../../../customConfig';
// import { ellipsisVerticalImage } from '../../../customConfig';
import { fieldData } from '../common/data';

const waitApproveItemBoxStyle = {
  backgroundColor: '#fff',
  borderWidth: transformSize(1),
  borderRadius: transformSize(10),
  overflow: 'hidden',
  padding: transformSize(12),
  paddingLeft: transformSize(16),
  paddingRight: transformSize(16),
  marginBottom: transformSize(10),
};

const latestApproveItemBoxStyle = {
  backgroundColor: '#fff',
  borderWidth: transformSize(1),
  borderRadius: transformSize(10),
  overflow: 'hidden',
  padding: transformSize(12),
  paddingLeft: transformSize(16),
  paddingRight: transformSize(16),
  marginBottom: transformSize(10),
};

const titleStyle = {
  color: '#181818',
  fontSize: transformSize(28),
  lineHeight: transformSize(38),
  fontWeight: 'bold',
  paddingTop: transformSize(10),
  paddingBottom: transformSize(10),
};

const descriptionStyle = {
  color: '#7e7e7e',
  fontSize: transformSize(26),
  lineHeight: transformSize(34),
  paddingBottom: transformSize(10),
};

export function buildLatestApproveItem({ key, data }) {
  const title = getValueByKey({
    data: data,
    key: fieldData.title.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const description = getValueByKey({
    data: data,
    key: fieldData.description.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userAvatar = getValueByKey({
    data: data,
    key: fieldData.userAvatar.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userRealName = getValueByKey({
    data: data,
    key: fieldData.userRealName.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const statusNote = getValueByKey({
    data: data,
    key: fieldData.statusNote.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const lastSubmitApprovalTime = getValueByKey({
    data: data,
    key: fieldData.lastSubmitApprovalTime.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  logConsole(description);

  return (
    <View key={key} style={latestApproveItemBoxStyle}>
      <Line transparent height={10} />

      <Line color="#eee" height={2} />

      <Line transparent height={10} />

      <View style={titleStyle}>{title}</View>

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <View style={descriptionStyle}>{description}</View>
      )}

      <Line transparent height={10} />

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
                  fontSize={26}
                  textPrefixStyle={{
                    fontWeight: 'bold',
                  }}
                  textPrefix={userRealName}
                  separator=""
                  separatorStyle={{
                    marginRight: transformSize(14),
                  }}
                  s
                  text={lastSubmitApprovalTime}
                />
              </View>

              // <FlexBox
              //   flexAuto="bottom"
              //   style={{
              //     height: '100%',
              //   }}
              //   top={
              //     <View
              //       style={{
              //         height: transformSize(34),
              //         paddingTop: transformSize(2),
              //       }}
              //     >

              //     </View>
              //   }
              //   bottom={
              //     <ColorText
              //       color="#666"
              //       fontSize={24}
              //       text={lastSubmitApprovalTime}
              //     />
              //   }
              // />
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

export function buildWaitApproveItem({ key, data }) {
  const title = getValueByKey({
    data: data,
    key: fieldData.title.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const description = getValueByKey({
    data: data,
    key: fieldData.description.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userAvatar = getValueByKey({
    data: data,
    key: fieldData.userAvatar.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const userRealName = getValueByKey({
    data: data,
    key: fieldData.userRealName.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const statusNote = getValueByKey({
    data: data,
    key: fieldData.statusNote.name,
    defaultValue: '',
    convert: convertCollection.string,
  });

  const lastSubmitApprovalTime = getValueByKey({
    data: data,
    key: fieldData.lastSubmitApprovalTime.name,
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
                          paddingTop: transformSize(2),
                        }}
                      >
                        <ColorText
                          color="#181818"
                          fontSize={26}
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
                        fontSize={24}
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

      <Line transparent height={10} />

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
        backgroundColor="#0075ff"
        fontSize={32}
        block
        circle
        size="middle"
        // onClick={this.signInWithPhone}
      />

      <Line transparent height={10} />
    </View>
  );
}
