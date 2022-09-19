<template>
  <div class="all-add-contain">
    <div class="add-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="add-title-main">{{currentIsEdit ? '编辑' : '新建'}}病例</div>
    </div>
    <div class="all-add-main">
      <el-tabs v-model="active">
        <el-tab-pane :name="1">
          <span slot="label"><i class="el-icon-edit"></i> 基本信息<i class="el-icon-arrow-right arrow-style"></i></span>
          <el-form :model="infoForm" :rules="infoRules" ref="infoForm" label-width="100px" class="form-main">
            <el-form-item label="患者姓名" prop="name" class="name">
              <el-input v-model="infoForm.name" placeholder="请输入患者姓名" class="item-width"></el-input>
            </el-form-item>
            <el-form-item label="所属医生" prop="doctorId" v-show="!currentIsDoctor" class="doctorId">
              <el-select v-model="infoForm.doctorId" placeholder="请选择所属医生" class="item-width">
                <el-option
                  v-for="item in doctorOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="sex">
              <el-radio-group v-model="infoForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday" class="birthday">
              <el-date-picker
                class="item-width"
                v-model="infoForm.birthday"
                type="date"
                placeholder="请选择出生日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="安氏分类" prop="annType" class="annType">
              <el-radio-group v-model="infoForm.annType" class="common-select">
                <el-radio :label="1" border>安氏I类</el-radio>
                <el-radio :label="2" border>安氏II类</el-radio>
                <el-radio :label="3" border>安氏III类</el-radio>
                <el-radio :label="4" border>不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="骨性分类" prop="bonyType">
              <el-radio-group v-model="infoForm.bonyType" class="common-select">
                <el-radio :label="1" border>骨性I类</el-radio>
                <el-radio :label="2" border>骨性II类</el-radio>
                <el-radio :label="3" border>骨性III类</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="错合类型" prop="malocclusionType" class="malocclusionType">
              <el-checkbox-group v-model="infoForm.malocclusionType" class="common-select">
                <el-checkbox :label="1" border>牙前突</el-checkbox>
                <el-checkbox :label="2" border>拥挤</el-checkbox>
                <el-checkbox :label="3" border>牙列间隙</el-checkbox>
                <el-checkbox :label="4" border>深覆合</el-checkbox>
                <el-checkbox :label="5" border>前牙反合</el-checkbox>
                <el-checkbox :label="6" border>后牙反合</el-checkbox>
                <el-checkbox :label="7" border>后牙锁合</el-checkbox>
                <el-checkbox :label="8" border>开合</el-checkbox>
                <el-checkbox :label="9" border>上颌前突</el-checkbox>
                <el-checkbox :label="10" border>上颌发育不足</el-checkbox>
                <el-checkbox :label="11" border>下颌前突</el-checkbox>
                <el-checkbox :label="12" border>下颌后缩</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <span slot="label"><i class="el-icon-document"></i> 诊断及矫治说明<i class="el-icon-arrow-right arrow-style"></i></span>
          <el-form :model="prescriptionForm" ref="prescriptionForm" label-width="100px" class="form-main">
            <div class="diagnosis-title diagnosis-title-required chief">1. 主诉</div>
            <el-form-item label="牙齿问题" prop="ccTeeth">
              <el-checkbox-group v-model="prescriptionForm.ccTeeth" class="common-select">
                <el-checkbox :label="1" border>牙前突</el-checkbox>
                <el-checkbox :label="2" border>牙列不齐</el-checkbox>
                <el-checkbox :label="3" border>牙间隙</el-checkbox>
                <el-checkbox :label="4" border>反合</el-checkbox>
                <el-checkbox :label="5" border>开合</el-checkbox>
                <el-checkbox :label="6" border>后牙锁合</el-checkbox>
                <el-checkbox :label="7" border>其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="颌骨问题" prop="ccJaw">
              <el-checkbox-group v-model="prescriptionForm.ccJaw" class="common-select">
                <el-checkbox :label="1" border>上颌前突</el-checkbox>
                <el-checkbox :label="2" border>上颌发育不足</el-checkbox>
                <el-checkbox :label="3" border>下颌前突</el-checkbox>
                <el-checkbox :label="4" border>下颌后缩</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required goals">2. 主要矫治目标</div>
            <el-form-item label="牙齿问题" prop="teeth">
              <el-checkbox-group v-model="prescriptionForm.teeth" class="common-select">
                <el-checkbox :label="1" border>改善牙前突</el-checkbox>
                <el-checkbox :label="2" border>排齐牙齿</el-checkbox>
                <el-checkbox :label="3" border>关闭牙间隙</el-checkbox>
                <el-checkbox :label="4" border>纠正反合</el-checkbox>
                <el-checkbox :label="5" border>纠正开合</el-checkbox>
                <el-checkbox :label="6" border>纠正后牙锁合</el-checkbox>
                <el-checkbox :label="7" border>其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required orthodontics">3. 拟矫治牙颌<span class="diagnosis-tip">即使单颌矫治，也需要提交全颌硅橡胶印模或数字文件</span></div>
            <el-form-item prop="orthodonticJaw" label-width="0px">
              <el-radio-group v-model="prescriptionForm.orthodonticJaw" class="common-select">
                <el-radio :label="1" border>全颌</el-radio>
                <el-radio :label="2" border>上颌</el-radio>
                <el-radio :label="3" border>下颌</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">4. 牙齿信息</div>
            <p class="diagnosis-titleNo-tipNo">下方牙列式为恒牙全部萌出的默认状态，请在牙列中标记缺失牙，滞留的乳牙</p>
            <el-form-item prop="teethInformation" label-width="0px" class="info-item">
              <el-checkbox-group v-model="prescriptionForm.teethInformationOne" class="info-select">
                <el-checkbox :label="55" border></el-checkbox>
                <el-checkbox :label="54" border></el-checkbox>
                <el-checkbox :label="53" border></el-checkbox>
                <el-checkbox :label="52" border></el-checkbox>
                <el-checkbox :label="51" border></el-checkbox>
                <el-checkbox :label="61" border></el-checkbox>
                <el-checkbox :label="62" border></el-checkbox>
                <el-checkbox :label="63" border></el-checkbox>
                <el-checkbox :label="64" border></el-checkbox>
                <el-checkbox :label="65" border></el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="prescriptionForm.teethInformationTwo" class="info-select">
                <el-checkbox :label="18" border></el-checkbox>
                <el-checkbox :label="17" border></el-checkbox>
                <el-checkbox :label="16" border></el-checkbox>
                <el-checkbox :label="15" border></el-checkbox>
                <el-checkbox :label="14" border></el-checkbox>
                <el-checkbox :label="13" border></el-checkbox>
                <el-checkbox :label="12" border></el-checkbox>
                <el-checkbox :label="11" border></el-checkbox>
                <el-checkbox :label="21" border></el-checkbox>
                <el-checkbox :label="22" border></el-checkbox>
                <el-checkbox :label="23" border></el-checkbox>
                <el-checkbox :label="24" border></el-checkbox>
                <el-checkbox :label="25" border></el-checkbox>
                <el-checkbox :label="26" border></el-checkbox>
                <el-checkbox :label="27" border></el-checkbox>
                <el-checkbox :label="28" border></el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="prescriptionForm.teethInformationThree" class="info-select">
                <el-checkbox :label="48" border></el-checkbox>
                <el-checkbox :label="47" border></el-checkbox>
                <el-checkbox :label="46" border></el-checkbox>
                <el-checkbox :label="45" border></el-checkbox>
                <el-checkbox :label="44" border></el-checkbox>
                <el-checkbox :label="43" border></el-checkbox>
                <el-checkbox :label="42" border></el-checkbox>
                <el-checkbox :label="41" border></el-checkbox>
                <el-checkbox :label="31" border></el-checkbox>
                <el-checkbox :label="32" border></el-checkbox>
                <el-checkbox :label="33" border></el-checkbox>
                <el-checkbox :label="34" border></el-checkbox>
                <el-checkbox :label="35" border></el-checkbox>
                <el-checkbox :label="36" border></el-checkbox>
                <el-checkbox :label="37" border></el-checkbox>
                <el-checkbox :label="38" border></el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="prescriptionForm.teethInformationFour" class="info-select">
                <el-checkbox :label="85" border></el-checkbox>
                <el-checkbox :label="84" border></el-checkbox>
                <el-checkbox :label="83" border></el-checkbox>
                <el-checkbox :label="82" border></el-checkbox>
                <el-checkbox :label="81" border></el-checkbox>
                <el-checkbox :label="71" border></el-checkbox>
                <el-checkbox :label="72" border></el-checkbox>
                <el-checkbox :label="73" border></el-checkbox>
                <el-checkbox :label="74" border></el-checkbox>
                <el-checkbox :label="75" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="diagnosis-title">5. 有无牙列间隙</div>
            <el-form-item prop="teethClearance" label-width="0px">
              <el-radio-group v-model="prescriptionForm.teethClearance" class="common-select">
                <el-radio :label="0" border>无</el-radio>
                <el-radio :label="1" border>有</el-radio>
              </el-radio-group>
              <div v-show="prescriptionForm.teethClearance == 1">
                <div class="diagnosis-titleNo-tipNo">请记录反馈1.0mm以下的间隙量</div>
                <div class="clearance-main">
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance1"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance2"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance3"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance4"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance5"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance6"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance7"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance8"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance9"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance10"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance11"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance12"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance13"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance14"></el-input>
                  <el-input class="clearance-input clearance-input-top" v-model="prescriptionForm.teethClearance15"></el-input>
                  <div class="clearance-number clearance-number-bootom">
                    <span>18</span>
                    <span>17</span>
                    <span>16</span>
                    <span>15</span>
                    <span>14</span>
                    <span>13</span>
                    <span>12</span>
                    <span>11</span>
                    <span>21</span>
                    <span>22</span>
                    <span>23</span>
                    <span>24</span>
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                  </div>
                  <div class="clearance-number">
                    <span>48</span>
                    <span>47</span>
                    <span>46</span>
                    <span>45</span>
                    <span>44</span>
                    <span>43</span>
                    <span>42</span>
                    <span>41</span>
                    <span>31</span>
                    <span>32</span>
                    <span>33</span>
                    <span>34</span>
                    <span>35</span>
                    <span>36</span>
                    <span>37</span>
                    <span>38</span>
                  </div>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance16"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance17"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance18"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance19"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance20"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance21"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance22"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance23"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance24"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance25"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance26"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance27"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance28"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance29"></el-input>
                  <el-input class="clearance-input clearance-input-bottom" v-model="prescriptionForm.teethClearance30"></el-input>
                </div>
              </div>
            </el-form-item>
            <div class="diagnosis-title">6. 不可移动牙齿<span class="diagnosis-tip">烤瓷牙、修复桥体、种植牙等无法移动</span></div>
            <el-form-item prop="teethMobile" label-width="0px" :class="{'teeth-item': prescriptionForm.teethMobile == 1}">
              <el-radio-group v-model="prescriptionForm.teethMobile" class="common-select">
                <el-radio :label="0" border>无</el-radio>
                <el-radio :label="1" border class="select-long">以下牙齿不可移动</el-radio>
              </el-radio-group>
              <div v-show="prescriptionForm.teethMobile == 1">
                <el-checkbox-group v-model="prescriptionForm.teethMobileOne" class="info-select">
                  <el-checkbox :label="55" border disabled></el-checkbox>
                  <el-checkbox :label="54" border disabled></el-checkbox>
                  <el-checkbox :label="53" border disabled></el-checkbox>
                  <el-checkbox :label="52" border disabled></el-checkbox>
                  <el-checkbox :label="51" border disabled></el-checkbox>
                  <el-checkbox :label="61" border disabled></el-checkbox>
                  <el-checkbox :label="62" border disabled></el-checkbox>
                  <el-checkbox :label="63" border disabled></el-checkbox>
                  <el-checkbox :label="64" border disabled></el-checkbox>
                  <el-checkbox :label="65" border disabled></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.teethMobileTwo" class="info-select">
                  <el-checkbox :label="18" border></el-checkbox>
                  <el-checkbox :label="17" border></el-checkbox>
                  <el-checkbox :label="16" border></el-checkbox>
                  <el-checkbox :label="15" border></el-checkbox>
                  <el-checkbox :label="14" border></el-checkbox>
                  <el-checkbox :label="13" border></el-checkbox>
                  <el-checkbox :label="12" border></el-checkbox>
                  <el-checkbox :label="11" border></el-checkbox>
                  <el-checkbox :label="21" border></el-checkbox>
                  <el-checkbox :label="22" border></el-checkbox>
                  <el-checkbox :label="23" border></el-checkbox>
                  <el-checkbox :label="24" border></el-checkbox>
                  <el-checkbox :label="25" border></el-checkbox>
                  <el-checkbox :label="26" border></el-checkbox>
                  <el-checkbox :label="27" border></el-checkbox>
                  <el-checkbox :label="28" border></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.teethMobileThree" class="info-select">
                  <el-checkbox :label="48" border></el-checkbox>
                  <el-checkbox :label="47" border></el-checkbox>
                  <el-checkbox :label="46" border></el-checkbox>
                  <el-checkbox :label="45" border></el-checkbox>
                  <el-checkbox :label="44" border></el-checkbox>
                  <el-checkbox :label="43" border></el-checkbox>
                  <el-checkbox :label="42" border></el-checkbox>
                  <el-checkbox :label="41" border></el-checkbox>
                  <el-checkbox :label="31" border></el-checkbox>
                  <el-checkbox :label="32" border></el-checkbox>
                  <el-checkbox :label="33" border></el-checkbox>
                  <el-checkbox :label="34" border></el-checkbox>
                  <el-checkbox :label="35" border></el-checkbox>
                  <el-checkbox :label="36" border></el-checkbox>
                  <el-checkbox :label="37" border></el-checkbox>
                  <el-checkbox :label="38" border></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.teethMobileFour" class="info-select">
                  <el-checkbox :label="85" border disabled></el-checkbox>
                  <el-checkbox :label="84" border disabled></el-checkbox>
                  <el-checkbox :label="83" border disabled></el-checkbox>
                  <el-checkbox :label="82" border disabled></el-checkbox>
                  <el-checkbox :label="81" border disabled></el-checkbox>
                  <el-checkbox :label="71" border disabled></el-checkbox>
                  <el-checkbox :label="72" border disabled></el-checkbox>
                  <el-checkbox :label="73" border disabled></el-checkbox>
                  <el-checkbox :label="74" border disabled></el-checkbox>
                  <el-checkbox :label="75" border disabled></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <div class="diagnosis-title">7. 不可设计附件牙齿<span class="diagnosis-tip">烤瓷牙，修复桥体等无法粘结附件</span></div>
            <el-form-item prop="teethAttachment" label-width="0px" :class="{'teeth-item': prescriptionForm.teethAttachment == 1}">
              <el-radio-group v-model="prescriptionForm.teethAttachment" class="common-select">
                <el-radio :label="0" border>无</el-radio>
                <el-radio :label="1" border class="select-long">以下牙齿不可设计附件</el-radio>
              </el-radio-group>
              <div v-show="prescriptionForm.teethAttachment == 1">
                <el-checkbox-group v-model="prescriptionForm.teethAttachmentOne" class="info-select">
                  <el-checkbox :label="55" border disabled></el-checkbox>
                  <el-checkbox :label="54" border disabled></el-checkbox>
                  <el-checkbox :label="53" border disabled></el-checkbox>
                  <el-checkbox :label="52" border disabled></el-checkbox>
                  <el-checkbox :label="51" border disabled></el-checkbox>
                  <el-checkbox :label="61" border disabled></el-checkbox>
                  <el-checkbox :label="62" border disabled></el-checkbox>
                  <el-checkbox :label="63" border disabled></el-checkbox>
                  <el-checkbox :label="64" border disabled></el-checkbox>
                  <el-checkbox :label="65" border disabled></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.teethAttachmentTwo" class="info-select">
                  <el-checkbox :label="18" border></el-checkbox>
                  <el-checkbox :label="17" border></el-checkbox>
                  <el-checkbox :label="16" border></el-checkbox>
                  <el-checkbox :label="15" border></el-checkbox>
                  <el-checkbox :label="14" border></el-checkbox>
                  <el-checkbox :label="13" border></el-checkbox>
                  <el-checkbox :label="12" border></el-checkbox>
                  <el-checkbox :label="11" border></el-checkbox>
                  <el-checkbox :label="21" border></el-checkbox>
                  <el-checkbox :label="22" border></el-checkbox>
                  <el-checkbox :label="23" border></el-checkbox>
                  <el-checkbox :label="24" border></el-checkbox>
                  <el-checkbox :label="25" border></el-checkbox>
                  <el-checkbox :label="26" border></el-checkbox>
                  <el-checkbox :label="27" border></el-checkbox>
                  <el-checkbox :label="28" border></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.teethAttachmentThree" class="info-select">
                  <el-checkbox :label="48" border></el-checkbox>
                  <el-checkbox :label="47" border></el-checkbox>
                  <el-checkbox :label="46" border></el-checkbox>
                  <el-checkbox :label="45" border></el-checkbox>
                  <el-checkbox :label="44" border></el-checkbox>
                  <el-checkbox :label="43" border></el-checkbox>
                  <el-checkbox :label="42" border></el-checkbox>
                  <el-checkbox :label="41" border></el-checkbox>
                  <el-checkbox :label="31" border></el-checkbox>
                  <el-checkbox :label="32" border></el-checkbox>
                  <el-checkbox :label="33" border></el-checkbox>
                  <el-checkbox :label="34" border></el-checkbox>
                  <el-checkbox :label="35" border></el-checkbox>
                  <el-checkbox :label="36" border></el-checkbox>
                  <el-checkbox :label="37" border></el-checkbox>
                  <el-checkbox :label="38" border></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.teethAttachmentFour" class="info-select">
                  <el-checkbox :label="85" border disabled></el-checkbox>
                  <el-checkbox :label="84" border disabled></el-checkbox>
                  <el-checkbox :label="83" border disabled></el-checkbox>
                  <el-checkbox :label="82" border disabled></el-checkbox>
                  <el-checkbox :label="81" border disabled></el-checkbox>
                  <el-checkbox :label="71" border disabled></el-checkbox>
                  <el-checkbox :label="72" border disabled></el-checkbox>
                  <el-checkbox :label="73" border disabled></el-checkbox>
                  <el-checkbox :label="74" border disabled></el-checkbox>
                  <el-checkbox :label="75" border disabled></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required facial">8. 面型</div>
            <el-form-item prop="surfaceType" label-width="0px">
              <el-radio-group v-model="prescriptionForm.surfaceType" class="common-select">
                <el-radio :label="1" border>维持</el-radio>
                <el-radio :label="2" border>改善</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required sagittal">9. 矢状关系</div>
            <el-form-item prop="sagittalRight" label="右">
              <el-radio-group v-model="prescriptionForm.sagittalRight" class="common-select">
                <el-radio :label="1" border>维持</el-radio>
                <el-radio :label="2" border class="select-long">仅改善尖牙关系</el-radio>
                <el-radio :label="3" border class="select-long">改善尖牙和磨牙关系</el-radio>
                <el-radio :label="4" border class="select-long">调整到中性关系</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="sagittalLeft" label="左">
              <el-radio-group v-model="prescriptionForm.sagittalLeft" class="common-select">
                <el-radio :label="1" border>维持</el-radio>
                <el-radio :label="2" border class="select-long">仅改善尖牙关系</el-radio>
                <el-radio :label="3" border class="select-long">改善尖牙和磨牙关系</el-radio>
                <el-radio :label="4" border class="select-long">调整到中性关系</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">10. 覆盖</div>
            <el-form-item prop="cover" label-width="0px">
              <el-radio-group v-model="prescriptionForm.cover" class="common-select">
                <el-radio :label="1" border>维持</el-radio>
                <el-radio :label="2" border>改善</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">11. 覆合</div>
            <el-form-item prop="combined" label-width="0px">
              <el-radio-group v-model="prescriptionForm.combined" class="common-select">
                <el-radio :label="1" border>维持</el-radio>
                <el-radio :label="2" border>纠正开合</el-radio>
                <el-radio :label="3" border class="select-long">纠正深覆合</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">12. 前牙反合/对刃合</div>
            <el-form-item prop="frontTeeth" label-width="0px">
              <el-radio-group v-model="prescriptionForm.frontTeeth" class="common-select">
                <el-radio :label="1" border>不纠正</el-radio>
                <el-radio :label="2" border class="select-long">纠正前牙反合</el-radio>
                <el-radio :label="3" border class="select-long">纠正前牙对刃合</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">13. 后牙反合或锁合</div>
            <el-form-item prop="afterTeeth" label-width="0px">
              <el-radio-group v-model="prescriptionForm.afterTeeth" class="common-select">
                <el-radio :label="1" border>不纠正</el-radio>
                <el-radio :label="2" border>纠正</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required midline">14. 中线</div>
            <el-form-item prop="midline" label-width="0px">
              <el-radio-group v-model="prescriptionForm.midline" class="common-select">
                <el-radio :label="1" border>维持中线</el-radio>
                <el-radio :label="2" border>改善中线</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">15. 间隙的矫治</div>
            <el-form-item prop="clearanceCorrectUp" label="上颌">
              <el-radio-group v-model="prescriptionForm.clearanceCorrectUp" class="common-select">
                <el-radio :label="1" border>前牙内收</el-radio>
                <el-radio :label="2" border class="select-long">前牙内收,后牙近移</el-radio>
                <el-radio :label="3" border>后牙近移</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="clearanceCorrectDown" label="下颌">
              <el-radio-group v-model="prescriptionForm.clearanceCorrectDown" class="common-select">
                <el-radio :label="1" border>前牙内收</el-radio>
                <el-radio :label="2" border class="select-long">前牙内收,后牙近移</el-radio>
                <el-radio :label="3" border>后牙近移</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">16. 拥挤的矫治</div>
            <el-form-item label="上颌">
              <el-form-item prop="enlargeBowUp" label="扩弓">
                <el-radio-group v-model="prescriptionForm.enlargeBowUp" class="common-select mb10">
                  <el-radio :label="1" border>首选</el-radio>
                  <el-radio :label="2" border>可选</el-radio>
                  <el-radio :label="3" border>不可</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="lipDipUp" label="唇倾">
                <el-radio-group v-model="prescriptionForm.lipDipUp" class="common-select mb10">
                  <el-radio :label="1" border>首选</el-radio>
                  <el-radio :label="2" border>可选</el-radio>
                  <el-radio :label="3" border>不可</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="adjacentGlazeUp" label="邻面去釉">
                <el-radio-group v-model="prescriptionForm.adjacentGlazeUp" class="common-select mb10">
                  <el-radio :label="1" border>首选</el-radio>
                  <el-radio :label="2" border>可选</el-radio>
                  <el-radio :label="3" border>不可</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="farRemovedMolarUp" label="远移磨牙">
                <el-radio-group v-model="prescriptionForm.farRemovedMolarUp" class="common-select">
                  <el-radio :label="1" border>右上</el-radio>
                  <el-radio :label="2" border>左上</el-radio>
                </el-radio-group>
                <span class="diagnosis-tip">注：若勾选远移磨牙，可能需配合种植支抗钉，并且X光为必选</span>
              </el-form-item>
            </el-form-item>
            <el-form-item label="下颌">
              <el-form-item prop="enlargeBowDown" label="扩弓">
                <el-radio-group v-model="prescriptionForm.enlargeBowDown" class="common-select mb10">
                  <el-radio :label="1" border>首选</el-radio>
                  <el-radio :label="2" border>可选</el-radio>
                  <el-radio :label="3" border>不可</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="lipDipDown" label="唇倾">
                <el-radio-group v-model="prescriptionForm.lipDipDown" class="common-select mb10">
                  <el-radio :label="1" border>首选</el-radio>
                  <el-radio :label="2" border>可选</el-radio>
                  <el-radio :label="3" border>不可</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="adjacentGlazeDown" label="邻面去釉">
                <el-radio-group v-model="prescriptionForm.adjacentGlazeDown" class="common-select mb10">
                  <el-radio :label="1" border>首选</el-radio>
                  <el-radio :label="2" border>可选</el-radio>
                  <el-radio :label="3" border>不可</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="farRemovedMolarDown" label="远移磨牙">
                <el-radio-group v-model="prescriptionForm.farRemovedMolarDown" class="common-select">
                  <el-radio :label="1" border>右上</el-radio>
                  <el-radio :label="2" border>左上</el-radio>
                </el-radio-group>
                <span class="diagnosis-tip">注：若勾选远移磨牙，可能需配合种植支抗钉，并且X光为必选</span>
              </el-form-item>
            </el-form-item>
            <el-form-item prop="toothExtraction" label="拔牙" :class="{'tooth-item': prescriptionForm.toothExtraction == 1}">
              <el-radio-group v-model="prescriptionForm.toothExtraction" class="common-select">
                <el-radio :label="0" border>不拔</el-radio>
                <el-radio :label="1" border class="select-long">拔除以下牙齿</el-radio>
              </el-radio-group>
              <div class="diagnosis-explain">低于第二磨牙牙根1/2以下的或尚为牙胚的智齿可不拔除</div>
              <div v-show="prescriptionForm.toothExtraction == 1">
                <el-checkbox-group v-model="prescriptionForm.toothExtractionOne" class="info-select">
                  <el-checkbox :label="18" border></el-checkbox>
                  <el-checkbox :label="17" border></el-checkbox>
                  <el-checkbox :label="16" border></el-checkbox>
                  <el-checkbox :label="15" border></el-checkbox>
                  <el-checkbox :label="14" border></el-checkbox>
                  <el-checkbox :label="13" border></el-checkbox>
                  <el-checkbox :label="12" border></el-checkbox>
                  <el-checkbox :label="11" border></el-checkbox>
                  <el-checkbox :label="21" border></el-checkbox>
                  <el-checkbox :label="22" border></el-checkbox>
                  <el-checkbox :label="23" border></el-checkbox>
                  <el-checkbox :label="24" border></el-checkbox>
                  <el-checkbox :label="25" border></el-checkbox>
                  <el-checkbox :label="26" border></el-checkbox>
                  <el-checkbox :label="27" border></el-checkbox>
                  <el-checkbox :label="28" border></el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="prescriptionForm.toothExtractionTwo" class="info-select">
                  <el-checkbox :label="48" border></el-checkbox>
                  <el-checkbox :label="47" border></el-checkbox>
                  <el-checkbox :label="46" border></el-checkbox>
                  <el-checkbox :label="45" border></el-checkbox>
                  <el-checkbox :label="44" border></el-checkbox>
                  <el-checkbox :label="43" border></el-checkbox>
                  <el-checkbox :label="42" border></el-checkbox>
                  <el-checkbox :label="41" border></el-checkbox>
                  <el-checkbox :label="31" border></el-checkbox>
                  <el-checkbox :label="32" border></el-checkbox>
                  <el-checkbox :label="33" border></el-checkbox>
                  <el-checkbox :label="34" border></el-checkbox>
                  <el-checkbox :label="35" border></el-checkbox>
                  <el-checkbox :label="36" border></el-checkbox>
                  <el-checkbox :label="37" border></el-checkbox>
                  <el-checkbox :label="38" border></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required nails">17. 是否配合种植支抗钉</div>
            <el-form-item prop="plantingNail" label-width="0px">
              <el-radio-group v-model="prescriptionForm.plantingNail" class="common-select">
                <el-radio :label="1" border>是</el-radio>
                <el-radio :label="2" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">18. 颞下颌关节是否存在异常</div>
            <el-form-item prop="temporomandibularJoint" label-width="0px">
              <el-radio-group v-model="prescriptionForm.temporomandibularJoint" class="common-select">
                <el-radio :label="1" border>是</el-radio>
                <el-radio :label="2" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">19. 是否远程矫治</div>
            <el-form-item prop="remoteTreatments" label-width="0px">
              <el-radio-group v-model="prescriptionForm.remoteTreatments" class="common-select">
                <el-radio :label="1" border>是</el-radio>
                <el-radio :label="2" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title">20. 特殊说明</div>
            <el-form-item prop="specialInstructions" label-width="0px">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="描述请限制在2000字以内（误删可使用“ctrl+z”撤销误操作）"
                v-model="prescriptionForm.specialInstructions">
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :name="3">
          <span slot="label"><i class="el-icon-video-camera"></i> 影像资料及模型<i class="el-icon-arrow-right arrow-style"></i></span>
          <el-row class="form-main">
            <el-col :span="24">
              <div class="diagnosis-title diagnosis-title-required photos">照片信息</div>
              <div class="diagnosis-desc">面相照及口内照</div>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSimle"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.frontSmilingPath" :src="prescriptionForm.frontSmilingPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">正面微笑照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessFront"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.frontPath" :src="prescriptionForm.frontPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">正面照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSide"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.sidePath" :src="prescriptionForm.sidePath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">侧面照</div>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSideUpJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.upJawPath" :src="prescriptionForm.upJawPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">上颌口内照</div>
                </el-col>
                <el-col :span="8">
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessDownJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.downJawPath" :src="prescriptionForm.downJawPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">下颌口内照</div>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessRightJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.rightJawPath" :src="prescriptionForm.rightJawPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">右侧口内照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessFrontJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.frontJawPath" :src="prescriptionForm.frontJawPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">正面口内照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessLeftJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.leftJawPath" :src="prescriptionForm.leftJawPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc img-desc-required">左侧口内照</div>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <div class="diagnosis-desc">X光照片</div>
                </el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8">
                  <div class="diagnosis-desc">其他影像</div>
                </el-col>
              </el-row>
              <el-row class="mt12">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessAllXray"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.allXrayPath" :src="prescriptionForm.allXrayPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc">全景片</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSideXray"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.sideXrayPath" :src="prescriptionForm.sideXrayPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc">侧位片</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessOtherXray"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="prescriptionForm.otherXrayPath" :src="prescriptionForm.otherXrayPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc">其他</div>
                </el-col>
              </el-row>
              <div class="diagnosis-title diagnosis-title-required mt20 dental">牙颌模型</div>
              <el-tabs v-model="activeName" class="model-tabs">
                <el-tab-pane label="数字模型文件" name="first">
                  <div class="number-title">本地上传</div>
                  <el-row>
                    <el-col span="10">
                      <div class="up-title">上颌</div>
                      <el-upload
                        class="ml56"
                        action=""
                        accept=".stl"
                        :show-file-list="false"
                        :http-request="showProcess"
                        :on-success="handleImgSuccessUpJawModel"
                        :before-upload="beforeImgUploadJawModel"
                        :on-error="handleError">
                        <div v-if="prescriptionForm.upJawModelName">
                          <el-button icon="el-icon-file" class="model-icon-btn">{{prescriptionForm.upJawModelName}}</el-button>
                        </div>
                        <div v-else>
                          <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                        </div>
                      </el-upload>
                      <el-button class="remove-up-btn" v-if="prescriptionForm.upJawModelName" type="text" @click="removeUpJawModel">删除</el-button>
                      <div class="down-title">下颌</div>
                      <el-upload
                        class="mt20 ml56"
                        action=""
                        accept=".stl"
                        :show-file-list="false"
                        :http-request="showProcess"
                        :on-success="handleImgSuccessDownJawModel"
                        :before-upload="beforeImgUploadJawModel"
                        :on-error="handleError">
                        <div v-if="prescriptionForm.downJawModelName">
                          <el-button icon="el-icon-file" class="model-icon-btn">{{prescriptionForm.downJawModelName}}</el-button>
                        </div>
                        <div v-else>
                          <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                        </div>
                      </el-upload>
                      <el-button class="remove-down-btn" v-if="prescriptionForm.downJawModelName" type="text" @click="removeDownJawModel">删除</el-button>
                    </el-col>
                    <el-col span="14">
                      <div class="jaw-model-desc">
                        <div>1.口扫时扫过咬合，导出的上颌STL、下颌STL就会自动带上咬合数据。</div>
                        <!-- <div>2.如需上传其他数据，请选择邮件发送，根据提示发送至邮箱即可。</div> -->
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <!-- <el-tab-pane label="硅橡胶模型" name="second"></el-tab-pane> -->
              </el-tabs>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :name="4">
          <span slot="label"><i class="el-icon-document-checked"></i> 提交</span>
          <div class="error-submit">
            <div v-show="showInfo || showPrescription || showFiles">
              <div class="error-submit-tip">
                <i class="el-icon-warning-outline error-submit-icon"></i>
                <span>您还有以下项目待完善，请确认无误后再提交</span>
              </div>
              <div class="error-submit-noFilled">
                <div class="mb20" v-show="showInfo">
                  <span class="error-submit-noFilled-type">基本信息</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="!infoForm.name" class="error-submit-noFilled-content-every" @click="clickToInfo('name')">患者姓名</div>
                    <div v-show="!infoForm.doctorId && !currentIsDoctor" class="error-submit-noFilled-content-every" @click="clickToInfo('doctorId')">所属医生</div>
                    <div v-show="!(infoForm.sex + '') || infoForm.sex === -1" class="error-submit-noFilled-content-every" @click="clickToInfo('sex')">性别</div>
                    <div v-show="!infoForm.birthday" class="error-submit-noFilled-content-every" @click="clickToInfo('birthday')">出生日期</div>
                    <div v-show="!infoForm.annType || infoForm.annType === -1" class="error-submit-noFilled-content-every" @click="clickToInfo('annType')">安氏分类</div>
                    <div v-show="!infoForm.malocclusionType.length" class="error-submit-noFilled-content-every" @click="clickToInfo('malocclusionType')">错合类型</div>
                  </div>
                </div>
                <div class="mb20" v-show="showPrescription">
                  <span class="error-submit-noFilled-type">诊断及矫治说明</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="!(prescriptionForm.ccTeeth.length || prescriptionForm.ccJaw.length)" class="error-submit-noFilled-content-every" @click="clickToDesc('chief')">主诉</div>
                    <div v-show="!prescriptionForm.teeth.length" class="error-submit-noFilled-content-every" @click="clickToDesc('goals')">主要矫治目标</div>
                    <div v-show="!prescriptionForm.orthodonticJaw || prescriptionForm.orthodonticJaw === -1" class="error-submit-noFilled-content-every" @click="clickToDesc('orthodontics')">拟矫治牙颌</div>
                    <div v-show="!prescriptionForm.surfaceType || prescriptionForm.surfaceType === -1" class="error-submit-noFilled-content-every" @click="clickToDesc('facial')">面型</div>
                    <div v-show="!(prescriptionForm.sagittalRight || prescriptionForm.sagittalLeft) || (prescriptionForm.sagittalRight === -1 && prescriptionForm.sagittalLeft === -1)" class="error-submit-noFilled-content-every" @click="clickToDesc('sagittal')">矢状关系</div>
                    <div v-show="!prescriptionForm.midline || prescriptionForm.midline === -1" class="error-submit-noFilled-content-every" @click="clickToDesc('midline')">中线</div>
                    <div v-show="!prescriptionForm.plantingNail || prescriptionForm.plantingNail === -1" class="error-submit-noFilled-content-every" @click="clickToDesc('nails')">是否配合种植支抗钉</div>
                  </div>
                </div>
                <div v-show="showFiles">
                  <span class="error-submit-noFilled-type">影像资料及模型</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="showPhoto" class="error-submit-noFilled-content-every" @click="clickToPhoto('photos')">照片</div>
                    <div v-show="!(prescriptionForm.upJawModelPath && prescriptionForm.downJawModelPath)" class="error-submit-noFilled-content-every" @click="clickToPhoto('dental')">牙颌模型</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="!(showInfo || showPrescription || showFiles)" class="error-submitTrue">
              <i class="el-icon-circle-check error-submitTrue-img"></i>
              <div class="error-submitTrue-tip">
                <div>资料收集完毕，请点击提交</div>
                <div>提交后，我司将尽快为您处理！</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="all-add-footer" :class="{'doctor-footer': currentIsDoctor}">
      <el-button v-show="active>1" icon="el-icon-arrow-left" @click="prev">上一页</el-button>
      <el-button v-show="active<4" @click="next">下一页 <i class="el-icon-arrow-right"></i></el-button>
      <el-button type="primary" v-show="active<4 || showInfo || showPrescription || showFiles" plain @click="caseSave('preserve')">暂存</el-button>
      <el-button type="primary" v-show="active === 4 && !(showInfo || showPrescription || showFiles)" plain @click="caseSave('submit')">提交</el-button>
    </div>
    <el-dialog
      title="上传进度"
      :visible.sync="uploadVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="percentageNumber"></el-progress>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  selectDoctor,
  saveCase,
  preserveCase,
  getDetails,
  updateCase,
} from "@/api/case/commonCase";
import { uploadOBS } from "@/util/obs";
export default {
  name: "AddEditCase",
  data() {
    let checkNameReg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入患者姓名'));
      } else {
        if (value.length <= 100) {
          return callback();
        }
        callback(new Error('患者姓名必须在100字符以内'));
      }
    }
    return {
      active: 1,
      infoForm: {
        name: "",
        doctorId: "",
        sex: "",
        birthday: "",
        annType: "",
        bonyType: "",
        malocclusionType: [],
      },
      infoRules: {
        name: [
          { required: true, validator: checkNameReg, trigger: 'blur' },
        ],
        doctorId: [
          { required: true, message: '请选择所属医生', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' },
        ],
        annType: [
          { required: true, message: '请选择安氏分类', trigger: 'blur' },
        ],
        malocclusionType: [
          { required: true, message: '请选择错合类型', trigger: 'blur' },
        ],
      },
      doctorOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      prescriptionForm: {
        ccTeeth: [],
        ccJaw: [],
        teeth: [],
        orthodonticJaw: "",
        teethInformationOne: [],
        teethInformationTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
        teethInformationThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
        teethInformationFour: [],
        teethClearance: 0,
        teethClearance1: "",
        teethClearance2: "",
        teethClearance3: "",
        teethClearance4: "",
        teethClearance5: "",
        teethClearance6: "",
        teethClearance7: "",
        teethClearance8: "",
        teethClearance9: "",
        teethClearance10: "",
        teethClearance11: "",
        teethClearance12: "",
        teethClearance13: "",
        teethClearance14: "",
        teethClearance15: "",
        teethClearance16: "",
        teethClearance17: "",
        teethClearance18: "",
        teethClearance19: "",
        teethClearance20: "",
        teethClearance21: "",
        teethClearance22: "",
        teethClearance23: "",
        teethClearance24: "",
        teethClearance25: "",
        teethClearance26: "",
        teethClearance27: "",
        teethClearance28: "",
        teethClearance29: "",
        teethClearance30: "",
        teethMobile: 0,
        teethMobileOne: [],
        teethMobileTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
        teethMobileThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
        teethMobileFour: [],
        teethAttachment: 0,
        teethAttachmentOne: [],
        teethAttachmentTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
        teethAttachmentThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
        teethAttachmentFour: [],
        surfaceType: "",
        sagittalRight: "",
        sagittalLeft: "",
        cover: "",
        combined: "",
        frontTeeth: "",
        afterTeeth: "",
        midline: "",
        clearanceCorrectUp: "",
        clearanceCorrectDown: "",
        enlargeBowUp: "",
        lipDipUp: "",
        adjacentGlazeUp: "",
        farRemovedMolarUp: "",
        enlargeBowDown: "",
        lipDipDown: "",
        adjacentGlazeDown: "",
        farRemovedMolarDown: "",
        toothExtraction: 0,
        toothExtractionOne: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
        toothExtractionTwo: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
        plantingNail: "",
        temporomandibularJoint: "",
        remoteTreatments: "",
        specialInstructions: "",
        frontSmilingPath: "",
        frontPath: "",
        sidePath: "",
        upJawPath: "",
        downJawPath: "",
        rightJawPath: "",
        frontJawPath: "",
        leftJawPath: "",
        allXrayPath: "",
        sideXrayPath: "",
        otherXrayPath: "",
        upJawModelPath: "",
        upJawModelName: "",
        downJawModelPath: "",
        downJawModelName: "",
      },
      activeName: "first",
      currentCaseId: "",
      currentIsEdit: false,
      currentIsDoctor: false,
      addRecordId: "",
      uploadVisible: false,
      percentageNumber: 0,
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    showInfo () {
      return !this.infoForm.name
          || (!this.infoForm.doctorId && !this.currentIsDoctor)
          || !(this.infoForm.sex + '')
          || this.infoForm.sex === -1
          || !this.infoForm.birthday
          || !this.infoForm.annType
          || this.infoForm.annType === -1
          || !this.infoForm.malocclusionType.length;
    },
    showPrescription() {
      return !(this.prescriptionForm.ccTeeth.length || this.prescriptionForm.ccJaw.length)
          || !this.prescriptionForm.teeth.length
          || !this.prescriptionForm.orthodonticJaw
          || this.prescriptionForm.orthodonticJaw === -1
          || !this.prescriptionForm.surfaceType
          || this.prescriptionForm.surfaceType === -1
          || !(this.prescriptionForm.sagittalRight || this.prescriptionForm.sagittalLeft)
          || (this.prescriptionForm.sagittalRight === -1 && this.prescriptionForm.sagittalLeft === -1)
          || !this.prescriptionForm.midline
          || this.prescriptionForm.midline === -1
          || !this.prescriptionForm.plantingNail
          || this.prescriptionForm.plantingNail === -1;
    },
    showPhoto() {
      return !this.prescriptionForm.frontSmilingPath
          || !this.prescriptionForm.frontPath
          || !this.prescriptionForm.sidePath
          || !this.prescriptionForm.upJawPath
          || !this.prescriptionForm.downJawPath
          || !this.prescriptionForm.rightJawPath
          || !this.prescriptionForm.frontJawPath
          || !this.prescriptionForm.leftJawPath;
    },
    showFiles() {
      return this.showPhoto || !(this.prescriptionForm.upJawModelPath && this.prescriptionForm.downJawModelPath);
    },
  },
  created() {
    selectDoctor().then(res => {
      this.doctorOptions = res.data.data;
    });
    this.currentCaseId = this.$route.query.id || "";
    this.currentIsEdit = this.$route.query.isEdit || false;
    this.currentIsDoctor = this.$route.query.isDoctor || false;
    if (this.currentCaseId) {
      this.getCaseDetails(this.currentCaseId);
    }
    if (this.currentIsDoctor) {
      this.infoForm.doctorId = this.userInfo.userId;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    prev() {
      this.active--;
    },
    next() {
      this.active++;
    },
    firstClick() {
      this.active = 1;
    },
    secondClick() {
      this.active = 2;
    },
    thirdClick() {
      this.active = 3;
    },
    fourthClick() {
      this.active = 4;
    },
    handleImgSuccessSimle(res, file) {
      const data = res.data || {};
      this.prescriptionForm.frontSmilingPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessFront(res, file) {
      const data = res.data || {};
      this.prescriptionForm.frontPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessSide(res, file) {
      const data = res.data || {};
      this.prescriptionForm.sidePath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessSideUpJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.upJawPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessDownJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.downJawPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessRightJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.rightJawPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessFrontJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.frontJawPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessLeftJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.leftJawPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessAllXray(res, file) {
      const data = res.data || {};
      this.prescriptionForm.allXrayPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessSideXray(res, file) {
      const data = res.data || {};
      this.prescriptionForm.sideXrayPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    handleImgSuccessOtherXray(res, file) {
      const data = res.data || {};
      this.prescriptionForm.otherXrayPath = data.viewStlUrl;
      this.uploadVisible = false;
    },
    beforeImgUpload(file) {
      if (file.type) {
        this.percentageNumber = 0;
        this.uploadVisible = true;
      }
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';

      if (!isJPG && !isPNG) {
        this.$message.error('您只能上传 jpg/png 类型的图片!');
      }
      return isJPG || isPNG;
    },
    async showProcess(params) {
      //调用分段上传OBS方法
      return await uploadOBS(params.file, 'order/photo', (percentage) => {
        this.percentageNumber = parseInt(percentage);
        // 更新进度条
        params.onProgress({percent: percentage});
      });
    },
    handleError(err) {
      this.uploadVisible = false;
      this.$message.warning(err.msg);
      return false;
    },
    handleImgSuccessUpJawModel(res, file) {
      const data = res.data || {};
      this.prescriptionForm.upJawModelPath = data.viewStlUrl;
      this.prescriptionForm.upJawModelName = data.originalName;
      this.uploadVisible = false;
    },
    beforeImgUploadJawModel(file) {
      if (file.name) {
        this.percentageNumber = 0;
        this.uploadVisible = true;
      }
      const isSTL = file.name.toLocaleLowerCase().substring(file.name.lastIndexOf('.')) === ".stl";
      if (!isSTL) {
        this.$message.error('您只能上传 stl 类型的文件!');
      }
      return isSTL;
    },
    handleImgSuccessDownJawModel(res, file) {
      const data = res.data || {};
      this.prescriptionForm.downJawModelPath = data.viewStlUrl;
      this.prescriptionForm.downJawModelName = data.originalName;
      this.uploadVisible = false;
    },
    removeUpJawModel() {
      this.prescriptionForm.upJawModelPath = "";
      this.prescriptionForm.upJawModelName = "";
    },
    removeDownJawModel() {
      this.prescriptionForm.downJawModelPath = "";
      this.prescriptionForm.downJawModelName = "";
    },
    clickToInfo(className) {
      this.active = 1;
      this.$nextTick(() => {
        document.querySelector("."+className).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      });
    },
    clickToDesc(className) {
      this.active = 2;
      this.$nextTick(() => {
        document.querySelector("."+className).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      });
    },
    clickToPhoto(className) {
      this.active = 3;
      this.$nextTick(() => {
        document.querySelector("."+className).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      });
    },
    caseSave(state) {
      let data = {};
      if (this.infoForm.name) {
        data.name = this.infoForm.name;
      }
      if (this.currentIsDoctor) {
        data.doctorId = this.userInfo.userId;
      } else {
        if (this.infoForm.doctorId) {
          data.doctorId = this.infoForm.doctorId;
        }
      }
      if (this.infoForm.sex+'') {
        data.sex = this.infoForm.sex;
      }
      if (this.infoForm.birthday) {
        data.birthday = this.infoForm.birthday;
      }
      if (this.infoForm.annType) {
        data.annType = this.infoForm.annType;
      }
      if (this.infoForm.bonyType) {
        data.bonyType = this.infoForm.bonyType;
      }
      if (this.infoForm.malocclusionType.length) {
        data.malocclusionType = this.infoForm.malocclusionType.join(",");
      }
      if (this.prescriptionForm.ccTeeth.length) {
        data.ccTeeth = this.prescriptionForm.ccTeeth.join(",");
      }
      if (this.prescriptionForm.ccJaw.length) {
        data.ccJaw = this.prescriptionForm.ccJaw.join(",");
      }
      if (this.prescriptionForm.teeth.length) {
        data.teeth = this.prescriptionForm.teeth.join(",");
      }
      if (this.prescriptionForm.orthodonticJaw) {
        data.orthodonticJaw = this.prescriptionForm.orthodonticJaw;
      }
      let teethInformationString = "";
      if (this.prescriptionForm.teethInformationOne.length) {
        teethInformationString = this.prescriptionForm.teethInformationOne.join(",");
      }
      if (this.prescriptionForm.teethInformationTwo.length) {
        if (teethInformationString) {
          teethInformationString = teethInformationString + ',' + this.prescriptionForm.teethInformationTwo.join(",");
        } else {
          teethInformationString = this.prescriptionForm.teethInformationTwo.join(",");
        }
      }
      if (this.prescriptionForm.teethInformationThree.length) {
        if (teethInformationString) {
          teethInformationString = teethInformationString + ',' + this.prescriptionForm.teethInformationThree.join(",");
        } else {
          teethInformationString = this.prescriptionForm.teethInformationThree.join(",");
        }
      }
      if (this.prescriptionForm.teethInformationFour.length) {
        if (teethInformationString) {
          teethInformationString = teethInformationString + ',' + this.prescriptionForm.teethInformationFour.join(",");
        } else {
          teethInformationString = this.prescriptionForm.teethInformationFour.join(",");
        }
      }
      if (teethInformationString) {
        data.teethInformation = teethInformationString;
      }
      if (this.prescriptionForm.teethClearance === 0) {
        data.teethClearance = this.prescriptionForm.teethClearance;
      } else {
        data.teethClearance = (this.prescriptionForm.teethClearance1||'none')+','+(this.prescriptionForm.teethClearance2||'none')
                        +','+(this.prescriptionForm.teethClearance3||'none')+','+(this.prescriptionForm.teethClearance4||'none')+','+(this.prescriptionForm.teethClearance5||'none')
                        +','+(this.prescriptionForm.teethClearance6||'none')+','+(this.prescriptionForm.teethClearance7||'none')
                        +','+(this.prescriptionForm.teethClearance8||'none')+','+(this.prescriptionForm.teethClearance9||'none')+','+(this.prescriptionForm.teethClearance10||'none')
                        +','+(this.prescriptionForm.teethClearance11||'none')+','+(this.prescriptionForm.teethClearance12||'none')
                        +','+(this.prescriptionForm.teethClearance13||'none')+','+(this.prescriptionForm.teethClearance14||'none')+','+(this.prescriptionForm.teethClearance15||'none')
                        +','+(this.prescriptionForm.teethClearance16||'none')+','+(this.prescriptionForm.teethClearance17||'none')
                        +','+(this.prescriptionForm.teethClearance18||'none')+','+(this.prescriptionForm.teethClearance19||'none')+','+(this.prescriptionForm.teethClearance20||'none')
                        +','+(this.prescriptionForm.teethClearance21||'none')+','+(this.prescriptionForm.teethClearance22||'none')
                        +','+(this.prescriptionForm.teethClearance23||'none')+','+(this.prescriptionForm.teethClearance24||'none')+','+(this.prescriptionForm.teethClearance25||'none')
                        +','+(this.prescriptionForm.teethClearance26||'none')+','+(this.prescriptionForm.teethClearance27||'none')
                        +','+(this.prescriptionForm.teethClearance28||'none')+','+(this.prescriptionForm.teethClearance29||'none')+','+(this.prescriptionForm.teethClearance30||'none')
      }
      if (this.prescriptionForm.teethMobile === 0) {
        data.teethMobile = this.prescriptionForm.teethMobile;
      } else {
        let teethMobileString = "";
        if (this.prescriptionForm.teethMobileOne.length) {
          teethMobileString = this.prescriptionForm.teethMobileOne.join(",");
        }
        if (this.prescriptionForm.teethMobileTwo.length) {
          if (teethMobileString) {
            teethMobileString = teethMobileString + ',' + this.prescriptionForm.teethMobileTwo.join(",");
          } else {
            teethMobileString = this.prescriptionForm.teethMobileTwo.join(",");
          }
        }
        if (this.prescriptionForm.teethMobileThree.length) {
          if (teethMobileString) {
            teethMobileString = teethMobileString + ',' + this.prescriptionForm.teethMobileThree.join(",");
          } else {
            teethMobileString = this.prescriptionForm.teethMobileThree.join(",");
          }
        }
        if (this.prescriptionForm.teethMobileFour.length) {
          if (teethMobileString) {
            teethMobileString = teethMobileString + ',' + this.prescriptionForm.teethMobileFour.join(",");
          } else {
            teethMobileString = this.prescriptionForm.teethMobileFour.join(",");
          }
        }
        if (teethMobileString) {
          data.teethMobile = teethMobileString;
        }
      }
      if (this.prescriptionForm.teethAttachment === 0) {
        data.teethAttachment = this.prescriptionForm.teethAttachment;
      } else {
        let teethAttachmentString = "";
        if (this.prescriptionForm.teethAttachmentOne.length) {
          teethAttachmentString = this.prescriptionForm.teethAttachmentOne.join(",");
        }
        if (this.prescriptionForm.teethAttachmentTwo.length) {
          if (teethAttachmentString) {
            teethAttachmentString = teethAttachmentString + ',' + this.prescriptionForm.teethAttachmentTwo.join(",");
          } else {
            teethAttachmentString = this.prescriptionForm.teethAttachmentTwo.join(",");
          }
        }
        if (this.prescriptionForm.teethAttachmentThree.length) {
          if (teethAttachmentString) {
            teethAttachmentString = teethAttachmentString + ',' + this.prescriptionForm.teethAttachmentThree.join(",");
          } else {
            teethAttachmentString = this.prescriptionForm.teethAttachmentThree.join(",");
          }
        }
        if (this.prescriptionForm.teethAttachmentFour.length) {
          if (teethAttachmentString) {
            teethAttachmentString = teethAttachmentString + ',' + this.prescriptionForm.teethAttachmentFour.join(",");
          } else {
            teethAttachmentString = this.prescriptionForm.teethAttachmentFour.join(",");
          }
        }
        if (teethAttachmentString) {
          data.teethAttachment = teethAttachmentString;
        }
      }
      if (this.prescriptionForm.surfaceType) {
        data.surfaceType = this.prescriptionForm.surfaceType;
      }
      if (this.prescriptionForm.sagittalRight) {
        data.sagittalRight = this.prescriptionForm.sagittalRight;
      }
      if (this.prescriptionForm.sagittalLeft) {
        data.sagittalLeft = this.prescriptionForm.sagittalLeft;
      }
      if (this.prescriptionForm.cover) {
        data.cover = this.prescriptionForm.cover;
      }
      if (this.prescriptionForm.combined) {
        data.combined = this.prescriptionForm.combined;
      }
      if (this.prescriptionForm.frontTeeth) {
        data.frontTeeth = this.prescriptionForm.frontTeeth;
      }
      if (this.prescriptionForm.afterTeeth) {
        data.afterTeeth = this.prescriptionForm.afterTeeth;
      }
      if (this.prescriptionForm.midline) {
        data.midline = this.prescriptionForm.midline;
      }
      if (this.prescriptionForm.clearanceCorrectUp) {
        data.clearanceCorrectUp = this.prescriptionForm.clearanceCorrectUp;
      }
      if (this.prescriptionForm.clearanceCorrectDown) {
        data.clearanceCorrectDown = this.prescriptionForm.clearanceCorrectDown;
      }
      if (this.prescriptionForm.enlargeBowUp) {
        data.enlargeBowUp = this.prescriptionForm.enlargeBowUp;
      }
      if (this.prescriptionForm.lipDipUp) {
        data.lipDipUp = this.prescriptionForm.lipDipUp;
      }
      if (this.prescriptionForm.adjacentGlazeUp) {
        data.adjacentGlazeUp = this.prescriptionForm.adjacentGlazeUp;
      }
      if (this.prescriptionForm.farRemovedMolarUp) {
        data.farRemovedMolarUp = this.prescriptionForm.farRemovedMolarUp;
      }
      if (this.prescriptionForm.enlargeBowDown) {
        data.enlargeBowDown = this.prescriptionForm.enlargeBowDown;
      }
      if (this.prescriptionForm.lipDipDown) {
        data.lipDipDown = this.prescriptionForm.lipDipDown;
      }
      if (this.prescriptionForm.adjacentGlazeDown) {
        data.adjacentGlazeDown = this.prescriptionForm.adjacentGlazeDown;
      }
      if (this.prescriptionForm.farRemovedMolarDown) {
        data.farRemovedMolarDown = this.prescriptionForm.farRemovedMolarDown;
      }
      if (this.prescriptionForm.toothExtraction === 0) {
        data.toothExtraction = this.prescriptionForm.toothExtraction;
      } else {
        let toothExtractionString = "";
        if (this.prescriptionForm.toothExtractionOne.length) {
          toothExtractionString = this.prescriptionForm.toothExtractionOne.join(",");
        }
        if (this.prescriptionForm.toothExtractionTwo.length) {
          if (toothExtractionString) {
            toothExtractionString = toothExtractionString + ',' + this.prescriptionForm.toothExtractionTwo.join(",");
          } else {
            toothExtractionString = this.prescriptionForm.toothExtractionTwo.join(",");
          }
        }
        if (toothExtractionString) {
          data.toothExtraction = toothExtractionString;
        }
      }
      if (this.prescriptionForm.plantingNail) {
        data.plantingNail = this.prescriptionForm.plantingNail;
      }
      if (this.prescriptionForm.temporomandibularJoint) {
        data.temporomandibularJoint = this.prescriptionForm.temporomandibularJoint;
      }
      if (this.prescriptionForm.remoteTreatments) {
        data.remoteTreatments = this.prescriptionForm.remoteTreatments;
      }
      if (this.prescriptionForm.specialInstructions) {
        data.specialInstructions = this.prescriptionForm.specialInstructions;
      }
      if (this.prescriptionForm.frontSmilingPath) {
        data.frontSmilingPath = this.prescriptionForm.frontSmilingPath;
      }
      if (this.prescriptionForm.frontPath) {
        data.frontPath = this.prescriptionForm.frontPath;
      }
      if (this.prescriptionForm.sidePath) {
        data.sidePath = this.prescriptionForm.sidePath;
      }
      if (this.prescriptionForm.upJawPath) {
        data.upJawPath = this.prescriptionForm.upJawPath;
      }
      if (this.prescriptionForm.downJawPath) {
        data.downJawPath = this.prescriptionForm.downJawPath;
      }
      if (this.prescriptionForm.rightJawPath) {
        data.rightJawPath = this.prescriptionForm.rightJawPath;
      }
      if (this.prescriptionForm.frontJawPath) {
        data.frontJawPath = this.prescriptionForm.frontJawPath;
      }
      if (this.prescriptionForm.leftJawPath) {
        data.leftJawPath = this.prescriptionForm.leftJawPath;
      }
      if (this.prescriptionForm.allXrayPath) {
        data.allXrayPath = this.prescriptionForm.allXrayPath;
      }
      if (this.prescriptionForm.sideXrayPath) {
        data.sideXrayPath = this.prescriptionForm.sideXrayPath;
      }
      if (this.prescriptionForm.otherXrayPath) {
        data.otherXrayPath = this.prescriptionForm.otherXrayPath;
      }
      if (this.prescriptionForm.upJawModelPath) {
        data.upJawModelPath = this.prescriptionForm.upJawModelPath;
      }
      if (this.prescriptionForm.upJawModelName) {
        data.upJawModelName = this.prescriptionForm.upJawModelName;
      }
      if (this.prescriptionForm.downJawModelPath) {
        data.downJawModelPath = this.prescriptionForm.downJawModelPath;
      }
      if (this.prescriptionForm.downJawModelName) {
        data.downJawModelName = this.prescriptionForm.downJawModelName;
      }
      if (state === "preserve") {
        if (this.infoForm.doctorId) {
          if (this.currentIsEdit) {
            data.recordId = this.currentCaseId;
          }
          if (!this.currentIsEdit && this.addRecordId) {
            data.recordId = this.addRecordId;
          }
          preserveCase(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "暂存成功!"
              });
              let resData = res.data.data;
              if (!this.currentIsEdit && resData.length) {
                this.addRecordId = resData[0];
              }
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "所属医生必须选择!"
          });
        }
      } else if(state === "submit") {
        if (this.currentIsEdit) {
          data.recordId = this.currentCaseId;
          updateCase(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "修改病例成功!"
              });
              if (this.currentIsDoctor) {
                this.$router.push({path: "/doctor/list"});
              } else {
                this.$router.push({path: "/case/all"});
              }
            }
          });
        } else {
          saveCase(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "新建病例成功!"
              });
              if (this.currentIsDoctor) {
                this.$router.push({path: "/doctor/list"});
              } else {
                this.$router.push({path: "/case/all"});
              }
            }
          });
        }
      } else {
        // 不存在这种情况，不做操作
      }
    },
    getArrEqual(arr1, arr2) {
      return arr1.filter(item => arr2.indexOf(item)>-1);
    },
    getCaseDetails(id) {
      const params = {
        id: id,
      };
      getDetails(params).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.infoForm.name = data.prescription.name;
          if (!this.currentIsDoctor) {
            this.infoForm.doctorId = data.record.doctorId;
          }
          this.infoForm.sex = data.prescription.sex;
          this.infoForm.birthday = data.prescription.birthday;
          this.infoForm.annType = data.prescription.annType;
          this.infoForm.bonyType = data.prescription.bonyType;
          this.infoForm.malocclusionType = data.prescription.malocclusionType ? data.prescription.malocclusionType.split(",").map(Number) : [];
          this.prescriptionForm.ccTeeth = data.prescription.ccTeeth ? data.prescription.ccTeeth.split(",").map(Number) : [];
          this.prescriptionForm.ccJaw = data.prescription.ccJaw ? data.prescription.ccJaw.split(",").map(Number) : [];
          this.prescriptionForm.teeth = data.prescription.teeth ? data.prescription.teeth.split(",").map(Number) : [];
          this.prescriptionForm.orthodonticJaw = data.prescription.orthodonticJaw;
          let arrayOne = [55,54,53,52,51,61,62,63,64,65];
          let arrayTwo = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
          let arrayThree = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
          let arrayFour = [85,84,83,82,81,71,72,73,74,75];
          let teethInformationArray = data.prescription.teethInformation ? data.prescription.teethInformation.split(",").map(Number) : [];
          this.prescriptionForm.teethInformationOne = this.getArrEqual(arrayOne, teethInformationArray);
          this.prescriptionForm.teethInformationTwo = this.getArrEqual(arrayTwo, teethInformationArray);
          this.prescriptionForm.teethInformationThree = this.getArrEqual(arrayThree, teethInformationArray);
          this.prescriptionForm.teethInformationFour = this.getArrEqual(arrayFour, teethInformationArray);
          if (Number(data.prescription.teethClearance) == 0) {
            this.prescriptionForm.teethClearance = 0;
          } else {
            this.prescriptionForm.teethClearance = 1;
            let clearArray = data.prescription.teethClearance.split(",");
            this.prescriptionForm.teethClearance1 = clearArray[0] == "none" ? "" : Number(clearArray[0]);
            this.prescriptionForm.teethClearance2 = clearArray[1] == "none" ? "" : Number(clearArray[1]);
            this.prescriptionForm.teethClearance3 = clearArray[2] == "none" ? "" : Number(clearArray[2]);
            this.prescriptionForm.teethClearance4 = clearArray[3] == "none" ? "" : Number(clearArray[3]);
            this.prescriptionForm.teethClearance5 = clearArray[4] == "none" ? "" : Number(clearArray[4]);
            this.prescriptionForm.teethClearance6 = clearArray[5] == "none" ? "" : Number(clearArray[5]);
            this.prescriptionForm.teethClearance7 = clearArray[6] == "none" ? "" : Number(clearArray[6]);
            this.prescriptionForm.teethClearance8 = clearArray[7] == "none" ? "" : Number(clearArray[7]);
            this.prescriptionForm.teethClearance9 = clearArray[8] == "none" ? "" : Number(clearArray[8]);
            this.prescriptionForm.teethClearance10 = clearArray[9] == "none" ? "" : Number(clearArray[9]);
            this.prescriptionForm.teethClearance11 = clearArray[10] == "none" ? "" : Number(clearArray[10]);
            this.prescriptionForm.teethClearance12 = clearArray[11] == "none" ? "" : Number(clearArray[11]);
            this.prescriptionForm.teethClearance13 = clearArray[12] == "none" ? "" : Number(clearArray[12]);
            this.prescriptionForm.teethClearance14 = clearArray[13] == "none" ? "" : Number(clearArray[13]);
            this.prescriptionForm.teethClearance15 = clearArray[14] == "none" ? "" : Number(clearArray[14]);
            this.prescriptionForm.teethClearance16 = clearArray[15] == "none" ? "" : Number(clearArray[15]);
            this.prescriptionForm.teethClearance17 = clearArray[16] == "none" ? "" : Number(clearArray[16]);
            this.prescriptionForm.teethClearance18 = clearArray[17] == "none" ? "" : Number(clearArray[17]);
            this.prescriptionForm.teethClearance19 = clearArray[18] == "none" ? "" : Number(clearArray[18]);
            this.prescriptionForm.teethClearance20 = clearArray[19] == "none" ? "" : Number(clearArray[19]);
            this.prescriptionForm.teethClearance21 = clearArray[20] == "none" ? "" : Number(clearArray[20]);
            this.prescriptionForm.teethClearance22 = clearArray[21] == "none" ? "" : Number(clearArray[21]);
            this.prescriptionForm.teethClearance23 = clearArray[22] == "none" ? "" : Number(clearArray[22]);
            this.prescriptionForm.teethClearance24 = clearArray[23] == "none" ? "" : Number(clearArray[23]);
            this.prescriptionForm.teethClearance25 = clearArray[24] == "none" ? "" : Number(clearArray[24]);
            this.prescriptionForm.teethClearance26 = clearArray[25] == "none" ? "" : Number(clearArray[25]);
            this.prescriptionForm.teethClearance27 = clearArray[26] == "none" ? "" : Number(clearArray[26]);
            this.prescriptionForm.teethClearance28 = clearArray[27] == "none" ? "" : Number(clearArray[27]);
            this.prescriptionForm.teethClearance29 = clearArray[28] == "none" ? "" : Number(clearArray[28]);
            this.prescriptionForm.teethClearance30 = clearArray[29] == "none" ? "" : Number(clearArray[29]);
          }
          if (Number(data.prescription.teethMobile) == 0) {
            this.prescriptionForm.teethMobile = 0;
          } else {
            this.prescriptionForm.teethMobile = 1;
            let mobileArray = data.prescription.teethMobile ? data.prescription.teethMobile.split(",").map(Number) : [];
            this.prescriptionForm.teethMobileOne = [];
            this.prescriptionForm.teethMobileTwo = this.getArrEqual(arrayTwo, mobileArray);
            this.prescriptionForm.teethMobileThree = this.getArrEqual(arrayThree, mobileArray);
            this.prescriptionForm.teethMobileFour = [];
          }
          if (Number(data.prescription.teethAttachment) == 0) {
            this.prescriptionForm.teethAttachment = 0;
          } else {
            this.prescriptionForm.teethAttachment = 1;
            let attachArray = data.prescription.teethAttachment ? data.prescription.teethAttachment.split(",").map(Number) : [];
            this.prescriptionForm.teethAttachmentOne = [];
            this.prescriptionForm.teethAttachmentTwo = this.getArrEqual(arrayTwo, attachArray);
            this.prescriptionForm.teethAttachmentThree = this.getArrEqual(arrayThree, attachArray);
            this.prescriptionForm.teethAttachmentFour = [];
          }
          this.prescriptionForm.surfaceType = data.prescription.surfaceType;
          this.prescriptionForm.sagittalRight = data.prescription.sagittalRight;
          this.prescriptionForm.sagittalLeft = data.prescription.sagittalLeft;
          this.prescriptionForm.cover = data.prescription.cover;
          this.prescriptionForm.combined = data.prescription.combined;
          this.prescriptionForm.frontTeeth = data.prescription.frontTeeth;
          this.prescriptionForm.afterTeeth = data.prescription.afterTeeth;
          this.prescriptionForm.midline = data.prescription.midline;
          this.prescriptionForm.clearanceCorrectUp = data.prescription.clearanceCorrectUp;
          this.prescriptionForm.clearanceCorrectDown = data.prescription.clearanceCorrectDown;
          this.prescriptionForm.enlargeBowUp = data.prescription.enlargeBowUp;
          this.prescriptionForm.lipDipUp = data.prescription.lipDipUp;
          this.prescriptionForm.adjacentGlazeUp = data.prescription.adjacentGlazeUp;
          this.prescriptionForm.farRemovedMolarUp = data.prescription.farRemovedMolarUp;
          this.prescriptionForm.enlargeBowDown = data.prescription.enlargeBowDown;
          this.prescriptionForm.lipDipDown = data.prescription.lipDipDown;
          this.prescriptionForm.adjacentGlazeDown = data.prescription.adjacentGlazeDown;
          this.prescriptionForm.farRemovedMolarDown = data.prescription.farRemovedMolarDown;
          if (Number(data.prescription.toothExtraction) == 0) {
            this.prescriptionForm.toothExtraction = 0;
          } else {
            this.prescriptionForm.toothExtraction = 1;
            let extractionArray = data.prescription.toothExtraction ? data.prescription.toothExtraction.split(",").map(Number) : [];
            this.prescriptionForm.toothExtractionOne = this.getArrEqual(arrayTwo, extractionArray);
            this.prescriptionForm.toothExtractionTwo = this.getArrEqual(arrayThree, extractionArray);
          }
          this.prescriptionForm.plantingNail = data.prescription.plantingNail;
          this.prescriptionForm.temporomandibularJoint = data.prescription.temporomandibularJoint;
          this.prescriptionForm.remoteTreatments = data.prescription.remoteTreatments;
          this.prescriptionForm.specialInstructions = data.prescription.specialInstructions;
          this.prescriptionForm.frontSmilingPath = data.photo.frontSmilingPath;
          this.prescriptionForm.frontPath = data.photo.frontPath;
          this.prescriptionForm.sidePath = data.photo.sidePath;
          this.prescriptionForm.upJawPath = data.photo.upJawPath;
          this.prescriptionForm.downJawPath = data.photo.downJawPath;
          this.prescriptionForm.rightJawPath = data.photo.rightJawPath;
          this.prescriptionForm.frontJawPath = data.photo.frontJawPath;
          this.prescriptionForm.leftJawPath = data.photo.leftJawPath;
          this.prescriptionForm.allXrayPath = data.photo.allXrayPath;
          this.prescriptionForm.sideXrayPath = data.photo.sideXrayPath;
          this.prescriptionForm.otherXrayPath = data.photo.otherXrayPath;
          this.prescriptionForm.upJawModelPath = data.photo.upJawModelPath;
          this.prescriptionForm.upJawModelName = data.photo.upJawModelName;
          this.prescriptionForm.downJawModelPath = data.photo.downJawModelPath;
          this.prescriptionForm.downJawModelName = data.photo.downJawModelName;
        }
      });
    },
  },
}
</script>
<style scoped>
.all-add-contain {
  width: 1200px;
  margin: 0 auto;
}
.add-title {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 16px 0;
}
.add-title-main {
  color: #000;
  font-size: 16px;
  width: 100%;
  text-align: center;
}
.all-add-main {
  background: #fff;
  box-shadow: 0 2px 2px 1px #daecef;
  border-radius: 6px;
  padding: 20px;
  width: calc(100% - 40px);
  min-height: 80%;
  position: relative;
  margin-bottom: 93px;
}
.all-add-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  box-shadow: inset 0 1px 0 1px rgb(0 0 0 / 8%), 0 2px 14px 1px rgb(221 225 233 / 54%);
  padding: 11px 0;
}
.doctor-footer {
  width: 100% !important;
  left: 0 !important;
}
.all-add-main >>> .el-tabs__nav-wrap::after {
  height: 0;
}
.all-add-main >>> .el-tabs__nav {
  width: 100%;
}
.all-add-main >>> .el-tabs__item {
  width: 25%;
  text-align: center;
}
.model-tabs >>> .el-tabs__nav-wrap::after {
  height: 2px;
}
.model-tabs >>> .el-tabs__item {
  width: auto;
  text-align: left;
}
.arrow-style {
  float: right;
  height: 40px;
  line-height: 40px;
  color: #303133;
}
.form-main {
  padding: 20px;
  margin-bottom: 50px;
}
.item-width {
  width: 300px;
}
.common-select >>> .el-radio__input {
  display: none;
}
.common-select >>> .el-radio.is-bordered {
  width: 100px;
  text-align: center;
}
.select-long {
  width: 180px !important;
}
.common-select >>> .el-radio.is-bordered.is-checked {
  border-color: #409EFF;
  background: #409EFF;
}
.common-select >>> .el-radio__input.is-checked+.el-radio__label {
  color: #fff;
}
.common-select >>> .el-checkbox__input {
  display: none;
}
.common-select >>> .el-checkbox.is-bordered {
  width: 120px;
  margin-left: 0;
  margin-bottom: 15px;
  text-align: center;
}
.common-select >>> .el-checkbox.is-bordered.is-checked {
  border-color: #409EFF;
  background: #409EFF;
}
.common-select >>> .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #fff;
}
.diagnosis-title {
  font-size: 20px;
  color: #555;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
.diagnosis-title-required::before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.diagnosis-tip {
  font-size: 16px;
  margin-left: 20px;
  color: #999;
}
.diagnosis-explain {
  font-size: 14px;
  color: #999;
}
.diagnosis-titleNo-tipNo {
  font-size: 16px;
  color: #666;
  margin-top: 15px;
}
.info-select {
  text-align: center;
}
.info-select >>> .el-checkbox__input {
  display: none;
}
.info-select >>> .el-checkbox.is-bordered {
  width: 42px;
  margin-left: 0;
  margin-right: 22px;
  margin-bottom: 15px;
  text-align: center;
}
.info-select >>> .el-checkbox__label {
  padding-left: 0;
  font-size: 20px;
  font-weight: normal;
}
.info-item, .teeth-item {
  width: 1028px;
}
.info-item >>> .el-form-item__content::after {
  height: 100%;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: -5px;
  left: 503px;
  z-index: 10;
}
.teeth-item .common-select {
  margin-bottom: 15px;
}
.info-item >>> .el-form-item__content::before {
  width: 1008px;
  border-bottom: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 102px;
  left: 0;
  z-index: 10;
}
.teeth-item >>> .el-form-item__content::after {
  height: 220px;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 46px;
  left: 503px;
  z-index: 10;
}
.teeth-item >>> .el-form-item__content::before {
  width: 1008px;
  border-bottom: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 157px;
  left: 0;
  z-index: 10;
}
.tooth-item {
  width: 1130px;
}
.tooth-item >>> .el-form-item__content::after {
  height: 100px;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 78px;
  left: 503px;
  z-index: 10;
}
.tooth-item >>> .el-form-item__content::before {
  width: 1008px;
  border-bottom: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 127px;
  left: 0;
  z-index: 10;
}
.clearance-main {
  width: 1100px;
}
.clearance-input {
  width: 38px;
  margin-left: 33px;
}
.clearance-input >>> .el-input__inner {
  height: 24px;
  line-height: 24px;
  padding: 0;
  text-align: center;
}
.clearance-number {
  color: #bbb;
  font-size: 16px;
  padding-left: 6px;
  width: 1100px;
}
.clearance-number-bootom {
  border-bottom: 1px dashed #c5c5c5;
}
.clearance-number span {
  padding-right: 54px;
}
.clearance-main::after {
  height: 98px;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 128px;
  left: 548px;
  z-index: 10;
}
.clearance-input-top::after {
  height: 14px;
  border-right: 1px solid #DCDFE6;
  display: inline-block;
  content: "";
  position: absolute;
  top: 32px;
  left: 18px;
  z-index: 10;
}
.clearance-input-bottom::after {
  height: 14px;
  border-right: 1px solid #DCDFE6;
  display: inline-block;
  content: "";
  position: absolute;
  bottom: 32px;
  left: 18px;
  z-index: 10;
}
.mb10 {
  margin-bottom: 10px;
}
.diagnosis-desc {
  font-size: 18px;
  color: #555;
  font-weight: 300;
}
.common-img-uploader >>> .el-upload {
  border: 1px solid #d9d9d9;
  width: 190px;
  height: 180px;
  line-height: 180px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 190px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.common-img {
  max-width: 190px;
  max-height: 180px;
  display: block;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.img-desc {
  width: 190px;
  height: 40px;
  line-height: 40px;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  font-size: 14px;
  font-weight: 300;
  color: #555;
  text-align: center;
}
.img-desc-required::before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.mt12 {
  margin-top: 12px;
}
.number-title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  margin-bottom: 20px;
}
.up-title {
  font-size: 18px;
  color: #555;
  font-weight: 300;
  width: 36px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 0;
}
.down-title {
  font-size: 18px;
  color: #555;
  font-weight: 300;
  width: 36px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 60px;
}
.ml56 {
  margin-left: 56px;
}
.remove-up-btn {
  position: absolute;
  left: 286px;
  top: 0px;
}
.remove-down-btn {
  position: absolute;
  left: 286px;
  top: 60px;
}
.model-icon-btn {
  width: 210px;
  height: 40px;
}
.jaw-model-desc {
  font-size: 14px;
  color: #666;
  margin-top: 30px;
}
.error-submit {
  padding: 50px;
  min-height: 500px;
}
.error-submit-icon {
  color: #f44336;
  margin-right: 10px;
  font-size: 20px;
}
.error-submit-tip {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: #555;
  font-size: 20px;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  font-weight: 500;
  margin-bottom: 30px;
}
.error-submit-noFilled {
  display: flex;
  flex-direction: column;
  border-left: 2px solid #f44336;
  padding-left: 27px;
  margin-bottom: 20px;
}
.error-submit-noFilled-type {
  color: #333;
  font-size: 16px;
  line-height: 16px;
  white-space: nowrap;
  font-weight: 400;
}
.error-submit-noFilled-content:last-child {
  margin-bottom: 0;
}
.error-submit-noFilled-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.error-submit-noFilled-content-every {
  margin-top: 10px;
  color: #f44336;
  font-size: 14px;
  line-height: 24px;
  white-space: nowrap;
  font-weight: 400;
  margin-right: 20px;
  cursor: pointer;
  border-bottom: 1px solid red;
}
.error-submitTrue {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.error-submitTrue-tip {
  font-size: 20px;
  font-weight: 500;
  color: #555;
  height: 54px;
  margin-top: 13px;
}
.error-submitTrue-img {
  font-size: 80px;
  margin-right: 20px;
  color: green;
}
</style>
