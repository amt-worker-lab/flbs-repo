// KH
var mt___kh_test_str = '38033	||2603	longandfoster.com||2011	kw.com||1802	crye-leike.com||1155	homesmartintl.com||1099	realtyonegroup.com||830	elliman.com||XXXX';





function addToTabsQ(priority) {
	
	parent.postMessage({changeFavIcon: 'true'}, '*');	
		
	//Tell eventPage to switch
	chrome.extension.sendRequest({
								  addToTabsQ: true,
								  tabPriority: priority
							  }, function(response) {
								//do nothing with the response
							});
	console.log('am i here?');
	//Green Light!

}



function showNextTab() {
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
		//Only have the top window sending back the response
		console.log('Commanded to tell if idle');
		if(AMT__Global_Vars.isTopWindow)
		{
			sendResponse({isPreview: AMT__Global_Vars.isPreview});
		}
	}
});


/**
 * OTHER GLOBAL VARIABLES
 * 
 */
//
var MT___host = 'http://192.168.1.8';

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
var AMT__Global_Vars = function()
{
	var isTopWindow;
	var isPreview;
	var groupId;
	var hitId;
}

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
				alert('Error initializing groupId');
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
			alert('Error initializing groupId');
		}
		hitId = hitId[1];
		AMT__Global_Vars.hitId = hitId;
	}
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
		AMT___Floater.selectTabOnAccept = options.selectTabOnAccept;
		AMT___Floater.tabPriority = options.tabPriority ? options.tabPriority : 5;
}




//Runs the floater based on its options vairables
AMT___Floater.float = function() {

	if(AMT___Floater.runMT_Run || AMT___Floater.runTop_Window)
	{
		AMT___Floater.runPreview();
		AMT___Floater.listenForAcceptSkip();
	}
	
	if(AMT___Floater.selectTabOnAccept && !AMT__Global_Vars.isPreview && AMT___Global_Vars.isTopWindow)
	{
		AMT___Floater.switchToMe();
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




AMT___Floater.switchToMe = function(priority) {
	if(!priority)
	{
		if(!AMT___Floater.tabPriority)
		{
			priority = 5;
		}
		else
		{
			priority = AMT___Floater.tabPriority;
		}
	}
	AMT___switchToMe(priority);
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

AMT___Floater.skip = function() {
	if(!AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		doSubmit(false, false, function(timeToSkip){
				window.setTimeout(function() {
						parent.postMessage({skipJob: true}, '*')
						}
						, timeToSkip);
						
			}
			, -800) //2200
	}
	else if (AMT__Global_Vars.isTopWindow && AMT__Global_Vars.isPreview)
	{
		doSubmit(false, false, function(timeToSkip){
				window.setTimeout(function() {
						window.postMessage({skipJob: true}, '*')
						}
						, timeToSkip);
						
			}
			, -800)
	}
}


AMT___Floater.acceptOrSkip = function(e) {
	if(e.data && e.data.acceptJob)
	{
		AMT___Floater.isAccepting = true;
		if (GM_getValue('mt_captcha') == '0')
			document.getElementsByName('/accept')[0].click();
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
// submitObject is optional object. If it is a string of 'Do Not Submit', no submission happens. Otherwise it submits the form based on its attributes
function AMT___doPastBehavior(recordName, threshold, submitObject, callback)
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
						return;
					}
					console.log(match);
					for(j = 0; j < match.outputs.length; j++)
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
								console.log(callback);
								callback();
							}
						}
						else if(submitObject)
						{
							if(callback)
							{
								callback();
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
								callback();
							}
							doSubmit();
						}
					}
				}
				else
					console.log("No Match");
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
			 'http://192.168.1.6/mturk/.scripts/AMT_InputOutputRecords/inputOutputRecords.php',
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


/**
 * AMT___requests_factory
 * @
 * @ AMT___requests_factory.prototype.scrapy__begin_scrape
 */
