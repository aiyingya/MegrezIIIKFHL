import React, {Component} from 'react';
import { Progress } from 'antd';

class ExAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClose = this.onClose.bind(this);
    }

    onClose(e) {
        console.log(e, 'I was closed.');
    }

    render() {
        return (
            <div style={{"width": "50%", "padding": "30px"}}>
                <Progress percent={30} />
                <Progress percent={50} status="active" />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
                <Progress percent={50} showInfo={false} />
                <Progress type="circle" percent={75} />
                <Progress type="circle" percent={70} status="exception" />
                <Progress type="circle" percent={100} />
            </div>
        );
    }
}

export default ExAlert;