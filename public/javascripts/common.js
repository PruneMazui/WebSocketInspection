var WSI = WSI || {};

WSI.createWSConnection = function (host, is_secure) {
    if (! host) {
        host = window.location.host;
    }

    if (typeof is_secure === "undefined") {
        is_secure = window.location.protocol.indexOf("https") != -1;
    }

    var protocol = is_secure ? "wss" : "ws";

    var ws = new WebSocket(protocol + '://' + host + '/');

    return ws;
};
