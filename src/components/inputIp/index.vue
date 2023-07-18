<template>
    <ul :class="[ulClass, inputSize]">
        <i v-if="!disabled && !readonly && clearable && showClear"
            class="el-input__icon el-icon-circle-close el-input__clear" @mousedown.prevent @click="clear"></i>
        <li :key="index" v-for="(item, index) in ipAddress" class="ipInputClass ">
            <input ref="ipInput" :disabled="disabled" :readonly="!disabled && readonly" v-model="item.value" type="text" style="width: 28%;"
                class="ipInputClass" @focus="changeBorderColor(1)" @blur="changeBorderColor(0)" @input="checkIpVal(item)"
                @keyup="turnIpPosition(item, index, $event)" />
            <div></div>
        </li>
    </ul>
</template>
  
<script>
export default {
    name: 'SgInputIp',
    props: {
        size: String,
        disabled: false,
        value: {
            type: String,
            default: ''
        },
        formatStyle: {
            type: String,
            default: 'node'
        },
        clearable: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showClear: false,
            ulClass: ['el-input-ip'],
            ipAddress: [
                {
                    value: ''
                }, {
                    value: ''
                }, {
                    value: ''
                }, {
                    value: ''
                }
            ]
        };
    },
    mounted() {
        if (this.value && this.value.length > 0 && this.value.split('.').length === 4) {
            let arr = this.value.split('.');
            for (let v in arr) {
                this.ipAddress[v].value = arr[v];
            }
        }
    },
    computed: {
        inputSize() {
            let classList = [];
            if (this.size && typeof (this.size) === 'string') {
                if (this.size === 'medium') {
                    classList = 'el-input-ip-medium';
                } else if (this.size === 'small') {
                    classList = 'el-input-ip-small';
                } else if (this.size === 'mini') {
                    classList = 'el-input-ip-mini';
                }
            }
            return classList;
        }
    },
    watch: {
        disabled: {
            handler: function (val) {
                if (val === '' || val) {
                    this.ulClass.push('el-input-ip-disabled');
                } else {
                    let sn = this.ulClass.indexOf('el-input-ip-disabled');
                    if (sn !== -1) {
                        this.ulClass.splice(sn, 1);
                    }
                }
            },
            immediate: true
        },
        ipAddress: { // 双向数据绑定的value
            handler: function (newVal, oldVal) {
                let str = '';
                for (const i in this.ipAddress) {
                    if (this.formatStyle === 'noNode') {
                        str += this.formatter(this.ipAddress[i].value);
                    } else {
                        if (str.length > 0) {
                            str += '.';
                        }
                        str += this.ipAddress[i].value === '' ? '000' : this.ipAddress[i].value;
                    }
                }
                if (str === '000000000000' || str === '000.000.000.000') {
                    str = '';
                }
                this.showClear = (str.length > 0);
                this.$emit('input', str);
            },
            deep: true
        }
    },
    methods: {
        clear() {
            for (const i in this.ipAddress) {
                this.ipAddress[i].value = '';
            }
        },
        changeBorderColor(isOn) {
            this.ulClass = isOn ? ['el-input-ip el-input-ip-on'] : ['el-input-ip'];
        },
        // 格式化补零方法
        formatter(val) {
            let value = val.toString();
            if (value.length === 2) {
                value = '0' + value;
            } else if (value.length === 1) {
                value = '00' + value;
            } else if (value.length === 0) {
                value = '000';
            }
            return value;
        },
        // 检查ip输入为0-255
        checkIpVal(item) {
            // 确保每个值都处于0-255
            let val = item.value;
            // 处理非数字
            val = val.toString().replace(/[^0-9]/g, '');
            val = parseInt(val, 10);
            if (isNaN(val)) {
                val = '';
            } else {
                val = val < 0 ? 0 : val;
                val = val > 255 ? 255 : val;
            }
            item.value = val;
        },
        // 光标位置判断
        turnIpPosition(item, index, event) {
            let self = this;
            let e = event || window.event;
            if (e.keyCode === 37) { // 左箭头向左跳转，左一不做任何措施
                if (index !== 0 && e.currentTarget.selectionStart === 0) {
                    self.$refs.ipInput[index - 1].focus();
                }
            } else if (e.keyCode === 39) { // 右箭头向右跳转，右一不做任何措施
                if (index !== 3 && e.currentTarget.selectionStart === item.value.toString().length) {
                    self.$refs.ipInput[index + 1].focus();
                }
            } else if (e.keyCode === 8) { // 删除键把当前数据删除完毕后会跳转到前一个input，左一不做任何处理
                if (index !== 0 && item.value === '') {
                    self.$refs.ipInput[index - 1].focus();
                }
            } else if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 190) {// 回车键、空格键、冒号均向右跳转，右一不做任何措施
                if (index !== 3) {
                    self.$refs.ipInput[index + 1].focus();
                }
            } else if (item.value.toString().length === 3) { // 满3位，光标自动向下一个文本框
                if (index !== 3) {
                    self.$refs.ipInput[index + 1].focus();
                }
            }
        }
    }
};
</script>
<style lang="scss">
// .el-input-ip,
// .el-input-ip li {
//     display: inline-block;
//     position: relative
// }

