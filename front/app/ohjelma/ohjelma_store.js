import Reflux from 'reflux';
import ohjelmaActions from './ohjelma_actions.js';

export default Reflux.createStore({

    listenables: [ohjelmaActions],

    ohjelma: {},

    onGetohjelmaetCompleted: function(result) {
        this.ohjelma.ohjelmaet = result;
        this.trigger(this.ohjelma);
    },

    getInitialState: function() {
        return this.ohjelma;
    }
});
