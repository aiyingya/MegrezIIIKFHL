import React,{Component,Fragment} from 'react';
import * as PropTypes from 'prop-types';
import BasicSelect from '@components/BasicSelect/BasicSelect';

class CheckScore extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {data,score} =  this.props;
        return (
            <Fragment>
            {data.map((item,index) => (
                <div key={item.text}>
                    <title>{index+1}</title><title>{item.text}</title>
                    <div><BasicSelect data={score} onChange={(val)=>{this.props.onChange(val,item.name)}}> </BasicSelect></div>
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