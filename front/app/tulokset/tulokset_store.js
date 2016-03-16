import Reflux from 'reflux';
import TuloksetActions from './tulokset_actions.js';

export default Reflux.createStore({

    listenables: [TuloksetActions],

    tulokset: {},

    getInitialState: function() {
        return this.tulokset;
    }
});
