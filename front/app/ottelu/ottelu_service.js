import otteluActions from './ottelu_actions.js';
import Api from '../common/api-util';

export default {

    getOttelu: function(otteluId) {
        return Api.get(`public-api/liiga/ottelu/${otteluId}`, otteluActions.getOttelu);
    },

    getOttelunTulos: function(otteluId) {
        return Api.get(`public-api/liiga/ottelu/${otteluId}/tulokset`, otteluActions.getOttelunTulos);
    },

    ota_lohko: function(kentta) {
        // lohko_2_sija_1
        return parseInt(kentta.split('_')[1]);
    },

    ota_sijoitus: function(kentta) {
        // lohko_2_sija_1
        return parseInt(kentta.split('_')[3]);
    },

    updateTulospeli: function(otteluId, lohko,
        sija1, sija1_joukkue, sija2, sija2_joukkue,
        sija3, sija3_joukkue, sija4, sija4_joukkue
    ) {
        var data = {
            otteluId: otteluId,
            lohko: lohko,
            voittajaNimi: sija1,
            voittajaJoukkue: sija1_joukkue,
            kakkonenNimi: sija2,
            kakkonenJoukkue: sija2_joukkue,
            kolmonenNimi: sija3,
            kolmonenJoukkue: sija3_joukkue,
            nelonenNimi: sija4,
            nelonenJoukkue: sija4_joukkue
        }
        return Api.post(`api/liiga/ottelu/${otteluId}/tulospeli`, otteluActions.paivitaTulospeli, data);
    },

    lahetaReikapeli: function(otteluId,
        kotijoukkueId, vierasjoukkueId,
        r1koti, r1vieras, r1tulos,
        r2koti, r2vieras, r2tulos,
        r3koti, r3vieras, r3tulos,
        r4koti, r4vieras, r4tulos) {

        var data = {
            otteluId: otteluId,
            kotijoukkue: kotijoukkueId,
            vierasjoukkue: vierasjoukkueId,
            reikapeli1: { koti: r1koti, vieras: r1vieras, tulos: r1tulos },
            reikapeli2: { koti: r2koti, vieras: r2vieras, tulos: r2tulos },
            reikapeli3: { koti: r3koti, vieras: r3vieras, tulos: r3tulos },
            reikapeli4: { koti: r4koti, vieras: r4vieras, tulos: r4tulos }
        }

        return Api.post(`api/liiga/ottelu/${otteluId}/reikapeli`, otteluActions.paivitaReikapeli, data);
    },

    lahetaKokonaistulos: function(otteluId, k , v) {
        var data = { kotipisteet: k, vieraspisteet: v };
        return Api.post(`api/liiga/ottelu/${otteluId}/kokonaistulos`, otteluActions.koko, data);
    },
};

