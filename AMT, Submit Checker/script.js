//console.log("Submit Checker content script");

function hit(rew, reqId, reqName, jName,gId) {
			this.reward = rew;
			this.requesterId = reqId;
			this.requesterName = reqName;
			this.jobName = jName;
			this.groupId = gId;
			this.time = (new Date()).getTime();
		}

var documentText = document.documentElement.innerHTML;
//console.log(documentText);
if(documentText.indexOf('<span id="alertboxHeader">Your results have been submitted to') != -1 &&
   documentText.indexOf('and will be approved or rejected shortly.') != -1)
{
	//console.log("Results have been submitted!");

	var rew = document.getElementsByClassName("reward")[1].innerText.trim();
	rew = (rew.replace(/\$/, "")) * 1; //0.03
	//console.log(rew);
	
	//var reqId = document.getElementsByName("requesterId")[0].value.trim();
	var reqIdReg = /name="requesterId" value="([^"]+)"/;
	
	//console.log(documentText);

	//console.log(reqIdReg.exec(documentText));
	var reqId;
	var temp
	if(temp = reqIdReg.exec(documentText))
		reqId = temp[1];
	else		
		reqId = "Undefined Requester Id";
	
	var reqName = document.getElementsByClassName("capsule_field_text")[0].innerText.trim();

	var jName = document.getElementsByClassName("capsulelink_bold")[0].innerText.trim();
	
	var gId = document.getElementsByName("groupId")[0].value.trim();

	
	var h = new hit(rew, reqId, reqName, jName, gId);
	//console.log(h);
	chrome.extension.sendMessage({recording: "false", addHit: "true", hit: h},
		   function (response) {   
        });	
}



