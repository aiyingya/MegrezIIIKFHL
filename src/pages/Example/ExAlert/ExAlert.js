import React, {Component} from 'react';
import {Alert} from 'antd';

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
                <Alert message="Success Tips" type="success" showIcon/><br/>
                <Alert message="Informational Notes" type="info" showIcon/><br/>
                <Alert message="Warning" type="warning" showIcon/><br/>
                <Alert message="Error" type="error" showIcon/><br/>
                <Alert
                    message="Success Tips"
                    description="Detailed description and advices about successful copywriting."
                    type="success"
                    showIcon
                    closable
                    onClose={this.onClose}
                /><br/>
                <Alert
                    message="Informational Notes"
                    description="Additional description and informations about copywriting."
                    type="info"
                    showIcon
                    closable
                    onClose={this.onClose}
                /><br/>
                <Alert
                    message="Warning"
                    description="This is a warning notice about copywriting."
                    type="warning"
                    showIcon
                    closable
                    onClose={this.onClose}
                /><br/>
                <Alert
                    message="Error"
                    description="This is an error message about copywriting."
                    type="error"
                    showIcon
                    closable
                    onClose={this.onClose}
                /><br/>
            </div>
        );
    }
}

export default ExAlert;