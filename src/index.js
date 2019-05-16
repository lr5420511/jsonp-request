import jsonp from './domain-request';

(win => {

    const method = win.jsonp = async (options, callback) => {
        let res, error;
        try {
            res = await jsonp(options);
        } catch (err) {
            if (!err.forecastable) throw err;
            error = err;
        }
        callback(error, res);
    };

    method.cache = jsonp.cache;

})(window)