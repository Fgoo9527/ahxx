<template>
  <div class="usually">
    <div class="usually-left">
      <a-button type="primary" class="btn" @click="funcAction('装备')">装备</a-button>
      <a-button type="primary" class="btn" @click="funcAction('背包')">背包</a-button>
      <a-button type="primary" class="btn" @click="funcAction('合成')">合成</a-button>
      <a-button type="primary" class="btn" @click="funcAction('宠物')">宠物</a-button>
      <a-button type="primary" class="btn" @click="funcAction('技能')">技能</a-button>
    </div>
    <div class="usually-center">
      <component :is="showCom"/>
    </div>
    <div class="usually-right">
      <a-button type="primary" class="btn" @click="funcAction('商店')">商店</a-button>
      <a-button type="primary" class="btn" @click="funcAction('摆摊')">摆摊</a-button>
      <a-button type="primary" class="btn" @click="funcAction('任务')">任务</a-button>
      <a-button type="primary" class="btn" @click="funcAction('资料')">资料</a-button>
    </div>
  </div>
  <div class="choose-map" v-if="!team || (team && isLeader)">
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link">
        {{battleMap}}<DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="md in mapData" :key="md._id">
            <a @click="() => handleSetBattleMap(md._id)">{{md.name}}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-button :type="isBattle?'danger':'primary'" class="btn" size="small" style="margin-left:12px" @click="handleStartBattle">
      {{isBattle?'停止':'开始'}}修炼
    </a-button>
  </div>
  <div class="choose-map" v-else>
    {{battleMap}}
  </div>
</template>

<script>
import { DownOutlined } from '@ant-design/icons-vue'
import XxImg from '@/assets/xx.jpg'
import { moveToMap } from '@/api/player'
import { battleStart } from '@/api/team'
import MapData from '@/data/Map.json'
import PetComponent from '@/components/Pet/pet' // 宠物
import Pocket from '@/components/Pocket/index.vue' // 背包
import Skill from '@/components/Skill/index.vue' // 技能
import Synthetic from '@/components/Synthetic/Synthetic.vue' // 合成
import Weaponry from '@/components/Weaponry/index.vue' // 装备
import Shop from '@/components/Shop/Shop.vue' // 商店
import Pedlat from '@/components/Pedlat/index.vue' // 摆摊
import Task from '@/components/Task/Task.vue' // 任务
import Wiki from '@/components/Wiki/index.vue' // 百科

export default {
  components: {
    DownOutlined,
    PetComponent,
    Pocket,
    Skill,
    Synthetic,
    Weaponry,
    Shop,
    Pedlat,
    Task,
    Wiki
  },
  data() {
    return {
      mapData: MapData,
      XxImg,
      isBattle: false,
      autoBattleInetval: null,
      showCom: 'Pocket',
      commentType: {
        '装备': 'Weaponry',
        '背包': 'Pocket',
        '合成': 'Synthetic',
        '宠物': 'PetComponent',
        '技能': 'Skill',
        '商店': 'Shop',
        '摆摊': 'Pedlat',
        '任务': 'Task',
        '资料': 'Wiki'
      }
    }
  },
  computed: {
    isLeader() {
      return this.$store.state.isLeader
    },
    team() {
      return this.$store.state.team
    },
    battleMap() {
      const bm = this.$store.state.battleMap
      return (this.mapData.find(md => md._id === bm) || {}).name
    }
  },
  watch: {
    '$store.state.battle': {
      deep: true,
      handler(btl) {
        if (btl === null && this.isBattle) {
          setTimeout(() => {
            this.autoStartBattle()
          }, 3333)
        }
      }
    }
  },
  methods: {
    handleStartBattle() {
      if (this.isBattle) {
        this.isBattle = false
      } else if (!this.$store.state.battle) {
        this.isBattle = true
        this.autoStartBattle()
      }
    },
    async autoStartBattle() {
      try {
        await battleStart(this.$store.state.battleMap)
      } catch (e) {
        this.isBattle = false
      }
    },
    handleSetBattleMap(mapid) {
      moveToMap(mapid)
    },
    // 功能按键
    funcAction(action) {
      // console.log(action)
      this.showCom = this.commentType[action]
    }
  }
}
</script>

<style lang="less" scoped>
.usually{
  height: 307px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  &-left, &-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    .btn {
      border-color: #ffffff;
      flex: 1;
    }
  }
  &-center {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
}
.choose-map {
  padding-top: 8px;
  text-align:center;
}
</style>
