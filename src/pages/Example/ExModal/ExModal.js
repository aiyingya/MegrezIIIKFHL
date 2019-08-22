import React, {Component} from 'react';
import { Modal, Button } from 'antd';

class ExModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            visible2: false
        };
        this.showModal1 = this.showModal1.bind(this);
        this.showModal2 = this.showModal2.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal1(){
        this.setState({
            visible1: true,
        });
    }

    showModal2(){
        this.setState({
            visible2: true,
        });
    }

    handleOk(e) {
        console.log(e);
        this.setState({
            visible1: false,
            visible2: false
        });
    }

    handleCancel(e){
        console.log(e);
        this.setState({
            visible1: false,
            visible2: false
        });
    }

    render() {
        return (
            <div>
                <Button type="main" onClick={this.showModal1}>
                    Open Modal1
                </Button>
                <Button type="main" onClick={this.showModal2}>
                    Open Modal2
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    wrapClassName="ColorBase"
                    closable={true}
                    // footer={null}
                    keyboard={false}
                    maskClosable={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible2}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    wrapClassName="LineBase"
                    closable={true}
                    footer={null}
                    keyboard={false}
                    maskClosable={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default ExModal;