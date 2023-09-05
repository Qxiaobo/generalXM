<template>
    <div style="background: #05232b;height: 3000px;">
        <div id="container"></div>
    </div>
</template>

<script>
import { Graph } from '@antv/x6';
import bdz2 from '@/assets/220kv.png'
import bdz1 from '@/assets/110kv拷贝.png'
import bdz3 from '@/assets/35kv拷贝8.png'
export default {
    name: 'LabProjectIndex',

    data() {
        return {
            data: {
                // 节点
                nodes: [
                    {
                        shape: 'image',
                        id: 'node1', // String，可选，节点的唯一标识
                        x: 40,       // Number，必选，节点位置的 x 值
                        y: 80,       // Number，必选，节点位置的 y 值
                        width: 120,   // Number，可选，节点大小的 width 值
                        height: 120,  // Number，可选，节点大小的 height 值

                        // 我希望给这个节点设置背景图片
                        imageUrl: bdz2,
                        disableMove:false,
                        
                        attrs: {
                            // body: {
                            //     fill: '#2ECC71', // 背景颜色
                            //     // 背景图片

                            //     stroke: '#000',  // 边框颜色
                            // },

                            label: {
                                text: 'node1',
                                fill: '#fff',
                                refY: 140,       // 设置标签在节点下方显示
                                fontSize: 20,
                                textAnchor: 'middle', // 文本水平居中对齐
                                textVerticalAnchor: 'middle', // 文本垂直居中对齐
                            }, // String，节点标签
                        },


                    },
                    {
                        shape: 'ellipse',

                        id: 'node2', // String，节点的唯一标识
                        x: 160,      // Number，必选，节点位置的 x 值
                        y: 200,      // Number，必选，节点位置的 y 值
                        width: 80,   // Number，可选，节点大小的 width 值
                        height: 40,  // Number，可选，节点大小的 height 值
                        label: 'node2', // String，节点标签
                        // attrs: {
                        //     body: {
                        //         fill: '#2ECC71', // 背景颜色
                        //         stroke: '#000',  // 边框颜色
                        //     },
                        // },

                    },
                    {
                        id: 'node3', // String，节点的唯一标识
                        x: 260,      // Number，必选，节点位置的 x 值
                        y: 400,      // Number，必选，节点位置的 y 值
                        width: 80,   // Number，可选，节点大小的 width 值
                        height: 40,  // Number，可选，节点大小的 height 值
                        label: 'node3', // String，节点标签
                        attrs: {
                            body: {
                                fill: '#2ECC71', // 背景颜色
                                stroke: '#000',  // 边框颜色
                            },
                        },
                    },
                    {
                        id: 'node4', // String，节点的唯一标识
                        x: 260,      // Number，必选，节点位置的 x 值
                        y: 180,      // Number，必选，节点位置的 y 值
                        width: 80,   // Number，可选，节点大小的 width 值
                        height: 40,  // Number，可选，节点大小的 height 值
                        label: 'node4', // String，节点标签
                    },
                ],
                // 边
                edges: [

                    {
                        source: 'node1', // String，必须，起始节点 id
                        target: 'node2', // String，必须，目标节点 id
                        attrs: {
                            line: {
                                stroke: "#fff", // 指定 path 元素的填充色
                            },
                        },
                        router: {
                            name: 'orth',
                        },

                    },
                    {
                        source: 'node1', // String，必须，起始节点 id
                        target: 'node3', // String，必须，目标节点 id
                        router: {
                            name: 'orth',
                        },
                        attrs: {
                            line: {
                                stroke: "#fff", // 指定 path 元素的填充色
                            },
                        },
                    },
                ],
            }

        };
    },

    mounted() {
        this.graph()
    },

    methods: {
        graph() {
            const graph = new Graph({
                container: document.getElementById('container'),
                width: 800,
                height: 600,
                // defaultNode: {
                //     size: [100, 40],
                //     type: 'image'
                // },

            });

            graph.fromJSON(this.data);
            // 在创建图后禁止所有节点拖拽
            // graph.render();
            // const rect1 = graph.addNode({
            //     x: 30,
            //     y: 30,
            //     width: 100,
            //     height: 40,
            //     label: 'hello',
            // })

            // const rect2 = graph.addNode({
            //     x: 300,
            //     y: 240,
            //     width: 100,
            //     height: 40,
            //     label: 'world',
            // })

            // graph.addEdge({
            //     source: rect1,
            //     target: rect2,
            //     // vertices: [
            //     //     { x: 100, y: 200 },
            //     //     { x: 300, y: 120 },
            //     // ],
            //     router: {
            //         name: 'orth',
            //         args: { padding: 50 },
            //     },
            // })
        }
    },
};
</script>

<style lang="scss" scoped></style>