var router = require('express').Router();
var url = require('url');

var getRemoteIpAddr = function (request) {
    if(request.headers['x-forwarded-for']) {
        return request.headers['x-forwarded-for'];
    }

    if(request.connection && request.connection.remoteAddress) {
        return request.connection.remoteAddress;
    }

    if(request.connection.socket && request.connection.socket.remoteAddress) {
        return request.connection.socket.remoteAddress;
    }

    if(request.socket && request.socket.remoteAddress) {
        return request.socket.remoteAddress;
    }
    return '0.0.0.0';
};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title : 'Delay Checker',
        host : req.headers.host
    });
});

/* Web Socket */
var client_list = {};
var client_count = 0;

router.ws('/', function(ws, req) {
    console.log("New connection");

    client_count++;
    var seq = client_count;

    ws.on('message', function(msg) {
        var data = JSON.parse(msg);

        // 送る
        if(! data.send) {
            // 戻す
            client_list[data.seq].ws.send(JSON.stringify(data));
            return;
        }

        data.seq = seq;

        // UA と一緒に来たデータをそのまま送る
        Object.keys(client_list).forEach(function(i) {
            if (i == seq) {
                return;
            }

            data.sent_ua = client_list[i].req.headers['user-agent'];
            data.sent_ip = client_list[i].ip;

            client_list[i].ws.send(JSON.stringify(data));
        });
    });

    ws.on('close', function (code, msg) {
        delete client_list[seq];
    });

    client_list[seq] = {
        'ws' : ws,
        'req': req,
        'ip' : getRemoteIpAddr(req)
    };
});

module.exports = router;
