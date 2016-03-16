import IlmoActions from './ilmo_actions.js';
import Api from '../common/api-util';

export default {

    updateNimi: function(nimi) {
        IlmoActions.updateNimi.started(nimi);
    },

    updateKotirata: function(kotirata) {
        IlmoActions.updateKotirata.started(kotirata);
    },

    clickButton: function() {
        console.log('ilmo täältäkin!');

        return Api.post(`api/liiga/something`, IlmoActions.buttonClicked);
    },

    lahetaIlmoittautuminen: function(sarja, nimi, kotirata, yhteyshenkilo, puhelinnumero, sahkoposti) {
        console.log(sarja, nimi, kotirata, yhteyshenkilo, puhelinnumero, sahkoposti);
        var data = { nimi: nimi, kotirata: kotirata, yhteyshenkiloNimi: yhteyshenkilo,
            yhteyshenkiloPuhelinnumero: puhelinnumero, yhteyshenkiloSahkoposti: sahkoposti };
        return Api.post(`api/liiga/joukkueet/uusi`, IlmoActions.laheta, data);
    },

    another: function() {
        return Api.get(`api/liiga/get`, IlmoActions.buttonClicked);
    }

};


