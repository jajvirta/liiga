import ohjelmaActions from './ohjelma_actions.js';
import Api from '../common/api-util';

export default {

    getohjelmaet: function() {
        return Api.get(`public-api/liiga/ohjelmaet/alustavat`, ohjelmaActions.getohjelmaet);
    }
};


