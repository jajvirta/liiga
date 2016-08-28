import Reflux from 'reflux';
import KayttajaActions from './kayttaja_actions.js';

export default Reflux.createStore({

    listenables: [KayttajaActions],

    kayttaja: { authenticated: false, superuser: false },

    onLogoutCompleted: function(result) {
        this.kayttaja.authenticated = false;
        this.kayttaja.superuser = false;
        this.kayttaja.nimi = '';
        this.trigger(this.kayttaja);
    },

    onHaeKayttajaCompleted: function(result) {
        this.kayttaja.authenticated = result.authenticated;
        this.kayttaja.name = result.name;
        this.kayttaja.superuser = result.superuser;
        this.trigger(this.kayttaja);
    },

    getInitialState: function() {
        return this.kayttaja;
    }
});
