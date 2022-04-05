import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  transformSize,
  formatDatetime,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
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
  ScrollBox,
  TranslucentBox,
} from 'taro-fast-component/es/customComponents';

export const classPrefix = `simple-news-home`;

const { IconClock } = Icon;

export function buildItem({
  keyPrefix = '',
  renderMode: renderModeSource = '0',
  articles = [],
}) {
  const renderMode = toNumber(renderModeSource);

  if (renderMode === 4) {
    return (
      <ScrollBox
        height={transformSize(243)}
        gap={30}
        list={articles}
        itemBuilder={(item) => {
          const { title, image } = item;

          return (
            <View style={{ width: transformSize(280) }}>
              <ImageBox
                src={image}
                aspectRatio={0.87}
                decorationBuilder={() => {
                  return (
                    <TranslucentBox
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: transformSize(68),
                      }}
                      backgroundColor="#000"
                      alpha={0.5}
                    >
                      <CenterBox>
                        <Ellipsis
                          line={1}
                          style={{
                            color: '#fff',
                            opacity: 1,
                            padding: `${transformSize(13)} ${transformSize(
                              16,
                            )}`,
                          }}
                        >
                          {title}
                        </Ellipsis>
                      </CenterBox>
                    </TranslucentBox>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }

  if (renderMode === 5) {
    if (articles.length === 0) {
      return null;
    }

    const { title, image } = articles[0];

    return (
      <View>
        <ImageBox src={image} aspectRatio={0.582} />

        <Ellipsis
          line={1}
          style={{
            color: '#333',
            padding: `${transformSize(13)} 0`,
            fontSize: transformSize(32),
          }}
        >
          {title}
        </Ellipsis>
      </View>
    );
  }

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

        if (inCollection([3, 1], renderMode)) {
          return (
            <FlexBox
              key={`article_${keyPrefix}_${i}`}
              flexAuto="left"
              left={
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
                      <FlexBox
                        flexAuto="right"
                        leftStyle={{
                          width: transformSize(140),
                          marginLeft: transformSize(20),
                        }}
                        left={
                          <ColorText
                            color="#afb4b5"
                            fontSize={24}
                            text="驻马店日报"
                          />
                        }
                        right={
                          <ColorText
                            color="#afb4b5"
                            fontSize={24}
                            icon={<IconClock size={24} color="#afb4b5" />}
                            text={formatDatetime({
                              data: createTime,
                              fmt: datetimeFormat.yearMonthDay,
                            })}
                          />
                        }
                      />
                    </>
                  }
                />
              }
              rightStyle={{
                paddingLeft: transformSize(28),
              }}
              right={
                <View style={{ width: transformSize(260) }}>
                  <ImageBox src={image} aspectRatio={0.74} />
                </View>
              }
            />
          );
        }

        if (renderMode === 4) {
          return (
            <View style={{ width: transformSize(260) }}>
              <ImageBox src={image} aspectRatio={0.87} />
            </View>
          );
        }
      })}
    </Space>
  );
}
