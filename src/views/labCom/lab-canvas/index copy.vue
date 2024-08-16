<template>
  <div class="wrapper">
    <div :class="['everyListStyle',selectedList.indexOf(item.name)>-1?'selectedStyle':'']" v-for="(item,index) in cityList" :key="index" @click="selectHandle(item.name)">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: "ctrlMultipleSelection",
  components: {},
  data() {
    return {
        cityList: [
            {id:1,name:"上海"},
            {id:1,name:"苏州"},
            {id:1,name:"无锡"},
            {id:1,name:"常州"},
            {id:1,name:"南通"},
            {id:1,name:"镇江"},
            {id:1,name:"南京"},
            {id:1,name:"合肥"},
            {id:1,name:"六安"},
            {id:1,name:"武汉"},
            {id:1,name:"扬州"},
            {id:1,name:"徐州"},
            {id:1,name:"杭州"},
            {id:1,name:"温州"},
            {id:1,name:"广州"},
            {id:1,name:"滁州"},
            {id:1,name:"宿州"},
        ],
        isctrl:false,
        selectedList:[],    // 将ctrl + 左键选中的列放在数组中
    };
  },
  computed: {},
  mounted() {
    this.keyDown();
  },
  activated(){
    this.keyDown();
  },
  deactivated() {
    // 销毁键盘监听事件，不然会影响其他页面
    document.onkeydown = null;
    document.onkeyup = null;
  },
  beforeDestroy() {
    // 销毁键盘监听事件，不然会影响其他页面
    document.onkeydown = null;
    document.onkeyup = null;
  },
  methods: {
    // 监听键盘 
    keyDown() {
        // 键盘按下事件
        document.onkeydown = (e) => {
            // 取消默认事件
            e.preventDefault();   
            //事件对象兼容
            let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
            //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40  回车：13   ctrl：17   shift：16
            switch (e1.keyCode) {
            case 17:
                this.isctrl = true;  // 如果ctrl按下就让他按下的标识符变为true
                // console.log("按下了ctrl");
                break;
            }
        }
        // 键盘抬起事件
        document.onkeyup = (e) => {
            // 取消默认事件
            e.preventDefault();
            //事件对象兼容
            let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
            switch (e1.keyCode) {
            case 17:
                this.isctrl = false;  // 如果ctrl抬起下就让他按下的标识符变为false
                // console.log("松开了ctrl");
                break;
            }
        }
    },
    selectHandle(name) {
        if(this.isctrl) {
            // 当按住ctrl，并且点击了已经选中的选项，那么就要取消选中，去掉再次被选中的选项
            if(this.selectedList.indexOf(name)>-1){
                this.selectedList = this.selectedList.filter(item=>item !== name)
            } else {
                this.selectedList.push(name)
            }
        } else {
            this.selectedList = [];
            this.selectedList.push(name);
        }
        console.log("最终的得到的列表",this.selectedList);
    }
  },
};
</script>
<style scoped>
.wrapper {
    padding: 30px;
    width: 100%;
}
.everyListStyle {
    width: 800px;
    height: 50px;
    line-height: 50px;;
    border: 1px solid #171717;
    border-radius: 10px;
    border-bottom: 0;
    text-align: center;
}
.everyListStyle:last-child {
    border-bottom: 1px solid #171717;
}
.selectedStyle {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>