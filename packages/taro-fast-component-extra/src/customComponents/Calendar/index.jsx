import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  generateNumberCollection,
  getMonthDay,
  getWeekday,
  isArray,
  isEmptyArray,
  isString,
  showWarningMessage,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  BaseComponent,
  CenterBox,
  Col,
  ColorText,
  IconChevronLeft,
  IconChevronRight,
  Line,
  Row,
  VerticalBox,
} from 'taro-fast-component';

import {
  calendarMaxYear,
  calendarMinYear,
  calendarSelectModeCollection,
} from './constant';
import {
  adjustCalendarMinYearAndMaxYear,
  adjustCalendarSelectMode,
  adjustDate,
  getDayConfigCollection,
  getItemConfig,
  judgeDisabled,
} from './tools';

const primaryCallName = 'customComponents::Calendar';

const arrowStyle = {
  backgroundColor: '#999',
  borderRadius: '50%',
  height: transformSize(30),
  marginLeft: transformSize(10),
  marginRight: transformSize(10),
  overflow: 'hidden',
  width: transformSize(30),
};

const dataBarStyle = {
  backgroundColor: '#fff',
  boxShadow: `0 ${transformSize(10)} ${transformSize(20)} ${transformSize(-10)} #efefef`,
  marginBottom: transformSize(12),
  marginTop: transformSize(6),
  height: transformSize(50),
};

const dataBarTitleStyle = {
  paddingBottom: transformSize(0),
  paddingLeft: transformSize(24),
  paddingRight: transformSize(24),
  paddingTop: transformSize(0),
  width: '14.2857%',
};

const dataBoxStyle = {
  width: '14.2857%',
};

const dataBoxInnerStyle = {
  backgroundColor: 'transparent',
  paddingBottom: transformSize(24),
  paddingLeft: transformSize(4),
  paddingRight: transformSize(4),
  paddingTop: transformSize(24),
};

const dataBoxInnerDisabledStyle = {
  opacity: '0.5',
};

const dataBoxInnerStartStyle = {
  borderBottomLeftRadius: transformSize(8),
  borderTopLeftRadius: transformSize(8),
};

const dataBoxInnerEndStyle = {
  borderBottomRightRadius: transformSize(8),
  borderTopRightRadius: transformSize(8),
};

const dataTitleStyle = {};

const dataDescriptionStyle = {};

const defaultProperties = {
  /**
   * 选择模式（单选 | 范围选择）
   */
  selectMode: calendarSelectModeCollection.single,
  /**
   * 选择日期之后的触发事件
   */
  afterChange: null,
  /**
   * 最大年份（赋值不能小于 2100）
   */
  maxYear: calendarMaxYear,
  /**
   * 最小年份（赋值不能小于 1900）
   */
  minYear: calendarMinYear,
  /**
   * 最小可选日期（赋值不能小于 1900-01-01）
   */
  minSelectableDate: '1900-01-01',
  /**
   * 默认为空，即今天之后的日期不可选（赋值不能大于 1900-01-01）
   */
  maxSelectableDate: '',
  /**
   * 月份切换箭头颜色
   */
  monthArrowColor: '#999999',
  /**
   * 年份切换箭头颜色
   */
  yearArrowColor: '#bcbcbc',
  /**
   * 日期字体颜色
   */
  color: '#333333',
  /**
   * 日期描述字体颜色
   */
  descriptionColor: '#999',
  /**
   * 选中或者起始结束日期字体颜色
   */
  activeColor: '#fff',
  /**
   * 选中或者起始结束日期背景颜色
   */
  activeBackgroundColor: '#5677fc',
  /**
   * 范围内日期字体颜色
   */
  rangeColor: '#5677fc',
  /**
   * 范围内日期背景颜色
   */
  rangeBackgroundColor: 'rgba(86,119,252,0.1)',
  /**
   * 按钮背景色
   */
  buttonBackgroundColor: '#5677fc',
  /**
   * 是否显示描述
   */
  showDescription: true,
  /**
   * 是否显示农历
   */
  showLunar: true,
  /**
   * 当前选中日期带选中效果
   */
  activeCurrentSelect: true,
  /**
   * 默认选中的日期或日期区间
   */
  defaultValue: '',
  adjustDateItem: null,
};

class Calendar extends BaseComponent {
  // showCallTrack = true;

  // showCallTrace = true;

  weekday = 1;

  weekdayCollection = [];

  days = 0;

  dayCollection = [];

  dayConfigCollection = {};

  year = 0;

  month = 0;

  day = 0;

  today = '';

  activeDate = '';

  startYear = 0;

  startMonth = 0;

