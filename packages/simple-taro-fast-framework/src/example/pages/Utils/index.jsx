import { View } from '@tarojs/components';

import {
  formatTarget,
  formatDatetime,
  formatDateInterval,
  formatDateIntervalWithNow,
  copyToClipboard,
  replaceTargetText,
} from 'taro-fast-common/es/utils/tools';
import {
  datetimeFormat,
  formatCollection,
} from 'taro-fast-common/es/utils/constants';
import { Card, Item, HelpBox } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        align: ['top'],
        alignJustify: ['start'],
      },
    };
  }

  setAlignChecked = (value) => {
    this.setState({
      align: value,
    });
  };

  setAlignJustifyChecked = (value) => {
    this.setState({
      alignJustify: value,
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <Card
          header="时间格式化"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="formatDatetime"
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'formatDatetime({data,fmt})',
                },
                {
                  text: 'data:即将格式化的数据',
                },
                {
                  text: 'fmt:格式化字符串',
                },
              ]}
            />
          }
        >
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.year,
            })}
          >
            {datetimeFormat.year}
          </Item>
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonth,
            })}
          >
            {datetimeFormat.yearMonth}
          </Item>
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonthDay,
            })}
          >
            {datetimeFormat.yearMonthDay}
          </Item>
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonthDayHourMinute,
            })}
          >
            {datetimeFormat.yearMonthDayHourMinute}
          </Item>
          <Item
            border={false}
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonthDayHourMinuteSecond,
            })}
          >
            {datetimeFormat.yearMonthDayHourMinuteSecond}
          </Item>
        </Card>

        <Card
          header="格式化时间差"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="指定起止时间"
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'formatDateInterval(start, end, opts = {})',
                },
                {
                  text: 'start:起始时间',
                },
                {
                  text: 'end:终止时间',
                },
                {
                  text: 'opts:格式化配置',
                },
              ]}
            />
          }
        >
          <Item
            border={false}
            extra={formatDateInterval('2022-01-01', '2022-03-02')}
          >
            2022-01-01 ~ 2022-03-02
          </Item>
        </Card>

        <Card
          header="格式化时间差"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="距当前时间"
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'formatDateIntervalWithNow(time, opts = {})',
                },
                {
                  text: 'time:指定的时间, 需要早于当前时间',
                },
                {
                  text: 'opts:格式化配置',
                },
              ]}
            />
          }
        >
          <Item border={false} extra={formatDateIntervalWithNow('2022-01-22')}>
            2022-01-22
          </Item>
        </Card>

        <Card
          header="百分比格式化"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="formatTarget"
        >
          <Item
            border={false}
            extra={formatTarget({
              target: 0.24,
              format: formatCollection.percentage,
            })}
          >
            0.24
          </Item>
        </Card>
        <Card
          header="货币格式化"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="formatTarget"
        >
          <Item
            border={false}
            extra={formatTarget({
              target: 451.31,
              format: formatCollection.money,
            })}
          >
            451.31
          </Item>
        </Card>

        <Card
          header="中文金额"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="formatTarget"
        >
          <Item
            border={false}
            extra={formatTarget({
              target: 451.31,
              format: formatCollection.chineseMoney,
            })}
          >
            451.31
          </Item>
        </Card>

        <Card
          header="复制到剪贴板"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'copyToClipboard({ text, successCallback = null })',
                },
                {
                  text: 'text:需要复制的数据',
                },
                {
                  text: 'successCallback:复制后的回调函数',
                },
              ]}
            />
          }
        >
          <Item
            border={false}
            extra="点击复制"
            onClick={() => {
              copyToClipboard({
                text: '12345678',
              });
            }}
          >
            12345678
          </Item>
        </Card>

        <Card
          header="替换指定字符串"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra="replaceTargetText"
          footer={
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'replaceTargetText(text,replaceText,beforeKeepNumber,afterKeepNumber)',
                },
                {
                  text: 'text:需要操作的字符串',
                },
                {
                  text: 'replaceText:替换为的字符串',
                },
                {
                  text: 'beforeKeepNumber:首部保留的字符串长度',
                },
                {
                  text: 'afterKeepNumber:尾部保留的字符串长度',
                },
              ]}
            />
          }
        >
          <Item
            border={false}
            extra={replaceTargetText('12345678', '*****', 2, 2)}
          >
            12345678
          </Item>
        </Card>
      </View>
    );
  }
}
