<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb--active': isCollapse }]"
           v-if="showCollapse && !isDoctorUser">
        <i class="icon-navicon"
           @click="setCollapse"></i>
      </div>
    </div>
    <div
      class="top-bar__title top-bar__system"
      :class="{'top-pd0': isDoctorUser}"
      v-text="$t('systemTitle')">
    </div>
    <div class="top-bar__right">
      <el-tooltip effect="dark"
                  :content="$t('navbar.language')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <!-- <top-lang></top-lang> -->
        </div>
      </el-tooltip>
      <img class="top-bar__img"
           :src="userInfo.avatar">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="user-name" :title="userInfo.userName">{{userInfo.userName}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">{{$t('navbar.logOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topLang from "./top-lang";
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topLang
  },
  name: "top",
  data() {
    return {};
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showSearch: state => state.common.showSearch,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag"
    ]),
    isDoctorUser() {
      return this.userInfo.authority == 'doctorUser';
    },
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .top-bar__system {
    height: 64px;
    line-height: 62px;
    font-size: 16px;
  }
  .user-name {
    max-width: 100px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    height: 64px;
    line-height: 64px;
  }
</style>
