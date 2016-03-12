import Reflux from 'reflux';
import JoukkueActions from './joukkue_actions.js';

export default Reflux.createStore({

    listenables: [JoukkueActions],

    joukkue: {},

    onGetJoukkueetCompleted: function(result) {
        this.joukkue.joukkueet = result;
        this.trigger(this.joukkue);
    },

    getInitialState: function() {
        return this.joukkue;
    }
});
