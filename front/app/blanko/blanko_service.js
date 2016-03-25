import SaannotActions from './blanko_actions';
import Api from '../common/api-util';

export default {

    clickButton: function() {
        return Api.post(`api/liiga/something`, BlankoActions.blankoAction);
    },

};


