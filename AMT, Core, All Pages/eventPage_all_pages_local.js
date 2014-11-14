/**
 * This is a file specific for the All Pages extension.
 * 
 * 
 * 
 */
 
 
 

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
});
