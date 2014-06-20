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
});

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
