import Vue from 'vue';
import LabMessage from './message.vue';

// 创建弹框组件构造函数
const MessageConstructor = Vue.extend(LabMessage);

const Message = function({type, text, duration = 2000}) {
  // 创建一个弹框组件实例
  const instance = new MessageConstructor({
    propsData: {
      type,
      text
    }
  });
  // 手动挂载实例到 DOM 元素上
  instance.$mount();
  document.body.appendChild(instance.$el);

  // 定时器控制自动关闭弹框
  setTimeout(() => {
    instance.$el.remove();
    instance.$destroy();
  }, duration);
}

// 在组件上添加 success、error、warning 方法
Message.success = function(text, duration = 2000) {
  Message({
    type: 'success',
    text,
    duration
  });
}

Message.error = function(text, duration = 2000) {
  Message({
    type: 'error',
    text,
    duration
  });
}

Message.warning = function(text, duration = 2000) {
  Message({
    type: 'warning',
    text,
    duration
  });
}

export default Message;
