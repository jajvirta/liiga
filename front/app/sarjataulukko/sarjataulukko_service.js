import SarjataulukkoActions from './sarjataulukko_actions.js';
import Api from '../common/api-util';

export default {

    getSarjataulukko: function() {
        return Api.get(`api/liiga/sarjataulukko`, SarjataulukkoActions.getTaulukko);
    }
};


