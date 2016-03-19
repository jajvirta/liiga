import IlmoActions from './ilmo_actions.js';
import Api from '../common/api-util';

export default {

    updateNimi: function(nimi) {
        IlmoActions.updateNimi.started(nimi);
    },

    updateKotirata: function(kotirata) {
        IlmoActions.updateKotirata.started(kotirata);
    },

    updateYhteyshenkilo: function(yhteyshenkilo) {
        IlmoActions.updateYhteyshenkilo.started(yhteyshenkilo);
    },

    updateYhteyshenkiloPuhelinnumero: function(puhnro) {
        IlmoActions.updateYhteyshenkiloPuhelinnumero.started(puhnro);
    },

    updateYhteyshenkiloSahkoposti: function(sahkoposti) {
        IlmoActions.updateYhteyshenkiloSahkoposti.started(sahkoposti);
    },

    updateMuuPelaaja1: function(nimi) {
        IlmoActions.updateMuuPelaaja1.started(nimi);
    },

    clickButton: function() {
        return Api.post(`api/liiga/something`, IlmoActions.buttonClicked);
    },

    haeIlmoittautumistiedot: function() {
        return Api.get(`api/liiga/joukkueet/kirjautuneen-kayttajan-joukkue`, IlmoActions.haeIlmoittautumistiedot);
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


