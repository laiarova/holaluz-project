import { createStore } from 'vuex';
import clients from "../static/clients.json";
import supplyPoints from "../static/supply-points.json";


export const store = createStore({
    state () {
        return {
            clients: clients,
            supplyPoints: supplyPoints
        }
    },

});