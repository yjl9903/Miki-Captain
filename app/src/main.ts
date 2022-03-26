import { createApp } from 'vue';

import 'uno.css';
import '@unocss/reset/normalize.css';
import './styles/main.css';

import App from './App.vue';
import CButton from './components/CButton.vue';
import { router } from './router';

createApp(App).component('c-button', CButton).use(router).mount('#app');
