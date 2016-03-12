import Reflux from 'reflux';
import IlmoActions from './ilmo_actions.js';

export default Reflux.createStore({

    listenables: [IlmoActions],

    ilmo: {},

    onButtonClickedCompleted: function(result) {
        console.log(result);
        this.ilmo.arvo = result.joku;
        this.trigger(this.ilmo);
    },

    onUpdateNimiStarted(nimi) {
        console.log('store', nimi);
        this.ilmo.nimi = nimi;
        this.trigger(this.ilmo);
    },

    getInitialState: function() {
        return this.ilmo;
    }
});
