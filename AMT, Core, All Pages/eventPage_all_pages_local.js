/**
 * This is a file specific for the All Pages extension.
 * 
 * 
 * 
 */
 
// A place for global vars
var globals = {
	core_content_script_extension_id: 'gcfnekbbpmbgadddbojhlojhddnkcpje'
};

function WS() {

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
	 * amISpecialWorkflowWindow_all_pages
	 * 
	 * Send external message to core mturk.com.
	 */
	if(request.amISpecialWorkflowWindow_all_pages) {
		//~ var sendResponse = sendResponse;
		//~ console.log(request);
		//~ console.log(sender);
		//~ console.log(sender.tab.windowId);
		//~ console.log(sendResponse);
		// Send External Message!
		chrome.runtime.sendMessage(
			globals.core_content_script_extension_id,
			{
				amISpecialWorkflowWindow: true,
				window_id: sender.tab.windowId
			},
			function(response) {
				console.log(response);
				console.log(request.callback);
				//~ sendResponse(response);
				//~ return 'x';
			}
		);
				
		//~ chrome.windows.getCurrent(
			//~ function(window) {
				//~ // Send External Message!
				//~ chrome.runtime.sendMessage(
					//~ globals.core_content_script_extension_id,
					//~ {amISpecialWorkflowWindow: true, window_id: window.id},
					//~ function(response) {
						//~ console.log(response);
						//~ alert(response);
						//~ sendResponse(response);
					//~ }
				//~ );
			//~ }
		//~ );
	}
	
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
				chrome.tabs.sendMessage(
					tabs[i].id,
					{
						google_hangouts_load_phone: request.phone_number,
						google_hangouts_details: request.details,
						google_hangouts_task_name: request.task_name
					},
					function(response) {
						// Meh
					}
				);
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
							var websocket = new WS().init({isTrevorFaden:true});					
						}
						return;				
					});

				
			});
		});
	}
});




WS.prototype.init = function(options) {
	function send(msg){
		var msg = msg;
		if(!msg) { 
			alert("Message can not be empty"); 
			return; 
		}

		try { 
			WS.socket.send(msg); 
			console.log('Sent: '+msg); 
		} catch(ex) { 
			console.log(ex); 
		}
	}
	
	function quit(){
		if (WS.socket != null) {
			console.log("Goodbye!");
			WS.socket.close();
			WS.socket=null;
		}
	}

	function reconnect() {
		quit();
		init();
	}
	
	
	WS.host = "ws://127.0.0.1:9000/echobot"; // SET THIS TO YOUR SERVER
	try {
		WS.socket = new WebSocket(WS.host);
		console.log('WebSocket - status '+WS.socket.readyState);
		WS.socket.onopen    = function(msg) {	
								if(options.isTrevorFaden) {
									send('Switch Window');
									quit();
								}
							   console.log("Welcome - status "+this.readyState); 
						   };
		WS.socket.onmessage = function(msg) { 
							   console.log("Received: "+msg.data); 
						   };
		WS.socket.onclose   = function(msg) { 
							   console.log("Disconnected - status "+this.readyState); 
						   };
	}
	catch(ex){ 
		console.log(ex); 
	}
	
}



