<template>
  <base-searcher placeholderText="Ex: 123456" @search="searchUser($event)"/>
  <p v-if="!cupsUserCorrect" class="dataError">CUPS has not been found</p>
  <InfoClient v-else-if="client" :clientInfo="client"/>
  <!--InfoClient v-for="item in $store.state.clients" :key="item.cups" :clientInfo="item"/-->
</template>

<script>
import InfoClient from './InfoClient'
import {getInfoCups} from '../../global/functions'

export default {
  name: 'CupsSearch',
  components: {
    InfoClient,
  },
  data(){
    return{
      cupsUserCorrect: true,
      client: null
    }
  },
  methods:{
    searchUser(cups){
      this.client = getInfoCups(this.$store.state.clients, cups);
      this.cupsUserCorrect = !!this.client;
    }
  },
}
</script>


