import React, {Component} from 'react';
import { Spin ,Icon} from 'antd';

class ExSpin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let a=(
                <Icon type="loading" spin />
        )
        return (
            <div style={{"width": "50%", "padding": "30px","background":"white"}}>
                <Spin size="small" indicator={a} /><br/><br/>
                <Spin indicator={a} /><br/><br/>
                <Spin size="large" indicator={a} />
            </div>
        );
    }
}

export default ExSpin;