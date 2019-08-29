import React,{Component} from 'react';
import * as PropTypes from 'prop-types';
import { Select } from 'antd';
import _  from 'lodash';

class BasicSelect extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {data} =  this.props;
        let  normalProps = _.omit(_.cloneDeep(this.props),[data]);
        return (
            <Select style={{ width: '100%' }} {...normalProps}>
                {data.map(d => (
                    <Select.Option key={d.value}>{d.text}</Select.Option>
                ))}
            </Select>
        );
    }
}

PropTypes.propTypes = {
    // 是否显示收起/显示全部
    data: PropTypes.bool.isRequired
};
export default BasicSelect;