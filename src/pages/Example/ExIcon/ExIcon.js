import React, {Component} from 'react';
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

class ExIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{"width": "50%", "padding": "30px"}}>
                <div className="icons-list">
                    <Icon type="home" className={'icon-sm'}/>
                    <Icon type="setting" theme="filled" />
                    <Icon type="smile" theme="outlined" />
                    <Icon type="sync" spin />
                    <Icon type="loading"  className={'icon-default'}/>

                    <IconFont type="icon-tuichu" className={'icon-lg'}/>
                    <IconFont type="icon-facebook" />
                    <IconFont type="icon-twitter" />
                </div>,
            </div>
        );
    }
}

export default ExIcon;