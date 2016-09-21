var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title : 'Delay Checker',
        host : req.headers.host
    });
});

/* Web Socket */
router.ws('/', function(ws, req) {
    console.log("New connection")

    ws.on('message', function(msg) {
        console.log(msg);
    });
});

module.exports = router;
