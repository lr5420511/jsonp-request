import 'babel-polyfill';

const win = window;

const request = async function (options) {
    const {
        url, query, cacheMode, methodKey, adapter, timeout, proxy
    } = Object.assign(this || {}, {
            url: '/',
            query: null,
            cacheMode: true,
            methodKey: 'callback',
            proxy: null,
            timeout: 20000,
            adapter: function () {
                const [res, rej, err, dat] = Object.assign(
                    [], arguments
                );
                return typeof dat == 'undefined' ? res(err) : (
                    err ? rej(err) : res(dat)
                );
            }
        }, options);
    return await new Promise((res, rej) => {
        const [pairs, methodValue] = [strify(query), `response_${Date.now()}`],
            key = `${url}?${pairs}`,
            values = cacheMode && cache[key],
            response = win[methodValue] = function () {
                const dats = [...arguments];
                if (!values) {
                    script.parentElement.removeChild(script);
                    cacheMode && (cache[key] = dats);
                }
                delete win[methodValue];
                proxy && (delete win[proxy]);
                adapter(res, rej, ...dats);
            };
        if (values) return response(...values);
        if(proxy) {
            if(typeof win[proxy] === 'function') {
                const err = new Error(`${proxy} proxy function is exist.`);
                err.forecastable = true;
                throw err;
            }
            win[proxy] = function() {
                response(...arguments);    
            };
        } 
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('async', '');
        script.setAttribute('src', `${key}${pairs && '&'}${methodKey}=${methodValue}`);
        // start request
        document.head.appendChild(script);
        // timer
        setTimeout(() => {
            if (win[methodValue]) {
                const err = new Error('Request timeout.');
                err.forecastable = true;
                response(err, null);
            }
        }, timeout);
    });
};

const { cache, strify } = Object.assign(request, {
    cache: {},
    strify: (query, valueof = '=', per = '&') => {
        return Object.keys(query).reduce((res, key) => {
            const val = query[key];
            return res.push(typeof val == 'undefined' ?
                key : `${key}${valueof}${val}`
            ) && res;
        }, []).join(per);
    }
});

export default request;