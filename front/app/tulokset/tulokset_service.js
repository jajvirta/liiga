import TuloksetActions from './tulokset_actions.js';
import Api from '../common/api-util';

export default {

    getJoukkueet: function() {
        return Api.get(`public-api/liiga/joukkueet/alustavat`, JoukkueActions.getJoukkueet);
    },

    update: function() {
        TuloksetActions.update.completed();
    },

    setNimi: function(nimi) {
        TuloksetActions.setNimi.completed(nimi);
    }
};


