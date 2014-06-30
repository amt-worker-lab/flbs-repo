
var showTabsQ = function() {

};

showTabsQ.array = [];

var delayTabSwitch = false;

function tabWindowPair(tabId, windowId) {
	console.log('FUNC.tabWindowPair');
	//~ console.log(this);
	//~ console.log('tabId:'+tabId);
	//~ console.log('windowId:'+windowId);
	//~ console.log('Window:'+windowId+';Tab:'+tabId);
	
	this.tabId = tabId;
	this.winId = windowId;
}

showTabsQ.isEmpty = function() {
	console.log('FUNC.isEmpty');
	
	for(var i = 0; i < showTabsQ.array.length; i++)
	{
		if(showTabsQ.array[i])
		{
			return false;
		}
	}
	
	console.log('showTabsQ.isEmpty()? Length='+showTabsQ.array.length); // CAME BACK "Lengh=238"
	return true;
}

showTabsQ.addTab = function(tabWindowPair) {
	console.log('FUNC.addTab');
	
	if(showTabsQ.array[tabWindowPair.winId])
	{
		showTabsQ.array[tabWindowPair.winId].push(tabWindowPair);
		
		//~ console.log('showTabsQ.array[tabWindowPair.winId].push ('+tabWindowPair.winId+')');
	}
	else
	{
		// Changed to .push here
		//
		showTabsQ.array[tabWindowPair.winId] = new Array();
		showTabsQ.array[tabWindowPair.winId].push(tabWindowPair);
		
		//~ showTabsQ.array[tabWindowPair.winId][0] = tabWindowPair;
		
		//~ console.log('showTabsQ.array[tabWindowPair.winId][0] ('+tabWindowPair.winId+') (NEW)');
		//~ console.log(showTabsQ.array);
	}
}




function showNextTab() {
	console.log('FUNC.showNextTab');
	//~ console.log(this);
	
	if(showTabsQ.isEmpty())
	{
		console.log('Commanded to switch: Empty Q');
		return;
	}
	
	//Get all of the active tabs
	// Added currentWindow:true
	chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
	//~ chrome.tabs.query({active: true}, function(tabs) {
		//Make sure that tabs is an array, even in the case if tabs is a single tab
		if(!tabs.length)
		{
			tabs = [tabs];
		}
		
		console.log('All Active Tabs:');
		//~ console.log(tabs);
		for(var i = 0; i < tabs.length; i++)
		{
			console.log('Window:'+tabs[i].windowId +';Tab:'+ tabs[i].id);
		}
		
		var tabsX;
		for(var i = 0; i < tabs.length; i++)
		{
			if(showTabsQ.array[tabs[i].windowId])				// array [windowId1, windowId2, ...N]
			//~ if(showTabsQ.array[tabs[i].windowId])				// array [windowId1, windowId2, ...N]
			{
				
				console.log('here 123 123');
				
				for(var j = 0; j < showTabsQ.array[tabs[i].windowId].length; j++)
				{
					if(showTabsQ.array[tabs[i].windowId][j] && showTabsQ.array[tabs[i].windowId][j].tabId == tabs[i].id)
					{
						console.log('Commanded to switch: Tab ' + tabs[i].id + ', but the tab is already in the Q');	
						//Since this is already in the Q, lets make sure we can remove it, and if necessary the windowId object as well
						showTabsQ.array[tabs[i].windowId][j] = null;
						try {
							for(var k = 0; k < showTabsQ.array[tabs[i].windowId].length; k++)
							{
								if(showTabsQ.array[tabs[i].windowId][k] != null)
								{
									allNull = false;
									break;
								}
							}
							if(allNull)
							{
								delete showTabsQ.array[tabs[i].windowId];
							}
						}
						catch(e) {
							console.log(e);
							console.log('Error removing current active tab from Q');
						}
						return;
					}
				}
				
				//~ console.log('CHECK isAQProduct---');
				//~ console.log(tabs[i]);
				//~ tabs[i].BLEHBLEH = '1111111111111';
				//~ console.log(tabs[i].BLEHBLEH);
				
				console.log('here 123 124');
				
				var currentIterator = i;
				
				//Still here? Check to see that the current tab isn't a Q Product, and if it is then 
				isAQProduct(tabs, currentIterator);
				
				//~ // BREAK HERE?
				//~ break;
			}
			else
			{
				console.log('Not switching tab: .ID->' +  tabs[i].id + ' b/c it has no window in the Q');
			}
		}
	});
}

