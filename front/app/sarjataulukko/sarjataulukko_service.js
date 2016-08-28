import SarjataulukkoActions from './sarjataulukko_actions.js';
import Api from '../common/api-util';

export default {

    getSarjataulukko: function() {
        return Api.get(`public-api/liiga/sarjataulukko`, SarjataulukkoActions.getTaulukko);
    },

    getRanking: function() {
        return Api.get(`public-api/liiga/tilastot`, SarjataulukkoActions.getRanking);
    }
};


