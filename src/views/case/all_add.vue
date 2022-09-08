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
            <el-form-item label="患者姓名" prop="name">
              <el-input v-model="infoForm.name" placeholder="请输入患者姓名" class="item-width"></el-input>
            </el-form-item>
            <el-form-item label="所属医生" prop="doctorId">
              <el-select v-model="infoForm.doctorId" placeholder="请选择所属医生" class="item-width">
                <el-option
                  v-for="item in doctorOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="infoForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                class="item-width"
                v-model="infoForm.birthday"
                type="date"
                placeholder="请选择出生日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="安氏分类" prop="annType">
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
            <el-form-item label="错合类型" prop="malocclusionType">
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
            <div class="diagnosis-title diagnosis-title-required">1. 主诉</div>
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
            <div class="diagnosis-title diagnosis-title-required">2. 主要矫治目标</div>
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
            <div class="diagnosis-title diagnosis-title-required">3. 拟矫治牙颌<span class="diagnosis-tip">即使单颌矫治，也需要提交全颌硅橡胶印模或数字文件</span></div>
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
            <div class="diagnosis-title diagnosis-title-required">8. 面型</div>
            <el-form-item prop="surfaceType" label-width="0px">
              <el-radio-group v-model="prescriptionForm.surfaceType" class="common-select">
                <el-radio :label="1" border>维持</el-radio>
                <el-radio :label="2" border>改善</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="diagnosis-title diagnosis-title-required">9. 矢状关系</div>
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
            <div class="diagnosis-title diagnosis-title-required">14. 中线</div>
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
            <div class="diagnosis-title diagnosis-title-required">17. 是否配合种植支抗钉</div>
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
              <div class="diagnosis-title diagnosis-title-required">照片信息</div>
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
                  <div class="img-desc img-desc-required">全景片</div>
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
                  <div class="img-desc img-desc-required">侧位片</div>
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
              <div class="diagnosis-title diagnosis-title-required mt20">牙颌模型</div>
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
                        <div v-if="prescriptionForm.upJawModelPathName">
                          <el-button icon="el-icon-file" class="model-icon-btn">{{prescriptionForm.upJawModelPathName}}</el-button>
                        </div>
                        <div v-else>
                          <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                        </div>
                      </el-upload>
                      <el-button class="remove-up-btn" v-if="prescriptionForm.upJawModelPathName" type="text" @click="removeUpJawModel">删除</el-button>
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
                        <div v-if="prescriptionForm.downJawModelPathName">
                          <el-button icon="el-icon-file" class="model-icon-btn">{{prescriptionForm.downJawModelPathName}}</el-button>
                        </div>
                        <div v-else>
                          <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                        </div>
                      </el-upload>
                      <el-button class="remove-down-btn" v-if="prescriptionForm.downJawModelPathName" type="text" @click="removeDownJawModel">删除</el-button>
                    </el-col>
                    <el-col span="14">
                      <div class="jaw-model-desc">
                        <div>1.口扫时扫过咬合，导出的上颌STL、下颌STL就会自动带上咬合数据；</div>
                        <div>2.如需上传其他数据，请选择邮件发送，根据提示发送至邮箱即可。</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <!-- <el-tab-pane label="硅橡胶模型" name="second"></el-tab-pane> -->
              </el-tabs>
            </el-col>
            <!-- <el-col :span="8">
              <div class="diagnosis-title">照片池(0) <span class="diagnosis-tip">未分配照片可以在照片池中查看</span></div>
              <div class="img-pool-contain">
                <el-upload
                  class="img-pool-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleImgSuccessImgPool"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <i class="el-icon-plus pool-icon"></i>
                  <div class="pool-title">点击上传照片</div>
                  <div class="pool-desc">点击可以上传更多图片</div>
                </el-upload>
              </div>
            </el-col> -->
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
                    <div v-show="!infoForm.name" class="error-submit-noFilled-content-every" @click="clickToInfo">患者姓名</div>
                    <div v-show="!infoForm.doctorId" class="error-submit-noFilled-content-every" @click="clickToInfo">所属医生</div>
                    <div v-show="!(infoForm.sex + '')" class="error-submit-noFilled-content-every" @click="clickToInfo">性别</div>
                    <div v-show="!infoForm.birthday" class="error-submit-noFilled-content-every" @click="clickToInfo">出生日期</div>
                    <div v-show="!infoForm.annType" class="error-submit-noFilled-content-every" @click="clickToInfo">安氏分类</div>
                    <div v-show="!infoForm.malocclusionType.length" class="error-submit-noFilled-content-every" @click="clickToInfo">错合类型</div>
                  </div>
                </div>
                <div class="mb20" v-show="showPrescription">
                  <span class="error-submit-noFilled-type">诊断及矫治说明</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="!(prescriptionForm.ccTeeth.length || prescriptionForm.ccJaw.length)" class="error-submit-noFilled-content-every" @click="clickToDesc">主诉</div>
                    <div v-show="!prescriptionForm.teeth.length" class="error-submit-noFilled-content-every" @click="clickToDesc">主要矫治目标</div>
                    <div v-show="!prescriptionForm.orthodonticJaw" class="error-submit-noFilled-content-every" @click="clickToDesc">拟矫治牙颌</div>
                    <div v-show="!prescriptionForm.surfaceType" class="error-submit-noFilled-content-every" @click="clickToDesc">面型</div>
                    <div v-show="!(prescriptionForm.sagittalRight || prescriptionForm.sagittalLeft)" class="error-submit-noFilled-content-every" @click="clickToDesc">矢状关系</div>
                    <div v-show="!prescriptionForm.midline" class="error-submit-noFilled-content-every" @click="clickToDesc">中线</div>
                    <div v-show="!prescriptionForm.plantingNail" class="error-submit-noFilled-content-every" @click="clickToDesc">是否配合种植支抗钉</div>
                  </div>
                </div>
                <div v-show="showFiles">
                  <span class="error-submit-noFilled-type">影像资料及模型</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="showPhoto" class="error-submit-noFilled-content-every" @click="clickToPhoto">照片</div>
                    <div v-show="!(prescriptionForm.upJawModelPath && prescriptionForm.downJawModelPath)" class="error-submit-noFilled-content-every" @click="clickToPhoto">牙颌模型</div>
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
    <div class="all-add-footer">
      <el-button v-show="active>1" icon="el-icon-arrow-left" @click="prev">上一页</el-button>
      <el-button v-show="active<4" @click="next">下一页 <i class="el-icon-arrow-right"></i></el-button>
      <el-button type="primary" v-show="active<4 || showInfo || showPrescription || showFiles" plain @click="caseSave('preserve')">暂存</el-button>
      <el-button type="primary" v-show="active === 4 && !(showInfo || showPrescription || showFiles)" plain @click="caseSave('submit')">提交</el-button>
    </div>
  </div>
