import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import './assets/main.css'

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: colors.purple,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.blue.lighten3,
        },
      },
    },
  })
  
// const app = createApp(App);
// app.use(store);
// app.use(router)
// app.use(vuetify);
// app.mount('#app')

Vue.use(Vuetify)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')