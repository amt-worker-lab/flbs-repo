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
	
		if(request.removeThisUitilityTab) {
			//Foremostly, don't close any tabs if there's only 1 tab in the utility window
			chrome.tabs.getAllInWindow(localStorage['UTILITY_WINDOW']*1, function(allTabs) {
				if(allTabs.length && allTabs.length > 1) {
					console.log('sender');
					console.log(sender.tab);
					if(localStorage['UTILITY_WINDOW'] == 'unset' || localStorage['UTILITY_WINDOW'] == undefined) {
						alert('no utility window set');
						return false;
					}
					
					var senderId = sender.tab.id;
					if(UtilityAMTPairs[senderId] &&
					   UtilityAMTPairs[senderId].utilities &&
					   UtilityAMTPairs[senderId].utilities.length > 0) {
						//Remove all of the old utility tabs
						var tabIdsToRemove = []
						for(var i = 0; i < UtilityAMTPairs[senderId].utilities.length; i++) {
							console.log('TABID');
							console.log(UtilityAMTPairs[senderId].utilities[i].tabId);
							console.log("UtilityAMTPairs[senderId].utilities[i].hasOwnProperty('tabId') && UtilityAMTPairs[senderId].utilities[i].tabId : " +
									(UtilityAMTPairs[senderId].utilities[i].hasOwnProperty('tabId') && UtilityAMTPairs[senderId].utilities[i].tabId)
									);
							if (UtilityAMTPairs[senderId].utilities[i].hasOwnProperty('tabId') && UtilityAMTPairs[senderId].utilities[i].tabId == sender.tab.id) {
								tabIdsToRemove.push(UtilityAMTPairs[senderId].utilities[i].tabId);
								UtilityAMTPairs[senderId].utilities.splice(i,1);
								//Send a message to my parent saying that this was removed
							}
						}
						//tabId is null
						
						console.log('REMOVE');
						console.log(tabIdsToRemove);
						//try {
							if(tabIdsToRemove.length) {
								chrome.tabs.remove(tabIdsToRemove);
							}
						//}
						//catch(e) {
							//console.log('err');
						//}
					}
					
					//Finally if this is being called from the tab that is currently active, close all instances of non-utility tabs
					if(sender.tab.active) {
						chrome.tabs.getAllInWindow(localStorage['UTILITY_WINDOW']*1, function(allTabs) {
							//Make sure if there's only one tab in the window that we don't accidentally close it
							var found;
							if(allTabs.length && allTabs.length > 1) {
								for(var i = 0; i < allTabs.length; i++) {
									found = false;
									//Now we're looping through the array of all tabs, lets loop through all utility tabs
									//~ console.log('UtilityAMTPairs[j]:');
									//~ console.log(UtilityAMTPairs[j]);
									//~ alert('wuh');
									for(var j in UtilityAMTPairs) {
										if(UtilityAMTPairs[j] && UtilityAMTPairs[j].utilities && UtilityAMTPairs[j].utilities.length) {
											//~ console.log('UtilityAMTPairs[j]:');
											//~ console.log(UtilityAMTPairs[j]);
											for(var k = 0; k < UtilityAMTPairs[j].utilities.length; k++) {
												console.log(UtilityAMTPairs[j].utilities[k].tabId + ' == ' + allTabs[i].id);
												if(UtilityAMTPairs[j].utilities[k].tabId == allTabs[i].id) {
													found = true;
													console.log('found = true');
													break;
												}
											}
										}
										if(found)
											break;
									}
									if(!found) {
										chrome.tabs.remove(allTabs[i].id);
									}
								}
							}
						});
					}
				}
				sendResponse({continueOn: true});
		});
    }
	
	
	
	/**
	 * amISpecialWorkflowWindow_all_pages
	 * 
	 * Send external message to core mturk.com.
	 */
	if(request.amISpecialWorkflowWindow_all_pages) {
		console.log(sender);
		// Send External Message!
		chrome.runtime.sendMessage(
			globals.core_content_script_extension_id,
			{
				amISpecialWorkflowWindow: true,
				window_id: sender.tab.windowId
			},
			function(response) {
				console.log(response);
				console.log(response.detail);
				
				// Send a message to global_all_pages_local.js for callback.
				chrome.tabs.sendMessage(
					sender.tab.id,
					{
						amISpecialWorkflowWindow_all_pages: true,
						detail: response.detail
					},
					function(response) {
						//
					}
				);
				
				//~ console.log(response);
				//~ console.log(request.callback);
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



