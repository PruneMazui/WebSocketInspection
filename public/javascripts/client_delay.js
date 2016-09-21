$(function(){
    var ws = WSI.createWSConnection();

    if (ws === false) {
        return;
    }

    var count = 1;

    setInterval(function(){
        ws.send('count : ' + count );
        $('.count').text(count);
        count++;
    }, 1000);
});
