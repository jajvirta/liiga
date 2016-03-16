import Reflux from 'reflux';
import KayttajaActions from './kayttaja_actions.js';

export default Reflux.createStore({

    listenables: [KayttajaActions],

    kayttaja: { authenticated: false },

    onHaeKayttajaCompleted: function(result) {
        if (result.authenticated) { console.log('authd'); }
        if (!result.authenticated) { console.log('not authd'); }
        this.kayttaja.authenticated = result.authenticated;
        this.kayttaja.name = result.name;
        this.trigger(this.kayttaja);
    },

    getInitialState: function() {
        return this.kayttaja;
    }
});
