import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isFunction,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import {
  flexDirectionCollection,
  flexJustifyCollection,
  makePhoneCall,
  transformSize,
} from 'taro-fast-common';
import {
  Avatar,
  Col,
  ColorText,
  FlexBox,
  ImageBox,
  Row,
  VerticalBox,
} from 'taro-fast-component';

import { telImage, userGreyImage } from '../../../../customConfig';

export function LetterBox({ data, onItemClick = null }) {
  const { letter, list } = data;

  if (!isArray(list) || isEmptyArray(list)) {
    return null;
  }

  return (
    <View>
      <View
        style={{
          color: '#ccc',
          paddingLeft: transformSize(16),
          paddingTop: transformSize(8),
          paddingBottom: transformSize(8),
        }}
      >
        {letter}
      </View>

      {list.map((o, index) => {
        return (
          <LetterItem
            key={`letter_${letter}_${index}`}
            data={o}
            onClick={onItemClick}
          />
        );
      })}
    </View>
  );
}

export function LetterItem({ data, onClick = null }) {
  const { avatar, friendlyName, position, phone } = {
    avatar: '',
    friendlyName: '',
    position: '',
    phone: '',
    ...data,
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderWidth: transformSize(1),
        borderRadius: transformSize(16),
        overflow: 'hidden',
        paddingTop: transformSize(12),
        paddingLeft: transformSize(16),
        paddingRight: transformSize(16),
        paddingBottom: transformSize(16),
      }}
      onClick={() => {
        if (!isFunction(onClick)) {
          return;
        }

        onClick();
      }}
    >
      <FlexBox
        flexAuto="right"
        leftStyle={{ marginRight: transformSize(26) }}
        left={
          <View>
            <Avatar circle size={74} image={avatar || userGreyImage} />
          </View>
        }
        right={
          <FlexBox
            flexAuto="left"
            left={
              <View
                style={{
                  paddingTop: transformSize(5),
                  paddingBottom: transformSize(5),
                }}
              >
                <Row
                  direction={flexDirectionCollection.column}
                  justify={flexJustifyCollection.between}
                >
                  <Col
                    style={{
                      paddingRight: transformSize(10),
                      paddingTop: transformSize(5),
                      paddingBottom: transformSize(2),
                    }}
                  >
                    <ColorText
                      color="#080808"
                      fontSize={30}
                      text={friendlyName}
                    />
                  </Col>

                  <Col>
                    <FlexBox
                      flexAuto="right"
                      left={
                        <View
                          style={{
                            // backgroundColor: '#ecf4ff',
                            paddingRight: transformSize(16),
                            paddingTop: transformSize(2),
                            paddingBottom: transformSize(5),
                          }}
                        >
                          <ColorText
                            color="#ccc"
                            fontSize={30}
                            text={position || '职位未设置'}
                          />
                        </View>
                      }
                      right={<View />}
                    />
                  </Col>
                </Row>
              </View>
            }
            right={
              <VerticalBox>
                <View
                  style={{
                    width: transformSize(72),
                  }}
                  onClick={() => {
                    if (checkStringIsNullOrWhiteSpace(phone)) {
                      showSimpleWarningMessage('电话信息未找到');

                      return;
                    }

                    makePhoneCall(phone);
                  }}
                >
                  <ImageBox src={telImage} lazyLoad />
                </View>
              </VerticalBox>
            }
          />
        }
      />
    </View>
  );
}
