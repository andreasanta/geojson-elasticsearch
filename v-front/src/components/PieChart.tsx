import React, { FunctionComponent} from 'react';
import { RadialChart } from 'react-vis';
import { useSelector } from '../store';
import FullWidthLoading from './FullWidthLoading';

interface LocalProperties {
    selector: string;
    title: string;
}

const BarChart : FunctionComponent<LocalProperties> = ({selector, title}) => {

    const data = useSelector((s) => s[selector])

    if (data === undefined)
        return <FullWidthLoading />

        console.log('area data', data);

    const parsedData = [];
    for (let [k,v] of Object.entries<any>(data))
        parsedData.push({
            label: k,
            angle: v.doc_count
        })

    

    /*
    */
    return (
        <div className="chartContainer">
            <h2>{title}</h2>
            <div className="chartDetail">
                <RadialChart
                    data={parsedData}
                    width={350}
                    height={300}
                    showLabels={true}
                    subLabel={}
                    labelsRadiusMultiplier={.8}
                    labelsStyle={{
                        stroke: 'white',
                        fontSize: '12px'
                    }} />
            </div>
        </div>
    )
}

export default BarChart;