function AMT___requests_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
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
			
			// SET A DEFAULT TIMEOUT FOR THIS TASK!
			// b/c cpu sitting at max...
			var rf = new AMT___requests_factory();
			rf.scrapy__cancel_job(jobid, 40000);
			
			
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
									
									//rs = JSON.parse(rs);
									
									var obj = rs.trim().split("\n");
									if (obj.length) {
										for (var i in obj) {
											if (obj[i].trim().length == 0)
												continue;
											obj[i] = JSON.parse(obj[i]);
											if (obj[i].email_contexts) {
												obj[i].email_contexts = JSON.parse(obj[i].email_contexts);
											}
										}
									}
									
									callback_function(jobid, obj, seed_object);// ?
								}
							});
						}
						
						// is the job still pending?
						else {
							pending = JSON.stringify(rs.pending);
							running = JSON.stringify(rs.running);
							if (pending.indexOf(jobid) == -1 && running.indexOf(jobid) == -1) { // cancelled ??
								clearInterval(complete_interval);
								callback_function(jobid, [], seed_object); // send blank
							}
						}
					}
				});
				
			}, 4000);
			
			// returns ? polling object?
			//callback_function(rs.jobid);
			//{"status": "ok", "jobid": "eba5fb86b0d811e3b43b00121792b1ad"}
			//callback_function();
		}
	});
}
//
AMT___requests_factory.prototype.email = function(email_object, callback_function) //
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
 * AMT___items_factory
 * @
 * @
 */
