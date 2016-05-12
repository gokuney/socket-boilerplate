var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

var clients =  {};

io.on('connection', function (socket) {
	console.log('Connected to socket');
	//get id from client

	socket.on('storeClientInfo', function (data) {

		if( typeof clients[data.customId] == 'undefined' ){
			
				clients[data.customId] =  [];
		}
        	
        	clients[data.customId].push(socket);

        	console.log('New Client added as ' + data.customId);

        });

	
	socket.on('disconnect', function (data) {

            for( var i=0, len=clients.length; i<len; ++i ){
                var c = clients[i];

                if(c.clientId == socket.id){
                    clients.splice(i,1);
                    break;
                }
            }

    });




	//Listen for event

	socket.on('moving' , function(data){

		//console.log('Received '+msg);

		//set the data to 

		//send it to specific clients
		var dboy = data.customId;

		console.log('sending');
		console.log(data);

		console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');

		for( key in clients ){

			var client = clients[key];

			//traverse into clients list
			if( key == dboy ){
				//fly 
				for( key2 in client){
					console.log('Sending');
					var cl = client[key2];
					cl.emit('moving' , data);
				}

			}




		}

		

	});


  
  });