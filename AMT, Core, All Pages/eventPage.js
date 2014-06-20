chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.nextTab)
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
				chrome.tabs.update(nextTab, {active: true});				
			});
		});
	}
	
	/**
	 * The incognito boolean must be known for these
	 */
	/*functions*/
	// get
	function storage__get(id, request) {
		chrome.tabs.getSelected(id, function(tab) {
			if (tab.incognito === true) {
				sendResponse({data: localStorage[request.key + '____INCOGNITO_SESSION']});
			}
			else {
				sendResponse({data: localStorage[request.key]});
			}
		});
	}
	// save
	function storage__save(id, request) {
		chrome.tabs.getSelected(id, function(tab) {
			if (tab.incognito) {
				localStorage[request.key + '____INCOGNITO_SESSION'] = request.data;
			}
			else {
				localStorage[request.key] = request.data;
			}
			sendResponse();
		});
	}
	// delete
	function storage__delete(id, request) {
		chrome.tabs.getSelected(id, function(tab) {
			if (tab.incognito) {
				localStorage.removeItem(request.key + '____INCOGNITO_SESSION');
				sendResponse({data: localStorage[request.key + '____INCOGNITO_SESSION']});
			}
			else {
				localStorage.removeItem(request.key);
				sendResponse({data: localStorage[request.key]});
			}
		});
	}
	
	/*request.method*/
	// get
	if (request.method == "getLocalStorage") {
		
		// is this from a tab or from a window?
		var type = (sender.tab) ? 'tab' : 'window';
		var id = (sender.tab) ? sender.tab.windowId : sender.id;
		
		if (type == 'tab') { // tab
			storage__get(id, request);
		}
		else { // window
			chrome.windows.getCurrent(function(w) {
				storage__get(w.id, request);
			});
		}
	}
	// save
	else if (request.method == "saveLocalStorage" && request.key && request.data) {
		
		var type = (sender.tab) ? 'tab' : 'window';
		var id = (sender.tab) ? sender.tab.windowId : sender.id;
		
		if (type == 'tab') { // tab
			storage__save(id, request);
		}
		else { // window
			chrome.windows.getCurrent(function(w) {
				storage__save(w.id, request);
			});
		}
	}
	// delete
	else if (request.method == "deleteLocalStorage" && request.key) {
		
		var type = (sender.tab) ? 'tab' : 'window';
		var id = (sender.tab) ? sender.tab.windowId : sender.id;
		
		if (type == 'tab') { // tab
			storage__delete(id, request);
		}
		else { // window
			chrome.windows.getCurrent(function(w) {
				storage__delete(w.id, request);
			});
		}
	} else
		sendResponse({}); // snub them.
	
	//~ /**
	 //~ * request.method = submit queue
	 //~ * doSubmit_eventPage__queue
	 //~ */
	//~ //doSubmit(form, location, callback_function, offsetTime, doServerSideSubmit)
	//~ if (request.method == "doSubmit_eventPage__queue" && request.key) {
		//~ if (doSubmit_eventPage__queue.key) {
			//~ sendResponse({}); // return blank
		//~ }
	//~ }
});



//Old Version
//Keep in case of legacy code?
//~ chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	//~ if (request.method == "getLocalStorage") {
		//~ sendResponse({data: localStorage[request.key]});
	//~ } else if (request.method == "saveLocalStorage" && request.key && request.data) {
		//~ localStorage[request.key] = request.data;
		//~ sendResponse();
	//~ } else if (request.method == "deleteLocalStorage" && request.key) {
		//~ localStorage.removeItem(request.key);
		//~ sendResponse({data: localStorage[request.key]});
	//~ } else
		//~ sendResponse({}); // snub them.
//~ });
