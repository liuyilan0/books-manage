<template>
  <div class="dashboard-container">
    <!-- <div>
      <img src="@/assets/logo.png">
      <div class="dashboard-text">欢迎您: {{ name }}</div>
    </div> -->
    <section ref="data_section" class="data_section">
      <el-row :gutter="10" class="row_list">
        <el-col :span="24">
          <div class="row_left row_base">

            <el-col v-for="(item,index) in itemList" :key="index" :span="4">
              <fieldItem :field="item" />
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="row_list order_list">
        <el-col :span="9">
          <log-list />
        </el-col>
        <el-col :span="14">
          <bar-chart type="barChart" />
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10" class="row_list order_list">
        <el-col :span="7">
          <pie-chart type="ordertype" />
        </el-col>
        <el-col :span="10">
          <line-chart />
        </el-col>
        <el-col :span="7">
          <radar-chart />
        </el-col>
      </el-row> -->
      <el-row :gutter="10" class="row_list">
        <el-col :span="8">
          <user-table />
        </el-col>
        <el-col :span="8">
          <comment-list />
        </el-col>
        <el-col :span="8">
          <card-list />
        </el-col>
      </el-row>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import fieldItem from './components/fieldItem'
import userTable from './components/userTable' // 用户数据表格
import commentList from './components/commentList' // 用户评论列表
import cardList from './components/cardList' // card列表
import logList from './components/logList' // 日志列表
import barChart from '@/components/echarts/barChart' // 柱状图
import pieChart from '@/components/echarts/pieChart' // 饼状图
import radarChart from '@/components/echarts/radarChart' // 雷达图
import lineChart from '@/components/echarts/lineChart' // 折线图
import { getStatisticAmount } from '@/api/charts'

export default {
  name: 'Dashboard',
  components: {
    userTable,
    commentList,
    cardList,
    logList,
    barChart,
    pieChart,
    radarChart,
    lineChart,
    fieldItem
  },
  data() {
    return {
      field: {
        userAmount: '总用户数',
        chinaAmount: '中国非遗数',
        worldAmount: '世界非遗数',
        forumAmount: '总论坛数',
        aroundAmount: '总周边数',
        person: '人',
        ge: '个',

        userCount: '0',
        chinaCount: '0',
        worldCount: '0',
        forumCount: '0',
        aroundCount: '0'
      },
      itemList: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // 获取表统计数量
    getStatisticAmount().then(res => {
      const result = res.data
      this.field.userCount = result.userCount
      this.field.chinaCount = result.chinaculturalCount
      this.field.worldCount = result.worldculturalCount
      this.field.forumCount = result.forumCount
      this.field.aroundCount = result.goodsCount

      this.itemList = [
        {
          name: this.field.userAmount,
          icon: 'dashboard',
          bgColor: 'orangeBgColor',
          desc: this.field.userCount,
          unit: this.field.person
        },
        {
          name: this.field.chinaAmount,
          icon: 'dashboard',
          bgColor: 'pinkBgColor',
          desc: this.field.chinaCount,
          unit: this.field.ge
        },
        {
          name: this.field.worldAmount,
          icon: 'dashboard',
          bgColor: 'greenBgColor',
          desc: this.field.worldCount,
          unit: this.field.ge
        },
        {
          name: this.field.forumAmount,
          icon: 'dashboard',
          bgColor: 'lightGreenBgColor',
          desc: this.field.forumCount,
          unit: this.field.ge
        },
        {
          name: this.field.aroundAmount,
          icon: 'dashboard',
          bgColor: 'lightBlueBgColor',
          desc: this.field.aroundCount,
          unit: this.field.ge
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  gap:50px;
  img{
    width: 50px;
    height:50px;
    border-radius:50%;
  }
}
.dashboard-text {
  font-size: 30px;
  line-height: 46px;
}

.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
	}

</style>
