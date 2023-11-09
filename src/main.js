import { createApp } from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify's CSS

const app = createApp(App);


// Register Vuetify and use its options
app.use(Vuetify, {
  icons: {
    iconfont: 'mdi', // Use the Material Design Icons (MDI) font
  },
});
app.use()

app.mount('#app');
