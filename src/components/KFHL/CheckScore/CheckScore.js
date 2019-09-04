import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import BasicSelect from '@components/BasicSelect/BasicSelect';
import style from '../common.less'

class CheckScore extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {data,score,canEdit} =  this.props;
        return (
            <Fragment>
            {data.map((item,index) => (
                <div key={item.text}>
                    <title>{index+1}</title><title>{item.text}</title>
                    <div>{
                        canEdit ? <BasicSelect data={score} defaultValue={item.value} onChange={(val)=>{this.props.onChange(val,item.name)}}> </BasicSelect>:
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