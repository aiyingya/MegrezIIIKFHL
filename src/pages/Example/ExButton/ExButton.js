import React, {Component} from 'react';
import { Button, Menu, Dropdown, Icon, } from 'antd';

const ButtonGroup = Button.Group;
class ExButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.menu = this.menu.bind(this);
    }

    menu () {
       return (
           <Menu>
               <Menu.Item key="1">1st item</Menu.Item>
               <Menu.Item key="2">2nd item</Menu.Item>
               <Menu.Item key="3">3rd item</Menu.Item>
           </Menu>
       );
    }

    render() {
        return (
            <div style={{"width": "50%", "padding": "30px"}}>
                <div>
                    <Button type="main">主按钮</Button><br/><br/>
                    <Button type="secondary">次按钮</Button><br/><br/>
                    <Button type="operation">表单操作按钮</Button><br/><br/>
                    <Button type="frameless">无框按钮</Button><br/><br/>
                </div>
                <div>
                    <Button type="main" size="small">小</Button><br/><br/>
                    <Button type="main" size="default">中</Button><br/><br/>
                    <Button type="main" size="large">大</Button><br/><br/>
                </div>
                <div>
                    <Button type="main" disabled>disabled</Button><br/><br/>
                </div>
                <hr/>
                <div>
                    <Dropdown overlay={this.menu()}>
                        <Button>
                            下拉按钮 <Icon type="down" />
                        </Button>
                    </Dropdown><br/><br/>
                </div>
                <div>
                    <ButtonGroup>
                        <Button>L</Button>
                        <Button>M</Button>
                        <Button>R</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default ExButton;