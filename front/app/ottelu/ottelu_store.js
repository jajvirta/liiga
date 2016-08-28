import Reflux from 'reflux';
import otteluActions from './ottelu_actions.js';

export default Reflux.createStore({

    listenables: [otteluActions],

    ottelu: {},

    onGetOtteluCompleted: function(result) {
        this.ottelu = result;
        this.trigger(this.ottelu);
    },

    onGetOttelunTulosCompleted: function(result) {
        this.ottelu.tulos = result;
        this.trigger(this.ottelu.tulos);
    },

    getInitialState: function() {
        return this.ottelu;
    }
});
