// run this function when the document has loaded
$(function(){
  var client = mqtt.connect('mqtt://user-dts-uns:pass-dts-uns@broker.shiftr.io', {
    clientId: 'dari-web'
  });

  client.on('connect', function(){
    console.log('Client has connected!');
    // document.write('Client has connected!');
    client.subscribe('/iot/touch-sensor');
    client.subscribe('/iot/pushbutton');
  });

  client.on('message', function(topic, message) {
    console.log('new message:', topic, message.toString());
    var msg = message.toString();
    // document.write('new message:', topic, message.toString());
    if(topic == "/iot/touch-sensor"){
      document.getElementById("touch-sensor").innerHTML = msg;
    }
    if(topic == "/iot/pushbutton"){
      document.getElementById("pushbutton").innerHTML = msg;
    }
  });

  $('#button').click(function(){
    client.publish('/iot/pushbutton', 'data ini dari web');
  })
})