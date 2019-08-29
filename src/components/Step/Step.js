// Step
import React,{Component} from 'react';
import {Icon} from 'antd';
import * as PropTypes from 'prop-types';
import style from '../Step/Step.less'
const myStatic = {
    node :{
        Zero:"0",//医生发起
        One:"1",//机构审核
        Two:"2",//社保中心审核
        Three:"3",//归档
    }
}
class Step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否显示收起/显示全部
            isShow: true,
            // 是否展开
            isSpread: true,
            // 默认当前的步骤
            node:myStatic.node.Zero
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState({isSpread:!this.state.isSpread});
    }
    render() {
        let {isShow = this.state.isShow, isSpread = this.state.isSpread,node =this.state.node} =  this.props;
        return (
                <div className={style.speBody}>

                    <div className="ant-steps ant-steps-horizontal ant-steps-label-horizontal">
                        <div className="ant-steps-item ant-steps-item-finish">
                            <div className="ant-steps-item-container">
                                <div className="ant-steps-item-tail"></div>
                                <div className="winning-style-div">
                                    <div className={`ant-steps-item-icon ${ (!node || Number(node) >= Number(myStatic.node.Zero)) ? 'select' : '' }`}><span className="ant-steps-icon"><i
                                        aria-label="图标: check" className="anticon anticon-check ant-steps-finish-icon"><svg
                                        viewBox="64 64 896 896" focusable="false" className="" data-icon="check"
                                        width="1em" height="1em" fill="currentColor" aria-hidden="true"><path
                                        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span>
                                    </div>
                                </div>
                                <div className="ant-steps-item-content">
                                    <div className="ant-steps-item-title">入院评估</div>
                                    {
                                        isShow && isSpread ?
                                            <div className="ant-steps-item-description">
                                                <div className="winning-style-arrow"><em></em><span></span></div>
                                                <span><em>入院申请人：</em>张三</span>
                                                <span className="_3pC8XT21c2V7pZLyjgGZMS"><em>申请时间：</em>2019-01-30</span>
                                            </div> :''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
                            <div className="ant-steps-item-container">
                                <div className="ant-steps-item-tail"></div>
                                <div className="winning-style-div">
                                    <div className={`ant-steps-item-icon ${ (!node || Number(node) >= Number(myStatic.node.One)) ? 'select' : '' }`} ><span className="ant-steps-icon"><i
                                        aria-label="图标: check" className="anticon anticon-check ant-steps-finish-icon"><svg
                                        viewBox="64 64 896 896" focusable="false" className="" data-icon="check"
                                        width="1em" height="1em" fill="currentColor" aria-hidden="true"><path
                                        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span>
                                    </div>
                                </div>
                                <div className="ant-steps-item-content">
                                    <div className="ant-steps-item-title">医疗机构审核</div>
                                    {
                                        isShow && isSpread ?
                                            <div className="ant-steps-item-description">
                                                <div className="winning-style-arrow"><em></em><span></span></div>
                                                <span><em>入院申请人：</em>张三</span>
                                                <span className="_3pC8XT21c2V7pZLyjgGZMS"><em>申请时间：</em>2019-01-30</span>
                                            </div> :''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
                            <div className="ant-steps-item-container">
                                <div className="ant-steps-item-tail"></div>
                                <div className="winning-style-div">
                                    <div  className={`ant-steps-item-icon ${ (!node || Number(node) >= Number(myStatic.node.Two)) ? 'select' : '' }`}><span className="ant-steps-icon"><i
                                        aria-label="图标: check" className="anticon anticon-check ant-steps-finish-icon"><svg
                                        viewBox="64 64 896 896" focusable="false" className="" data-icon="check"
                                        width="1em" height="1em" fill="currentColor" aria-hidden="true"><path
                                        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span>
                                    </div>
                                </div>
                                <div className="ant-steps-item-content">
                                    <div className="ant-steps-item-title">社保中心审核</div>
                                    {
                                        isShow && isSpread ?
                                            <div className="ant-steps-item-description">
                                                <div className="winning-style-arrow"><em></em><span></span></div>
                                                <span><em>入院申请人：</em>张三</span>
                                                <span className="_3pC8XT21c2V7pZLyjgGZMS"><em>申请时间：</em>2019-01-30</span>
                                            </div> :''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
                            <div className="ant-steps-item-container">
                                <div className="ant-steps-item-tail"></div>
                                <div className="winning-style-div">
                                    <div  className={`ant-steps-item-icon ${ (!node || Number(node) >= Number(myStatic.node.Three)) ? 'select' : '' }`}><span className="ant-steps-icon"><i
                                        aria-label="图标: check" className="anticon anticon-check ant-steps-finish-icon"><svg
                                        viewBox="64 64 896 896" focusable="false" className="" data-icon="check"
                                        width="1em" height="1em" fill="currentColor" aria-hidden="true"><path
                                        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></i></span>
                                    </div>
                                </div>
                                <div className="ant-steps-item-content">
                                    <div className="ant-steps-item-title">归档</div>
                                    {
                                        isShow && isSpread ?
                                            <div className="ant-steps-item-description">
                                                <div className="winning-style-arrow"><em></em><span></span></div>
                                                <span><em>入院申请人：</em>张三</span>
                                                <span className="_3pC8XT21c2V7pZLyjgGZMS"><em>申请时间：</em>2019-01-30</span>
                                            </div> :''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        isShow ? <div className="winning-spread">
                            <a onClick={this.onClick}>
                            {
                                isSpread? <div>收起</div>:<div>显示全部</div>
                            }
                                <Icon type={this.state.isSpread ? 'up' : 'down'} />
                            </a>
                        </div> :<div></div>
                    }

                </div>
        );
    }
}


PropTypes.propTypes = {
    // 是否显示收起/显示全部
    isShow: PropTypes.bool.isRequired
};
export default Step;