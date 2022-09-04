import dayjs from 'dayjs'

// TODO: remove if not required UTC date and custom input string
const utc = require('dayjs/plugin/utc')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
dayjs.extend(utc)

export const formatDate = (timestamp: number) => {
  // TODO: add parsing/formatting options:
  // https://day.js.org/docs/en/display/format
  return {
    date: dayjs.unix(timestamp).format('MMM D, YYYY'),
    //valid datetime attribute format
    datetime: dayjs.unix(timestamp).format('YYYY-MM-DD'),
  }
}
export const formatTime = (timestamp: number) => {
  return {
    time: dayjs.unix(timestamp).format('h:mm A'),
    //valid datetime attribute format
    datetime: dayjs.unix(timestamp).format('HH:mm'),
  }
}
