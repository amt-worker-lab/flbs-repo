/**
 * 
 * GLOBAL VARIABLES
 * 
 */

//
var MT__ = '';

//
var MT___host = 'http://192.168.1.6';

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


// CHROME //
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}
	/** background page **/
	/*var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({joke: "Knock knock"});
	port.onMessage.addListener(function(msg) {
	  if (msg.question == "Who's there?")
		port.postMessage({answer: "Madame"});
	  else if (msg.question == "Madame who?")
		port.postMessage({answer: "Madame... Bovary"});
		//console.log(msg);
	});
	this.GM_getValue=function (key) {
		//port.postMessage({joke: "Knock knock"});
	}*/
	//	console.log(chrome.extension.sendRequest({storage: 'test_'}));
		//return chrome.extension.sendRequest({storage: key}, null);
		//var yy;
		//return chrome.extension.sendRequest({storage: key}, function(response) {
		//	console.log('foo => ' + response.storage);
		//	//return response.storage;
		//	yy = response.storage;
		//});
		//console.log(yy);
    //};
	/*this.prototype.GM_getValue = chrome.extension.sendRequest({storage: key}, function(response) {
		console.log('foo => ' + response.storage);
		return response.storage;
		//yy = response.storage;
	});*/
	//this.GM_persistent=function (key,value) {
	//	chrome.extension.sendRequest({storage: key, value: 'barX'});
    //};
}

function GM_addStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

/**
 * 
 * 
 * Function doSubmit() 
 * 
 * 
**/
// submit vars
var MT__DOSUBMIT__BY_ID_THIS_ID;
//
var MT__DOSUBMIT__INTERVAL;
//
var MT__DOSUBMIT__INTV_INTERVAL;
//
var MT__DOSUBMIT__FORM;
//
var MT__DOSUBMIT__LOCATION;
//
var MT__DOSUBMIT__CALLBACK_FUNCTION;
//
var MT__DOSUBMIT__TIME_TO_SUBMIT;

// give this a submit ID
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var xid = '_';
var i;
for (i = 0; i <= 4; i++) {
	xid += chars[Math.floor(Math.random()*chars.length)];
}
MT__DOSUBMIT__BY_ID_THIS_ID = xid;
/**
 * doSubmit
 */
