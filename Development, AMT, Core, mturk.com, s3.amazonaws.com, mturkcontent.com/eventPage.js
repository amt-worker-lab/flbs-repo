
//~ chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//~ 
//~ }



//eigjbaeirgbaeiurbg
// doSubmit var
// This will be the var for doSubmit
//doSubmit(form, location, callback_function, offsetTime, doServerSideSubmit)
//var doSubmit_eventPage__queue = {};// this is objects


var showTabsQ = [];
var delayTabSwitch = false;

showTabsQ.isEmpty = function() {
	console.log('Inside isEmpty');
	for(var i = 0; i < showTabsQ.length; i++)
	{

		if(showTabsQ[i] && showTabsQ[i].length > 0)
		{
			return false;
		}
	}
	return true;
}

//Adds the item
//If the item is already in the Q, then simply update's its relevance
showTabsQ.addTab = function(tabId, relevance) {
	//Test if it is already inside the Q
	console.log('showTabsQ: ');
	console.log(showTabsQ);
	for(var i = 0; i < showTabsQ.length; i++)
	{
		if(showTabsQ[i] && showTabsQ[i].length)
		{
			console.log('showTabsQ[i]: ');
			console.log(showTabsQ[i]);
			for(var j = 0; j < showTabsQ[i].length; j++)
			{
				if(showTabsQ[i][j] == tabId)
				{
					//We are the same, but do we have the same relevance?
					if(i != relevance)
					{
						showTabsQ[i].splice(j,1)
						showTabsQ[relevance].push(tabdId);
						return;
					}
					else
					{
						//nothing has changed so return
						return;
					}
				}
			}
		}
	}
	//Still here? Then the item is not in the Q
	if(!showTabsQ[relevance])
	{
		showTabsQ[relevance] = new Array();
	}
	showTabsQ[relevance].push(tabId);
}

showTabsQ.topPriority = function() {
	for(var i = 0; i < showTabsQ.length; i++)
	{
		if(showTabsQ[i] && showTabsQ[i].length)
		{
			console.log('Current Lowest Priority: '  + i);
			return i;
		}
	}
	//Still here? looks like there's nothing in the Q, return a priority of 999
	console.log('Nothing in the Q, lowest Priority: 999');
	return 999;
}



