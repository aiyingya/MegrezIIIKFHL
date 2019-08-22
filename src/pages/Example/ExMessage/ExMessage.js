import React, {Component} from 'react';
import { message, Button } from 'antd';

class ExMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.message = this.message.bind(this);
    }

    message(type){
        switch (type){
            case 'success':
                message.success('This is a message of success');
                break;
            case 'error':
                message.error('This is a message of error');
                break;
            case 'info':
                message.info('This is a message of info');
                break;
            case 'warning':
                message.warning('This is a message of warning');
                break;
        }
    }

    render() {
        return (
            <div>
                <Button onClick={()=>{this.message('success')}}>Success</Button><br/>
                <Button onClick={()=>{this.message('error')}}>error</Button><br/>
                <Button onClick={()=>{this.message('info')}}>info</Button><br/>
                <Button onClick={()=>{this.message('warning')}}>warning</Button><br/>
            </div>
        );
    }
}

export default ExMessage;