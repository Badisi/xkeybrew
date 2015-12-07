'use strict';

/*var xbw = require('xbw');
var Q = require('q');

// HELPER(s)

function _debug(title, content, error) {
    var msg = '[WORKER]['+title+']: '+JSON.stringify(content, null, '\t');
    if( error ) {
        console.error(msg);
    } else {
        console.log(msg);
    }
}

function verifiedWithAbgx360(args) {
    _debug('ABGX360-INFOS', args);
    try {
        var results = xbw.verifiedWithAbgx360(args, function(data) {
            process.send(data);
        });
        _debug('ABGX360-INFOS', {result:results});
        process.send('end');
    } catch(err) {
        _debug('ABGX360-INFOS', err.message, true);
        process.send('end');
    }
}

function getXexInfos(file) {
    return Q.Promise(function(resolve, reject, notify) {
        try {
            var result = xbw.getIsoInfo(file);
            _debug('XEX-INFOS', result);
            result.is360ISO = true;
            return resolve(result);
        } catch(err) {
            _debug('XEX-INFOS', {'file':file,'err':err.message}, true);
            return resolve({ 'file':file, 'is360ISO':false });
        }
    });
}

// DESTRUCTOR

process.once('exit', function(code, signal) {
    process.removeAllListeners();
});

// CONSTRUCTOR

process.on('message', function(job) {
    switch( job.type ) {
        case 'xexInfos': {
            var promises = job.data.map(function(file) {
                return getXexInfos(file);
            });
            Q.allSettled(promises).then(function(results) {
                process.send(results.map(function(item) {
                    return item.value;
                }));
            });
            break;
        }
        case 'abgx360': {
            return verifiedWithAbgx360(job.data);
        }
    }
});
*/