function showNextTab() {
	var allIds = [];
	
	if(showTabsQ.isEmpty())
	{
		console.log('Empty Q, nothing to switch to');
		return;
	}
	else
	{
		//http://stackoverflow.com/questions/5409242/chrome-extension-iterate-through-all-tabs
		//Get all of the tab id's
		chrome.tabs.query({}, function(tabs) {
				console.log('All tabs:');
				console.log(tabs);
				for(var i = 0; i < tabs.length; i++)
				{
					allIds.push(tabs[i].id);
				}
				console.log('All open tabs:');
				console.log(allIds);
				console.log('showTabsQ:')
				console.log(showTabsQ);
				//Now that we have all the id's let's try to go to the next tab
				
				for(var i = 0; i < showTabsQ.length; i++)
				{
					if(showTabsQ[i] && showTabsQ[i].length)
					{
						for(var j = 0; j < showTabsQ[i].length; j++)
						{
							//console.log('looping through showTabsQ')
							if(showTabsQ[i][j])
							{
								for(var k = 0; k < allIds.length; k++)
								{
									if(showTabsQ[i][j] == allIds[k])
									{
										//The tab Id exists, but is it in preview mode"?
										chrome.tabs.update(showTabsQ[i][j], {selected: true});
										console.log('Show next tab: switched to ' + showTabsQ[i][j]);
										showTabsQ[i].splice(j, 1);
										return;
									}
								}
							}
						}
					}
				}
				//Still here? Looks like all of the tabs that we tried to switch to were closed
				console.log('No Tabs from the Q Appear to be open')
				console.log('Removing all tabs');
				for(var i = 0; i < showTabsQ.length; i++)
				{
					//showTabsQ[i] = new Array();
				}
				return;
			});	
	}
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.addToTabsQ)
	{
		var tabId  = sender.tab.id;
		var priority = request.priority;
		if(!priority)
		{
			priority = 5;
		}
		console.log('Recieved "SwitchTo" from ' + tabId);
		


		//Send a message to the tab asking if it is in preview mode
		chrome.tabs.getSelected(null, function(tab) {
			
			//Is the current tab away from the job? 
			console.log(tab);
			var currentUrl = tab.url;
			console.log(currentUrl);
			if(
				!/^https?:\/\/(www\.|)mturk\.com\/mturk\/(preview|previewandaccept|continue|accept|submit|return)/i.exec(currentUrl)
			  )
			 {
				 console.log('Added to Q, but we are off the site, so not switching the tab');
				 showTabsQ.addTab(tabId, priority);
			 }
			else
			{
				//Ask the current tab if it is in preview mode
				chrome.tabs.sendRequest(tab.id, {checkPreview: true}, function (response) {	
					if(!response.isPreview)
					{
						if(tab.id == tabId)
						{
							console.log('Doing nothing b/c a) already on current tab, and b) current tab is NOT in preview mode.');
						}
						else
						{
							console.log('Added to Q, but not switching because current tab is NOT in preview mode');
							showTabsQ.addTab(tabId, priority);
						}
					}
					else
					{
						//Did a recent tab already get switched to?
						if(delayTabSwitch)
						{
							console.log('Added to Q, not switching b/c a tab recently has switched');
							showTabsQ.addTab(tabId, priority);
						}
						else
						{
							//is there already a q?
							if(!showTabsQ.isEmpty())
							{
								//Lowest priority goes first
								
								//Am I not the lowest priority in the q?
								if(showTabsQ.topPriority() < priority)
								{
									console.log('Added to Q, not switching because not the lowest priority');
									showTabsQ.addTab(tabId, priority);
								}
								else
								{
									console.log('Added to Q, switching b/c the current tab is in preview, and b/c Im lowest priority');
									//I'm the lowest priority
									//switch to me, and delay the next switch by 2 seconds
									chrome.tabs.update(tabId, {selected: true});
									delayTabSwitch = true;
									window.setTimeout(function() {
										delayTabSwitch = false;
									},2000);
								}
							}
							else
							{
								//There is no q, so switch to me
								delayTabSwitch = true;
								console.log('Added to Q, switching b/c the current tab is in preview and b/c the tab Q has nothing else');
								chrome.tabs.update(tabId, {selected: true});
								window.setTimeout(function() {
									delayTabSwitch = false;
								}, 2000);
							}
						}
					}
				});
			}
		});
	}
	
	//the q is a priority q, i.e. an array of array's of q's, anything that's added to the q with priority 'x' gets added to q[x]
	//default prioty (if unspecified) is 5
	//this means when something say's add me to q, q says 'okay what's the priority?' if no priority, set it to 5
	//next the q says does q[x] exist? if so add it. if not, q[x] = new Array(), and then add it
	
	
	if(request.showNextTab)
	{
		//shows the next tab IFF the selected tab is on Amazon's site, and is in preview mode
		showNextTab();
	}
	

	if(request.match)
	{
		console.log("\n Inside match");
		var match = JSON.stringify(request.match);
		console.log(match);
		//alert("recieved match");
		
		GM_xmlhttpRequest({
				method: "POST",
				url: //'http://192.168.1.9/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
				     'http://192.168.1.6/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
				data: "match=" + encodeURIComponent(match),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				
				onload: function(response) {
					var rs=response.responseText;
					//console.log("result below");
					//console.log(rs);
					//console.log("here here");
					
					//kick it back via localStorage, sending a message to global, or sending a response to global?
					//Let's try it as a response
					//sendResponse(rs);
				}
			});	
	}
	//Add to EventPage
	function AMT___play_single_sound(fileName) {
		var sound =  new Audio(fileName);//document.createElement('audio');
		//sound.setAttribute("src", fileName);
		sound.play();
		console.log("got here");
	};
	
	
	if(request.method == "play_single_sound")
	{
		AMT___play_single_sound(request.fileName);
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


	

function GM_xmlhttpRequest(details) {
	function setupEvent(xhr, url, eventName, callback) {
		xhr[eventName] = function () {
		  var isComplete = xhr.readyState == 4;
		  var responseState = {
			responseText: xhr.responseText,
			readyState: xhr.readyState,
			responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
			status: isComplete ? xhr.status : 0,
			statusText: isComplete ? xhr.statusText : "",
			finalUrl: isComplete ? url : ""
		  };
		  callback(responseState);
		};
	}

	var xhr = new XMLHttpRequest();
	var eventNames = ["onload", "onerror", "onreadystatechange"];
	for (var i = 0; i < eventNames.length; i++ ) {
		var eventName = eventNames[i];
		if (eventName in details) {
		  setupEvent(xhr, details.url, eventName, details[eventName]);
		}
	}
	xhr.timeout = details.timeout;
	xhr.ontimeout = function () {
		console.log('timeout');
	}
	xhr.open(details.method, details.url);

	if (details.overrideMimeType) {
		xhr.overrideMimeType(details.overrideMimeType);
	}
	if (details.headers) {
		for (var header in details.headers) {
		  xhr.setRequestHeader(header, details.headers[header]);
		}
	}
	xhr.send(details.data ? details.data : null);
}



/*
 * 
 * 
 * 
 *
 * OLD METHOD (WITHOUT INCOGNITO)
 * 
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage") {
		sendResponse({data: localStorage[request.key]});
	} else if (request.method == "saveLocalStorage" && request.key && request.data) {
		localStorage[request.key] = request.data;
		sendResponse();
	} else if (request.method == "deleteLocalStorage" && request.key) {
		localStorage.removeItem(request.key);
		sendResponse({data: localStorage[request.key]});
	} else
		sendResponse({}); // snub them.
});*/

/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    if (typeof request.value != 'undefined') {
      localStorage[request.storage] = request.value;
    }
    sendResponse({storage: localStorage[request.storage]});
  } else {
    sendResponse({});
  }
});*/
/*chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  
  port.onMessage.addListener(function(msg) {
    
    //port.postMessage({storage: localStorage['test_']});
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});
*/