  startDay = 0;

  startDate = '';

  endYear = 0;

  endMonth = 0;

  endDay = 0;

  endDate = '';

  title = '';

  willSelectStartDate = true;

  constructor(properties) {
    super(properties);

    let now = new Date();

    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.day = now.getDate();
    this.today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    this.initializeData(properties);

    this.state = {
      ...this.state,
    };
  }

  doWorkBeforeUpdate = (nextProperties, nextState) => {
    const { selectMode } = this.getProperties();
    const { selectMode: selectModeNext } = nextProperties;

    this.logFunctionCallTrack(
      {
        nextProperties,
        nextState,
      },
      primaryCallName,
      'doWorkBeforeUpdate',
    );

    this.days = getMonthDay({
      year: this.year,
      month: this.month,
    });

    this.dayCollection = generateNumberCollection(1, this.days);

    this.dayConfigCollection = getDayConfigCollection({
      year: this.year,
      month: this.month,
      dayCollection: this.dayCollection,
    });

    this.weekday = getWeekday({
      year: this.year,
      month: this.month,
    });

    this.weekdayCollection = generateNumberCollection(1, this.weekday);

    this.title = `${this.year}年${this.month}月`;

    if (selectMode !== selectModeNext) {
      this.initializeData(nextProperties);
    }

    // if (this.isChange && this.type == 1) {
    //   this.btnFix(true);
    // }

    // this.log({}, 'doWorkBeforeUpdate');
  };

  /**
   * 初始化数据
   * @param {object} properties properties
   */
  initializeData = (properties) => {
    const {
      selectMode: selectModeSource,
      minSelectableDate,
      maxSelectableDate,
      defaultValue,
    } = properties;

    const selectMode = adjustCalendarSelectMode(selectModeSource);

    this.activeDate = this.today;

    this.startYear = 0;

    this.startMonth = 0;

    this.startDay = 0;

    this.startDate = '';

    this.endYear = 0;

    this.endMonth = 0;

    this.endDay = 0;

    this.endDate = '';

    this.title = '';

    this.willSelectStartDate = true;

    this.min = adjustDate(minSelectableDate);
    this.max = adjustDate(maxSelectableDate || this.today);

    if (
      judgeDisabled({
        year: this.year,
        month: this.month,
        day: this.day,
        min: this.min,
        max: this.max,
      })
    ) {
      this.year = this.max.year;
      this.month = this.max.month;
      this.day = this.max.day;
      this.activeDate = `${this.max.year}-${this.max.month}-${this.max.day}`;

      this.max = adjustDate(maxSelectableDate || minSelectableDate);
    }

    this.startYear = 0;
    this.startMonth = 0;
    this.startDay = 0;
    this.startDate = '';

    if (selectMode == calendarSelectModeCollection.single) {
      if (isString(defaultValue)) {
        if (checkStringIsNullOrWhiteSpace(defaultValue)) {
          // do nothing
        } else {
          let start = new Date(this.initStartDate.replaceAll('-', '/'));

          this.year = start.getFullYear();
          this.month = start.getMonth() + 1;
          this.day = start.getDate();
        }
      } else {
        // do nothing
      }
    }

    if (selectMode == calendarSelectModeCollection.range) {
      if (
        !isArray(defaultValue) ||
        isEmptyArray(defaultValue) ||
        defaultValue.length !== 2
      ) {
        // do nothing
      } else {
        const firstData = defaultValue[0];
        const lastData = defaultValue[1];

        let start = new Date(firstData.replaceAll('-', '/'));
        let end = new Date(lastData.replaceAll('-', '/'));

        this.startDate = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
        this.startYear = start.getFullYear();
        this.startMonth = start.getMonth() + 1;
        this.startDay = start.getDate();
        this.activeDate = '';

        this.endDate = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;
        this.endYear = end.getFullYear();
        this.endMonth = end.getMonth() + 1;
        this.endDay = end.getDate();
        this.activeDate = '';
        this.year = end.getFullYear();
        this.month = end.getMonth() + 1;
        this.day = end.getDate();
      }
    }

    this.days = getMonthDay({
      year: this.year,
      month: this.month,
    });

    this.dayCollection = generateNumberCollection(1, this.days);

    this.dayConfigCollection = getDayConfigCollection({
      year: this.year,
      month: this.month,
      dayCollection: this.dayCollection,
    });

    this.weekday = getWeekday({
      year: this.year,
      month: this.month,
    });

    this.weekdayCollection = generateNumberCollection(1, this.weekday);

    this.title = `${this.year}年${this.month}月`;

    this.willSelectStartDate = true;
  };

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  getSelectMode = () => {
    const { selectMode } = this.getProperties();

    return adjustCalendarSelectMode(selectMode);
  };