function AMT___items_factory(obj_vars) {
	// this.___SKIP_SITES = ''; // would this work?
}
//AMT___items_factory.prototype.create__input_scrape_button = function(requests_factory, object_options, callback_function) // X: pass reference
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
// TODO: REMOVE FROM FILE
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
	return el_inp;
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
	
	this.proxy_init = function() {
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?u='+this.encodedURI+'&catch_include='+encodeURIComponent(this.obj_vars.catch_include),
			onload: function(response) {
				//var rs = response.responseText;
			}
		});
	}
	
	this.proxy_waitComplete = function(callback_function) {
		var this_obj = this;
		//console.log(this);return;
		var xint = setInterval(function() {
			GM_xmlhttpRequest({ // init
				method: "GET",
				url: AMT___POPUP___PROXY_REDACTED_+'/mturk/.scripts/google/get-page.php?v='+ this_obj.encodedURI, //this.encodedURI,
				onload: function(response) {
					var rs = response.responseText;
					
					//this = this_obj;
					
					if (rs.trim() != '') {
						clearInterval(xint);
					} else
						return;
					
					// yahoo? (yahoo_array: true)
					if (this_obj.obj_vars.yahoo_array) {
						rs = this_obj.array_yahoo_results(rs);
					}
					
					if (this_obj.obj_vars.seed_arg1) {
						callback_function(rs, this_obj.obj_vars.seed_arg1);
						//callback_function(rs, this.obj_vars.seed_arg1)
					} else
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
 * Replace selected text (Range)
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
var AMT___POPUP___PROXY_REDACTED_ = MT___host; // default is MT___host!

function AMT___POPUP__initializeGlobals(callback_function) {
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__USER_SET_TYPE"
		},
		function(response) {
			if (response.data) {
				var r = JSON.parse(response.data); // { data: "{}" } or { data: "{ type: "" }" }
				
				//{ type: "[regular OR server side]" }
				//~ if (r.type == 'server side') {
					//~ MT__DOSUBMIT__USER_SET_TYPE = 'server side';
				//~ }
				//console.log(r);
				
				if (r.type) {
					MT__DOSUBMIT__USER_SET_TYPE = r.type;
				}
				if (r._PROXY_REDACTED_ && r._PROXY_REDACTED_.length > 6) {
					AMT___POPUP___PROXY_REDACTED_ = r._PROXY_REDACTED_;
				}
			} else {
				
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
	chrome.extension.sendRequest({method: "getLocalStorage", key: "MT__DOSUBMIT__ALL_JOBS_CHR"}, function(response) {
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
	c.setAttribute('style','position:fixed;top:30px;left:0px;width:80px;text-align:center;z-index:0;background-color:MistyRose;border:2px solid LightCoral;');
	c.setAttribute('id','MT___page1_show_jobs_play_audio');
	c.setAttribute('controls','');
	c.setAttribute('src',MT___AUDIO_SNIPPET);
	document.body.appendChild(c);
	c = document.getElementById('MT___page1_show_jobs_play_audio');
	c.play();
	// remove after 10 seconds
	setTimeout(function() {
		document.body.removeChild(document.getElementById('MT___page1_show_jobs_play_audio'));
	}, 10000);
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
		'A Global Media Analytics',
		'411Richmond',
		'Visual Genome'
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
		//
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
		GM_addStyle('#div__reload>hr,#div__reload2>hr  {margin:0;padding:0;}');
		GM_addStyle('#div__reload,#div__reload2  {z-index:100;}');
		GM_addStyle('.cont:hover {background-color: #e9d8e9}');
		GM_addStyle('.cont_link {text-decoration:none;color:black;}');
		GM_addStyle('.cont_link:hover {font-weight:bold;}');
		// get started
		MT___page1_async_last_update();
		
		// set interval for time since posted timers
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
						
						setTimeout(function(){ MT___page1_async_last_update(); }, 4000);
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
					x = document.getElementById('div__main');
					if (x) {
						document.body.removeChild(x);
					}
					
					var div;
					var div_main;
					//
					div_main=document.createElement('div');
					div_main.setAttribute('id','div__main');
					div_main.setAttribute('style',
							'position:absolute;'+
							'top:40px;'+
							'width:98%;'+
							'background-color:none;'
					);
					//
					div=document.createElement('div');
					div.setAttribute('id','div__reload');
					div.setAttribute('style',
							'margin:0 auto;'+
							'width:98%;'+
							'max-width:1000px;'+
							'height:500px;'+
							'overflow:auto;'+
							'background-color:#fdfdfd;'+
							'border:4px solid #d2d2d2;'//+
							//':;'+
					);
					div_main.appendChild(div);
					//
					div=document.createElement('div');
					div.setAttribute('id','div__reload2');
					div.setAttribute('style',
							'margin:0 auto;'+
							'width:100%;'+
							'max-width:1000px;'+
							'height:500px;'+
							'overflow:auto;'+
							'background-color:#fdfdfd;'+
							'border:4px solid #d2d2d2;'//+
							//':;'+
					);
					div_main.appendChild(div);
					
					document.body.appendChild(div_main);
					var div__reload=document.getElementById('div__reload');
					var div__reload2=document.getElementById('div__reload2');
					
					//~ div__reload2.style.position		= 'absolute';
					//~ div__reload2.style.top			= '540px';
					//~ div__reload2.style.left			= '50%';
					//~ div__reload2.style.marginLeft = '-48%';
					//~ div__reload2.style.width	   = '96%';
					//~ div__reload2.style.height		= '500px';
					//~ div__reload2.style.overflow		= 'auto';
					//~ div__reload2.style.backgroundColor = 'white';
					//~ div__reload2.style.border = '4px solid #d2d2d2';
					//~ //div__reload2.style.marginLeft	= '-450px';
					//~ 'position:absolute;'+
					//~ 'top:40px;'+
					//~ 'left:50%;'+
					//~ 'transform: translate(-50%);'+
					//~ //'margin:0 auto;'+
					//~ 'width:100%;'+
					//~ 'max-width:1000px;'+
					//~ 'height:500px;'+
					//~ 'overflow:auto;'+
					//~ div__reload.style.position = 'absolute';
					//~ div__reload.style.top	   = '30px';
					//~ div__reload.style.left		= '50%';
					//~ div__reload.style.width		= '100%';
					//~ div__reload.style.maxWidth	= '1000px';
					//~ div__reload.style.height	= '500px';
					//~ div__reload.style.overflow = 'auto';
					//~ div__reload.style.backgroundColor = 'white';
					//~ div__reload.style.border = '4px solid #d2d2d2';
					//~ div__reload.style.transform = 'translate(-50%)';
					//
					//div__reload2.style.width		= '900px';
					//~ 
					//~ div__reload.addEventListener('load', function() {
						//~ var x = this.getBoundingClientRect();
						//~ 
						//~ this.style.marginLeft = x.left / 2 * -1;
					//~ }, false);
					
					
					/**
					 *
					//rs
					//0 job DB id
					//1 on_page_number
					//2 job title
					//3 requester name
					//4 # avail.
					//5 time since posted
					//6 requesterid
					//7 groupid
					*/
					
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
						
						d = MT___page1_date_format(rs[3][i]);
						
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
						if (!__js_inarray(ignore_requesters, rs[3][i]))
						{
							div__reload.appendChild(div_contain);
							div__reload.appendChild(document.createElement('hr'));
							//div__reload.innerHTML = div__reload.innerHTML + '<hr style="margin:0;" />' + st;
						}
						else
						{
							div__reload2.appendChild(div_contain);
							div__reload2.appendChild(document.createElement('hr'));
							//div__reload2.innerHTML = div__reload2.innerHTML + '<hr style="margin:0;" />' + st;
						}
						
						
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
					
				}
			});
		}
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
		d.setAttribute('style','position:fixed;top:0px;left:50%;width:120px;height:24px;margin-left:120px;z-index:1000;');
		d.setAttribute('value','Return and Accept');
		document.body.appendChild(d);
		var d = document.createElement('input');
		d.setAttribute('id','MT__gm_returnaccept_serverSide');
		d.setAttribute('type','button');
		d.setAttribute('style','position:fixed;top:0px;left:50%;width:20px;height:24px;margin-left:240px;z-index:1000;padding-left:0;padding-right:0;');
		d.setAttribute('value','SV');
		document.body.appendChild(d);
		
		// local
		document.getElementById('MT__gm_returnaccept').addEventListener('click', function() {
			
			this.style.backgroundColor='#9e9e9e';
			
			function MT__RETURN_AND_ACCEPT(time_to_submit) {
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
			doSubmit(false, false, MT__RETURN_AND_ACCEPT); // false,false,noSubmit
		}, false);
		
		// serverSide
		document.getElementById('MT__gm_returnaccept_serverSide').addEventListener('click', function() {
			
			this.style.backgroundColor='#9e9e9e';
			
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
	{name: 'Bosnia and Herzogovina', code: 'BA'}, 
	{name: 'Curacao', code: 'CW'}, 
	{name: 'Cocos Islands', code: 'CC'}, 
	{name: 'Sao Tome and Principe', code: 'ST'}, 
	{name: 'Afghanistan', code: 'AF'}, 
	{name: 'Aland Islands', code: 'AX'}, 
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
	{name: 'Saint Martin', code: 'MF'}, 
	{name: 'Saint Pierre and Miquelon', code: 'PM'}, 
	{name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
	{name: 'St. Vincent & Grenadines', code: 'VC'}, 
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
	{name: 'South Korea', code: 'KR'}, 
	{name: 'Spain', code: 'ES'}, 
	{name: 'Sri Lanka', code: 'LK'}, 
	{name: 'Sudan', code: 'SD'}, 
	{name: 'Suriname', code: 'SR'}, 
	{name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
	{name: 'Swaziland', code: 'SZ'}, 
	{name: 'Sweden', code: 'SE'}, 
	{name: 'Switzerland', code: 'CH'}, 
	{name: 'Syrian Arab Republic', code: 'SY'}, 
	{name: 'Syria', code: 'SY'}, 
	{name: 'Taiwan', code: 'TW'}, 
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
/*
 * MT___google_api_reverseGeocode
 * return reverse lat/lng
**/
function MT___google_api_reverseGeocode(latlng, callback_function, use_a_proxy) { //, return_complete_response) { // latlng->str
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+encodeURIComponent(latlng)+'&sensor=false';
	
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
		}, 200);
	}
}
/*
 * MT___google_api_geocode
 * return lat/lng or full response object
**/
function MT___google_api_geocode(location, callback_function, return_complete_response, use_a_proxy) {
	var u = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(location)+'&sensor=false';
	
	//http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false
	
	if (!use_a_proxy) {
		
		GM_xmlhttpRequest({ // init
			method: "GET",
			url: MT___host + '/mturk/util.php?AMT__output_html_from_URL='+encodeURIComponent(u),
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
			}, 600);
		});
	}
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
