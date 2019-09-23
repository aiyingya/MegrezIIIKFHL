import {Global, Uc} from "winning-megreziii-utils";

var _m = {
    dicts:[],
    user:{},
    init:()=>{
        // 初始化用户信息
        Uc.UserInfo().then((result={}) => {
            Global.localStorage.set(Global.localStorage.key.userInfo,result.data);
            _m.user = result.data;
        })
        Uc.initDict().then(result =>{
            _m.dicts = result || [];
        });
    },
    dictName:(value, dictName)=>{
        if(_m.dicts && _m.dicts[dictName] && _m.dicts[dictName].length>0){
            _.each(_m.dicts[dictName],function (obj) {
                if(obj.value && obj.value==value){
                    value= obj.name;
                    return false;
                }
            })
        }
        return value;
    },
    dictValue:(name, dictName)=>{
        if(_m.dicts && _m.dicts[dictName] && _m.dicts[dictName].length>0){
            _.each(_m.dicts[dictName],function (obj) {
                if(obj.name && obj.name==str){
                    name= obj.value;
                    return false;
                }
            })
        }
        return name;
    }
};
_m.init();
module.exports = _m;

