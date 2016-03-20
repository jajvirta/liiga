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

    updateMuuPelaaja2: function(nimi) {
        IlmoActions.updateMuuPelaaja2.started(nimi);
    },

    updateMuuPelaaja3: function(nimi) {
        IlmoActions.updateMuuPelaaja3.started(nimi);
    },

    haeIlmoittautumistiedot: function() {
        return Api.get(`api/liiga/joukkueet/kirjautuneen-kayttajan-joukkue`, IlmoActions.haeIlmoittautumistiedot);
    },

    poistaIlmoittautuminen: function(joukkueId) {
        return Api.httpDelete(`api/liiga/joukkueet/${joukkueId}`, IlmoActions.poista)
    },

    lahetaIlmoittautuminen: function(sarja, ilmo) {
        var data = {
            nimi: ilmo.nimi,
            kotirata: ilmo.kotirata,
            yhteyshenkiloNimi: ilmo.yhteyshenkilo,
            yhteyshenkiloPuhelinnumero: ilmo.yhteyshenkiloPuhelinnumero,
            yhteyshenkiloSahkoposti: ilmo.yhteyshenkiloSahkoposti,
            muuPelaaja1: ''
        };
        return Api.post(`api/liiga/joukkueet/uusi`, IlmoActions.laheta, data);
    },
};


