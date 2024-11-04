import { connect } from 'easy-soft-dva';
import {
  datetimeFormat,
  formatCollection,
  formatDateInterval,
  formatDateIntervalWithNow,
  formatDatetime,
  formatTarget,
  getDayOfWeek,
  getTodayOfWeek,
  replaceWithKeep,
} from 'easy-soft-utility';

import { copyToClipboard, transformSize } from 'taro-fast-common';
import { Item, Space } from 'taro-fast-component';

import { ContentPageBase, SimpleBox } from '../../../customComponents';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '功能函数',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Util',
    name: '功能函数',
    description: '功能函数说明',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="操获/取作时间"
          space={false}
          extra=""
          footer={[
            {
              text: 'getNow()',
            },
            {
              text: 'addHour(datetime,number)',
            },
            {
              text: 'addMinute(datetime,number)',
            },
            {
              text: 'addSecond(datetime,number)',
            },
          ]}
          useInnerBox={false}
        >
          <Item label="获取当前时间" extra="getNow" />
          <Item label="增加指定小时数" extra="addHour" />
          <Item label="增加指定分钟数" extra="addMinute" />
          <Item label="增加指定秒数" extra="addSecond" border={false} />
        </SimpleBox>

        <SimpleBox
          header="时间格式化"
          space={false}
          extra="formatDatetime"
          footer={[
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
          useInnerBox={false}
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
        </SimpleBox>

        <SimpleBox
          header="获取周几"
          space={false}
          extra="getDayOfWeek"
          footer={[
            {
              text: 'getDayOfWeek()',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="getDayOfWeek({data:new Date()})"
            border={false}
            extra={getDayOfWeek({ data: new Date() })}
          />
        </SimpleBox>

        <SimpleBox
          header="获取当前周几"
          space={false}
          extra="getTodayOfWeek"
          footer={[
            {
              text: 'getTodayOfWeek()',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="getTodayOfWeek()"
            border={false}
            extra={getTodayOfWeek()}
          />
        </SimpleBox>

        <SimpleBox
          header="格式化时间差"
          space={false}
          extra="指定起止时间"
          footer={[
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
          useInnerBox={false}
        >
          <Item
            label="2022-01-01 ~ 2022-03-02"
            border={false}
            extra={formatDateInterval('2022-01-01', '2022-03-02')}
          />
        </SimpleBox>

        <SimpleBox
          header="格式化时间差"
          space={false}
          extra="距当前时间"
          footer={[
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
          useInnerBox={false}
        >
          <Item
            label="2022-01-22"
            border={false}
            extra={formatDateIntervalWithNow('2022-01-22')}
          />
        </SimpleBox>

        <SimpleBox
          header="百分比格式化"
          space={false}
          extra="formatTarget"
          footer={[
            {
              text: 'formatTarget({ target, format })',
            },
            {
              text: 'target:需要格式化的数据',
            },
            {
              text: 'format:格式化字符串',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="0.24"
            border={false}
            extra={formatTarget({
              target: 0.24,
              format: formatCollection.percentage,
            })}
          />
        </SimpleBox>

        <SimpleBox
          header="货币格式化"
          space={false}
          extra="formatTarget"
          footer={[
            {
              text: 'formatTarget({ target, format })',
            },
            {
              text: 'target:需要格式化的数据',
            },
            {
              text: 'format:格式化字符串',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="451.31"
            border={false}
            extra={formatTarget({
              target: 451.31,
              format: formatCollection.money,
            })}
          />
        </SimpleBox>

        <SimpleBox
          header="中文金额"
          space={false}
          extra="formatTarget"
          footer={[
            {
              text: 'formatTarget({ target, format })',
            },
            {
              text: 'target:需要格式化的数据',
            },
            {
              text: 'format:格式化字符串',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="451.31"
            border={false}
            extra={formatTarget({
              target: 451.31,
              format: formatCollection.chineseMoney,
            })}
          />
        </SimpleBox>

        <SimpleBox
          header="复制到剪贴板"
          space={false}
          footer={[
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
          useInnerBox={false}
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
        </SimpleBox>

        <SimpleBox
          header="替换指定字符串"
          space={false}
          extra="replaceWithKeep"
          footer={[
            {
              text: 'replaceWithKeep(text,replaceText,beforeKeepNumber,afterKeepNumber)',
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
          useInnerBox={false}
        >
          <Item
            label="12345678"
            border={false}
            extra={replaceWithKeep('12345678', '*****', 2, 2)}
          />
        </SimpleBox>

        <SimpleBox
          header="使用内置像素变量"
          space={false}
          extra="transformSize"
          footer={[
            {
              text: 'transformSize(number)',
            },
            {
              text: 'number:-2000 ~ 2000',
            },
            {
              text: '--tfc-1 ~ --tfc-2000 为内置css变量,小程序环境编译后单位为rpx,H5为rem',
            },
            {
              text: '未在此数值范围之内的将输出px为单位的结,例如 2300px',
            },
            {
              text: '参数为非数字情况, 将按照参数值原样输出',
            },
            {
              text: '使用此函数用以保证双端渲染一致',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="transformSize(1)"
            border={false}
            extra={`执行结果: ${transformSize(1)}`}
          />
        </SimpleBox>

        <SimpleBox
          header="构建渐变色"
          space={false}
          extra="buildLinearGradient"
          footer={[
            {
              text: 'buildLinearGradient(number,color...)',
            },
            {
              text: '用法请参见颜色示例',
            },
          ]}
          useInnerBox={false}
        >
          <Item
            label="buildLinearGradient(45,#39b54a,#8dc63f)"
            border={false}
          />
        </SimpleBox>
      </Space>
    );
  };
}
