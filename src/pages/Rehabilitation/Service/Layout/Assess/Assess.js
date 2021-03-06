// 入院申请
import React, {Component,Fragment} from 'react';
import {Upload, Input, Button, Divider, Icon, Checkbox, Radio, Descriptions, Table, Select,Form,DatePicker, AutoComplete } from 'antd';
const {TextArea} = Input;
import style from '../../../../../components/KFHL/common.less'
import Sign from '@components/KFHL/Sign/Sign';
import Static from "@/components/KFHL/Utils/Static";
import moment from "moment";

class Assess  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {isDocter,record={},canEdit,isHidePrint,handleChange} = this.props;
        return (
            <div className={isHidePrint ?  '' : '' +' '+style.showPrint}>
                <div className={`${style.propList} ${style.marginTopDiv}`}>
                    <header>
                        <div>评估项目</div>
                        <div>功能障碍及其程度</div>
                    </header>
                    <div>
                        <div className={style.heightText}>1.脑高级功能复制</div>
                        <div>
                            {canEdit?
                                <Input value={record.brainFun} onChange={(event)=> {handleChange(event.target.value, "brainFun")}}/>:
                                <div className={style.tLeft}>{record.brainFun}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>意识水平</div>
                        <div>
                            {canEdit?
                                <Input value={record.mentLevel} onChange={(event)=> {handleChange(event.target.value, "mentLevel")}}/>:
                                <div className={style.tLeft}>{record.mentLevel}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>认知功能</div>
                        <div>
                            {canEdit?
                                <Input value={record.cognitive} onChange={(event)=> {handleChange(event.target.value, "cognitive")}}/>:
                                <div className={style.tLeft}>{record.cognitive}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>言语功能</div>
                        <div>
                            {canEdit?
                                <Input value={record.speak} onChange={(event)=> {handleChange(event.target.value, "speak")}}/>:
                                <div className={style.tLeft}>{record.speak}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>情感情绪</div>
                        <div>
                            {canEdit?
                                <Input value={record.mood} onChange={(event)=> {handleChange(event.target.value, "mood")}}/>:
                                <div className={style.tLeft}>{record.mood}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className={style.heightText}>2.吞咽功能</div>
                        <div>
                            {canEdit?
                                <Input value={record.swallowingFun} onChange={(event)=> {handleChange(event.target.value, "swallowingFun")}}/>:
                                <div className={style.tLeft}>{record.swallowingFun}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className={style.heightText}>3.运动功能</div>
                        <div>
                            {canEdit?
                                <Input value={record.motionFun} onChange={(event)=> {handleChange(event.target.value, "motionFun")}}/>:
                                <div className={style.tLeft}>{record.motionFun}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>肌力</div>
                        <div>
                            {canEdit?
                                <Input value={record.myodynamia} onChange={(event)=> {handleChange(event.target.value, "myodynamia")}}/>:
                                <div className={style.tLeft}>{record.myodynamia}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>肌张力</div>
                        <div>
                            {canEdit?
                                <Input value={record.muscularTone} onChange={(event)=> {handleChange(event.target.value, "muscularTone")}}/>:
                                <div className={style.tLeft}>{record.muscularTone}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>平衡功能</div>
                        <div>
                            {canEdit?
                                <Input value={record.balance} onChange={(event)=> {handleChange(event.target.value, "balance")}}/>:
                                <div className={style.tLeft}>{record.balance}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>感觉功能</div>
                        <div>
                            {canEdit?
                                <Input value={record.sensibility} onChange={(event)=> {handleChange(event.target.value, "sensibility")}}/>:
                                <div className={style.tLeft}>{record.sensibility}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>浅感觉</div>
                        <div>
                            {canEdit?
                                <Input value={record.superficialSen} onChange={(event)=> {handleChange(event.target.value, "superficialSen")}}/>:
                                <div className={style.tLeft}>{record.superficialSen}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>深感觉</div>
                        <div>
                            {canEdit?
                                <Input value={record.deepSen} onChange={(event)=> {handleChange(event.target.value, "deepSen")}}/>:
                                <div className={style.tLeft}>{record.deepSen}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>复合感觉</div>
                        <div>
                            {canEdit?
                                <Input value={record.compositeSen} onChange={(event)=> {handleChange(event.target.value, "compositeSen")}}/>:
                                <div className={style.tLeft}>{record.compositeSen}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>日常生活能力</div>
                        <div>
                            {canEdit?
                                <Input value={record.dayLive} onChange={(event)=> {handleChange(event.target.value, "dayLive")}}/>:
                                <div className={style.tLeft}>{record.dayLive}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>合并症/并发症</div>
                        <div>
                            {canEdit?
                                <Input value={record.syndrome} onChange={(event)=> {handleChange(event.target.value, "syndrome")}}/>:
                                <div className={style.tLeft}>{record.syndrome}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>心功能不全</div>
                        <div>
                            {canEdit?
                                <Input value={record.cardiacFun} onChange={(event)=> {handleChange(event.target.value, "cardiacFun")}}/>:
                                <div className={style.tLeft}>{record.cardiacFun}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>肺部感染</div>
                        <div>
                            {canEdit?
                                <Input value={record.pulinfection} onChange={(event)=> {handleChange(event.target.value, "pulinfection")}}/>:
                                <div className={style.tLeft}>{record.pulinfection}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div>气管切开</div>
                        <div>
                            {canEdit?
                                <Input value={record.tracheotomy} onChange={(event)=> {handleChange(event.target.value, "tracheotomy")}}/>:
                                <div className={style.tLeft}>{record.tracheotomy}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className={style.rowStyle}>
                    康复科评估意见：<br/>
                    { (isHidePrint && canEdit && isDocter) ?
                        <TextArea value={record.doctorRemark} className={style.noneBorder} rows={5}
                                  onChange={(event)=> {handleChange(event.target.value, "doctorRemark")}}></TextArea>:
                        <div className={style.textArea}>{record.doctorRemark}</div>
                    }
                </div>
                <Descriptions column={2} bordered className={style.descriptions}
                              size="middle">
                    <Descriptions.Item label="护理人员签字">
                        { (isHidePrint && canEdit && isDocter) ?
                            <Input value={record.evaPerson} onChange={(event)=> {handleChange(event.target.value, "evaPerson")}}/>:
                            <div className={style.textArea}>{record.evaPerson}</div>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="日期">
                        {
                            (isHidePrint && canEdit && isDocter) ?
                                <DatePicker  value={moment(record.evaDate)} format={Static.dateFormat}
                                             onChange={(date, dateString)=>  {handleChange(dateString, "evaDate")}}/>:
                                <Fragment>{record.evaDate}</Fragment>
                        }
                    </Descriptions.Item>
                </Descriptions>
                <Sign isHidePrint={isHidePrint} record={record} handleChange={handleChange}
                      canEdit={canEdit}/>
            </div>
        );
    }
}

export default Assess;