</template>
<script>
import {
  selectDoctor,
  saveCase,
  preserveCase,
  getDetails,
} from "@/api/case/commonCase";
import { uploadOBS } from "@/util/obs";
import { dateFormat } from '@/util/upDate';
export default {
  name: "AllAdd",
  data() {
    return {
      active: 1,
      infoForm: {
        name: "",
        doctorId: "",
        sex: null,
        birthday: "",
        annType: "",
        bonyType: "",
        malocclusionType: [],
      },
      infoRules: {
        name: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
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
        upJawModelPathName: "",
        downJawModelPath: "",
        downJawModelPathName: "",
      },
      activeName: "first",
      currentCaseId: "",
      currentIsEdit: false,
    }
  },
  computed: {
    showInfo () {
      return !this.infoForm.name
          || !this.infoForm.doctorId
          || !(this.infoForm.sex + '')
          || !this.infoForm.birthday
          || !this.infoForm.annType
          || !this.infoForm.malocclusionType.length;
    },
    showPrescription() {
      return !(this.prescriptionForm.ccTeeth.length || this.prescriptionForm.ccJaw.length)
          || !this.prescriptionForm.teeth.length
          || !this.prescriptionForm.orthodonticJaw
          || !this.prescriptionForm.surfaceType
          || !(this.prescriptionForm.sagittalRight || this.prescriptionForm.sagittalLeft)
          || !this.prescriptionForm.midline
          || !this.prescriptionForm.plantingNail;
    },
    showPhoto() {
      return !this.prescriptionForm.frontSmilingPath
          || !this.prescriptionForm.frontPath
          || !this.prescriptionForm.sidePath
          || !this.prescriptionForm.upJawPath
          || !this.prescriptionForm.downJawPath
          || !this.prescriptionForm.rightJawPath
          || !this.prescriptionForm.frontJawPath
          || !this.prescriptionForm.leftJawPath
          || !this.prescriptionForm.allXrayPath
          || !this.prescriptionForm.sideXrayPath;
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
    if (this.currentCaseId) {
      this.getCaseDetails(this.currentCaseId);
    }
  },
  methods: {
    back() {
      this.$router.push({path: "/case/all"});
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
    },
    handleImgSuccessFront(res, file) {
      const data = res.data || {};
      this.prescriptionForm.frontPath = data.viewStlUrl;
    },
    handleImgSuccessSide(res, file) {
      const data = res.data || {};
      this.prescriptionForm.sidePath = data.viewStlUrl;
    },
    handleImgSuccessSideUpJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.upJawPath = data.viewStlUrl;
    },
    handleImgSuccessDownJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.downJawPath = data.viewStlUrl;
    },
    handleImgSuccessRightJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.rightJawPath = data.viewStlUrl;
    },
    handleImgSuccessFrontJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.frontJawPath = data.viewStlUrl;
    },
    handleImgSuccessLeftJaw(res, file) {
      const data = res.data || {};
      this.prescriptionForm.leftJawPath = data.viewStlUrl;
    },
    handleImgSuccessAllXray(res, file) {
      const data = res.data || {};
      this.prescriptionForm.allXrayPath = data.viewStlUrl;
    },
    handleImgSuccessSideXray(res, file) {
      const data = res.data || {};
      this.prescriptionForm.sideXrayPath = data.viewStlUrl;
    },
    handleImgSuccessOtherXray(res, file) {
      const data = res.data || {};
      this.prescriptionForm.otherXrayPath = data.viewStlUrl;
    },
    beforeImgUpload(file) {
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
        // 更新进度条
        params.onProgress({percent: percentage});
      });
    },
    handleError(err) {
      this.$message.warning(err.msg);
      return false;
    },
    handleImgSuccessUpJawModel(res, file) {
      const data = res.data || {};
      this.prescriptionForm.upJawModelPath = data.viewStlUrl;
      this.prescriptionForm.upJawModelPathName = data.originalName;
    },
    beforeImgUploadJawModel(file) {
      const isSTL = file.name.toLocaleLowerCase().substring(file.name.lastIndexOf('.')) === ".stl";
      if (!isSTL) {
        this.$message.error('您只能上传 stl 类型的文件!');
      }
      return isSTL;
    },
    handleImgSuccessDownJawModel(res, file) {
      const data = res.data || {};
      this.prescriptionForm.downJawModelPath = data.viewStlUrl;
      this.prescriptionForm.downJawModelPathName = data.originalName;
    },
    removeUpJawModel() {
      this.prescriptionForm.upJawModelPath = "";
      this.prescriptionForm.upJawModelPathName = "";
    },
    removeDownJawModel() {
      this.prescriptionForm.downJawModelPath = "";
      this.prescriptionForm.downJawModelPathName = "";
    },
    handleImgSuccessImgPool(res, file) {},
    clickToInfo() {
      this.active = 1;
    },
    clickToDesc() {
      this.active = 2;
    },
    clickToPhoto() {
      this.active = 3;
    },
    caseSave(state) {
      let data = {};
      if (this.infoForm.name) {
        data.name = this.infoForm.name;
      }
      if (this.infoForm.doctorId) {
        data.doctorId = this.infoForm.doctorId;
      }
      if (this.infoForm.sex) {
        data.sex = this.infoForm.sex;
      }
      if (this.infoForm.birthday) {
        data.birthday = dateFormat(this.infoForm.birthday, "yyyy-MM-dd");
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
      if (this.prescriptionForm.upJawModelPathName) {
        data.upJawModelPathName = this.prescriptionForm.upJawModelPathName;
      }
      if (this.prescriptionForm.downJawModelPath) {
        data.downJawModelPath = this.prescriptionForm.downJawModelPath;
      }
      if (this.prescriptionForm.downJawModelPathName) {
        data.downJawModelPathName = this.prescriptionForm.downJawModelPathName;
      }
      if (state === "preserve") {
        if (this.infoForm.doctorId) {
          preserveCase(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "暂存成功!"
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "所属医生必须选择!"
          });
        }
      } else if(state === "submit") {
        saveCase(data).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "提交成功!"
            });
            this.$router.push({path: "/case/all"});
          }
        });
      } else {
        // 不存在这种情况，不做操作
      }
    },
    getCaseDetails(id) {
      const params = {
        id: id,
      };
      getDetails(params).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.infoForm.name = data.prescription.name;
          this.infoForm.doctorId = data.prescription.doctorId;
          this.infoForm.sex = data.prescription.sex;
          this.infoForm.birthday = data.prescription.birthday;
          this.infoForm.annType = data.prescription.annType;
          this.infoForm.bonyType = data.prescription.bonyType;
          this.infoForm.malocclusionType = data.prescription.malocclusionType;
        }
      });
    },
  },
}
</script>
<style scoped>
.all-add-contain {
  width: 100%;
  max-width: 1200px;
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
  width: 100%;
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
  margin-left: 6px;
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
.common-img-uploader {
  border: 1px solid #d9d9d9;
  width: 190px;
  height: 180px;
  line-height: 180px;
  cursor: pointer;
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
  width: 190px;
  height: 180px;
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
.img-pool-contain {
  width: 325px;
  height: 700px;
  box-shadow: 0 2px 25px 0 rgb(170 178 195 / 22%);
  border-radius: 10px;
  padding: 30px;
  overflow-y: auto;
  margin-top: 30px;
}
.img-pool-uploader >>> .el-upload {
  width: 160px;
  height: 180px;
  border: 1px dashed #c5c5c5;
  background: #fafafa;
  text-align: center;
}
.pool-icon {
  width: 22px;
  height: 22px;
  padding-top: 30px;
  padding-bottom: 10px;
  font-size: 22px;
  color: #8c939d;
}
.pool-title {
  color: #333;
  font-size: 14px;
}
.pool-desc {
  color: #999;
  font-size: 14px;
  padding-top: 50px;
  padding-bottom: 30px;
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
}
</style>
