<template>
  <div class="prescription-contain">
    <div class="prescription-title" v-if="prescriptionData.name">
      <span :title="prescriptionData.name+' 的处方表'">{{prescriptionData.name}} 的处方表</span>
    </div>
    <div class="prescription-main">
      <div class="prescription-main-title">
        <i class="el-icon-user icon-color"></i>基本信息
      </div>
      <div class="prescription-main-information">
        <span class="prescription-main-information-span" v-if="prescriptionData.name"><span :title="prescriptionData.name">{{prescriptionData.name}}</span></span>
        <span class="prescription-main-information-span" v-if="prescriptionData.sex+''">{{prescriptionData.sex | filterSex}}</span>
        <span class="prescription-main-information-span">{{ageData}}岁</span>
      </div>
      <div class="prescription-main-every">
        <span>医疗机构：</span>
        <span class="prescription-main-every-content" v-if="clinicNameData">{{clinicNameData}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>安氏分类：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.annType">{{prescriptionData.annType | filterAnnType}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>骨性分类：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.bonyType">{{prescriptionData.bonyType | filterBonyType}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>错合类型：</span>
        <span v-if="prescriptionData.malocclusionType">
          <span class="prescription-main-every-content" v-for="item in prescriptionData.malocclusionType.split(',').map(Number).sort()" :key="item">{{item | filterMalocclusionType}}</span>
        </span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-title mt60">
        <i class="el-icon-tickets icon-color"></i>诊断及矫治说明
      </div>
      <div class="prescription-main-double-every">
        <div>1.主诉：</div>
        <div>
          <div class="mb17">
            <span class="mr10">牙齿问题</span>
            <span v-if="prescriptionData.ccTeeth">
              <span class="prescription-main-every-content" v-for="item in prescriptionData.ccTeeth.split(',').map(Number).sort()" :key="item">{{item | filterCcTeeth}}</span>
            </span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
          <div>
            <span class="mr10">颌骨问题</span>
            <span v-if="prescriptionData.ccJaw">
              <span class="prescription-main-every-content" v-for="item in prescriptionData.ccJaw.split(',').map(Number).sort()" :key="item">{{item | filterCcJaw}}</span>
            </span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
        </div>
      </div>
      <div class="prescription-main-every">
        <span class="mr10">2.主要矫治目标：牙齿问题</span>
        <span v-if="prescriptionData.teeth">
          <span class="prescription-main-every-content" v-for="item in prescriptionData.teeth.split(',').map(Number).sort()" :key="item">{{item | filterTeeth}}</span>
        </span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>3.拟矫治牙颌：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.orthodonticJaw">{{prescriptionData.orthodonticJaw | filterOrthodonticJaw}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>4.牙齿信息</span>
      </div>
      <div class="prescription-main-every-info-item mt20">
        <el-checkbox-group v-model="teethInformationOne" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethInformationTwo" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethInformationThree" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethInformationFour" class="prescription-main-every-info-select">
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
      <div class="prescription-main-every">
        <span>5.有无间隙：</span>
        <span class="prescription-main-every-content" v-if="Number(prescriptionData.teethClearance) === 0">无</span>
        <span class="prescription-main-every-content" v-else>有</span>
      </div>
      <div v-if="Number(prescriptionData.teethClearance) !== 0" class="prescription-main-every-clearance-main mt20">
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance1" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance2" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance3" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance4" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance5" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance6" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance7" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance8" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance9" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance10" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance11" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance12" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance13" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance14" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-top" v-model="teethClearance15" disabled></el-input>
        <div class="prescription-main-every-clearance-number prescription-main-every-clearance-number-bootom">
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
        <div class="prescription-main-every-clearance-number">
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
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance16" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance17" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance18" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance19" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance20" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance21" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance22" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance23" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance24" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance25" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance26" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance27" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance28" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance29" disabled></el-input>
        <el-input class="prescription-main-every-clearance-input prescription-main-every-clearance-input-bottom" v-model="teethClearance30" disabled></el-input>
      </div>
      <div class="prescription-main-every">
        <span>6.不可移动牙齿：</span>
        <span class="prescription-main-every-content" v-if="Number(prescriptionData.teethMobile) === 0">无</span>
        <span class="prescription-main-every-content" v-else>有</span>
      </div>
      <div v-if="Number(prescriptionData.teethMobile) !== 0" class="prescription-main-every-info-item mt20">
        <el-checkbox-group v-model="teethMobileOne" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethMobileTwo" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethMobileThree" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethMobileFour" class="prescription-main-every-info-select">
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
      <div class="prescription-main-every">
        <span>7.不可设计附件牙齿：</span>
        <span class="prescription-main-every-content" v-if="Number(prescriptionData.teethAttachment) === 0">无</span>
        <span class="prescription-main-every-content" v-else>有</span>
      </div>
      <div v-if="Number(prescriptionData.teethAttachment) !== 0" class="prescription-main-every-info-item mt20">
        <el-checkbox-group v-model="teethAttachmentOne" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethAttachmentTwo" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethAttachmentThree" class="prescription-main-every-info-select">
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
        <el-checkbox-group v-model="teethAttachmentFour" class="prescription-main-every-info-select">
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
      <div class="prescription-main-every">
        <span>8.面型：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.surfaceType">{{prescriptionData.surfaceType | filterSurfaceType}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-double-every">
        <div>9.矢状关系：</div>
        <div>
          <div class="mb17">
            <span class="mr10">右</span>
            <span class="prescription-main-every-content" v-if="prescriptionData.sagittalRight">{{prescriptionData.sagittalRight | filterSagittal}}</span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
          <div>
            <span class="mr10">左</span>
            <span class="prescription-main-every-content" v-if="prescriptionData.sagittalLeft">{{prescriptionData.sagittalLeft | filterSagittal}}</span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
        </div>
      </div>
      <div class="prescription-main-every">
        <span>10.覆盖：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.cover">{{prescriptionData.cover | filterCover}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>11.覆合：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.combined">{{prescriptionData.combined | filterCombined}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>12.前牙反合/对刃合：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.frontTeeth">{{prescriptionData.frontTeeth | filterFrontTeeth}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>13.后牙反合或锁合：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.afterTeeth">{{prescriptionData.afterTeeth | filterAfterTeeth}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>14.中线：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.midline">{{prescriptionData.midline | filterMidline}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-double-every">
        <div>15.间隙的矫治：</div>
        <div>
          <div class="mb17">
            <span class="mr10">上颌</span>
            <span class="prescription-main-every-content" v-if="prescriptionData.clearanceCorrectUp">{{prescriptionData.clearanceCorrectUp | filterClearanceCorrect}}</span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
          <div>
            <span class="mr10">下颌</span>
            <span class="prescription-main-every-content" v-if="prescriptionData.clearanceCorrectDown">{{prescriptionData.clearanceCorrectDown | filterClearanceCorrect}}</span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
        </div>
      </div>
      <div class="prescription-main-double-every">
        <div>16.拥挤的矫治：</div>
        <div>
          <div class="mb17 flex-div">
            <span class="mr10">上颌</span>
            <div>
              <div class="mb17">
                <span>扩弓-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.enlargeBowUp">{{prescriptionData.enlargeBowUp | filterEnlargeBow}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
              <div class="mb17">
                <span>唇倾-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.lipDipUp">{{prescriptionData.lipDipUp | filterEnlargeBow}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
              <div class="mb17">
                <span>邻面去釉-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.adjacentGlazeUp">{{prescriptionData.adjacentGlazeUp | filterEnlargeBow}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
              <div>
                <span>远移磨牙-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.farRemovedMolarUp">{{prescriptionData.farRemovedMolarUp | filterFarRemovedMolar}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
            </div>
          </div>
          <div class="mb17 flex-div">
            <span class="mr10">下颌</span>
            <div>
              <div class="mb17">
                <span>扩弓-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.enlargeBowDown">{{prescriptionData.enlargeBowDown | filterEnlargeBow}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
              <div class="mb17">
                <span>唇倾-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.lipDipDown">{{prescriptionData.lipDipDown | filterEnlargeBow}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
              <div class="mb17">
                <span>邻面去釉-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.adjacentGlazeDown">{{prescriptionData.adjacentGlazeDown | filterEnlargeBow}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
              <div>
                <span>远移磨牙-</span>
                <span class="prescription-main-every-content" v-if="prescriptionData.farRemovedMolarDown">{{prescriptionData.farRemovedMolarDown | filterFarRemovedMolar}}</span>
                <span class="prescription-main-every-content" v-else>无</span>
              </div>
            </div>
          </div>
          <div>
            <span>拔除牙齿：</span>
            <span class="prescription-main-every-content" v-if="toothExtractionExcept">{{toothExtractionExcept}}</span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
        </div>
      </div>
      <div class="prescription-main-every">
        <span>17.是否配合种植支抗钉：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.plantingNail">{{prescriptionData.plantingNail | filterYesOrNo}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>18.颞下颌关节是否存在异常：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.temporomandibularJoint">{{prescriptionData.temporomandibularJoint | filterYesOrNo}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>19.是否远程治疗：</span>
        <span class="prescription-main-every-content" v-if="prescriptionData.remoteTreatments">{{prescriptionData.remoteTreatments | filterYesOrNo}}</span>
        <span class="prescription-main-every-content" v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>20.特殊说明：</span>
      </div>
      <div class="prescription-main-content">
        <span v-if="prescriptionData.specialInstructions">{{prescriptionData.specialInstructions}}</span>
        <span v-else>未填写特殊说明~</span>
      </div>
      <div class="prescription-main-title mt60">
        <i class="el-icon-video-camera icon-color"></i>影像及资料
      </div>
      <div class="prescription-photo-title">面像及口内照片</div>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.frontSmilingPath" :src="photoData.frontSmilingPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">正面微笑照</div>
        </el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.frontPath" :src="photoData.frontPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">正面照</div>
        </el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.sidePath" :src="photoData.sidePath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">侧面照</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.upJawPath" :src="photoData.upJawPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">上颌口内照</div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.downJawPath" :src="photoData.downJawPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">下颌口内照</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.rightJawPath" :src="photoData.rightJawPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">右侧口内照</div>
        </el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.frontJawPath" :src="photoData.frontJawPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">正面口内照</div>
        </el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.leftJawPath" :src="photoData.leftJawPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">左侧口内照</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="prescription-photo-title">X光照片</div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <div class="prescription-photo-title">其他影像</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.allXrayPath" :src="photoData.allXrayPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">全景片</div>
        </el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.sideXrayPath" :src="photoData.sideXrayPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">侧位片</div>
        </el-col>
        <el-col :span="8">
          <div class="prescription-photo-picture-contain">
            <img v-if="photoData.otherXrayPath" :src="photoData.otherXrayPath" class="prescription-photo-picture-img">
            <i v-else class="el-icon-picture prescription-photo-picture-icon"></i>
          </div>
          <div class="prescription-photo-picture-desc">其他</div>
        </el-col>
      </el-row>
      <div class="prescription-main-double-every">
        <div>牙颌模型：</div>
        <div>
          <div class="mb17">
            <span class="mr10">数字模型文件</span>
            <span v-if="photoData.upJawModelName && photoData.downJawModelName">
              <span class="prescription-main-every-content">本地上传</span>
            </span>
            <span class="prescription-main-every-content" v-else>无</span>
          </div>
        </div>
      </div>
      <div v-if="photoData.upJawModelName && photoData.downJawModelName && photoData.upJawModelPath && photoData.downJawModelPath" class="prescription-photo-model">
        <div class="mb10">
          <span>上颌</span>
          <div class="prescription-photo-model-text" :title="photoData.upJawModelName" @click="downloadPhoto(photoData.upJawModelPath)">{{photoData.upJawModelName}}</div>
        </div>
        <div>
          <span>下颌</span>
          <div class="prescription-photo-model-text" :title="photoData.downJawModelName" @click="downloadPhoto(photoData.downJawModelPath)">{{photoData.downJawModelName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPrescriptionDetail } from "@/api/case/commonCase";
export default {
  name: "PrescriptionDetails",
  data() {
    return {
      currentPhotoId: "",
      currentPrescriptionId: "",
      ageData: 0,
      clinicNameData: "",
      photoData: {},
      prescriptionData: {},
      teethInformationOne: [],
      teethInformationTwo: [],
      teethInformationThree: [],
      teethInformationFour: [],
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
      toothExtractionExcept: "",
    }
  },
  filters: {
    filterSex(value) {
      if (value === 0) {
        return "女";
      } else if (value === 1) {
        return "男";
      } else {
        return "未知";
      }
    },
    filterAnnType(value) {
      if (value === 1) {
        return "安氏I类";
      } else if (value === 2) {
        return "安氏II类";
      } else if (value === 3) {
        return "安氏III类";
      } else if (value === 4) {
        return "不确定";
      } else {
        return "无";
      }
    },
    filterBonyType(value) {
      if (value === 1) {
        return "骨性I类";
      } else if (value === 2) {
        return "骨性II类";
      } else if (value === 3) {
        return "骨性III类";
      } else {
        return "无";
      }
    },
    filterMalocclusionType(value) {
      if (value === 1) {
        return "牙前突";
      } else if (value === 2) {
        return "拥挤";
      } else if (value === 3) {
        return "牙列间隙";
      } else if (value === 4) {
        return "深覆合";
      } else if (value === 5) {
        return "前牙反合";
      } else if (value === 6) {
        return "后牙反合";
      } else if (value === 7) {
        return "后牙锁合";
      } else if (value === 8) {
        return "开合";
      } else if (value === 9) {
        return "上颌前突";
      } else if (value === 10) {
        return "上颌发育不足";
      } else if (value === 11) {
        return "下颌前突";
      } else if (value === 12) {
        return "下颌后缩";
      } else {
        return "无";
      }
    },
    filterCcTeeth(value) {
      if (value === 1) {
        return "牙前突";
      } else if (value === 2) {
        return "牙列不齐";
      } else if (value === 3) {
        return "牙间隙";
      } else if (value === 4) {
        return "反合";
      } else if (value === 5) {
        return "开合";
      } else if (value === 6) {
        return "后牙锁合";
      } else if (value === 7) {
        return "其他";
      } else {
        return "无";
      }
    },
    filterCcJaw(value) {
      if (value === 1) {
        return "上颌前突";
      } else if (value === 2) {
        return "上颌发育不足";
      } else if (value === 3) {
        return "下颌前突";
      } else if (value === 4) {
        return "下颌后缩";
      } else {
        return "无";
      }
    },
    filterTeeth(value) {
      if (value === 1) {
        return "改善牙前突";
      } else if (value === 2) {
        return "排齐牙齿";
      } else if (value === 3) {
        return "关闭牙间隙";
      } else if (value === 4) {
        return "纠正反合";
      } else if (value === 5) {
        return "纠正开合";
      } else if (value === 6) {
        return "纠正后牙锁合";
      } else if (value === 7) {
        return "其他";
      } else {
        return "无";
      }
    },
    filterOrthodonticJaw(value) {
      if (value === 1) {
        return "全颌";
      } else if (value === 2) {
        return "上颌";
      } else if (value === 3) {
        return "下颌";
      } else {
        return "无";
      }
    },
    filterSurfaceType(value) {
      if (value === 1) {
        return "维持";
      } else if (value === 2) {
        return "改善";
      } else {
        return "无";
      }
    },
    filterSagittal(value) {
      if (value === 1) {
        return "维持";
      } else if (value === 2) {
        return "仅改善尖牙关系";
      } else if (value === 3) {
        return "改善尖牙和磨牙关系";
      } else if (value === 4) {
        return "调整到中性关系";
      } else {
        return "无";
      }
    },
    filterCover(value) {
      if (value === 1) {
        return "维持";
      } else if (value === 2) {
        return "改善";
      } else {
        return "无";
      }
    },
    filterCombined(value) {
      if (value === 1) {
        return "维持";
      } else if (value === 2) {
        return "纠正开合";
      } else if (value === 3) {
        return "纠正深覆合";
      } else {
        return "无";
      }
    },
    filterFrontTeeth(value) {
      if (value === 1) {
        return "不纠正";
      } else if (value === 2) {
        return "纠正前牙反合";
      } else if (value === 3) {
        return "纠正前牙对刃合";
      } else {
        return "无";
      }
    },
    filterAfterTeeth(value) {
      if (value === 1) {
        return "不纠正";
      } else if (value === 2) {
        return "纠正";
      } else {
        return "无";
      }
    },
    filterMidline(value) {
      if (value === 1) {
        return "维持中线";
      } else if (value === 2) {
        return "改善中线";
      } else {
        return "无";
      }
    },
    filterClearanceCorrect(value) {
      if (value === 1) {
        return "前牙内收";
      } else if (value === 2) {
        return "前牙内收,后牙近移";
      } else if (value === 3) {
        return "后牙近移";
      } else {
        return "无";
      }
    },
    filterEnlargeBow(value) {
      if (value === 1) {
        return "首选";
      } else if (value === 2) {
        return "可选";
      } else if (value === 3) {
        return "不可";
      } else {
        return "无";
      }
    },
    filterFarRemovedMolar(value) {
      if (value === 1) {
        return "右上";
      } else if (value === 2) {
        return "左上";
      } else {
        return "无";
      }
    },
    filterYesOrNo(value) {
      if (value === 1) {
        return "是";
      } else if (value === 2) {
        return "否";
      } else {
        return "无";
      }
    },
  },
  created() {
    this.currentPhotoId = this.$route.query.photoId || "";
    this.currentPrescriptionId = this.$route.query.prescriptionId || "";
    if (this.currentPhotoId && this.currentPrescriptionId) {
      this.getPrescriptionData(this.currentPhotoId, this.currentPrescriptionId);
    }
  },
  methods: {
    getArrEqual(arr1, arr2) {
      return arr1.filter(item => arr2.indexOf(item) >- 1);
    },
    getArrExcept(arr1, arr2) {
      return arr1.filter(item => arr2.indexOf(item) <= -1);
    },
    getPrescriptionData(cPhotoId, cPrescriptionId) {
      let params = {
        photoId: cPhotoId,
        prescriptionId: cPrescriptionId,
      }
      getPrescriptionDetail(params).then(res => {
        if (res.data.code == 200) {
          this.ageData = res.data.data.age;
          this.clinicNameData = res.data.data.clinicName;
          this.photoData = res.data.data.photo;
          this.prescriptionData = res.data.data.prescription;
          let arrayOne = [55,54,53,52,51,61,62,63,64,65];
          let arrayTwo = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
          let arrayThree = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
          let arrayFour = [85,84,83,82,81,71,72,73,74,75];
          let teethInformationArray = this.prescriptionData.teethInformation ? this.prescriptionData.teethInformation.split(",").map(Number) : [];
          this.teethInformationOne = this.getArrEqual(arrayOne, teethInformationArray);
          this.teethInformationTwo = this.getArrEqual(arrayTwo, teethInformationArray);
          this.teethInformationThree = this.getArrEqual(arrayThree, teethInformationArray);
          this.teethInformationFour = this.getArrEqual(arrayFour, teethInformationArray);
          if (Number(this.prescriptionData.teethClearance) !== 0) {
            let clearArray = this.prescriptionData.teethClearance.split(",");
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
          let mobileArray = this.prescriptionData.teethMobile ? this.prescriptionData.teethMobile.split(",").map(Number) : [];
          this.teethMobileOne = [];
          this.teethMobileTwo = this.getArrEqual(arrayTwo, mobileArray);
          this.teethMobileThree = this.getArrEqual(arrayThree, mobileArray);
          this.teethMobileFour = [];
          let attachArray = this.prescriptionData.teethAttachment ? this.prescriptionData.teethAttachment.split(",").map(Number) : [];
          this.teethAttachmentOne = [];
          this.teethAttachmentTwo = this.getArrEqual(arrayTwo, attachArray);
          this.teethAttachmentThree = this.getArrEqual(arrayThree, attachArray);
          this.teethAttachmentFour = [];
          if (Number(this.prescriptionData.toothExtraction) !== 0) {
            let arrayTooth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
            let toothExtractionArray = this.prescriptionData.toothExtraction ? this.prescriptionData.toothExtraction.split(",").map(Number) : [];
            this.toothExtractionExcept = this.getArrExcept(arrayTooth, toothExtractionArray).sort().join(" ");
          }
        }
      });
    },
    downloadPhoto(path) {
      window.open(path);
    },
  },
}
</script>
<style scoped>
.prescription-contain {
  width: 100%;
  width: 1200px;
  margin: 0 auto;
}
.prescription-title {
  padding: 16px 0;
  text-align: center;
  width: 500px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
}
.prescription-main {
  padding: 60px 50px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
  border-radius: 10px;
}
.prescription-main-title {
  color: #555;
  font-size: 20px;
  white-space: nowrap;
  font-weight: 400;
}
.icon-color {
  color: #409EFF;
  margin-right: 10px;
}
.prescription-main-information {
  color: #333;
  font-size: 16px;
  white-space: nowrap;
  font-weight: 400;
  margin-top: 31px;
}
.prescription-main-information-span {
  margin-right: 50px;
  max-width: 500px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.mt60 {
  margin-top: 60px;
}
.prescription-main-every {
  color: #555;
  white-space: nowrap;
  font-weight: 400;
  margin-top: 31px;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.prescription-main-every-content {
  color: #333;
  font-size: 16px;
  white-space: nowrap;
  font-weight: 400;
  margin-right: 10px;
}
.prescription-main-double-every {
  margin-top: 31px;
  display: flex;
  color: #555;
  font-size: 16px;
  white-space: nowrap;
  font-weight: 400;
}
.mr10 {
  margin-right: 10px;
}
.mb17 {
  margin-bottom: 17px;
}
.mt20 {
  margin-top: 20px;
}
.prescription-main-every-info-select {
  text-align: center;
}
.prescription-main-every-info-select >>> .el-checkbox__input {
  display: none;
}
.prescription-main-every-info-select >>> .el-checkbox.is-bordered {
  width: 42px;
  margin-left: 0;
  margin-right: 22px;
  margin-bottom: 15px;
  text-align: center;
}
.prescription-main-every-info-select >>> .el-checkbox__label {
  padding-left: 0;
  font-size: 20px;
  font-weight: normal;
}
.prescription-main-every-info-item {
  width: 1028px;
  position: relative;
}
.prescription-main-every-info-item::after {
  height: 100%;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: -5px;
  left: 503px;
  z-index: 10;
}
.prescription-main-every-info-item::before {
  width: 1008px;
  border-bottom: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 102px;
  left: 0;
  z-index: 10;
}
.prescription-contain >>> .el-checkbox.is-bordered.is-checked {
  border-color: #409EFF;
}
.prescription-main-every-clearance-main {
  width: 1100px;
  position: relative;
}
.prescription-main-every-clearance-input {
  width: 38px;
  margin-left: 33px;
  line-height: 40px;
}
.prescription-main-every-clearance-input >>> .el-input__inner {
  height: 24px;
  line-height: 24px;
  padding: 0;
  text-align: center;
}
.prescription-main-every-clearance-number {
  color: #bbb;
  font-size: 16px;
  padding-left: 6px;
  width: 1100px;
  line-height: 40px;
}
.prescription-main-every-clearance-number-bootom {
  border-bottom: 1px dashed #c5c5c5;
}
.prescription-main-every-clearance-number span {
  padding-right: 54px;
}
.prescription-main-every-clearance-main::after {
  height: 98px;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 32px;
  left: 548px;
  z-index: 10;
}
.prescription-main-every-clearance-input-top::after {
  height: 14px;
  border-right: 1px solid #DCDFE6;
  display: inline-block;
  content: "";
  position: absolute;
  top: 32px;
  left: 18px;
  z-index: 10;
}
.prescription-main-every-clearance-input-bottom::after {
  height: 14px;
  border-right: 1px solid #DCDFE6;
  display: inline-block;
  content: "";
  position: absolute;
  bottom: 32px;
  left: 18px;
  z-index: 10;
}
.flex-div {
  display: flex;
}
.prescription-main-content {
  background: #f6f7fa;
  width: 1050px;
  border-radius: 4px;
  padding: 25px;
  margin-top: 20px;
  font-size: 17px;
  word-break: break-all;
  white-space: pre-wrap;
}
.prescription-photo-title {
  margin: 30px 0 20px;
  color: #333;
  font-size: 16px;
  line-height: 16px;
  white-space: nowrap;
  font-weight: 400;
}
.prescription-photo-picture-contain {
  border: 1px solid #d9d9d9;
  width: 190px;
  height: 180px;
  line-height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.prescription-photo-picture-img {
  max-width: 190px;
  max-height: 180px;
  display: block;
}
.prescription-photo-picture-icon {
  font-size: 180px;
  color: #d9d9d9;
  width: 190px;
  height: 180px;
  line-height: 180px;
  text-align: center;
}
.prescription-photo-picture-desc {
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
.prescription-photo-model {
    margin: 0 0 0 170px;
    width: 500px;
    padding: 13px 26px;
    background: #f6f7fa;
    border-radius: 4px;
}
.prescription-photo-model>div {
  color: #555;
  font-size: 16px;
  line-height: 16px;
  white-space: nowrap;
  font-weight: 400;
  display: flex;
}
.prescription-photo-model-text {
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
.mb10 {
  margin-bottom: 10px
}
</style>
