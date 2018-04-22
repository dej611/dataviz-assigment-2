import React, {PureComponent} from 'react';

import DotPlot from '../components/DotPlot';
import rawData from '../data/ExcelFormattedGISTEMPDataJS';

const seasons = ['DJF', 'MAM', 'JJA', 'SON'];
const seasonLabels = {
    DJF: 'Winter',
    MAM: 'Spring',
    JJA: 'Summer',
    SON: 'Autumn',
};

// create the scaffolding:
const baseData = seasons.map(season => ({
    yAxis: season,
    min: Infinity,
    max: -Infinity,
    minYear: null,
    maxYear: null,
}));

// find the min and max temperatures for each month through the data
rawData.reduce((memo, year) => {
    seasons.forEach((season, i) => {
        if (memo[i].min > year[season]) {
            memo[i].min = year[season];
            memo[i].minYear = year.Year;
        }
        if (memo[i].max < year[season]) {
            memo[i].max = year[season];
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

const convertLabels = label => seasonLabels[label];

const lineAnnotations = baseData.map(d => ({...d, type: 'range'}));

export default class SeasonChart extends PureComponent {
    render() {
        return (
            <DotPlot
                data={data}
                dotRadius={8}
                annotations={lineAnnotations}
                labelFn={convertLabels}
            />
        );
    }
}
