<template>
  <div class="restart-case-contain">
    <div class="restart-case-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="restart-case-title-main">重启病例</div>
    </div>
    <div class="restart-case-main">
      <el-tabs v-model="active">
        <el-tab-pane :name="1">
          <span slot="label"><i class="el-icon-chat-dot-square"></i> 阶段反馈<i class="el-icon-arrow-right arrow-style"></i></span>
          <div class="restart-case-main-one">
            <div class="restart-case-main-one-top">
              <div class="restart-case-main-one-top-img">
                <img v-if="caseItem.photo && caseItem.photo.frontPath" :src="caseItem.photo.frontPath" alt="" class="top-img">
                <i v-else class="el-icon-user top-icon"></i>
              </div>
              <div class="restart-case-main-one-top-name" v-if="caseItem.prescription && caseItem.prescription.name">
                <span :title="caseItem.prescription.name">{{caseItem.prescription.name}}</span>
              </div>
              <div class="restart-case-main-one-top-id">
                <span>病历号：</span>
                <span v-if="caseItem.record && caseItem.record.medicalCode" class="restart-case-main-one-top-id-span">{{caseItem.record.medicalCode}}</span>
              </div>
            </div>
            <el-form :model="feedbackForm" :rules="feedbackRules" ref="feedbackForm" label-position="top">
              <div class="diagnosis-title diagnosis-title-required isFit">1. 当前矫治器贴合情况<span class="diagnosis-tip">判断依据：牙齿移动及咬合关系与模拟矫治设计基本符合，矫治器与牙齿之间无明显空隙</span></div>
              <el-form-item prop="isFit">
                <el-radio-group v-model="feedbackForm.isFit" class="common-radio">
                  <el-radio :label="1" border>矫治器贴合</el-radio>
                  <el-radio :label="2" border>矫治器不贴合</el-radio>
                </el-radio-group>
                <div class="not-fit-desc" :class="{'hide-desc': feedbackForm.isFit !== 2}">需提交全口硅橡胶印膜，或全口数字模型文件</div>
              </el-form-item>
              <div class="diagnosis-title">2. 临床检查</div>
              <div class="restart-case-main-check">
                <div class="diagnosis-two-title diagnosis-title-required steps">2.1 本次反馈时佩戴矫治器步数为</div>
                <el-form-item prop="upSteps">
                  <span class="steps-title">上颌第<el-input v-model="feedbackForm.upSteps" class="steps-input" :disabled="maxUpSteps===0"></el-input>步</span>
                  <span class="diagnosis-tip">上阶段设计的矫治器总步数为 {{maxUpSteps}} 步</span>
                </el-form-item>
                <el-form-item prop="downSteps">
                  <span class="steps-title">下颌第<el-input v-model="feedbackForm.downSteps" class="steps-input" :disabled="maxDownSteps===0"></el-input>步</span>
                  <span class="diagnosis-tip">上阶段设计的矫治器总步数为 {{maxDownSteps}} 步</span>
                </el-form-item>
                <div class="diagnosis-two-title">2.2 附件调整</div>
                <el-radio-group v-model="feedbackForm.annex" class="common-radio w180" @change="annexChange">
                  <el-row class="mb20">
                    <el-radio :label="1" border>由设计方案决定(推荐)</el-radio>
                    <span class="diagnosis-tip">附件可能会调整</span>
                  </el-row>
                  <el-row class="mb20">
                    <el-radio :label="2" border>保留指定附件</el-radio>
                    <span class="diagnosis-tip">根据设计方案可能调整其他附件或添加新附件</span>
                  </el-row>
                  <el-row class="mb20" v-show="feedbackForm.annex===2">
                    <div class="annex-two-title">请在下方牙列式内选择需要保留的附件</div>
                    <div class="annex-two-content">
                      <el-checkbox-group v-model="feedbackForm.annexInfoOne" class="annex-two-checkbox">
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
                      <el-checkbox-group v-model="feedbackForm.annexInfoTwo" class="annex-two-checkbox checked-checkbox">
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
                      <el-checkbox-group v-model="feedbackForm.annexInfoThree" class="annex-two-checkbox checked-checkbox">
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
                      <el-checkbox-group v-model="feedbackForm.annexInfoFour" class="annex-two-checkbox">
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
                  </el-row>
                  <el-row class="mb20">
                    <el-radio :label="3" border>保留全部附件</el-radio>
                    <span class="diagnosis-tip">根据设计方案可能添加附件</span>
                  </el-row>
                </el-radio-group>
                <div class="diagnosis-two-title diagnosis-title-required">2.3 牙列间隙</div>
                <el-form-item prop="teethClearance">
                  <el-radio-group v-model="feedbackForm.teethClearance" class="common-radio w100">
                    <el-radio :label="0" border>无</el-radio>
                    <el-radio :label="1" border>有</el-radio>
                  </el-radio-group>
                  <div v-show="feedbackForm.teethClearance == 1">
                    <div class="diagnosis-titleNo-tipNo">请记录反馈1.0mm以下的间隙量</div>
                    <div class="clearance-main">
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance1"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance2"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance3"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance4"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance5"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance6"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance7"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance8"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance9"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance10"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance11"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance12"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance13"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance14"></el-input>
                      <el-input class="clearance-input clearance-input-top" v-model="feedbackForm.teethClearance15"></el-input>
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
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance16"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance17"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance18"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance19"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance20"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance21"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance22"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance23"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance24"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance25"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance26"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance27"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance28"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance29"></el-input>
                      <el-input class="clearance-input clearance-input-bottom" v-model="feedbackForm.teethClearance30"></el-input>
                    </div>
                  </div>
                </el-form-item>
                <div class="diagnosis-two-title">2.4 颞下颌关节是否存在异常</div>
                <el-form-item prop="isAbnormal">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请添加对颞下颌关节异常的症状描述和设计要求，描述请限制在2000字以内（误删除可使用“ctrl+z”撤销误操作）"
                    v-model="feedbackForm.isAbnormal">
                  </el-input>
                </el-form-item>
                <div class="diagnosis-two-title">2.5 其他检查（包括牙齿错位、松动度、早接触度等）</div>
                <el-form-item prop="otherChecks">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="描述请限制在2000字以内（误删除可使用“ctrl+z”撤销误操作）"
                    v-model="feedbackForm.otherChecks">
                  </el-input>
                </el-form-item>
              </div>
              <div class="diagnosis-title">3. 前一阶段的设计要求<span class="diagnosis-tip">如有变更请医生及时调整，如不修改公司将延续前一阶段的设计要求</span></div>
              <div class="restart-case-main-check">
                <div class="diagnosis-two-title">3.1 不可移动牙齿<span class="diagnosis-tip">烤瓷牙，修复桥体，种植牙等无法移动牙齿</span></div>
                <el-form-item prop="teethMobile">
                  <el-radio-group v-model="feedbackForm.teethMobile" class="common-radio w100 mb20">
                    <el-radio :label="0" border>无</el-radio>
                    <el-radio :label="1" border class="select-long">以下牙齿不可移动</el-radio>
                  </el-radio-group>
                  <div v-show="feedbackForm.teethMobile == 1" :class="{'annex-two-content': feedbackForm.teethMobile == 1}">
                    <el-checkbox-group v-model="feedbackForm.teethMobileOne" class="annex-two-checkbox">
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
                    <el-checkbox-group v-model="feedbackForm.teethMobileTwo" class="annex-two-checkbox">
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
                    <el-checkbox-group v-model="feedbackForm.teethMobileThree" class="annex-two-checkbox">
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
                    <el-checkbox-group v-model="feedbackForm.teethMobileFour" class="annex-two-checkbox">
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
                <div class="diagnosis-two-title">3.2 不可设计附件牙齿<span class="diagnosis-tip">烤瓷牙，修复桥体等无法粘结附件</span></div>
                <el-form-item prop="teethAttachment">
                  <el-radio-group v-model="feedbackForm.teethAttachment" class="common-radio w100 mb20">
                    <el-radio :label="0" border>无</el-radio>
                    <el-radio :label="1" border class="select-long">以下牙齿不可设计附件</el-radio>
                  </el-radio-group>
                  <div v-show="feedbackForm.teethAttachment == 1" :class="{'annex-two-content': feedbackForm.teethAttachment == 1}">
                    <el-checkbox-group v-model="feedbackForm.teethAttachmentOne" class="annex-two-checkbox">
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
                    <el-checkbox-group v-model="feedbackForm.teethAttachmentTwo" class="annex-two-checkbox">
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
                    <el-checkbox-group v-model="feedbackForm.teethAttachmentThree" class="annex-two-checkbox">
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
                    <el-checkbox-group v-model="feedbackForm.teethAttachmentFour" class="annex-two-checkbox">
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
                <div class="diagnosis-two-title">3.3 前牙平导板（适用于深覆合浅覆盖病例）</div>
                <el-form-item prop="flatBear">
                  <el-radio-group v-model="feedbackForm.flatBear" class="common-radio w100">
                    <el-radio :label="1" border>需要</el-radio>
                    <el-radio :label="2" border>不需要</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="diagnosis-two-title">3.4 是否远程矫治</div>
                <el-form-item prop="remoteTreatments">
                  <el-radio-group v-model="feedbackForm.remoteTreatments" class="common-radio w100">
                    <el-radio :label="1" border>是</el-radio>
                    <el-radio :label="2" border>否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="diagnosis-title diagnosis-title-required correctiveRequire">4. 后续矫治要求<span class="diagnosis-tip">不应改变初始矫治目标</span></div>
              <el-form-item prop="correctiveRequire">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="描述请限制在2000字以内（误删除可使用“ctrl+z”撤销误操作）"
                  v-model="feedbackForm.correctiveRequire">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <span slot="label"><i class="el-icon-video-camera"></i> 影像资料及模型<i class="el-icon-arrow-right arrow-style"></i></span>
          <div class="restart-case-main-two">
            <div class="diagnosis-title">佩戴矫治器不贴合部位照片</div>
            <el-row class="mb20">
              <el-col :span="8">
                <el-upload
                  class="common-img-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleNotFitOne"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <img v-if="photoForm.notFitOne" :src="photoForm.notFitOne" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传不贴合1</div>
                  </div>
                </el-upload>
                <div class="img-desc">不贴合照</div>
              </el-col>
              <el-col :span="8">
                <el-upload
                  class="common-img-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleNotFitTwo"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <img v-if="photoForm.notFitTwo" :src="photoForm.notFitTwo" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传不贴合2</div>
                  </div>
                </el-upload>
                <div class="img-desc">不贴合照</div>
              </el-col>
              <el-col :span="8">
                <el-upload
                  class="common-img-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleNotFitThree"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <img v-if="photoForm.notFitThree" :src="photoForm.notFitThree" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传不贴合3</div>
                  </div>
                </el-upload>
                <div class="img-desc">不贴合照</div>
              </el-col>
            </el-row>
            <el-row class="mb20">
              <el-col :span="8">
                <el-upload
                  class="common-img-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleNotFitFour"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <img v-if="photoForm.notFitFour" :src="photoForm.notFitFour" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传不贴合4</div>
                  </div>
                </el-upload>
                <div class="img-desc">不贴合照</div>
              </el-col>
              <el-col :span="8">
                <el-upload
                  class="common-img-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleNotFitFive"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <img v-if="photoForm.notFitFive" :src="photoForm.notFitFive" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传不贴合5</div>
                  </div>
                </el-upload>
                <div class="img-desc">不贴合照</div>
              </el-col>
              <el-col :span="8">
                <el-upload
                  class="common-img-uploader"
                  action=""
                  accept=".jpeg,.jpg,.png"
                  :show-file-list="false"
                  :http-request="showProcess"
                  :on-success="handleNotFitSix"
                  :before-upload="beforeImgUpload"
                  :on-error="handleError">
                  <img v-if="photoForm.notFitSix" :src="photoForm.notFitSix" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传不贴合6</div>
                  </div>
                </el-upload>
                <div class="img-desc">不贴合照</div>
              </el-col>
            </el-row>
            <div class="diagnosis-title diagnosis-title-required photos">照片信息<span class="photo-standard" @click="toStandard('photo')"><i class="el-icon-warning-outline icon-mr4"></i>照片拍摄标准</span></div>
            <div class="diagnosis-desc mb20">面相照及口内照</div>
            <el-row class="mb20">
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
                  <img v-if="photoForm.frontSmilingPath" :src="photoForm.frontSmilingPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/smile.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传正面微笑照</div>
                  </div>
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
                  <img v-if="photoForm.frontPath" :src="photoForm.frontPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/front.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传正面照</div>
                  </div>
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
                  <img v-if="photoForm.sidePath" :src="photoForm.sidePath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/side.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传侧面照</div>
                  </div>
                </el-upload>
                <div class="img-desc img-desc-required">侧面照</div>
              </el-col>
            </el-row>
            <el-row class="mb20">
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
                  <img v-if="photoForm.upJawPath" :src="photoForm.upJawPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/top.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传上颌口内照</div>
                  </div>
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
                  <img v-if="photoForm.downJawPath" :src="photoForm.downJawPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/bottom.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传下颌口内照</div>
                  </div>
                </el-upload>
                <div class="img-desc img-desc-required">下颌口内照</div>
              </el-col>
            </el-row>
            <el-row class="mb20">
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
                  <img v-if="photoForm.rightJawPath" :src="photoForm.rightJawPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/right.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传右侧口内照</div>
                  </div>
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
                  <img v-if="photoForm.frontJawPath" :src="photoForm.frontJawPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/main.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传正面口内照</div>
                  </div>
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
                  <img v-if="photoForm.leftJawPath" :src="photoForm.leftJawPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <img src="img/media/left.png" alt="">
                    <i class="el-icon-plus common-img-uploader-icon"></i>
                    <div class="common-img-uploader-text">点击上传左侧口内照</div>
                  </div>
                </el-upload>
                <div class="img-desc img-desc-required">左侧口内照</div>
              </el-col>
            </el-row>
            <el-row class="mb20">
              <el-col :span="8">
                <div class="diagnosis-desc">X光照片<span class="photo-standard" @click="toStandard('slice')"><i class="el-icon-warning-outline icon-mr4"></i>X光片拍摄标准</span></div>
              </el-col>
              <el-col :span="8"></el-col>
              <el-col :span="8">
                <div class="diagnosis-desc">其他影像</div>
              </el-col>
            </el-row>
            <el-row class="mb20">
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
                  <img v-if="photoForm.allXrayPath" :src="photoForm.allXrayPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传全景片</div>
                  </div>
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
                  <img v-if="photoForm.sideXrayPath" :src="photoForm.sideXrayPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传侧位片</div>
                  </div>
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
                  <img v-if="photoForm.otherXrayPath" :src="photoForm.otherXrayPath" class="common-img">
                  <div v-else class="common-img-uploader-img">
                    <i class="el-icon-plus common-img-uploader-icon photoMt"></i>
                    <div class="common-img-uploader-text">点击上传照片</div>
                  </div>
                </el-upload>
                <div class="img-desc">其他</div>
              </el-col>
            </el-row>
            <div class="diagnosis-title diagnosis-title-required dental">牙颌模型<span class="photo-standard" @click="toStandard('jaw')"><i class="el-icon-warning-outline icon-mr4"></i>模型制取标准</span></div>
            <el-tabs v-model="activeName" class="model-tabs">
              <el-tab-pane label="数字模型文件" name="first">
                <div class="number-title">本地上传</div>
                <el-row>
                  <el-col span="10">
                    <div class="up-title">上颌</div>
                    <el-upload
                      class="mb20 ml56"
                      action=""
                      accept=".stl"
                      :show-file-list="false"
                      :http-request="showProcess"
                      :on-success="handleImgSuccessUpJawModel"
                      :before-upload="beforeImgUploadJawModel"
                      :on-error="handleError">
                      <div v-if="photoForm.upJawModelName">
                        <el-button icon="el-icon-file" class="model-icon-btn" :title="photoForm.upJawModelName">{{photoForm.upJawModelName}}</el-button>
                      </div>
                      <div v-else>
                        <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                      </div>
                    </el-upload>
                    <el-button class="remove-up-btn" v-if="photoForm.upJawModelName" type="text" @click="removeUpJawModel">删除</el-button>
                    <div class="down-title">下颌</div>
                    <el-upload
                      class="mb20 ml56"
                      action=""
                      accept=".stl"
                      :show-file-list="false"
                      :http-request="showProcess"
                      :on-success="handleImgSuccessDownJawModel"
                      :before-upload="beforeImgUploadJawModel"
                      :on-error="handleError">
                      <div v-if="photoForm.downJawModelName">
                        <el-button icon="el-icon-file" class="model-icon-btn" :title="photoForm.downJawModelName">{{photoForm.downJawModelName}}</el-button>
                      </div>
                      <div v-else>
                        <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                      </div>
                    </el-upload>
                    <el-button class="remove-down-btn" v-if="photoForm.downJawModelName" type="text" @click="removeDownJawModel">删除</el-button>
                  </el-col>
                  <el-col span="14">
                    <div class="jaw-model-desc">
                      <div>1.口扫时扫过咬合，导出的上颌STL、下颌STL就会自动带上咬合数据。</div>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="3">
          <span slot="label"><i class="el-icon-document-checked"></i> 提交</span>
          <div class="error-submit">
            <div v-show="showFeedback || showFiles">
              <div class="error-submit-tip">
                <i class="el-icon-warning-outline error-submit-icon"></i>
                <span>您还有以下项目待完善，请确认无误后再提交</span>
              </div>
              <div class="error-submit-noFilled">
                <div class="mb20" v-show="showFeedback">
                  <span class="error-submit-noFilled-type">阶段反馈</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="!feedbackForm.isFit" class="error-submit-noFilled-content-every" @click="clickToFeedback('isFit')">当前矫治器贴合情况</div>
                    <div v-show="!feedbackForm.upSteps && !feedbackForm.downSteps" class="error-submit-noFilled-content-every" @click="clickToFeedback('steps')">本次反馈时佩戴矫治器步数</div>
                    <div v-show="!feedbackForm.correctiveRequire" class="error-submit-noFilled-content-every" @click="clickToFeedback('correctiveRequire')">后续矫治要求</div>
                  </div>
                </div>
                <div v-show="showFiles">
                  <span class="error-submit-noFilled-type">影像资料及模型</span>
                  <div class="error-submit-noFilled-content">
                    <div v-show="showPhoto" class="error-submit-noFilled-content-every" @click="clickToPhoto('photos')">照片</div>
                    <div v-show="!(photoForm.upJawModelPath && photoForm.downJawModelPath)" class="error-submit-noFilled-content-every" @click="clickToPhoto('dental')">牙颌模型</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="!(showFeedback || showFiles)" class="error-submitTrue">
              <i class="el-icon-circle-check error-submitTrue-img"></i>
              <div class="error-submitTrue-tip">
                <div>资料收集完毕，请点击提交！</div>
                <div>提交后，我司将尽快为您处理！</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="restart-case-main-footer">
        <el-button type="primary" v-show="active>1" @click="prev">上一页</el-button>
        <el-button type="primary" v-show="active<3" @click="next">下一页</el-button>
        <el-button type="primary" v-show="active<3" plain @click="caseSubmit('preserve')">暂存</el-button>
        <el-button type="primary" v-show="active === 3" plain @click="caseSubmit('submit')">提交</el-button>
      </div>
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
  import { uploadOBS } from "@/util/obs";
  export default {
    name: "RestartCaseDetail",
    data() {
      return {
        active: 1,
        caseItem: {},
        feedbackForm: {
          isFit: "",
          upSteps: "",
          downSteps: "",
          annex: "",
          annexInfoOne: [],
          annexInfoTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
          annexInfoThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
          annexInfoFour: [],
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
          isAbnormal: "",
          otherChecks: "",
          teethMobile: 1,
          teethMobileOne: [],
          teethMobileTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
          teethMobileThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
          teethMobileFour: [],
          teethAttachment: 1,
          teethAttachmentOne: [],
          teethAttachmentTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
          teethAttachmentThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
          teethAttachmentFour: [],
          flatBear: "",
          remoteTreatments: "",
          correctiveRequire: "",
          notFitOne: "",
          notFitTwo: "",
          notFitThree: "",
          notFitFour: "",
          notFitFive: "",
          notFitSix: "",
        },
        photoForm: {
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
        feedbackRules: {
          upSteps: [
            { required: true, message: '请输入上颌步数', trigger: 'blur' },
          ],
          downSteps: [
            { required: true, message: '请输入下颌步数', trigger: 'blur' },
          ],
          correctiveRequire: [
            { required: true, message: '请输入后续矫治要求', trigger: 'blur' },
          ],
        },
        maxUpSteps: 0,
        maxDownSteps: 0,
        uploadVisible: false,
        percentageNumber: 0,
        activeName: "first",
      }
    },
    computed: {
      showFeedback() {
        return !this.feedbackForm.isFit || (!this.feedbackForm.upSteps && !this.feedbackForm.downSteps) || !this.feedbackForm.correctiveRequire;
      },
      showPhoto() {
        return !this.photoForm.frontSmilingPath
            || !this.photoForm.frontPath
            || !this.photoForm.sidePath
            || !this.photoForm.upJawPath
            || !this.photoForm.downJawPath
            || !this.photoForm.rightJawPath
            || !this.photoForm.frontJawPath
            || !this.photoForm.leftJawPath;
      },
      showFiles() {
        return this.showPhoto || !(this.photoForm.upJawModelPath && this.photoForm.downJawModelPath);
      },
    },
    created() {
      var rParamsData = sessionStorage.getItem("rParamsData");
      if (rParamsData) {
        var rParams = JSON.parse(sessionStorage.getItem("rParamsData"));
      } else {
        var rParams = this.$route.params;
        sessionStorage.setItem("rParamsData", JSON.stringify(rParams));
      }
      this.caseItem = rParams.item;
    },
    beforeDestroy() {
      sessionStorage.removeItem("rParamsData");
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
      caseSubmit(state) {},
      annexChange() {
        this.feedbackForm.annexInfoTwo = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
        this.feedbackForm.annexInfoThree = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
      },
      toStandard(kind) {
        let routeData = this.$router.resolve({
          path: "/case/shootStandard",
          query: {
            kind: kind,
          }
        });
        window.open(routeData.href, '_blank');
      },
      beforeImgUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if (!isJPG && !isPNG) {
          this.$message.error('您只能上传 jpg/png 类型的图片!');
        } else {
          if (file.type) {
            this.percentageNumber = 0;
            this.uploadVisible = true;
          }
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
      handleNotFitOne(res, file) {
        const data = res.data || {};
        this.photoForm.notFitOne = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleNotFitTwo(res, file) {
        const data = res.data || {};
        this.photoForm.notFitTwo = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleNotFitThree(res, file) {
        const data = res.data || {};
        this.photoForm.notFitThree = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleNotFitFour(res, file) {
        const data = res.data || {};
        this.photoForm.notFitFour = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleNotFitFive(res, file) {
        const data = res.data || {};
        this.photoForm.notFitFive = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleNotFitSix(res, file) {
        const data = res.data || {};
        this.photoForm.notFitSix = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSimle(res, file) {
        const data = res.data || {};
        this.photoForm.frontSmilingPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessFront(res, file) {
        const data = res.data || {};
        this.photoForm.frontPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSide(res, file) {
        const data = res.data || {};
        this.photoForm.sidePath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSideUpJaw(res, file) {
        const data = res.data || {};
        this.photoForm.upJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessDownJaw(res, file) {
        const data = res.data || {};
        this.photoForm.downJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessRightJaw(res, file) {
        const data = res.data || {};
        this.photoForm.rightJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessFrontJaw(res, file) {
        const data = res.data || {};
        this.photoForm.frontJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessLeftJaw(res, file) {
        const data = res.data || {};
        this.photoForm.leftJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessAllXray(res, file) {
        const data = res.data || {};
        this.photoForm.allXrayPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSideXray(res, file) {
        const data = res.data || {};
        this.photoForm.sideXrayPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessOtherXray(res, file) {
        const data = res.data || {};
        this.photoForm.otherXrayPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessUpJawModel(res, file) {
        const data = res.data || {};
        this.photoForm.upJawModelPath = data.viewStlUrl;
        this.photoForm.upJawModelName = data.originalName;
        this.uploadVisible = false;
      },
      beforeImgUploadJawModel(file) {
        const isSTL = file.name.toLocaleLowerCase().substring(file.name.lastIndexOf('.')) === ".stl";
        if (!isSTL) {
          this.$message.error('您只能上传 stl 类型的文件!');
        } else {
          if (file.name) {
            this.percentageNumber = 0;
            this.uploadVisible = true;
          }
        }
        return isSTL;
      },
      handleImgSuccessDownJawModel(res, file) {
        const data = res.data || {};
        this.photoForm.downJawModelPath = data.viewStlUrl;
        this.photoForm.downJawModelName = data.originalName;
        this.uploadVisible = false;
      },
      removeUpJawModel() {
        this.photoForm.upJawModelPath = "";
        this.photoForm.upJawModelName = "";
      },
      removeDownJawModel() {
        this.photoForm.downJawModelPath = "";
        this.photoForm.downJawModelName = "";
      },
      clickToFeedback(className) {
        this.active = 1;
        this.$nextTick(() => {
          if (document.querySelector("."+className)) {
            document.querySelector("."+className).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }
        });
      },
      clickToPhoto(className) {
        this.active = 2;
        this.$nextTick(() => {
          if (document.querySelector("."+className)) {
            document.querySelector("."+className).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }
        });
      },
    }
  }
</script>
<style scoped>
  .restart-case-contain {
    width: 1200px;
    margin: 0 auto;
  }
  .restart-case-title {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 16px 0;
  }
  .restart-case-title-main {
    color: #000;
    font-size: 16px;
    width: 100%;
    text-align: center;
  }
  .restart-case-main {
    background: #fff;
    box-shadow: 0 2px 2px 1px #daecef;
    border-radius: 10px;
    padding: 20px;
    width: calc(100% - 40px);
    min-height: 80%;
    position: relative;
    margin-bottom: 93px;
  }
  .restart-case-main >>> .el-tabs__nav-wrap::after {
    height: 0;
  }
  .restart-case-main >>> .el-tabs__nav {
    width: 100%;
  }
  .restart-case-main >>> .el-tabs__item {
    width: 33.33%;
    text-align: center;
  }
  .restart-case-main >>> .el-tabs__nav-wrap {
    background: #f6f7fa;
    border-radius: 4px;
  }
  .arrow-style {
    float: right;
    height: 40px;
    line-height: 40px;
    color: #303133;
  }
  .restart-case-main-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
    padding: 11px 0;
  }
  .restart-case-main-one {
    padding: 30px 0 0 40px;
  }
  .restart-case-main-one-top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .restart-case-main-one-top-img {
    width: 82px;
    height: 82px;
  }
  .top-img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }
  .top-icon {
    font-size: 82px;
  }
  .restart-case-main-one-top-name {
    margin-left: 30px;
    white-space: nowrap;
    font-weight: 400;
    font-size: 26px;
    color: #333;
    max-width: 500px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
  }
  .restart-case-main-one-top-id {
    margin-left: 30px;
    font-weight: 300;
    font-size: 18px;
    color: #999;
  }
  .restart-case-main-one-top-id-span {
    font-weight: 400;
    font-size: 18px;
    color: #555;
  }
  .diagnosis-title {
    font-size: 20px;
    color: #555;
    height: 30px;
    line-height: 30px;
    margin-bottom: 24px;
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
  .common-radio >>> .el-radio__input {
    display: none;
  }
  .common-radio >>> .el-radio.is-bordered {
    text-align: center;
  }
  .w180 >>> .el-radio.is-bordered {
    width: 180px;
  }
  .common-radio >>> .el-radio.is-bordered.is-checked {
    border-color: #409EFF;
    background: #409EFF;
  }
  .common-radio >>> .el-radio__input.is-checked+.el-radio__label {
    color: #fff;
  }
  .not-fit-desc {
    color: #f44336;
    font-size: 14px;
    font-weight: 400;
    margin-left: 152px;
  }
  .hide-desc {
    opacity: 0;
  }
  .restart-case-main-check {
    padding: 0 21px;
  }
  .diagnosis-two-title {
    font-size: 16px;
    font-weight: 300;
    color: #333;
    margin-bottom: 25px;
  }
  .steps-input {
    width: 85px;
    margin: 0 8px;
  }
  .steps-title {
    font-size: 16px;
    font-weight: 300;
    color: #333;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .annex-two-title {
    color: rgba(0,0,0,.85);
    font-size: 14px;
    margin-bottom: 24px;
  }
  .annex-two-content {
    width: 1028px;
    position: relative;
  }
  .annex-two-content::after {
    height: 100%;
    border-right: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: -5px;
    left: 503px;
    z-index: 10;
  }
  .annex-two-content::before {
    width: 1008px;
    border-bottom: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: 102px;
    left: 0;
    z-index: 10;
  }
  .annex-two-checkbox {
    text-align: center;
  }
  .annex-two-checkbox >>> .el-checkbox__input {
    display: none;
  }
  .annex-two-checkbox >>> .el-checkbox.is-bordered {
    width: 42px;
    margin-left: 0;
    margin-right: 22px;
    margin-bottom: 15px;
    text-align: center;
  }
  .annex-two-checkbox >>> .el-checkbox__label {
    padding-left: 0;
    font-size: 20px;
    font-weight: normal;
  }
  .checked-checkbox >>> .el-checkbox.is-bordered {
    background-color: #409EFF;
  }
  .checked-checkbox >>> .el-checkbox.is-bordered.is-checked {
    background-color: #fff;
  }
  .diagnosis-titleNo-tipNo {
    font-size: 16px;
    color: #333;
    margin-top: 15px;
    font-weight: 300;
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
  .w100 >>> .el-radio.is-bordered {
    width: 100px;
  }
  .select-long {
    width: 180px !important;
  }
  .restart-case-main-two {
    padding: 30px 40px 0;
  }
  .common-img-uploader >>> .el-upload {
    border: 1px solid #d9d9d9;
    width: 190px;
    height: 180px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .common-img-uploader-img {
    width: 190px;
    height: 180px;
  }
  .common-img-uploader-icon {
    font-size: 22px;
    color: #8c939d;
    margin-top: 10px;
  }
  .common-img-uploader-text {
    font-size: 14px;
    font-weight: 300;
    color: #8c939d;
    margin-top: 5px;
  }
  .common-img {
    max-width: 190px;
    max-height: 180px;
    display: block;
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
  .photoMt {
    margin-top: 112px;
  }
  .photo-standard {
    color: #409EFF;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    margin-left: 16px;
  }
  .icon-mr4 {
    margin-right: 4px;
  }
  .diagnosis-desc {
    font-size: 18px;
    color: #555;
    font-weight: 300;
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
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .jaw-model-desc {
    font-size: 14px;
    color: #666;
    margin-top: 30px;
  }
  .model-tabs >>> .el-tabs__nav-wrap::after {
    height: 2px;
  }
  .model-tabs >>> .el-tabs__item {
    width: auto;
    text-align: left;
  }
  .model-tabs >>> .el-tabs__nav-wrap {
    background: #fff;
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
