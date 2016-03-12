import Reflux from 'reflux';
import SaannotActions from './saannot_actions.js';

export default Reflux.createStore({

    listenables: [SaannotActions],

    saannot: {},

    onButtonClickedCompleted: function(result) {
        console.log(result);
        this.saannot.arvo = result.joku;
        this.trigger(this.saannot);
    },

    getInitialState: function() {
        return this.saannot;
    }
});