function isAQProduct(tabs, iterator) {
	console.log('FUNC.isAQProduct');
	
	var tabs = tabs;
	var currentIterator = iterator;
	chrome.tabs.sendRequest(tabs[currentIterator].id, {isQProduct: true}, 
	function(rslt) {
		
		console.log('here 123 125');
		//~ console.log('Current Iterator: ' + i);
		//~ console.log('Window:'+tabs[i].windowId+';Tab:'+tabs[i].id);
		
		console.log(rslt); // CAME BACK "undefined"
		
		var gotResponse = true;
		try {
			gotResponse = rslt.isQProduct;
		}
		catch(e)
		{
			gotResponse = false;
		}
		
		console.log("got response: " + gotResponse);
		if(gotResponse && rslt && rslt.isQProduct)
		{
			console.log('Not Switching b/c this tab is a Q product');
			return;
		}
		else
		{
			var i = currentIterator;
			//~ console.log(showTabsQ.array[tabs[i].windowId]);
			//~ console.log('tabs[i]: ' + tabs[i]);
			//~ console.log('tabs[i].id: ' + tabs[i].id);
			//~ console.log('tabs[i].windowId: ' + tabs[i].windowId);
			
			for(var j = 0; j < showTabsQ.array[tabs[i].windowId].length; j++)
			{
				if(showTabsQ.array[tabs[i].windowId][j])
				{
					console.log('attempting switch to tab ' + tabs[i].id + ' of window ' + tabs[i].windowId);
					
											
					//Go ahead and switch
					try {
						
						//~ return;
						
						chrome.tabs.update(showTabsQ.array[tabs[i].windowId][j].tabId, {active: true});
						
						//Now that we switched here, remove this
						showTabsQ.array[tabs[i].windowId][j] = null;

						//Check to see if there are no more tabs to switch to in this window, and if so, delete the windowId entry
						var allNull = true;
						for(var k = 0; k < showTabsQ.array[tabs[i].windowId].length; k++)
						{
							if(showTabsQ.array[tabs[i].windowId][k] != null)
							{
								allNull = false;
								break;
							}
						}
						if(allNull)
						{
							delete showTabsQ.array[tabs[i].windowId];
						}
						break;
					}
					catch(e) {
						console.log(e);
						console.log('switch failed, cycling to a new tab to switch to');
					}
				}
			}
		}						
	});
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	/**
	 * request.addToTabsQ
	 */
	if(request.addToTabsQ)
	{
		var tabId  = sender.tab.id;
		var winId = sender.tab.windowId;
		var priority = request.priority;
		if(!priority)
		{
			priority = 5;
		}
		console.log('Recieved "AddTo" from tab: ' + tabId +' window:' + winId);
		//~ console.log('sender.tab:');
		//~ console.log(sender.tab);

		//Is the active tab in this window in preview Mode? If so switch, otherwise simply add to the Q.
		chrome.tabs.query({windowId: winId, active: true}, function(tabs) {
			if(!tabs.length)
			{
				tabs = [tabs];
			}
		
			console.log(tabs[0].id);
			if(tabs[0].id == tabId)
			{
				console.log('Not adding to Q since we are the active tab');
			}
			else
			{
				chrome.tabs.executeScript(tabId, {
									code: 
										"(function() {console.log('green light!');var link = document.createElement('link');link.type = 'image/x-icon';link.rel = 'icon';link.href='data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD9/f0F/Pz8DP///wD///8P////Dv///xL///8P////A////wD///8A/v7+Cf///wX///8A////APv7+wr9/f0D+/v7Dv///wb///81+vv8i/v7/Iv3+PqL4+nxi+ru9JHy9Piu5+zzru3w9ZD+/v5x/v7+H////wr///8A9/f3H/7+/g7///8J////HNDX5Pyaq8j/m6zJ/5esy/+QpcX/larK/5uwzv+MoMH/mqrG/5qlv+7Q0Nty/f3+Af///wD///8A/v7+A////wz+/v6b2d/q/4abvf+Emr7/jKHD/5Gnyf+Uqsz/fpW5/4mXuP/U1OL/e3ui+MPE0l7///8A////AP///wD///8P////Xa680/9/lrr/kafJ/5yy0/+WrM7/nbPT/52uyv+ktM7/1NTi/8LC1f+lpr3n////AP///wD///8A////AP7+/mDo7PL/ytPi/5yv0fehsuXuuMvl0Kq81drS2uf8+/z9bff3+SG5uM1r8vL1ff///wD///8A////AP///wr+/v4H/v7+jufq8umIg/Sut7L9YKul/W7PzvlMnZn03Ozq/x/+/v4H////AP///wD///8A////AP///wD///8A5OH/IpuS/pF3cfPploz/hH5y/6F/dP+gl47/gkw++e7Hwv9Fta//XPj4/gf///8A////AP///wD///8A+vn/BoyB/pGlnf5vfHfxy4mA/JlIOf/lmZD+f1lK/89kWPrPmZD+f9zY/yu3sP5ar6j/ZP///wD///8A6uj/GbSt/l6imv9yVkf/1HBm+MJ5eOrlhX/1s2JY+dRpYPfPv7/zb4+F/41WR//Uloz/hI6E/47///8A////AOro/xmnn/9teW3/qH5y/6HKxf9B9/n7Fc3N9VfMyvlQraj6cbWv/1zj4f4h2tf/Lks7/+NmWP+/0s7/OP///wCvqP9kjoT/jo6E/46Sif+I+vn/Bt3a/ypsX/+5////AH90/6Dj4f4h0Mz/OrWv/1yyq/9gkon/iNzY/yv///8A19P/MvLx/g////8A////APX0/wxvYv6119P/MtzY/ytmWP+/oZj/df///wBQQP/dt7D+Wv///wD///8A////AP///wD///8A////AKyk/2makf9+UUL/283J/z/l4/8f1dH/M////wD///8At7D+Wv39/gH///8A////AP///wD///8A////AP///wDa1/8u2tf/LtrX/y719P8M////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAOAfAADgBwAA4AMAAPABAADwHwAA8d8AAPAfAADonwAA8CEAAOf5AADGvQAA/bcAAP3/AAD//wAA//8AAA==';document.getElementsByTagName('head')[0].appendChild(link);})();"
									});
				chrome.tabs.sendRequest(tabs[0].id, {checkPreview: true}, 
					function(rslt) {
						if(rslt)
						{
							if(rslt.isPreview)
							{
								console.log('Current Tab is in Preview, Switching to tab: ' + tabId + ' window: ' + winId);
								//Go ahead and switch to this one
								chrome.tabs.update(tabId, {active: true});
							}
							else
							{
								console.log('Adding tab: ' + tabId + ' window: ' + winId); 
								showTabsQ.addTab(new tabWindowPair(tabId, winId));								
							}
						}
						else
						{
							console.log('Current Tab is Away from Mturk, Adding tab: ' + tabId + ' window: ' + winId);
							showTabsQ.addTab(new tabWindowPair(tabId, winId));							
						}
				});		
			}					
		});
	}	
	
	/**
	 * request.showNextTab
	 */
	if(request.showNextTab)
	{
		//~ console.log('showTabsQ:')
		//~ console.log(showTabsQ.array);
		//Remove the sender from the Q
		if(showTabsQ.array[sender.tab.windowId])
		{
			for(var i = 0; i < showTabsQ.array[sender.tab.windowId].length; i++)
			{
				//console.log('here');
				if(showTabsQ.array[sender.tab.windowId][i] && showTabsQ.array[sender.tab.windowId][i].tabId == sender.tab.id)
				{
					console.log('Remove from tabQ: ' + sender.tab.id);
					
					showTabsQ.array[sender.tab.windowId][i] = null;
				}
			}
		}
		
		
		showNextTab();
	}

	/**
	 * request.match
	 */
	if(request.match)
	{
		console.log("\n Inside match");
		var match = JSON.stringify(request.match);
		//~ console.log(match);
		//alert("recieved match");
		
		GM_xmlhttpRequest({
				method: "POST",
				url: //'http://192.168.1.9/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
				     'http://192.168.1.2/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
				data: "match=" + encodeURIComponent(match),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				
				onload: function(response) {
					var rs=response.responseText;
					console.log("result below");
					console.log(rs);
					console.log("here here");
					
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
	 * request.nextTab
	 */
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


