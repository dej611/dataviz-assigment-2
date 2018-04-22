import React, {PureComponent} from 'react';

import DotPlot from '../components/DotPlot';
import rawData from '../data/ExcelFormattedGISTEMPDataJS';

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

// create the scaffolding:
const baseData = months.map(month => ({
    yAxis: month,
    min: Infinity,
    max: -Infinity,
    minYear: null,
    maxYear: null,
}));

// find the min and max temperatures for each month through the data
rawData.reduce((memo, year) => {
    months.forEach((month, i) => {
        if (memo[i].min > year[month]) {
            memo[i].min = year[month];
            memo[i].minYear = year.Year;
        }
        if (memo[i].max < year[month]) {
            memo[i].max = year[month];
            memo[i].maxYear = year.Year;
        }
    });
    return memo;
}, baseData);

const data = [
    ...baseData.map(d => ({
        yAxis: d.yAxis,
        type: 'min',
        value: d.min,
        year: d.minYear,
    })),
    ...baseData.map(d => ({
        yAxis: d.yAxis,
        type: 'max',
        value: d.max,
        year: d.maxYear,
    })),
];

const lineAnnotations = baseData.map(d => ({...d, type: 'range'}));

export default class MonthlyChart extends PureComponent {
    render() {
        return (
            <DotPlot data={data} dotRadius={8} annotations={lineAnnotations} />
        );
    }
}
