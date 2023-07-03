import CleanForm from './cleanFrom/index.vue';
import Mess from './message/message.vue'
import FileUpload from './fileUpload/index.vue'
import Map from './/map/index'
import SelectAdd from './selectAdd/index.vue'
import rightMenu from './rightMenu/index.vue'


export default {
    install(app) {
        app.component('CleanForm', CleanForm)
        app.component('Mess', Mess)
        app.component('FileUpload', FileUpload)
        app.component('Map', Map)
        app.component('SelectAdd', SelectAdd)
        app.component('rightMenu', rightMenu)

    }
}