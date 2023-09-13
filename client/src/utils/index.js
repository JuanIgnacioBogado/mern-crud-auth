import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const formatDate = (date, format) => {
  dayjs.extend(utc);

  return dayjs(date).format(format);
};
