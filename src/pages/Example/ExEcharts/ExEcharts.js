import React, {Component} from 'react';
import echarts from 'echarts';
import {Scrollbar} from 'winning-megreziii-utils';

class ExEcharts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.chart=echarts.init(this.refs.inside);
        this.chart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        })
    }
    render() {
        return (
            <div style={{"width": "50%", "height":"50%","padding": "30px"}} ref="inside">

            </div>
        );
    }
}

export default ExEcharts;