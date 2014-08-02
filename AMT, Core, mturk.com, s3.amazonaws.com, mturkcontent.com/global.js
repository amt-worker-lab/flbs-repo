// KH
var mt___kh_test_str = '38033	||2603	longandfoster.com||2011	kw.com||1802	crye-leike.com||1155	homesmartintl.com||1099	realtyonegroup.com||830	elliman.com||XXXX';


/**
 * OTHER GLOBAL VARIABLES
 * 
 */
//
var MT___host = 'http://192.168.1.2';

/**
 * 
 * 
 * 													AMT__GLOBAL_VARS
 * 
 * 
 * */

//		AMT__Global_Vars.isTopWindow
//		AMT__Global_Vars.isPreview
//		AMT__Global_Vars.groupId
var AMT__Global_Vars = //function()
{
	//~ var isTopWindow;
	//~ var isPreview;
	//~ var groupId;
	//~ var hitId;
	//~ 
	//~ 
	//~ //
	//~ var isQProduct = false;
	
	
	isTopWindow: null,
	isPreview: null,
	groupId: '',
	hitId: '',
	
	//
	isQProduct: false,
	//~ var AMT__Queue = {
		//~ isQProduct: false
	//~ };
	
	core: {
		return_accept_run_nextTab: false
	}
}
//~ AMT__Global_Vars();
//~ console.log(AMT__Global_Vars);
//~ console.log(AMT__Global_Vars.isTopWindow);
//~ console.log(AMT__Global_Vars.core);


AMT__Global_Vars.initializeGroupId = function () {
	if(AMT__Global_Vars.isTopWindow)
	{
		var groupIdReg = /<input type="hidden" name="groupId" value="([^"]*)">/;
		var groupId = groupIdReg.exec(ih)[1];
		if(!groupId)
		{
			//alert('Error initializing groupId');
		}
		AMT__Global_Vars.groupId = groupId;		
		
		//Now that we have the groupId, listen for whether the child frame wants to learn it as well.
		window.addEventListener('message', function(e) {
			var ifr = document.getElementsByTagName('iframe')[0];
			ifr.contentWindow.postMessage({groupId: AMT__Global_Vars.groupId}, '*');
			this.removeEventListener('click',arguments.callee,false);
		}, false);
		
	}
	else
	{
		var interval =  setInterval(function(){
			parent.postMessage({groupIdRequest: true}, '*');
		}
		,200);
		
		window.addEventListener('message', function(e) {
				if(!AMT__Global_Vars.groupId)
				{
					if(e.data && e.data.groupId)
					{
						AMT__Global_Vars.groupId = e.data.groupId;
						
						//Record the groupId if we aren't in preview. This way we know which HITs we've already done/returned
						if(!AMT__Global_Vars.isPreview)
						{
							//Record the HitId so we know if we've already been here
							AMT___addQuestionAnswer('Skip Returns - ' + AMT__Global_Vars.groupId,
										AMT__Global_Vars.hitId,
										'');
						}
						clearInterval(interval);					
						this.removeEventListener('click',arguments.callee,false);
					}
				}
			}, false);
		}
}

AMT__Global_Vars.initializeHitId = function () {
	if(AMT__Global_Vars.isTopWindow)
	{
		var hitId;
		var innerIframe = document.getElementsByTagName('iframe');
		if(innerIframe && innerIframe[0])
		{
			innerIframe = innerIframe[0];
			innerIframeSrc = innerIframe.src;
			var hitIdReg = /hitId=([^&]+)/
			hitId = hitIdReg.exec(innerIframeSrc);
			if(!hitId)
			{
				alert('Caution: Failed to get hitId from frame source. Proceeding to get hitId from topWindow instead.');
			}
			else
			{
				hitId = hitId[1];
			}
		}
		
		if(!innerIframe || !hitId)
		{	
			var hitIdReg = /name="hitId" value="([^"]+)">///<input type="hidden" name="groupId" value="([^"]+)">/;
			var hitId = hitIdReg.exec(ih)
			if(!hitId)
			{
				//alert('Error initializing groupId');
			}
			hitId = hitId[1];
		}
		AMT__Global_Vars.hitId = hitId;
	}
	else
	{
		var link = document.location.href;
		var hitIdReg = /hitId=([^&]+)/
		var hitId = hitIdReg.exec(link);
		if(!hitId)
		{
			//alert('Error initializing groupId');
		}
		hitId = hitId[1];
		AMT__Global_Vars.hitId = hitId;
	}
}

AMT__Global_Vars.initializeTabId = function() {
		chrome.extension.sendRequest(
		{
			getTabId: true
		}, 
		function(response) {
				AMT__Global_Vars.tabId = response.id;
			}
		);
}

//top_window preview href
//https://www.mturk.com/mturk/preview?groupId=20NENHMVHVKCNQ47ZIY4U79KXWE42F&requesterId=A1ZFY5DB22KCK9&hitId=2SIHFL42J1LY9YEDHND0TGFKI6Q2NR&signature=YgugC%2F6Q4KQwhUu8ydrSsjUYyg0%3D&externalHit=true&canAccept=true

//Inner Iframe preview src
//"https://www.mturkcontent.com/dynamic/hit?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=2X5TBJ3MMDX5JFATLIBHM9MDYH7CY0"

//top_window preview accepted https://www.mturk.com/mturk/accept?hitId=2X5TBJ3MMDX5JFATLIBHM9MDYH7CY0&prevHitSubmitted=false&prevRequester=aditya+sudhakar&requesterId=A1ZFY5DB22KCK9&prevReward=USD0.02&hitAutoAppDelayInSeconds=3600&groupId=20NENHMVHVKCNQ47ZIY4U79KXWE42F&signature=pPP49ZuO0ZYQYgk5N3ng4jgy0DQ%3D&%2Faccept.x=45&%2Faccept.y=6

//Inner Iframe accepted src
//https://www.mturkcontent.com/dynamic/hit?assignmentId=2598MZ9O9Z6K0U2SPF8H2RLFVKG1AA&hitId=2X5TBJ3MMDX5JFATLIBHM9MDYH7CY0&workerId=_REDACTED_3_&turkSubmitTo=https%3A%2F%2Fwww.mturk.com



//

/**
 * 
 * 
 * 													END OF AMT__GLOBAL_VARS
 * 
 * 
 * */

//Record Returning
/**
 * 
 * **/
function recordReturn() {
	localStorage['tab' + AMT__Global_Vars.tabId + 'Type'] = 'return';
}

/**
 * Tab Switching 
 ***/
isQProduct = false;

function goToNextTab() {
	chrome.extension.sendRequest({
								  getActiveTab: true
							  }, function(response) {
								 //do nothign with the response
							});
}

function addToTabsQ() {
	isQProduct = true;
	
	//Tell eventPage to add this to the Q
	chrome.extension.sendRequest({
								  addToTabsQ: true
							  }, function(response) {
								//do nothing with the response
							});
}



function showNextTab() {
	isQProduct = false;
	console.log('Showing Next Tab');
	chrome.extension.sendRequest({
									  showNextTab: true
								  }, function(response) {
									//do nothing with the response
								});
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.checkPreview)
	{
		if(AMT__Global_Vars.isTopWindow)
		{
			//Only have the top window send back the response
			console.log('Commanded to tell if idle');
			sendResponse({isPreview: AMT__Global_Vars.isPreview});
		}
	}	
	else if(request.isQProduct)
	{
		//Only have the top window sending back the response
		console.log('Commanded to tell if isQProduct: ' + isQProduct);
		if(AMT__Global_Vars.isTopWindow)
		{
			sendResponse({isQProduct: isQProduct});
		}
	}
});
/**
 * End of Tab Switching
 * 
 * **/

/**
 * 
 * 
 * 													FLOAT/SKIP FUNCTIONALITY
 * 
 * 
 * */

//This is the Constructer Function
//Call new on this function and pass in the options to initialize the floater's variables!
var AMT___Floater = function (options) {
		AMT___Floater.acceptCondition = options.acceptCondition;							//done
		AMT___Floater.runMT_Run = options.runMT_Run;										//done
		AMT___Floater.runTop_Window = options.runTop_Window;								//done
		AMT___Floater.forceTopCondition = options.forceTopCondition;
		AMT___Floater.runOnMouseOver = options.runOnMouseOver;					
		AMT___Floater.maxSkipsBeforeAccept = options.maxSkipsBeforeAccept;			
		AMT___Floater.maxFloatTimeBeforeAccept = options.maxFloatTimeBeforeAccept;		
		AMT___Floater.groupId = AMT__Global_Vars.groupId;									//done

		AMT___Floater.skipSpeed = options.skipSpeed ? options.skipSpeed : 15000;			//done
		AMT___Floater.skipWithSubmitQueue = options.skipWithSubmitQueue;
		AMT___Floater.skipOnReturnedHits = options.skipOnReturnedHits;
}




//Runs the floater based on its options vairables
AMT___Floater.float = function() {
	

	if(AMT___Floater.runMT_Run || AMT___Floater.runTop_Window)
	{
		AMT___Floater.runPreview();
		AMT___Floater.listenForAcceptSkip();
	}
	
	if(typeof(AMT___Floater.acceptCondition) === 'function')
	{
		if(AMT___Floater.acceptCondition())
		{
			AMT___Floater.accept();
		}
	}
	else if(AMT___Floater.acceptCondition)
	{
		AMT___Floater.accept();
	}
	
	//Todo:
	//Use AMT___Floater.trySkip() to implement auto-skip
	//Place in later code for 'Accept Condition'
	
	
	/* Old useless code
	if(AMT___Floater.skipOnReturnedHits)
	{
		AMT___getMatch('Skip Returns - ' + AMT__Global_Vars.groupId,
			   AMT__Global_Vars.hitId,
			   function(match, reference) {
				if(match)
				{
					console.log('Testing the "AMT___Floater" in getMatch below: ')
					console.log(AMT___Floater);
					console.log('Is this AMT___getMatch?');
					alert('Skipping - Already Been Here');
					document.body.style.backgroundColor = 'LightGreen';
					reference.trySkip();
				}
			},
			AMT___Floater);
	}*/
	
}


AMT___Floater.runPreview = function() {
	console.log(AMT___Floater.runMT_Run);
	if(AMT___Floater.runMT_Run)
	{
		var ifr = document.getElementsByTagName('iframe')[0];
		ifr.contentWindow.postMessage({runPreview: true}, '*');
		
		var ran = false;
		
		var interval =  setInterval(function(){
			var ifr = document.getElementsByTagName('iframe')[0];
			ifr.contentWindow.postMessage({runPreview: true}, '*');
			console.log('sedning runpreview');
		}
		,200);
		

		
		window.addEventListener('message',function(event) {
			if(event.data && event.data.MT_Ran)
			{

				clearInterval(interval);
			}
		},false);
	}
	else if(AMT___Floater.runTop_Window)
	{
		top_window();
	}
}

AMT___Floater.listenForAcceptSkip = function() {
	window.addEventListener('message', AMT___Floater.acceptOrSkip, false);
}

AMT___Floater.accept = function() {
	if(!AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		document.body.style.backgroundColor = 'lightblue';

		parent.postMessage({acceptJob: true}, '*');	
		return true;	
	}
	else if(AMT__Global_Vars.isPreview)
	{
		document.body.style.backgroundColor = 'lightblue';
	
		window.postMessage({acceptJob: true}, '*');
		return true;
	}
	return false;
}

// -800 to 400 on May 30 for Peter Heyneman.
AMT___Floater.skip = function() {
	if(!AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		doSubmit(false, false, function(timeToSkip){
				window.setTimeout(function() {
						parent.postMessage({skipJob: true}, '*')
						}
						, timeToSkip);
						
			}
			, -800); //2200//800 
	}
	else if (AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		doSubmit(false, false, function(timeToSkip){
				window.setTimeout(function() {
						window.postMessage({skipJob: true}, '*')
						}
						, timeToSkip);
						
			}
			, -800);
	}
}


AMT___Floater.acceptOrSkip = function(e) {
	if(e.data && e.data.acceptJob)
	{
		AMT___Floater.isAccepting = true;
		if (GM_getValue('mt_captcha') == '0')
			document.getElementsByName('/accept')[0].click(); /* TODO: doSumbit (-2.2 seconds) would go here*/
	}
	else if(e.data && e.data.skipJob)
	{
		var allLinks = document.getElementsByTagName('a');
		for(var i = 0; i < allLinks.length; i++)
		{
			if(allLinks[i].href && allLinks[i].href.indexOf('/mturk/preview') != -1)
			{
				allLinks[i].click();
				break;
			}
		}
	}
}

/**
 * 
 * 
 * 													END OF FLOATER'S CODE
 * 
 * 
 * */
 
/**
 * 
 * 
 * 													RECORD USER DECISIONS
 * 
 *
 * TODO:
 * - Q: What happens when you leave the house and MT___host points to a non-existent
 * page?
 * 
 * - Do not update counts for the auto decisions, when the computer decides to auto submit a form
 * */

var AMT___DECISION_RECORD = new Array();

//Creates and returns a button that says "Record&Submit"
//Its top/left are roughly near the regular Submit button
function AMT___CreateRecordButton()
{
	var inputs = document.getElementsByTagName("input");
	for(i=inputs.length - 1; i >= 0;i--)
	{
		if(inputs[i] && inputs[i].value)
		{
			if(inputs[i].value.trim().indexOf("Submit") != -1)
			{
				//var width = inputs[i].width;
				//var width = /^([\d]+)/.exec(width)[1];
				//var width = /^([\d]+)/.exec(width)[1];
				var rect = inputs[i].getBoundingClientRect();
				var newInput = document.createElement('input');
				console.log("rect.top: " + rect.top);
				var right = /^([\d]+)/.exec(rect.right)[1];
				console.log("left before adding width: " + right);
				newInput.setAttribute("style","position:absolute;top: " +rect.top +";left: "+ right +"px;");
				newInput.setAttribute("value","Submit&Record");
				newInput.setAttribute("type", "button");
				document.body.appendChild(newInput);
				newInput.onclick = function() {
					AMT___recordAndSubmit();
					};					
				return newInput;
			}
		}		
	}
}

//Adds a UserDecision to both record and do past behavior on
//recordName: Defines the namespace that these decisions are recorded into, and that past behaviors only reference from
//matchStringFunction: A function that returns a string. The function runs during RecordAndSubmit and doPastBehavior
//OutputIdentifiers: An array of how to identify what to record/do past behavior on. E.g. ["Id(Joe)", "ClassName(Monkey)[2]"]
function AMT___addUserDecision(recordName, matchStringFunction, outputIdentifiers, decision_opts)
{
	AMT___DECISION_RECORD.push(new decisionRecord(recordName, matchStringFunction, outputIdentifiers, decision_opts));
}

//An object for recording user decisions
//AMT___DECISION_RECORD is an array of decisionRecords
//recordAndSubmit sends a Match object to the database for each decisionRecord in AMT___DECISION_RECORD
//doPastBehavior bases its matchStringFunctions on each decisionRecord's matchStringFunction
function decisionRecord(recordName, matchStringFunction, outputIdentifiers, decision_opts)
{
	this.recordName = recordName;
	this.matchStringFunction = matchStringFunction;
	this.outputIdentifiers = outputIdentifiers;
	this.decision_opts = decision_opts;
}

//Does UserDecisions that have been recorded in the database
//recordName is the namespace of the decisions it checks against
//threshold is the minimum number of times the user decision has to have occurred before automatically doing that decision
//submitObject is optional object. If it is a string of 'Do Not Submit', no submission happens. Otherwise it submits the form based on its attributes
//Calls the callback even if the match fails or the threshold isn't met.
//callback sends back the match or a null value if there isn't one.
function AMT___doPastBehavior(recordName, threshold, submitObject, callback, callbackOnFail)
{
	console.log("inside do past behavior");
	if(!threshold)
	{
		threshold = 1;
	}
	
	for(i = 0; i < AMT___DECISION_RECORD.length;i++)
	{
		if(recordName != AMT___DECISION_RECORD[i].recordName)
		{
			console.log("not same namespace");
			continue;
		}
		var matchString = AMT___DECISION_RECORD[i].matchStringFunction().replace(/\s/g," ");
		AMT___getMatch(recordName, matchString, function(match) {
				if(match && match != "No Match")
				{
					console.log("threshold size: " + threshold);
					console.log(match);
					if(match.count < threshold)
					{
						if(callbackOnFail) {
							callback(false);
						}
						return;
					}
					console.log(match);
					for(j = 0; j < match.outputs.length; j++) // >>>
					{
						var outputPair = new OutputPair(match.outputs[j].inputIdentifier, 
														match.outputs[j].value);
						//console.log(outputPair);
						outputPair.doWriting();	
						if(submitObject == 'Do Not Submit')
						{
							console.log('testing');
							if(callback)
							{
								callback(match);
							}
						}
						else if(submitObject)
						{
							if(callback)
							{
								callback(match);
							}
							doSubmit(
								submitObject.form,
								submitObject.location,
								submitObject.callback_function,
								submitObject.offsetTime,
								submitObject.doServerSideSubmit
							);										     
						}
						else
						{
							if(callback)
							{
								callback(match);
							}
							doSubmit();
						}
					}
				}
				else
				{
					console.log("No Match");
					if(callbackOnFail)
						callback(false);
				}
			});
	}
}

//Sends match objects to the database based on the namespaces, match string functions, and input identifiers in AMT___DECISION_RECORD (most commonly setup by calls to AMT___addUserDecision)
function AMT___recordAndSubmit(form, location, callback_function, offsetTime, doServerSideSubmit)
{
	AMT___record();
	doSubmit(form, location, callback_function, offsetTime, doServerSideSubmit);
}

function AMT___record()
{
	//console.log(AMT___DECISION_RECORD);
	for(i = 0; i < AMT___DECISION_RECORD.length; i++)
	{
		var recordName = AMT___DECISION_RECORD[i].recordName;
		var matchString = AMT___DECISION_RECORD[i].matchStringFunction().replace(/\s/g," ");
		var outputs = new Array();
		var options = AMT___DECISION_RECORD[i].decision_opts;
		//console.log(options);
		
		for(j = 0; j < AMT___DECISION_RECORD[i].outputIdentifiers.length; j++)
		{
			//console.log(AMT___DECISION_RECORD[i].outputIdentifiers[j]);
			var outputPair = new OutputPair(AMT___DECISION_RECORD[i].outputIdentifiers[j]);
			outputPair.doRecording();
			
			if(options && options.writeBlankInputIdentifier)
			{
				outputPair.inputIdentifier = "";
			}
			
			outputs.push(outputPair);
		}
		AMT___addQuestionAnswer(recordName, matchString, outputs);
		//console.log(JSON.stringify({recordName: recordName, matchString: matchString, outputs: outputs}));
	}
}


//Gets a match of matchString/UserInput from the databse
//Parameters:
//recordName - The namespace of the match you are asking for
//matchString - the matchString you want to check against in the database
//callback(match) - a function that gets called as soon as a match is discovered (or undiscovered) from the database. match is a match object (see below)
function AMT___getMatch(recordName, matchString, callback, reference, timeCutOff)
{
	var find = new FindObject(recordName, matchString.replace(/\s/g," "), timeCutOff);
	var find = JSON.stringify(find);
	//alert("find has been triggered");
	var reference = reference;
	//console.log("ref b4 gm: " + reference);
	GM_xmlhttpRequest({
		method: "POST",
		url: 
			 MT___host + '/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
		data: "findObject=" + encodeURIComponent(find),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs= response.responseText;
			//console.log(rs);
			if(rs.trim() == "No Match")
			{
				//console.log("got here");
				callback(undefined)
				return;
			}
			//console.log("got here 2");
			rs = JSON.parse(rs);
			rs.outputs = JSON.parse(rs.outputs);
			console.log("ref in gm: " + reference);
			if(!reference)
				callback(rs);
			else			
				callback(rs, reference);
		}
	});	
}