  getMinYearAndMaxYear = () => {
    const { minYear, maxYear } = this.getProperties();

    return adjustCalendarMinYearAndMaxYear(minYear, maxYear);
  };

  checkRange = (year) => {
    let overstep = false;

    const { minYear, maxYear } = this.getMinYearAndMaxYear();

    if (year < minYear || year > maxYear) {
      showWarningMessage({
        text: '日期超出范围啦~',
      });

      overstep = true;
    }

    return overstep;
  };

  changeMonth = (whetherIncrease) => {
    // this.log(
    //   {
    //     whetherIncrease,
    //   },
    //   'changeMonth',
    // );

    if (whetherIncrease) {
      let month = this.month + 1;
      let year = month > 12 ? this.year + 1 : this.year;

      if (!this.checkRange(year)) {
        this.month = month > 12 ? 1 : month;
        this.year = year;

        // this.changeData();

        this.forceUpdateAdditional();
      }
    } else {
      let month = this.month - 1;
      let year = month < 1 ? this.year - 1 : this.year;

      if (!this.checkRange(year)) {
        this.month = month < 1 ? 12 : month;
        this.year = year;

        // this.changeData();

        this.forceUpdateAdditional();
      }
    }
  };

  changeYear = (whetherIncrease) => {
    let year = whetherIncrease ? this.year + 1 : this.year - 1;

    const checkRange = this.checkRange(year);

    if (!checkRange) {
      this.year = year;

      // this.changeData();

      // this.log(
      //   {
      //     whetherIncrease,
      //     checkRange,
      //   },
      //   'changeYear',
      // );

      this.forceUpdateAdditional();
    }
  };

  // eslint-disable-next-line no-unused-vars
  onDateClick = (day, index) => {
    const selectMode = this.getSelectMode();

    if (
      !judgeDisabled({
        year: this.year,
        month: this.month,
        day,
        min: this.min,
        max: this.max,
      })
    ) {
      this.day = day;

      let date = `${this.year}-${this.month}-${day}`;

      if (selectMode === calendarSelectModeCollection.single) {
        this.activeDate = date;
      } else {
        let compare =
          new Date(date.replaceAll('-', '/')).getTime() <
          new Date(this.startDate.replaceAll('-', '/')).getTime();

        if (this.willSelectStartDate || compare) {
          this.startDate = date;
          this.startYear = this.year;
          this.startMonth = this.month;
          this.startDay = this.day;
          this.endYear = 0;
          this.endMonth = 0;
          this.endDay = 0;
          this.endDate = '';
          this.activeDate = '';
          this.willSelectStartDate = false;
        } else {
          this.endDate = date;
          this.endYear = this.year;
          this.endMonth = this.month;
          this.endDay = this.day;
          this.willSelectStartDate = true;
        }
      }

      this.forceUpdateAdditional();
    }
  };

