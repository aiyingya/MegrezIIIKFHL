import React, {Component} from 'react';
import {Tabs, Button} from 'antd';

const TabPane = Tabs.TabPane;

class ExScrollbar extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            {title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1'},
            {title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2'},
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
            activeKey2: '21',
            activeKey3: '31',
        };
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onChange(activeKey,type) {
        switch (type){
            case 1:
                this.setState({activeKey:activeKey});
                break;
            case 2:
                this.setState({activeKey2:activeKey});
                break;
            case 3:
                this.setState({activeKey3:activeKey});
                break;
        }
    }

    add() {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push(
            {title: 'New Tab', content: 'New Tab Pane', key: activeKey}
        );
        this.setState({panes, activeKey});
    }

    onEdit(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({panes, activeKey});
    }

    render() {
        return (
            <div style={{padding: '20px'}}>
                <div>
                    <Button onClick={this.add}>ADD</Button>
                </div>
                <Tabs
                    hideAdd
                    onChange={(activeKey)=>{this.onChange(activeKey,1)}}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    animated={true}
                >
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}
                                                           closable={true}>{pane.content}</TabPane>)}
                </Tabs>
                <hr/>
                <div className="labelStyle tabs-sm">
                    <Tabs activeKey={this.state.activeKey2} onChange={(activeKey)=>{this.onChange(activeKey,2)}}>
                        <TabPane tab="Tab 21" key="21">Content of tab 1</TabPane>
                        <TabPane tab="Tab 22" key="22" >Content of tab 2</TabPane>
                        <TabPane tab="Tab 23" key="23">Content of tab 3</TabPane>
                    </Tabs>
                </div>
                <hr/>
                <div className="labelStyle ">
                    <Tabs activeKey={this.state.activeKey2} onChange={(activeKey)=>{this.onChange(activeKey,2)}}>
                        <TabPane tab="Tab 21" key="21">Content of tab 1</TabPane>
                        <TabPane tab="Tab 22" key="22" disabled>Content of tab 2</TabPane>
                        <TabPane tab="Tab 23" key="23">Content of tab 3</TabPane>
                    </Tabs>
                </div>
                <hr/>
                <div className="labelStyle tabs-lg">
                    <Tabs activeKey={this.state.activeKey2} onChange={(activeKey)=>{this.onChange(activeKey,2)}}>
                        <TabPane tab="Tab 21" key="21">Content of tab 1</TabPane>
                        <TabPane tab="Tab 22" key="22">Content of tab 2</TabPane>
                        <TabPane tab="Tab 23" key="23">Content of tab 3</TabPane>
                    </Tabs>
                </div>
                <hr/>
                <div className="cardStyle tabs-sm">
                    <Tabs activeKey={this.state.activeKey3} onChange={(activeKey)=>{this.onChange(activeKey,3)}}>
                        <TabPane tab="Tab 31" key="31">Content of tab 1</TabPane>
                        <TabPane tab="Tab 32" key="32">Content of tab 2</TabPane>
                        <TabPane tab="Tab 33" key="33">Content of tab 3</TabPane>
                    </Tabs>
                </div>
                <hr/>
                <div className="cardStyle">
                    <Tabs activeKey={this.state.activeKey3} onChange={(activeKey)=>{this.onChange(activeKey,3)}}>
                        <TabPane tab="Tab 31" key="31">Content of tab 1</TabPane>
                        <TabPane tab="Tab 32" key="32" disabled>Content of tab 2</TabPane>
                        <TabPane tab="Tab 33" key="33">Content of tab 3</TabPane>
                    </Tabs>
                </div>
                <hr/>
                <div className="cardStyle tabs-lg">
                    <Tabs activeKey={this.state.activeKey3} onChange={(activeKey)=>{this.onChange(activeKey,3)}}>
                        <TabPane tab="Tab 31" key="31">Content of tab 1</TabPane>
                        <TabPane tab="Tab 32" key="32">Content of tab 2</TabPane>
                        <TabPane tab="Tab 33" key="33">Content of tab 3</TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ExScrollbar;