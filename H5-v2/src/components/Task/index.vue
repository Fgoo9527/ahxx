<template>
  <a-card :title="name" class="task" size="small">
    <template #extra>
      <span>宠物要求等级为>=</span>
    </template>
    <a-card-grid v-for="(item, index) in taskList" :key="index" class="task_item">
      <strong style="font-size: 15px;">【{{item.name}}】</strong>
      <div>{{item.desc}}</div>
      <div>任务需求：{{item.needs}}</div>
      <div>任务奖励：{{item.reward}}</div>
      <a-button type="primary" size="small" @click="() => handleComplete(item._id)">
        完成
      </a-button>
    </a-card-grid>
  </a-card>
</template>

<script>
import TaskData from '@/data/task.json'
import GoodsData from '@/data/goods.json'
import MonsterData from '@/data/monster.json'
import { ref, defineComponent } from 'vue'
import { completeTask } from '@/api/player'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const name = ref('任务列表')

    const taskList = TaskData.map(task => {
      const { _id, name, desc, needGoods, needPet, needGold, rewardGoods, rewardGold } = task
      const needs = []
      needGoods.map(t => {
        const [goodsId, num] = t
        needs.push(`【${GoodsData.find(gd => gd._id === goodsId).name}x${num}】`)
      })
      needPet.map(t => {
        const [monsterId, lv] = t
        needs.push(`【Lv.${lv}${MonsterData.find(gd => gd._id === monsterId).name}】`)
      })
      if (needGold) {
        needs.push(`金币：${needGold}`)
      }
      const reward = []
      rewardGoods.map(t => {
        const [goodsId, num] = t
        reward.push(`【${GoodsData.find(gd => gd._id === goodsId).name}x${num}】`)
      })
      if (rewardGold) {
        reward.push(`【金币：${rewardGold}】`)
      }
      return {
        _id,
        name,
        desc,
        needs: needs.join(''),
        reward: reward.join('')
      }
    })

    const handleComplete = async(_id) => {
      try {
        await completeTask(_id)
        message.success('任务完成！')
      } catch (e) {
        console.error(e)
      }
    }

    return {
      name,
      taskList,
      handleComplete
    }
  }
})
</script>
<style lang="less" scoped>
.task /deep/ .ant-card-body{
  overflow-y: scroll!important;
  height: calc(100% - 38px)!important;
  margin-right: -10px;
}
.task {
  height: 100%;
  width: 100%;
  &_item {
    width: 50%;
    text-align: center;
    padding: 8px;
  }
}
</style>
