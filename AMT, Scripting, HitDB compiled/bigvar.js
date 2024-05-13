var BIGVAR = false;

/**
 * IMPORT BIGVAR
 * UNCOMMENT here if import
 * Example below is loaded from text file http://192.168.1.2/mturk/.scripts/AMT_Alerts/logs/Emily,import HitDB.txt
 */
if (1==0) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://192.168.1.2/mturk/.scripts/AMT_Alerts/logs/Ben,Mon, 09 Jun 2014 18:23:01 -0400.txt',
		//~ url: 'http://192.168.1.2/mturk/.scripts/AMT_Alerts/logs/Sora,Wed, 06 Aug 2014 22:33:15 -0400.txt',
		//~ url: 'http://192.168.1.2/mturk/.scripts/AMT_Alerts/logs/Emily,import HitDB.txt',
		onload: function (response) {
			BIGVAR = response.responseText;
			alert('BIGVAR length: ' + BIGVAR.length);
		}
	});
}


/**
 * function GM_xmlhttpRequest
 * 
 */
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
	var eventNames = ["onload", "onerror", "onreadystatechange", "ontimeout"];
	for (var i = 0; i < eventNames.length; i++ ) {
		var eventName = eventNames[i];
		if (eventName in details) {
		  setupEvent(xhr, details.url, eventName, details[eventName]);
		}
	}
	
	xhr.timeout = details.timeout;
	//~ xhr.ontimeout = function () { // OVERWRITES THE ONTIMEOUT FUNCTION ALREADY SET
		//~ console.log('timeout');
	//~ }
	
	if(!details.hasOwnProperty('asynchronous')) {
		details.asynchronous = true;
	}else
		console.log('asynch false');
	
	xhr.open(details.method, details.url, details.asynchronous);
	//~ xhr.open(details.method, details.url);

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
