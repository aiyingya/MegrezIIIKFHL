import React, {Component} from 'react';
import { Divider } from 'antd';
import {message} from "antd/lib/index";
import style from './common.less'
import {Global,BasicGroupComponent,Scrollbar} from 'winning-megreziii-utils';

/***
 * 每个按钮默认的数据与名称
 * {
                // 授权的资源id
                auth:'default',
                // antd的button类型operation main ...
                type : 'main',
                // 按钮大小
                size : "default",
                // 自定义按钮的效果
                className:Global.BottomCss.ADD,
                // 按钮显示的文字
                text:'新增',
                // 按钮点击后的事件
                onClick:(e)=>{console.log(e,'check button')},
                // 按钮的加载中状态
                btnLoading:false
            }
 */
class ExButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnLoading:true
        }
        this.inside = React.createRef();
        this.goEdit = this.goEdit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    goEdit(){
        message.success("来编辑呀");
    }

    componentWillMount(){
        const 模板 ={
            direction : Global.Direction.UP, // Global.Direction.UP / Global.Direction.DOWN
            datas:[
                {
                    type : 'main',
                    size : "default",
                    className: Global.BottomCss.ADD,
                    text:'新增',
                    onClick:(e)=>{console.log(e,'check button')}
                },
                {
                    type : 'operation',
                    className: Global.BottomCss.REMOVE,
                    text:'删除',
                    size : "default",
                },
                {
                    type : 'operation',
                    className: Global.BottomCss.ADD,
                    text:'默认按钮',
                    size : "default",
                },
                {
                    type : 'operation',
                    size : "small",
                    text:'小按钮'
                }
            ]
        }
        this.setState({"模板":模板})
    }

    componentDidMount(){
        new Scrollbar(this.inside.current).show();
    }
    handleSubmit(){
        message.success("点击保存");
    }
    handleCancel(){
        message.success("点击取消");
    }

    render() {
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                    {/*列表*/}
                    <div className={'Table40 TableMain'}>
                        {/*操作按钮*/}
                        <div>一个Table上方按钮</div>
                        <BasicGroupComponent {...Global.showButtonOne({direction:Global.Direction.UP,text:'新增', onClick:this.goEdit})}/>
                        <Divider />
                        <div>一个Table下方的按钮</div>
                        <BasicGroupComponent {...Global.showButtonOne({direction:Global.Direction.DOWN,text:'新增', onClick:this.goEdit})}/>
                        <Divider />
                        <div>表单下方【保存，取消】按钮</div>
                        <BasicGroupComponent {...Global.showButtonSaveSpe({
                            save:this.handleSubmit,
                            cancel:this.handleCancel,
                            saveBtnLoading:this.state.btnLoading})}/>
                        <Divider />
                        <div>上方多个按钮</div>
                        <BasicGroupComponent {...this.state.模板}/>
                        <div>下方多个按钮</div>
                        <BasicGroupComponent {...this.state.模板} direction={Global.Direction.DOWN}/>

                    </div>
                </div>
            </div>

        )

    }
}
export default ExButtonGroup