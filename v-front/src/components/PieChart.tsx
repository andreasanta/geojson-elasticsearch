import React, { FunctionComponent } from 'react';
import { RadialChart } from 'react-vis';
import { useSelector } from '../store';
import { areafilterChanged } from '../store/actions';
import { useDispatch } from 'react-redux';
import EmptyData from './EmptyData';
import FullWidthLoading from './FullWidthLoading';

interface LocalProperties {
    selector: string;
    title: string;
}

const BarChart : FunctionComponent<LocalProperties> = ({selector, title}) => {

    const data = useSelector((s) => s[selector])
    const dispatch = useDispatch();

    const setAreaFilter = (a? : string) => {
        dispatch(areafilterChanged(a))
    }

    

    if (data === undefined)
        return <FullWidthLoading />        

    const parsedData = [];
    let sum = 0;
    for (let [k,v] of Object.entries<any>(data))
    {
        if (v.doc_count === 0)
            continue; 

        parsedData.push({
            label: k,
            subLabel: v.doc_count,
            angle: v.doc_count
        })
        sum += v.doc_count;
    }

    if (sum === 0)
        return <EmptyData />

    /*
    */
    return (
        <div className="chartContainer">
            <h2>{title}</h2>
            <div className="chartDetail">
                <RadialChart
                    className='pieChart'
                    data={parsedData}
                    width={350}
                    height={300}
                    showLabels={true}
                    labelsRadiusMultiplier={.8}
                    innerRadius={150}
                    onValueClick={(v) => setAreaFilter(v.label)}
                    labelsStyle={{
                        stroke: 'white',
                        fontSize: '12px',
                        textAlign: 'center'
                    }}>

                    </RadialChart>
            </div>
        </div>
    )
}

export default BarChart;