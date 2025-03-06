import React from 'react';
import { Svg, G, Path, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-shape';

const CustomPieChart = ({ data, widthAndHeight, onPress }) => {
    if (!data || !Array.isArray(data)) {
        throw Error('Invalid data: data should be an array');
    }

    const radius = widthAndHeight / 2;
    const series = data.map((item) => item.value);
    const sliceColor = data.map((item) => item.color);

    const pieGenerator = d3.pie().sort(null);
    const arcs = pieGenerator(series);

    return (
        <Svg width={widthAndHeight} height={widthAndHeight}>
            <G transform={`translate(${widthAndHeight / 2}, ${widthAndHeight / 2})`}>
                {arcs.map((arc:any, index:any) => {
                    const arcGenerator = d3
                        .arc()
                        .innerRadius(0)
                        .outerRadius(radius)
                        .startAngle(arc.startAngle)
                        .endAngle(arc.endAngle);

                    const centroid = d3.arc().outerRadius(radius / 2).innerRadius(radius / 2).centroid(arc);

                    return (
                        <G key={index}>
                          
                            <Path
                                fill={sliceColor[index]}
                                d={arcGenerator()}
                                onPress={() => onPress(index)} 
                            />
                          
                            <SvgText
                                x={centroid[0]}
                                y={centroid[1]}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={10}
                                fill="#000"
                            >
                                {data[index].name} 
                            </SvgText>
                        </G>
                    );
                })}
            </G>
        </Svg>
    );
};

export default CustomPieChart;
