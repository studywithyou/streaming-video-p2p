navigator.webkitGetUserMedia({ video: false, audio: true }, function (stream) {
  var Peer = require('simple-peer');
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  });

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  });

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value);
    peer.signal(otherId)
  });

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
    document.getElementById('yourMessage').value="";
    document.getElementById('messages').textContent += "Me:"+yourMessage + '\n';

  });

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += "Friend: "+data + '\n';
  });

   peer.on('stream', function (stream) {
     var video = document.createElement('video')
     document.getElementById('video').appendChild(video)

     video.src = window.URL.createObjectURL(stream);
     video.play()
   })
}, function (err) {
  console.error(err)
});
