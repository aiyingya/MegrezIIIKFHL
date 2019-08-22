import React, {Component} from 'react';
import { Button, notification } from 'antd';

class ExNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    }

    openNotificationWithIcon(type) {
        notification[type]({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }

    render() {
        return (
            <div style={{"width": "50%", "padding": "30px"}}>
                <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
                <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
                <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
                <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
            </div>
        );
    }
}

export default ExNotification;