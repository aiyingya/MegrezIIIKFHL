import {Global} from 'winning-megreziii-utils';
let getButton =(_this,{canEdit,print,handleSubmit,showReject,isDocter = true})=>{
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
                disabled:!canEdit,
                onClick: (e) => {
                    handleSubmit();
                }
            },
            {
                type: 'primary',
                className: Global.BottomCss.REMOVE,
                text: '退回',
                disabled:isHideReject,
                onClick: (e) => {
                    showReject();
                }
            },
            {
                type: 'primary',
                className: Global.BottomCss.ADD,
                text: '提交',
                disabled:!canEdit,
                onClick: (e) => {
                    handleSubmit(true);
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
export default {
    // 初始化编辑中机构列表的选中数据
    currentDay,
    // 获取按钮列表
    getButton
}

