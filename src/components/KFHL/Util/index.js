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
}

const currentDay = ()=>{
    const date = new Date();
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
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
    renderOption
}