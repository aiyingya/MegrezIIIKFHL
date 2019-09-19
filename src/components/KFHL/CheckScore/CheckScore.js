import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import { Select } from 'antd';
import style from '../common.less'

class CheckScore extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {data,score,canEdit} =  this.props;
        return (
            <Fragment>
            {data && data.map((item,index) => (
                <div key={index}>
                    <title>{index+1}</title><title>{item.text}</title>
                    <div>{
                        canEdit ?
                            <Select key={index} style={{ width: '100%' }} value={item.value} onChange={(val)=>{this.props.onChange(val,item.name)}}>
                                {score.map((d,_index) => (
                                    <Select.Option key={_index} value={d.value}>{d.text}</Select.Option>
                                ))}
                            </Select> :
                        <div className={style.tRightScore}>{item.value}</div>
                    }
                    </div>
                </div>
            ))}
            </Fragment>
        );
    }
}

PropTypes.propTypes = {
    // 是否显示收起/显示全部
    data: PropTypes.bool.isRequired
};
export default CheckScore;