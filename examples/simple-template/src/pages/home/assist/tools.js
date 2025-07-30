import { CustomWrapper, View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import { emptyImage, scanCode, transformSize } from 'taro-fast-common';
import {
  buildEmptyPlaceholder,
  CenterBox,
  ColorText,
  Ellipsis,
  FlexBox,
  Grid,
  ImageBox,
  Line,
  MultiLineText,
  SearchBar,
  Space,
  SwiperWrapper,
  Tag,
  VerticalBox,
} from 'taro-fast-component';

import {
  arrowRightGreyImage,
  fieldDataWorkflowCase,
  newMessageImage,
  noDataImage,
  scanCodeBlueImage,
} from '../../../customConfig';

import { boxBorderRadiusStyle, spiteHeight } from './constant';

const gridStyle = {
  backgroundColor: '#fff',
};

const gridBoxStyle = {
  padding: `${transformSize(24)} 0`,
  height: transformSize(120),
  color: 'var(--tfc-color-grey)',
};

const gridImageStyle = {
  width: transformSize(66),
};

const gridNameStyle = {
  width: '100%',
  fontSize: transformSize(32),
  height: transformSize(36),
  lineHeight: transformSize(36),
  textAlign: 'center',
  // marginBottom: transformSize(20),
  marginTop: transformSize(12),
  color: '#333',
};

export function SearchBox({ afterScanCode = null }) {
  return (
    <FlexBox
      flexAuto="left"
      left={
        <SearchBar
          style={{
            backgroundColor: '#fff',
            borderRadius: transformSize(20),
          }}
          circle={false}
          mode="navigate"
          showSearch={false}
          searchStyle={{
            fontSize: transformSize(30),
          }}
        />
      }
      rightStyle={{
        paddingLeft: transformSize(20),
        paddingRight: transformSize(20),
      }}
      right={
        <View
          style={{ width: transformSize(40) }}
          onClick={() => {
            if (!isFunction(afterScanCode)) {
              return;
            }

            scanCode({
              onlyFromCamera: true,
              success: ({
                // eslint-disable-next-line no-unused-vars
                charSet,
                // eslint-disable-next-line no-unused-vars
                path,
                // eslint-disable-next-line no-unused-vars
                rawData,
                // eslint-disable-next-line no-unused-vars
                result,
                // eslint-disable-next-line no-unused-vars
                scanType,
                // eslint-disable-next-line no-unused-vars
                errorMessage,
              }) => {
                afterScanCode(result);
              },
            });
          }}
        >
          <ImageBox src={scanCodeBlueImage} lazyLoad />
        </View>
      }
    />
  );
}

export function GridBox({ list = [], onItemClick = null }) {
  if (!isArray(list) || isEmptyArray(list)) {
    return null;
  }

  return (
    <View
      style={{
        ...boxBorderRadiusStyle,
        ...gridStyle,
      }}
    >
      <CustomWrapper>
        <Grid
          columns={4}
          list={list}
          itemBuilder={({ item }) => {
            const { image, value } = item;

            return (
              <FlexBox
                style={gridBoxStyle}
                flexAuto="top"
                top={
                  <CenterBox>
                    <View style={gridImageStyle}>
                      <ImageBox
                        src={image || emptyImage}
                        // aspectRatio={0.682}
                        // loadingEffect={false}
                        lazyLoad
                      />
                    </View>
                  </CenterBox>
                }
                bottom={<View style={gridNameStyle}>{value}</View>}
              />
            );
          }}
          onClick={(o) => {
            if (!isFunction(onItemClick)) {
              return;
            }

            onItemClick(o);
          }}
        />
      </CustomWrapper>
    </View>
  );
}

export function NoticeBox({ data = '', onClick = null }) {
  const { message, type, id, key } = {
    message: '暂无最新消息',
    type: 'none',
    id: '',
    key: '',
    ...data,
  };

  if (checkStringIsNullOrWhiteSpace(message)) {
    return null;
  }

  const messageAdjust = checkStringIsNullOrWhiteSpace(message)
    ? '暂无最新消息'
    : message;

  return (
    <View
      style={{
        ...boxBorderRadiusStyle,
        backgroundColor: '#fff',
        paddingTop: transformSize(28),
        paddingBottom: transformSize(28),
        paddingLeft: transformSize(32),
        paddingRight: transformSize(32),
        boxShadow: `0px ${transformSize(12)} ${transformSize(32)} 0px rgba(17, 17, 26, 0.1)`,
      }}
      onClick={() => {
        if (!isFunction(onClick)) {
          return;
        }

        onClick({
          message,
          type,
          id,
          key,
        });
      }}
    >
      <FlexBox
        flexAuto="right"
        left={
          <FlexBox
            flexAuto="left"
            left={
              <View style={{ width: transformSize(86) }}>
                <ImageBox src={newMessageImage} />
              </View>
            }
            rightStyle={{
              paddingLeft: transformSize(18),
              paddingRight: transformSize(18),
            }}
            right={
              <VerticalBox>
                <Line direction="vertical" width={4} height={40} />
              </VerticalBox>
            }
          />
        }
        right={
          <FlexBox
            flexAuto="left"
            left={
              <View
                style={{
                  height: transformSize(72),
                  overflow: 'hidden',
                }}
              >
                <VerticalBox>
                  <MultiLineText
                    style={{
                      color: '#7e7e7e',
                      height: '100%',
                    }}
                    fontSize={32}
                    lineHeight={36}
                    text={messageAdjust}
                  />
                </VerticalBox>
              </View>
            }
            right={
              <VerticalBox>
                <View style={{ width: transformSize(40) }}>
                  <ImageBox src={arrowRightGreyImage} />
                </View>
              </VerticalBox>
            }
          />
        }
      />
    </View>
  );
}

export function SwiperBox({ list = [] }) {
  const listData = (isArray(list) ? list : []).map((item) => {
    const { image } = item;

    return {
      image: image,
    };
  });

  if (isEmptyArray(listData)) {
    return null;
  }

  return (
    <View
      style={{
        ...boxBorderRadiusStyle,
        backgroundColor: '#fff',
        paddingTop: transformSize(8),
        paddingBottom: transformSize(2),
      }}
    >
      <CustomWrapper>
        <SwiperWrapper
          scaleMode
          aspectRatio={0.371}
          swiperConfig={{
            previousMargin: transformSize(80),
            nextMargin: transformSize(80),
            easingFunction: 'easeInOutCubic',
            circular: true,
            autoplay: true,
            displayMultipleItems: 1,
          }}
          list={listData}
          itemBuilder={({ item }) => {
            const { image } = item;

            return (
              <ImageBox
                src={image || noDataImage}
                aspectRatio={0.371}
                padding={10}
                loadingEffect={false}
                lazyLoad
              />
            );
          }}
          // customIndicator
          // indicatorBuilder={({ active, index }) => {
          //   return (
          //     <View
          //       key={`indicator_${index}`}
          //       style={{
          //         width: transformSize(24),
          //         height: transformSize(24),
          //         backgroundColor: '#fff',
          //         borderRadius: '50%',
          //         fontSize: transformSize(16),
          //         textAlign: 'center',
          //         lineHeight: transformSize(24),
          //         marginLeft: transformSize(5),
          //         marginRight: transformSize(5),
          //         ...(active
          //           ? {
          //               backgroundColor: '#008bff',
          //               color: '#fff',
          //             }
          //           : {}),
          //       }}
          //     >
          //       {index + 1}
          //     </View>
          //   );
          // }}
        />
      </CustomWrapper>
    </View>
  );
}

export function TitleBox({ title = '', onClick = null }) {
  return (
    <View
      onClick={() => {
        if (!isFunction(onClick)) {
          return;
        }

        onClick();
      }}
    >
      <View
        style={{
          paddingTop: transformSize(20),
          paddingBottom: transformSize(20),
          paddingLeft: transformSize(10),
          paddingRight: transformSize(4),
        }}
      >
        <FlexBox
          flexAuto="right"
          leftStyle={{
            marginRight: transformSize(12),
          }}
          left={
            <VerticalBox>
              <View
                style={{
                  backgroundColor: '#0075fd',
                  width: transformSize(20),
                  height: transformSize(20),
                }}
              ></View>
            </VerticalBox>
          }
          right={
            <FlexBox
              flexAuto="left"
              left={
                <VerticalBox>
                  <View
                    style={{
                      color: '#333',
                      fontSize: transformSize(34),
                      fontWeight: 'bold',
                    }}
                  >
                    {title}
                  </View>
                </VerticalBox>
              }
              right={
                <VerticalBox>
                  <View style={{ width: transformSize(30) }}>
                    <ImageBox src={arrowRightGreyImage} />
                  </View>
                </VerticalBox>
              }
            />
          }
        />
      </View>
    </View>
  );
}

function WaitApproveFlowCaseItem({ data, onClick = null }) {
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
      <View
        style={{
          color: '#181818',
          fontSize: transformSize(30),
          lineHeight: transformSize(38),
          fontWeight: 'bold',
          paddingTop: transformSize(10),
          paddingBottom: transformSize(10),
        }}
      >
        {title}
      </View>

      <Line transparent height={10} />

      <Line color="#f8f8f8" height={2} />

      <Line transparent height={20} />

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <>
          <View
            style={{
              color: '#818181',
              fontSize: transformSize(28),
              lineHeight: transformSize(34),
              paddingBottom: transformSize(10),
            }}
          >
            {description}
          </View>

          <Line transparent height={10} />
        </>
      )}

      <FlexBox
        flexAuto="left"
        left={
          <View>
            <ColorText
              color="#7d7d7d"
              fontSize={30}
              textPrefixStyle={
                {
                  // fontWeight: 'bold',
                }
              }
              textPrefix={userRealName}
              separator=""
              separatorStyle={{
                marginRight: transformSize(14),
              }}
              s
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
    </View>
  );
}

