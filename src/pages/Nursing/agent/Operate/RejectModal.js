import React from 'react';
import {Modal,Transfer,Input} from 'antd';
const {TextArea} = Input;
import style from '../common.less';

class RejectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            context : ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(val) {
        this.setState({context:val});
    }
    render() {
        let {close,rejectCallback,confirmLoading,rejectTxts,isShow} = this.props;
        const txt = `${rejectTxts[0]}=>${rejectTxts[1]}`
        return (
            <Modal
                visible={isShow}
                title= "退回原因"
                onOk={()=>{rejectCallback(this.state.context)}}
                onCancel={close}
                confirmLoading={confirmLoading}
                width = {450}
            >
                <div className={style.rejectModal}>
                    <div>退回节点：</div>
                    <Input disabled={true} value={txt}/>
                    <br/>
                    <div>请填写退回原因：</div>
                    <TextArea rows={3}
                              onChange={(event)=> {this.handleChange(event.target.value)}}></TextArea>
                </div>

            </Modal>
        );
    }
}
export default RejectModal;