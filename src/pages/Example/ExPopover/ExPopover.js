import React, {Component} from 'react';
import { Popover, Button } from 'antd';

class ExPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.buttonWidth=70;
        this.text = <span>Title</span>;
        this.content = this.content.bind(this);
    }

    content() {
        return (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
    }

    render() {
        return (
            <div  style={{"width": "50%", "padding": "80px"}}>
                <div style={{ marginLeft: this.buttonWidth, whiteSpace: 'nowrap' }}>
                    <Popover placement="topLeft" title={this.text} content={this.content()}>
                        <Button>TL</Button>
                    </Popover>
                    <Popover placement="top" title={this.text} content={this.content()}>
                        <Button>Top</Button>
                    </Popover>
                    <Popover placement="topRight" title={this.text} content={this.content()}>
                        <Button>TR</Button>
                    </Popover>
                </div>
                <div style={{ width: this.buttonWidth, float: 'left' }}>
                    <Popover placement="leftTop" title={this.text} content={this.content()}>
                        <Button>LT</Button>
                    </Popover>
                    <Popover placement="left" title={this.text} content={this.content()}>
                        <Button>Left</Button>
                    </Popover>
                    <Popover placement="leftBottom" title={this.text} content={this.content()}>
                        <Button>LB</Button>
                    </Popover>
                </div>
                <div style={{ width: this.buttonWidth, marginLeft: (this.buttonWidth * 4) + 24 }}>
                    <Popover placement="rightTop" title={this.text} content={this.content()}>
                        <Button>RT</Button>
                    </Popover>
                    <Popover placement="right" title={this.text} content={this.content()}>
                        <Button>Right</Button>
                    </Popover>
                    <Popover placement="rightBottom" title={this.text} content={this.content()}>
                        <Button>RB</Button>
                    </Popover>
                </div>
                <div style={{ marginLeft: this.buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
                    <Popover placement="bottomLeft" title={this.text} content={this.content()}>
                        <Button>BL</Button>
                    </Popover>
                    <Popover placement="bottom" title={this.text} content={this.content()}>
                        <Button>Bottom</Button>
                    </Popover>
                    <Popover placement="bottomRight" title={this.text} content={this.content()}>
                        <Button>BR</Button>
                    </Popover>
                </div>
            </div>
        );
    }
}

export default ExPopover;