$(function(){

    var ws;

    try {
        ws = WSI.createWSConnection();
    } catch (e) {
        alert('サーバとの接続に失敗しました。');
        return;
    }

    var count = 1;

    var is_readonly = true;

    ws.onmessage = function (event) {
        if(! event.data) {
            return;
        }

        var receive = (new Date()).getTime();
        var data = JSON.parse(event.data);

        var template = $('.template').clone().removeClass('template');
        template.find('.from').text(data.ua);
        template.find('.send').text(data.time);
        template.find('.receive').text(receive);
        template.find('.diff').text(receive - data.time);

        $('#result').append(template.show());
    };

    $('#test').on('click', function(){
        var data = JSON.stringify((new Date()).getTime());
        ws.send(data);
    });
});
