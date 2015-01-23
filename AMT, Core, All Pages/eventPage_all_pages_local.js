/**
 * This is a file specific for the All Pages extension.
 * 
 * 
 * 
 */
 
 
function PHP_WebSocket() {

};

/**
 * chrome.extension.onRequest.addListener
 * 
 * 
 * 
 * 
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	/**
	 * google_hangouts_load_phone
	 * 
	 * Query all tabs for URL 'https://hangoutsapi.talkgadget.google.com/hangouts/_'. Send to this
	 * page's "All Pages" content script the request to load phone into the "hidden" div.
	 * 
	 * @param	phone_number	string
	 * 
	 * @returns
	 */
	console.log('TEST TEST TEST');
	if (request.method == 'google_hangouts_load_phone')
	{
		console.log('Recieved phone request');
		console.log(request);
		
		//~ chrome.tabs.query({url: 'https://hangoutsapi.talkgadget.google.com/hangouts/_*'}, function(tabs) {
		//~ chrome.tabs.query({url: 'https://*.googleusercontent.com/*'}, function(tabs) {
		chrome.tabs.query({url: '<all_urls>'}, function(tabs) {
			for (var i in tabs) {
				chrome.tabs.sendMessage(tabs[i].id, 
								{
									google_hangouts_load_phone: request.phone_number,
									google_hangouts_details: request.details,
									google_hangouts_task_name: request.task_name
								}, function(response) {
					// Meh
				});
			}
			//~ console.log('query tabs');
			//~ console.log(tabs);
			//~ return;
			//~ if(!tabs.length)
			//~ {
				//~ return;
			//~ }
			//~ var tab = tabs[0];
			//~ console.log('Sending message to tab for load phone. ' + request.phone_number);
			//~ chrome.tabs.sendMessage(tab.id, {google_hangouts_load_phone: request.phone_number}, function(response) {
				//~ // Meh
			//~ });
		});
	}
	
	
		/**
	 * request.nextTab
	 */
	if(request.allPagesNextTab)
	{
		chrome.tabs.query({active:true}, function(tab) {
			chrome.tabs.getAllInWindow(tab.windowId, function(allTabs) {
				for(var i = 0; i < allTabs.length; i++)
				{
					if(allTabs[i].active)
					{
						var currentIndex = allTabs[i].index;
						break;
					}
				}			
				console.log(currentIndex);
				
				console.log(currentIndex);
				var nextTab =  false;
				for(var i = 0; i < allTabs.length; i++)
				{
					if( (currentIndex + 1) == allTabs[i].index)
					{
						var nextTab = allTabs[i].id;
					}
				}
				if(!nextTab)
				{
					nextTab = allTabs[0].id;
				}
				
				chrome.tabs.update(nextTab, {active: true},  function() {
						//~ alert('here1');
						if(request.options.hasOwnProperty('tellNextPageThatItIsOkayToRun')) {
							chrome.tabs.sendMessage(nextTab, {itsOkayToRun: true}, function(response) {
									//squelch response
							  });
						 }
						if(request.options.hasOwnProperty('websocketNextWindow')) {
							var websocket = new PHP_WebSocket().init({isTrevorFaden:true});					
						}
						return;				
					});

				
			});
		});
	}
});




PHP_WebSocket.prototype.init = function(options) {
	var host = "ws://127.0.0.1:9000/echobot"; // SET THIS TO YOUR SERVER
	try {
		socket = new WebSocket(host);
		log('WebSocket - status '+socket.readyState);
		socket.onopen    = function(msg) { 
							   log("Welcome - status "+this.readyState); 
						   };
		socket.onmessage = function(msg) { 
							   log("Received: "+msg.data); 
						   };
		socket.onclose   = function(msg) { 
							   log("Disconnected - status "+this.readyState); 
						   };
	}
	catch(ex){ 
		log(ex); 
	}
	
	function send(){
		var txt,msg;
		txt = $("msg");
		msg = txt.value;
		if(!msg) { 
			alert("Message can not be empty"); 
			return; 
		}
		txt.value="";
		txt.focus();
		try { 
			socket.send(msg); 
			log('Sent: '+msg); 
		} catch(ex) { 
			log(ex); 
		}
	}
	function quit(){
		if (socket != null) {
			log("Goodbye!");
			socket.close();
			socket=null;
		}
	}

	function reconnect() {
		quit();
		init();
	}
	
	
	if(options.isTrevorFaden) {
		send('Switch Window');
	}
}



