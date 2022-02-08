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
import {
  Card,
  Item,
  Space,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Util',
    name: '功能函数',
  };

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

  renderContent = () => {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
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
              label={datetimeFormat.year}
              extra={formatDatetime({
                data: new Date(),
                fmt: datetimeFormat.year,
              })}
            />
            <Item
              label={datetimeFormat.yearMonth}
              extra={formatDatetime({
                data: new Date(),
                fmt: datetimeFormat.yearMonth,
              })}
            />
            <Item
              label={datetimeFormat.yearMonthDay}
              extra={formatDatetime({
                data: new Date(),
                fmt: datetimeFormat.yearMonthDay,
              })}
            />
            <Item
              label={datetimeFormat.yearMonthDayHourMinute}
              extra={formatDatetime({
                data: new Date(),
                fmt: datetimeFormat.yearMonthDayHourMinute,
              })}
            />
            <Item
              label={datetimeFormat.yearMonthDayHourMinuteSecond}
              border={false}
              extra={formatDatetime({
                data: new Date(),
                fmt: datetimeFormat.yearMonthDayHourMinuteSecond,
              })}
            />
            <Item
              label="YYYY年MM月DD日"
              border={false}
              extra={formatDatetime({
                data: new Date(),
                fmt: 'YYYY年MM月DD日',
              })}
            />
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
              label="2022-01-01 ~ 2022-03-02"
              border={false}
              extra={formatDateInterval('2022-01-01', '2022-03-02')}
            />
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
            <Item
              label="2022-01-22"
              border={false}
              extra={formatDateIntervalWithNow('2022-01-22')}
            />
          </Card>

          <Card
            header="百分比格式化"
            style={style}
            headerStyle={cardHeaderStyle}
            space={false}
            extra="formatTarget"
          >
            <Item
              label="0.24"
              border={false}
              extra={formatTarget({
                target: 0.24,
                format: formatCollection.percentage,
              })}
            />
          </Card>

          <Card
            header="货币格式化"
            style={style}
            headerStyle={cardHeaderStyle}
            space={false}
            extra="formatTarget"
          >
            <Item
              label="451.31"
              border={false}
              extra={formatTarget({
                target: 451.31,
                format: formatCollection.money,
              })}
            />
          </Card>

          <Card
            header="中文金额"
            style={style}
            headerStyle={cardHeaderStyle}
            space={false}
            extra="formatTarget"
          >
            <Item
              label="451.31"
              border={false}
              extra={formatTarget({
                target: 451.31,
                format: formatCollection.chineseMoney,
              })}
            />
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
              label="12345678"
              border={false}
              extra="点击复制"
              onClick={() => {
                copyToClipboard({
                  text: '12345678',
                });
              }}
            />
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
              label="12345678"
              border={false}
              extra={replaceTargetText('12345678', '*****', 2, 2)}
            />
          </Card>
        </Space>
      </View>
    );
  };
}