function doSubmit(form, location, callback_function, offsetTime) {
	// form to submit, or window.location, or add to queue (with noSubmit)
	// & return time_to_submit, offsetTime(x) > regularInterval+x
	
	if (!form)
		MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	else if (document.getElementById(form))
		MT__DOSUBMIT__FORM = document.getElementById(form);
	else if (document.getElementsByName(form)[0])
		MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	//else if (form)
	//	MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
		
	var d = new Date();
	
	if (MT___TEST_DEBUG) {
		MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	}
	
	//var xid = MT__DOSUBMIT__BY_ID_THIS_ID;
	
	MT__DOSUBMIT__LOCATION = location;
	MT__DOSUBMIT__CALLBACK_FUNCTION = callback_function;
	
	// exit if old!!
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION != 'function') {
			alert('noSubmit(return time_to_submit) is now callback_function(time_to_submit)');
			return;
		}
	}
	
	//if (!callback_function) {
	//	var callback_function = false;
	//}
	
	chrome.extension.sendRequest({method: "getLocalStorage", key: "MT__DOSUBMIT__ALL_JOBS_CHR"}, function(response) {
		//console.log(response.data);
		
		var all = response.data;
		
		MT__DOSUBMIT__TIME_TO_SUBMIT = 0;
		
		var d = new Date();
		
		if (!all) {
			// add this
			all = [{'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : d.getTime()}];
			
			//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
		}
		else {
			
			all = JSON.parse(all);
			
			var i;
			
			// remove err
			for (i = all.length-1; i >= 0; i--) {
				if  (
					!all[i].time_to_submit ||
					all[i].time_to_submit == null ||
					all[i].time_to_submit == NaN ||
					all[i].time_to_submit == undefined
					)
				{
					all.splice(i, 1); // index, howmany
				}
			}
			
			//Xremove old
			// X >> if time to submit > # of submits * 2.25
			
			var changed = false;
			
			var last = false;
			
			var addThis = true;
			
			var x;
			
			var submitTime = 2250 + ((offsetTime) ? offsetTime : 0);
			
			/**
			 * Remove previous submits matching this ID
			 * 
			 */
			//XX Aug. 3, 2013
			//XX Always assume that this will be added. Not assuming this is
			//XX useful when a submit has been cancelled (escape key), although
			//XX the submit may still be in the submit object (waiting to submit).
			//XX To use this, jobs must be removed from the submit object upon submission.
			//XX Otherwise, they would return here in, say, 800 ms, before the
			//XX removal time of, say, 2100 ms, and would be able to submit without
			//XX being added to the submit object.
			//XX >>This is only assuming, however, that the submit ID is the same, which
			//XX only OUGHT to occur during debug.
			//XX 
			//XX
			for (i = all.length-1; i >= 0; i--) { // is this already added?
				if (all[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
					all.splice(i, 1); // Aug. 5 // Remove previous
				}
			}
			//XX
			//XX
			
			/**
			 * Find time to submit and remove older than 2100
			 * 
			 */
			for (i = all.length-1; i >= 0; i--) {
				//console.log(all[i].time_to_sumbit);
				/*if (!all[i]) continue;
				if (!all[i].time_to_submit || all[i].time_to_submit == null || all[i].time_to_submit == NaN ||
					all[i].time_to_submit == undefined
				   ) {
				//	all.splice(i, 1); // index, howmany
					continue;
				}*/
				
				x = all[i].time_to_submit; // A TIME IN THE FUTURE
				
				x*= 1;
				
				if (x < d.getTime() - submitTime) {
					all.splice(i, 1);
				}
				else if (x + submitTime < d.getTime()) {
					all.splice(i, 1); // index, howmany
				}
				else if (!last) { // 
					last = true;
					MT__DOSUBMIT__TIME_TO_SUBMIT = x + submitTime;
				}
				
			}
			
			if (MT__DOSUBMIT__TIME_TO_SUBMIT == 0) {
				MT__DOSUBMIT__TIME_TO_SUBMIT = d.getTime();
			}
			
			// add this
			if (addThis) {
				// push time()
				all.push({'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : MT__DOSUBMIT__TIME_TO_SUBMIT}); // add this
			}
			
			// change to seconds until submit
			MT__DOSUBMIT__TIME_TO_SUBMIT = MT__DOSUBMIT__TIME_TO_SUBMIT - d.getTime(); // 20s in future, - now = 20s
			
			//XXupdate local storage
			//XXGM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
		}
		
		//
		console.log('submit queue:'		+all.length);
		console.log('time_to_submit:'	+MT__DOSUBMIT__TIME_TO_SUBMIT);
		console.log('ID:'				+MT__DOSUBMIT__BY_ID_THIS_ID);
		console.log(all);
		
		// update!
		// & submit
		chrome.extension.sendRequest(
			{
				method: "saveLocalStorage",
				key: "MT__DOSUBMIT__ALL_JOBS_CHR",
				data: JSON.stringify(all)
			},
			doSubmit_2
		);
	});
}
function doSubmit_2() {
		
	//console.log(MT__DOSUBMIT__CALLBACK_FUNCTION);
	//EXIT if necessary
	//try {
		if (MT__DOSUBMIT__CALLBACK_FUNCTION) {//console.log('X');
			if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION == 'function') {
				MT__DOSUBMIT__CALLBACK_FUNCTION(
					MT__DOSUBMIT__TIME_TO_SUBMIT
				);
				return;
			}
		}
	//} catch (e) {
		
	//}
	
	// set a timeout to submit this job
	// if negative then submits immediately
	setTimeout(function() {
		
		// remove from submit
		/*var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
		if (all) {
			
			// !! if time_to_submit > 0 !!
			// ?? Sept. 19, 2013
			if (time_to_submit != 0) {
				// remove
				all = JSON.parse(all);
				var i;
				var changed = false;
				for (i = all.length-1; i >= 0; i--) {
					if (all[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
						all.splice(i, 1); // index, howmany
						changed = true;
						//break;
					}
				}
				if (changed)
					GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
			}
		}*/
		
		//
		// debug return here
		//
		if (MT___TEST_DEBUG) {
			// add time of job submit
			var d = new Date();
			GM_setValue(
				'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
				GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" +
				(d.getTime() / 1000) + ' ' +
				MT__DOSUBMIT__BY_ID_THIS_ID
			);
			MT___TEST_DEBUG_finish_time = d.getTime() / 1000;
			console.log('time to complete:'+Math.round(MT___TEST_DEBUG_finish_time - MT___TEST_DEBUG_start_time));
			
			if (document.getElementById('MT___TEST_DEBUG') != null) {
				var dx = document.getElementById('MT___TEST_DEBUG');
				dx.value = GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS');
			}
			setTimeout(function() {doSubmit();}, 800);
			return;
		}
		//
		// save job submissions here
		//
		/*
		var d = new Date();
		GM_setValue(
			'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
			GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" + (d.getTime() / 1000) + ' ' + MT__DOSUBMIT__BY_ID_THIS_ID
		);
		console.log(GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS'));*/
		//console.log(MT__DOSUBMIT__FORM);
		//console.log(MT__DOSUBMIT__LOCATION);
		
		if (!MT__DOSUBMIT__LOCATION)
			MT__DOSUBMIT__FORM.submit();
		else if (MT__DOSUBMIT__LOCATION)
			window.location = MT__DOSUBMIT__LOCATION;
			
		/*if (noSubmit)
			return;
		else if (!location)
			MT__DOSUBMIT__FORM.submit();
		else if (location)
			window.location = location;*/
		
	}, MT__DOSUBMIT__TIME_TO_SUBMIT);
}
function doSubmit_3() {
	//
}
// doSubmit debug
var MT___TEST_DEBUG = false;
if (MT___TEST_DEBUG) {
	
	var MT___TEST_DEBUG_clearInt = false;
	var MT___TEST_DEBUG_start_time;
	var MT___TEST_DEBUG_finish_time;
	
	
	var d = document.createElement('textarea');
	d.setAttribute('id', 'MT___TEST_DEBUG');
	d.setAttribute('style', 'position:absolute;top:0;left:0;width:200px;height:800px;');
	document.body.appendChild(d);
	
	d = document.getElementById('MT___TEST_DEBUG');
	d.onclick = function() {
		MT___TEST_DEBUG_clearInt = true;
	}
	
	// cookie vars
	GM_setValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS', '_');
	//GM_setValue('MT__DOSUBMIT__ALL_JOBS', '');

	setTimeout(function() {doSubmit();}, 2000);
}
//function doSubmit(form, location, noSubmit, offsetTime) {
	//// form to submit, or window.location, or add to queue (with noSubmit)
	//// & return time_to_submit, offsetTime(x) > regularInterval+x
	
	//if (!form)
		//MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	//else if (document.getElementById(form))
		//MT__DOSUBMIT__FORM = document.getElementById(form);
	//else if (document.getElementsByName(form)[0])
		//MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	
	//var d = new Date();
	
	//if (MT___TEST_DEBUG) {
		//MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	//}
	
	//var xid = MT__DOSUBMIT__BY_ID_THIS_ID;
	
	//var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
	
	//var time_to_submit = 0;
	
	//if (!all) {
		//// add this
		//all = [{'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : d.getTime()}];
		//// update
		//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
	//}
	//else {
		
		//all = JSON.parse(all);
		
		//var i;
		
		//// remove err
		//for (i = all.length-1; i >= 0; i--) {
			//if  (
				// !all[i].time_to_submit ||
				//all[i].time_to_submit == null ||
				//all[i].time_to_submit == NaN ||
			    //all[i].time_to_submit == undefined
			    //)
			//{
				//all.splice(i, 1); // index, howmany
			//}
		//}
		
		//// remove old
		
		//var changed = false;
		
		//var last = false;
		
		//var addThis = true;
		
		//var x;
		
		//var submitTime = 2250 + ((offsetTime) ? offsetTime : 0);
		
		// /**
		 //* Remove previous submits matching this ID
		 //* 
		 //*/
		////XX Aug. 3, 2013
		////XX Always assume that this will be added. Not assuming this is
		////XX useful when a submit has been cancelled (escape key), although
		////XX the submit may still be in the submit object (waiting to submit).
		////XX To use this, jobs must be removed from the submit object upon submission.
		////XX Otherwise, they would return here in, say, 800 ms, before the
		////XX removal time of, say, 2100 ms, and would be able to submit without
		////XX being added to the submit object.
		////XX >>This is only assuming, however, that the submit ID is the same, which
		////XX only OUGHT to occur during debug.
		////XX 
		////XX
		//for (i = all.length-1; i >= 0; i--) { // is this already added?
			//if (all[i].id == xid) {
				//all.splice(i, 1); // Aug. 5 // Remove previous
				////addThis = false;
				////break;
			//}
		//}
		////XX
		////XX
		
		// /**
		 //* Find time to submit and remove older than 2100
		 //* 
		 //*/
		//for (i = all.length-1; i >= 0; i--) {
			////console.log(all[i].time_to_sumbit);
			// /*if (!all[i]) continue;
			//if (!all[i].time_to_submit || all[i].time_to_submit == null || all[i].time_to_submit == NaN ||
				//all[i].time_to_submit == undefined
			   //) {
			////	all.splice(i, 1); // index, howmany
				//continue;
			//}*/
			
			//x = all[i].time_to_submit;
			//x*= 1;
			
			//if (x < d.getTime() - submitTime) {
				//all.splice(i, 1);
			//}
			//else if (x + submitTime < d.getTime()) {
				//all.splice(i, 1); // index, howmany
			//}
			//else if (!last) { // 
				//last = true;
				//time_to_submit = x + submitTime;
			//}
			
		//}
		
		//if (time_to_submit == 0) {
			//time_to_submit = d.getTime();
		//}
		
		//// add this
		//if (addThis) {
			//// push time()
			//all.push({'id' : xid, 'time_to_submit' : time_to_submit}); // add this
		//}
		
		//// change to seconds until submit
		//time_to_submit = time_to_submit - d.getTime(); // 20s in future, - now = 20s
		
		//// update local storage
		//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
		
		////
		//console.log('submit queue:'+all.length);//return;
		////
			
	//}
	////
	//console.log('time_to_submit:'+time_to_submit);
	//console.log('ID:'+xid);
	////
	//if (noSubmit) {
		//return time_to_submit;
	//}
	
	//// set a timeout to submit this job
	//// if negative then submits immediately
	//setTimeout(function() {
		
		//// remove from submit
		//var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
		//if (all) {
			
			//// Check heartbeat. Is this job ID in list of
			//// jobs waiting to submit? If not, for any reason,
			//// then add it back.
			
			//// !! if time_to_submit > 0 !!
			//// ?? Sept. 19, 2013
			//if (time_to_submit != 0) {
				//// remove
				//all = JSON.parse(all);
				//var i;
				//var changed = false;
				//for (i = all.length-1; i >= 0; i--) {
					//if (all[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
						//all.splice(i, 1); // index, howmany
						//changed = true;
						////break;
					//}
				//}
				//if (changed)
					//GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
			//}
		//}
		
		////
		//// debug return here
		////
		// /*if (MT___TEST_DEBUG) {
			//// add time of job submit
			
			//var d = new Date();
			//GM_setValue(
				//'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
				//GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" + (d.getTime() / 1000) + ' ' + MT__DOSUBMIT__BY_ID_THIS_ID
			//);
			
			//MT___TEST_DEBUG_finish_time = d.getTime() / 1000;
			
			//console.log('time to complete:'+Math.round(MT___TEST_DEBUG_finish_time - MT___TEST_DEBUG_start_time));
			
			//if (document.getElementById('MT___TEST_DEBUG') != null) {
				//var dx = document.getElementById('MT___TEST_DEBUG');
				//dx.value = GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS');
			//}
			
			//setTimeout(function() {doSubmit();}, 800);
			
			//return;
		//}*/
		////
		//// save job submissions
		// /*
		//var d = new Date();
		//GM_setValue(
			//'MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS',
			//GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS') + "\n" + (d.getTime() / 1000) + ' ' + MT__DOSUBMIT__BY_ID_THIS_ID
		//);
		//console.log(GM_getValue('MT__DOSUBMIT__DEBUG_JOB_SUMBISSIONS'));*/
		
		//if (!location)
			//MT__DOSUBMIT__FORM.submit();
		//else if (location)
			//window.location = location;
		// /*if (noSubmit)
			//return;
		//else if (!location)
			//MT__DOSUBMIT__FORM.submit();
		//else if (location)
			//window.location = location;*/
		
	//}, time_to_submit);
//}
/*
 * MT___diffString, diff strings
 * 
 */
function MT___escape(s) {
	var n = s;
	n = n.replace(/&/g, "&amp;");
	n = n.replace(/</g, "&lt;");
	n = n.replace(/>/g, "&gt;");
	n = n.replace(/"/g, "&quot;");
	return n;
}
function MT___diffString( o, n ) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = MT___diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
  var str = "";

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
	oSpace = ["\n"];
  } else {
	oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
	nSpace = ["\n"];
  } else {
	nSpace.push("\n");
  }

  if (out.n.length == 0) {
	  for (var i = 0; i < out.o.length; i++) {
		str += '<del>' + MT___escape(out.o[i]) + oSpace[i] + "</del>";
	  }
  } else {
	if (out.n[0].text == null) {
	  for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
		str += '<del>' + MT___escape(out.o[n]) + oSpace[n] + "</del>";
	  }
	}

	for ( var i = 0; i < out.n.length; i++ ) {
	  if (out.n[i].text == null) {
		str += '<ins>' + MT___escape(out.n[i]) + nSpace[i] + "</ins>";
	  } else {
		var pre = "";

		for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
		  pre += '<del>' + MT___escape(out.o[n]) + oSpace[n] + "</del>";
		}
		str += " " + out.n[i].text + nSpace[i] + pre;
	  }
	}
  }
  return str;
}
function randomColor() {
	return "rgb(" + (Math.random() * 100) + "%, " + 
					(Math.random() * 100) + "%, " + 
					(Math.random() * 100) + "%)";
}
function MT___diffString2( o, n ) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = MT___diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
	oSpace = ["\n"];
  } else {
	oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
	nSpace = ["\n"];
  } else {
	nSpace.push("\n");
  }

  var os = "";
  var colors = new Array();
  for (var i = 0; i < out.o.length; i++) {
	  colors[i] = randomColor();

	  if (out.o[i].text != null) {
		  os += '<span style="background-color: ' +colors[i]+ '">' + 
				MT___escape(out.o[i].text) + oSpace[i] + "</span>";
	  } else {
		  os += "<del>" + MT___escape(out.o[i]) + oSpace[i] + "</del>";
	  }
  }

  var ns = "";
  for (var i = 0; i < out.n.length; i++) {
	  if (out.n[i].text != null) {
		  ns += '<span style="background-color: ' +colors[out.n[i].row]+ '">' + 
				MT___escape(out.n[i].text) + nSpace[i] + "</span>";
	  } else {
		  ns += "<ins>" + MT___escape(out.n[i]) + nSpace[i] + "</ins>";
	  }
  }
  return { o : os , n : ns };
}
function MT___diff( o, n ) {
  var ns = new Object();
  var os = new Object();
  
  for ( var i = 0; i < n.length; i++ ) {
	if ( ns[ n[i] ] == null )
	  ns[ n[i] ] = { rows: new Array(), o: null };
	ns[ n[i] ].rows.push( i );
  }
  
  for ( var i = 0; i < o.length; i++ ) {
	if ( os[ o[i] ] == null )
	  os[ o[i] ] = { rows: new Array(), n: null };
	os[ o[i] ].rows.push( i );
  }
  
  for ( var i in ns ) {
	if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
	  n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
	  o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
	}
  }
  
  for ( var i = 0; i < n.length - 1; i++ ) {
	if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
		 n[i+1] == o[ n[i].row + 1 ] ) {
	  n[i+1] = { text: n[i+1], row: n[i].row + 1 };
	  o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
	}
  }
  
  for ( var i = n.length - 1; i > 0; i-- ) {
	if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
		 n[i-1] == o[ n[i].row - 1 ] ) {
	  n[i-1] = { text: n[i-1], row: n[i].row - 1 };
	  o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
	}
  }
  return { o: o, n: n };
}
/*
 * 
 */
