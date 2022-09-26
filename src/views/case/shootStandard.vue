<template>
<div class="shoot-standard-contain">
  <div class="shoot-standard-tabs">
    <el-button :type="activeName === 'photo' ? 'primary' : ''" @click="handleTabs('photo')">照片拍摄标准</el-button>
    <el-button :type="activeName === 'slice' ? 'primary' : ''" @click="handleTabs('slice')">X光片拍摄标准</el-button>
    <el-button :type="activeName === 'jaw' ? 'primary' : ''" @click="handleTabs('jaw')">模型制取标准</el-button>
  </div>
  <el-row class="shoot-standard-main" v-if="activeName === 'photo'">
    <el-col :span="5" class="shoot-standard-main-catalogue">
      <div class="shoot-standard-main-catalogue-title">本页目录</div>
      <div v-for="item in photoObjArr" :key="item.name">
        <div
          class="shoot-standard-main-catalogue-link"
          :class="{'shoot-standard-main-catalogue-link-active': activeLink === item.name}"
          @click.prevent="handleLinks(item.name)">
          {{item.label}}
        </div>
      </div>
    </el-col>
    <el-col :span="19" class="shoot-standard-main-document">
      <div class="shoot-standard-main-document-title">照片拍摄标准</div>
      <el-row id="onePhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">基本要求</div>
          <div class="shoot-standard-main-document-main-text">1.面像背景稳定、患者稍离开背景、无阴影；</div>
          <div class="shoot-standard-main-document-main-text">2.照口内像时视野中应无唾液、口红、菌斑、结石、血液等；</div>
          <div class="shoot-standard-main-document-main-text">3.口内像应只包括牙齿和软组织；</div>
          <div class="shoot-standard-main-document-main-text">4.使用反光板拍摄的照片在提交时应反转至正确方向，以免造成混乱。</div>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row id="twoPhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">正面像</div>
          <div class="shoot-standard-main-document-main-text">1.患者站立或坐立，两眼平视，颏部与地面平行；</div>
          <div class="shoot-standard-main-document-main-text">2.牙齿自然咬合在牙尖交错位，唇自然放松；</div>
          <div class="shoot-standard-main-document-main-text">3.鼻子在画面中央；</div>
          <div class="shoot-standard-main-document-main-text">4.相机正对患者，与牙𬌗平面平行；</div>
          <div class="shoot-standard-main-document-main-text">5.照片应包括肩上部到头顶。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_one.jpg" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="threePhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">正面微笑像</div>
          <div class="shoot-standard-main-document-main-text">1.患者站立或坐立，两眼平视，颏部与地面平行；</div>
          <div class="shoot-standard-main-document-main-text">2.指导患者在牙尖交错咬合状态下自然充分微笑，便于观察牙列中线；</div>
          <div class="shoot-standard-main-document-main-text">3.鼻子在画面中央，颏部接近下边缘，颈部在边缘；</div>
          <div class="shoot-standard-main-document-main-text">4.相机正对患者，与𬌗平面平行；</div>
          <div class="shoot-standard-main-document-main-text">5.照片应包括肩上部到头顶。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_two.jpg" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="fourPhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">侧面面像</div>
          <div class="shoot-standard-main-document-main-text">1.患者站立或坐立，两眼平视，颏部与地面平行；</div>
          <div class="shoot-standard-main-document-main-text">2.指导患者在牙尖交错咬合状态下自然充分微笑，便于观察牙列中线；</div>
          <div class="shoot-standard-main-document-main-text">3.鼻子在画面中央，颏部接近下边缘，颈部在边缘；</div>
          <div class="shoot-standard-main-document-main-text">4.相机正对患者，与𬌗平面平行；</div>
          <div class="shoot-standard-main-document-main-text">5.照片应包括肩上部到头顶。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_three.jpg" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="fivePhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">口内正面像</div>
          <div class="shoot-standard-main-document-main-text">1.患者躺在一个舒适的高度；</div>
          <div class="shoot-standard-main-document-main-text">2.清理唾液；</div>
          <div class="shoot-standard-main-document-main-text">3.用大头开口器向侧前方(不是向后)拉开口颊；</div>
          <div class="shoot-standard-main-document-main-text">4.𬌗平面与地面平行，并位于画面垂直向中央；</div>
          <div class="shoot-standard-main-document-main-text">5.牙尖交错咬合，舌后置；</div>
          <div class="shoot-standard-main-document-main-text">6.在患者正前方镜头与中线垂直，以一侧尖牙对焦后，镜头移至前牙中线拍摄，要有足够景深，保证前后牙均清晰；</div>
          <div class="shoot-standard-main-document-main-text">7.尽可能也拍到磨牙颊侧面。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_four.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="sixPhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">上颌𬌗面像（上牙列像）</div>
          <div class="shoot-standard-main-document-main-text">1.用末端小的颊部开口器(侧方开口器) ；</div>
          <div class="shoot-standard-main-document-main-text">2.患者大张口，颏部向下斜。将上唇向上、侧、前方牵引，也可以让患者自己牵引；</div>
          <div class="shoot-standard-main-document-main-text">3.把反光板放入口内，并纳入第二磨牙；</div>
          <div class="shoot-standard-main-document-main-text">4.舌头位于反光板下，反光板向下直到碰到下切牙。若反光板放置正确，应能看到上颌切牙的腭侧面；</div>
          <div class="shoot-standard-main-document-main-text">5.反光板边缘和嘴唇在画面内尽量少。鼻子和反射的牙齿也应在画面之外；</div>
          <div class="shoot-standard-main-document-main-text">6.尽量包括更多的牙齿，照片至少包括中切牙唇侧前1-2mm和第二磨牙近中；</div>
          <div class="shoot-standard-main-document-main-text">7.镜头与反光板呈约45°角；</div>
          <div class="shoot-standard-main-document-main-text">8.以一侧前磨牙区对焦，再将镜头移至腭顶拍摄。不要以腭顶部对焦点。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_five.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="sevenPhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">下颌𬌗面像（下牙列像）</div>
          <div class="shoot-standard-main-document-main-text">1.用末端小的颊部开口器(侧方开口器) ；</div>
          <div class="shoot-standard-main-document-main-text">2.椅位和患者头部尽量斜向后，尽量大张口；</div>
          <div class="shoot-standard-main-document-main-text">3.用小头侧方拉钩，将口唇向下、侧、前方牵引；</div>
          <div class="shoot-standard-main-document-main-text">4.反光板大头放入口内，舌向上置于反光板后，向上倾斜反光板，直到碰到上切牙。若反光板放置正确，应该能看到下切牙的舌侧面；</div>
          <div class="shoot-standard-main-document-main-text">5.反光板边缘和嘴唇在画面内尽量少，鼻子和反射的牙齿也应在画面之外；</div>
          <div class="shoot-standard-main-document-main-text">6.尽量包括更多的牙齿，照片至少包括中切牙唇侧前1-2mm和第二二磨牙近中；</div>
          <div class="shoot-standard-main-document-main-text">7.镜头与反光板呈约60°角；</div>
          <div class="shoot-standard-main-document-main-text">8.以一侧前磨牙区对焦，再将镜头移至口底拍摄。不要以口底对焦点。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_six.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="eightPhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">口内左（右）侧位像</div>
          <div class="shoot-standard-main-document-main-text">1.患者头尽量偏向左(或右) ，用小头侧方拉钩(两个)拉开口颊；</div>
          <div class="shoot-standard-main-document-main-text">2.𬌗平面与地面平行，并在画面中央；</div>
          <div class="shoot-standard-main-document-main-text">3.牙尖交错咬合，舌后置；</div>
          <div class="shoot-standard-main-document-main-text">4.尽量把工作侧颊部向侧方牵引(而不是向后) ，对侧拉钩位于中央；</div>
          <div class="shoot-standard-main-document-main-text">5.镜头与牙列侧方垂直；</div>
          <div class="shoot-standard-main-document-main-text">6.照片中应看到磨牙和尖牙关系，尖牙位置放置在图像中央，同时显露对侧中切牙。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_seven.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="ninePhoto" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">口内45°覆𬌗覆盖像</div>
          <div class="shoot-standard-main-document-main-text">1.用大头开口器向侧前方拉开口颊，然后开口器略向下旋转，以免下唇阻挡前牙区覆𬌗覆盖的拍摄；</div>
          <div class="shoot-standard-main-document-main-text">2.患者牙尖交错咬合，舌后置；</div>
          <div class="shoot-standard-main-document-main-text">3.患者头向后仰45°，使牙𬌗平面与地面呈45°仰角，前牙区覆𬌗覆盖位于画面垂直向中央；</div>
          <div class="shoot-standard-main-document-main-text">4.在患者正前方镜头与中线垂直，以一侧尖牙对焦后，镜头移至前牙覆𬌗覆盖区拍摄；</div>
          <div class="shoot-standard-main-document-main-text">5.尽量包括更多的牙齿，照片至少包括3-3牙位；</div>
          <div class="shoot-standard-main-document-main-text">6.如前牙区反𬌗，则拍摄角度相反-头向下俯角45°拍摄前牙区反覆𬌗反覆盖，开口器略向上旋转，以免上唇阻挡前牙区反覆𬌗反覆盖的拍摄。</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_eight.png" alt="">
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row class="shoot-standard-main" v-if="activeName === 'slice'">
    <el-col :span="5" class="shoot-standard-main-catalogue">
      <div class="shoot-standard-main-catalogue-title">本页目录</div>
      <div v-for="item in sliceObjArr" :key="item.name">
        <div
          class="shoot-standard-main-catalogue-link"
          :class="{'shoot-standard-main-catalogue-link-active': activeLink === item.name}"
          @click.prevent="handleLinks(item.name)">
          {{item.label}}
        </div>
      </div>
    </el-col>
    <el-col :span="19" class="shoot-standard-main-document">
      <div class="shoot-standard-main-document-title">X光片拍摄标准</div>
      <div class="shoot-standard-main-document-title-two">基本要求</div>
      <el-row id="oneSlice" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">全颌曲面断层片</div>
          <div class="shoot-standard-main-document-main-text">1.源文件jpg图片；</div>
          <div class="shoot-standard-main-document-main-text">2.髁突、上下颌显示完整，牙冠、牙根、牙槽骨清晰；</div>
          <div class="shoot-standard-main-document-main-text">3.图像对比显示良好；</div>
          <div class="shoot-standard-main-document-main-text">4.没有可见的饰品；</div>
          <div class="shoot-standard-main-document-main-text">5.左右侧标记。</div>
          <div class="shoot-standard-main-document-main-text">（如右图）</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_nine.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row id="oneSlice" class="shoot-standard-main-document-main">
        <el-col :span="16">
          <div class="shoot-standard-main-document-main-title">头颅侧位定位片</div>
          <div class="shoot-standard-main-document-main-text">1.源文件jpg图片；</div>
          <div class="shoot-standard-main-document-main-text">2.自然头位，𬌗平面平行于地面；</div>
          <div class="shoot-standard-main-document-main-text">3.牙尖交错咬合；</div>
          <div class="shoot-standard-main-document-main-text">4.图像上方显示前额，下方显示颈部，前方显示鼻尖，后方显示部分枕部；</div>
          <div class="shoot-standard-main-document-main-text">5.图像对比良好，硬软组织显示清晰；</div>
          <div class="shoot-standard-main-document-main-text">6.没有可见的饰品。</div>
          <div class="shoot-standard-main-document-main-text">（如右图）</div>
        </el-col>
        <el-col :span="8">
          <div class="shoot-standard-main-document-main-img">
            <img src="img/media/photo_ten.png" alt="">
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row class="shoot-standard-main" v-if="activeName === 'jaw'">
    <el-col :span="5" class="shoot-standard-main-catalogue">
      <div class="shoot-standard-main-catalogue-title">本页目录</div>
      <div v-for="item in jawObjArr" :key="item.name">
        <div
          class="shoot-standard-main-catalogue-link"
          :class="{'shoot-standard-main-catalogue-link-active': activeLink === item.name}"
          @click.prevent="handleLinks(item.name)">
          {{item.label}}
        </div>
      </div>
    </el-col>
    <el-col :span="19" class="shoot-standard-main-document">
      <div class="shoot-standard-main-document-title">模型制取标准</div>
      <el-row id="oneJaw" class="mt28">
        <el-col :span="24">
          <div class="shoot-standard-main-document-every-title">硅橡胶模型取模标准</div>
          <div class="shoot-standard-main-document-every-secondary-title">要求</div>
          <div class="shoot-standard-main-document-every-content">
            <div>1.要求印模清晰、牙列完整、牙冠及牙龈缘无气泡、无缺损、无皱褶。若有第三磨牙，印模应至少包括该牙近中二分之一牙冠；</div>
            <div>2.要求使用加聚型硅橡胶；</div>
            <div>3.即使单颌治疗也需取全口印模；</div>
            <div>4.使用塑料托盘，不得使用金属托盘或含金属材料的托盘。</div>
          </div>
        </el-col>
      </el-row>
      <el-row id="twoJaw" class="mt28">
        <el-col :span="24">
          <div class="shoot-standard-main-document-every-title">如何取模</div>
          <div class="shoot-standard-main-document-every-secondary-title">两步法</div>
          <div class="shoot-standard-main-document-every-content">
            <div>*剪取比托盘稍大一些的塑料隔离膜。</div>
            <div>1.取等量重体印模材料，按生产厂家要求的时间定时。用指肚混合搅拌均匀，呈现均一颜色后，搓成条状填入托盘并覆盖至托盘的高度。确保在牙弓周围有足够的材料覆盖。托盘末端材料需要溢出一些，以取到最后磨牙的远中；</div>
            <div>2.将隔离膜覆盖在托盘上，使其与印模材料贴附；</div>
            <div>3.保持塑料薄膜位置，然后将托盘放置于患者口内，托盘的手柄对准患者鼻子，从后往前均匀施压，使托盘充分就位，应看到重体材料从溢出孔溢出。托盘就位后，前后、上下、左右轻微移动，为轻体预留出一定的间隙；</div>
            <div>*节约时间的建议：初印可在研究模型上制取。</div>
            <div>4.初印模结固后取出托盘，去除隔离膜。此时的印模还没有牙齿结构的细节，对于比较清晰的牙齿结构要用硅橡胶修整刀修除；</div>
            <div>5.使用轻体充填器在初印中注入轻体。确保充填器头始终在轻体印模材料内，避免产生气泡。充填轻体时要一次充填足够的量，在最后一颗磨牙的远中多充填一些。轻体充填完成，放入口腔后均匀慢压，使托盘充分就位。按印模材料生产厂家要求的时间定时；</div>
            <div>6.固化后取出托盘，确认是否符合硅橡胶印模标准。</div>
          </div>
          <div class="shoot-standard-main-document-every-secondary-title">一步法</div>
          <div class="shoot-standard-main-document-every-content">
            <div>1.取等量重体印模材料，按生产厂家要求的时间定时。用指肚混合搅拌均匀，呈现均一颜色后，搓成条状填入托盘并覆盖至托盘的高度。确保在牙弓周围有足够的材料覆盖。托盘末端材料需要溢出一些，以取到最后磨牙的远中；</div>
            <div>2.用小指侧面在印模材中央压出一条槽沟，在上颌托盘的远中端形成远中壁；</div>
            <div>3.使用轻体充填器在初印中注入轻体。确保充填器头始终在轻体印模材料内，避免产生气泡。充填轻体时要一次充填足够的量，在最后一颗磨牙的远中多充填一些，轻体材料要注满槽沟；</div>
            <div>4.托盘放入口内时，请助手协助牵拉对侧口角，托盘手柄与患者鼻子对齐，平直进入口腔后均匀慢压，使托盘允分就位。根据印模材料生产厂家推荐的固化时间定时。印模固化后取出托盘。</div>
          </div>
          <div class="shoot-standard-main-document-every-secondary-title">取得精确硅橡胶印模的技巧</div>
          <div class="shoot-standard-main-document-every-content">
            <div>1.牙体必须清洁；</div>
            <div>2.请勿将硅橡胶印模材料与其它印模材料混合使用；</div>
            <div>3.材料的温度会影响工作时间及结固时间。可将印模材料适当冷冻，这样可以延长工作时间和结固时间；</div>
            <div>4.在厂家规定时间内进行操作。</div>
          </div>
        </el-col>
      </el-row>
      <el-row id="threeJaw" class="mt28">
        <el-col :span="24">
          <div class="shoot-standard-main-document-every-title">数字模型标准</div>
          <div class="shoot-standard-main-document-every-secondary-title">要求</div>
          <div class="shoot-standard-main-document-every-content">
            <div>使用口扫设备时，请务必完整扫描上颌、下颌、咬合并确保数字模型清晰、准确。</div>
            <div>导出STL须知：</div>
            <div>只要口扫时扫过咬合，导出的上颌STL、下颌STL就会自动带上咬合数据。</div>
            <div>注：不同品牌的口扫设备，可能存在区别。</div>
          </div>
        </el-col>
      </el-row>
      <el-row id="fourJaw" class="mt28">
        <el-col :span="24">
          <div class="shoot-standard-main-document-every-title">超硬石膏模型标准</div>
          <div class="shoot-standard-main-document-every-secondary-title">要求</div>
          <div class="shoot-standard-main-document-every-content">
            <div>1.牙列清晰，完整</div>
            <div>2.模型无断裂，无拼接</div>
            <div>3.牙齿形态无变形，无缺损</div>
            <div>4.无不可修整的石膏瘤或孔洞</div>
            <div>5.牙面无托槽，无附件</div>
            <div>6.龈缘清晰，完整</div>
            <div>7.龈缘下方组织保留3mm以上</div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  name: "ShootStandard",
  data() {
    return {
      activeName: "photo",
      activeLink: "",
      photoObjArr: [
        { name: "onePhoto", label: "基本要求" },
        { name: "twoPhoto", label: "正面像" },
        { name: "threePhoto", label: "正面微笑像" },
        { name: "fourPhoto", label: "侧面面像" },
        { name: "fivePhoto", label: "口内正面像" },
        { name: "sixPhoto", label: "上颌𬌗面像（上牙列像）" },
        { name: "sevenPhoto", label: "下颌𬌗面像（下牙列像）" },
        { name: "eightPhoto", label: "口内左（右）侧位像" },
        { name: "ninePhoto", label: "口内45°覆𬌗覆盖像" },
      ],
      sliceObjArr: [
        { name: "oneSlice", label: "全颌曲面断层片" },
        { name: "twoSlice", label: "头颅侧位定位片" },
      ],
      jawObjArr: [
        { name: "oneJaw", label: "硅橡胶模型取模标准" },
        { name: "twoJaw", label: "如何取模" },
        { name: "threeJaw", label: "数字模型标准" },
        { name: "fourJaw", label: "超硬石膏模型标准" },
      ],
    }
  },
  created() {
    this.activeName = this.$route.query.kind || "photo";
  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleTabs(active) {
      this.activeName = active;
      this.activeLink = "";
    },
    handleLinks(str) {
      this.activeLink = str;
      let anchorElement = document.getElementById(str);
      this.$nextTick(() => {
        if (anchorElement) {
          anchorElement.scrollIntoView({
            behavior: 'auto',
            block: 'start',
            inline: 'nearest'
          });
        }
      });
    },
    handleScroll(e) {
      const topNumber = e.target.scrollTop;
      if (this.activeName === "photo") {
        if (topNumber < 45) {
          this.activeLink = "";
        } else if (topNumber >= 45 && topNumber < 205) {
          this.activeLink = "onePhoto";
        } else if (topNumber >= 205 && topNumber < 568) {
          this.activeLink = "twoPhoto";
        } else if (topNumber >= 568 && topNumber < 932) {
          this.activeLink = "threePhoto";
        } else if (topNumber >= 932 && topNumber < 1296) {
          this.activeLink = "fourPhoto";
        } else if (topNumber >= 1296 && topNumber < 1552) {
          this.activeLink = "fivePhoto";
        } else if (topNumber >= 1552 && topNumber < 1880) {
          this.activeLink = "sixPhoto";
        } else if (topNumber >= 1880 && topNumber < 2007) {
          this.activeLink = "sevenPhoto";
        } else {
          this.activeLink = "eightPhoto";
        }
      } else if (this.activeName === "jaw") {
        if (topNumber < 73) {
          this.activeLink = "";
        } else if (topNumber >= 73 && topNumber < 289) {
          this.activeLink = "oneJaw";
        } else if (topNumber >= 289 && topNumber < 812) {
          this.activeLink = "twoJaw";
        } else {
          this.activeLink = "threeJaw";
        }
      } else {
        // 不做操作
      }
    },
  }
}
</script>
<style scoped>
  .shoot-standard-contain {
    padding: 18px 0;
    width: 950px;
    margin: 0 auto;
    height: calc(100% - 54px);
  }
  .shoot-standard-contain >>> .el-col {
    margin-bottom: 0;
  }
  .shoot-standard-contain >>> ::-webkit-scrollbar {
    display: none;
  }
  .shoot-standard-main {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .shoot-standard-tabs {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 14px;
  }
  .shoot-standard-main-catalogue {
    background-color: #fafafa;
    height: 100%;
    padding: 8px 0;
  }
  .shoot-standard-main-catalogue-title {
    color: #333;
    font-size: 16px;
    font-weight: 500;
    padding-left: 16px;
    padding-bottom: 4px;
  }
  .shoot-standard-main-catalogue-link {
    font-size: 14px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    padding: 5px 0 5px 16px;
    cursor: pointer;
    outline: none;
  }
  .shoot-standard-main-catalogue-link:hover {
    color: #409eff;
  }
  .shoot-standard-main-catalogue-link-active {
    color: #409eff;
    background: #ecf5ff;
    border-right: 3px solid #409eee;
  }
  .shoot-standard-main-document {
    height: 100%;
    padding: 8px 16px 30px;
    overflow: auto;
  }
  .shoot-standard-main-document-title {
    color: #333;
    font-size: 28px;
    font-weight: 500;
  }
  .shoot-standard-main-document-title-two {
    font-size: 22px;
    font-weight: 400;
    margin-top: 32px;
    color: #333;
    line-height: 24px;
  }
  .shoot-standard-main-document-main {
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .shoot-standard-main-document-main-title {
    color: #333;
    font-size: 22px;
    line-height: 24px;
    font-weight: 400;
    margin-bottom: 8px;
  }
  .shoot-standard-main-document-main-text {
    color: #666;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    white-space: normal;
  }
  .shoot-standard-main-document-main-img {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .shoot-standard-main-document-main-img>img {
    max-width: 100%;
    max-height: 100%;
  }
  .mt28 {
    margin-top: 28px;
  }
  .shoot-standard-main-document-every-title {
    color: #333;
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;
  }
  .shoot-standard-main-document-every-secondary-title {
    color: #333;
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    margin-top: 16px;
  }
  .shoot-standard-main-document-every-content {
    color: #666;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    margin-top: 4px;
  }
</style>