//The hardcode way to add a match into the databse
//recordName: the namespace that the match gets matched against
//matchString: the matchString in the database
//outputPairs: an array of outputPairs, e.g. [new OutputPair("Id(Bob)", "n/a"), new OutputPair("Name("Steve")[1],"n/a")]
function AMT___addQuestionAnswer(recordName, matchString, outputPairs)
{
	var match = new Match(recordName, matchString, outputPairs, (new Date).getTime());
	console.log("Last time of submit: " + match.lastTimeOfSubmit)
	console.log(match);
	chrome.extension.sendRequest({
								   match: match					
								  }, function(response) {
			//console.log(response.farewell);
		});
}

//An object with an inputIdentifier, and a value (which gets recorded in doRecording(), or written into the correct input in doWriting())
//Input Identifier types: Id, TagName, ClassName, Name
function OutputPair(inputIdentifier, value)
{
	this.inputIdentifier = inputIdentifier;
	if(value)
		this.value = value;
	else
	{
		this.value = undefined;
	}
}

//Sets value to element.value (or element.checked) where element is determined by the inputIdentifier 
OutputPair.prototype.doRecording = function() {
	//console.log(/(^[^\(]+)/.exec(this.inputIdentifier)[1]);
	//console.log(this)
	
	var identificationType = /(^[^\(]+)/.exec(this.inputIdentifier)[1];
	//console.log("here");
	//console.log(identificationType);
	var identificationQuality = /\(([^\)]+)\)/.exec(this.inputIdentifier)[1];
	identificationQuality = identificationQuality.replace(/['"]/g,'');
	//console.log(identificationQuality);
	if(identificationType != "Id")
	{
		var identificationIndex = /\[(\d+)\]/.exec(this.inputIdentifier)[1];
	}
	//console.log("type: " + identificationType);
	//console.log("quality: " + identificationQuality);
	//console.log("index: " + identificationIndex);
	
	var element;
	
	//console.log(document.body.getElementsByClass("test"));
	
	try {
		switch(identificationType) {
			case "Id": element = document.getElementById(identificationQuality);
				break;
			case "TagName": element = document.getElementsByTagName(identificationQuality)[identificationIndex];
				break;
			case "Class": element = document.body.getElementsByClassName(identificationQuality)[identificationIndex];
				break;
			case "Name": element = document.getElementsByName(identificationQuality)[identificationIndex];
				break;
			default : alert("recording broke");
		}
		
		if(element.type && (element.type == "checkbox" || element.type == "radio"))
		{
			this.value = element.checked;
		} 
		else
		{
			this.value = element.value;
			//console.log(element);
			//console.log("this.value: "+this.value);
		}
	}
	catch(e)
	{
		console.log(e)
	}
}


//Writes this.value to the element of this.inputIdentifier
OutputPair.prototype.doWriting = function() {
	//console.log("this.value inside doWriting: " + this.value);
	var identificationType = /(^[^\(]+)/.exec(this.inputIdentifier)[1];
	//console.log(identificationType);
	var identificationQuality = /\(([^\)]+)\)/.exec(this.inputIdentifier)[1];
	identificationQuality = identificationQuality.replace(/['"]/g,'');
	//console.log(identificationQuality);
	if(identificationType != "Id")
	{
		var identificationIndex = /\[(\d+)\]/.exec(this.inputIdentifier)[1];
	}
	//console.log("type: " + identificationType);
	//console.log("quality: " + identificationQuality);
	//console.log("index: " + identificationIndex);
	
	
	var element;
	
	try{
		switch(identificationType) {
			case "Id": element = document.getElementById(identificationQuality);
				break;
			case "TagName": element = document.getElementsByTagName(identificationQuality)[identificationIndex];
				break;
			case "Class": element = document.getElementsByClassName(identificationQuality)[identificationIndex];
				break;
			case "Name":element = document.getElementsByName(identificationQuality)[identificationIndex];
				break;
			default : alert("writing broke");
		}
		
		if(element.type && (element.type == "checkbox" || element.type == "radio"))
		{
			element.checked = this.value;
		} 
		else
		{
			console.log(element.value);
			element.value = this.value;
		}
	}
	catch(e)
	{
		console.log(e);
	}
}

//An obect
//recordName: the recordName that it gets matched against in the database
//matchString: the matchstring  "   "   "   "       "      "   "   "
//outputPairs: an array of outputPairs
//lastTimeOfSubmit: the last time the match was submitted Default: the time this Match gets created
//count: how many times the match has been recorded. Default: 1 
function Match(recordName, matchString,outputPairs,lastTimeOfSubmit,count)
{
	this.recordName = recordName;
	this.matchString = matchString.replace(/\s/g, " ");
	this.outputs = outputPairs;
	if(!count)
		this.count = 1;
	else
		this.count = count;
	if(!lastTimeOfSubmit)
		this.lastTimeOfSubmit = Math.round((new Date).getTime()/1000);	
	else
		this.lastTimeOfSubmit = lastTimeOfSubmit;
}

//An object that gets passed to eventPage, then passed into PHP to query the database looking for a match
function FindObject(recordName,matchString, timeCutOff) {
	if(!timeCutOff)
		timeCutOff = 0;
	this.matchString = matchString;
	this.recordName = recordName;
	this.timeCutOff = timeCutOff;	
}


/**
 * 
 * 
 * 													End of: RECORD USER DECISIONS
 * 
 * 
 * */

//~ 
//~ /**
 //~ * AMT___functions_factory
 //~ * @
 //~ * @ AMT___requests_factory.prototype.scrapy__begin_scrape
 //~ */
//~ function AMT___generic_factory(obj_vars) {
	//~ // this.___SKIP_SITES = ''; // would this work?
//~ }

/**
 * String Prototypes
 * 
 */
String.prototype.stateAbbrToFull = function() {
	
	//~ console.log(this);
	//~ console.log(this[0]);
	
	
	// BUILD STR
	var str = '';
	for (var i in this) {
		//~ console.log(this[i]);
		if (i == 'length' || this[i].length != 1) {
			break;
		}
		str += this[i];
	}
	
	str = str.toLowerCase().trim();
	
	console.log(str);
	
	for (var i in MT___states) {
		if (i.toLowerCase() == str) {
			return MT___states[i];
			//~ break;
		}
	}
	
	// None found?
	return str.toUpperCase();
}

/**
 * AMT factories
 * 
 * AMT___events_factory
 * AMT___requests_factory
 * AMT___huge_vars_factory
 * AMT___items_factory
 * AMT___core_factory
**/

/**
 * AMT___core_factory
 *
 * 
 * @func nextTab
 * @func nextWindow
 * @func top_window__addEventListener_iframe
 * @func iframe2parent__postMessage
 * @func amt_home_show_tasks
 */
function AMT___core_factory() {

}
//Shows the tab on the right of the current tab
//If there is no tab on the right, it shows the tab at the far left
AMT___core_factory.prototype.nextTab = function() {
	chrome.extension.sendRequest(
		{
			nextTab: true
		},
		function(response)
		{
		}
	);
}
//
AMT___core_factory.prototype.nextWindow = function() {
	console.log('core_nextWindow');
	chrome.extension.sendRequest(
		{
			core_nextWindow: true
		},
		function(response)
		{
		}
	);
}
AMT___core_factory.prototype.top_window__addEventListener_iframe = function(options, callback_function) {
	
	// Is there an iframe on the page?
	// If there is not then this is the end!
	if (!document.getElementsByTagName('iframe').length)
		return;
	
	// Still here. There is an iframe so listen for any
	// messages that may come up.
	// ...
	window.addEventListener("message", top_window__addEventListener_iframe__complete, false);
	
	// ...
	function top_window__addEventListener_iframe__complete(event)
	{
		if (!event || !event.hasOwnProperty('data') || !event.data) return;
		
		var v = event.data;
		
		switch(v.action) {
			case 'return_button__showNextTab':
				//~ console.log('Will showNextTab on return');
				
				var b = getReturnButton();
				console.log(b);
				if (b) {
					b.addEventListener('mouseup', function() {
						//~ console.log('mouseup on return button');
						
						showNextTab();
					}, false);
					
					//~ b.addEventListener('mouseup', v.callback_function, false);
				}
				break;
			// AMT___returnAndAcceptButton()
			case 'return_and_accept_button__nextTab':
				AMT__Global_Vars.core.return_accept_run_nextTab = true;
				break;
		}
	}
	
	/**
	 * var getReturnButton
	 */
	var getReturnButton = function() {
		
		/*<a href="/mturk/return?groupId=394TEHR260Y0TAZL4P5WWJA29V265A&amp;requesterId=A1DPN0ELREA8BX&amp;hitId=337RC3OW06B1S9HP5GO231XZJR8LVQ&amp;signature=69fiOfplYPuNDOqYG2nIVj%2F1V0Y%3D&amp;externalHit=true&amp;canAccept="><img src="/images/return_hit.gif" alt="" border="0" width="82" height="22"></a>*/
		
		var a = document.getElementsByTagName('a');
		for (var i in a) {
			if (i == 'length') break;
			//~ console.log(a[i].href);
			if (a[i].href && a[i].href.indexOf('https://www.mturk.com/mturk/return?') == 0) {
				return a[i];
				break;
			}
		}
		
		// here?
		return false;
	}
}
AMT___core_factory.prototype.iframe2parent__postMessage = function(options) {
	
	//~ console.log(options);
	parent.postMessage({
		action: options.action //'return_button__showNextTab'
		
		//~ action: 'return',
		//~ callback_function: callback_function
	}, "*");
	
	//~ setInterval
}
//~ AMT___core_factory.prototype.iframe2parent__addEventListener_return_HIT = function(options, callback_function) {


/**
 * AMT___events_factory
 *
 * @
 * @   
 */
function AMT___events_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
AMT___events_factory.prototype.keydown__blur_field = function(e) {
	var k = e.keyCode;
	console.log(k);
	if (k == 46 || k == 8 || k == 190) {
		var x = this;
		setTimeout(function() {
			x.focus();
			x.blur();
		}, 40);
		return true;
	}
}

/**
 * AMT___requests_factory
 *
 * @
 * @ AMT___requests_factory.prototype.scrapy__begin_scrape
 * 
 * @type
 * general_functions__
 * scrapy__
 * io__
 * fs__
 * database__
 * 
 * etc...  
 */
function AMT___requests_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
AMT___requests_factory.prototype.general_functions__numberFormat__numberWithCommas = function(str) {
	var parts = (str + '').split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
AMT___requests_factory.prototype.general_functions__color__io__dominantColor_colorThiefPHP = function(img_url, callback_function) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: MT___host + '/mturk/util.php?AMT__dominantColor_colorThief='+encodeURIComponent(img_url),
		onload: function (response) {
			var rs = response.responseText;
			if (response.status != 200) {
				exit(response.status);
			}
			
			//=array(r: num, g: num, b: num)
			rs = JSON.parse(rs);
			callback_function(rs);
		}
	});
}
/**
 * Converts a color from RGB color space to HSL color space.
 * Modified from {@link http://en.wikipedia.org/wiki/HLS_color_space}.
 * @param {number} r Value of red, in [0, 255].
 * @param {number} g Value of green, in [0, 255].
 * @param {number} b Value of blue, in [0, 255].
 * @return {!Array.<number>} [h, s, l] values for the color, with h an int in
 *    [0, 360] and s and l in [0, 1].
 */
AMT___requests_factory.prototype.general_functions__countryToAbbreviatedCountry = function(country) {
	// MT___countries
	for (var i in MT___countries) {
		if (MT___countries[i].name.toLowerCase().trim() == country.toLowerCase().trim()) {
			return MT___countries[i].code;
		}
	}
	
	// still here?
	// >return false
	return false;
}
AMT___requests_factory.prototype.general_functions__color__rgbToHsl = function(r, g, b) {
	// First must normalize r, g, b to be between 0 and 1.
	var normR = r / 255;
	var normG = g / 255;
	var normB = b / 255;
	var max = Math.max(normR, normG, normB);
	var min = Math.min(normR, normG, normB);
	var h = 0;
	var s = 0;

	// Luminosity is the average of the max and min rgb color intensities.
	var l = 0.5 * (max + min);

	// The hue and saturation are dependent on which color intensity is the max.
	// If max and min are equal, the color is gray and h and s should be 0.
	if (max != min) {
		if (max == normR) {
		  h = 60 * (normG - normB) / (max - min);
		} else if (max == normG) {
		  h = 60 * (normB - normR) / (max - min) + 120;
		} else if (max == normB) {
		  h = 60 * (normR - normG) / (max - min) + 240;
		}

		if (0 < l && l <= 0.5) {
		  s = (max - min) / (2 * l);
		} else {
		  s = (max - min) / (2 - 2 * l);
		}
	}

	// Make sure the hue falls between 0 and 360.
	return [Math.round(h + 360) % 360, s, l];
};
/**
 * Calculates the Euclidean distance between two color vectors on an HSL sphere.
 * A demo of the sphere can be found at:
 * http://en.wikipedia.org/wiki/HSL_color_space
 * In short, a vector for color (H, S, L) in this system can be expressed as
 * (S*L'*cos(2*PI*H), S*L'*sin(2*PI*H), L), where L' = abs(L - 0.5), and we
 * simply calculate the 1-2 distance using these coordinates
 * @param {Array.<number>} hsl1 First color represented by a 3-element array
 *     with hue in range [0, 360], and saturation and luminance values in the
 *     range[0, 1].
 * @param {Array.<number>} hsl2 Second color represented by a 3-element array
 *     with hue in range [0, 360], and saturation and luminance values in the
 *     range[0, 1].
 * @return {number} Distance between the two colors, in the range [0, 1].
 */
AMT___requests_factory.prototype.general_functions__color__hslDistance = function(hsl1, hsl2) {
	var sl1, sl2;
	if (hsl1[2] <= 0.5) {
	  sl1 = hsl1[1] * hsl1[2];
	} else {
	  sl1 = hsl1[1] * (1.0 - hsl1[2]);
	}

	if (hsl2[2] <= 0.5) {
	  sl2 = hsl2[1] * hsl2[2];
	} else {
	  sl2 = hsl2[1] * (1.0 - hsl2[2]);
	}

	var h1 = hsl1[0] / 360.0;
	var h2 = hsl2[0] / 360.0;
	var dh = (h1 - h2) * 2.0 * Math.PI;
	return (hsl1[2] - hsl2[2]) * (hsl1[2] - hsl2[2]) +
	  sl1 * sl1 + sl2 * sl2 - 2 * sl1 * sl2 * Math.cos(dh);
};
//
AMT___requests_factory.prototype.general_functions__color__rgbToHex = function(r, g, b)
{
	var componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
//
AMT___requests_factory.prototype.general_functions__color__hexToRGB = function(hex)
{
	var hexToR = function (h) {return parseInt((cutHex(h)).substring(0,2),16)}
	var hexToG = function (h) {return parseInt((cutHex(h)).substring(2,4),16)}
	var hexToB = function (h) {return parseInt((cutHex(h)).substring(4,6),16)}
	var cutHex = function (h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	
	return [hexToR(hex), hexToG(hex), hexToB(hex)];
}
//
AMT___requests_factory.prototype.general_functions__md5 = function(str)
{
  //  discuss at: http://phpjs.org/functions/md5/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: utf8_encode
  //   example 1: md5('Kevin van Zonneveld');
  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

  var xl;

  var rotateLeft = function(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };

  var addUnsigned = function(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };

  var _F = function(x, y, z) {
    return (x & y) | ((~x) & z);
  };
  var _G = function(x, y, z) {
    return (x & z) | (y & (~z));
  };
  var _H = function(x, y, z) {
    return (x ^ y ^ z);
  };
  var _I = function(x, y, z) {
    return (y ^ (x | (~z)));
  };

  var _FF = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _GG = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _HH = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _II = function(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var convertToWordArray = function(str) {
    var lWordCount;
    var lMessageLength = str.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = new Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  var wordToHex = function(lValue) {
    var wordToHexValue = '',
      wordToHexValue_temp = '',
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  };
  
  var utf8_encode = function(argString)
  {
	  //  discuss at: http://phpjs.org/functions/utf8_encode/
	  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // improved by: sowberry
	  // improved by: Jack
	  // improved by: Yves Sucaet
	  // improved by: kirilloid
	  // bugfixed by: Onno Marsman
	  // bugfixed by: Onno Marsman
	  // bugfixed by: Ulrich
	  // bugfixed by: Rafal Kukawski
	  // bugfixed by: kirilloid
	  //   example 1: utf8_encode('Kevin van Zonneveld');
	  //   returns 1: 'Kevin van Zonneveld'

	  if (argString === null || typeof argString === 'undefined') {
		return '';
	  }

	  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	  var utftext = '',
		start, end, stringl = 0;

	  start = end = 0;
	  stringl = string.length;
	  for (var n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;

		if (c1 < 128) {
		  end++;
		} else if (c1 > 127 && c1 < 2048) {
		  enc = String.fromCharCode(
			(c1 >> 6) | 192, (c1 & 63) | 128
		  );
		} else if ((c1 & 0xF800) != 0xD800) {
		  enc = String.fromCharCode(
			(c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
		  );
		} else { // surrogate pairs
		  if ((c1 & 0xFC00) != 0xD800) {
			throw new RangeError('Unmatched trail surrogate at ' + n);
		  }
		  var c2 = string.charCodeAt(++n);
		  if ((c2 & 0xFC00) != 0xDC00) {
			throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
		  }
		  c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
		  enc = String.fromCharCode(
			(c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
		  );
		}
		if (enc !== null) {
		  if (end > start) {
			utftext += string.slice(start, end);
		  }
		  utftext += enc;
		  start = end = n + 1;
		}
	  }

	  if (end > start) {
		utftext += string.slice(start, stringl);
	  }

	  return utftext;
  }

  var x = [],
    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22,
    S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20,
    S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23,
    S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  str = utf8_encode(str);
  x = convertToWordArray(str);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  xl = x.length;
  for (k = 0; k < xl; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

  return temp.toLowerCase();
}
//
AMT___requests_factory.prototype.linkedin_company_search = function(cs_object, callback_func) //
{
	var kw = cs_object.keywords;
	u = 'http://www.linkedin.com/vsearch/cj'+
		'?type=companies'+
		'&keywords='+encodeURIComponent(kw)+
		'&orig=FCTD'+
		'&rsid='+
		'&pageKey=voltron_company_search_internal_jsp';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		//~ url: MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u),
		onload: function (response) {
			var rs = response.responseText;
			
			if (response.status != 200)
				return;
			
			var r;
			
			//console.log(rs);
			r = JSON.parse(rs);
			
			
			var x = r.content.page.voltron_unified_search_json.search.results;
			var y;
			if (r.content.page.voltron_unified_search_json.search.results_count_with_keywords_i18n)
				y = r.content.page.voltron_unified_search_json.search.results_count_with_keywords_i18n.replace(/<[^>]+>/g, '');
			else
				y = r.content.page.voltron_unified_search_json.search.results_count_without_keywords_i18n.replace(/<[^>]+>/g, '');
			
			callback_func({results:x, results_count:y, result: r});
		}
	});
}
//
AMT___requests_factory.prototype.scrapy__cancel_job = function(jobid, timeout) //
{
	var jobid = jobid;
	setTimeout(function() {
		//$ curl http://localhost:6800/cancel.json -d project=myproject -d job=6487ec79947edab326d6db28a2d86511e8247444
		GM_xmlhttpRequest({
			method: 'POST',
			url: AMT___POPUP___PROXY_REDACTED_+':6800/cancel.json', //http://localhost
			data: 'project=scrapy_amt&job='+encodeURIComponent(jobid),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function (response) {
				var rs = response.responseText;
				console.log(rs);
				//clearInterval(interval);
			}
		});
	}, timeout);
}
/**
 * 
 * 
 * @callback_function: Return 1) scrapyd jobid, 2) response_object, 3) seed_object 
 */
// TODO
// XXDONE Jun4 2014: MATCH "DOMAIN.COM" WITH "JOBID.JL" FOR CACHED FUTURE REQUESTS!
AMT___requests_factory.prototype.scrapy__begin_scrape = function(parameters_object, callback_function, seed_object) //
{
	/*
	http://localhost:6800/schedule.json -d project=scrapy_amt -d spider=AMTSpider -d setting=DEPTH_LIMIT=4 -d setting=SCHEDULER_ORDER=BFO -d arg_start_urls="http://www.hillsboroughcountynh.org/hr/doc.txt" -d arg_allowed_domains="hillsboroughcountynh.org" -d arg_max_pages_to_fetch=40
	*/
	
	var callback_function = callback_function;
	var seed_object = seed_object;
	
	var data = '';
	var ampersand = '';
	for (var i in parameters_object) {
		if (data != '')
			ampersand = '&';
		
		var value = parameters_object[i];
		// If arrays
		// arg_allowed_domains, arg_start_urls, settings
		// not a string AND not a number!
		if (typeof parameters_object[i] != 'string' && typeof parameters_object[i] != 'number') {
			if (i == 'arg_allowed_domains' || i == 'arg_start_urls') {
				data += ampersand + encodeURIComponent(i) + '=' + encodeURIComponent(JSON.stringify(value));
			} else if (i == 'settings') {
				for (var j in value) {
					//data += ampersand + 'setting=' + value[j];
					
					data += ampersand + 'setting=' + encodeURIComponent(value[j]);
				}
			}
			continue;
		}
		// Here? Must be strings.
		data += ampersand + encodeURIComponent(i) + '=' + encodeURIComponent(value);
	}
	
	// DEBUG
	//~ console.log(data);
	//~ console.log(data.split('&').join(' -d '));
	//~ console.log(data.split('&').join(' -a '));
	
	/** Function scrapy__begin_scrape__process_completed
	 * @param: input_object
	 * @param: input_object.rs
	 * @param: input_object.seed_object
	 * @param: input_object.seed_object.callback__scrapy__begin_scrape__process_completed
	 * 
	 * @desc: helper function
	*/
	function scrapy__begin_scrape__process_completed( input_object ) {
		
		// callback_function(jobid, callback_obj, seed_object);
		//~ console.log(input_object);
		
		var rs = input_object.rs;
		var seed_object = input_object.seed_object;
		//~ var jobid = input_object.jobid;
		
		// obj
		// urls is: {"urls_priority": "none", "urls_url": "http://www.crossfitsolcity.com/sign-up/"}
		var obj = rs.trim().split("\n");
		var callback_obj = {
			urls: {
				high	:[],
				low		:[],
				none	:[],
				outside	:[],
				complete_high_to_low : [] // inclues all: high, low, none, outside
			},
			matches: []
		}
		if (obj.length) {
			for (var i in obj) {
				if (obj[i].trim().length == 0)
					continue;
				obj[i] = JSON.parse(obj[i]);
				if (obj[i].email_contexts)	// is email context
				{
					obj[i].email_contexts = JSON.parse(obj[i].email_contexts);
				}
				if (obj[i].urls_url)	// is url
				{ 
					switch (obj[i].urls_priority) {
						case 'high':
							callback_obj.urls.high.push(obj[i]);
							break;
						case 'low':
							callback_obj.urls.low.push(obj[i]);
							break;
						case 'none':
							callback_obj.urls.none.push(obj[i]);
							break;
						case 'outside':
							callback_obj.urls.outside.push(obj[i]);
							break;
					}
				}
				if (obj[i].email_email)
					callback_obj.matches.push(obj[i]);
				//~ if (callback_obj.matches.length)
				//~ else 						// is match
				//~ {
					//~ callback_obj.matches.push(obj[i]);
				//~ }
			}
		}
		// make complete urls (high to none/outside)
		// is {} object
		// high, low, none, outside, (complete_high_to_low)
		for (var tmp_priority in callback_obj.urls) {
			for (var j in callback_obj.urls[tmp_priority]) {
				if (j == 'complete_high_to_low') continue;
				
				callback_obj.urls.complete_high_to_low.push({
					url		 : callback_obj.urls[tmp_priority][j].urls_url,
					priority : tmp_priority
				});
			}
		}
		
		// temp callback function?
		if (seed_object.callback__scrapy__begin_scrape__process_completed) {
			
			var x = seed_object.callback__scrapy__begin_scrape__process_completed(callback_obj);
			
			if (x) { // RESPONSE IS TRUE(CONTINUE), FALSE(END SCRIPT PROCESSING)
				return;
			}
		}
		
		//
		// max powers
		//
		//~ console.log(callback_obj);
		
		callback_function(callback_obj, seed_object);
		
		//~ callback_function(jobid, callback_obj, seed_object);
		
	}
	
	// CACHE !! //
	var rf		= new AMT___requests_factory();
	var md5_url	= rf.general_functions__md5(data);//console.log(md5_url);
	
	GM_xmlhttpRequest({
		method: "GET",
		url: MT___host + '/mturk/.cached/'+md5_url,
		onload: function(response) {
			var rs = response.responseText;
			
			if (response.status == 200) {
				scrapy__begin_scrape__process_completed({
					rs:				rs,
					seed_object:	seed_object
					//~ jobid:			jobid,
				});
				return;
			}
			
			// Here! This is a new request.
			GM_xmlhttpRequest({
				method: 'POST',
				url: AMT___POPUP___PROXY_REDACTED_+':6800/schedule.json', //http://localhost
				data: data,
				timeout: 10000,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function (response) {
					var rs = response.responseText;
					
					console.log(rs);
					
					rs = JSON.parse(rs);
					
					var jobid = rs.jobid;
					var complete_interval;
					
					// POLL FOR COMPLETION!!
					complete_interval = setInterval(function() {
						
						GM_xmlhttpRequest({
							method: 'GET',
							url: AMT___POPUP___PROXY_REDACTED_ + ':6800/listjobs.json?project=scrapy_amt', //http://localhost
							timeout: 2000,
							onload: function (response) {
								var rs = response.responseText;
								
								rs = JSON.parse(rs);
								
								var finished;
								var pending;
								var running;
								
								finished = JSON.stringify(rs.finished);
								if (finished.indexOf(jobid) != -1) { // done!
									
									clearInterval(complete_interval);
									
									// the local filepath is /var/www/html/development/scrapy/data/items/scrapy_amt/AMTSpider
									
									var item_url = AMT___POPUP___PROXY_REDACTED_ +
										'/development/scrapy/data/items/scrapy_amt/AMTSpider/' +
										jobid + '.jl';
									
									// RETRIEVE THE LIST!
									GM_xmlhttpRequest({
										method: 'GET',
										url: item_url,
										timeout: 4000,
										onload: function (response) {
											var rs = response.responseText;
											
											// WRITE TO FILE!
											rf.io__write_to_file(
												{
													data:		'AMT__serverSide_write__value='	+encodeURIComponent(response.responseText)+
																'&AMT__serverSide_write__folder=.cached'+
																'&AMT__serverSide_write__file='	+ md5_url,
													rs:			response.responseText,	//rs
													//~ jobid:		jobid,					//jobid
													seed_object:seed_object,			//seed_object
													host:		MT___host				//host
												},
												scrapy__begin_scrape__process_completed
											);
											
											
										}
									});
								}
								
								// is the job still pending?
								else {
									pending = JSON.stringify(rs.pending);
									running = JSON.stringify(rs.running);
									if (pending.indexOf(jobid) == -1 && running.indexOf(jobid) == -1) { // cancelled ??
										clearInterval(complete_interval);
										callback_function([], seed_object); // send blank
										// REMOVED JOBID !! JUNE 5.
										//callback_function(jobid, [], seed_object); // send blank
									}
								}
							}
						});
						
					}, 4000);
				}
			});
		}
	});
	
	
	
		// XXXXX SET A DEFAULT TIMEOUT FOR THIS TASK!
		// b/c cpu sitting at max...
		//~ var rf = new AMT___requests_factory();
		//~ rf.scrapy__cancel_job(jobid, 40000);
}
//
AMT___requests_factory.prototype.database__select = function(database_object, callback_function) //
{
	var database_object = database_object;
	var callback_function = callback_function;
	
	var u = '?AMT__database_select='+
			'&AMT__database_select__query='+encodeURIComponent(database_object.query);
	if (database_object.encodeStrings)
		u +='&AMT__database_select__encodeStrings='+encodeURIComponent(JSON.stringify(database_object.encodeStrings));
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php' + u,
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			//array_push($out_arr, [ $row['name'], $row['id_number'] ]);
			
			//~ console.log(rs);
			if (rs == '') //
				rs = '[]'; // blank!!
				
			database_object.responseObject = JSON.parse(rs);
			callback_function(database_object); // send this back!
		}
	});
}
// WRITE!
AMT___requests_factory.prototype.database__write = function(database_object, callback_function) //
{
	var database_object = database_object;
	var callback_function = callback_function;
	
	var u = 'AMT__database_write='+
			'&AMT__database_write__query='+encodeURIComponent(database_object.query);
	if (database_object.encodeStrings)
		u +='&AMT__database_write__encodeStrings='+encodeURIComponent(JSON.stringify(database_object.encodeStrings));
	
	GM_xmlhttpRequest({
		method: "POST",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
		data: u,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			//array_push($out_arr, [ $row['name'], $row['id_number'] ]);
			
			//~ console.log(rs);
			if (rs == '') //
				rs = '[]'; // blank!!
			
			console.log(rs);
			
			try {
				database_object.responseObject = JSON.parse(rs);
			}
			catch(e)
			{
				console.log(database_object);
				console.log(rs);
				console.log(e);
				exit();
			}
			
			// Here?
			callback_function(database_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__command_line_request = function(options_object, callback_function_complete) //
{
	var options_object				= options_object;
	var callback_function_complete	= callback_function_complete;
	
	GM_xmlhttpRequest({
		method: "POST",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
		data: 'AMT__io__command_line_request=' + encodeURIComponent(JSON.stringify(options_object)),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			// DEBUG
			//
			//
			//~ var rs = response.responseText;
			//~ console.log(rs);
			
			//~ if (response.status != 200) return;
			//~ options_object.responseText = rs;
			//~ callback_function(download_object); // send this back!
		}
	});
	
	// set polling
	// 
	var xint = setInterval(function() {
		GM_xmlhttpRequest({
			method: "POST",
			url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
			data: 'AMT__io__command_line_request__complete=' + encodeURIComponent(JSON.stringify(options_object)),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				if (rs == '') {
					return;
				}
				
				clearInterval(xint);
				
				//~ console.log(rs);
				//~ echo json_encode($files);
				//~ 
				//~ options_object.rs = JSON.parse(rs);
				
				options_object.responseText = rs;
				
				callback_function_complete(options_object); // send this back!
			}
		});
	}, 1000);
}
//
AMT___requests_factory.prototype.io__wget_download_images = function(options_object, callback_function_complete) //
{
	var options_object				= options_object;
	var callback_function_complete	= callback_function_complete;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ +
			'/mturk/util.php?AMT__io__wget_download_images=' +
			'&AMT__io__wget_download_images_filename=' + encodeURIComponent(options_object.filename) +
			'&AMT__io__wget_download_images_website='  + encodeURIComponent(options_object.website),
		onload: function(response) {
			var rs = response.responseText;
			//~ if (response.status != 200) return;
			//~ options_object.responseText = rs;
			//~ callback_function(download_object); // send this back!
		}
	});
	
	// set polling
	// rs = ["\/www.dcmeadows.com\/Portals\/0\/100_3452 button.jpg","\/www.dcmeadows.com\/Portals\/0\/nssl0081.jpg","\/www.dcmeadows.com\/wp-content\/plugins\/social-media-widget\/images\/default\/64\/facebook.png","\/www.dcmeadows.com\/wp-content\/plugins\/floatingsocialmediapopout\/Images\/FBFloat.png","\/www.paypalobjects.com\/en_US\/i\/scr\/pixel.gif","\/www.paypalobjects.com\/en_US\/i\/btn\/btn_buynowCC_LG.gif"]
	var xint = setInterval(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: AMT___POPUP___PROXY_REDACTED_ +
				'/mturk/util.php?AMT__io__wget_download_images__complete=' + 
				'&AMT__io__wget_download_images_filename=' + encodeURIComponent(options_object.filename) +
				'&AMT__io__wget_download_images_website='  + encodeURIComponent(options_object.website),
			onload: function(response) {
				var rs = response.responseText;
				if (response.status != 200) return;
				
				if (rs == '') {
					return;
				}
				
				clearInterval(xint);
				
				console.log(rs);
				//~ echo json_encode($files);
				
				options_object.rs = JSON.parse(rs);
				options_object.responseText = rs;
				
				callback_function_complete(options_object); // send this back!
			}
		});
	}, 1000);
}
//
AMT___requests_factory.prototype.io__download_file = function(download_object, callback_function) //
{
	var download_object = download_object;
	var callback_function = callback_function;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php' + download_object.data,
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			download_object.responseText = rs;
			callback_function(download_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__imagemagick_convert = function(convert_object, callback_function) //
{
	var convert_object = convert_object;
	var callback_function = callback_function;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php' + convert_object.data,
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			convert_object.responseText = rs;
			callback_function(convert_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__AMT__displayPostStrAsHTML = function(str, iframe) //
{
	var iframe = iframe;
	
	//~ var md5 = MT___host + '/mturk/.cached/' + this.general_functions__md5(str);
	//~ console.log(md5);
	
	GM_xmlhttpRequest({
		method: "POST",
		url: MT___host + '/mturk/util.php',
		data: 'AMT__displayPostStrAsHTML='+encodeURIComponent(str),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			iframe.src = rs;
		}
	});
}
//
AMT___requests_factory.prototype.io__write_to_file = function(write_object, callback_function) //
{
	var write_object = write_object;
	var callback_function = callback_function;
	
	var host = (!write_object.host) ? AMT___POPUP___PROXY_REDACTED_ : write_object.host;
	
	GM_xmlhttpRequest({
		method: "POST",
		url: host + '/mturk/util.php',
		data: write_object.data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			
			write_object.responseText	= rs;
			write_object.response		= rs;
			
			callback_function(write_object); // send this back!
		}
	});
}
//
AMT___requests_factory.prototype.io__file_exists = function(filename, callback_function) //
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php?AMT__io_file_exists='+encodeURIComponent(filename),
		onload: function (response) {
			var rs = response.responseText;
			
			if (response.status == 200 && rs == '1') {
				callback_function(true);
			} else {
				callback_function(false);
			}
		}
	});
}
//
AMT___requests_factory.prototype.io__read_file = function(file_object, callback_function) //
{
	//~ var url = MT___host+
			//~ '/mturk/util.php?'+
			//~ encodeURIComponent(skips_key_php_get)+'=';
			
	var file_object = file_object;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: file_object.filename,
		onload: function (response) {
			var rs = response.responseText;
			
			file_object.responseText	= rs;
			file_object.response		= response;
			file_object.status			= response.status;
			
			callback_function(file_object);
			//~ var tmp_skip_sites = rs.split("\n");
			//~ 
			//~ callback_function(tmp_skip_sites);
		}
	});
}
//~ AMT___requests_factory.prototype.io__read_file = function(filename, callback_function) //
//~ {
	//~// var url = MT___host+
			//~// '/mturk/util.php?'+
			//~// encodeURIComponent(skips_key_php_get)+'=';
	//~ GM_xmlhttpRequest({
		//~ method: 'GET',
		//~ url: filename,
		//~ onload: function (response) {
			//~// var rs = response.responseText;
			//~ 
			//~// callback_function(rs);
			//~ var tmp_skip_sites = rs.split("\n");
			//~ 
			//~ callback_function(tmp_skip_sites);
		//~ }
	//~ });
