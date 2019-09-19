import React from 'react';
import {Global} from 'winning-megreziii-utils';
import Static from './Static';

let getButton =(_this,{canEdit,print,handleSubmit,showReject,isDocter = true,
       saveLoading=false,rejectLoading=false,submitLoading=false})=>{
    let isHideReject  = isDocter ? true : !canEdit;
    return {
        direction: Global.Direction.DOWN,
        datas: [
            {
                type: 'null',
                className: Global.BottomCss.Default,
                text: '打印',
                onClick: (e) => {
                    print();
                }
            },
            {
                type: 'primary',
                className: Global.BottomCss.ADD,
                text: '保存',
                disabled:!isDocter || !canEdit,
                loading:saveLoading,
                onClick: (e) => {
                    handleSubmit && handleSubmit();
                }
            },
            {
                type: 'primary',
                className: Global.BottomCss.REMOVE,
                text: '退回',
                disabled:isHideReject,
                loading:rejectLoading,
                onClick: (e) => {
                    showReject && showReject();
                }
            },
            {
                type: 'primary',
                className: Global.BottomCss.ADD,
                text: '提交',
                disabled:!canEdit,
                loading:submitLoading,
                onClick: (e) => {
                    handleSubmit && handleSubmit(true);
                }
            }
        ]
    }
}

const currentDay = ()=>{
    const date = new Date();
    let month = (date.getMonth()+1);
    month = month >= 10 ? month: '0'+month;
    let day =date.getDate();
    day = day >= 10 ? day: '0'+day;
    return date.getFullYear()+"-"+month+"-"+day;
}

const goBackUrl= (_this,backUrl)=>{
    _this.props.history.push({pathname:backUrl, query: {frozenPaging:true}})
}

const renderOption=(item)=> {
    return (
        <Option key={item.identityCard} text={item.personName}>
            <div className="global-search-item">
                <span className="global-search-item-desc">{item.personName}</span>
                <span className="global-search-item-count">{item.identityCard}</span>
            </div>
        </Option>
    );
}

const getSexName = (value)=>{
    const sex = Static.myDict.sex.find(res=>res.value == value);
    if(sex){
        return sex.name;
    }
    return "";
}

// curUtil.myStatic.checkTitle
export default {
    // 初始化编辑中机构列表的选中数据
    currentDay,
    // 获取按钮列表
    getButton,
    goBackUrl,
    renderOption,
    getSexName
}

