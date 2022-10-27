import { createApp } from 'vue';
import { store } from './store';
import App from './App.vue';

import BaseCard from "./components/UI/BaseCard";
import BaseSearcher from "./components/UI/BaseSearcher";

const app = createApp(App).use(store);

app.component('base-card', BaseCard);
app.component('base-searcher', BaseSearcher);

app.mount('#app')
