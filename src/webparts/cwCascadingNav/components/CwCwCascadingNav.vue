<template>
  <div id="app">
    <el-menu mode="horizontal">
      <template v-for="item in navigation">
        <el-menu-item v-if="item.Children.length == 0" v-bind:key="item.Id" :index="item.Id">
          <el-link :href="item.Page_x0020_Link" :underline="underline">{{item.Title}}</el-link>
        </el-menu-item>
        <el-submenu v-else v-bind:key="item.Id" :index="item.Id">
          <template slot="title"><el-link :href="item.Page_x0020_Link" :underline="underline">{{item.Title}}</el-link></template>
          <el-menu-item v-for="child in item.Children" v-bind:key="child.Id" :index="child.Id">
            <el-link :href="child.Page_x0020_Link" :underline="underline">{{child.Title}}</el-link>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      navigation:[],
      underline:false
    };
  },
  mounted(){
    axios.get(`_api/web/lists/getbytitle('Cascading Navigation')/Items?$select=Id,Title,Page_x0020_Link,Page_x0020_Order,Class,Child_x0020_View&$filter=Display eq 1&$orderby=Page_x0020_Order`)
    .then(response => {
      let children = response.data.d.results.filter(item => item.Class != 'Main')
      response.data.d.results.filter(item => item.Class == 'Main').forEach(item => {
        this.navigation.push({
          Id:item.Id,
          Title:item.Title,
          Page_x0020_Link:item.Page_x0020_Link,
          Children: children.filter(child => child.Class == item.Child_x0020_View)
        })
      });
    })
  },
  methods: {}
}
</script>

<style scoped>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
}
.el-link--inner{
  color:#606266 !important
}
.el-link--default{
  /* font-family: Avenir,Helvetica,Arial,sans-serif; */
  font-family: Helvetica Neue,Helvetica,sans-serif;
  color:#606266 !important
}
</style>