//~ }
//
AMT___requests_factory.prototype.io__send_email = function(email_object, callback_function) //
{
	var email_object = email_object;
	var callback_function = callback_function;
	
	//~ console.log(email_object);
	
	GM_xmlhttpRequest({ 
		method: "POST",
		url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php',
		data: email_object.data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var rs = response.responseText;
			if (response.status != 200) return;
			email_object.responseText = rs;
			callback_function(email_object); // send this back!
		}
	});
	
	//~ var url = MT___host+
			//~ '/mturk/util.php?'+
			//~ encodeURIComponent(skips_key_php_get)+'=';
	//~ GM_xmlhttpRequest({
		//~ method: 'GET',
		//~ url: url,
		//~ onload: function (response) {
			//~ var rs = response.responseText;
			//~ 
			//~ var tmp_skip_sites = rs.split("\n");
			//~ 
			//~ callback_function(tmp_skip_sites);
		//~ }
	//~ });
}
//
AMT___requests_factory.prototype.parse_yahoo_result = function(rs) //
{
	//
	var r = /yschttl spt" href="[^*"]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
	if (!r.exec(rs)) {
		r = /yschttl spt" href="([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
		yahoo_type = 1;
	}
	
	r.lastIndex = 0;
	
	if (r.exec(rs) && rs.indexOf('Including results for') == -1) {
		r.lastIndex = 0;
		var m;
		var x;
		var arr = [];
		while (m = r.exec(rs)) {
			
			// is this ri.search.yahoo.com
			if (m[1].indexOf('http://ri.search.yahoo.com') != -1 && /\/RU=([^\/+])/.exec(m[1])) {
				m[1] = (/\/RU=([^\/]+)/.exec(m[1]))[1];
				m[1] = decodeURIComponent(m[1]);
			}
			else if (yahoo_type == 0)
				m[1] = decodeURIComponent(m[1]);
			
			m[2] = m[2].replace(/<b>/g, '`');
			m[2] = m[2].replace(/<\/b>/g, '``');
			m[2] = m[2].replace(/<[^>]+>/g, ' ');
			m[2] = m[2].replace(/[<>]/g, ' ');
			m[2] = m[2].replace(/``/g, '</b>');
			m[2] = m[2].replace(/`/g, '<b>');
			
			arr.push([
				m[0], m[1], m[2]
			]);
		}
		return arr;
	} else {
		return [];
	}
}
//
AMT___requests_factory.prototype.fs__load_skips_file = function(skips_key_php_get, callback_function) //
{
	var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(skips_key_php_get)+'=';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (response) {
			var rs = response.responseText;
			
			var tmp_skip_sites = rs.split("\n");
			
			callback_function(tmp_skip_sites);
		}
	});
}

/**
 * 
 * AMT___items_factory
 * @
 * @
 * 
 * 
 * create_dashboard__powers_v1__showScrapyResult_contexts
 * create_dashboard__powers_v1
 * create__input_scrapy_button
 * create__input_skip_button2
 * create__input_skip_button
 * 
 */
function AMT___items_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
/**
 * function create_annotation_to_output_fields
 * 
 * @param options_object
 * 		options_object.parent_el
 * 		options_object.keyword_and_index_array
 * @optional
 * 		options_object.url
 * 		options_object.html
 * 		options_object.context_len
 */
AMT___items_factory.prototype.xhr_scrape_page = function(options_object) {
	
	var options_object = options_object;
	
	var out = options_object.parent_el;
	
	var err_status = {
		s: '2px solid orange'
	};
	var err_TimeWarner = {
		i: '<html><head><meta http-equiv="refresh" content="0;url=http://www.dnsrsearch.com/index.php?origURL=', // /etc/hosts?
		m: 'T.W.',
		s: '2px solid orange'
	};
	//~ i: '<html><head><title>Time Warner Cable</title>',
	
	// Make divs
	// Indexes, Context
	var div = document.createElement('div');
	div.setAttribute('style', 'display:block;');
	out.appendChild(div);
	out.xhr_scrape_page__index = div;
	var div = document.createElement('div');
	div.setAttribute('style', 'display:none;');
	out.appendChild(div);
	out.xhr_scrape_page__context = div;
	
	
	// Is this a URL
	// or already downloaded?
	if (options_object.html) {
		parse(options_object.html);
		return;
	} else {
		// do xhr
	}
	
	/**
	 * Function phone_regex
	 */
	function phone_regex(kw) {
		
		kw = kw.replace(/[^\d]/g, '');
		kw_arr = kw.split(''); // [6, 0, 7]
		kw_arr2 = ['.{0,3}']; // START WITH any single character
		for (var i in kw_arr) {
			kw_arr2.push(kw_arr[i]);
			kw_arr2.push('.{0,3}'); // any single character
		}
		kw = kw_arr2.join('');
		
		return kw;
		//~ var regex = new RegExp('([\d\D]{0,6})(' + __js_escape_regEx(kw) + ')([\d\D]{0,6})', 'gi');
	}
	
	/**
	 * Function activate_element
	 */
	function activate_element() {
		
		out.onmouseover = function() {
			this.xhr_scrape_page__context.style.display = 'block';
		}
		out.onmouseout = function() {
			this.xhr_scrape_page__context.style.display = 'none';
		}
		
	}
	
	/**
	 * parse
	 */
	function parse(rs) {
		
		// key -> value
		var kw = options_object.keyword_and_index_array;
		
		var len = (options_object.hasOwnProperty('context_len')) ? options_object.context_len : 6;
		
		console.log(kw);
		
		var foundMatch = false;
		
		for (var index in kw) {
			
			var keyword = kw[index];
			var keyword_reg = kw[index];
			
			// Is phone?
			if (index == 'P') {
				keyword_reg = phone_regex(keyword);
				
			} else {
				keyword_reg = __js_escape_regEx(keyword);
			}
			
			// Regex
			var regex = new RegExp('([\\d\\D]{0,'+len+'})(' + keyword_reg + ')([\\d\\D]{0,'+len+'})', 'gi');
			//~ console.log(regex);
			
			if (!regex.exec(rs))
				continue;
			else
				foundMatch = true; // !
			
			// Add KEY to Index div
			var x = out.xhr_scrape_page__index.innerText;
			x = (x + '|' + index);
			x = x.replace(/^\|/g, '');
			out.xhr_scrape_page__index.innerText = x;
			
			// ...
			// Add CONTEXT to Context div
			regex.lastIndex = 0;
			var m;
			var count = 0;
			while (m = regex.exec(rs)) {
				
				var sp = document.createElement('span');
				sp.setAttribute('style', '');
				sp.innerText = m[1];
				out.xhr_scrape_page__context.appendChild(sp);
				
				var sp = document.createElement('span');
				sp.setAttribute('style', 'font-weight:bold;');
				sp.innerText = m[2];
				out.xhr_scrape_page__context.appendChild(sp);
				
				var sp = document.createElement('span');
				sp.setAttribute('style', '');
				sp.innerText = m[3];
				out.xhr_scrape_page__context.appendChild(sp);
				
				var hr = document.createElement('hr');
				hr.setAttribute('style', 'margin:0;padding:0;border:0;border-bottom:2px dotted #828282;');
				out.xhr_scrape_page__context.appendChild(hr);
				
				//~ out.xhr_scrape_page__context.innerHTML += MT___bold(m[1], [ kw[index] ]);
				
				if (count > 6) // !
					break;
				count++;
			}
		}
		
		if (foundMatch) {
			activate_element();
			return;
		}
	}
		
	/**
	 * xhr
	 */
	//~ console.log(options_object.url);
	GM_xmlhttpRequest({
		method: 'GET',
		url: MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(options_object.url),
		//~ url: options_object.url,
		timeout: 30000,
		ontimeout: function() {
			
		},
		onerror: function() {
			
		},
		onload: function (response) {
			var rs = response.responseText;
			
			// not 200 response.status
			if (response.status > 399) { // 400 - 599
				out.xhr_scrape_page__index.innerText = response.status;
				out.xhr_scrape_page__index.style.border = err_status.s;
				return;
			}
			// not 200 response.responseText
			if (/^[45]\d{2}$/.exec(rs)) { // 400 - 599
				out.xhr_scrape_page__index.innerText = rs;
				out.xhr_scrape_page__index.style.border = err_status.s;
				return;
			}
			
			// Time Warner
			if (rs.indexOf(err_TimeWarner.i) != -1) {
				out.xhr_scrape_page__index.innerText = err_TimeWarner.m;
				out.xhr_scrape_page__index.style.border = err_TimeWarner.s;
				return;
			}
			
			parse(rs);
			
		}
	});
}
/**
 * function create_annotation_to_output_fields
 * Handles buttons/div?/p? mousedown, mouseup events.
 * Handles body.mouseup event.
 * Draggable.
 * Outputs to output_fields in order of NEXT EMPTY.
 * OnMouseUp, focus to output_fields[current].
 * >> Callback function @ mouseup.
 * 
 * @param: {} options_object
 * @param options_object.textToAnnotate = String
 * @param options_object.output_fields = []
 * @param options_object.callback_mouseup = Function
 */
AMT___items_factory.prototype.create_annotation_to_output_fields = function(options_object) {
	
	// vars
	//
	//~ console.log(options_object);
	
	var s = options_object.textToAnnotate.split(' ');
	var array_all_buttons = [];
	var div = makeCont();
	for (var i in s) {
		appendButton(div, s[i], i);
	}
	
	var options_object = options_object;
	
	var output_fields = options_object.output_fields;
	var current_selection = [];
	var current_index = {
		start: 0,
		end: 0
	}
	var isDragging = false;
	
	/**
	 * function body_mouse
	 * This will set isDragging to false!
	 * 
	 */
	//~ document.body.addEventListener('mousedown', body_mouse, false); // ?
	document.body.addEventListener('mouseup', body_mouse, false);
	function body_mouse() {
		
		// If isDragging is true then
		// reset the hover color!
		if (isDragging) {
			console.log(current_index);
			console.log(array_all_buttons[current_index.start]);
			array_all_buttons[current_index.start].style.backgroundColor = '';
		}
		isDragging = false;
	}
	//~ document.body.onmousedown = document.body.onmouseup = function() {
	
	// return for *append*
	return div;
	
	
	/**
	 * function applyToOutputs
	 *
	 */
	function applyToOutputs() {
		
		var s = '';
		if (current_index.start <= current_index.end) { // ++
			for (var i = current_index.start; i <= current_index.end; i++) {
				array_all_buttons[i].style.backgroundColor = 'LightGreen';
				s += ' ' + array_all_buttons[i].full_text;
			}
		} else { // --
			for (var i = current_index.end; i <= current_index.start; i++) {
				array_all_buttons[i].style.backgroundColor = 'LightGreen';
				s += ' ' + array_all_buttons[i].full_text;
			}
			
			// THIS WOULD PUT IT IN REVERSE!
			// As in "cat black the" instead of
			// "the black cat".
			//for (var i = current_index.start; i >= current_index.end; i--) {
		}
		s = s.trim();
		
		for (var i in output_fields) {
			if (output_fields[i].value == '') {
				output_fields[i].value = s;
				output_fields[i].focus();
				output_fields[i].select();
				output_fields[i].select();
				
				if (options_object.callback_mouseup) {
					options_object.callback_mouseup(output_fields[i]);
				}
				break;
			}
		}
	}
	
	/**
	 * function add_index
	 */
	function add_index(new_index) {
		
		current_index.end = new_index;
		
		// DON'T DO THIS! ALWAYS SAY THAT THE
		// START IS THE FIRST BUTTON CLICKED.
		//~ // Is this less than the beginning?
		//~ // Does this button come before .start?
		//~ // If so then this button becomes .start
		//~ // and .start becomes .end
		//~ // Otherwise, set new_index to be .end.
		//~ if (new_index < current_index.start) {
			//~ current_index.end   = current_index.start;
			//~ current_index.start = new_index;
		//~ } else 
			//~ current_index.end = new_index;
		
	}
	/**
	 * function appendButton
	 * Append button with "text" and "index" to "div"
	 * 
	 * 
	 * @param: div
	 * @param: text
	 * @param: index
	 */
	function appendButton(div, text, index) {
		
		var t = document.createElement('button');
		t.setAttribute('style', 'border-radius:2px;');
		t.index = index;
		t.innerHTML = text;
		t.full_text = text;
		
		t.onmousedown	= function() {
			
			this.style.backgroundColor = 'LightGreen';
			current_index.start = this.index;
			current_index.end   = this.index;
			
			//~ isActive = true;
			isDragging = true;
		}
		
		t.onmouseup		= function() {
			
			// Only apply if... isDragging?
			//
			//
			if (isDragging) {
				add_index(this.index);
				
				isDragging = false;
				
				applyToOutputs();
			}
			
		}
		
		t.onmouseover	= function() {
			
			// Highlight
			// from index.start to index.end
			
			if (isDragging) {
				
				add_index(this.index);
				
				//~ console.log('this:'+this.index);
				//~ console.log(current_index);
				
				if (current_index.start <= current_index.end) {
					for (var i = current_index.start; i <= current_index.end; i++) {
						array_all_buttons[i].style.backgroundColor = 'LightGreen';
					}
				} else {
					for (var i = current_index.start; i >= current_index.end; i--) {
						array_all_buttons[i].style.backgroundColor = 'LightGreen';
					}
				}
				//~ for (var i = current_index.start; i <= current_index.end; i++) {
					//~ array_all_buttons[i].style.backgroundColor = 'LightGreen';
				//~ }
			}
		}
		
		t.onmouseout	= function() {
			
			if (isDragging) {
				// RESET ALL HOVER COLOR!
				if (current_index.start <= current_index.end) {
					for (var i = current_index.start; i <= current_index.end; i++) {
						array_all_buttons[i].style.backgroundColor = '';
					}
				} else {
					for (var i = current_index.start; i >= current_index.end; i--) {
						array_all_buttons[i].style.backgroundColor = '';
					}
				}
				
				// Reset the index.end to whatever
				// is the index.start.
				// And then *just* the initial word
				// is to have background color.
				current_index.end = current_index.start;
				array_all_buttons[current_index.start].style.backgroundColor = 'LightGreen';
			}
			
		}
		
		// append here
		div.appendChild(t);
		
		// push here
		array_all_buttons.push(t);
	}
	
	/**
	 * function makeCont
	 * Container for all the buttons.
	 */
	function makeCont() {
		
		var d = document.createElement('div');
		d.setAttribute('style', 'width:100%;');
		//~ d.setAttribute('style', 'display:inline;');
		
		return d;
	}
	
}
// switch select field of d1
AMT___items_factory.prototype.create_dashboard__powers_v1__showScrapyResult_contexts = function(results_array, out_div, seed_object) {
	//var out_div = d1;
	
	var old_divs = out_div.getElementsByTagName('div');
	for (var i = old_divs.length - 1; i>=0; i--) {
		old_divs[i].parentNode.removeChild(old_divs[i]);
	}
	
	var email_contexts = results_array.email_contexts;
	var url = results_array.url;
	
	var el_div = document.createElement('div');
	el_div.setAttribute('style','width:100%;height:40px;overflow:auto;border:1px solid #a2a2a2;');
	el_div.innerText = url;
	
	var el_a = document.createElement('a');
	el_a.href = url;
	el_a.target = '_blank';
	el_a.innerText = url;
	el_div.appendChild(el_a);

	out_div.appendChild(el_div);
	
	// ...
	var input_send_success		= (seed_object.input_send_success)		? seed_object.input_send_success : document.getElementById('Q1Url'); // default Q1Url
	
	var do_submit_callback		= (seed_object.do_submit_callback)		? seed_object.do_submit_callback : doSubmit;
	
	var input_onclick_callback	= (seed_object.input_onclick_callback)	? seed_object.input_onclick_callback : false;
	
	
	// ...
	for (var j in email_contexts) {
		var context = email_contexts[j]	.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
		context = __js_clean_html_str(context);
		context = context				.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
		//context = context.replace(/[\r\n]/g, '<br>');
		context = context.replace(/\t/g, '&nbsp;&nbsp;');
		context = context.replace(/\s{2,}/g, '&nbsp;&nbsp;');
		context = context.replace(
			new RegExp('(' + __js_escape_regEx(results_array.email_email) + ')', 'gi'),
			'<span style="zoom:1.2;color:DarkGreen;">$1</span>'
		);
		//context = MT__bold(context, NAME_ARRAY);
		
		var el_div = document.createElement('div');
		el_div.setAttribute('style','cursor:pointer;width:100%;border-bottom:1px dashed #626262;');
		//el_div.setAttribute('style','cursor:pointer;min-width:400px;width:60%;height:140px;overflow:auto;border:1px solid #a2a2a2;');
		//newDiv.setAttribute('style','border-bottom:1px dashed #626262;margin:0;padding:0;cursor:pointer;');
		
		

		el_div.innerHTML = context;
		el_div.email = results_array.email_email;
		el_div.complete = results_array.email_email;
		el_div.url = url;

		
		//input_success
		el_div.input_send_success	= input_send_success;
		
		//do_submit_callback
		el_div.do_submit_callback	= do_submit_callback;
		
		//onclick
		if (!input_onclick_callback) {
			el_div.onclick = function() {
				this.style.backgroundColor = 'LightGreen';
					
				this.input_send_success.value = this.email;
				if (this.email.length > 6 && this.email.indexOf('@') != -1 && this.input_send_success && this.input_send_success.value == this.email) {
					
					this.do_submit_callback();
					//~ doSubmit();
				
				}
				
				//this.style.border = '8px solid LightGreen';
			}
		}
		else
		{
			el_div.onclick = input_onclick_callback;
		}
		
		out_div.appendChild(el_div);
	}
	
	//extend page
	var el_div = document.createElement('div');
	el_div.setAttribute('style','height:1400px;');
	out_div.appendChild(el_div);
}
// callback_function(jobid, callback_obj, seed_object);
// IS NOT REQUIRED !! jobid !! IS NOT REQUIRED
AMT___items_factory.prototype.create_dashboard__powers_v1 = function(object_response, seed_object)// dashboard/area
{
	//@callback_function: Return 1) scrapyd jobid, 2) response_object, 3) seed_object 
	//~ var req = new AMT___requests_factory();
	//~ AMT___POPUP__initializeGlobals(
		//~ function() {
			//~ req.scrapy__begin_scrape(//parameters_object, callback_function, seed_object
				//~ s_obj,
				//~ Max_Powers_eventbrite__showScrapyResult
				//~ (new AMT___items_factory).create_dashboard__powers_v1
			//~ );
		//~ }
	//~ );
		
	// jobid, object_response, seed_object
	// RESULTS
	//var object_response = ALL_SCRAPES[d3.selectedIndex].object_response; // [] array !!
	
	var out_div = seed_object.div;
	
	out_div.innerHTML = '';
	
	// DEFAULT SKIP WHEN AVAILABLE IF NO EMAILS !!!
	//
	//
	//~ if (AMT__Global_Vars.isPreview) {
		//~ if (object_response.matches.length == 0) {
			//~ AMT___Floater.skip();
			//~ return;
		//~ } else {
			//~ AMT___Floater.accept();
			//~ return;
		//~ }
	//~ }
	
	// matches select
	var el_select = document.createElement('select');
	out_div.appendChild(el_select);
	el_select.setAttribute('style','width:98%;height:120px;');//display:inline;
	el_select.multiple = 'multiple';
	el_select.main_div = out_div;
	el_select.seed_object = seed_object;
	el_select.onchange = function() {
		if (this.value == '') return;
		
		(new AMT___items_factory())
			.create_dashboard__powers_v1__showScrapyResult_contexts(
				this.options[this.selectedIndex].results_array,
				this.main_div,
				this.seed_object
			);
		//create_dashboard__powers_v1__showScrapyResult_contexts
		//~ Max_Powers_eventbrite__showScrapyResult_contexts(
			//~ this.options[this.selectedIndex].results_array
		//~ );
	}
	for (var i in object_response.matches) {
		rslt = object_response.matches[i];
		// add option
		el_option = document.createElement('option');
		el_option.value = rslt.email_email;
		el_option.innerText = rslt.email_email;
		// email highlight !!
		console.log(rslt.url);
		if (/https?:\/\/([^\.]+\.|)facebook.com[\/$]/i.exec(rslt.url)) { //https://www.facebook.com/voltvapes1/info 
			el_option.setAttribute('style', 'background-color:LightGreen;');
		}
		el_option.results_array = rslt;
		el_select.appendChild(el_option);
	}
	for (var i = 0; i<20; i++) {// append blank lines!
		// add option
		el_option = document.createElement('option');
		el_option.value = '';
		el_option.innerText = '';
		el_select.appendChild(el_option);
	}
	
	// urls select
	var el_select2 = document.createElement('select');
	out_div.appendChild(el_select2);
	el_select2.setAttribute('style','width:98%;height:120px;');
	el_select2.multiple = 'multiple';
	el_select2.onclick = function() {
		if (this.value == '') return;
		window.open(this.value,'new');
	}
	//for (var i in object_response.urls) {
	//console.log(object_response.urls.complete_high_to_low);
	for (var i in object_response.urls.complete_high_to_low) {
		
		rslt = object_response.urls.complete_high_to_low[i]; // {.url, .priority}
		
		// add option
		el_option = document.createElement('option');
		el_option.value = rslt.url;
		el_option.innerText = rslt.url;
		// color
		var bg;
		switch(rslt.priority) {
			case 'high':
				bg = 'LightGreen';
				break;
			case 'low':
				bg = 'Orange';
				break;
			case 'none':
				bg = '#fff';
				break;
			case 'outside':
				bg = 'pink';
				break;
		}
		el_option.setAttribute('style', 'background-color:'+bg+';');
		el_select2.appendChild(el_option);
	}
	for (var i = 0; i<20; i++) {// append blank lines!
		// add option
		el_option = document.createElement('option');
		el_option.value = '';
		el_option.innerText = '';
		el_select2.appendChild(el_option);
	}
	
	// auto-click first email
	if (object_response.matches.length > 0) {
		(new AMT___items_factory())
			.create_dashboard__powers_v1__showScrapyResult_contexts(
				el_select.options[0].results_array,
				out_div,
				seed_object
			);
		//~ Max_Powers_eventbrite__showScrapyResult_contexts(
			//~ el_select.options[0].results_array
		//~ );
	}
	
	// br
	out_div.appendChild(document.createElement('br'));
}
//~ AMT___items_factory.prototype.create_element__textarea = function()// X: pass reference
//~ {
	//~ 
//~ }
AMT___items_factory.prototype.create__input_scrapy_button = function(short_domain,full_url,object_options,callback_function)// X: pass reference
{
	
	//short_domain,full_url,object_options,callback_function
						// options
						//Daniel_Axelsen_Find_Email__scrape_btn_options(this.value.trim()*1, this.short_domain, start_urls), 
						// callback
						//Daniel_Axelsen_Find_Email__scrapy_process_response, // arg= scrapy_jobid, array_json_list, seed_object
						// callback seed object
		
	var btnValue = object_options.arg_max_pages_to_fetch;
	var btnClass = 'class__scrapyURL__'+btnValue+'_'+short_domain;
	
	// 4,8,12,20
	var el_inp = document.createElement('input');
	el_inp.setAttribute('style','width:auto;');
	el_inp.setAttribute('type','button');
	
	el_inp.setAttribute('class',btnClass);
	el_inp.value = ' '+btnValue+' ';
	el_inp.arg_max_pages_to_fetch = btnValue;
	el_inp.short_domain = short_domain;
	el_inp.full_url = full_url;
	
	el_inp.scrapy__array_json_list = '';
	el_inp.scrapy__complete_id = '';
	
	el_inp.scrapy_opts_object = object_options;
	el_inp.scrapy_callback_function = callback_function;
	
	// id
	//~ el_inp.id = 
	
	el_inp.onclick = function(e) {
		//this.style.backgroundColor = 'LightGreen';
		
		// return if run once (!= '')
		if (this.scrapy__complete_id != '')
			return;
		
		// set complete id
		this.scrapy__complete_id = 'x';
		
		// make the list of starting URLs !!
		// and add to scraper object
		var start_urls = [];
		var url;
		var s = document.getElementsByClassName(this.className);
		for (var i in s) {
			if (i == 'length') break;
			url = s[i].full_url; // !!
			if (!__js_inarray(start_urls, url))
				start_urls.push(url);
			// update all background colors
			s[i].style.backgroundColor = 'LightGreen';
		}
		this.scrapy_opts_object.arg_start_urls = start_urls; // array
		
		//var className = 'class__scrapyURL__'+this.arg_max_pages_to_fetch+'_' + this.short_domain;
		//var s = document.getElementsByClassName(className);
		
		// requests factory
		var requests_factory = new AMT___requests_factory();
		
		requests_factory.scrapy__begin_scrape(
			
			this.scrapy_opts_object,
			
			this.scrapy_callback_function,
			{
				btn_className: this.className //,
			}
		);
		
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	
	return el_inp;
}
/**
 * domain: x,
 * load_file: 'austin_load_skips', 
 * var_skip_sites: SKIP_SITES, 
 * callback_function: false
 * 		
 * Returns an input element and bool()
 * 	{}.el_btn,
 * 	{}.isSkip
**/
AMT___items_factory.prototype.create__input_skip_button2 = function(input_skips_object) // X: pass reference
{	
	
	var input_skips_object = input_skips_object;
	
	//~ input_skips_object.short_domain = '';
	
	// ...
	// regular = ^http://www.site.com$
	// subdomains = [\.\/]site.com$
	//
	// Submdomains, update Jul9.
	// subdomains = period, comp name, period, any numer of 2-3 length extensions
	var x;
	//~ if (x = /\.([^\.]+\.[^\.]+)$/.exec(input_skips_object.domain)) {
	//
	//
	
	//http://stackoverflow.com/questions/10306690/domain-name-validation-with-regex
	var reg_domain =
		//~ '^' +
		'(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))' +
		'\\.' + 
		'([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\\.[a-zA-Z]{2,3})' +
		'$';
	
	// THIS WILL RETURN:
	// ["www.linkedin.com", "www", undefined, undefined, undefined, undefined, "www", "linkedin.com", index: 7, input: "http://www.linkedin.com"]
	if (x = new RegExp(reg_domain, '').exec(input_skips_object.domain)) {
		
		// =>8
		if (x[7].indexOf('.') != -1)
			input_skips_object.short_domain = x[7].trim();
		else
			input_skips_object.short_domain = input_skips_object.domain.trim();
		
	} else
		input_skips_object.short_domain = input_skips_object.domain.trim();
	
	//~ input_skips_object.short_domain = x[1].trim();
	
	
	// ...
	function remove_skips(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.style.backgroundColor = 'LightGreen';
		this.onclick = function(){};
		var btn = this;
		
		var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(input_skips_object.load_file)+'='+
			'&load_skips_domain_full='+
			encodeURIComponent(input_skips_object.domain) +
			'&load_skips_domain_short='+
			encodeURIComponent(input_skips_object.short_domain) +
			'&load_skips_removeMe=';
			
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				var rs = response.responseText;
				btn.value = '---X---';
				
				//skip_sites_callback(btn.id);
			}
		});
		
		return false;
	}
	function write_skips(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.style.backgroundColor = 'LightGreen';
		this.onclick = function(){};
		var btn = this;
		
		var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(input_skips_object.load_file)+'='+
			encodeURIComponent(input_skips_object.short_domain);
			
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				var rs = response.responseText;
				btn.value = '---X---';
				
				//skip_sites_callback(btn.id);
			}
		});
		
		return false;
	}
	function add_button(url) {
		var el_inp = document.createElement('input');
		el_inp.setAttribute('style','width:auto;');
		el_inp.setAttribute('type','button');
		el_inp.value = ' S ';
		//~ el_inp.className = 
		//~ el_inp.id = url; //argv
		//~ el_inp.skips_key_php_get = skips_key_php_get; //argv
		el_inp.onclick = write_skips;
		
		return el_inp;
	}
	function remove_button() { //url
		//~ 
		var el_inp = document.createElement('input');
		el_inp.setAttribute('style','width:auto;background-color:#eee;border:0;cursor:pointer;');
		el_inp.setAttribute('type','button');
		el_inp.value = '>' + input_skips_object.domain;
		el_inp.className = 'input_skip_button2_rm_';
		//~ el_inp.value = 'x>' + url;
		//~ el_inp.id = url; //argv
		//~ el_inp.skips_key_php_get = skips_key_php_get; //argv
		el_inp.onclick = remove_skips;
		
		return el_inp;
	}
	
	// ERR: SHORT_DOMAIN IS "com" !!!
	//~ console.log(input_skips_object);
	
	// Is this a skip?	
	if  (
		input_skips_object.var_skip_sites.hasOwnProperty( input_skips_object.short_domain ) ||
		input_skips_object.var_skip_sites.hasOwnProperty( input_skips_object.domain )
		)
	{
		return {
			el_btn: remove_button(),
			isSkip: true
		};
	}
	
	// This is not a skip.
	return {
		el_btn: add_button(),
		isSkip: false
	};
	
	//~ return el_inp; // return >to append
}
// DONE XXTODO: REMOVE FROM FILE
AMT___items_factory.prototype.create__input_skip_button = function(url, skips_key_php_get, skip_sites_callback) // X: pass reference
{	
	
	var el_inp = document.createElement('input');
	el_inp.setAttribute('style','width:auto;');//background-color:#efefef;
	el_inp.setAttribute('type','button');
	el_inp.value = ' S ';
	el_inp.id = url; //argv
	el_inp.skips_key_php_get = skips_key_php_get; //argv
	el_inp.onclick = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		this.style.backgroundColor = 'LightGreen';
		var btn = this;
		this.onclick = function(){};
		
		var short_domain = this.id;
		if (y = /[\.\/]([^\.\/]{4,}\.[^\.]+)$/.exec(short_domain)) { // 4 or more! i.e. webs.com, not tw.co, not abc.co.uk
			short_domain = y[1];
		}
		//~ else
			//~ short_domain = x;
		short_domain = short_domain.replace(/^https?:\/\/(www\.|)/i, '');
		
		//short_domain = 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxtest';
		
		var url = MT___host+
			'/mturk/util.php?'+
			encodeURIComponent(this.skips_key_php_get)+'='+
			encodeURIComponent(short_domain); //?austin_load_skips
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				var rs = response.responseText;
				btn.value = '---X---';
				
				skip_sites_callback(btn.id);
			}
		});
		return false;
	}
	
	
	return el_inp; // return >to append
}
/**
 * AMT___xhr_PROXY_REDACTED_
 * @
 * @
 * 
 * @AMT___POPUP___PROXY_REDACTED_ XXXX, @>AMT___POPUP__initializeGlobals  **get the @AMT___POPUP___PROXY_REDACTED_ value before continuing
 */
function AMT___xhr_PROXY_REDACTED_(obj_vars) {
	
	// : url
	// : seed_arg1
	// : catch_include
	
	this.obj_vars = (typeof obj_vars == 'object') ? obj_vars : {};
	
	if (!this.obj_vars.url) // URL REQUIRED
		return;
		
	if (!this.obj_vars.catch_include) // DEFAULT
		this.obj_vars.catch_include = 'Yahoo! - 999 Unable to process request at this time -- error 999';
	
	this.encodedURI = encodeURIComponent(this.obj_vars.url);
	
	// INITIALIZE AMT___POPUP___PROXY_REDACTED_ BEFORE!
	this.proxy_init = function() {
		var this_tmp = this;
		AMT___POPUP__initializeGlobals(
			function() {
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?u='+this_tmp.encodedURI+'&catch_include='+encodeURIComponent(this_tmp.obj_vars.catch_include),
					onload: function(response) {
						//var rs = response.responseText;
					}
				});
			}
		);
	}
	
	this.proxy_waitComplete = function(callback_function) {
		var this_obj = this;
		//console.log(this);return;
		var xint = setInterval(function() {
			GM_xmlhttpRequest({ // init
				method: "GET",
				url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+ this_obj.encodedURI,
				onload: function(response) {
					var rs = response.responseText;
					
					if (rs.trim() != '') {
						clearInterval(xint);
					} else
						return;
					
					// yahoo? (yahoo_array: true)
					if (this_obj.obj_vars.yahoo_array) {
						rs = this_obj.array_yahoo_results(rs);
					}
					
					// ...
					if (this_obj.obj_vars.return_init_object) {
						this_obj.rs = rs;
						callback_function(this_obj);
					}
					else if (this_obj.obj_vars.seed_arg1)
					{
						callback_function(rs, this_obj.obj_vars.seed_arg1);
					}
					else
						callback_function(rs);
					
					//alert('x');
					//
				}
			})
		}, 1200);
	}
	
	// -> returns array of arrays
	// -> [ [m[1],m[2]], [m[1], m[2]] ]
	this.array_yahoo_results = function(rs) {
				
		//
		var r = /yschttl spt" href="[^*"]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
		if (!r.exec(rs)) {
			r = /yschttl spt" href="([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
			yahoo_type = 1;
		}
		
		r.lastIndex = 0;
		
		if (r.exec(rs) && rs.indexOf('Including results for') == -1) {
			r.lastIndex = 0;
			var m;
			var x;
			var arr = [];
			while (m = r.exec(rs)) {
				
				// Change Jul8
				// Coming in as r.search.yahoo.com rather than ri.search.yahoo.com.
				//
				//
		
				// Is this ri.search.yahoo.com?
				if  (
					/^http:\/\/ri?\.search\.yahoo\.com\//.exec(m[1]) &&
					/\/RU=([^\/+])/.exec(m[1])
					)
				{
					m[1] = (/\/RU=([^\/]+)/.exec(m[1]))[1];
					m[1] = decodeURIComponent(m[1]);
				}
				else if (yahoo_type == 0)
					m[1] = decodeURIComponent(m[1]);
				
				m[2] = m[2].replace(/<b>/g, '`');
				m[2] = m[2].replace(/<\/b>/g, '``');
				m[2] = m[2].replace(/<[^>]+>/g, ' ');
				m[2] = m[2].replace(/[<>]/g, ' ');
				m[2] = m[2].replace(/``/g, '</b>');
				m[2] = m[2].replace(/`/g, '<b>');
				
				arr.push([
					m[1], m[2]
				]);
			}
			return arr;
		} else {
			return [];
		}
	}
}

/*
 * function MT___getInputSelection()
 * 
 * Replace selected text (Range).
 * In a textarea with selected text.
 */
function MT___getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }
    return {
        start: start,
        end: end
    };
}
function MT___replaceSelectedText(element, text) {
    var sel = MT___getInputSelection(element);
    var val = element.value;
    element.value =
		val.slice(0, sel.start) +
		text +
		val.slice(sel.end);
}
function MT___HTMLParser(aHTMLString){
	var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null);
	var body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
	html.documentElement.appendChild(body);
	
	body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
		.getService(Components.interfaces.nsIScriptableUnescapeHTML)
		.parseFragment(aHTMLString, false, null, body)
	);
	return body;
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
}
//
// function GM_addStyle()
//
function GM_addStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

/**
 * functions for POPUP
 * 
 * @global  MT__DOSUBMIT__USER_SET_TYPE
 * 
 * Read from extension's background page [localstorage] value
 * 
**/
//
var MT__DOSUBMIT__USER_SET_TYPE = 'regular'; // var to set by user! Types are "regular" and "server side"; default "regular".
//
var AMT___POPUP___PROXY_REDACTED_			= MT___host; // default is MT___host!
var AMT___POPUP__doSubmitServerHost	= MT___host; // // !! THIS IS AS OF YET UNDEFINED !! // //

function AMT___POPUP__initializeGlobals(callback_function) {
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__USER_SET_TYPE"
		},
		function(response) {
			if (response) {
				try {
					if (!response.data)
					{
						//
					}
					
					var r = JSON.parse(response.data); // { data: "{}" } or { data: "{ type: "" }" }
				
					//{ type: "[regular OR server side]" }
					//~ if (r.type == 'server side') {
						//~ MT__DOSUBMIT__USER_SET_TYPE = 'server side';
					//~ }
					
					if (r.type) {
						MT__DOSUBMIT__USER_SET_TYPE = r.type;
					}
					if (r._PROXY_REDACTED_ && r._PROXY_REDACTED_.length > 6) {
						AMT___POPUP___PROXY_REDACTED_ = r._PROXY_REDACTED_;
						AMT___POPUP___PROXY_REDACTED_ = r._PROXY_REDACTED_;
					}
					if (r.doSubmitServerHost && r.doSubmitServerHost.length > 6) { // // !! THIS IS AS OF YET UNDEFINED !! // //
						AMT___POPUP__doSubmitServerHost = r.doSubmitServerHost;
						//~ AMT___POPUP__doSubmitServerHost = r.doSubmitServerHost;
					}
				}
				catch(e)
				{
					console.log('Alert, AMT___POPUP__initializeGlobals :: !response.data');
				}
			} else {
				if (!response)
					console.log('Alert, AMT___POPUP__initializeGlobals :: !response');
				else
					console.log('Alert, AMT___POPUP__initializeGlobals :: !response.data');
			}
			
			if (callback_function)
				callback_function();
		}
	);
}
AMT___POPUP__initializeGlobals();
/**
 * function doSubmit() 
 * & global vars
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
//
var MT__DOSUBMIT__MIN_SUBMIT_TIME = 2200;
// give this a submit ID
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var xid = '_';
var i;
for (i = 0; i <= 4; i++) {
	xid += chars[Math.floor(Math.random()*chars.length)];
}
MT__DOSUBMIT__BY_ID_THIS_ID = xid;
//~ /**
 //~ * function doSubmit__getUserSetType()
 //~ * 
 //~ * @global  MT__DOSUBMIT__USER_SET_TYPE
 //~ * 
 //~ * Read from extension's background page [localstorage] value
 //~ */
//~ function doSubmit__getUserSetType() {
	//~ chrome.extension.sendRequest(
		//~ {
			//~ method: "getLocalStorage",
			//~ key: "MT__DOSUBMIT__USER_SET_TYPE"
		//~ },
		//~ function(response) {
			//~ if (response.data) {
				//~ var r = JSON.parse(response.data); // { data: "{}" } or { data: "{ type: "" }" }
				//~ 
				//~ //{ type: "[regular OR server side]" }
				//~ 
				//~ if (r.type == 'server side') {
					//~ MT__DOSUBMIT__USER_SET_TYPE = 'server side';
				//~ } else { // default is local
					//~ 
				//~ }
			//~ } else {
				//~ 
			//~ }
		//~ }
	//~ );
//~ }
//~ // ACTIVATE THIS!
//~ doSubmit__getUserSetType();
/**
 * function doSubmit__serverSide()
 * 
 * @global  MT__DOSUBMIT__FORM
 * @global  MT__DOSUBMIT__LOCATION
 * @global  MT__DOSUBMIT__CALLBACK_FUNCTION
 * @param
 */
function doSubmit__serverSide(form, location, callback_function, offsetTime) {

	
	
	/**
	 * OPTIONAL PARAMETERS. THESE ARE SET FROM doSubmit OR ELSE
	 * THEY MAY BE SET HERE.
	 */
	// which form to submit
	if (!form)
		MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	else if (document.getElementById(form))
		MT__DOSUBMIT__FORM = document.getElementById(form);
	else if (document.getElementsByName(form)[0])
		MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	
	// debug
	if (MT___TEST_DEBUG) {
		var d = new Date();
		MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	}
	
	// set global vars
	MT__DOSUBMIT__LOCATION = location;
	MT__DOSUBMIT__CALLBACK_FUNCTION = callback_function;
	
	// Exit if err
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION != 'function') {
			alert('noSubmit(return time_to_submit) is now callback_function(time_to_submit)');
			return;
		}
	}
	/**
	 * END OPTIONAL PARAMETERS.
	 */
	
	GM_xmlhttpRequest({
		method: "GET",
		url: MT___host + '/mturk/util.php?AMT__doSubmit__serverSide_read=',
		timeout: 2000,
		onload: function(response) {
			var rs = response.responseText;
			
			// if status is not 200 then submit regular,
			// with the browser's **local storage**
			if (response.status != 200) {
				MT__DOSUBMIT__USER_SET_TYPE = 'regular';
				doSubmit(form, location, callback_function, offsetTime, false); // ** set doServerSideSubmit = false **
				return;
			}
			
			// still here?
			console.log(rs);
			// response is "time:\d+([:response.data:])"
			var serverSide_currentTime;
			var split = /^time:([\d\.]+)([^$]*)$/.exec(rs);
			serverSide_currentTime = Math.round(split[1]);
			rs = split[2];
			var arr_all_submits = AMT__doSubmit__editSubmitArray(rs, offsetTime, serverSide_currentTime);
			
			//
			console.log('submit queue (server!):'	+arr_all_submits.length);
			console.log('time_to_submit:'			+MT__DOSUBMIT__TIME_TO_SUBMIT);
			console.log('ID:'						+MT__DOSUBMIT__BY_ID_THIS_ID);
			console.log(arr_all_submits);
			
			// write submits to file!
			GM_xmlhttpRequest({
				method: "POST",
				url: MT___host + '/mturk/util.php',
				data: 'AMT__doSubmit__serverSide_write='+encodeURIComponent(JSON.stringify(arr_all_submits)),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					var rs = response.responseText;
					
					if (response.status != 200) {
						alert('write failed! doSubmit__serverSide');
						return;
					}
					
					// go to submit 2
					// does: callback (if necessary), setTimeout, and then submit
					doSubmit_2();
				}
			});
		}
	});
}
/**
 * function AMT__doSubmit__editSubmitArray()
 * - This function will set the global variable ~MT__DOSUBMIT__TIME_TO_SUBMIT
 * 
 * @global  MT__DOSUBMIT__TIME_TO_SUBMIT
 * @global  MT__DOSUBMIT__BY_ID_THIS_ID
 * @global  MT__DOSUBMIT__MIN_SUBMIT_TIME
 * @param	data
 * @param	offsetTime
 * @param	serverSide_currentTime - if this is server side doSubmit then use the server's current time
 * 
 * returns: array[] arr_all_submits
 */
function AMT__doSubmit__editSubmitArray(data, offsetTime, serverSide_currentTime) {
	
	if (offsetTime == undefined)
		offsetTime = 0;
		
	console.log(data);
	console.log('offsetTime '+offsetTime);
	
	var arr_all_submits = data;
		
	MT__DOSUBMIT__TIME_TO_SUBMIT = 0;
	
	//
	var currentTime;
	// set currentTime (milliseconds)
	if (serverSide_currentTime) {
		currentTime = serverSide_currentTime;
	} else {
		var d = new Date();
		currentTime = d.getTime();
	}
	
	// is blank or false
	if (!arr_all_submits || arr_all_submits == '') {
		// add this
		arr_all_submits = [{'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : currentTime}];
	}
	// else JSON.parse
	else {
		
		arr_all_submits = JSON.parse(arr_all_submits);
		
		var i;
		
		// remove err
		for (i = arr_all_submits.length-1; i >= 0; i--) {
			if  (
				!arr_all_submits[i].time_to_submit ||
				arr_all_submits[i].time_to_submit == null ||
				arr_all_submits[i].time_to_submit == NaN ||
				arr_all_submits[i].time_to_submit == undefined
				)
			{
				arr_all_submits.splice(i, 1); // index, howmany
			}
		}
		
		var changed = false;
		var last = false;
		var addThis = true;
		var x;
		var submitTime = MT__DOSUBMIT__MIN_SUBMIT_TIME + ((offsetTime) ? offsetTime : 0);
		
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
		for (i = arr_all_submits.length-1; i >= 0; i--) { // is this already added?
			if (arr_all_submits[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
				arr_all_submits.splice(i, 1); // Aug. 5 // Remove previous
			}
		}
		//XX
		//XX
		
		/**
		 * Find time to submit and remove older than 2100
		 * 
		 */
		for (i = arr_all_submits.length-1; i >= 0; i--) {
			//console.log(arr_all_submits[i].time_to_sumbit);
			
			x = arr_all_submits[i].time_to_submit; // A TIME IN THE FUTURE // unix time, in millisenconds
			
			x*= 1;
			
			if (x < currentTime - submitTime) {
				arr_all_submits.splice(i, 1);
			}
			else if (x + submitTime < currentTime) {
				arr_all_submits.splice(i, 1); // index, howmany
			}
			else if (!last) { // 
				last = true;
				MT__DOSUBMIT__TIME_TO_SUBMIT = x + submitTime;
			}
			
		}
		
		if (MT__DOSUBMIT__TIME_TO_SUBMIT == 0) {
			MT__DOSUBMIT__TIME_TO_SUBMIT = currentTime;
		}
		
		// add this
		if (addThis) {
			// push
			arr_all_submits.push({'id' : MT__DOSUBMIT__BY_ID_THIS_ID, 'time_to_submit' : MT__DOSUBMIT__TIME_TO_SUBMIT}); // add this
		}
		
		// change to seconds until submit
		MT__DOSUBMIT__TIME_TO_SUBMIT = MT__DOSUBMIT__TIME_TO_SUBMIT - currentTime; // 20s in future, - now = 20s
	}
	
	// return array
	return arr_all_submits;
}
/**
 * function doSubmit()
 */
function doSubmit(form, location, callback_function, offsetTime, doServerSideSubmit) {
	// form to submit, or window.location, or add to queue (with noSubmit)
	// & return time_to_submit, offsetTime(x) > regularInterval+x
	
	if(!AMT__Global_Vars.isPreview) {
		chrome.extension.sendRequest(
			{
				doSubmitChangeTabIcon: true
			},
			function(response) {
				//Squelch response
			});
	}
	
	
	// which form to submit
	if (!form)
		MT__DOSUBMIT__FORM = document.getElementById('mturk_form');
	else if (document.getElementById(form))
		MT__DOSUBMIT__FORM = document.getElementById(form);
	else if (document.getElementsByName(form)[0])
		MT__DOSUBMIT__FORM = document.getElementsByName(form)[0];
	
	// debug
	if (MT___TEST_DEBUG) {
		var d = new Date();
		MT___TEST_DEBUG_start_time = d.getTime() / 1000;
	}
	
	// set global vars
	MT__DOSUBMIT__LOCATION = location;
	MT__DOSUBMIT__CALLBACK_FUNCTION = callback_function;
	
	// Exit if err
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION != 'function') {
			alert('noSubmit(return time_to_submit) is now callback_function(time_to_submit)');
			return;
		}
	}
	
	// server side?
	if (
		doServerSideSubmit
	) {
		doSubmit__serverSide(form, location, callback_function, offsetTime, doServerSideSubmit);
		return;
	}
	/**
	 * Is this server side from __user set__?
	 * This will be set to "regular" if "server side" receives !200 response
	 * @var MT__DOSUBMIT__USER_SET_TYPE
	 */
	if (
		MT__DOSUBMIT__USER_SET_TYPE == 'server side'
	) {
		doSubmit__serverSide(form, location, callback_function, offsetTime, doServerSideSubmit);
		return;
	}
	
	// still here?
	// this is the browser's saved queue
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__ALL_JOBS_CHR"
		},
		function(response) {
		
		//console.log(response.data);
		
		var arr_all_submits = AMT__doSubmit__editSubmitArray(response.data, offsetTime);
		
		//console.log(arr_all_submits);return;
		//
		
		console.log('submit queue:'		+arr_all_submits.length);
		console.log('time_to_submit:'	+MT__DOSUBMIT__TIME_TO_SUBMIT);
		console.log('ID:'				+MT__DOSUBMIT__BY_ID_THIS_ID);
		console.log(arr_all_submits);
		
		// update the local storage!
		// & submit
		chrome.extension.sendRequest(
			{
				method: "saveLocalStorage",
				key: "MT__DOSUBMIT__ALL_JOBS_CHR",
				data: JSON.stringify(arr_all_submits)
			},
			doSubmit_2
		);
	});
}
function doSubmit_2() {
		
	// Exit if necessary
	if (MT__DOSUBMIT__CALLBACK_FUNCTION) {
		if (typeof MT__DOSUBMIT__CALLBACK_FUNCTION == 'function') {
			MT__DOSUBMIT__CALLBACK_FUNCTION(
				MT__DOSUBMIT__TIME_TO_SUBMIT
			);
			return;
		}
	}
	
	// set a timeout to submit this job
	// if negative then submits immediately
	setTimeout(function() {
		
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
		
		// Submit this form
		// or send the window.location to a new location
		// or do *nothing*
		if (!MT__DOSUBMIT__LOCATION)
			MT__DOSUBMIT__FORM.submit();
		else if (MT__DOSUBMIT__LOCATION)
			window.location = MT__DOSUBMIT__LOCATION;
		else {
			// do nothing
		}
		
		/*if (noSubmit)
			return;
		else if (!location)
			MT__DOSUBMIT__FORM.submit();
		else if (location)
			window.location = location;*/
		
		// OLD, NO REALLY USING THIS
		//~ // remove from submit
		//~ /*var all = GM_getValue('MT__DOSUBMIT__ALL_JOBS');
		//~ if (all) {
			//~ 
			//~ // !! if time_to_submit > 0 !!
			//~ // ?? Sept. 19, 2013
			//~ if (time_to_submit != 0) {
				//~ // remove
				//~ all = JSON.parse(all);
				//~ var i;
				//~ var changed = false;
				//~ for (i = all.length-1; i >= 0; i--) {
					//~ if (all[i].id == MT__DOSUBMIT__BY_ID_THIS_ID) {
						//~ all.splice(i, 1); // index, howmany
						//~ changed = true;
						//~ //break;
					//~ }
				//~ }
				//~ if (changed)
					//~ GM_setValue('MT__DOSUBMIT__ALL_JOBS', JSON.stringify(all));
			//~ }
		//~ }*/
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
		
	}, MT__DOSUBMIT__TIME_TO_SUBMIT);
}
//~ function doSubmit_3() {
	//~ //
//~ }
//
// doSubmit debug
//
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
//
// old doSubmit
//
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




/**
 * Page 1 mturk.com MT___page1_show_jobs
 * 
 * Move into core_factory, July 30 2014.
 * AMT___core_factory.prototype. = function() {
 */
AMT___core_factory.prototype.amt_home_show_tasks = function() {
	
	// OLD
	// JUL30 2014
	//~ function MT___page1_show_jobs() {
	
	
	// Check if the page is currently at /mturk/findhits
	//
	//
	var s = location.href;
	var u = /^https:\/\/www\.mturk\.com\/mturk\/findhits\?match=false$/;
	if (!u.exec(s)) return;
	
	// Ignored
	//
	//
	var ignore_requesters__ids = {
		'A3A0N4OPTWRYPD':true //Research Project
	};
	var ignore_requesters = {
		'CrowdFlower':true,
		'CrowdSource':true,
		'Classify AdImages':true,
		'ClariTrans':true,
		'RelevanceQuest':true,
		'AMTSpeech':true,
		'Amazon Requester Inc. (Product Ads)':true,
		'Amazon Requester Inc.':true,
		'Chris Callison-Burch':true,
		'User453':true,
		'ProductRnR':true,
		'WSOVC COM':true,
		'rohzit0d':true,
		'Cardcow':true,
		'Redwood':true,
		'Craft Listings':true,
		'Stanford Language and Cognition Lab':true,
		'Brandeis NLP':true,
		'Streema':true,
		'Fluffy Cloud':true,
		'Intelius Data Systems':true,
		'Johnny Wong':true,
		'Oscar Smith':true,
		'Sara Rosenthal':true,
		'Comdata IT Fuel Tax':true,
		'Venue Quality':true,
		'Product Listings':true,
		'Amazon Requester Inc - browse classification':true,
		'Classify This':true,
		'Tagasauris':true,
		'chinese.mturk':true,
		'Quality Website Reviews':true,
		'Phillip Atiba Goff':true,
		'Catalog Choice':true,
		'WMT Admin':true,
		'Sebastian Darr':true,
		'Coder of Web Apps':true,
		'Smartsheet.com Clients':true,
		'A-Team':true,
		'MASC Data':true,
		'Ad Tagger':true,
		'Dmitry Kachaev':true,
		'Nic Lowe':true,
		'Nascent Visions Corp':true,
		'RI Services':true,
		'techlist':true,
		'Benjamin C Lok':true,
		'Readabl':true,
		'NetMSi':true,
		'Todd Dickerson':true,
		'Jimmy Dragon':true,
		'Jon Brelig':true,
		//~ REMOVED JULY 30 2014
		//~ 'Taste of the World':true,
		'SET Master Account':true,
		'Ignite Media Solutions':true,
		'The Public Group':true,
		'Turk Experiment':true,
		'Crowdsurf Support':true,
		'Social Media Research':true,
		'11223344':true,
		'A Global Media Analytics':true,
		'411Richmond':true,
		'Visual Genome':true,
		'p9r':true,
		'mirador-tech':true
	};
	
	
	// OLD
	//~ if (u.exec(s))
	//~ {
	
	
	// OLD styles
	GM_addStyle('.cont {height:16px;overflow:auto;}');
	GM_addStyle('.cont>div {height:16px;overflow:auto;font-size:1.4em;}');
	GM_addStyle('#div__reload>hr,#div__reload2>hr  {margin:0;padding:0;}');
	GM_addStyle('#div__reload,#div__reload2  {z-index:100;}');
	GM_addStyle('.cont:hover {background-color: #e9d8e9}');
	GM_addStyle('.cont_link {text-decoration:none;color:black;}');
	GM_addStyle('.cont_link:hover {font-weight:bold;}');
	
	
	GM_addStyle('.amt_show_tasks_table {width:100%;background-color:#efefef;border:2px solid #a0a0a0;margin: 0 auto;border-collapse:collapse;}'); // must use :collapse:
	GM_addStyle('.amt_show_tasks_table>tr:hover {background-color:#e9d8e9;}');
	GM_addStyle('.amt_show_tasks_table>tr {border:1px solid #a4a4a4;}');
	//~ GM_addStyle('.show_tasks_table_row {border:1px solid #a4a4a4;}');
	//~ GM_addStyle('table>td {border:1px solid #a4a4a4;}');
	
	// hosts
	var MT___page1_hosts = [
		MT___host+'/mturk/.scripts/AMT_Batch/g.php',
		'http://www.sjshpack.com/AMT/g.php'
	];
	var MT___page1_host = MT___page1_hosts[0];
	var MT___page1_host_num = 0;
	
	//~ // last update
	//~ var last = 0;
	
	// tasks_obj
	//tasks_obj.table1_row_ids: {} db_id:true
	//tasks_obj.table2_row_ids: {} db_id:true
	//tasks_obj.table_rows:     {} db_id:row _ element
	tasks_obj = {
		current_db_ids: {},
		last_update: 0,
		table1_row_ids:	{},	// #
		table2_row_ids:	{},	// #
		table_rows: 	{},	// el
		
		div_container: null,
		table1: null,
		table2: null,
		
		isFirstRun: true	// boolean: first pull from database
	}
	
	// Timers intervals
	var xint, xint2;
	
	// Container
	tasks_obj.div_container = document.createElement('div');
	tasks_obj.div_container.setAttribute('style',
		'position:absolute;'+
		'top:40px;'+
		'width:98%;'+
		'background-color:none;'+
		'margin:0 1%;'
	);
	document.body.appendChild(tasks_obj.div_container);
	
	// Tables
	// Table 1 = jobs (minus ignored)
	// Table 2 = jobs ignored
	// ...
	tasks_obj.table1 = document.createElement('table');
	tasks_obj.table1.setAttribute('style',
		'width:100%'
	);
	tasks_obj.table1.className = 'amt_show_tasks_table';
	tasks_obj.div_container.appendChild(tasks_obj.table1);
	// ...
	tasks_obj.table2 = document.createElement('table');
	tasks_obj.table2.setAttribute('style',
		'width:100%'
	);
	tasks_obj.table2.className = 'amt_show_tasks_table';
	tasks_obj.div_container.appendChild(tasks_obj.table2);
	
	
	
	// INIT !
	//~ control_buttons();
	MT___page1_async_last_update();
	interval_update_timers();
	
	
	/**
	 * function interval_update_timers()
	 * 
	 * Set interval for time since posted timers.
	 * And set interval for pause timer.
	 */
	function interval_update_timers() {
		
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
		//
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
			x = document.getElementById('div__main');
			if (x) {
				document.body.removeChild(x);
			}if (dx) {
				document.body.removeChild(dx);
			}
			document.body.removeChild(this);
		}
		
		// Set page reload vars
		dx.value = 'Pause 20';
		dx.onclick = function() {
			clearInterval(xint);
			clearInterval(xint2);
			dx.value = 'Press reload to continue...';
		}
		
		xint = setInterval(function() {
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
		xint2 = setInterval(function() {
			//~ var x = document.getElementsByClassName('cont');
			
			var x = tasks_obj.table_rows;
			
			for (var i in x) {
				if (!x[i]) continue;
				if (!x[i].innerHTML) continue;
				
				var y = x[i].getElementsByTagName('input');
				if (!y) continue;
				if (!y[0]) continue;
				if (!y[0].value) continue;

				y = date_format(y[0].value);
				
				var z = x[i].getElementsByClassName('mt__timer');
				if (!z) continue;
				if (!z[0]) continue;
				if (!z[0].innerText) continue;
				
				z[0].innerText = y;
			}
		}, 4000);
	}
	
	/**
	 * Function date_format()
	 * 
	 */
	function date_format(n) {
	
		// OLD
		//~ function MT___page1_date_format(n) {
					
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
	
	/**
	 * function MT___page1_async_last_update()
	 */
	function MT___page1_async_last_update() {
		// 
		console.log('Checking for new');
		
		//xhr
		GM_xmlhttpRequest({
			method: 'GET',
			url: MT___page1_host + '?last_update=&' + Math.random()*10000,
			onload: function (response) {
				var rs = response.responseText;
				
				console.log('response.status:' + response.status);
				if (response.status != 200) {
					if (MT___page1_host_num === 0) {
						MT___page1_host = MT___page1_hosts[1];
						MT___page1_host_num = 1;
					} else {
						MT___page1_host = MT___page1_hosts[0];
						MT___page1_host_num = 0;
					}
					
					setTimeout(function(){
						MT___page1_async_last_update();
					}, 4000);
					return;
				}
				
				/**
				 * Response is object
					{
					h: int, (hits available updated, integer)
					j: int	(jobs updated, integer)?
					}
				 * 
				 * @var tasks_obj.last_update
				 * 
				 */
				rs = JSON.parse(rs);
				//
				console.log(tasks_obj.last_update);
				console.log(rs[0].h);
				//
				if (rs[0].h != tasks_obj.last_update) {
					// 
					console.log('last_update != database. Begin db full.');
					//
					tasks_obj.last_update = rs[0].h;
					MT___page1_async(); // run full
				}
			}
		});
	}
	
	/**
	 * function has_new_alertable()
	 * 
	 * @return true/false
	 */
	function has_new_alertable(rs) {
		// Are there new jobs?
		// Is ordered by time_posted DESC.
		// @var new_job
		var new_job = false;
		for (var i = 0; i < rs[0].length; i++)
		{
			
			var db_id = rs[0][i];
			
			if (tasks_obj.current_db_ids.hasOwnProperty(db_id)) {
				continue; // Skip
			}
			
			// on page number, hits avail, !ignore_
			if  (
				rs[1][i] <  20 &&
				rs[4][i] >= 80 &&
				!ignore_requesters.hasOwnProperty(rs[3][i]) &&
				!ignore_requesters__ids.hasOwnProperty(rs[6][i])
				)
			{
				new_job = true;
				break; // END HERE
			}
		}
		// Alert
		if (new_job) {
			play_audio();
		}
		// Reset the current_db_ids
		tasks_obj.current_db_ids = {};
		for (var i = 0; i < rs[0].length; i++)
		{
			
			var db_id = rs[0][i];
			tasks_obj.current_db_ids[db_id] = true;
			
		}
		
		//~ if (__js_inarray(current_db_ids, rs[0][i])) { // OLD
			//~ continue;//break;
		//~ }
		
		//~ !__js_inarray(ignore_requesters,		rs[3][i]) &&
		//~ !__js_inarray(ignore_requesters__ids,	rs[6][i])
		
		//~ current_db_ids.push(rs[0][i]);
		//~ 
		//~ if (new_job) {
			//~ continue;
		//~ }
		
		//~ OLD
		//~ MT___page1_show_jobs_play_audio();
		
		//~ current_db_ids.push(rs[0][i]);
	}
	
	/**
	 * function makeRow()
	 * 
	 * @param row
	 * @param isIgnored
	 */
	function makeRow(row, isIgnored) {
					
		// Set globals!
		if (!isIgnored)
			tasks_obj.table1_row_ids[row.db_id] = true;
		else
			tasks_obj.table2_row_ids[row.db_id] = true;
		
		// tr
		//
		//
		
		var tr = document.createElement('tr');
		tr.setAttribute('style',
			''
		);
		//~ 
		//~ 
		//~ tr.className = 'show_tasks_table_row';
		
		// Add to global!
		tasks_obj.table_rows[row.db_id] = tr;
		
		//~ XX
		//~ tasks_obj.table_rows[tr] = true;
		
		// tds
		//
		//
		
		// id
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:8px;border-right:1px solid #a4a4a4;'
		);
		td.innerText = row.db_id;
		tr.appendChild(td);
		
		// title
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:60%;'
		);
		tr.appendChild(td);
		if (row.group_id != '') {
			var a_gid		= document.createElement('a');
			a_gid.href		= 'https://www.mturk.com/mturk/preview?groupId='+row.group_id;
			a_gid			.setAttribute('class','cont_link');
			a_gid.target	= '_blank';
			a_gid.innerText = '▶' + __js_clean_html_str(row.title); // "Black right-pointing triangle"
		} else
			var a_gid		= document.createTextNode(__js_clean_html_str(row.title));
		td.appendChild(a_gid);
		
		// name
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:22%;'
		);
		tr.appendChild(td);
		if (row.requester_id != '') {
			var a_rid		= document.createElement('a');
			a_rid.href		= 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId='+row.requester_id;
			a_rid			.setAttribute('class','cont_link');
			a_rid.target	= '_blank';
			a_rid.innerText = __js_clean_html_str(row.requester_name);
		} else
			var a_rid		= document.createTextNode(__js_clean_html_str(row.requester_name));
		td.appendChild(a_rid);
		
		// available
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:8%;'
		);
		td.innerText = row.hits_available;
		tr.appendChild(td);
		
		// Set row property .hits_available (td element) here.
		tr.hits_available = td;
		
		// tsp
		var td = document.createElement('td');
		td.setAttribute('style',
			'width:8%;'//+'max-width:10px;'
		);
		tr.appendChild(td);
		// hidden
		var tsp_input = document.createElement('input');
		tsp_input.setAttribute('type', 'hidden');
		tsp_input.value = row.time_since_posted;
		td.appendChild(tsp_input);
		// createTextNode
		var tsp_span = document.createElement('span');
		var x = date_format(row.time_since_posted);
		tsp_span.className = 'mt__timer';
		tsp_span.innerText = x;
		td.appendChild(tsp_span);
		
		
		
		
		
		//~ div_contain	.setAttribute('style','width:100%;');
		//~ div_gid		.setAttribute('style','float:left;width:60%;');
		//~ div_rid		.setAttribute('style','float:left;width:22%;overflow:hidden;');
		//~ div_avl		.setAttribute('style','float:left;width:8%;overflow:hidden;');
		//~ div_date	.setAttribute('style','width:8%;overflow:hidden;');
		
		//~ inp_tsp		.setAttribute('type', 'hidden');
		
		//~ div_contain	.setAttribute('class', 'cont');
		//~ div_date	.setAttribute('class', 'mt__timer');
		
		//~ inp_tsp		.value = rs[5][i];
		
		//~ d = date_format(rs[3][i]);
		
		return tr;
	}
	
	/**
	 * function MT___page1_async()
	 */
	function MT___page1_async() {
		
		// load
		GM_xmlhttpRequest({
			method: 'GET',
			url: MT___page1_host + '?show_all=&' + Math.random()*10000,
			onload: function (response) {
				
				var rs = response.responseText;
				
				// If response is not 200
				// then try another host. Other
				// hosts would be sjshpack.com.
				// Etc.
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
				
				// Parse
				rs = JSON.parse(rs);
				
				
				
				// THIS IS WHERE THE TABLE WILL BE.
				// FOR EACH RETURNED JOB IN "rs",
				// CHECK FOR MATCHING JOB IN TABLE.
				// The match is made by database ID
				// of job. If a match is made then
				// only UPDATE the row in the table.
				// Else if there is no match, add
				// a row to the table.
				
				// Has new alertable?
				// Also updates current_db_ids.
				has_new_alertable(rs);
				
				// First loop through all table rows and check 
				// against current_db_ids to ensure that all rows
				// in table are still active.
				
				for (var db_id in tasks_obj.table_rows) {
					
					var row = tasks_obj.table_rows[db_id];
					//~ var db_id = row.db_id;
					
					if (!tasks_obj.current_db_ids.hasOwnProperty(db_id))
					{ // remove
						row.parentNode.removeChild(row);
						
						delete tasks_obj.table1_row_ids[db_id]; // exists?
						delete tasks_obj.table2_row_ids[db_id]; // exists?
						
						delete tasks_obj.table_rows[db_id];
					}
					else
					{ //
						
					}
					
				}
				
				// Loop through response object and check if table elements
				// contain this task. If so then update table entry.
				// Else if does not exist in either table, determine which
				// table it ought to go in and - put 'er there!
				
				/**
				 *
					rs
					0 job DB id
					1 on_page_number
					2 job title
					3 requester name
					4 HITs avail.
					5 time since posted
					6 requesterid
					7 groupid
				*/
				var d = {
					db_id: '',
					on_page_number: '',
					title: '',
					requester_name: '',
					hits_available: '',
					time_since_posted: '',
					requester_id: '',
					group_id: ''
				};
				for (var i = 0; i < rs[0].length; i++) {
				//~ for (var i in rs) {
					
					d.db_id				= rs[0][i];
					d.on_page_number	= rs[1][i];
					d.title				= rs[2][i];
					d.requester_name	= rs[3][i];
					d.hits_available	= rs[4][i];
					d.time_since_posted	= rs[5][i];
					d.requester_id		= rs[6][i];
					d.group_id			= rs[7][i];
					
					// UPDATE THIS ROW!
					if (tasks_obj.table_rows.hasOwnProperty(d.db_id))
					{
						var row = tasks_obj.table_rows[d.db_id]
						row.hits_available.innerText = d.hits_available;
						continue;
					}
					
					// Here?
					// Create a new row.
					// And ... Append or insert?
					// If global tasks_obj.firstRun is true,
					// (firstRun == true) then for all rows
					// treat them as appendChild. If firstRun
					// is false then treat all rows as insertBefore.
					
					if  (
						!ignore_requesters.hasOwnProperty(d.requester_name) &&
						!ignore_requesters__ids.hasOwnProperty(d.requester_id)
						)
					{ // regular
						
						// append
						if (!tasks_obj.isFirstRun && tasks_obj.table1.getElementsByTagName('tr').length)
						{
							console.log('inserting');
							var first = tasks_obj.table1.getElementsByTagName('tr')[0];
							tasks_obj.table1.insertBefore(makeRow(d), first) // appendChild(makeRow(d), true); // true == ignored
						}
						// insert
						else
						{
							console.log('appending');
							tasks_obj.table1.appendChild(makeRow(d));
						}
						
						//~ 
						//~ // Exists?
						//~ if (tasks_obj.table1_row_ids.hasOwnProperty(d.db_id)) {
							//~ var row = tasks_obj.table_rows[d.db_id]
							//~ row.hits_available.innerText = d.hits_available;
							//~ continue;
						//~ }
						//~ 
						// New
						//~ tasks_obj.table1.appendChild(makeRow(d));
					}
					else
					{ // ignored
						
						// append
						if (!tasks_obj.isFirstRun && !tasks_obj.table2.getElementsByTagName('tr').length)
						{
							console.log('inserting');
							var first = tasks_obj.table2.getElementsByTagName('tr')[0];
							tasks_obj.table2.insertBefore(makeRow(d, true), first) // appendChild(makeRow(d), true); // true == ignored
						}
						// insert
						else
						{
							console.log('appending');
							tasks_obj.table2.appendChild(makeRow(d, true)); // true == ignored
						}
						
						//~ 
						//~ // Exists?
						//~ if (tasks_obj.table2_row_ids.hasOwnProperty(d.db_id)) {
							//~ var row = tasks_obj.table_rows[d.db_id]
							//~ row.hits_available.innerText = d.hits_available;
							//~ continue;
						//~ }
						//~ 
					}
				}
				
				// Update tasks_obj.firstRun to false.
				// For all future runs any new rows
				// will be insertBefore (top of table)
				// rather than appendChild.
				
				tasks_obj.isFirstRun = false;
			}	
		});
				/*
				// Remove old divs.
				var x;
				x = document.getElementById('div__main');
				if (x) {
					document.body.removeChild(x);
				}
				
				// ...
				//~ var div;
				var div_main;
				var div__reload, div__reload2;
				//div_main
				//
				div_main=document.createElement('div');
				div_main.setAttribute('id','div__main');
				div_main.setAttribute('style',
					'position:absolute;'+
					'top:40px;'+
					'width:98%;'+
					'background-color:none;'
				);
				//div__reload
				//
				div__reload=document.createElement('div');
				div__reload.setAttribute('id','div__reload');
				div__reload.setAttribute('style',
					'margin:0 auto;'+
					'width:98%;'+
					'max-width:1000px;'+
					'height:500px;'+
					'overflow:auto;'+
					'background-color:#fdfdfd;'+
					'border:4px solid #d2d2d2;'
				);
				div_main.appendChild(div__reload);
				//div__reload2
				//
				div__reload2=document.createElement('div');
				div__reload2.setAttribute('id','div__reload2');
				div__reload2.setAttribute('style',
						'margin:0 auto;'+
						'width:100%;'+
						'max-width:1000px;'+
						'height:500px;'+
						'overflow:auto;'+
						'background-color:#fdfdfd;'+
						'border:4px solid #d2d2d2;'
				);
				div_main.appendChild(div__reload2);
				document.body.appendChild(div_main);
				
				has_new_alertable(rs);
				
				// Output
				var div_contain;
				var div_gid;
				var div_rid;
				var div_avl;
				var div_date;
				var inp_tsp;
				var a_gid;
				var a_rid;
				var d;
				for (var i = 0; i < rs[0].length; i++)
				{
					
					div_contain	= document.createElement('div');
					div_gid		= document.createElement('div');
					div_rid		= document.createElement('div');
					div_avl		= document.createElement('div');
					div_date	= document.createElement('div');
					
					inp_tsp		= document.createElement('input');
					
					if (rs[7][i] != '') {
						a_gid			= document.createElement('a');
						a_gid.href		= 'https://www.mturk.com/mturk/preview?groupId='+rs[7][i];
						a_gid			.setAttribute('class','cont_link');
						a_gid.target	= '_blank';
						a_gid.innerText = __js_clean_html_str(rs[2][i]);
					} else
						a_gid			= document.createTextNode(__js_clean_html_str(rs[2][i]));
					if (rs[6][i] != '') {
						a_rid			= document.createElement('a');
						a_rid.href		= 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId='+rs[6][i];
						a_rid			.setAttribute('class','cont_link');
						a_rid.target	= '_blank';
						a_rid.innerText = __js_clean_html_str(rs[3][i]);
					} else
						a_rid			= document.createTextNode(__js_clean_html_str(rs[3][i]));
					
					div_contain	.setAttribute('style','width:100%;');
					div_gid		.setAttribute('style','float:left;width:60%;');
					div_rid		.setAttribute('style','float:left;width:22%;overflow:hidden;');
					div_avl		.setAttribute('style','float:left;width:8%;overflow:hidden;');
					div_date	.setAttribute('style','width:8%;overflow:hidden;');
					
					inp_tsp		.setAttribute('type', 'hidden');
					
					div_contain	.setAttribute('class', 'cont');
					div_date	.setAttribute('class', 'mt__timer');
					
					inp_tsp		.value = rs[5][i];
					
					d = date_format(rs[3][i]);
					
					// append sm sm.
					div_gid	.appendChild(a_gid);
					div_rid	.appendChild(a_rid);
					div_avl	.appendChild(document.createTextNode(rs[4][i]));
					div_date.appendChild(document.createTextNode(d));
					// append sm.
					div_contain.appendChild(inp_tsp);
					div_contain.appendChild(div_gid);
					div_contain.appendChild(div_rid);
					div_contain.appendChild(div_avl);
					div_contain.appendChild(div_date);
					
					// Append main
					// In top or bottom
					// 3 == requester name
					// 6 == requester id
					if  (
						!__js_inarray(ignore_requesters,		rs[3][i]) &&
						!__js_inarray(ignore_requesters__ids,	rs[6][i])
						)
					{
						div__reload.appendChild(div_contain);
						div__reload.appendChild(document.createElement('hr'));
					}
					else
					{
						div__reload2.appendChild(div_contain);
						div__reload2.appendChild(document.createElement('hr'));
					}
				}*/
				
				//div__reload.innerHTML = div__reload.innerHTML + '<hr style="margin:0;" />' + st;					
				//div__reload2.innerHTML = div__reload2.innerHTML + '<hr style="margin:0;" />' + st;
				
				//~ // gid
				//~ var gid;
				//~ if (rs[7][i] != '') {
					//~ gid = '\
						//~ <a href="https://www.mturk.com/mturk/preview?groupId='+rs[7][i]+'" target="_blank" class="cont_link">\
						//~ '+rs[2][i]+'\
						//~ </a>';
				//~ } else
					//~ gid = rs[2][i];
					//~ //gid = '<span style="color:purple;font-weight:bold;">'+rs[0][i]+'</span>';
				//~ // rid
				//~ var rid;
				//~ if (rs[6][i] != '') {
					//~ rid = '\
						//~ <a href="https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId='+rs[6][i]+'" target="_blank" class="cont_link">\
						//~ '+rs[3][i]+'\
						//~ </a>';
				//~ } else
					//~ rid = '&nbsp;'+rs[3][i];
				//~ 
				//~ //490,230,98
				//~ //<div style="overflow:hidden;">
				//~ var st='\
				//~ <div style="width:100%;" class="cont">\
					//~ <input type="hidden" value="'+rs[5][i]+'">\
					//~ <div style="float:left;width:64%;">\
						//~ '+gid+'\
					//~ </div>\
					//~ <div style="float:left;min-width:20%;max-width:20%;overflow:hidden">\
						//~ '+rid+'\
					//~ </div>\
					//~ <div style="float:left;min-width:6%;max-width:6%;overflow:hidden">\
						//~ '+rs[4][i]+'\
					//~ </div>\
					//~ <div style="min-width:6%;max-width:6%;overflow:hidden;" class="mt__timer">' +d+ '</div>\
				//~ </div>';// hidden = break;
				//rs - Hit, Requester, #
	}
	
	/**
	 //~ * Function MT___page1_show_jobs_play_audio
	 * 
	 * play_audio
	 * 
	 */
	function play_audio() {
		
		// Remove old elements.
		if (document.getElementById('MT___page1_show_jobs_play_audio'))
			document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
		if (document.getElementById('MT___page1_show_jobs_play_audio'))
			document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
		
		//MT___AUDIO_SNIPPET
		//b64_audio =
								
		// Play alert
		// i.e. <audio controls src = "data:audio/mp3;base64,T2dn....3KcK" />
		var c = document.createElement('audio');
		c.setAttribute('style','position:fixed;top:30px;left:0px;width:80px;text-align:center;z-index:0;background-color:MistyRose;border:2px solid LightCoral;');
		c.setAttribute('id','MT___page1_show_jobs_play_audio');
		c.setAttribute('controls','');
		c.setAttribute('src', MT___AUDIO_SNIPPET);
		document.body.appendChild(c);
		c = document.getElementById('MT___page1_show_jobs_play_audio');
		c.play();
		// Remove after 4 seconds
		setTimeout(function() {
			document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
		}, 4000);
	}
}
/*
 * END FUNCTION MT___page1_show_jobs
 */
/**
 * Function AMT___oldTopWindowFloatStuff
 * // Make return/accept button
 */
function AMT___oldTopWindowFloatStuff() {
	
	/**
	* Run code on unaccepted
	*
	*/
	var s,t,u,w;
	s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
	t=/you were viewing could not be accepted/; // Not accepted
	w=/Want to work on this HIT/; // Not accepted
	//~ u=/The HIT you were viewing has expired/; //XXNot accepted
	if  (
			s.exec(ih) || t.exec(ih) || w.exec(ih)
		)
	{ // not accepted here
		
		/*
		 * Tony Pavia
		 * Float skip.
		 */
		var l;
		l = document.location.href;
		if (l.indexOf('groupId=26V8XBAT2D5NVO7F3UH0RG5Y5NR51U') != -1) {
			// Set a global variable of hid, gid
			// @param float___kristin_howe_gid
			// @param float___kristin_howe_hid
			// 
			var float___kristin_howe_gid;
			var float___kristin_howe_hid;
			var x = document.getElementsByTagName('iframe')[0].src;
			
			x = /hitId=([^&$]+)/.exec(x);
			if (!x) return;
			float___kristin_howe_hid = x[1];
			x = /groupId=([^&$]+)/.exec(document.location.href);
			if (!x) return;
			float___kristin_howe_gid = x[1];
			
			// function float___kristin_howe_skip
			/*function float___kristin_howe_skip(time_to_submit) {
				setTimeout(function() {
					console.log('KH>skip');
					//window.location = 'https://www.mturk.com/mturk/preview?groupId='+float___kristin_howe_gid;
					location.reload(true);//forceGet
				}, time_to_submit);
			}*/
			// @intv xint__kristin_howe_float
			var xint__kristin_howe_float = setInterval(function() {
				
				chrome.extension.sendRequest(
					{
						method: "getLocalStorage",
						key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid
					},
					function(response) {
						//console.log(response); // Object{} // Empty object!
						if (response.data) {
							clearInterval(xint__kristin_howe_float);
							
							// delete key
							chrome.extension.sendRequest(
								{
									method: "deleteLocalStorage",
									key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid,
									data: ''
								},
								function(response) {
									if (!response.data)
										doSubmit(false, false, float___kristin_howe_skip);
								}
							);
						}
					}
				);
				chrome.extension.sendRequest(
					{
						method: "getLocalStorage",
						key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid
					},
					function(response) {
						if (response.data) {
							clearInterval(xint__kristin_howe_float);
							
							// delete key
							chrome.extension.sendRequest(
								{
									method: "deleteLocalStorage",
									key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid,
									data: ''
								},
								function(response) {
									
									document.getElementsByName('hitForm')[0].submit();
									
									//~ // accept
									//~ if (!response.data)
										//~ doSubmit('hitForm',false,false,-1000); // "id" else "name" //(form, location, callback_function, offsetTime)
									
								}
							);
						}
					}
				);
			}, 200);
		}
		/*
		 * Kristin Howe 
		 * Real estate agent photo search. Float skip.
		 */
		var l;
		l = document.location.href;
		if (l.indexOf('groupId=2FH56XBAT2D55ZCE7LUQ8JGAYZV04Z') != -1) {
			
			// Set a global variable of hid, gid
			// @param float___kristin_howe_gid
			// @param float___kristin_howe_hid
			// 
			var float___kristin_howe_gid;
			var float___kristin_howe_hid;
			var x = document.getElementsByTagName('iframe')[0].src;
			x = /hitId=([^&$]+)/.exec(x);
			if (!x) return;
			float___kristin_howe_hid = x[1];
			
			x = /groupId=([^&$]+)/.exec(document.location.href);
			if (!x) return;
			float___kristin_howe_gid = x[1];
			
			
			// function float___kristin_howe_skip
			function float___kristin_howe_skip(time_to_submit) {
				setTimeout(function() {
					console.log('KH>skip');
					//window.location = 'https://www.mturk.com/mturk/preview?groupId='+float___kristin_howe_gid;
					location.reload(true);//forceGet
				}, time_to_submit);
			}
			
			// initialize by removing any old
			// delete key
			chrome.extension.sendRequest(
				{
					method: "deleteLocalStorage",
					key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid,
					data: ''
				},
				function(response) {
					
					// localStorage[key] ought to be removed. Alert
					// if still exists
					if (response.data) {
						alert('x debug');
						return;
					}
					
					// @intv xint__kristin_howe_float
					var xint__kristin_howe_float = setInterval(function() {
						
						chrome.extension.sendRequest(
							{
								method: "getLocalStorage",
								key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid
							},
							function(response) {
								//console.log(response); // Object{} // Empty object!
								if (response.data) {
									clearInterval(xint__kristin_howe_float);
									
									// delete key
									chrome.extension.sendRequest(
										{
											method: "deleteLocalStorage",
											key: "MT___VAR___KristinHowe_Skip_HID_"+float___kristin_howe_hid,
											data: ''
										},
										function(response) {
											if (!response.data)
												doSubmit(false, false, float___kristin_howe_skip);
											//console.log(response);
										}
									);
								}
							}
						);
						chrome.extension.sendRequest(
							{
								method: "getLocalStorage",
								key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid
							},
							function(response) {
								//console.log(response);
								if (response.data) {
									clearInterval(xint__kristin_howe_float);
									
									// delete key
									chrome.extension.sendRequest(
										{
											method: "deleteLocalStorage",
											key: "MT___VAR___KristinHowe_Accept_HID_"+float___kristin_howe_hid,
											data: ''
										},
										function(response) {
											
											document.getElementsByName('hitForm')[0].submit();
											
											//~ // accept
											//~ if (!response.data)
												//~ doSubmit('hitForm',false,false,-1000); // "id" else "name" //(form, location, callback_function, offsetTime)
											
										}
									);
								}
							}
						);
					}, 200);
				}
			);
		}
		// RUN SCRIPTING ON UNACCEPTED JOBS
		// SKIPS. Saved skips in a file.
		// Thomas Murphy/David Weber
		//https://www.mturk.com/mturk/preview?groupId=260LVCNHMVHYUXNCZCB2H4J8FMS02H
		if  (
			document.location.href.indexOf('groupId=260LVCNHMVHYUXNCZCB2H4J8FMS02H') != -1 || // Thomas Murphy
			document.location.href.indexOf('groupId=2J23QP6AUC2BB0IXV6O340FM2IS18T') != -1 ||
			document.location.href.indexOf('groupId=2J2GSCWY2AOO2EH0X4FONQSFUBI11R') != -1 // David Weber
			)
		{
			
			var x = document.getElementsByName('hitId');
			if (x) {
				x = x[0].value;
				if (x.length > 4) {
					var url;
					url = MT___host+'/mturk/util.php?thomas_murphy_hid='+x;
					// dw (check && write)
					if (document.location.href.indexOf('groupId=2J2GSCWY2AOO2EH0X4FONQSFUBI11R') != -1) {
						//url += '&w='; //write
					}
					
					GM_xmlhttpRequest({
						method: 'GET',
						url: url,
						onload: function (response) {
							var rs = response.responseText;
							
							if (response.status != 200)
								return;
							
							if (rs.trim() == '1') {
								document.body.style.backgroundColor = '#bfefbf'; //barfgreen
								// go to next
								var x = document.location.href;
								x = (x.substr(x.length - 1) == '&') ? x.substr(0,x.length-1) : x + '&';
								document.location = x;
							}
							else {
								
							}
						}
					});
				}
			}
		}
		
		// ACCEPT JOB
		// TEMP ACCEPT JOB FOR James M. Ratcliffe
		if (document.location.href.indexOf('https://www.mturk.com/mturk/preview?groupId=2KGJ1XERSQV66ROYA9K3OVWEVPI08J') != -1) {
			// tmp
			setTimeout(function() {
				document.getElementsByName('hitForm')[0].submit();
			}, Math.random()*1 + 0.3); // 0 to 1 seconds
		}
	}
}
/*
 * END FUNCTION AMT___oldTopWindowFloatStuff
 */
/**
 * Function AMT___returnAndAcceptButton
 * // Make return/accept button
 */
function AMT___returnAndAcceptButton() {
	
	// is this page continue or preview, then return
	if  (
		/^https?:\/\/(www\.)mturk.com\/mturk\/continue\?/i.exec(document.location.href) ||
		/^https?:\/\/(www\.)mturk.com\/mturk\/preview\?/i.exec(document.location.href)
		)
		return;
	
	// return and accept
	if  (
			/<a href="\/mturk\/return\?/.exec(ih) &&
			(
				/<a href="\/mturk\/return\?groupId=([^&]+)/.exec(ih) ||
				/<a href="\/mturk\/return\?requesterId=([^&]+)/.exec(ih)
			)
		) // return link and group id
	{

		
		var u;
		u = /<a href="\/mturk\/return\?[^"]+/.exec(ih)[0];
		
		var MT__url_returnaccept;
		MT__url_returnaccept = u;
		MT__url_returnaccept = MT__url_returnaccept.replace('<a href="', 'https://www.mturk.com');
		MT__url_returnaccept = MT__url_returnaccept.replace(/&amp;/g, '&');
		//u = '';
		
		var MT__gm_groupId;
		MT__gm_groupId = /<a href="\/mturk\/return\?groupId=([^&]+)/.exec(ih)[1];
		
		var d = document.createElement('input');
		d.setAttribute('id','MT__gm_returnaccept');
		d.setAttribute('type','button');
		d.setAttribute('style','position:fixed;top:0px;left:40%;width:120px;height:24px;margin-left:120px;z-index:1000;');
		d.setAttribute('value','Return and Accept');
		document.body.appendChild(d);
		var d = document.createElement('input');
		d.setAttribute('id','MT__gm_returnaccept_non_serverSide');
		d.setAttribute('type','button');
		d.setAttribute('style','position:fixed;top:0px;left:40%;height:24px;margin-left:240px;z-index:1000;padding-left:0;padding-right:0;');
		d.setAttribute('value','Non-SV');
		document.body.appendChild(d);
		
		// local
		document.getElementById('MT__gm_returnaccept').addEventListener('click', function() {
			this.style.backgroundColor='#9e9e9e';
			//Record what tab we're returning on
			recordReturn();

			
			// HOOK GOES HERE> RETURN & ACCEPT + showNextTab, nextTab
			// @param: bool() AMT__Global_Vars.core.return_accept_run_nextTab 
			//
			if (AMT__Global_Vars.core.return_accept_run_nextTab) {
				new AMT___core_factory().nextTab();
			}
			// END HOOK nextTab()
			
			function MT__RETURN_AND_ACCEPT(time_to_submit) {
				setTimeout(function() {
					GM_xmlhttpRequest({
						method: 'GET',
						url: MT__url_returnaccept, // url to return this HIT
						onload: function (response) {
							
							// get new
							//
							//
							window.location = 'https://www.mturk.com/mturk/previewandaccept?groupId='+MT__gm_groupId;
						}
					});
				}, time_to_submit);
			}
			
			// First doSubmit
			doSubmit(false, false, MT__RETURN_AND_ACCEPT); // false,false,noSubmit
		}, false);
		
		// serverSide
		document.getElementById('MT__gm_returnaccept_non_serverSide').addEventListener('click', function() {
			this.style.backgroundColor='#9e9e9e';
			//Record what tab we're returning on
			recordReturn();
			
			
			
			function MT__RETURN_AND_ACCEPT_serverSide(time_to_submit) {
				setTimeout(function() {
					GM_xmlhttpRequest({
						method: 'GET',
						url: MT__url_returnaccept, // url to return this HIT
						onload: function (response) {
							// get new
							window.location = 'https://www.mturk.com/mturk/previewandaccept?groupId='+MT__gm_groupId;
							
							// XXADD AGAIN TO DOSUBMIT!
						}
					});
				}, time_to_submit);
			}
			
			// First doSubmit
			doSubmit__serverSide(false, false, MT__RETURN_AND_ACCEPT_serverSide); // false,false,noSubmit
		}, false);
	}
}
/*
 * END FUNCTION AMT___returnAndAcceptButton
 */
/**
 * Function AMT___checkCaptchaStatus()
 * // Check the captcha status
   // Set var -> GM_setValue('mt_captcha','1'). No captcha == "0".
   // Plus -> some interesting captcha behavior.
 */
function AMT___checkCaptchaStatus() {
	/**
	 * Captcha & more
	 * 
	 */
	var s,t,u,w;
	t=/you were viewing could not be accepted/; // Not accepted
	u=/The HIT you were viewing has expired/; // Not accepted
	w=/Want to work on this HIT/; // Not accepted
	
	s=/In order to accept your next HIT, please type this word into the text box below/; // Captcha
	if (s.exec(ih)) {
		
		/**
		 * Change icon
		 */
		chrome.extension.sendRequest(
		{
			captchaChangeTabIcon: true
		}, 
		function(response) {
			//Squelch response
			}
		);
		
		// set local
		GM_setValue('mt_captcha','1');
		
		// Captcha response focus 
		var inp=document.getElementsByName("userCaptchaResponse")[0];
		if (inp) {
			// clear input
			inp.value='';
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 100);
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 1000);
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 2000);
			setTimeout(function(){document.getElementsByName("userCaptchaResponse")[0].focus();}, 3000);
		}
		// LAST RELOAD
		// set continue for duplicate windows
		// local storage - last reload
		if (!GM_getValue('MT_CAPTCHA__LAST_RELOAD'))
			GM_setValue('MT_CAPTCHA__LAST_RELOAD', 0); 
		// local storage - last reload tries
		// & reset if old?
		if (
			!GM_getValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES')
		   )
			GM_setValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES', 0);
		// int
		var xint_CONTINUE_CAPTCHA = setInterval(function() {
			
			var d = new Date();
			d = Math.round(d.getTime() / 1000);
			
			var numt = GM_getValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES') * 1;
			
			if (
				GM_getValue('mt_captcha') == '0'
			   )
			{
				clearInterval(xint_CONTINUE_CAPTCHA);
				
				GM_setValue('MT_CAPTCHA__LAST_RELOAD', d);
				GM_setValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES', 0);
				
				if (document.location.href == 'https://www.mturk.com/mturk/submit') { // i.e. amicus labs
					
					var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
					if (i)
						window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
					
				} else
					window.location.reload();
				
				/*if (ih.indexOf('Copy and paste the HTML from the links') != -1) { // amicus labs
					//window.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2J2GSCWY2AOOIR6U04FONQSDV7O118';
					//window.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2J2GSCWY2AOS5XFSWTFOPQSCODK11V';
					window.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=25M5K4F0OHOZUIXOFXF2U92HGJX21C';
				} else
					window.location.reload();*/
			}
			else if (
				GM_getValue('MT_CAPTCHA__LAST_RELOAD') < d - 30 &&
				numt < 30 // 20 is 10m, 30 is 15m
			)
			{
				GM_setValue('MT_CAPTCHA__LAST_RELOAD', d);
				GM_setValue('MT_CAPTCHA__LAST_RELOAD_NUMTRIES', numt + 1);
			}
		}, ((Math.random()*20) * 100) + 100); // 100 - 2000 ms
		// END LAST RELOAD
		
		/*
		 * 
		 * OLD, use AMT
		//play sound
		var play__ = GM_getValue('MT__CAPTCHA_PLAY_SOUND');
		var d = new Date();
		d = Math.round(d.getTime() / 1000);
		
		if (!play__) {
			GM_setValue('MT__CAPTCHA_PLAY_SOUND', d);
		} else {
			if (d - 120 > play__) { // 2 min. //xx5
				
				GM_setValue('MT__CAPTCHA_PLAY_SOUND', d);

				d=document.createElement('iframe');
				d.setAttribute('id','MT__CAPTCHA_PLAY_SOUND');
				document.body.appendChild(d);
				d = document.getElementById('MT__CAPTCHA_PLAY_SOUND');
				d.style.position='absolute';
				d.style.top='0px';
				d.style.left='20%';
				d.style.width='10%';
				d.style.height='10px';
				d.style.overflow='auto';
				d.style.border='1px solid blue';
				d.style.backgroundColor='white';
				d.src = 'http://localhost/mturk/.scripts/Music/132118_2375010-lq(box).mp3';
			}
		}*/
	}
	/**
	 * No Captcha
	 * (not ?continue)
	 */
	else if (!/^https?:\/\/(www\.)mturk.com\/mturk\/continue\?/i.exec(document.location.href))
	{
		//
		GM_setValue('mt_captcha','0');
		
		if  (
				ih.indexOf('The HIT you were viewing has expired') != -1 &&
				ih.indexOf('Copy and paste a webpage\'s HTML (Chrome and Firefox only, please)') != -1 &&
				ih.indexOf('Automan LLC') != -1
			)
		{
			var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
			if (i) {
				window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
			}
		}
		if  (
				ih.indexOf('The HIT you were viewing has expired') != -1 &&
				ih.indexOf('KronoPin') != -1
			)
		{
			var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
			if (i) {
				var xint_dup = setInterval(function() {
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://www.linkedin.com/nhome/',
						onload: function (response) {
							if (response.status < 400) {
								
								clearInterval(xint_dup);
								
								// get new
								var i = /<input type="hidden" name="groupId" value="([^"]+)">/.exec(ih);
								window.location.href = 'https://www.mturk.com/mturk/previewandaccept?groupId=' + i[1];
								
							}
						}
					});
				}, 60000);
			}
		}
		// reload after captcha, /mturk/submit
		if (document.location == 'https://www.mturk.com/mturk/submit' && ih.indexOf('Your request was not completed successfully.') != -1) {
			// Amicus Labs
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=25M5K4F0OHOZUIXOFXF2U92HGJX21C';
			// Amazon Labs
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=279O8JIA0RYNZFGK1ID0CBMLV3P05D';
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2J2GSCWY2AOS5XFSWTFOPQSCODK11V';
			// Andrew Brown
			//document.location.href='https://www.mturk.com/mturk/previewandaccept?groupId=2PBXCNHMVHVKKX4AS9T7CJ7DNYW130';
		}
	}
}
/*
 * END FUNCTION
 */

/**
 * 
 * GLOBAL FUNCTIONS
 * 
 */
/*
 * MT___numberWithCommas
**/
function MT___numberWithCommas(x) {
	var parts = (x+'').split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
/*
 * MT___distance
 * return distance between lat/lng pairs
**/
/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad == 'undefined') {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
}
function MT___lat_lng_distance(lat1, lon1, lat2, lon2) {
	var R = 3963; // 6371km .. use 3963 for miles
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad(); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // mi
	return d;
}
/*
 * MT___yahoo_feeling_lucky
 * 
**/
function MT___yahoo_feeling_lucky(q, callbackFunction) {
	// Feeling Lucky
	var u = 'http://search.yahoo.com/search?p=%2B'+encodeURIComponent(q); //%2B
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		onload: function (response) {
			var rs=response.responseText;
			
			var rg = /yschttl spt" href="[^*]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g;
			var found = false;
			
			if (rg.exec(rs) && rs.indexOf('Including results for') == -1) {
				rg.lastIndex = 0;
				rg=/yschttl spt" href="[^*]+[*]+([^"]+)"[^>]+>((.|\s)*?(?=<\/li>|$)|$)/g; // li
				
				var match;
				while (match = rg.exec(rs)) {
					match[1] = decodeURIComponent(match[1]);
					if (!/http:\/\/\d+\.\d+\.\d+\.\d+[\/$]/.exec(match[1])) {
						callbackFunction(match[1]);
						found = true;
						break;
					}
				}
			}
			if (!found)
				callbackFunction(false);
		}
	});
}
/**
 * MT___resolveURL
 * @param url
 * @param callback_function
 * @param seed
**/
function MT___resolveURL(url, callback_function, seed) {
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: MT___host+'/mturk/.scripts/resolve_URL.php?u='+encodeURIComponent(url),
		onload: function(response) {
			var rs = response.responseText;
			
			callback_function(rs, seed);
		}
	});
}
/*
 * MT___google_api_geocode helper
 * 
**/
function MT___google_api_geocode_parse(rs, callback_function, return_complete_response) {
	rs = JSON.parse(rs);
	var found = true;
	if  (
		!rs.results ||
		!rs.results[0] ||
		!rs.results[0].geometry ||
		!rs.results[0].geometry.location ||
		!rs.results[0].geometry.location.lat ||
		!rs.results[0].geometry.location.lng
		)
	{
		callback_function(false);
		return;
	}
	
	if (!return_complete_response) // just lat/lng
		callback_function(rs.results[0].geometry.location.lat, rs.results[0].geometry.location.lng);
	else
		callback_function(rs); // full
}
/*
 * MT___google_api_reverseGeocode
 * return reverse lat/lng
**/
function MT___google_api_reverseGeocode(latlng, callback_function, use_a_proxy) { //, return_complete_response) { // latlng->str
	
	// Global
	//
	//
	var latlng = latlng;
	var callback_function = callback_function;
	var use_a_proxy = use_a_proxy;
	
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+encodeURIComponent(latlng)+'&sensor=false';
	
	// IS THIS REQUEST CACHED?
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
		onload: function(response) {
			var rs = response.responseText;
			
			if (rs.trim() != '') {
				MT___google_api_geocode_parse(rs, callback_function, true); // return full response == true
				return;
			}
					
			if (!use_a_proxy) {
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: u,
					onload: function(response) {
						var rs = response.responseText;
						MT___google_api_geocode_parse(rs, callback_function, true); // return full response == true
					}
				});
				return;
			}
			
			if (use_a_proxy) {
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: MT___host+'/mturk/.scripts/google/get-page.php?u='+encodeURIComponent(u)+'&catch_success='+encodeURIComponent('"results"')+'&catch_include='+encodeURIComponent('"error_message" : "You have exceeded your daily request quota for this API."'),
					onload: function(response) {
						//var rs = response.responseText;
					}
				});
				
				var xint = setInterval(function() {
					GM_xmlhttpRequest({ // init
						method: "GET",
						url: MT___host+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
						onload: function(response) {
							var rs = response.responseText;
							
							if (rs.trim() != '') {
								clearInterval(xint);
							} else
								return;
								
							MT___google_api_geocode_parse(rs, callback_function, true);
						}
					});
				}, 1000);
			}
			
		}
	});
}
/*
 * MT___google_api_geocode
 * return lat/lng or full response object
 * http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false
**/
function MT___google_api_geocode(location, callback_function, return_complete_response, use_a_proxy) {
	
	// Global
	//
	//
	var location = location;
	var callback_function = callback_function;
	var return_complete_response = return_complete_response;
	var use_a_proxy = use_a_proxy;
	
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(location)+'&sensor=false';
	
	// IS THIS REQUEST CACHED?
	GM_xmlhttpRequest({ // init
		method: "GET",
		url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
		onload: function(response) {
			var rs = response.responseText;
			
			if (rs.trim() != '') {
				MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
				return;
			}
			
			// Here?
			//
			//
			if (!use_a_proxy) {
				
				GM_xmlhttpRequest({ // init
					method: "GET",
					url: AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u),
					onload: function(response) {
						var rs = response.responseText;
						MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
					}
				});
				
				//~ GM_xmlhttpRequest({
					//~ method: "GET",
					//~ url: u,
					//~ onload: function(response) {
						//~ var rs = response.responseText;
						//~ MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
					//~ }
				//~ });
				return;
			}
			
			if (use_a_proxy) {
				AMT___POPUP__initializeGlobals(function() {
					GM_xmlhttpRequest({ // init
						method: "GET",
						url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?u='+encodeURIComponent(u)+'&catch_success='+encodeURIComponent('"results"')+'&catch_include='+encodeURIComponent('"error_message" : "You have exceeded your daily request quota for this API."'),
						onload: function(response) {
							//var rs = response.responseText;
						}
					});
					
					var xint = setInterval(function() {
						GM_xmlhttpRequest({ // init
							method: "GET",
							url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+encodeURIComponent(u),
							onload: function(response) {
								var rs = response.responseText;
								
								if (rs.trim() != '') {
									clearInterval(xint);
								} else
									return;
									
								MT___google_api_geocode_parse(rs, callback_function, return_complete_response);
							}
						});
					}, 1000);
				});
			}
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
	if (s == undefined) return ''; // is blank
	if (s.trim() == '') return ''; // is blank
	var div = document.createElement('div');
	div.innerHTML = s;
	s = div.firstChild.nodeValue;
	return s;
}


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
					
					// update button clicks
					DaveSchilling_whois_action();
				}
			});
		}, 2000);
	}
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
