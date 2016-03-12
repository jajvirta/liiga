import SaannotActions from './saannot_actions';
import Api from '../common/api-util';

export default {

    clickButton: function() {
        console.log('helo täältäkin!');

        return Api.post(`api/liiga/something`, SaannotActions.buttonClicked);
    },

    another: function() {
        return Api.get(`api/liiga/get`, SaannotActions.buttonClicked);
    }

};


