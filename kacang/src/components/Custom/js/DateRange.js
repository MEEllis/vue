import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

function formatValue(value, format) {
  return (value && value.format(format)) || '';
}

export default (opts) => {
  return class DateRange extends React.Component {
    static defaultProps = {
      showTime: false,
      showToday: true,
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
    }

    constructor(props) {
      super(props);
      const value = props.value || props.defaultValue || [];
      if (value[0] && !moment.isMoment(value[0]) || value[1] && !moment.isMoment(value[1])) {
        throw new Error(
          'The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, ' +
          'see: http://u.ant.design/date-picker-value',
        );
      }
      if (!props.showTime) {
        if (value[0]) {
          value[0] = moment(value[0].format('YYYY-MM-DD'));
        }
        if (value[1]) {
          value[1] = moment(value[1].format('YYYY-MM-DD'));
        }
      }
      const minTime = props.minTime || opts.minTime;
      const maxTime = props.maxTime || opts.maxTime;
      this.state = {
        endOpen: false,
        value,
        minTime,
        maxTime,
        reload: false
      };

    }

    disabledStartDate = (startValue) => {
      const { minTime, maxTime } = this.state;
      const endValue = this.state.value[1];
      if (!startValue || !endValue) {
        if (startValue) {
          if (minTime && maxTime) {
            return startValue.valueOf() < minTime.valueOf() || startValue.valueOf() > maxTime.valueOf();
          } else if (minTime) {
            return startValue.valueOf() < minTime.valueOf();
          } else if (maxTime) {
            return startValue.valueOf() > maxTime.valueOf();
          }
        }
        return false;
      }
      if (minTime && maxTime) {
        return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() < minTime.valueOf() || startValue.valueOf() > maxTime.valueOf();
      } else if (minTime) {
        return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() < minTime.valueOf();
      } else if (maxTime) {
        return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() > maxTime.valueOf();
      }
      return startValue.valueOf() >= endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
      const { minTime, maxTime } = this.state;
      const startValue = this.state.value[0];
      if (!endValue || !startValue) {
        if (endValue) {
          if (minTime && maxTime) {
            return endValue.valueOf() < minTime.valueOf() || endValue.valueOf() > maxTime.valueOf();
          } else if (minTime) {
            return endValue.valueOf() < minTime.valueOf();
          } else if (maxTime) {
            return endValue.valueOf() > maxTime.valueOf();
          }
        }
        return false;
      }
      if (minTime && maxTime) {
        return startValue.valueOf() > endValue.valueOf() || endValue.valueOf() < minTime.valueOf() || endValue.valueOf() > maxTime.valueOf();
      } else if (minTime) {
        return startValue.valueOf() > endValue.valueOf() || endValue.valueOf() < minTime.valueOf();
      } else if (maxTime) {
        return startValue.valueOf() > endValue.valueOf() || endValue.valueOf() > maxTime.valueOf();
      }

      return endValue.valueOf() < startValue.valueOf();
    }

    onChange = () => {
      if (this.props.onChange) {
        const { value } = this.state;
        this.props.onChange(this.state.value, [formatValue(value[0], this.props.format), formatValue(value[1], this.props.format)]);
      }
    }
    onStartChange = (value) => {
      this.state.value[0] = value;
      this.setState({ value: this.state.value });
      this.onChange();
    }

    onEndChange = (value) => {
      this.state.value[1] = value;
      this.setState({ value: this.state.value });
      this.onChange();
    }
    componentWillReceiveProps = (nextprops) => {
      this.setState({
        value: nextprops.value || []
      })
    }
    handleStartOpenChange = (open) => {
      if (!open) {
        this.setState({ endOpen: true });
      }
    }

    handleEndOpenChange = (open) => {
      this.setState({ endOpen: open });
    }

    render() {
      const { props } = this;
      const { startValue, endValue, endOpen, value, reset } = this.state;
      const { showTime, startPlaceholder, endPlaceholder, startDefaultValue, endDefaultValue, showToday } = this.props;
      const format = props.format || props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      return (
        <div className="date-range">
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime={showTime}
            showToday={showToday}
            onClick={this.onHandleClick}
            format={format}
            value={value[0]}
            placeholder={startPlaceholder}
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          {/* <span className="ant-calendar-range-picker-separator"> ~ </span> */}
          <DatePicker
            disabledDate={this.disabledEndDate}
            showTime={showTime}
            showToday={showToday}
            format={format}
            value={value[1]}
            placeholder={endPlaceholder}
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
      );
    }
  }
}
