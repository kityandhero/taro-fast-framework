import { View } from '@tarojs/components';

import {
  formatTarget,
  formatDatetime,
  formatDateInterval,
  formatDateIntervalWithNow,
  copyToClipboard,
} from 'taro-fast-common/es/utils/tools';
import {
  datetimeFormat,
  formatCollection,
} from 'taro-fast-common/es/utils/constants';
import { Card, Item } from 'taro-fast-component/es/customComponents';

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
        >
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.year,
            })}
          >
            日期格式化
          </Item>
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonth,
            })}
          >
            日期格式化
          </Item>
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonthDay,
            })}
          >
            日期格式化
          </Item>
          <Item
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonthDayHourMinute,
            })}
          >
            日期格式化
          </Item>
          <Item
            border={false}
            extra={formatDatetime({
              data: new Date(),
              fmt: datetimeFormat.yearMonthDayHourMinuteSecond,
            })}
          >
            日期格式化
          </Item>
        </Card>

        <Card
          header="格式化时间差"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item extra={formatDateInterval('2022-01-01', '2022-03-02')}>
            格式化时间差[指定起止时间]
          </Item>
          <Item extra={formatDateIntervalWithNow('2022-01-01')} border={false}>
            格式化时间差[距当前时间]
          </Item>
        </Card>

        <Card
          header="百分比格式化"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
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
        >
          <Item
            border={false}
            extra="需要复制的内容"
            onClick={() => {
              copyToClipboard('需要复制的内容');
            }}
          >
            复制
          </Item>
        </Card>
      </View>
    );
  }
}
