import React, {Component} from 'react';
import {OrdinalFrame} from 'semiotic';

import rawData from './data/ExcelFormattedGISTEMPDataJS';
import {histogram, scaleLinear} from 'd3';

const bucketColors = [
    '#d73027',
    '#fc8d59',
    '#fee090',
    '#e0f3f8',
    '#91bfdb',
    '#4575b4',
];

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

// for each month create N buckets (bucketColors * 2) for the temperatures
const xs = months.map( month => {
    return scaleLinear().domain([-100, 100]).range([0, 2 * bucketColors.length]);
});

const histograms = xs.map( x => histogram().domain(x.domain()));

const buckets = histograms.map( (histo, i) => {
    const month = months[i];
    // for each year pick the month value
    const monthValues = rawData.map( year => year[month] );
    return histo(monthValues).map( bucket => ({type: 'month', number: monthValues}));
});

console.log(buckets);

const vizzers = [
    {type: 'journalist', writeviz: 1, number: 9},
    {type: 'journalist', writeviz: 0.95, number: 9},
    {type: 'journalist', writeviz: 0.9, number: 8},
    {type: 'journalist', writeviz: 0.85, number: 8},
    {type: 'journalist', writeviz: 0.8, number: 8},
    {type: 'journalist', writeviz: 0.75, number: 7},
    {type: 'journalist', writeviz: 0.7, number: 7},
    {type: 'journalist', writeviz: 0.65, number: 6},
    {type: 'journalist', writeviz: 0.6, number: 5},
    {type: 'journalist', writeviz: 0.55, number: 5},
    {type: 'journalist', writeviz: 0.45, number: 4},
    {type: 'journalist', writeviz: 0.4, number: 3},
    {type: 'journalist', writeviz: 0.35, number: 3},
    {type: 'journalist', writeviz: 0.3, number: 2},
    {type: 'journalist', writeviz: 0.25, number: 1},
    {type: 'viz', writeviz: 0.25, number: 1},
    {type: 'journalist', writeviz: 0.2, number: 2},
    {type: 'journalist', writeviz: 0.15, number: 2},
    {type: 'journalist', writeviz: 0.1, number: 2},
    {type: 'journalist', writeviz: 0.05, number: 1},
    {type: 'journalist', writeviz: 0, number: 1},
    {type: 'none', writeviz: -0.05, number: 0},
    {type: 'journalist', writeviz: -0.1, number: 1},
    {type: 'none', writeviz: -0.15, number: 0},
    {type: 'none', writeviz: -0.2, number: 0},
    {type: 'viz', writeviz: -0.25, number: 1},
    {type: 'none', writeviz: -0.3, number: 0},
    {type: 'viz', writeviz: -0.35, number: 1},
    {type: 'journalist', writeviz: -0.4, number: 1},
    {type: 'journalist', writeviz: -0.45, number: 1},
    {type: 'none', writeviz: -0.5, number: 0},
    {type: 'viz', writeviz: -0.55, number: 1},
    {type: 'none', writeviz: -0.6, number: 0},
    {type: 'viz', writeviz: -0.65, number: 1},
    {type: 'viz', writeviz: -0.7, number: 1},
    {type: 'viz', writeviz: -0.75, number: 2},
    {type: 'viz', writeviz: -0.8, number: 2},
    {type: 'viz', writeviz: -0.85, number: 2},
    {type: 'viz', writeviz: -0.9, number: 2},
    {type: 'viz', writeviz: -0.95, number: 1},
];

const colorHash = {
    viz: 'red',
    journalist: 'green',
    none: 'grey',
};

const rosto =
    'M 9.1224266,3.3361224 C 8.2810363,3.2943324 7.4365263,3.4028924 6.6380563,3.6876824 4.1694463,3.6296224 1.9665163,5.3650424 0.91344627,7.5119024 -1.3227637,11.795842 2.5514463,17.764562 8.1907863,16.545112 11.620097,16.132302 15.547317,14.037072 16.173217,10.334172 16.380807,6.5289124 12.768497,3.5172224 9.1224266,3.3361224 Z M 9.3528966,19.855652 C 8.8890366,19.840732 8.4082066,19.917662 7.9173563,20.105652 5.1205063,21.551132 3.7183663,24.679342 2.7943063,27.543152 2.3207563,29.861872 0.86862627,32.037502 1.3646163,34.488462 1.6304963,37.604102 8.0443063,38.953312 8.0443063,38.953312 8.0443063,38.953312 14.670637,39.650602 16.495477,36.334172 17.161197,31.945522 16.344137,27.232262 14.009147,23.424012 13.065617,21.690222 11.362967,19.920312 9.3528966,19.855652 Z';

export default class Histogram extends Component {
    render() {
        const {month} = this.props;
        return (
            <OrdinalFrame
                size={[300, 150]}
                data={buckets[0]}
                axis={{orient: 'bottom', tickFormat: d => `${d / 100} ℃`}}
                type={{
                    type: 'bar',
                    color: d => { console.log(d); return 'blue'},
                    iconPadding: 2,
                    resize: 'fixed',
                }}
                projection="vertical"
                oAccessor={'writeviz'}
                sortO={(a, b) => parseFloat(a) - parseFloat(b)}
                rAccessor={'number'}
                style={(d, i) => ({
                    fill: 'blue',
                    stroke: 'blue',
                    fillOpacity: 1,
                    strokeWidth: 1.5,
                })}
                margin={{bottom: 100, left: 10, right: 80}}
                oPadding={2}
                hoverAnnotation={true}
            />
        );
    }
}