levensht = function(a, b) {
	var cost;
	
	// get values
	var a = a;
	var m = a.length;
	
	var b = b;
	var n = b.length;
	
	// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
	if (m < n) {
		var c=a;a=b;b=c;
		var o=m;m=n;n=o;
	}
	
	var r = new Array();
	r[0] = new Array();
	for (var c = 0; c < n+1; c++) {
		r[0][c] = c;
	}
	
	for (var i = 1; i < m+1; i++) {
		r[i] = new Array();
		r[i][0] = i;
		for (var j = 1; j < n+1; j++) {
			cost = (a.charAt(i-1) == b.charAt(j-1))? 0: 1;
			r[i][j] = minimator(r[i-1][j]+1,r[i][j-1]+1,r[i-1][j-1]+cost);
		}
	}
	
	return r[m][n];
}

// return the smallest of the three values passed in
minimator = function(x,y,z) {
	if (x < y && x < z) return x;
	if (y < x && y < z) return y;
	return z;
}

/* OLD FRONT PAGE ITERATION
 * 
*/ 
/*function getp(p)
{	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.mturk.com/mturk/viewhits?searchWords=&selectedSearchType=hitgroups&sortType=NumHITs%3A1&pageNumber='+p+'&searchSpec=HITGroupSearch%23T%231%2310%23-1%23T%23%21%23%21NumHITs%211%21%23%21',
		onload: function (responseDetails) {
			
			var rs=responseDetails.responseText;
			
			var div=document.getElementById('div__'+p);
			div.innerHTML=rs;
					
				
			var y=div.getElementsByTagName('table');
			div.innerHTML='<table>'+y[6].innerHTML+'</table>';
			
			var x=div.getElementsByClassName('capsuletarget');
			for (var i in x)
			{
				if (x[i].style)
					x[i].style.display='none';
			}
			
			var d;
			var y=document.getElementsByTagName('a');
			for (var i in y)
			{
				
			}
			
		}
	});
}*/


/*
 * old whois
 */
function mturk_whois(t, input_submit, output_div, submit_form, callbackFunction) {
		
	if (!output_div) // // // //
		output_div = d1_whois;
	//if (!submit_form)
	//	submit_form = true;
		
	if (!document.getElementById('x____')) {
		var p = document.createElement('p');
		p.setAttribute('id','x____');
		output_div.appendChild(p)
		p = document.getElementById('x____');
		//p.innerHTML = '';
	}
	
	var w = t;
	
	if (w != '' && w != 'UNKNOWN_SUBSTITUTION_VARIABLE') {
		//var w = website;
		
		if (w.indexOf(' ') != -1) {
			w = w.split(' ');
			w[0] = w[0].replace(/^(https?:\/\/www\.|www\.|https?:\/\/)/, '');
			w[1] = w[1].replace(/^(https?:\/\/www\.|www\.|https?:\/\/)/, '');
			w[0] = w[0].replace(/[\/?][\d\D]+/, '');
			w[1] = w[1].replace(/[\/?][\d\D]+/, '');
		} else {
			w = [w];
			w[0] = w[0].replace(/^(https?:\/\/www\.|www\.|https?:\/\/)/, '');
			w[0] = w[0].replace(/[\/?][\d\D]+/, '');
		}
		console.log(w);
		
		var xint_whois1 = setInterval(function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: 'http://localhost/mturk-gerry_gorman.php?u=&a=md2&whois='+encodeURIComponent(w[0]),
				//timeout: 40,
				onload: function(response) {
					var rs=response.responseText;
					
					var d = document.getElementById('x____');
					
					if (rs.trim() == '') return;
					else if (
						rs.indexOf (
							'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "DTD/xhtml1-transitional.dtd">'
						) != -1
					) return; // closing browser response
					else {
						clearInterval(xint_whois1);
					}
					
					//console.log(rs);
					
					if (rs.indexOf('No match for domain') != -1) {
						d.innerHTML += '<p>No match for domain</p>';
						return;
					}
					//rs = rs.split('Registrant:');
					//rs = rs.splice(1);
					//rs = rs.join('Registrant:');
					
					var r2,x,out='';
					r2 = /([a-z0-9]+([_\.-][a-z0-9]+)*(@|[ ]{0,}\[at\][ ]{0,}|&#064;)([a-z0-9]+([\.-][a-z0-9]+)*)+\.[a-z]{2,})/gi;
					while (x = r2.exec(rs)) {
						out += '<input type="button" value="'+x[0]+'" class="ex__whois" ><br >';
					}
					if (out != '')
						d.innerHTML += out;
						//d1c.innerHTML += '<p>'+out+'</p>';
					rs = rs.replace(r2, '<input type="button" value="$1" class="ex__whois" >');
					rs = rs.replace(/[\r\n]+/g, '<br >');
					
					//rs = rs.replace(/[<>&]/g, '');
					//rs = rs.substr(0,4000);
					
					output_div.innerHTML += '<p>'+rs+'</p>';//
					
					/*x = document.getElementsByClassName('ex__whois');
					for (var i in x) {
						x[i].onclick = function() {
							var y = this.value;
							if (y.indexOf('@') != -1 && y.length >= 8) {
								input_submit.value = y;
								if (submit_form)
									doSubmit();
							}
						}
					}*/
					
					// update button clicks
					DaveSchilling_whois_action();
				}
			});
		}, 2000);
	}
}
/**
 * Function MT___page1_show_jobs_play_audio
 */