export function WaitApproveBox({ list = [], onItemClick = null }) {
  const hasData = isArray(list) ? (isEmptyArray(list) ? false : true) : false;

  if (!hasData) {
    return buildEmptyPlaceholder({
      description: '暂无待审批项',
    });
  }

  return (
    <CustomWrapper>
      <View>
        <Space direction="vertical" fillWidth size={spiteHeight}>
          {list.map((item) => {
            const { workflowCaseId } = item;

            return (
              <WaitApproveFlowCaseItem
                key={`waitApprove_${workflowCaseId}`}
                data={item}
                onClick={() => {
                  if (!isFunction(onItemClick)) {
                    return;
                  }

                  onItemClick(workflowCaseId);
                }}
              />
            );
          })}
        </Space>
      </View>
    </CustomWrapper>
  );
}

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
                const { name, color } = {
                  name: '',
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

            // <Space align="center">

            // </Space>
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
                  lineHeight: transformSize(38),
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

      <Line transparent height={12} />

      {checkStringIsNullOrWhiteSpace(description) ? null : (
        <>
          <View
            style={{
              color: '#818181',
              fontSize: transformSize(28),
              lineHeight: transformSize(44),
              paddingBottom: transformSize(10),
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
            <ColorText color="#3f3f3f" fontSize={28} text={createTime} />
          </View>
        }
      />
    </View>
  );
}

export function NotificationBox({ list = [], onItemClick = null }) {
  const hasData = isArray(list) ? (isEmptyArray(list) ? false : true) : false;

  if (!hasData) {
    return buildEmptyPlaceholder({
      description: '暂无通知公告',
    });
  }

  return (
    <CustomWrapper>
      <View>
        <Space direction="vertical" fillWidth size={spiteHeight}>
          {list.map((item) => {
            const { id } = item;

            return (
              <NotificationItem
                key={`notification_${id}`}
                data={item}
                onClick={() => {
                  if (!isFunction(onItemClick)) {
                    return;
                  }

                  onItemClick(id);
                }}
              />
            );
          })}
        </Space>
      </View>
    </CustomWrapper>
  );
}
