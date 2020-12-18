
var socket = io('https://zinedinechat.herokuapp.com');
          
           socket.emit('nouveau_client');

           socket.on('message', function(data) {

               insereMessage( data.message);

           })

           socket.on('wait_client', function() {

insereMessage("connection refused,too much peaple already");

           })
           socket.on('one_client', function() {
insereMessage("wait for a second user");
             

           })
           
           socket.on('nouveau_client', function() {
insereMessage("second connected");
               

           })
           socket.on('alertedisconnect', function() {
insereMessage("the second user disconected");
            

           })

           var executer =
              () =>  {
           
           document.getElementById('formulaire_chat').addEventListener('submit', function(e) {
              
             var message = document.getElementById('message').value;
             
             socket.emit('message', message); 

             document.getElementById('message').value=""; 
              e.preventDefault();

               });}

           var insereMessage =
              (message) =>  {

               document.getElementById('zone_chat').innerHTML +="<p>" + message + "</p>";

           }

 window.addEventListener('load', executer);



