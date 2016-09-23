var router = require('express').Router();
var url = require('url');

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

        // UA と一緒に来たデータをそのまま送る
        Object.keys(client_list).forEach(function(i) {
            if (i == seq) {
                return;
            }
            client_list[i].ws.send(JSON.stringify({
                'time': data,
                'ua' : req.headers['user-agent']
            }));
        });
    });

    ws.on('close', function (code, msg) {
        delete client_list[seq];
    });

    client_list[seq] = {
        'ws' : ws,
        'req': req
    };
});

module.exports = router;
