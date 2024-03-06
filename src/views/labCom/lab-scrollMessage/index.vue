<template>
    <div style="width: 300px;height:500px;background: yellow;overflow: hidden;">
        <ScrollMessage>
            <div v-for="i in 6" :key="i">
                <el-button type="primary"> 测试{{ i }}}</el-button>
            </div>

        </ScrollMessage>
    </div>
</template>

<script>
import ScrollMessage from '@/components/ScrollMessage/index';
import { flatMapDeepByArray } from '@/utils/utils';
export default {
    name: 'scrollMessage',
    components: {
        ScrollMessage
    },
    data() {
        return {

        };
    },

    mounted() {
        this.getArrList()
    },

    methods: {
        getArrList() {
            const data = {
                id: 1,
                orderCode: '202309271100',
                orderList: [
                    {
                        id: 2,
                        orderItem: [{ id: 11, name: '城府', productCount: 34567, freightDTO: { freight: 3, realFreight: 1 } }]
                    },
                    {
                        id: 3,
                        orderItem: [
                            { id: 21, name: '素颜', productCount: 45678, freightDTO: { freight: 4, realFreight: 2 } },
                            { id: 22, name: '认错', productCount: 56789, freightDTO: { freight: 9, realFreight: 8 } }
                        ]
                    },
                    {
                        id: 4,
                        orderItem: [{ id: 31, name: '多余的解释', productCount: 678910, freightDTO: { freight: 12, realFreight: 10 } }]
                    }
                ]
            }
            // console.log(data.orderList,'测试')
            // console.log(flatMapDeepByArray(data.orderList, ['orderItem', 'freightDTO', 'realFreight']),'测试')
            console.log(flatMapDeepByArray(data.orderList, ['orderItem', 'freightDTO'], ['father', 'son'], true),'测试')
        }
        
    },
};
</script>

<style lang="scss" scoped></style>