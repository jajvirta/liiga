import Reflux from 'reflux';
import SarjataulukkoActions from './sarjataulukko_actions.js';

export default Reflux.createStore({

    listenables: [SarjataulukkoActions],

    sarja: { sarjataulukko: {}, ranking: {}},

    onGetTaulukkoCompleted: function(result) {
        this.sarja.sarjataulukko = result;
        this.trigger(this.sarja);
    },

    onGetRankingCompleted: function(result) {
        this.sarja.ranking = result;
        this.trigger(this.sarja);
    },

    getInitialState: function() {
        return this.sarja;
    }
});
