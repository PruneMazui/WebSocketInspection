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
        if(! event || ! event.data) {
            return;
        }

        var data = JSON.parse(event.data);

        console.log(data);

        // 来たデータをフラグを変えて送り返すのみ
        if (data.send) {
            data.send = false;
            ws.send(JSON.stringify(data));
            return;
        }

        var receive = (new Date()).getTime();

        var template = $('.template').clone().removeClass('template');
        template.find('.sent_ip').text(data.sent_ip);
        template.find('.sent_ua').text(data.sent_ua);
        template.find('.send').text(data.time);
        template.find('.receive').text(receive);
        template.find('.delay').text((receive - data.time) / 2);

        $('.table_row').css('background-color', '');
        template.css('background-color', '#DBF8FF');

        $('#result').append(template.show());
    };

    $('#test').on('click', function(){
        var data = JSON.stringify({
            'send' : true,
            'time' : (new Date()).getTime()
        });
        ws.send(data);
    });
});
