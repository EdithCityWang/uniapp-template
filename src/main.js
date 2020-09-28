import Vue from 'vue'
import App from './App'
import store from './store'
import './mock'
// import './components/index.js'

import Form from "./components/MyForm/Form";
import FormItem from "./components/MyForm/FormItem";
import FormSection from "./components/MyForm/FormSection";

import PickerSelector from "./components/MyPicker/PickerSelector";
import PickerDate from "./components/MyPicker/PickerDate";
import PickerAddress from "./components/MyPicker/PickerAddress";

import UploadPic from "./components/MyUpload/UploadPic";

import Grids from "./components/MyGrids/Grids";

import Modal from "./components/MyModal/Modal";

import Swiper from "./components/MySwiper/Swiper";

import Tabs from "./components/MyTabs/Tabs";

Vue.component('MyForm', Form);
Vue.component('MyFormItem', FormItem);
Vue.component('MyFormSection', FormSection);

Vue.component('MyPickerSelector', PickerSelector);
Vue.component('MyPickerDate', PickerDate);
Vue.component('MyPickerAddress', PickerAddress);

Vue.component('MyUploadPic', UploadPic);

Vue.component('MyGrids', Grids);

Vue.component('MyModal', Modal);

Vue.component('MySwiper', Swiper);

Vue.component('MyTabs', Tabs);

// #ifdef H5
import Jweixin from 'jweixin-module'
Vue.prototype.$jweixin = Jweixin
// #endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
