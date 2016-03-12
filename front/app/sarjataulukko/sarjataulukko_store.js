import Reflux from 'reflux';
import SarjataulukkoActions from './sarjataulukko_actions.js';

export default Reflux.createStore({

    listenables: [SarjataulukkoActions],

    sarjataulukko: {},

    onGetTaulukkoCompleted: function(result) {
        console.log(result);
        this.sarjataulukko = result;
        this.trigger(this.sarjataulukko);
    },

    getInitialState: function() {
        return this.sarjataulukko;
    }
});
