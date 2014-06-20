console.log("COGITO ERGO SUM!");


chrome.extension.onMessage.addListener( function(request,sender,sendResponse)
{
	console.log("background recieved message");
    if(request.recording10 == "true" )
    {
        chrome.tabs.query({active:true},function(tabs){
			console.log("10 minute recording");
			setTimeout(function(){
				//alert("Hello")
				play_single_sound("109662__grunz__success.wav");
				},600000);    
        });        
    }
    else if(request.recording30 == "true")
    {
		chrome.tabs.query({active:true},function(tabs){
		console.log("30 minute recording");
			setTimeout(function(){
				play_single_sound("109662__grunz__success.wav");
				},3000000);    
        }); 
	}
	else if(request.addHit == "true")
    {
		var newHit = request.hit;
		//console.log(allHits);
		if(!localStorage["SUBMIT CHECKER HITS"])
		{
			localStorage["SUBMIT CHECKER HITS"] = JSON.stringify(new Array());
		}
		if(!localStorage["HITCOUNTS"])
		{
			localStorage["HITCOUNTS"] = JSON.stringify(new Array());
		}
		
		var groupId = newHit.groupId;
		var time = newHit.time;
		
		var allHitCounts = JSON.parse(localStorage["HITCOUNTS"]);
		if(!allHitCounts[groupId])
		{
			allHitCounts.push(new HitCounter(groupId, time));
		}
		else
		{
			allHitCounts[groupId].count++;
		}
		localStorage["HITCOUNTS"] = JSON.stringify(allHitCounts);


		//console.log(newHit);
		var allHits = JSON.parse(localStorage["SUBMIT CHECKER HITS"]);
		

		
		
		allHits.push(newHit);
		allHits = JSON.stringify(allHits);
		localStorage["SUBMIT CHECKER HITS"] = allHits;
		console.log("background added hit");
		//play_single_sound("cash-register-05.wav"); //use for debug
	}
});


function HitCounter(groupId, time)
{
	this.groupId = groupId;
	this.time = time;
	this.count = 1;
}


	function play_single_sound(fileName) {
		//document.createElement(
		var sound = document.createElement('audio');
		sound.setAttribute("src", fileName);
		sound.play();
	}

/**

function getTimesForSubmissions(hists) {
		//console.log(hists);
		
				
		var count = 0;
		
		//console.log(hists[1]);
		
		hists.sort(function(a,b){return b.visitTime-a.visitTime})
		
		console.log(new Date());
		
		var times = new Array()
		for(i = 0; i <24; i++)
		{
			for(j = 0; j < 60; j+=15)
			{
				times.push({"time":"" + i + ":" + (j == 0 ? "00" : j)});
			}			
		}
		console.log(times);
		
		console.log(hists.length);
		console.log(new Date(hists[hists.length -1].visitTime));
		
		return;
		
		
		
		var count;
		
		for(i in hists)
		{
			//console.log(hists[i]);
			//console.log(new Date(hists[i].visitTime));
			var timeStamp = new Date(hists[i].visitTime).getHours() + ":" +
							new Date(hists[i].visitTime).getMinutes()
			console.log(timeStamp);
			
			if(hists[i].transition == "manual_subframe")
			{
				
			}
		}
	}



//uncomment below to restart recording of submission times
//localStorage["SUPER AWESOME SUBMISSION MONITOR"] = JSON.stringify(new Array());

if(!localStorage["SUPER AWESOME SUBMISSION MONITOR"])
{
	localStorage["SUPER AWESOME SUBMISSION MONITOR"] = JSON.stringify(new Array());
}


chrome.history.onVisited.addListener(function(e) {
		//console.log(e);
		if(e.url == "https://www.mturk.com/mturk/externalSubmit")
		{
			if(!localStorage["SUPER AWESOME SUBMISSION MONITOR"])
			{
				//localStorage broke
				//Sound an alarm or something (implement later)
				localStorage["SUPER AWESOME SUBMISSION MONITOR"] = JSON.stringify(new Array());
			}
			var newStorage = JSON.parse(localStorage["SUPER AWESOME SUBMISSION MONITOR"]);
			newStorage.push(e);
			
			//var lastVisitTime;	
			newStorage.sort(function(a,b){return b.lastVisitTime-a.lastVisitTime});
			
			/*
			for(i in newStorage)
			{
				lastVisitTime = newStorage[i].lastVisitTime;
				lastVisitTime = (new Date()).getTime() - lastVisitTime;
				lastVisitTime = lastVisitTime/1000/60;
				//do anything you want here
			}

			localStorage["SUPER AWESOME SUBMISSION MONITOR"] = JSON.stringify(newStorage);
			
			//Uncomment below to turn on cash register sound
			//play_single_sound("cash-register-05.wav");
		}
		else
		{
			//console.log("local storage:" + localStorage["SUPER AWESOME SUBMISSION MONITOR"]);
		}
	});

**/
