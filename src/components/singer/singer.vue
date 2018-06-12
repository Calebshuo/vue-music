<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import { getSingerList } from 'api/singer';
import { ERR_OK } from 'api/config';
import Singer from 'common/js/singer';
import ListView from 'base/listview/listview';
import { mapMutations } from 'vuex';  // vuex提供的语法糖，写数据的语法糖

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    selectSinger(singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.setSinger(singer)  // 在这里就可以调用映射后的方法
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (ERR_OK === res.code) {
          //console.log(res.data.list)
          this.singers = this._normalizeSinger(res.data.list);
          //console.log(this.singers)
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        );
      });
      // 为了得到有序列表，我们需要处理 map // 遍历对象是无序的，所以必须转换为数组再去遍历
      // 给标题为A-Z的对象排序
      let ret = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0); // 对字母A-Z进行排序
      });
      return hot.concat(ret);
    },
    ...mapMutations({
        setSinger: 'SET_SINGER' // 把对mutation的修改映射成一个方法名 // 使用对象展开运算符将此对象混入到外部对象中
    })
  },
  components: {
    ListView
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>