function MT___page1_show_jobs_play_audio() {
	if (document.getElementById('MT___page1_show_jobs_play_audio'))
		document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
	if (document.getElementById('MT___page1_show_jobs_play_audio'))
		document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
	
	//MT___AUDIO_SNIPPET
	//b64_audio =
							
	// play alert
	//i.e. <audio controls src = "data:audio/mp3;base64,T2dn....3KcK" />
	var c = document.createElement('audio');
	c.setAttribute('style','position:fixed;top:30px;left:0px;width:80px;text-align:center;z-index:1010;background-color:MistyRose;border:2px solid LightCoral;');
	c.setAttribute('id','MT___page1_show_jobs_play_audio');
	c.setAttribute('controls','');
	c.setAttribute('src',MT___AUDIO_SNIPPET);
	document.body.appendChild(c);
	c = document.getElementById('MT___page1_show_jobs_play_audio');
	c.play();
	// remove after 10 seconds
	setTimeout(function() {
		document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
	}, 20000);
}
/**
 * Page 1 mturk.com MT___page1_show_jobs
 */
function MT___page1_show_jobs() {
	var s = location.href;
	var u = /https:\/\/www.mturk.com\/mturk\/findhits\?match=false/;
	if (!u.exec(s)) return;
	
	var ignore_requesters = [
		'CrowdFlower',
		'CrowdSource',
		'Classify AdImages',
		'ClariTrans',
		'RelevanceQuest',
		'AMTSpeech',
		'Amazon Requester Inc. (Product Ads)',
		'Amazon Requester Inc.',
		'Chris Callison-Burch',
		'User453',
		'ProductRnR',
		'WSOVC COM',
		'rohzit0d',
		'Cardcow',
		'Redwood',
		'Craft Listings',
		'Stanford Language and Cognition Lab',
		'Brandeis NLP',
		'Streema',
		'Fluffy Cloud',
		'Intelius Data Systems',
		'Johnny Wong',
		'Oscar Smith',
		'Sara Rosenthal',
		'Comdata IT Fuel Tax',
		'Venue Quality',
		'Product Listings',
		'Amazon Requester Inc - browse classification',
		'Classify This',
		'Tagasauris',
		'chinese.mturk',
		'Quality Website Reviews',
		'Phillip Atiba Goff',
		'Catalog Choice',
		'WMT Admin',
		'Sebastian Darr',
		'Coder of Web Apps',
		'Smartsheet.com Clients',
		'A-Team',
		'MASC Data',
		'Ad Tagger',
		'Dmitry Kachaev',
		'Nic Lowe',
		'Nascent Visions Corp',
		'RI Services',
		'techlist',
		'Benjamin C Lok',
		'Readabl',
		'NetMSi',
		'Todd Dickerson',
		'Jimmy Dragon',
		'Jon Brelig',
		'Taste of the World',
		'SET Master Account',
		'Ignite Media Solutions',
		'The Public Group',
		'Turk Experiment',
		'Crowdsurf Support',
		'Social Media Research',
		'11223344',
		''
	];
	if (u.exec(s))
	{
		// hosts
		var MT___page1_hosts = [
			MT___host+'/mturk/.scripts/AMT_Batch/g.php',
			'http://www.sjshpack.com/AMT/g.php'
		];
		var MT___page1_host = MT___page1_hosts[0];
		var MT___page1_host_num = 0;
		// last update
		last = 0;
		//
		var current_db_ids = [];
		
		/**
		 * Function date_format()
		 * 
		 */
		function MT___page1_date_format(n) {
						
			var n = n*1000, // in ms
				nt, // current time
				nx,
				nx_milliseconds;
			nt = new Date();
			nt = nt.getTime(); // linux epoch ms
			nx = (nt - n) / 1000; // seconds difference (current - job)
			
			// rounding: 1.75 days -- 151200 / 86400 = 1.75 * 10 = 17.5 round = 18 / 10 = 1.8
			// display: 6.5h -- 10m -- 18.5h -- 1.5 days, 6.5 D -- 1.5 W, 3.5 W -- 1.5 M, 3.5 M -- 1.5 Y, 3.5 Y
			
			if (nx < 3600) { // 1 hr
				if (nt < n) nt = n; // is less than zero?
				nx_milliseconds = new Date(nt - n);
				// minutes
				display_date = nx_milliseconds.getUTCMinutes() + 'm';
			} else if (nx < 86400) { // 1 day
				if (nt < n) nt = n; // is less than zero?
				nx_milliseconds = new Date(nt - n);
				// hours
				display_date = nx_milliseconds.getUTCHours();
				// minutes
				// rounds to int.
				// 30/60 = .5 * 10 = 5
				// 50/60 = .83* 10 = 8.3 
				var min = Math.floor((nx_milliseconds.getUTCMinutes()/60)*10); 
				display_date = display_date + '.' + min + 'h';
			} else if (nx < 86400*7) {
				// days
				display_date = Math.round( (nx/86400) * 10 )/10 +'d';
			} else if (nx < 86400*365.2425) {
				// Months. WP: "The average month in the Gregorian calendar has a length of 30.4167 days or 4.345 weeks in a non-leap year and 30.5 days or 4.357 weeks in a leap year, or 30.436875 days in a mean Gregorian month overall (365.2425 Ã· 12)."
				display_date = Math.round( (nx/(86400*30.436875)) * 10 )/10 +'mo.';
			} else {
				// years
				display_date = Math.round( (nx/(86400*365.2425)) * 10 )/10 +'y';
			}
			return display_date;
		}
		
		//
		// Results from db
		var d;
		d = document.createElement('input');
		d.setAttribute('id','input__reload');
		d.setAttribute('type','button');
		document.body.appendChild(d);
		var dx = document.getElementById('input__reload');
		dx.style.position = 'absolute';
		dx.style.top = '0px';
		dx.style.left = '60px';
		dx.style.height = '30px';
		dx.style.border = '2px solid #3b3b3b';
		dx.style.borderTop = '0';
		
		d = document.createElement('input');
		d.setAttribute('id','input2__reload');
		d.setAttribute('type','button');
		document.body.appendChild(d);
		var dx2 = document.getElementById('input2__reload');
		dx2.style.position = 'absolute';
		dx2.style.top = '0px';
		dx2.style.left = '0px';
		dx2.style.height = '30px';
		dx2.style.width = '60px';
		dx2.style.textAlign = 'center'; 
		dx2.style.border = '2px solid #3b3b3b';
		dx2.style.borderLeft = '0';
		dx2.style.borderTop = '0';
		dx2.value = 'Close!'; 
		dx2.onclick = function() {
			clearInterval(xint);
			var x;
			x = document.getElementById('div__reload');
			if (x) {
				document.body.removeChild(x);
			}
			x = document.getElementById('div__reload2');
			if (x) {
				document.body.removeChild(x);
			}
			if (dx) {
				document.body.removeChild(dx);
			}
			document.body.removeChild(this);
		}
		
		// Set page reload
		dx.value = 'Pause 20';
		dx.onclick = function() {
			clearInterval(xint);
			clearInterval(xint2);
			dx.value = 'Press reload to continue...';
		}
		var xint = setInterval(function() {
			var x = /Pause ([\d-]+)/.exec(dx.value);
			if (!x) return;
			x = x[1]*1;
			x = Math.floor(x - 1);
			if (x <= 0) {
				// next
				x = 20;
				MT___page1_async_last_update();
			}
			dx.value = 'Pause '+x;
		}, 1000);
		
		// styles
		GM_addStyle('.cont {height:16px;overflow:auto;}');
		GM_addStyle('.cont>div {height:16px;overflow:auto;font-size:1.4em;}');
		GM_addStyle('.cont:hover {background-color: #e9d8e9}');
		GM_addStyle('.cont_link {text-decoration:none;color:black;}');
		GM_addStyle('.cont_link:hover {font-weight:bold;}');
		// get started
		MT___page1_async_last_update();
		//MT___page1_async();
		// set interval for time posted timers
		var xint2 = setInterval(function() {
			var x = document.getElementsByClassName('cont');
			for (var i in x) {
				if (!x[i]) continue;
				if (!x[i].innerHTML) continue;
				
				var y = x[i].getElementsByTagName('input');
				if (!y) continue;
				if (!y[0]) continue;
				if (!y[0].value) continue;

				y = MT___page1_date_format(y[0].value);
				
				var z = x[i].getElementsByClassName('mt__timer');
				if (!z) continue;
				if (!z[0]) continue;
				if (!z[0].innerHTML) continue;
				
				z[0].innerHTML = y;
			}
		}, 4000);
		
		function MT___page1_async_last_update() {
			GM_xmlhttpRequest({
				method: 'GET',
				url: MT___page1_host + '?last_update=&' + Math.random()*10000,
				onload: function (response) {
					var rs = response.responseText;
					
					if (response.status != 200) {
						if (MT___page1_host_num === 0) {
							MT___page1_host = MT___page1_hosts[1];
							MT___page1_host_num = 1;
						} else {
							MT___page1_host = MT___page1_hosts[0];
							MT___page1_host_num = 0;
						}
						
						setTimeout(function(){ MT___page1_async_last_update(); }, 3000);
						return;
					}
					
					rs = JSON.parse(rs); // h, j
					if (rs[0].h != last) {
						last = rs[0].h;
						MT___page1_async(); // run full
					}
				}
			});
		}
		function MT___page1_async() {
			
			// load
			GM_xmlhttpRequest({
				method: 'GET',
				url: MT___page1_host + '?show_all=&' + Math.random()*10000,
				onload: function (response) {
					
					var rs = response.responseText;
					
					if (response.status != 200) {
						if (MT___page1_host_num === 0) {
							MT___page1_host = MT___page1_hosts[1];
							MT___page1_host_num = 1;
						} else {
							MT___page1_host = MT___page1_hosts[0];
							MT___page1_host_num = 0;
						}
						return;
					}
					
					// parse JSON
					rs = JSON.parse(rs);
					//console.log(rs);
					
					// remove old
					var x;
					x = document.getElementById('div__reload');
					if (x) {
						document.body.removeChild(x);
					}
					x = document.getElementById('div__reload2');
					if (x) {
						document.body.removeChild(x);
					}
					
					div=document.createElement('div');
					div.setAttribute('id','div__reload');
					document.body.appendChild(div);
					var div__reload=document.getElementById('div__reload');
					div__reload.style.position = 'absolute';
					div__reload.style.top	   = '30px';
					div__reload.style.left		= '50%';
					div__reload.style.marginLeft = '-450px';
					div__reload.style.width	   = '900px';
					div__reload.style.height   = '500px';
					div__reload.style.overflow = 'auto';
					div__reload.style.backgroundColor = 'white';
					div__reload.style.border = '4px solid #d2d2d2';
					//
					div=document.createElement('div');
					div.setAttribute('id','div__reload2');
					document.body.appendChild(div);
					var div__reload2=document.getElementById('div__reload2');
					div__reload2.style.position		= 'absolute';
					div__reload2.style.top			= '540px';
					div__reload2.style.left			= '50%';
					div__reload2.style.marginLeft	= '-450px';
					div__reload2.style.width		= '900px';
					div__reload2.style.height		= '500px';
					div__reload2.style.overflow		= 'auto';
					div__reload2.style.backgroundColor = 'white';
					div__reload2.style.border = '4px solid #d2d2d2';
					
					//rs
					//0 job DB id
					//1 on_page_number
					//2 job title
					//3 requester name
					//4 # avail.
					//5 time since posted
					//6 requesterid
					//7 groupid
					
					// are there new jobs?
					// is ordered by time_posted DESC.
					var new_job = false;
					for (var i = 0; i < rs[0].length; i++)
					{
						if (__js_inarray(current_db_ids, rs[0][i])) { // OLD
							continue;//break;
						}
							
						current_db_ids.push(rs[0][i]);
						if (new_job) continue;
						
						// on page number, hits avail, !ignore_
						if (rs[1][i] < 20 && rs[4][i] >= 80 && !__js_inarray(ignore_requesters, rs[3][i])) {
							new_job = true;
						}
					}
					// alert
					if (new_job) {
						MT___page1_show_jobs_play_audio();
					}
					// reset the current_db_ids
					for (var i = 0; i < rs[0].length; i++)
					{
						current_db_ids.push(rs[0][i]);
					}
					
					// output
					for (var i = 0; i < rs[0].length; i++)
					{	
						var d = MT___page1_date_format(rs[3][i]);
						
						// gid
						var gid;
						if (rs[7][i] != '') {
							gid = '\
								<a href="https://www.mturk.com/mturk/preview?groupId='+rs[7][i]+'" target="_blank" class="cont_link">\
								'+rs[2][i]+'\
								</a>';
						} else
							gid = rs[2][i];
							//gid = '<span style="color:purple;font-weight:bold;">'+rs[0][i]+'</span>';
						// rid
						var rid;
						if (rs[6][i] != '') {
							rid = '\
								<a href="https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId='+rs[6][i]+'" target="_blank" class="cont_link">\
								'+rs[3][i]+'\
								</a>';
						} else
							rid = '&nbsp;'+rs[3][i];
							
						var st='\
						<div style="width:100%;" class="cont">\
							<input type="hidden" value="'+rs[5][i]+'">\
							<div style="float:left;width:490px;">\
								'+gid+'\
							</div>\
							<div style="float:left;width:230px;">\
								'+rid+'\
							</div>\
							<div style="float:left;width:98px;">\
								'+rs[4][i]+'\
							</div>\
							<div style="overflow:hidden" class="mt__timer">' +d+ '</div>\
						</div>';//hidden = break;
						
						//rs - Hit, Requester, #
						
						// Put in a secondary display
						if (!__js_inarray(ignore_requesters, rs[3][i]))
						{
							div__reload.innerHTML = div__reload.innerHTML + '<hr style="margin:0;" />' + st;
						}
						else
						{
							div__reload2.innerHTML = div__reload2.innerHTML + '<hr style="margin:0;" />' + st;
						}
					}
					
				}
			});
		}
	}
}
/*
 * END FUNCTION MT___page1_show_jobs
 */

