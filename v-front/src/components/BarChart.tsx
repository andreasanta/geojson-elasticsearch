import React, { FunctionComponent} from 'react';
import { RadialChart, FlexibleXYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { useSelector } from '../store';
import FullWidthLoading from './FullWidthLoading';

interface LocalProperties {
    selector: string;
    title: string;
}

const myData = [{angle: 12, label:"Bug"}, {angle: 5, label:"Beg"}, {angle: 2, label:"Bog"}]

const myDataBar = [
    {x: 'A', y: 10},
    {x: 'B', y: 5},
    {x: 'C', y: 15}
];

const myDataLine = [
    {x: 1, y: 10},
    {x: 2, y: 5},
    {x: 3, y: 15}
];

const BarChart : FunctionComponent<LocalProperties> = ({selector, title}) => {

    const data = useSelector((s) => s[selector])

    if (data === undefined)
        return <FullWidthLoading />

    let cnt = 0;
    const parsedData = data.map((o : any) => {
        return { y: o.doc_count, x: o.key, width: .8, label: o.key}
    });

    console.log('material data', parsedData);

    /*
    <RadialChart
                data={parsedData}
                width={300}
                height={300}
                showLabels={true}
                labelsRadiusMultiplier={.8}
                labelsStyle={{
                    fontSize: '20px'
                }} />*/
    return (
        <div className="chartContainer">
            <h2>{title}</h2>
            <div className="chartDetail">
                <FlexibleXYPlot
                    height={300}
                    width={350}
                    xType="ordinal"
                    color="rgb(221, 178, 124)"
                >
                    <HorizontalGridLines />
                    <XAxis style={{
                            ticks: {stroke: 'none'},
                            text: {stroke: 'none', fill: '#fff', fontWeight: 600, fontSize:'10px'}}} />
                    <YAxis style={{
                            ticks: {stroke: '#fff'},
                            text: {stroke: 'none', fill: '#fff', fontWeight: 600}}} />
                    <VerticalBarSeries
                        data={parsedData}
                        barWidth={.75}
                    />
                </FlexibleXYPlot>
            </div>
        </div>
    )
}

export default BarChart;