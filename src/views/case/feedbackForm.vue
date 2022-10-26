<template>
  <div class="feedback-form-contain">
    <div class="feedback-form-title">
      <span title="重启反馈表">重启反馈表</span>
    </div>
    <div class="feedback-form-main">
      <div class="feedback-form-info-title">
        <i class="el-icon-user icon-color"></i>基本信息
      </div>
      <div class="feedback-form-info-content">
        <div class="feedback-form-info-img-pack">
          <img class="feedback-form-info-img" v-if="feedbackData.frontPath" :src="feedbackData.frontPath" alt="">
        </div>
        <div class="feedback-form-info-name" v-if="restartData && restartData.name">{{restartData.name}}</div>
        <div class="feedback-form-info-case">
          <span>病例号：</span>
          <span class="case-span" v-if="restartData && restartData.medicalCode">{{restartData.medicalCode}}</span>
        </div>
      </div>
      <div class="feedback-form-info-title">
        <i class="el-icon-chat-line-square icon-color"></i>阶段反馈
      </div>
      <div class="feedback-form-common-content">
        <span class="feedback-form-common-content-title mr10">1. 当前矫治器贴合情况:</span>
        <span class="feedback-form-common-content-title">{{feedbackData.fitSituation | filterFitSituation}}</span>
      </div>
      <div class="feedback-form-common-content">
        <span class="feedback-form-common-content-title">2. 临床检查</span>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">2.1 本次反馈时佩戴矫治器步数为:</div>
          <div class="feedback-form-common-content-every-content">
            <div>
              <span v-if="feedbackData.maxillaryStep">上颌第{{feedbackData.maxillaryStep}}步</span>
              <span v-else>无</span>
            </div>
            <div class="mt10">
              <span v-if="feedbackData.mandibleStep">下颌第{{feedbackData.mandibleStep}}步</span>
              <span v-else>无</span>
            </div>
          </div>
        </div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">2.2 附件调整:</div>
          <div class="feedback-form-common-content-every-content" v-if="feedbackData.enclosureAdjust">{{feedbackData.enclosureAdjust | filterEnclosureAdjust}}</div>
          <div class="feedback-form-common-content-every-content" v-else>无</div>
        </div>
        <div class="feedback-form-common-content-every-no-flex" v-if="feedbackData.enclosureAdjust===2">
          <div class="feedback-form-common-content-every-tip">保留的附件</div>
          <div class="feedback-form-common-content-every-annex">
            <el-checkbox-group v-model="annexInfoOne" class="feedback-form-common-content-every-annex-checkbox">
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
            <el-checkbox-group v-model="annexInfoTwo" class="feedback-form-common-content-every-annex-checkbox checked-checkbox">
              <el-checkbox :label="18" border disabled></el-checkbox>
              <el-checkbox :label="17" border disabled></el-checkbox>
              <el-checkbox :label="16" border disabled></el-checkbox>
              <el-checkbox :label="15" border disabled></el-checkbox>
              <el-checkbox :label="14" border disabled></el-checkbox>
              <el-checkbox :label="13" border disabled></el-checkbox>
              <el-checkbox :label="12" border disabled></el-checkbox>
              <el-checkbox :label="11" border disabled></el-checkbox>
              <el-checkbox :label="21" border disabled></el-checkbox>
              <el-checkbox :label="22" border disabled></el-checkbox>
              <el-checkbox :label="23" border disabled></el-checkbox>
              <el-checkbox :label="24" border disabled></el-checkbox>
              <el-checkbox :label="25" border disabled></el-checkbox>
              <el-checkbox :label="26" border disabled></el-checkbox>
              <el-checkbox :label="27" border disabled></el-checkbox>
              <el-checkbox :label="28" border disabled></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="annexInfoThree" class="feedback-form-common-content-every-annex-checkbox checked-checkbox">
              <el-checkbox :label="48" border disabled></el-checkbox>
              <el-checkbox :label="47" border disabled></el-checkbox>
              <el-checkbox :label="46" border disabled></el-checkbox>
              <el-checkbox :label="45" border disabled></el-checkbox>
              <el-checkbox :label="44" border disabled></el-checkbox>
              <el-checkbox :label="43" border disabled></el-checkbox>
              <el-checkbox :label="42" border disabled></el-checkbox>
              <el-checkbox :label="41" border disabled></el-checkbox>
              <el-checkbox :label="31" border disabled></el-checkbox>
              <el-checkbox :label="32" border disabled></el-checkbox>
              <el-checkbox :label="33" border disabled></el-checkbox>
              <el-checkbox :label="34" border disabled></el-checkbox>
              <el-checkbox :label="35" border disabled></el-checkbox>
              <el-checkbox :label="36" border disabled></el-checkbox>
              <el-checkbox :label="37" border disabled></el-checkbox>
              <el-checkbox :label="38" border disabled></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="annexInfoFour" class="feedback-form-common-content-every-annex-checkbox">
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
        </div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">2.3 牙列间隙:</div>
          <div class="feedback-form-common-content-every-content" v-if="Number(feedbackData.teethClearance) === 0">无</div>
          <div class="feedback-form-common-content-every-content" v-else>有</div>
        </div>
        <div v-if="Number(feedbackData.teethClearance) !== 0" class="feedback-main-every-clearance-tip">反馈1.0mm以下的间隙量</div>
        <div v-if="Number(feedbackData.teethClearance) !== 0" class="feedback-main-every-clearance-main">
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance1" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance2" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance3" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance4" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance5" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance6" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance7" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance8" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance9" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance10" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance11" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance12" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance13" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance14" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-top" v-model="teethClearance15" disabled></el-input>
          <div class="feedback-main-every-clearance-number feedback-main-every-clearance-number-bootom">
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
          <div class="feedback-main-every-clearance-number">
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
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance16" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance17" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance18" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance19" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance20" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance21" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance22" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance23" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance24" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance25" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance26" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance27" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance28" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance29" disabled></el-input>
          <el-input class="feedback-main-every-clearance-input feedback-main-every-clearance-input-bottom" v-model="teethClearance30" disabled></el-input>
        </div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">2.4 颞下颌关节是否存在异常:</div>
          <div class="feedback-form-common-content-every-content" v-if="feedbackData.mandibularJointAbnor">是</div>
          <div class="feedback-form-common-content-every-content" v-else>无</div>
        </div>
        <div class="feedback-form-common-content-every-content-text" v-if="feedbackData.mandibularJointAbnor">{{feedbackData.mandibularJointAbnor}}</div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">2.5 其他检查（包括牙齿错位、松动度、早接触度等）</div>
        </div>
        <div class="feedback-form-common-content-every-content-text">{{feedbackData.otherInspect ? feedbackData.otherInspect : '未填写任何信息'}}</div>
      </div>
      <div class="feedback-form-common-content">
        <span class="feedback-form-common-content-title">3. 前一阶段的设计要求</span>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">3.1 不可移动牙齿:</div>
          <div class="feedback-form-common-content-every-content" v-if="Number(feedbackData.teethMobile) === 0">无</div>
          <div class="feedback-form-common-content-every-content" v-else>有</div>
        </div>
        <div class="feedback-form-common-content-every-no-flex">
          <div class="feedback-form-common-content-every-annex" v-if="Number(feedbackData.teethMobile) !== 0">
            <el-checkbox-group v-model="teethMobileOne" class="feedback-form-common-content-every-annex-checkbox">
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
            <el-checkbox-group v-model="teethMobileTwo" class="feedback-form-common-content-every-annex-checkbox">
              <el-checkbox :label="18" border disabled></el-checkbox>
              <el-checkbox :label="17" border disabled></el-checkbox>
              <el-checkbox :label="16" border disabled></el-checkbox>
              <el-checkbox :label="15" border disabled></el-checkbox>
              <el-checkbox :label="14" border disabled></el-checkbox>
              <el-checkbox :label="13" border disabled></el-checkbox>
              <el-checkbox :label="12" border disabled></el-checkbox>
              <el-checkbox :label="11" border disabled></el-checkbox>
              <el-checkbox :label="21" border disabled></el-checkbox>
              <el-checkbox :label="22" border disabled></el-checkbox>
              <el-checkbox :label="23" border disabled></el-checkbox>
              <el-checkbox :label="24" border disabled></el-checkbox>
              <el-checkbox :label="25" border disabled></el-checkbox>
              <el-checkbox :label="26" border disabled></el-checkbox>
              <el-checkbox :label="27" border disabled></el-checkbox>
              <el-checkbox :label="28" border disabled></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="teethMobileThree" class="feedback-form-common-content-every-annex-checkbox">
              <el-checkbox :label="48" border disabled></el-checkbox>
              <el-checkbox :label="47" border disabled></el-checkbox>
              <el-checkbox :label="46" border disabled></el-checkbox>
              <el-checkbox :label="45" border disabled></el-checkbox>
              <el-checkbox :label="44" border disabled></el-checkbox>
              <el-checkbox :label="43" border disabled></el-checkbox>
              <el-checkbox :label="42" border disabled></el-checkbox>
              <el-checkbox :label="41" border disabled></el-checkbox>
              <el-checkbox :label="31" border disabled></el-checkbox>
              <el-checkbox :label="32" border disabled></el-checkbox>
              <el-checkbox :label="33" border disabled></el-checkbox>
              <el-checkbox :label="34" border disabled></el-checkbox>
              <el-checkbox :label="35" border disabled></el-checkbox>
              <el-checkbox :label="36" border disabled></el-checkbox>
              <el-checkbox :label="37" border disabled></el-checkbox>
              <el-checkbox :label="38" border disabled></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="teethMobileFour" class="feedback-form-common-content-every-annex-checkbox">
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
        </div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">3.2 不可设计附件牙齿:</div>
          <div class="feedback-form-common-content-every-content" v-if="Number(feedbackData.teethAttachment) === 0">无</div>
          <div class="feedback-form-common-content-every-content" v-else>有</div>
        </div>
        <div class="feedback-form-common-content-every-no-flex">
          <div class="feedback-form-common-content-every-annex" v-if="Number(feedbackData.teethAttachment) !== 0">
            <el-checkbox-group v-model="teethAttachmentOne" class="feedback-form-common-content-every-annex-checkbox">
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
            <el-checkbox-group v-model="teethAttachmentTwo" class="feedback-form-common-content-every-annex-checkbox">
              <el-checkbox :label="18" border disabled></el-checkbox>
              <el-checkbox :label="17" border disabled></el-checkbox>
              <el-checkbox :label="16" border disabled></el-checkbox>
              <el-checkbox :label="15" border disabled></el-checkbox>
              <el-checkbox :label="14" border disabled></el-checkbox>
              <el-checkbox :label="13" border disabled></el-checkbox>
              <el-checkbox :label="12" border disabled></el-checkbox>
              <el-checkbox :label="11" border disabled></el-checkbox>
              <el-checkbox :label="21" border disabled></el-checkbox>
              <el-checkbox :label="22" border disabled></el-checkbox>
              <el-checkbox :label="23" border disabled></el-checkbox>
              <el-checkbox :label="24" border disabled></el-checkbox>
              <el-checkbox :label="25" border disabled></el-checkbox>
              <el-checkbox :label="26" border disabled></el-checkbox>
              <el-checkbox :label="27" border disabled></el-checkbox>
              <el-checkbox :label="28" border disabled></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="teethAttachmentThree" class="feedback-form-common-content-every-annex-checkbox">
              <el-checkbox :label="48" border disabled></el-checkbox>
              <el-checkbox :label="47" border disabled></el-checkbox>
              <el-checkbox :label="46" border disabled></el-checkbox>
              <el-checkbox :label="45" border disabled></el-checkbox>
              <el-checkbox :label="44" border disabled></el-checkbox>
              <el-checkbox :label="43" border disabled></el-checkbox>
              <el-checkbox :label="42" border disabled></el-checkbox>
              <el-checkbox :label="41" border disabled></el-checkbox>
              <el-checkbox :label="31" border disabled></el-checkbox>
              <el-checkbox :label="32" border disabled></el-checkbox>
              <el-checkbox :label="33" border disabled></el-checkbox>
              <el-checkbox :label="34" border disabled></el-checkbox>
              <el-checkbox :label="35" border disabled></el-checkbox>
              <el-checkbox :label="36" border disabled></el-checkbox>
              <el-checkbox :label="37" border disabled></el-checkbox>
              <el-checkbox :label="38" border disabled></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="teethAttachmentFour" class="feedback-form-common-content-every-annex-checkbox">
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
        </div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">3.3 前牙平导板（适用于深覆合浅覆盖病例):</div>
          <div class="feedback-form-common-content-every-content" v-if="feedbackData.frontToothFlatGuidePlate === 1">需要</div>
          <div class="feedback-form-common-content-every-content" v-else-if="feedbackData.frontToothFlatGuidePlate === 2">不需要</div>
          <div class="feedback-form-common-content-every-content" v-else>无</div>
        </div>
        <div class="feedback-form-common-content-every">
          <div class="feedback-form-common-content-every-title">3.4 是否远程矫治:</div>
          <div class="feedback-form-common-content-every-content" v-if="feedbackData.remoteTreatments === 1">是</div>
          <div class="feedback-form-common-content-every-content" v-else-if="feedbackData.remoteTreatments === 2">否</div>
          <div class="feedback-form-common-content-every-content" v-else>无</div>
        </div>
      </div>
      <div class="feedback-form-common-content">
        <span class="feedback-form-common-content-title">4. 后续矫治要求</span>
        <div class="feedback-form-common-content-every-content-text">{{feedbackData.correctRequirement ? feedbackData.correctRequirement : '未填写任何信息'}}</div>
      </div>
      <div class="feedback-form-info-title">
        <i class="el-icon-video-camera icon-color"></i>影像及资料
      </div>
      <div class="feedback-photo-title">佩戴矫治器不贴合照片</div>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.noiftPhotoOne" :src="feedbackData.noiftPhotoOne" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">不贴合1</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.noiftPhotoTwo" :src="feedbackData.noiftPhotoTwo" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">不贴合2</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.noiftPhotoThree" :src="feedbackData.noiftPhotoThree" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">不贴合3</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.noiftPhotoFour" :src="feedbackData.noiftPhotoFour" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">不贴合4</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.noiftPhotoFive" :src="feedbackData.noiftPhotoFive" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">不贴合5</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.noiftPhotoSix" :src="feedbackData.noiftPhotoSix" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">不贴合6</div>
        </el-col>
      </el-row>
      <div class="feedback-photo-title">面像及口内照片</div>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.frontSmilingPath" :src="feedbackData.frontSmilingPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">正面微笑照</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.frontPath" :src="feedbackData.frontPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">正面照</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.sidePath" :src="feedbackData.sidePath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">侧面照</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.upJawPath" :src="feedbackData.upJawPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">上颌口内照</div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.downJawPath" :src="feedbackData.downJawPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">下颌口内照</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.rightJawPath" :src="feedbackData.rightJawPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">右侧口内照</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.frontJawPath" :src="feedbackData.frontJawPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">正面口内照</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.leftJawPath" :src="feedbackData.leftJawPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">左侧口内照</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="feedback-photo-title">X光照片</div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <div class="feedback-photo-title">其他影像</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.allXrayPath" :src="feedbackData.allXrayPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">全景片</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.sideXrayPath" :src="feedbackData.sideXrayPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">侧位片</div>
        </el-col>
        <el-col :span="8">
          <div class="feedback-photo-picture-contain">
            <img v-if="feedbackData.otherXrayPath" :src="feedbackData.otherXrayPath" class="feedback-photo-picture-img">
            <i v-else class="el-icon-picture feedback-photo-picture-icon"></i>
          </div>
          <div class="feedback-photo-picture-desc">其他</div>
        </el-col>
      </el-row>
      <div class="feedback-main-every-model">
        <div>牙颌模型：</div>
        <div>
          <div class="mb17">
            <span class="mr10">数字模型文件</span>
            <span v-if="feedbackData.upJawModelName && feedbackData.downJawModelName">
              <span class="feedback-main-every-model-content">本地上传</span>
            </span>
            <span class="feedback-main-every-model-content" v-else>无</span>
          </div>
        </div>
      </div>
      <div v-if="feedbackData.upJawModelName && feedbackData.downJawModelName && feedbackData.upJawModelPath && feedbackData.downJawModelPath" class="feedback-photo-model">
        <div class="mb10">
          <span>上颌</span>
          <div class="feedback-photo-model-text" :title="feedbackData.upJawModelName" @click="downloadPhoto(feedbackData.upJawModelPath)">{{feedbackData.upJawModelName}}</div>
        </div>
        <div>
          <span>下颌</span>
          <div class="feedback-photo-model-text" :title="feedbackData.downJawModelName" @click="downloadPhoto(feedbackData.downJawModelPath)">{{feedbackData.downJawModelName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getFeedbackForm } from "@/api/case/commonCase";
  export default {
    name: "FeedbackForm",
    data() {
      return {
        restartData: {},
        feedbackData: {},
        annexInfoOne: [],
        annexInfoTwo: [],
        annexInfoThree: [],
        annexInfoFour: [],
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
        teethMobileOne: [],
        teethMobileTwo: [],
        teethMobileThree: [],
        teethMobileFour: [],
        teethAttachmentOne: [],
        teethAttachmentTwo: [],
        teethAttachmentThree: [],
        teethAttachmentFour: [],
      }
    },
    props: {
      feedbackObj: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    filters: {
      filterFitSituation(value) {
        if (value === 1) {
          return "矫治器贴合";
        } else if (value === 2) {
          return "矫治器不贴合";
        } else {
          return "无";
        }
      },
      filterEnclosureAdjust(value) {
        if (value === 1) {
          return "由设计方案决定";
        } else if (value === 2) {
          return "保留指定附件";
        } else if (value === 3) {
          return "保留全部附件";
        } else {
          return "无";
        }
      },
    },
    created() {
      if (this.feedbackObj.ifComponents) {
        this.restartData = this.feedbackObj;
      } else {
        this.restartData = JSON.parse(this.$route.query.restartObject);
      }
      if (this.restartData.restartId) {
        this.getFeedbackData(this.restartData.restartId);
      }
    },
    methods: {
      getArrEqual(arr1, arr2) {
        return arr1.filter(item => arr2.indexOf(item) >- 1);
      },
      getFeedbackData(restartId) {
        let params = {
          restartId: restartId,
        }
        getFeedbackForm(params).then(res => {
          if (res.data.code == 200) {
            this.feedbackData = res.data.data;
            let arrayOne = [55,54,53,52,51,61,62,63,64,65];
            let arrayTwo = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
            let arrayThree = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
            let arrayFour = [85,84,83,82,81,71,72,73,74,75];
            let enclosureAppointArray = this.feedbackData.enclosureAppoint ? this.feedbackData.enclosureAppoint.split(",").map(Number) : [];
            this.annexInfoOne = this.getArrEqual(arrayOne, enclosureAppointArray);
            this.annexInfoTwo = this.getArrEqual(arrayTwo, enclosureAppointArray);
            this.annexInfoThree = this.getArrEqual(arrayThree, enclosureAppointArray);
            this.annexInfoFour = this.getArrEqual(arrayFour, enclosureAppointArray);
            if (Number(this.feedbackData.teethClearance) !== 0 && this.feedbackData.teethClearance && this.feedbackData.teethClearance.length) {
              let clearArray = this.feedbackData.teethClearance.split(",");
              this.teethClearance1 = clearArray[0] == "none" ? "" : Number(clearArray[0]);
              this.teethClearance2 = clearArray[1] == "none" ? "" : Number(clearArray[1]);
              this.teethClearance3 = clearArray[2] == "none" ? "" : Number(clearArray[2]);
              this.teethClearance4 = clearArray[3] == "none" ? "" : Number(clearArray[3]);
              this.teethClearance5 = clearArray[4] == "none" ? "" : Number(clearArray[4]);
              this.teethClearance6 = clearArray[5] == "none" ? "" : Number(clearArray[5]);
              this.teethClearance7 = clearArray[6] == "none" ? "" : Number(clearArray[6]);
              this.teethClearance8 = clearArray[7] == "none" ? "" : Number(clearArray[7]);
              this.teethClearance9 = clearArray[8] == "none" ? "" : Number(clearArray[8]);
              this.teethClearance10 = clearArray[9] == "none" ? "" : Number(clearArray[9]);
              this.teethClearance11 = clearArray[10] == "none" ? "" : Number(clearArray[10]);
              this.teethClearance12 = clearArray[11] == "none" ? "" : Number(clearArray[11]);
              this.teethClearance13 = clearArray[12] == "none" ? "" : Number(clearArray[12]);
              this.teethClearance14 = clearArray[13] == "none" ? "" : Number(clearArray[13]);
              this.teethClearance15 = clearArray[14] == "none" ? "" : Number(clearArray[14]);
              this.teethClearance16 = clearArray[15] == "none" ? "" : Number(clearArray[15]);
              this.teethClearance17 = clearArray[16] == "none" ? "" : Number(clearArray[16]);
              this.teethClearance18 = clearArray[17] == "none" ? "" : Number(clearArray[17]);
              this.teethClearance19 = clearArray[18] == "none" ? "" : Number(clearArray[18]);
              this.teethClearance20 = clearArray[19] == "none" ? "" : Number(clearArray[19]);
              this.teethClearance21 = clearArray[20] == "none" ? "" : Number(clearArray[20]);
              this.teethClearance22 = clearArray[21] == "none" ? "" : Number(clearArray[21]);
              this.teethClearance23 = clearArray[22] == "none" ? "" : Number(clearArray[22]);
              this.teethClearance24 = clearArray[23] == "none" ? "" : Number(clearArray[23]);
              this.teethClearance25 = clearArray[24] == "none" ? "" : Number(clearArray[24]);
              this.teethClearance26 = clearArray[25] == "none" ? "" : Number(clearArray[25]);
              this.teethClearance27 = clearArray[26] == "none" ? "" : Number(clearArray[26]);
              this.teethClearance28 = clearArray[27] == "none" ? "" : Number(clearArray[27]);
              this.teethClearance29 = clearArray[28] == "none" ? "" : Number(clearArray[28]);
              this.teethClearance30 = clearArray[29] == "none" ? "" : Number(clearArray[29]);
            }
            let mobileArray = this.feedbackData.teethMobile ? this.feedbackData.teethMobile.split(",").map(Number) : [];
            this.teethMobileOne = [];
            this.teethMobileTwo = this.getArrEqual(arrayTwo, mobileArray);
            this.teethMobileThree = this.getArrEqual(arrayThree, mobileArray);
            this.teethMobileFour = [];
            let attachArray = this.feedbackData.teethAttachment ? this.feedbackData.teethAttachment.split(",").map(Number) : [];
            this.teethAttachmentOne = [];
            this.teethAttachmentTwo = this.getArrEqual(arrayTwo, attachArray);
            this.teethAttachmentThree = this.getArrEqual(arrayThree, attachArray);
            this.teethAttachmentFour = [];
          }
        });
      },
      downloadPhoto(path) {
        window.open(path);
      },
    }
  }
</script>
<style scoped>
  .feedback-form-contain {
    width: 100%;
    width: 1200px;
    margin: 0 auto;
  }
  .feedback-form-title {
    padding: 16px 0;
    text-align: center;
    width: 300px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
    color: #000;
    font-size: 16px;
    font-weight: 400;
  }
  .feedback-form-main {
    background: #fff;
    box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
    border-radius: 10px;
    padding: 60px;
  }
  .feedback-form-info-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  .icon-color {
    color: #409EFF;
    margin-right: 10px;
  }
  .feedback-form-info-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .feedback-form-info-img-pack {
    width: 82px;
    height: 82px;
    margin-right: 30px;
  }
  .feedback-form-info-img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }
  .feedback-form-info-name {
    color: #333;
    font-size: 26px;
    font-weight: 700;
    margin-right: 30px;
  }
  .feedback-form-info-case {
    color: #999;
    font-size: 16px;
    font-weight: 400;
  }
  .case-span {
    color: #555;
    font-size: 18px;
    font-weight: 700;
  }
  .feedback-form-common-content {
    margin-bottom: 60px;
  }
  .feedback-form-common-content-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
  }
  .mr10 {
    margin-right: 10px;
  }
  .mt10 {
    margin-top: 10px;
  }
  .feedback-form-common-content-every {
    padding: 20px 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .feedback-form-common-content-every-no-flex {
    padding: 20px 20px 0;
  }
  .feedback-form-common-content-every-title {
    color: #555;
    font-size: 16px;
    font-weight: 400;
  }
  .feedback-form-common-content-every-content {
    margin-left: 10px;
    color: #333;
    font-size: 18px;
    font-weight: 400;
  }
  .feedback-form-common-content-every-tip {
    color: rgba(0,0,0,.85);
    font-size: 14px;
  }
  .feedback-main-every-clearance-tip {
    color: rgba(0,0,0,.85);
    font-size: 14px;
    padding: 20px;
  }
  .feedback-main-every-clearance-main {
    width: 1100px;
    position: relative;
    padding-left: 20px;
  }
  .feedback-main-every-clearance-input {
    width: 38px;
    margin-left: 33px;
    line-height: 40px;
  }
  .feedback-main-every-clearance-input >>> .el-input__inner {
    height: 24px;
    line-height: 24px;
    padding: 0;
    text-align: center;
  }
  .feedback-main-every-clearance-number {
    color: #bbb;
    font-size: 16px;
    padding-left: 6px;
    width: 1094px;
    line-height: 40px;
  }
  .feedback-main-every-clearance-number-bootom {
    border-bottom: 1px dashed #c5c5c5;
  }
  .feedback-main-every-clearance-number span {
    padding-right: 54px;
  }
  .feedback-main-every-clearance-main::after {
    height: 98px;
    border-right: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: 32px;
    left: 568px;
    z-index: 10;
  }
  .feedback-main-every-clearance-input-top::after {
    height: 14px;
    border-right: 1px solid #DCDFE6;
    display: inline-block;
    content: "";
    position: absolute;
    top: 32px;
    left: 18px;
    z-index: 10;
  }
  .feedback-main-every-clearance-input-bottom::after {
    height: 14px;
    border-right: 1px solid #DCDFE6;
    display: inline-block;
    content: "";
    position: absolute;
    bottom: 32px;
    left: 18px;
    z-index: 10;
  }
  .feedback-form-common-content-every-annex {
    width: 1028px;
    position: relative;
  }
  .feedback-form-common-content-every-annex::after {
    height: 100%;
    border-right: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: -5px;
    left: 503px;
    z-index: 10;
  }
  .feedback-form-common-content-every-annex::before {
    width: 1008px;
    border-bottom: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: 102px;
    left: 0;
    z-index: 10;
  }
  .feedback-form-common-content-every-annex-checkbox {
    text-align: center;
  }
  .feedback-form-common-content-every-annex-checkbox >>> .el-checkbox__input {
    display: none;
  }
  .feedback-form-common-content-every-annex-checkbox >>> .el-checkbox.is-bordered {
    width: 42px;
    margin-left: 0;
    margin-right: 22px;
    margin-bottom: 15px;
    text-align: center;
  }
  .feedback-form-common-content-every-annex-checkbox >>> .el-checkbox__label {
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
  .feedback-form-contain >>> .el-checkbox.is-bordered.is-checked {
    border-color: #409EFF;
  }
  .feedback-form-common-content-every-content-text {
    width: calc(100%-66px);
    background: #f6f7fa;
    border-radius: 4px;
    height: 50px;
    margin: 16px 20px 0;
    padding: 23px;
    color: #555;
    font-size: 17px;
    font-weight: 400;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow-y: auto;
  }
  .feedback-photo-title {
    margin: 30px 0 20px;
    color: #333;
    font-size: 16px;
    font-weight: 400;
  }
  .feedback-photo-picture-contain {
    border: 1px solid #d9d9d9;
    width: 190px;
    height: 180px;
    line-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .feedback-photo-picture-img {
    max-width: 190px;
    max-height: 180px;
    display: block;
  }
  .feedback-photo-picture-icon {
    font-size: 180px;
    color: #d9d9d9;
    width: 190px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .feedback-photo-picture-desc {
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
  .mb20 {
    margin-bottom: 20px;
  }
  .mr10 {
    margin-right: 10px;
  }
  .mb17 {
    margin-bottom: 17px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .feedback-main-every-model {
    margin-top: 30px;
    display: flex;
    color: #555;
    font-size: 16px;
    font-weight: 400;
  }
  .feedback-main-every-model-content {
    color: #333;
    font-size: 16px;
    font-weight: 400;
    margin-right: 10px;
  }
  .feedback-photo-model {
    margin: 0 0 0 170px;
    width: 500px;
    padding: 13px 26px;
    background: #f6f7fa;
    border-radius: 4px;
  }
  .feedback-photo-model>div {
    color: #555;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    display: flex;
  }
  .feedback-photo-model-text {
    color: #409EFF;
    font-size: 18px;
    line-height: 18px;
    font-weight: 400;
    margin-left: 10px;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    cursor: pointer;
  }
</style>
