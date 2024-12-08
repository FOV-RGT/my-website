import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import router from './assets/router/router.js';

gsap.registerPlugin(RoughEase,ExpoScaleEase,SlowMo,CustomEase);

createApp(App).use(Varlet).use(router).mount('#app')
