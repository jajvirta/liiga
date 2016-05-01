import JoukkueActions from './joukkue_actions.js';
import Api from '../common/api-util';

export default {

    getAlustavatJoukkueet: function() {
        return Api.get(`public-api/liiga/joukkueet/alustavat`, JoukkueActions.getAlustavatJoukkueet);
    },

    getVahvistetutJoukkueet: function() {
        return Api.get(`public-api/liiga/joukkueet/vahvistetut`, JoukkueActions.getVahvistetutJoukkueet);
    },

    getOttelut: function() {
        return Api.get(`public-api/liiga/1/ottelut/tulevat`, JoukkueActions.getOttelut);
    },

    getJoukkueenOttelut: function(joukkueId) {
        return Api.get(`public-api/liiga/1/ottelut/tulevat/${joukkueId}`, JoukkueActions.getJoukkueenOttelut);
    },

    getJoukkue: function(joukkueId) {
        return Api.get(`public-api/liiga/joukkue/${joukkueId}`, JoukkueActions.getJoukkue);
    }
};


