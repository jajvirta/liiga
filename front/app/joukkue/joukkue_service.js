import JoukkueActions from './joukkue_actions.js';
import Api from '../common/api-util';

export default {

    getJoukkueet: function() {
        return Api.get(`public-api/liiga/joukkueet/alustavat`, JoukkueActions.getJoukkueet);
    }
};


