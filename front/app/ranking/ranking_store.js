import Reflux from 'reflux';
import rankingActions from './ranking_actions.js';

export default Reflux.createStore({

    listenables: [rankingActions],

    ranking: {},

    onGetrankingetCompleted: function(result) {
        this.ranking.rankinget = result;
        this.trigger(this.ranking);
    },

    getInitialState: function() {
        return this.ranking;
    }
});
