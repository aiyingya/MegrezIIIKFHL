import React, {Component} from 'react';
import { Popconfirm, message, Button } from 'antd';


class ExPopconfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.confirm = this.confirm.bind(this);
        this.text = 'Are you sure to delete this task?';
    }

    confirm() {
        message.info('Clicked on Yes.');
    }

    render() {
        return (
            <div style={{"width": "50%", "padding": "30px"}}>
                <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
                    <Popconfirm placement="topLeft" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>TL</Button>
                    </Popconfirm>
                    <Popconfirm placement="top" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>Top</Button>
                    </Popconfirm>
                    <Popconfirm placement="topRight" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>TR</Button>
                    </Popconfirm>
                </div>
                <div style={{ width: 70, float: 'left' }}>
                    <Popconfirm placement="leftTop" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>LT</Button>
                    </Popconfirm>
                    <Popconfirm placement="left" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>Left</Button>
                    </Popconfirm>
                    <Popconfirm placement="leftBottom" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>LB</Button>
                    </Popconfirm>
                </div>
                <div style={{ width: 70, marginLeft: 304 }}>
                    <Popconfirm placement="rightTop" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>RT</Button>
                    </Popconfirm>
                    <Popconfirm placement="right" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>Right</Button>
                    </Popconfirm>
                    <Popconfirm placement="rightBottom" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>RB</Button>
                    </Popconfirm>
                </div>
                <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
                    <Popconfirm placement="bottomLeft" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>BL</Button>
                    </Popconfirm>
                    <Popconfirm placement="bottom" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>Bottom</Button>
                    </Popconfirm>
                    <Popconfirm placement="bottomRight" title={this.text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>BR</Button>
                    </Popconfirm>
                </div>
            </div>
        );
    }
}

export default ExPopconfirm;