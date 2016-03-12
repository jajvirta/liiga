import Reflux from 'reflux';

export default {
    createAsyncActions: function(actionNames) {
        let actions = {};

        actionNames.map(actionName => {
            actions[actionName] = Reflux.createAction({
                children: ['started', 'completed', 'failure']
            });
        });

        return actions;
    }
};