<template>
  <div class="commentContainer cflex">
    <div v-for="(item,index) in commentData" :key="index" class="comment rflex">
      <div class="left">
        <img class="userImg" :src="item.imageUrl" alt="img">
      </div>
      <div class="right wflex">
        <p class="name">{{ item.name }}</p>
        <p class="content">{{ item.description.substring(0,100) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectTableList } from '@/api/charts'

export default {
  name: 'CommentList',
  data() {
    return {
      commentData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getProjectTableList({}).then(res => {
        const list = res.list
        this.commentData = list.slice(0, 5)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .commentContainer{
   background: #fff;
   padding: 10px;
   box-sizing: border-box;
   height: 420px;
   max-height: 420px;
   overflow: hidden;
   border-radius: 6px;
   justify-content: space-between;
   overflow-y: scroll;
   .comment{
       border-bottom: 1px solid #e8e8e8;
       padding: 10px 0;
      .left{
         width:80px;
         text-align: center;
         .userImg{
           width: 50px;
           height: 50px;
           border-radius: 50%;
         }
      }
      .right{
           justify-content: space-between;
          .name{
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .content{
            font-size: 13px;
            line-height: 20px;
          }
      }
   }
 }
</style>
