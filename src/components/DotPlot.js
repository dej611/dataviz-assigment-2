import React, {Component} from 'react';
import {OrdinalFrame} from 'semiotic';

const colors = {
    max: '#d73027',
    min: '#4575b4',
};

export default class DotPlot extends Component {
    static propTypes = {};
    showRangeInfo = d => {
        const label = this.props.labelFn
            ? this.props.labelFn(d.yAxis)
            : d.yAxis;
        const range = this.props.annotations.filter(
            range => range.yAxis === d.yAxis
        )[0];
        const additionalOffset =
            d.data.type === 'min' ? {left: 8} : {left: -430};
        return (
            <div
                style={{
                    ...additionalOffset,
                    position: 'absolute',
                    top: -40,
                    width: 390,
                    background: 'white',
                    border: '1px solid grey',
                    padding: 15,
                }}>
                <p className="title">{label}</p>
                <section>
                    <p>
                        Temperature variance:{' '}
                        <strong>{d.data.value / 100} ℃</strong>
                    </p>
                    <p>
                        Registered in <strong>{d.data.year}</strong>
                    </p>
                    <p>
                        The temperature change (max - min) for {label} is{' '}
                        <strong>{(range.max - range.min) / 100} ℃</strong>
                    </p>
                </section>
            </div>
        );
    };

    drawRange = ({d, rScale, orFrameState}) => {
        if (d.type === 'range') {
            const start = rScale(d.min) + this.props.dotRadius;
            const end = rScale(d.max) - this.props.dotRadius;
            const y = orFrameState.projectedColumns[d.yAxis].middle;
            return (
                <line
                    key={d.yAxis}
                    x1={start}
                    x2={end}
                    y1={y}
                    y2={y}
                    style={{stroke: 'grey', strokeWidth: 2}}
                />
            );
        }
        return null;
    };
    render() {
        const {annotations, data, dotRadius, labelFn} = this.props;
        return (
            <OrdinalFrame
                title={'World temperatures since 1880 to 2015'}
                size={[1200, 500]}
                data={data}
                rAccessor={d => d.value}
                oAccessor={d => d.yAxis}
                style={d => ({
                    fill: colors[d.type],
                    stroke: 'grey',
                    strokeWidth: 1,
                })}
                type={{type: 'point', r: dotRadius}}
                projection={'horizontal'}
                axis={{
                    orient: 'bottom',
                    ticks: 10,
                    tickFormat: d => `${d / 100} ℃`,
                }}
                margin={{left: 200, top: 50, bottom: 40, right: 200}}
                oPadding={10}
                svgAnnotationRules={this.drawRange}
                pieceHoverAnnotation={true}
                tooltipContent={this.showRangeInfo}
                annotations={annotations}
                oLabel={d => (
                    <text
                        style={{textAnchor: 'end'}}
                        transform="translate(-10,6)">
                        {labelFn ? labelFn(d) : d}
                    </text>
                )}
            />
        );
    }
}
