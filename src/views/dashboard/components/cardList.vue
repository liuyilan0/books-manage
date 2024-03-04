
<template>
  <div class="cardContainer">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }" class="cardBody">
          <img :src="userImg" class="userImg" alt="">
          <div class="progress wflex">
            <div class="rflex">
              <span class="title">vue:</span><el-progress :percentage="100" status="success" />
            </div>
            <div class="rflex">
              <span class="title">js:</span><el-progress :percentage="80" />
            </div>
            <div class="rflex">
              <span class="title">css:</span><el-progress :percentage="60" />
            </div>
            <div class="rflex">
              <span class="title">html:</span><el-progress :percentage="90" />
            </div>
            <div class="rflex">
              <span class="title">react:</span><el-progress :percentage="0" />
            </div>
            <div class="rflex">
              <span class="title">angular:</span><el-progress :percentage="0" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userImg from '@/assets/logo.png'

export default {
  name: 'CardList',
  data() {
    return {
      userImg: userImg
    }
  }
}
</script>

<style lang="scss" scoped>
.cardContainer{
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height:420px;
  max-height: 420px;
  overflow: hidden;
  border-radius: 6px;
  .userImg{
    width: 100%;
    height: 200px;
  }
  .progress {
    padding: 20px;
    .rflex{
       justify-content: space-between;
       align-items: center;
       .title{
         width: 65px;
         height: 25px;
       }
      .el-progress {
        flex: 1;
      }
    }
  }
}
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>

