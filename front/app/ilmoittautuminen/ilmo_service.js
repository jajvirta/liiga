import IlmoActions from './ilmo_actions.js';
import Api from '../common/api-util';

export default {

    updateNimi: function(nimi) {
        IlmoActions.updateNimi.started(nimi);
    },

    clickButton: function() {
        console.log('ilmo täältäkin!');

        return Api.post(`api/liiga/something`, IlmoActions.buttonClicked);
    },

    another: function() {
        return Api.get(`api/liiga/get`, IlmoActions.buttonClicked);
    }

};


