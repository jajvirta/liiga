import Reflux from 'reflux';
import IlmoActions from './ilmo_actions.js';

export default Reflux.createStore({

    listenables: [IlmoActions],

    ilmo: {
        onIlmoittautunut: false
    },

    onButtonClickedCompleted: function(result) {
        console.log(result);
        this.ilmo.arvo = result.joku;
        this.trigger(this.ilmo);
    },

    onHaeIlmoittautumistiedotCompleted: function(result) {
        if (result && result.yhteyshenkilo) {
            this.ilmo.onIlmoittautunut = true;
            this.ilmo.nimi = result.nimi
            this.ilmo.kotirata = result.kotirata;
            this.ilmo.yhteyshenkilo = result.yhteyshenkilo;
            this.ilmo.yhteyshenkiloSahkoposti = result.yhteyshenkiloSahkoposti;
            this.ilmo.yhteyshenkiloPuhelinnumero = result.yhteyshenkiloPuhelinnumero;
        }

        this.trigger(this.ilmo);
    },

    onUpdateNimiStarted(nimi) {
        this.ilmo.nimi = nimi;
        this.trigger(this.ilmo);
    },

    onUpdateYhteyshenkiloStarted(yhteyshenkilo) {
        this.ilmo.yhteyshenkilo = yhteyshenkilo;
        this.trigger(this.ilmo);
    },

    onUpdateYhteyshenkiloPuhelinnumeroStarted(puhelinnumero) {
        this.ilmo.yhteyshenkiloPuhelinnumero = puhelinnumero;
        this.trigger(this.ilmo);
    },

    onUpdateYhteyshenkiloSahkopostiStarted(sahkoposti) {
        this.ilmo.yhteyshenkiloSahkoposti = sahkoposti;
        this.trigger(this.ilmo);
    },

    onUpdateMuuPelaaja1Started(nimi) {
        this.ilmo.muu_pelaaja_1 = nimi;
        this.trigger(this.ilmo);
    },

    onUpdateKotirataStarted(kotirata) {
        this.ilmo.kotirata = kotirata;
        this.trigger(this.ilmo);
    },

    getInitialState: function() {
        return this.ilmo;
    }
});
