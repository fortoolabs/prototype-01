import * as dayjs from 'dayjs'

// TODO: remove if not required UTC date and custom input string
const utc = require("dayjs/plugin/utc");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
dayjs.extend(utc);



export const formatDate = (timestamp) => {
	// TODO: add parsing/formatting options:
	// https://day.js.org/docs/en/display/format
	return dayjs(timestamp).format('MMM D, YYYY')
}
