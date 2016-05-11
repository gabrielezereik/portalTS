var winston = require('winston');

var fs = require('fs');
var logDir = __dirname+'/../../logs/';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true
        }),
        new (winston.transports.File)({
            filename: logDir+'log.txt',
            colorize: false,
            timestamp: true,
            maxsize: 1024*1024*5 //5MB
      })
    ]
});

require('winston-mongodb').MongoDB;
logger.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/portallogs'
});


// Uncomment this if you want to enable logzio logs!
// var logzioWinstonTransport = require('winston-logzio');
// var loggerOptions = {
//     token: 'Your-token-here'
// };
// logger.add(logzioWinstonTransport, loggerOptions);


export function debug(str, meta?) {
    if (meta) return logger.debug(str, meta);
    return logger.debug(str);
}

export function info(str, meta?) {
    if (meta) return logger.info(str, meta);
    return logger.info(str);
}

export function warn(str, meta?) {
    if (meta) return logger.warn(str, meta);
    return logger.warn(str);
}

export function error(str, meta?) {
    if (meta) return logger.error(str, meta);
    return logger.error(str);
}


export function log(level, str) {
    return logger.log(level, str);
}
