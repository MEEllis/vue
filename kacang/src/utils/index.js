import moment from 'moment';


function dateFormat(date) {
  if (date) {
    if (moment.isMoment(date)) {
      return date.format('YYYY-MM-DD HH:mm:ss');
    }
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
}
export default {};

export { dateFormat };
