import { BaseComponent } from '../BaseComponent';
import {
  DatetimePicker,
  datetimePickerPositionCollection,
  datetimePickerTypeCollection,
} from '../DatetimePicker';
import { Item } from '../Item';

const defaultProps = {
  afterChange: null,
  arc: false,
  border: true,
  cancelColor: '#888',
  contentStyle: {},
  defaultValue: '',
  description: null,
  disabled: false,
  endYear: 2050,
  extraContainerStyle: {},
  label: '标题',
  okColor: '#5677fc',
  position: datetimePickerPositionCollection.bottom,
  prefix: null,
  startYear: 1970,
  style: {},
  title: null,
  type: datetimePickerTypeCollection.yearMonthDayHourMinuteSecond,
  unitBar: false,
  valueFormat: null,
};

class DatetimeItem extends BaseComponent {
  renderFurther() {
    const {
      afterChange,
      arc,
      border,
      cancelColor,
      contentStyle,
      defaultValue,
      description,
      disabled,
      endYear,
      extraContainerStyle,
      label,
      okColor,
      position,
      prefix,
      startYear,
      style,
      title,
      type,
      unitBar,
      valueFormat,
    } = this.props;

    return (
      <DatetimePicker
        style={{
          width: '100%',
        }}
        afterChange={afterChange}
        arc={arc}
        unitBar={unitBar}
        cancelColor={cancelColor}
        defaultValue={defaultValue}
        disabled={disabled}
        endYear={endYear}
        okColor={okColor}
        position={position}
        startYear={startYear}
        type={type}
        valueFormat={valueFormat}
        viewBuilder={(o) => {
          const { integrityValue } = o;

          return (
            <Item
              arrow={false}
              border={border}
              clickable={false}
              contentStyle={contentStyle}
              description={description}
              disabled={disabled}
              extra={integrityValue}
              extraContainerStyle={{
                ...extraContainerStyle,
              }}
              label={label}
              prefix={prefix}
              style={style}
              title={title}
            />
          );
        }}
      />
    );
  }
}

DatetimeItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { DatetimeItem };
