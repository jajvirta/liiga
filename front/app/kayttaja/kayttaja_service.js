import KayttajaActions from './kayttaja_actions.js';
import Api from '../common/api-util';

export default {

    haeKayttaja: function() {
        return Api.get(`public-api/liiga/user`, KayttajaActions.haeKayttaja);
    },

    logout: function() {
        console.log('target', `/logout`);
        return Api.plainPost('/logout', KayttajaActions.logout, {});
    }
};


