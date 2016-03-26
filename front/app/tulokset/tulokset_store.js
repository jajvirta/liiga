import Reflux from 'reflux';
import TuloksetActions from './tulokset_actions.js';

export default Reflux.createStore({

    listenables: [TuloksetActions],

    tulokset: {},

    getInitialState: function() {
        return this.tulokset;
    },

    onUpdateCompleted: function() {
        this.trigger(this.tulokset);
    },

    onSetNimiCompleted: function(nimi) {
        console.log('setting valittu as', nimi);
        this.tulokset.valittuNimi = nimi;
        this.trigger(this.tulokset);
    }
});
