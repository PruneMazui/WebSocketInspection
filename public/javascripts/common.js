var WSI = WSI || {};

WSI.createWSConnection = function (host, is_secure) {
    if (! host) {
        host = window.location.host;
    }

    if (typeof is_secure === "undefined") {
        is_secure = window.location.protocol === "https";
    }

    var protocol = is_secure ? "wss" : "ws";

    var ws = new WebSocket(protocol + '://' + host + '/');

    ws.onerror = function (e) {
        window.alert('サーバに接続できませんでした。');
        console.log(e);
        return false;
    };

    return ws;
};
