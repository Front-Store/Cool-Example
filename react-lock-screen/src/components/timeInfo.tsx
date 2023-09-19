import React from "react";
import Moment from 'moment';
Moment.locale('zh-cn');
interface IInfoProps {
  id?: string;
}

const Time: React.FC = () => {
  const date: Date = useCurrentDateEffect();
  return (
    <span className="time-group">
      <span className="time"> {Moment().format('dddd')}&nbsp;&nbsp;{Moment(date).format('LT')}</span>
    </span>
  )
}

const useCurrentDateEffect = (): Date => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      const update: Date = new Date();

      if (update.getSeconds() !== date.getSeconds()) {
        setDate(update);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [date]);

  return date;
}

const TimeInfo = (props: IInfoProps) => {
  return (
    <div id={props.id} className="info">
      <Time />
    </div>
  )
}

export default TimeInfo;