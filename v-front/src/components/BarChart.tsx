import React, { FunctionComponent, useState } from 'react';
import { FlexibleXYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis, Hint, LabelSeries } from 'react-vis';
import { useSelector } from '../store';
import { materialfilterChanged } from '../store/actions';
import { useDispatch } from 'react-redux';
import FullWidthLoading from './FullWidthLoading';
import EmptyData from './EmptyData';
import _ from 'lodash';

interface LocalProperties {
    selector: string;
    title: string;
}

const BarChart : FunctionComponent<LocalProperties> = ({selector, title}) => {

    const data = useSelector((s) => s[selector])
    const dispatch = useDispatch();
    
    const setMaterialFilter = (m? : string) => {
        dispatch(materialfilterChanged(m))
    }

    if (data === undefined)
        return <FullWidthLoading />

    let cnt = 0;
    let sum = 0;
    const parsedData = data.map((o : any) => {
        sum += o.doc_count;
        return { y: o.doc_count, x: o.key, width: .8, label: o.key}
    });

    const labelData = data.map((o : any) => {
        return { y: o.doc_count, x: o.key, label: o.doc_count.toString()}
    });

    if (sum == 0)
        return <EmptyData />


    return (
        <div className="chartContainer">
            <h2>{title}</h2>
            <div className="chartDetail">
                <FlexibleXYPlot
                    className='barChart'
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
                        onValueClick={(datapoint) => setMaterialFilter(datapoint.x as string)}
                    />
                    <LabelSeries data={labelData} style={{stroke:'#fff', fill:'#fff',zIndex:1006,fontSize:'15px'}} />
                </FlexibleXYPlot>
            </div>
        </div>
    )
}

export default BarChart;