
nbUsers=0;



var register =(socket) => {
   
 nbUsers=nbUsers+1;
if(nbUsers==1){
   socket.emit('one_client');
   
   socket.join("/room");
   

}
  else if (nbUsers==2 ){
  socket.join("/room");
   
  socket.on('nouveau_client', function() {
      
      socket.broadcast.to('/room').emit('nouveau_client',"")});
}


else if ( nbUsers>2){
  socket.emit('wait_client');
  
}
}

var connect  = (socket)=>{
     
      handleDisconnect(socket);
      register(socket);
      handleMessage(socket)
   
  }

var handleMessage =(socket)=> {
  if (nbUsers<3){
  socket.on('message', function (message) {
    socket.broadcast.to('/room').emit('message', { message: message});

  
});

 }

}

var handleDisconnect = (socket)=>{
 
  socket.on('disconnect', function (message) {
   if(nbUsers<3){
    socket.broadcast.to('/room').emit('alertedisconnect', {message: message});}

    nbUsers=nbUsers-1;
    
  });

}

exports.connect=connect;
