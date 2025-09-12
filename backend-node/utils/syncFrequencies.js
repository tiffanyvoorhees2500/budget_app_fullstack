'use strict';
const { Frequency } = require('../models');

// frequencies fields explained:
// description: human-readable description of the frequency
// interval: number of days between occurrences
//     0 for one-time,
//     1 for daily,
//     7 for weekly, etc.
// day_of_month: 'specific_date' means it occurs on a specific date each month
// week_of_month: null means it doesn't depend on a specific week of the month
// day_of_week: an array holding days of week to occur on (0=Sun, 1=Mon, ..., 6=Sat); null means it doesn't depend on a specific day of the week
// special_day: 'specific_date' means it occurs on a specific date
// callback_func_name: name of the function that handles this frequency type

const frequencies = [
  {
    description: 'One-time',
    interval: 0,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleOneTime',
  },
  {
    description: 'Daily',
    interval: 1,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleDaily',
  },
  {
    description: 'Weekly',
    interval: 7,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleWeekly',
  },
  {
    description: 'Biweekly',
    interval: 14,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleBiweekly',
  },
  {
    description: 'Semimonthly (1st and 15th of each month)',
    interval: null,
    day_of_month: '1,15',
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleSemimonthly',
  },
  {
    description: 'Every weekday (Mon-Fri)',
    interval: null,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [1, 2, 3, 4, 5],
    special_day: null,
    callback_func_name: 'handleWeekdays',
  },
  {
    description: 'Monthly (same date each month)',
    interval: null,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleMonthlyByDate',
  },
  {
    description: 'Monthly (e.g., 2nd Tuesday of each month)',
    interval: null,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleMonthlyByWeekday',
  },
  {
    description: 'Quarterly',
    interval: null,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleQuarterly',
  },
  {
    description: 'Yearly (Same date each year)',
    interval: null,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleYearlyByDate',
  },
  {
    description:
      'Yearly (e.g., 4th Thursday of November each year [Thanksgiving])',
    interval: null,
    day_of_month: null,
    week_of_month: null,
    day_of_week: [],
    special_day: null,
    callback_func_name: 'handleYearlyByWeekday',
  },
];

async function syncFrequencies() {
  for (const freq of frequencies) {
    await Frequency.upsert(freq);
  }
  console.log('Frequencies synchronized successfully.');
}
module.exports = syncFrequencies;
