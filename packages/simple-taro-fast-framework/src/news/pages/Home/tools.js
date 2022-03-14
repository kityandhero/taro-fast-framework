import classNames from 'classnames';
import { View } from '@tarojs/components';

import { transformSize, formatDatetime } from 'taro-fast-common/es/utils/tools';
import { datetimeFormat } from 'taro-fast-common/es/utils/constants';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import {
  CenterBox,
  FlexBox,
  ImageBox,
  Ellipsis,
  Space,
  ColorText,
  Icon,
} from 'taro-fast-component/es/customComponents';

export const classPrefix = `simple-news-home`;

const { IconClock } = Icon;

export function buildItem({
  keyPrefix = '',
  renderMode: renderModeSource = '0',
  articles = [],
}) {
  const renderMode = toNumber(renderModeSource);

  return (
    <Space direction="vertical" fillWidth size={renderMode === 2 ? 28 : 34}>
      {(articles || []).map((o, i) => {
        const { title, description, image, createTime } = o;

        if (renderMode === 2) {
          return (
            <FlexBox
              key={`article_${keyPrefix}_${i}`}
              flexAuto="right"
              left={
                <View
                  className={classNames(`${classPrefix}__dateBoxContainer`)}
                >
                  <CenterBox>
                    <View
                      className={classNames(
                        `${classPrefix}__dateBoxContainer__dateBox`,
                      )}
                    >
                      <FlexBox
                        style={{ width: '100%', height: '100%' }}
                        flexAuto="top"
                        verticalHeight={300}
                        top={
                          <View
                            className={classNames(
                              `${classPrefix}__dateBoxContainer__dateBox__year_month`,
                            )}
                          >
                            {formatDatetime({
                              data: createTime,
                              fmt: datetimeFormat.yearMonth,
                            })}
                          </View>
                        }
                        bottom={
                          <View
                            className={classNames(
                              `${classPrefix}__dateBoxContainer__dateBox__day`,
                            )}
                          >
                            {formatDatetime({
                              data: createTime,
                              fmt: datetimeFormat.day,
                            })}
                          </View>
                        }
                      />
                    </View>
                  </CenterBox>
                </View>
              }
              rightStyle={{
                paddingLeft: transformSize(28),
              }}
              right={
                <FlexBox
                  style={{ width: '100%', height: '100%' }}
                  flexAuto="top"
                  verticalHeight={300}
                  top={
                    <Ellipsis
                      line={2}
                      style={{
                        height: transformSize(100),
                        fontSize: transformSize(36),
                        lineHeight: transformSize(50),
                        color: '#333',
                      }}
                    >
                      {title}
                    </Ellipsis>
                  }
                  bottom={
                    <Ellipsis
                      line={2}
                      style={{
                        height: transformSize(68),
                        fontSize: transformSize(28),
                        lineHeight: transformSize(34),
                        color: '#afb4b5',
                      }}
                    >
                      {description}
                    </Ellipsis>
                  }
                />
              }
            />
          );
        }

        if (renderMode === 3) {
          return (
            <FlexBox
              key={`article_${keyPrefix}_${i}`}
              flexAuto="right"
              left={
                <View style={{ width: transformSize(260) }}>
                  <ImageBox src={image} aspectRatio={0.84} />
                </View>
              }
              rightStyle={{
                paddingLeft: transformSize(28),
              }}
              right={
                <FlexBox
                  style={{ width: '100%', height: '100%' }}
                  flexAuto="top"
                  verticalHeight={300}
                  top={
                    <Ellipsis
                      line={2}
                      style={{
                        height: transformSize(100),
                        fontSize: transformSize(36),
                        lineHeight: transformSize(50),
                        color: '#333',
                      }}
                    >
                      {title}
                    </Ellipsis>
                  }
                  bottom={
                    <>
                      <Ellipsis
                        line={1}
                        style={{
                          color: '#afb4b5',
                          marginBottom: transformSize(14),
                        }}
                      >
                        {description}
                      </Ellipsis>

                      <ColorText
                        color="#afb4b5"
                        fontSize={24}
                        icon={<IconClock size={24} color="#afb4b5" />}
                        text={formatDatetime({
                          data: createTime,
                          fmt: datetimeFormat.yearMonthDay,
                        })}
                      />
                    </>
                  }
                />
              }
            />
          );
        }
      })}
    </Space>
  );
}
