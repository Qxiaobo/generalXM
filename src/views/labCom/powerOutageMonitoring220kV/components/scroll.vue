<!--
 * @Author: your name
 * @Date: 2023-11-06 19:19:28
 * @LastEditTime: 2024-01-18 09:16:35
 * @LastEditors: 0020-137
 * @Description: In User Settings Edit
 * @FilePath: \ami-mf1303503-panoramic-poweroff-monitor\src\views\test\components\scroll.vue
-->
<template>
    <div style="height:100%;width:100%;">
        <sg-scroll  v-if="listMsg.length"   :limit-move-num="listMsg.length">
            <div v-for="item in listMsg" :key="item" style="width: 100%;background:#1b374d; ;" >
                <div class="power"
                    style="width: 100%;height: 60px; padding:2.5% 30px 0px 10%;display:flex; ">
                    <div :class="[item.warnState==='确认停电'?'alarmbg':'alarmbg2']">{{item.warnState}}  </div>
                    <div style="width:95%;margin-top:-3px; display: inline-block;"> 
                        <!-- <span
                            class="normalSpan" style="
                            font-size:16px;line-height:30px;">{{ item }}</span> -->
                            <sg-clamp max-lines="2" show-tip autoresize style=" height: 100px" effect="dark">
                                {{ item.msg }}
                            </sg-clamp>
                    </div>
                </div>
                <hr/>
            </div>
        </sg-scroll>
 
            <sg-no-data v-else :size="'medium'"/>
</div>

</template>
    
<script>

export default {
    props: {
        listMsg: {
            type: Array,
            default: () => []
        }
    },
    date() {
        return {

        }
    },
    methods: {

    }

}
</script>
    
<style lang="scss" scoped >
.alarmbg {
    background: url("../../../assets/home/isPower.png") 80% 100% no-repeat;
    // background: red;
    // display: inline-block;
    min-width: 81px;
    width: 4%;
    height: 21px;
    line-height: 21px;
    color: #ffffff;
    text-align: left;
    font-size: 14px;
}

.alarmbg::before {
    background: #fa5d5f;
    content: '';
    border-radius: 50%;
    width: 10px;
    height: 10px;
    transform: translateX(-30px);
    display: inline-block;
}
.alarmbg2 {
    background: url("../../../assets/home/isPower2.png") 80% 100% no-repeat;
    // background: red;
    // display: inline-block;
    min-width: 81px;
    width: 4%;
    height: 21px;
    line-height: 21px;
    color: #ffffff;
    text-align: left;
    font-size: 14px;
}

.alarmbg2::before {
    background: #ff935E;
    content: '';
    border-radius: 50%;
    width: 10px;
    height: 10px;
    transform: translateX(-30px);
    display: inline-block;
}

.normalSpan {
    font-family: Source Han Sans CN;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
}</style>