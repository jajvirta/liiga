import rankingActions from './ranking_actions.js';
import Api from '../common/api-util';

export default {

    getrankinget: function() {
        return Api.get(`public-api/liiga/rankinget/alustavat`, rankingActions.getrankinget);
    }
};


