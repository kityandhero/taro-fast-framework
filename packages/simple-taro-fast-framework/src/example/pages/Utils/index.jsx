import {
  formatTarget,
  formatDatetime,
  formatDateInterval,
  formatDateIntervalWithNow,
  copyToClipboard,
  replaceTargetText,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  datetimeFormat,
  formatCollection,
} from 'taro-fast-common/es/utils/constants';
import { Item, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '功能函数',
});

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
          description={[
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
          description={[
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
          header="格式化时间差"
          space={false}
          extra="指定起止时间"
          description={[
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
          description={[
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
          description={[
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
          description={[
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
          description={[
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
          description={[
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
          extra="replaceTargetText"
          description={[
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
          useInnerBox={false}
        >
          <Item
            label="12345678"
            border={false}
            extra={replaceTargetText('12345678', '*****', 2, 2)}
          />
        </SimpleBox>

        <SimpleBox
          header="使用内置像素变量"
          space={false}
          extra="transformSize"
          description={[
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
              text: '1000 ~ 2000 之间,步长为10',
            },
            {
              text: '未在此数值范围之内的将输出px为单位的结,例如 2300px',
            },
            {
              text: '参数为非数字情况, 将按照参数值原样输出',
            },
            {
              text: 'text:使用此函数用以保证双端渲染一致',
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
          description={[
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
