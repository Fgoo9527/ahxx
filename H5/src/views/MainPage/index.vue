<template>
  <div class="header">
    <div class="left">
      <h1>暗黑修仙</h1>
    </div>
    <div class="right">
      <span>目前为测试版本，包含了大量的彩蛋（bug），随时会清数据，请放心食用</span>
      <a><MessageOutlined /></a>
      <a title="https://github.com/Flywor" href="https://github.com/Flywor" target="_blank"><GithubOutlined /></a>
      <a title="Q群：871302385"><QqOutlined /></a>
      <a title="设置"><SettingOutlined /></a>
      <a title="登出"><LogoutOutlined /></a>
    </div>
  </div>
  <div class="main-page">
    <div class="main-page-left">
      <User />
    </div>
    <div class="main-page-center">
      <Usually />
      <Battle />
    </div>
    <div class="main-page-right">
      <a-button type="primary" @click="showDrawer">
        Open
      </a-button>
      <a-drawer
        title="功能列表"
        placement="right"
        v-model:visible="visible"
        :mask='false'
        width='400'
      >
        测试功能
      </a-drawer>
      <Equip />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import User from '@components/User'
import Battle from '@components/Battle/battle'
import Usually from '@components/Usually/usually'
import Equip from '@components/Equip/equip'
import {
  GithubOutlined,
  QqOutlined,
  SettingOutlined,
  LogoutOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  components: { User, Battle, Usually, Equip, GithubOutlined, QqOutlined, SettingOutlined, LogoutOutlined, MessageOutlined },
  setup() {
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = true
    }
    return {
      visible,
      showDrawer
    }
  }
})
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 64px;
  line-height: 64px;
  box-shadow: 0 2px 8px #f0f1f2;
  font-family: 'ZCOOLKuaiLe-Regular';
  display: flex;
  a {
    margin: 0 16px;
    font-size: 20px;
    color: #01D8EA;
  }
  .left {
    flex: 1;
    h1 {
      margin: 0 16px;
    }
  }
}
.main-page {
  height: calc(100% - 64px);
  width: 100%;
  display: flex;
  padding: 16px;
  &-left {
    min-width: 240px;
    max-width: 320px;
  }
  &-center {
    flex: 1;
  }
  &-right {
    min-width: 240px;
    max-width: 320px;
  }
}
</style>
