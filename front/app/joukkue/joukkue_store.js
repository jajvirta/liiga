import Reflux from 'reflux';
import JoukkueActions from './joukkue_actions.js';

export default Reflux.createStore({

    listenables: [JoukkueActions],

    joukkue: {
        alustavat: [],
        vahvistetut: [],
        valittu: {}
    },

    onGetJoukkueCompleted: function(result) {
        this.joukkue.valittu = result;
        this.trigger(this.joukkue);
    },

    onGetAlustavatJoukkueetCompleted: function(result) {
        this.joukkue.alustavat = result;
        this.trigger(this.joukkue);
    },

    onGetVahvistetutJoukkueetCompleted: function(result) {
        this.joukkue.vahvistetut = result;
        this.trigger(this.joukkue);
    },

    onGetOttelutCompleted: function(result) {
        this.joukkue.ottelut = result;
        this.trigger(this.joukkue);
    },

    getInitialState: function() {
        return this.joukkue;
    }
});
