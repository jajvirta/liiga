import Reflux from 'reflux';
import SaannotActions from './blanko_actions.js';

export default Reflux.createStore({

    listenables: [BlankoActions],

    blanko: {},

    onButtonClickedCompleted: function(result) {
        this.blanko.arvo = result.joku;
        this.trigger(this.blanko);
    },

    getInitialState: function() {
        return this.blanko;
    }
});
