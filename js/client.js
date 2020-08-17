socket = io.connect('10.0.0.103:8080');

socket.on('disconnect', function () {
    socket.close();
});

socket.on('msg', function (data) {
    var event = new CustomEvent('bipml', { detail: data });
    document.querySelectorAll('*').forEach(function (node) {
        node.dispatchEvent(event);
    });
});

document.getElementById('pression').addEventListener('bipml',function(evt){
    data = evt.detail;
    let totalWeight = data.lf+data.lb+data.rf+data.rb;
    if(totalWeight>100){
        let balancex = (data.lf+data.lb)/totalWeight;
        let balancey = (data.rb+data.lb)/totalWeight;

        this.setAttributeNS(null, 'style', "display:'';");
        this.setAttributeNS(null, 'cx', 100+balancex*300);
        this.setAttributeNS(null, 'cy', 100+balancey*300);
        this.setAttributeNS(null, 'r', totalWeight/50);
    }else{
        this.setAttributeNS(null, 'style', 'display:none;');
        this.setAttributeNS(null, 'cx', 100);
        this.setAttributeNS(null, 'cy', 100);
    }
});

document.getElementById('dynamic').addEventListener('bipml',function(evt){
    data = evt.detail;
    //console.log(data);
    this.setAttributeNS(null, 'style', "display:'';");
    this.setAttributeNS(null, 'cx', 250+data.roll);
    this.setAttributeNS(null, 'cy', 250+data.rollrate);
    this.setAttributeNS(null, 'r', 5);
});