// .el-input-ip {
//     border: 1px solid #dcdfe6;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     border-radius: 4px;
//     width: 100%;
//     height: 40px;
//     -webkit-padding-start: 0;
//     padding-inline-start: 0;
//     font-size: 14px;
//     vertical-align: bottom;
//     margin-top: 0;
//     margin-bottom: 0;
//     padding-right: 10px
// }

// .el-input-ip li {
//     width: 25%;
//     height: 100%;
//     margin: 0;
//     list-style-type: none
// }

// .el-input-ip .ipInputClass {
//     border: none;
//     background: 0 0;
//     color: #666;
//     font-size: inherit;
//     width: 100%;
//     height: 100%;
//     line-height: 100%;
//     text-align: center
// }

// .el-input-ip li div {
//     position: absolute;
//     bottom: 8px;
//     right: 0;
//     border-radius: 50%;
//     background: #505050;
//     width: 2px;
//     height: 2px
// }

// .el-input-ip li:last-child div {
//     display: none
// }

// .el-input-ip input:focus {
//     outline: 0
// }

// .el-input-ip .el-input__clear {
//     position: absolute;
//     right: -3px;
//     color: #CCC;
//     font-size: 14px;
//     cursor: pointer;
//     -webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
//     transition: color .2s cubic-bezier(.645, .045, .355, 1);
//     z-index: 10
// }

// .el-input-ip .el-input__clear:hover {
//     color: #999
// }

// .el-input-ip-on {
//     border: 1px solid #00796a;
//     -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
//     transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
// }

// .el-input-ip-disabled {
//     background-color: #EEE;
//     border-color: #E2E2E2;
//     color: #CCC;
//     cursor: not-allowed
// }

// .el-input-ip-medium {
//     height: 36px
// }

// .el-input-ip-medium .ipInputClass {
//     font-size: 14px
// }

// .el-input-ip-medium .el-input__icon {
//     line-height: 36px
// }

// .el-input-ip-small {
//     height: 32px
// }

// .el-input-ip-small .ipInputClass {
//     font-size: 13px
// }

// .el-input-ip-small .el-input__icon {
//     line-height: 32px
// }

// .el-input-ip-mini {
//     height: 28px
// }

// .el-input-ip-mini .ipInputClass {
//     font-size: 12px
// }

// .el-input-ip-mini .el-input__icon {
//     line-height: 28px
// }
.el-input-ip,
.el-input-ip li {
    display: inline-block;
    position: relative
}

.el-input-ip {
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    width: 25%;
    height: 40px;
    -webkit-padding-start: 0;
    padding-inline-start: 0;
    font-size: 14px;
    vertical-align: bottom;
    margin-top: 0;
    margin-bottom: 0;
    padding-right: 10px
}

.el-input-ip li {
    width: 25%;
    height: 100%;
    margin: 0;
    list-style-type: none
}

.el-input-ip .ipInputClass {
    border: none;
    background: 0 0;
    color: #666;
    font-size: inherit;
    width: 24%;
    height: 100%;
    line-height: 100%;
    text-align: center
}

.el-input-ip li div {
    position: absolute;
    bottom: 8px;
    right: 0;
    border-radius: 50%;
    background: #505050;
    width: 2px;
    height: 2px
}

.el-input-ip li:last-child div {
    display: none
}

.el-input-ip input:focus {
    outline: 0
}

.el-input-ip .el-input__clear {
    position: absolute;
    right: -3px;
    color: #CCC;
    font-size: 14px;
    cursor: pointer;
    transition: color .2s cubic-bezier(.645, .045, .355, 1);
    z-index: 10
}

.el-input-ip-on,
.el-tree-select .vue-treeselect__control {
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
}

.el-input-ip .el-input__clear:hover {
    color: #999
}

.el-input-ip-on {
    border: 1px solid #00796a;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
}

.el-input-ip-disabled {
    background-color: #EEE;
    border-color: #E2E2E2;
    color: #CCC;
    cursor: not-allowed
}

.el-input-ip-medium {
    height: 36px
}

.el-input-ip-medium .ipInputClass {
    font-size: 14px
}

.el-input-ip-medium .el-input__icon {
    line-height: 36px
}

.el-input-ip-small {
    height: 32px
}

.el-input-ip-small .ipInputClass {
    font-size: 13px
}

.el-input-ip-small .el-input__icon {
    line-height: 32px
}

.el-input-ip-mini {
    height: 28px
}

.el-input-ip-mini .ipInputClass {
    font-size: 12px
}

.el-input-ip-mini .el-input__icon {
    line-height: 28px
}

.el-comment .OwO .OwO-logo,
.el-comment .btn {
    display: inline-block;
    line-height: 30px;
    cursor: pointer
}</style>
  