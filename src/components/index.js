import CleanForm from './cleanFrom/index.vue';
import Mess from './message/message.vue'

export default {
    install(app) {
        app.component('CleanForm', CleanForm)
        app.component('Mess', Mess)

    }
}