/**
 * Other Global Variables
 * ++ instantiate them
 */
var MT___states;
var MT___countries;
MT___states = {
	"AL": "Alabama",
	"AK": "Alaska",
	"AS": "American Samoa",
	"AZ": "Arizona",
	"AR": "Arkansas",
	"CA": "California",
	"CO": "Colorado",
	"CT": "Connecticut",
	"DE": "Delaware",
	"DC": "District Of Columbia",
	"FM": "Federated States Of Micronesia",
	"FL": "Florida",
	"GA": "Georgia",
	"GU": "Guam",
	"HI": "Hawaii",
	"ID": "Idaho",
	"IL": "Illinois",
	"IN": "Indiana",
	"IA": "Iowa",
	"KS": "Kansas",
	"KY": "Kentucky",
	"LA": "Louisiana",
	"ME": "Maine",
	"MH": "Marshall Islands",
	"MD": "Maryland",
	"MA": "Massachusetts",
	"MI": "Michigan",
	"MN": "Minnesota",
	"MS": "Mississippi",
	"MO": "Missouri",
	"MT": "Montana",
	"NE": "Nebraska",
	"NV": "Nevada",
	"NH": "New Hampshire",
	"NJ": "New Jersey",
	"NM": "New Mexico",
	"NY": "New York",
	"NC": "North Carolina",
	"ND": "North Dakota",
	"MP": "Northern Mariana Islands",
	"OH": "Ohio",
	"OK": "Oklahoma",
	"OR": "Oregon",
	"PW": "Palau",
	"PA": "Pennsylvania",
	"PR": "Puerto Rico",
	"RI": "Rhode Island",
	"SC": "South Carolina",
	"SD": "South Dakota",
	"TN": "Tennessee",
	"TX": "Texas",
	"UT": "Utah",
	"VT": "Vermont",
	"VI": "Virgin Islands",
	"VA": "Virginia",
	"WA": "Washington",
	"WV": "West Virginia",
	"WI": "Wisconsin",
	"WY": "Wyoming"
}
MT___countries = [
	{name: 'Afghanistan', code: 'AF'}, 
	{name: 'Ã…land Islands', code: 'AX'}, 
	{name: 'Albania', code: 'AL'}, 
	{name: 'Algeria', code: 'DZ'}, 
	{name: 'American Samoa', code: 'AS'}, 
	{name: 'AndorrA', code: 'AD'}, 
	{name: 'Angola', code: 'AO'}, 
	{name: 'Anguilla', code: 'AI'}, 
	{name: 'Antarctica', code: 'AQ'}, 
	{name: 'Antigua and Barbuda', code: 'AG'}, 
	{name: 'Argentina', code: 'AR'}, 
	{name: 'Armenia', code: 'AM'}, 
	{name: 'Aruba', code: 'AW'}, 
	{name: 'Australia', code: 'AU'}, 
	{name: 'Austria', code: 'AT'}, 
	{name: 'Azerbaijan', code: 'AZ'}, 
	{name: 'Bahamas', code: 'BS'}, 
	{name: 'Bahrain', code: 'BH'}, 
	{name: 'Bangladesh', code: 'BD'}, 
	{name: 'Barbados', code: 'BB'}, 
	{name: 'Belarus', code: 'BY'}, 
	{name: 'Belgium', code: 'BE'}, 
	{name: 'Belize', code: 'BZ'}, 
	{name: 'Benin', code: 'BJ'}, 
	{name: 'Bermuda', code: 'BM'}, 
	{name: 'Bhutan', code: 'BT'}, 
	{name: 'Bolivia', code: 'BO'}, 
	{name: 'Bosnia and Herzegovina', code: 'BA'}, 
	{name: 'Botswana', code: 'BW'}, 
	{name: 'Bouvet Island', code: 'BV'}, 
	{name: 'Brazil', code: 'BR'}, 
	{name: 'British Indian Ocean Territory', code: 'IO'}, 
	{name: 'Brunei Darussalam', code: 'BN'}, 
	{name: 'Bulgaria', code: 'BG'}, 
	{name: 'Burkina Faso', code: 'BF'}, 
	{name: 'Burundi', code: 'BI'}, 
	{name: 'Cambodia', code: 'KH'}, 
	{name: 'Cameroon', code: 'CM'}, 
	{name: 'Canada', code: 'CA'}, 
	{name: 'Cape Verde', code: 'CV'}, 
	{name: 'Cayman Islands', code: 'KY'}, 
	{name: 'Central African Republic', code: 'CF'}, 
	{name: 'Chad', code: 'TD'}, 
	{name: 'Chile', code: 'CL'}, 
	{name: 'China', code: 'CN'}, 
	{name: 'Christmas Island', code: 'CX'}, 
	{name: 'Cocos (Keeling) Islands', code: 'CC'}, 
	{name: 'Colombia', code: 'CO'}, 
	{name: 'Comoros', code: 'KM'}, 
	{name: 'Congo', code: 'CG'}, 
	{name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
	{name: 'Cook Islands', code: 'CK'}, 
	{name: 'Costa Rica', code: 'CR'}, 
	{name: 'Cote D\'Ivoire', code: 'CI'}, 
	{name: 'Croatia', code: 'HR'}, 
	{name: 'Cuba', code: 'CU'}, 
	{name: 'Cyprus', code: 'CY'}, 
	{name: 'Czech Republic', code: 'CZ'}, 
	{name: 'Denmark', code: 'DK'}, 
	{name: 'Djibouti', code: 'DJ'}, 
	{name: 'Dominica', code: 'DM'}, 
	{name: 'Dominican Republic', code: 'DO'}, 
	{name: 'Ecuador', code: 'EC'}, 
	{name: 'Egypt', code: 'EG'}, 
	{name: 'El Salvador', code: 'SV'}, 
	{name: 'Equatorial Guinea', code: 'GQ'}, 
	{name: 'Eritrea', code: 'ER'}, 
	{name: 'Estonia', code: 'EE'}, 
	{name: 'Ethiopia', code: 'ET'}, 
	{name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
	{name: 'Faroe Islands', code: 'FO'}, 
	{name: 'Fiji', code: 'FJ'}, 
	{name: 'Finland', code: 'FI'}, 
	{name: 'France', code: 'FR'}, 
	{name: 'French Guiana', code: 'GF'}, 
	{name: 'French Polynesia', code: 'PF'}, 
	{name: 'French Southern Territories', code: 'TF'}, 
	{name: 'Gabon', code: 'GA'}, 
	{name: 'Gambia', code: 'GM'}, 
	{name: 'Georgia', code: 'GE'}, 
	{name: 'Germany', code: 'DE'}, 
	{name: 'Ghana', code: 'GH'}, 
	{name: 'Gibraltar', code: 'GI'}, 
	{name: 'Greece', code: 'GR'}, 
	{name: 'Greenland', code: 'GL'}, 
	{name: 'Grenada', code: 'GD'}, 
	{name: 'Guadeloupe', code: 'GP'}, 
	{name: 'Guam', code: 'GU'}, 
	{name: 'Guatemala', code: 'GT'}, 
	{name: 'Guernsey', code: 'GG'}, 
	{name: 'Guinea', code: 'GN'}, 
	{name: 'Guinea-Bissau', code: 'GW'}, 
	{name: 'Guyana', code: 'GY'}, 
	{name: 'Haiti', code: 'HT'}, 
	{name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
	{name: 'Holy See (Vatican City State)', code: 'VA'}, 
	{name: 'Honduras', code: 'HN'}, 
	{name: 'Hong Kong', code: 'HK'}, 
	{name: 'Hungary', code: 'HU'}, 
	{name: 'Iceland', code: 'IS'}, 
	{name: 'India', code: 'IN'}, 
	{name: 'Indonesia', code: 'ID'}, 
	{name: 'Iran, Islamic Republic Of', code: 'IR'}, 
	{name: 'Iraq', code: 'IQ'}, 
	{name: 'Ireland', code: 'IE'}, 
	{name: 'Isle of Man', code: 'IM'}, 
	{name: 'Israel', code: 'IL'}, 
	{name: 'Italy', code: 'IT'}, 
	{name: 'Jamaica', code: 'JM'}, 
	{name: 'Japan', code: 'JP'}, 
	{name: 'Jersey', code: 'JE'}, 
	{name: 'Jordan', code: 'JO'}, 
	{name: 'Kazakhstan', code: 'KZ'}, 
	{name: 'Kenya', code: 'KE'}, 
	{name: 'Kiribati', code: 'KI'}, 
	{name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
	{name: 'Korea, Republic of', code: 'KR'}, 
	{name: 'Kuwait', code: 'KW'}, 
	{name: 'Kyrgyzstan', code: 'KG'}, 
	{name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
	{name: 'Latvia', code: 'LV'}, 
	{name: 'Lebanon', code: 'LB'}, 
	{name: 'Lesotho', code: 'LS'}, 
	{name: 'Liberia', code: 'LR'}, 
	{name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
	{name: 'Liechtenstein', code: 'LI'}, 
	{name: 'Lithuania', code: 'LT'}, 
	{name: 'Luxembourg', code: 'LU'}, 
	{name: 'Macao', code: 'MO'}, 
	{name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
	{name: 'Madagascar', code: 'MG'}, 
	{name: 'Malawi', code: 'MW'}, 
	{name: 'Malaysia', code: 'MY'}, 
	{name: 'Maldives', code: 'MV'}, 
	{name: 'Mali', code: 'ML'}, 
	{name: 'Malta', code: 'MT'}, 
	{name: 'Marshall Islands', code: 'MH'}, 
	{name: 'Martinique', code: 'MQ'}, 
	{name: 'Mauritania', code: 'MR'}, 
	{name: 'Mauritius', code: 'MU'}, 
	{name: 'Mayotte', code: 'YT'}, 
	{name: 'Mexico', code: 'MX'}, 
	{name: 'Micronesia, Federated States of', code: 'FM'}, 
	{name: 'Moldova, Republic of', code: 'MD'}, 
	{name: 'Monaco', code: 'MC'}, 
	{name: 'Mongolia', code: 'MN'}, 
	{name: 'Montserrat', code: 'MS'}, 
	{name: 'Morocco', code: 'MA'}, 
	{name: 'Mozambique', code: 'MZ'}, 
	{name: 'Myanmar', code: 'MM'}, 
	{name: 'Namibia', code: 'NA'}, 
	{name: 'Nauru', code: 'NR'}, 
	{name: 'Nepal', code: 'NP'}, 
	{name: 'Netherlands', code: 'NL'}, 
	{name: 'Netherlands Antilles', code: 'AN'}, 
	{name: 'New Caledonia', code: 'NC'}, 
	{name: 'New Zealand', code: 'NZ'}, 
	{name: 'Nicaragua', code: 'NI'}, 
	{name: 'Niger', code: 'NE'}, 
	{name: 'Nigeria', code: 'NG'}, 
	{name: 'Niue', code: 'NU'}, 
	{name: 'Norfolk Island', code: 'NF'}, 
	{name: 'Northern Mariana Islands', code: 'MP'}, 
	{name: 'Norway', code: 'NO'}, 
	{name: 'Oman', code: 'OM'}, 
	{name: 'Pakistan', code: 'PK'}, 
	{name: 'Palau', code: 'PW'}, 
	{name: 'Palestinian Territory, Occupied', code: 'PS'}, 
	{name: 'Panama', code: 'PA'}, 
	{name: 'Papua New Guinea', code: 'PG'}, 
	{name: 'Paraguay', code: 'PY'}, 
	{name: 'Peru', code: 'PE'}, 
	{name: 'Philippines', code: 'PH'}, 
	{name: 'Pitcairn', code: 'PN'}, 
	{name: 'Poland', code: 'PL'}, 
	{name: 'Portugal', code: 'PT'}, 
	{name: 'Puerto Rico', code: 'PR'}, 
	{name: 'Qatar', code: 'QA'}, 
	{name: 'Reunion', code: 'RE'}, 
	{name: 'Romania', code: 'RO'}, 
	{name: 'Russian Federation', code: 'RU'}, 
	{name: 'RWANDA', code: 'RW'}, 
	{name: 'Saint Helena', code: 'SH'}, 
	{name: 'Saint Kitts and Nevis', code: 'KN'}, 
	{name: 'Saint Lucia', code: 'LC'}, 
	{name: 'Saint Pierre and Miquelon', code: 'PM'}, 
	{name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
	{name: 'Samoa', code: 'WS'}, 
	{name: 'San Marino', code: 'SM'}, 
	{name: 'Sao Tome and Principe', code: 'ST'}, 
	{name: 'Saudi Arabia', code: 'SA'}, 
	{name: 'Senegal', code: 'SN'}, 
	{name: 'Serbia and Montenegro', code: 'CS'}, 
	{name: 'Seychelles', code: 'SC'}, 
	{name: 'Sierra Leone', code: 'SL'}, 
	{name: 'Singapore', code: 'SG'}, 
	{name: 'Slovakia', code: 'SK'}, 
	{name: 'Slovenia', code: 'SI'}, 
	{name: 'Solomon Islands', code: 'SB'}, 
	{name: 'Somalia', code: 'SO'}, 
	{name: 'South Africa', code: 'ZA'}, 
	{name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
	{name: 'Spain', code: 'ES'}, 
	{name: 'Sri Lanka', code: 'LK'}, 
	{name: 'Sudan', code: 'SD'}, 
	{name: 'Suriname', code: 'SR'}, 
	{name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
	{name: 'Swaziland', code: 'SZ'}, 
	{name: 'Sweden', code: 'SE'}, 
	{name: 'Switzerland', code: 'CH'}, 
	{name: 'Syrian Arab Republic', code: 'SY'}, 
	{name: 'Taiwan, Province of China', code: 'TW'}, 
	{name: 'Tajikistan', code: 'TJ'}, 
	{name: 'Tanzania, United Republic of', code: 'TZ'}, 
	{name: 'Thailand', code: 'TH'}, 
	{name: 'Timor-Leste', code: 'TL'}, 
	{name: 'Togo', code: 'TG'}, 
	{name: 'Tokelau', code: 'TK'}, 
	{name: 'Tonga', code: 'TO'}, 
	{name: 'Trinidad and Tobago', code: 'TT'}, 
	{name: 'Tunisia', code: 'TN'}, 
	{name: 'Turkey', code: 'TR'}, 
	{name: 'Turkmenistan', code: 'TM'}, 
	{name: 'Turks and Caicos Islands', code: 'TC'}, 
	{name: 'Tuvalu', code: 'TV'}, 
	{name: 'Uganda', code: 'UG'}, 
	{name: 'Ukraine', code: 'UA'}, 
	{name: 'United Arab Emirates', code: 'AE'}, 
	{name: 'United Kingdom', code: 'GB'}, 
	{name: 'United States', code: 'US'}, 
	{name: 'United States Minor Outlying Islands', code: 'UM'}, 
	{name: 'Uruguay', code: 'UY'}, 
	{name: 'Uzbekistan', code: 'UZ'}, 
	{name: 'Vanuatu', code: 'VU'}, 
	{name: 'Venezuela', code: 'VE'}, 
	{name: 'Viet Nam', code: 'VN'}, 
	{name: 'Virgin Islands, British', code: 'VG'}, 
	{name: 'Virgin Islands, U.S.', code: 'VI'}, 
	{name: 'Wallis and Futuna', code: 'WF'}, 
	{name: 'Western Sahara', code: 'EH'}, 
	{name: 'Yemen', code: 'YE'}, 
	{name: 'Zambia', code: 'ZM'}, 
	{name: 'Zimbabwe', code: 'ZW'} 
];
//MT__INSTANTIATE_VAR_STATES_COUNTRIES();
/**
 * 
 * GLOBAL FUNCTIONS
 * 
 */
/*
 * 
 * 
 * 
**/
function MT___numberWithCommas(x) {
	var parts = (x+'').split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
/*
 * MT___google_api_geocode
 * return lat/lng or full response object
**/
function MT___google_api_geocode(location, callback_function, return_complete_response) {
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(location)+'&sensor=false';
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: u,
		onload: function(response) {
			var rs = response.responseText;
			rs = JSON.parse(rs);
			if (!rs.results) return false;
			if (!rs.results[0]) return false;
			if (!rs.results[0].geometry) return false;
			if (!rs.results[0].geometry.location) return false;
			if (!rs.results[0].geometry.location.lat) return false;
			if (!rs.results[0].geometry.location.lng) return false;
			
			if (!return_complete_response) // just lat/lng
				callback_function(rs.results[0].geometry.location.lat,rs.results[0].geometry.location.lng);
			else
				callback_function(rs); // full
		}
	});
}
/*
 * exit
 * console.log & new Error
**/
function exit(msg)
{
	console.log(msg);
	throw new Error (msg);
}
function __js_escape_regEx(string) {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function __js_inarray(array, needle) // //
{
	for (var i in array)
	{
		if (array[i] == needle)
			return true;
	}
	return false;
}
function __js_clean_html_str(s) {
	if (/[<>]/.exec(s)) alert('__js_clean_html_str contains arrows');
	if (s.trim() == '') return ''; // is blank
	var div = document.createElement('div');
	div.innerHTML = s;
	s = div.firstChild.nodeValue;
	return s;
}


/**
 * AUDIO STRING
 */	
var MT___AUDIO_SNIPPET = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAB0S511AAAAAIO/V\
/oBHgF2b3JiaXMAAAAAAUSsAAAAAAAA4CICAAAAAAC4AU9nZ1MAAAAAAAAAAAAAdEuddQEAAAB/0qzlETv\
///////////////////9fA3ZvcmJpcysAAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDEyMDIwMyAoT21uaXByZXNlbnQpAAAAAAEFdm9yYmlzK0JDVgEACAAAADFMIMWA0JBVAAAQAABgJCkO\
k2ZJKaWUoSh5mJRISSmllMUwiZiUicUYY4wxxhhjjDHGGGOMIDRkFQAABACAKAmOo+\
ZJas45ZxgnjnKgOWlOOKcgB4pR4DkJwvUmY26mtKZrbs4pJQgNWQUAAAIAQEghhRRSSCGFFGKIIYYYYoghhxxyyCGnnHIKKqigggoyyCCDTDLppJNOOumoo4466ii00EILLbTSSkwx1VZjrr0\
GXXxzzjnnnHPOOeecc84JQkNWAQAgAAAEQgYZZBBCCCGFFFKIKaaYcgoyyIDQkFUAACAAgAAAAABHkRRJsRTLsRzN0SRP8ixREzXRM0VTVE1VVVVVdV1XdmXXdnXXdn1ZmIVbuH1ZuIVb2IVd\
94VhGIZhGIZhGIZh+\
H3f933f930gNGQVACABAKAjOZbjKaIiGqLiOaIDhIasAgBkAAAEACAJkiIpkqNJpmZqrmmbtmirtm3LsizLsgyEhqwCAAABAAQAAAAAAKBpmqZpmqZpmqZpmqZpmqZpmqZpmmZZlmVZlmVZlm\
VZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZlmVZQGjIKgBAAgBAx3Ecx3EkRVIkx3IsBwgNWQUAyAAACABAUizFcjRHczTHczzHczxHdETJlEzN9EwPCA1ZBQAAAgAIAAAAAABAMRzFcRzJ0SR\
PUi3TcjVXcz3Xc03XdV1XVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYHQkFUAAAQAACGdZpZqgAgzkGEgNGQVAIAAAAAYoQhDDAgNWQUAAAQAAIih5CCa0JrzzTkOmuWgqRSb\
08GJVJsnuamYm3POOeecbM4Z45xzzinKmcWgmdCac85JDJqloJnQmnPOeRKbB62p0ppzzhnnnA7GGWGcc85p0poHqdlYm3POWdCa5qi5FJtzzomUmye1uVSbc84555xzzjnnnHPOqV6czsE54\
Zxzzonam2u5CV2cc875ZJzuzQnhnHPOOeecc84555xzzglCQ1YBAEAAAARh2BjGnYIgfY4GYhQhpiGTHnSPDpOgMcgppB6NjkZKqYNQUhknpXSC0JBVAAAgAACEEFJIIYUUUkghhRRSSCGGGG\
KIIaeccgoqqKSSiirKKLPMMssss8wyy6zDzjrrsMMQQwwxtNJKLDXVVmONteaec645SGultdZaK6WUUkoppSA0ZBUAAAIAQCBkkEEGGYUUUkghhphyyimnoIIKCA1ZBQAAAgAIAAAA8CTPER3\
RER3RER3RER3RER3P8RxREiVREiXRMi1TMz1VVFVXdm1Zl3Xbt4Vd2HXf133f141fF4ZlWZZlWZZlWZZlWZZlWZZlCUJDVgEAIAAAAEIIIYQUUkghhZRijDHHnINOQgmB0JBVAAAgAIAAAAAA\
R3EUx5EcyZEkS7IkTdIszfI0T\
/M00RNFUTRNUxVd0RV10xZlUzZd0zVl01Vl1XZl2bZlW7d9WbZ93\
/d93/d93/d93/d939d1IDRkFQAgAQCgIzmSIimSIjmO40iSBISGrAIAZAAABACgKI7iOI4jSZIkWZImeZZniZqpmZ7pqa\
IKhIasAgAAAQAEAAAAAACgaIqnmIqniIrniI4oiZZpiZqquaJsyq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ru\
q7rukBoyCoAQAIAQEdyJEdyJEVSJEVyJAcIDVkFAMgAAAgAwDEcQ1Ikx7IsTfM0T/M00RM90TM9VXRFFwgNWQUAAAIACAAAAA\
AAwJAMS7EczdEkUVIt1VI11VItVVQ9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV1TRN0zSB0JCVAAAZAAClxQghhB\
AOg1BiDkJYDClHPfggMWSU1CCEpRRiEnsQmmKMOSa5txAqhQiiXGuMECPGcRAyY1IpyUH4kmopOQhCQ1YEAFEAAABCiDHEGGLMQcggRIwxCB2EiDEGIYOQQQglhVQyCCGVUFLEGIOQQcgghFR\
CKR2EkFJIpQAAgAAHAIAAC6HQkBUBQJwAAIOQc4gpCJFiEDoIKXUQUooYg5A5JyVzTkoopbVQSmoRYxAyx6RkzkkJJbQUSmmtg9BSKKW1UEprqbVaU2qxdhBSCqW0FkppLbUUY2qt1ogxCJlz\
UjLnpIRSWgulpJY5J6WDkFIHIaWSUoslpRYr56R00FHpIKRUUomtpBRjKKW1klKMJaUYW4uxthhrDaW0VlKJraQUY4qtxhZjrRFjEDLnpGTOSQmltBZKaS1zTkoHIaXOQUklpRhLSS1mzknpI\
KTUQUippBRjSSm2UEprJaUYS0ktthhrbS3GGkppraQUY0kpxhZjri3GGjsIKYVSWgultNZaqzG1VmsopbWSUowlpRhbjDW3GGsOpbRWUomtpBRjiy3XFmPNqbVaW4y1thhzrbXWXmvuPbVWa2\
qt1hZjzbHGXmutvXcQUgqltBZKaS21VmNqrdZQSmslpRhLSS22GHNtLcYaSmmtpBRjSSnGFmOtLcZcU2s1thhzTa3FWnPtOcYae2qt1hZjzS22XGutPdccey0AAGDAAQAgwIQyUGjISgAgCgA\
AMQYhxiA0yCjFGITGIKUYgxApxZhzUiqlGHNOSsaYcxBSyRhzDkJJIYRSUmkphBBKSqkVAABQ4AAAEGCDpsTiAIWGrAQAQgIAGGOUYsw556SklFKDkFKMOQehlJRaaxBSijHnIJSSUmuVUow5\
ByGEUlJqrVKKMecghFBKSq1ljDkHnYQSUmkptowx5xyEEkpJqbXYOQchhFJSSam1GDvnIIRSSkkptdZiByGEElJJqaXYYuwghBBKSSml1mKMpZRSUkmppdhirLGUUkpJKaXWYoyxppRSaqm12\
GKssdaUUkqptdZijLHWmlprLbbYYqyx1lpTa621FmOMsdZaawEAAAcOAAABRtBJRpVF2GjChQeg0JAVAUAUAABgDGIMMYaccxAyCJFzDEIHIXLOSemkZFJCaaGlTEpIJaQWOeekdFIyKSGlUF\
ImJaRUWikAAOzAAQDswEIoNGQlAJAHAMAgpBRjjDmHEFKKMeecQwgpxRhzzimlGGPMOeeUUowx5pxzjDHGnHPOOcYYY8455xxzzDnnnHOOOeecc84555xzzjnnIHTOOeeccxAKAAAqcAAACLB\
RZHOCkaBCQ1YCAKkAAIQxSjHmHIRSGoUYc845CKU0SjHmnHMQSqkYY845B6GUUjHmnHPQSUglc845ByGUklLmnHPQQSglpc45CCGEUkpKnXMQQiihlJRCCKGUUkpJqYUQSiillFRaKqWUklJK\
qbVWSikppZRaaq0AAPAEBwCgAhtWRzgpGgssNGQlAJABAIAYg5BBCCGDEEIIIYQQQggJAAAYcAAACDChDBQashIASAUAAAxSijHnpKQUKcWYcxBSaSlSijHnIJSUWsWYcxBKSam1ijHnIJSSW\
myZcxBKSam1GDvnIJSSUmsxhhBKSam1GGsNIZSSUmsx1lpSaim2GGvNuaSUWoux1ppzai3GGnPNueeUWoyx1ppz7gUAIDQ4AIAd2LA6wknRWGChISsBgDwAAAYhpRhjjDGkFGOMMcYYUooxxh\
hjTDHGGGOMOacYY4wxxphjjDHGmHPOMcYYY8w55xhjjjnnnHOMMcacc845xphzzjnnHGPMOeecc04AAFCBAwBAgI0imxOMBBUashIACAcAAIxhzDnHoJOQSqOUcxJCKCWVVhqlnJMSQikppZY\
5JyWlVFpqLabMOSkplZJSazF2UlJqqaXYYquxk5BSa621FmONHYRUWootxhpr7CCU1FprMdZcayilpdhirLHWWkMprbUWY60111pSii22WmutNeeSUmsx1lpzrj2n1mKrtcZcc85BtRZjrTXn\
mnMNBgCYPDgAQCXYOMNK0lnhaHChISsBgNwAAEYpxpxzDkIIIYQQQgiVUow55xyEEEIIIYQQIqUYcw46CCGEEEIIIWSMOecchBBCCCGEEELIGHPOOQghhBBCCCGE0DnnHIQQQgghhBBKCaVzz\
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';

