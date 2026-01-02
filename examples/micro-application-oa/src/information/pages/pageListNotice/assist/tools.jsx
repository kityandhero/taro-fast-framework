import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isFunction,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  ColorText,
  Ellipsis,
  FlexBox,
  Line,
  Tag,
  VerticalBox,
} from 'taro-fast-component';

export function NotificationItem({ data, onClick = null }) {
  const { id, title, description, createTime, titleColor, read, listTag } = {
    id: '',
    title: '',
    description: '',
    createTime: '',
    titleColor: '',
    read: 0,
    listTag: [],
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
        paddingBottom: transformSize(18),
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
        left={
          !isArray(listTag) || isEmptyArray(listTag) ? null : (
            <VerticalBox>
              {listTag.map((item, index) => {
                const { tagName: name, color } = {
                  tagName: '',
                  color: '',
                  ...item,
                };

                return (
                  <Tag
                    key={`notification_${id}_tag_${index}`}
                    color={color || '#ccc'}
                    fill="outline"
                    style={{
                      marginLeft: transformSize(6),
                      marginRight: transformSize(6),
                    }}
                  >
                    {name}
                  </Tag>
                );
              })}
            </VerticalBox>
          )
        }
        right={
          <FlexBox
            flexAuto="left"
            left={
              <View
                style={{
                  color: titleColor || '#333',
                  fontSize: transformSize(30),
                  lineHeight: transformSize(46),
                  fontWeight: 'bold',
                  paddingTop: transformSize(10),
                  paddingBottom: transformSize(10),
                  width: '100%',
                }}
              >
                {/* {title} */}

                <Ellipsis line={1} width="100%" text={title} />
              </View>
            }
            right={
              <VerticalBox>
                <View
                  style={{
                    backgroundColor:
                      toNumber(read) === whetherNumber.yes
                        ? '#0077ff'
                        : '#fe5b49',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    width: transformSize(14),
                    height: transformSize(14),
                    marginLeft: transformSize(8),
                  }}
                ></View>
              </VerticalBox>
            }
          />
        }
      />

      <Line transparent height={10} />

      <Line color="#f8f8f8" height={2} />

      <Line transparent height={10} />

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <>
          <View
            style={{
              color: '#818181',
              fontSize: transformSize(28),
              lineHeight: transformSize(44),
              paddingBottom: transformSize(6),
            }}
          >
            {description}
          </View>
        </>
      )}

      <FlexBox
        flexAuto="left"
        left={<View></View>}
        right={
          <View>
            <ColorText color="#3f3f3f" fontSize={26} text={createTime} />
          </View>
        }
      />
    </View>
  );
}