  renderFurther() {
    const {
      activeBackgroundColor,
      activeColor,
      activeCurrentSelect,
      color,
      descriptionColor,
      monthArrowColor,
      rangeBackgroundColor,
      rangeColor,
      showDescription,
      showLunar,
      style,
      yearArrowColor,
    } = this.getProperties();

    const selectMode = this.getSelectMode();

    return (
      <>
        <View
          style={{
            ...style,
            width: '100%',
          }}
        >
          <View
            style={{
              paddingTop: transformSize(40),
              paddingBottom: transformSize(40),
              paddingLeft: transformSize(40),
              paddingRight: transformSize(40),
              backgroundColor: '#fff',
            }}
          >
            <VerticalBox align="center" alignJustify="center">
              <View
                style={{
                  ...arrowStyle,
                  backgroundColor:
                    yearArrowColor || defaultProperties.yearArrowColor,
                }}
                onClick={() => {
                  this.changeYear(false);
                }}
              >
                <CenterBox>
                  <IconChevronLeft size={22} color="#dfdfbc" />
                </CenterBox>
              </View>

              <View
                style={{
                  ...arrowStyle,
                  backgroundColor:
                    monthArrowColor || defaultProperties.monthArrowColor,
                }}
                onClick={() => {
                  this.changeMonth(false);
                }}
              >
                <CenterBox>
                  <IconChevronLeft size={22} color="#dfdfbc" />
                </CenterBox>
              </View>

              <View>
                <CenterBox>
                  <ColorText
                    style={{
                      paddingLeft: transformSize(20),
                      paddingRight: transformSize(20),
                    }}
                    text={this.title}
                  />
                </CenterBox>
              </View>

              <View
                style={{
                  ...arrowStyle,
                  backgroundColor:
                    monthArrowColor || defaultProperties.monthArrowColor,
                }}
                onClick={() => {
                  this.changeMonth(true);
                }}
              >
                <CenterBox>
                  <IconChevronRight size={22} color="#dfdfbc" />
                </CenterBox>
              </View>

              <View
                style={{
                  ...arrowStyle,
                  backgroundColor:
                    yearArrowColor || defaultProperties.yearArrowColor,
                }}
                onClick={() => {
                  this.changeYear(true);
                }}
              >
                <CenterBox>
                  <IconChevronRight size={22} color="#dfdfbc" />
                </CenterBox>
              </View>
            </VerticalBox>
          </View>

          <Line height={3} color="#efefef" />

          <View style={dataBarStyle}>
            <Row align="center" justify="center">
              <Col style={dataBarTitleStyle}>
                <CenterBox>日</CenterBox>
              </Col>
              <Col style={dataBarTitleStyle}>
                <CenterBox>一</CenterBox>
              </Col>
              <Col style={dataBarTitleStyle}>
                <CenterBox>二</CenterBox>
              </Col>
              <Col style={dataBarTitleStyle}>
                <CenterBox>三</CenterBox>
              </Col>
              <Col style={dataBarTitleStyle}>
                <CenterBox>四</CenterBox>
              </Col>
              <Col style={dataBarTitleStyle}>
                <CenterBox>五</CenterBox>
              </Col>
              <Col style={dataBarTitleStyle}>
                <CenterBox>六</CenterBox>
              </Col>
            </Row>
          </View>

          <Row align="center" justify="start" wrap>
            {this.weekdayCollection.map((o, index) => {
              return <Col key={`week_${index}`} style={dataBoxStyle}></Col>;
            })}

            {this.dayCollection.map((o, index) => {
              const dayConfigItem = this.dayConfigCollection[o];

              const {
                backgroundColor,
                color: colorItem,
                description,
                descriptionColor: descriptionColorItem,
              } = getItemConfig({
                activeBackgroundColor: activeBackgroundColor,
                activeColor: activeColor,
                activeCurrentSelect: activeCurrentSelect,
                activeDate: this.activeDate,
                color,
                dayConfig: dayConfigItem,
                descriptionColor,
                endDate: this.endDate,
                index,
                month: this.month,
                rangeBackgroundColor: rangeBackgroundColor,
                rangeColor: rangeColor,
                showLunar,
                startDate: this.startDate,
                year: this.year,
              });

              return (
                <Col key={`day_${index}`} style={dataBoxStyle}>
                  <View
                    style={{
                      ...dataBoxInnerStyle,
                      ...(judgeDisabled({
                        year: this.year,
                        month: this.month,
                        day: index + 1,
                        min: this.min,
                        max: this.max,
                      })
                        ? dataBoxInnerDisabledStyle
                        : {}),
                      ...((selectMode === calendarSelectModeCollection.range &&
                        this.startDate ==
                          `${this.year}-${this.month}-${index + 1}`) ||
                      selectMode === calendarSelectModeCollection.single
                        ? dataBoxInnerStartStyle
                        : {}),
                      ...((selectMode === calendarSelectModeCollection.range &&
                        this.endDate ==
                          `${this.year}-${this.month}-${index + 1}`) ||
                      selectMode === calendarSelectModeCollection.single
                        ? dataBoxInnerEndStyle
                        : {}),
                      backgroundColor,
                    }}
                    onClick={() => {
                      this.onDateClick(o, index);
                    }}
                  >
                    <View style={dataTitleStyle}>
                      <CenterBox>
                        <ColorText text={o} color={colorItem} />
                      </CenterBox>
                    </View>

                    {showDescription ? <Line height={4} transparent /> : null}

                    {showDescription ? (
                      <View style={dataDescriptionStyle}>
                        <CenterBox>
                          <ColorText
                            fontSize={22}
                            text={description}
                            color={descriptionColorItem}
                          />
                        </CenterBox>
                      </View>
                    ) : null}
                  </View>
                </Col>
              );
            })}
          </Row>

          {/* <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              fontSize: transformSize(26),
              lineHeight: transformSize(26),
              color: '#555',
              boxShadow: `0 ${transformSize(30)} ${transformSize(40)} ${transformSize(-30)} #efefef`,
              position: 'relative',
              zIndex: 2,
            }}
          ></View> */}
        </View>
      </>
    );
  }
}

Calendar.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProperties,
};

export { Calendar };

export { calendarSelectModeCollection } from './constant';
