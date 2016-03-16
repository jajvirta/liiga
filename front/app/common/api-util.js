import 'whatwg-fetch';
import _ from 'lodash';

const parseJSON = function(response) {
    if (response === undefined || response === null) {
        return response;
    }

    if (response.headers.get('Content-Length') === '0') {
        return '';
    } else {
        return response.json();
    }
};

const handleError = function(method, error, action, data) {
    action.failure(error, data);
    console.log("error", error);
    return error;
};

const checkStatus = function(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export var csrfToken = '';

export default {

    get: function(url, action) {
        action.started();

        const options = {
            method: 'get',
            credentials: 'same-origin'
        };

        return fetch(url, options)
            .then(function(response) {
                var proposedCsrfToken = response.headers.get('XSRF-TOKEN');
                if (proposedCsrfToken !== undefined && proposedCsrfToken && proposedCsrfToken !== csrfToken) {
                    csrfToken = proposedCsrfToken;
                }

                return response;
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(function(jsonResponse) {
                action.completed(jsonResponse);
                return jsonResponse;
            }).catch(error => handleError(options.method, error, action));
    },

    post: function(url, action, data) {
        action.started(data);

        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        };

        return fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then(function (jsonResponse) {
                action.completed(jsonResponse);
                return jsonResponse;
            })
            .catch(error => handleError(options.method, error, action, data));
    },

    put: function(url, action, data, shouldUpdateProgress) {
        action.started(data);

        const options = {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        };

        return fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then(function (jsonResponse) {
                action.completed(jsonResponse);
                return jsonResponse;
            })
            .catch(error => handleError(options.method, error, action, data));
    },

    del: function(url, action, data) {
        this.httpDelete(url, action, data)
            .catch(error => handleError('delete', error, action, data));
    },

    httpDelete: function(url, action, data) {
        action.started(data);

        const options = {
            method: 'delete',
            credentials: 'same-origin',
            headers: {
                'X-XSRF-TOKEN': csrfToken
            }
        };

        return fetch(url, options)
            .then(checkStatus)
            .then(function () {
                action.completed(data);
            });
    }
};

