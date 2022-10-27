<template>
  <base-card v-if="clientInfo && supplyPointsClient">
    <div class="infoClient infoClientLeft">
      <h1>{{ clientInfo.full_name ? clientInfo.full_name : 'not found' }}</h1>
      <h3>{{ clientInfo.address ? clientInfo.address : 'not found' }}</h3>
      <p><b>Building type:</b> {{ clientInfo.building_type ? clientInfo.building_type : 'not found' }}</p>
      <p><b>Role:</b> {{ clientInfo.role ? clientInfo.role : 'not found' }}</p>
      <p><b>Number of neighbors:</b> {{ numNeighbors }}</p>
    </div>
    <div class="infoClient infoClientRight">
      <div class="offerType">
        <b>{{ typeOffer[offer].name }}</b>
      </div>
      <div class="consumption">
        <p><b>Tariff:</b> {{ supplyPointsClient.tariff ? supplyPointsClient.tariff : 'not found' }}</p>
        <p><b>Invoiced amount:</b> {{ supplyPointsClient.invoiced_amount ? supplyPointsClient.invoiced_amount : 'not found' }}</p>
        <p><b>Power</b></p>
        <p>P1: {{ supplyPointsClient.power ? supplyPointsClient.power.p1 + ' P2:' +  supplyPointsClient.power.p2 : 'not found' }}</p>
      </div>
    </div>
  </base-card>
  <p v-else-if="!supplyPointsClient" class="dataError">User {{ clientInfo.cups }} cannot be displayed due to a data error</p>
</template>

<script>
import {getInfoCups} from '../../global/functions'

export default {
  name: 'InfoClient',
  props: {
    clientInfo: Object
  },
  data(){
    return{
      typeOffer: {'not-offer': {'name':'Not offer','color':'#d9d9d9'},
                  'standard-offer':{'name':'Standard offer','color':'#4bf9c0'},
                  'basic-discount':{'name':'Basic discount','color':'#78ff26'},
                  'special-discount':{'name':'Special discount','color':'#fff05b'},
                  'error':{'name':'Error calculating the offer','color':'#f76565'}}
    }
  },
  methods:{
    offerOptionsAnalyzer(){
      let sumInvoicedAmount = 0.0;
      let lowPower = true;
      let error = false;
      for(let i=0; this.supplyPointsClient.neighbors.length >i; i++){
        let valor=getInfoCups(this.$store.state.supplyPoints, this.supplyPointsClient.neighbors[i]);
        if(valor){
          //for Special discount
          sumInvoicedAmount += parseFloat(valor.invoiced_amount)
          //for Basic discount
          if(parseInt(this.supplyPointsClient.power.p1) < parseInt(valor.power.p1) || parseInt(this.supplyPointsClient.power.p2) < parseInt(valor.power.p2)){
            lowPower = false;
          }
        }else{
          error = true
          break;
        }
      }
      return error ? {error: true} : {sumInvoicedAmount, lowPower, error: false}
    },
  },
  computed:{
    supplyPointsClient(){
      return getInfoCups(this.$store.state.supplyPoints, this.clientInfo.cups);
    },
    offer(){
      if(this.clientInfo.building_type !== 'house' || this.supplyPointsClient.neighbors.length === 0){
        return 'not-offer'
      }
      let {sumInvoicedAmount, lowPower, error} = this.offerOptionsAnalyzer()
      if(error){
        return 'error'
      }
      if(sumInvoicedAmount > 100){
        return 'special-discount'
      }else if(lowPower){
        return 'basic-discount'
      }
      return 'standard-offer'
    },
    colorTypeOffer(){
      if(this.supplyPointsClient) {
        return this.typeOffer[this.offer].color
      }
      return null
    },
    numNeighbors(){
      if(this.supplyPointsClient){
        if(!this.supplyPointsClient.neighbors){
          return 'no encontrado'
        }else if(this.supplyPointsClient.neighbors.length >= 2){
          return this.supplyPointsClient.neighbors.length+' neighbors'
        }else if(this.supplyPointsClient.neighbors.length === 1){
          return this.supplyPointsClient.neighbors.length+' neighbor'
        }
        return 'has no neighbors'
      }
      return null
    },
  },


}
</script>

<style scoped>
.infoClient{
  margin: 0 60px;
}
.infoClientLeft{
  flex:1;
  margin-right: 15px;
  text-align: start;
}
.infoClientRight{
  flex:1;
  margin-left: 15px;
}
.consumption{
  border: 1px #ccc solid;
  border-radius: 0 60px;
  height: 110px;
  min-width: 276px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.consumption p{
  margin: 0;
}
.offerType{
  border-radius: 10px;
  height: 25px;
  border: 1px solid #7c7c7c;
  margin: 20px 0;
  background-color: v-bind(colorTypeOffer);
}
.offerType b{
  vertical-align: sub;
}
</style>
