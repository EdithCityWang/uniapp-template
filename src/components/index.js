import Vue from 'vue'

import Form from "@/components/MyForm/Form";
import FormItem from "@/components/MyForm/FormItem";
import FormSection from "@/components/MyForm/FormSection";

import PickerSelector from "@/components/MyPicker/PickerSelector";
import PickerDate from "@/components/MyPicker/PickerDate";

import UploadPic from "@/components/MyUpload/UploadPic";

Vue.component('MyForm', Form);
Vue.component('MyFormItem', FormItem);
Vue.component('MyFormSection', FormSection);

Vue.component('MyPickerSelector', PickerSelector);
Vue.component('MyPickerDate', PickerDate);

Vue.component('MyUploadPic', UploadPic);