import {message} from "antd/lib/index";
import {Global} from 'winning-megreziii-utils';
const myStatic = {
    defaultCheckedList: ['0', "1"],
    //诊断主要依据选择值
    outsideOptions: [
        {label: '偏瘫或截肢体肌力3级，或者肌力3级以上但', value: '0'},
        {label: '层高级脑功能障碍', value: '1'},
        {label: '吞咽功能障碍', value: '2'},
        {label: '言语功能障碍', value: '3'},
        {label: '大小便功能障碍', value: '4'}
    ],
    plainParentOptions: {label: '骨关节功能障碍', value: '5'},
    plainOptions: [
        {label: '层股骨颈骨折', value: '6'},
        {label: '股骨粗隆骨折', value: '7'},
        {label: '股骨干骨折', value: '8'},
        {label: '关节置换', value: '9'},
        {label: '腰间盘突出', value: '10'}
    ],
    //上传文件默认值
    defaultUploadInfo: [{
        isTest:true,
        fileId:'1',
        fileUrl:'',
        name: '',
        size: '',
        uploadTime: '',
        uploadUser: '',
    }],
    // 得分选择值
    checkScore: [
        {text: '0', value: '0'},
        {text: '1', value: '1'},
        {text: '2', value: '2'},
        {text: '3', value: '3'},
    ],
    // 检查序号检查内容
    checkTitle: [
        {text: '从座位站起', name: 'czwzq'},
        {text: '无支持站立', name: 'wzczl'},
        {text: '无支持坐起', name: 'wzczq'},
        {text: '站立坐下', name: 'zlzx'},
        {text: '转移', name: 'zy'},
        {text: '闭目站立', name: 'bmzl'},
        {text: '双脚并拢站立', name: 'sjblzl'},
        {text: '上肢向前伸站立并向前移动', name: 'szxqszlbxqyd'},
        {text: '从地面拾起物品', name: 'cdmjqwp'},
        {text: '转身向后看', name: 'zsxhk'},
        {text: '转身360度', name: 'zs'},
        {text: '将一只脚放在台阶或凳子上', name: 'jyzjfztjhdzs'},
        {text: '两脚一前一后站立', name: 'ljyqyhzl'},
        {text: '单脚站立', name: 'djzl'},
    ], /**/
    //我是Tab页签
    radioType: {imIsTab: '0'},
    // 验证规则
    rulesConfig: {
        rules: [{required: true,  message: '请输入', whitespace: true}]
    },
    dateFormat : 'YYYY-MM-DD',
    //据此考虑
    outHospResult: [
        {label: '出院', value: '0'},
        {label: '继续住院', value: '1'},
        {label: '结算并继续住院', value: '2'}
    ],
    //审核驳回
    auditReject:{
        // 入院医疗机构驳回
        inHospMedicalInstitution:['医疗机构审核','入院评估'],
        // 出院医疗机构驳回
        outHospMedicalInstitution:['医疗机构审核','出院评估'],
        // 社保驳回
        socialInsurance:['社保中心审核','医疗机构审核']
    },
    //审核提交
    auditAgree:{
        // 入院医护人员提交
        inHospDocter:['入院评估','医疗机构审核'],
        // 出院医护人员提交
        outHospDocter:['出院评估','医疗机构审核'],
        // 医疗机构提交
        medicalInstitution:['医疗机构审核','社保中心审核'],
        // 社保中心提交
        socialInsurance:['社保中心审核','归档'],
    },
    // 对应数据字典中的 KFHL_ST 属性
    flowStatus:{
        agree: "0",//通过
        reject: "1",//不通过
        awaitAudit:'2',//待审核
        awaitSubmit:'4'//待提交
    },
    // 对应数据字典中的 KFHL_TB 属性
    flowType:{
        inHosp: "0",// 入院评估
        outHosp: "1",// 出院评估
    },
    // 对应数据字典中的 KFHL_JS 属性
    currentRole:{
        docter: "0",//医护人员
        medicalInstitution: "1",//医疗机构
        socialInsurance:'2',//社保中心
    },
    // 填报状态：对应数据字典中的 KFHL_TAB_S 属性
    tableStatus:{
        completed:"0", //已填
        notFilledIn:"1" //未填
    },
    type:{
        inHosp:"0", // 入院
        outHosp:"1" // 出院
    },
    // 查看Tab页的页码
    lookTab:{
        inhospApplication:"0", // 入院申请
        inHospAssess:"1", // 入院评估
        inHospBerg:"2", // 入院berg
        outHospAssess:"1", // 出院评估
        outHospBerg:"2" // 出院berg
    }
}

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
function renderOption(item) {
    return (
        <Option key={item.ID}  value={item.personName}>
            <div className="global-search-item">
                <span className="global-search-item-desc">{item.personName}</span>
                <span className="global-search-item-count">{item.identityCard}</span>
            </div>
        </Option>
    );
}
export default {
    myStatic,
    // 初始化编辑中机构列表的选中数据
    currentDay,
    renderOption,
    // 获取按钮列表
    getButton
}