
<template>
  <div class="pay data_list rflex" :class="[field.bgColor]">
    <div class="leftItem cflex wflex">
      <p class="investor">{{ field.name }}</p>
      <p class="number">{{ field.desc }}<span class="perTitle">({{ field.unit }})</span></p>
    </div>
    <div class="rightItem">
      <svg-icon icon-class="dashboard" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'FieldItem',
  props: {
    field: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.data_list{
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 10px;
    color:#fff;
    height: 80px;
    .leftItem{
      align-items: start;
      justify-content: space-between;
      text-align: left;
    }
    .rightItem{
      width:62px;
      display: flex;
      align-items: center;
      justify-content: center;
      .svg-icon{
        font-size: 30px;
      }
    }
    .number{
      font-size: 22px;
      font-weight: bold;
      .perTitle{
        font-size: 13px;
        margin-left: 5px;
      }
    }
  }
  .pay{
    .leftItem{
      justify-content: space-around;
    }
  }
</style>

