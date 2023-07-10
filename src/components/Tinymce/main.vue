<template>
  <div class="sg-text-editor">
    <editor v-model="content" :init="init" :disabled="disabled"></editor>
  </div>
</template>

<script>
// http://tinymce.ax-z.cn/integrations/integrate-index.php
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/template';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/print';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/help';

// 扩展插件
import './plugins/indent2em';
import './plugins/axupimgs';
import './plugins/imagetools';
import './plugins/importword';
import './plugins/layout';
import './plugins/letterspacing';
import './plugins/lineheight';
import './plugins/formatpainter/plugin.min';

export default {
  name: 'SgTextEditor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 600
    },
    plugins: {
      type: String,
      default:
          'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave indent2em autoresize axupimgs imagetools importword layout letterspacing lineheight formatpainter'
    },
    toolbar: {
      type: String,
      // eslint-disable-next-line no-multi-str
      default: 'importword layout | ' +
          'styleselect fontselect fontsizeselect formatpainter | ' +
          'code undo redo restoredraft | ' +
          'copy cut paste pastetext | ' +
          'forecolor backcolor letterspacing bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | indent2em lineheight axupimgs imagetools | help |'
    },
    cdnUrl: {
      type: String
    },
    dark: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: 'zh_CN'
    }
  },
  data() {
    return {
      // 初始化配置
      init: {
        language_url: `${this.cdnUrl}/langs/${this.lang}.js`,
        language: this.lang,
        skin_url: `${this.cdnUrl}/skins/ui/oxide${this.dark ? '-dark' : ''}`,
        height: this.height,
        min_height: this.height,
        max_height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        content_style: 'p {margin: 5px 0;}',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats:
            '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        branding: false,
        emoticons_database_url: `${this.cdnUrl}/plugins/emoticons/emojis.js`,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64();
          success(img);
        },
        images_upload_handlerAx: (blobInfo, success, failure) => {
          blobInfo.base64(function callback(img) {
            success(img);
          });
        }
      },
      content: this.value
    };
  },
  mounted() {
    if (!this.cdnUrl) {
      require(`tinymce/skins/ui/oxide${this.dark ? '-dark' : ''}/skin.min.css`);
      if (this.lang) {
        require(`./langs/${this.lang}`);
      }
      require('./plugins/emoticons/js/emojis.min');
    }
    tinymce.init({});
  },
  methods: {

  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>
