import React, {Component} from 'react';
import { Drawer, Button } from 'antd';

class ExDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    showDrawer() {
        this.setState({
            visible: true,
        });
    };

    onClose(){
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    Open
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    keyboard={false}
                    maskClosable={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
        );
    }
}

export default ExDrawer;