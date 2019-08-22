import React, {Component} from 'react';
import {Transfer} from 'antd';


//mock数据
const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}
const oriTargetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);

class ExTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetKeys: oriTargetKeys,
            selectedKeys: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleDisable = this.handleDisable.bind(this);
    }

    handleChange(nextTargetKeys, direction, moveKeys) {
        this.setState({targetKeys: nextTargetKeys});

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    }

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    }

    handleScroll(direction, e) {
        console.log('direction:', direction);
        console.log('target:', e.target);
    }

    handleDisable(disabled) {
        this.setState({disabled});
    };

    render() {
        return (
            <div style={{"width": "50%", "padding": "30px"}}>
                <Transfer
                    dataSource={mockData}
                    titles={['Source', 'Target']}
                    targetKeys={this.state.targetKeys}
                    selectedKeys={this.state.selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    onScroll={this.handleScroll}
                    render={item => item.title}
                />
            </div>
        );
    }
}

export default ExTransfer;