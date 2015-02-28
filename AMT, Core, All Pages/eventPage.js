/**
 * Problem:
 * Solution:
 * Implementation: Cross-profiles communication.
 * ScriptA onsubmit	-> Send message to background page to xhr PHP. PHP split queue file by newline. Shift array, write to file. Echo the shifted ID. Push the ID back? Write to file. Exit.
 * ScriptB onload	-> Send message to background page to start script (profiles-queue-script). BG page send to PHP the windowId. PHP add to end of file+newline if NOT in file. Onresponse Start interval of xhr.load(text-file ?random()=). Interval is probably 60ms-80ms or so. Onresponse of text-file?=random(), if response.indexOf(windowId + newline) == 0 then do window.update(...active:true).
 * 
 * Consider implementing http://srchea.com/build-a-real-time-application-using-html5-websockets ?
 * 
 **/
/**
 * THIS IS A TEST
 * When using two separate profiles this switches from
 * one back to the other when each respective interval
 * is fired. This IS somewhat counter-intuitive, i.e. normally
 * the two profile "sessions"/browser windows are completely
 * separate.
 */
//~ chrome.windows.getCurrent(function (window) {
	//~ // ..
	//~ console.log(window);
	//~ // Set int.
	//~ setInterval(function() {
		//~ // Update to set active
		//~ chrome.windows.update(
			//~ window.id,
			//~ {
				//~ focused: true
			//~ }, function(window) {
				//~ // ...
				//~ console.log('Updated window.')
			//~ }
		//~ );
		//~ 
	//~ }, 4000);
//~ });
/**
 * chrome.extension.onRequest.addListener
 * Listen for messages from core-mturk scripts
 * 
 * 
 * 
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	
	
	if(request.setUtilityTabs) {
		console.log('sender');
		console.log(sender.tab);
		if(localStorage['UTILITY_WINDOW'] == 'unset' || localStorage['UTILITY_WINDOW'] == undefined) {
			alert('no utility window set');
			return false;
		}
		
		var senderId = sender.tab.id;
		if(UtilityAMTPairs[senderId] &&
		   UtilityAMTPairs[senderId].utilities &&
		   UtilityAMTPairs[senderId].utilities.length > 0) {
			//Remove all of the old utility tabs
			var tabIdsToRemove = []
			for(var i = 0; i < UtilityAMTPairs[senderId].utilities.length; i++) {
				tabIdsToRemove.push(UtilityAMTPairs[senderId].utilities[i].tabId);
			}
			chrome.tabs.remove(tabIdsToRemove);
		}
		
		
		UtilityAMTPairs[senderId] = new AMTUtilitiesObj({
															ownerTabId:senderId,
															utilities: request.setUtilityTabs.utilities
														});
		UtilityAMTPairs.options = request.setUtilityTabs.options;
		console.log(UtilityAMTPairs);
		//console.log(a.b.c);
			//~ chrome.windows.get(localStorage['UTILITY_WINDOW'], {populate:true}, function() { 
					//~ //Get the latest index of what's here
				//~ 
				//~ });
			
		for(var i = 0; i < UtilityAMTPairs[senderId].utilities.length; i++) {
				//Create a tab for each utilityTab in utilities
				currentUtility = UtilityAMTPairs[senderId].utilities[i];
				var tabIdentifier = '###tabId'+senderId+'###at'+i;
				if(!currentUtility.url || currentUtility.url.trim() == '') {
					currentUtility.url = 'http://192.168.1.2/mturk/util.php?AMT__utility_window_placeholder&random=0.2908705766312778';
					//~ currentUtility.url = 'includes/blankUtilityTab.html';
				}
				currentUtility.url += tabIdentifier;
				chrome.tabs.create({windowId: localStorage['UTILITY_WINDOW']*1, url:currentUtility.url, 
																				active: (currentUtility.active != null ? currentUtility.active : 
																														 (sender.tab.active && i == 0 ? true :false))}, 
					function(newTab) {
						console.log('New Tab Created with url:' +newTab.url);
						var ownerTabId = /###tabId(\d+)/.exec(newTab.url)[1];
						console.log('ownerTabId:' + ownerTabId);
						var utTabPos = /###at(\d+)/.exec(newTab.url)[1];
						console.log('utTabPos:' + utTabPos);
						UtilityAMTPairs[senderId].utilities[utTabPos].tabId = newTab.id;
						console.log(UtilityAMTPairs);
						

					});
		}
	}
	
	if(request.switchToUtilityTab) {
		for(var i in UtilityAMTPairs) {
			if(UtilityAMTPairs[i] && UtilityAMTPairs[i].utilities && UtilityAMTPairs[i].utilities.length) {
				for(var j = 0; j < UtilityAMTPairs[i].utilities.length; j++) {
					if(UtilityAMTPairs[i].utilities[j].id == request.switchToUtilityTab) {
						chrome.tabs.update(UtilityAMTPairs[i].utilities[j].tabId, {active:true});
						break;
					}
				}
			}
		}
	}
	
	//~ /**
	 //~ * request.count_number_of_captcha_tabs
	 //~ * 
	 //~ * NOTE:
	 //~ * query: match title=CAPTCHA, url=*://*.mturk.com/, status:complete
	 //~ */
	//~ if(request.count_number_of_captcha_tabs) {
		//~ chrome.tabs.query({title: 'CAPTCHA', url: ['*://*.mturk.com/'], status: 'complete'}, function(tabs) {
			//~ sendResponse({count_number_of_captcha_tabs: tabs.length});
		//~ });
	//~ }
	
	/**
	 * 
	 */
	if (request.add_tab_to_captcha_queue) {
		if (!sender.tab.incognito)
			CAPTCHA_tab_queue.add(sender.tab.id);
		else
			CAPTCHA_tab_queue__incognito.add(sender.tab.id);
	}
	
	/**
	 * 
	 */
	if (request.CAPTCHA_tab_queue_process) {
		if (!sender.tab.incognito)
			CAPTCHA_tab_queue.init_process();
		else
			CAPTCHA_tab_queue__incognito.init_process();
	}
	
	
	if(request.play_random_next_sound) {
		
		playRandomNextSound();
	
		//AMT___play_single_sound(soundName)
	}
	
	
	if(request.copyInp) {
		copyInp = document.createElement('input');
		copyInp.setAttribute('type','text');
		copyInp.setAttribute('id','copyInp');
		copyInp.value = request.copyInp;
		console.log('inside copyInp');
		console.log(copyInp);
		console.log(document);
		document.body.appendChild(copyInp);
		//var copyInp = document.getElementById('copyInp');
		copyInp.focus();

		document.execCommand('selectAll');

		//Copy Content
		document.execCommand("Copy", false, null);
	}
	
	//RA Hotkey
	if(request.toggleRAHotkey) {
		localStorage['RAHotkey'] = request.toggleRAHotkey;
	}
	if(request.getRAHotkey) {
		sendResponse({RAHotkey:localStorage['RAHotkey']});
	}
	
	//NTPassBy
	if(request.getNTPassBy) {
		sendResponse({NTPassBy:localStorage['NTPassBy']});
	}
	if(request.toggleNTPassBy) {
		localStorage['NTPassBy'] = request.toggleNTPassBy;
	}
	
	//isUtilityWindow
	if(request.getIsUtilityWindow) {
		if(localStorage['UTILITY_WINDOW'] == 'unset' || localStorage['UTILITY_WINDOW'] == undefined){
			sendResponse({UTILITY_WINDOW:'unset'});
		}
		else {
			try {
				chrome.windows.get(localStorage['UTILITY_WINDOW'] *1 , function(window) {
					if(!window || window.length == 0) {
						localStorage[UTILITY_WINDOW] = 'unset';
					}
				
					sendResponse({UTILITY_WINDOW:localStorage['UTILITY_WINDOW']});
				});
				console.log('returning true to keep connection alive');
			} 
			catch(err) {
				localStorage[UTILITY_WINDOW] = 'unset';
				sendResponse({UTILITY_WINDOW:localStorage['UTILITY_WINDOW']});
			}
			return true;
		}
	}
	
	if(request.setUTILITY_WINDOW) {
		//console.log(sender.tab.window);
		//console.log(sender.window);
		chrome.windows.getLastFocused({}, function(window) {
			console.log(window);
			chrome.windows.update(window.id, {state:'fullscreen'});
			localStorage['UTILITY_WINDOW'] = window.id;
			sendResponse({UTILITY_WINDOW:localStorage['UTILITY_WINDOW']});
		});
		return true;
	}
	
	
	if(request.getIsSpecialWorkflowWindow) {
		if(localStorage['SPECIAL_WORKFLOW_WINDOW'] == 'unset' || localStorage['SPECIAL_WORKFLOW_WINDOW'] == undefined){
			sendResponse({SPECIAL_WORKFLOW_WINDOW:'unset'});
		}
		else {
			try {
				chrome.windows.get(localStorage['SPECIAL_WORKFLOW_WINDOW'] *1 , function(window) {
					if(!window || window.length == 0) {
						localStorage[SPECIAL_WORKFLOW_WINDOW] = 'unset';
					}
				
					sendResponse({SPECIAL_WORKFLOW_WINDOW:localStorage['SPECIAL_WORKFLOW_WINDOW']});
				});
				console.log('returning true to keep connection alive');
			} 
			catch(err) {
				localStorage[SPECIAL_WORKFLOW_WINDOW] = 'unset';
				sendResponse({SPECIAL_WORKFLOW_WINDOW:localStorage['SPECIAL_WORKFLOW_WINDOW']});
			}
			return true;
		}
	}
	
	if(request.amISpecialWorkflowWindow) {
		sendResponse({detail: (localStorage['SPECIAL_WORKFLOW_WINDOW']*1 == sender.tab.windowId)});
	}
	
	if(request.setSPECIAL_WORKFLOW_WINDOW) {
		//console.log(sender.tab.window);
		//console.log(sender.window);
		chrome.windows.getLastFocused({}, function(window) {
			console.log(window);
			chrome.windows.update(window.id, {state:'fullscreen'});
			localStorage['SPECIAL_WORKFLOW_WINDOW'] = window.id;
			sendResponse({SPECIAL_WORKFLOW_WINDOW:localStorage['SPECIAL_WORKFLOW_WINDOW']});
		});
		return true;
	}
	
	
	//RA_Button_NextTab
	if(request.toggleRA_Button_NextTab) {
		localStorage['RA_Button_NextTab'] = request.toggleRA_Button_NextTab;
		var RA_Button_NextTab = request.toggleRA_Button_NextTab;
		chrome.tabs.query({}, function(allTabs) {
				if(!allTabs.length)
					allTabs = [allTabs];
				for(var i = 0; i < allTabs.length; i++) {
					chrome.tabs.sendRequest(allTabs[i].id, {RA_Button_NextTab:RA_Button_NextTab}, function(rs) {
							//Squelch response
						});
				}
			});
	}
	if(request.getRA_Button_NextTab) {
		sendResponse({RA_Button_NextTab:localStorage['RA_Button_NextTab']});
	}
	
	
	//R_Button_NextTab
	if(request.toggleR_Button_NextTab) {
		localStorage['R_Button_NextTab'] = request.toggleR_Button_NextTab;
	}
	if(request.getR_Button_NextTab) {
		sendResponse({R_Button_NextTab:localStorage['R_Button_NextTab']});
	}
	
	
	
	
	if(request.setRACustomKey) {
		localStorage['RACustomKey'] = request.setRACustomKey;
		var RACustomKey = request.setRACustomKey;
		chrome.tabs.query({}, function(allTabs) {
				if(!allTabs.length)
					allTabs = [allTabs];
				for(var i = 0; i < allTabs.length; i++) {
					chrome.tabs.sendRequest(allTabs[i].id, {RACustomKey:RACustomKey}, function(rs) {
							//Squelch response
						});
				}
			});
	}

	
	
	if(request.getRACustomKey) {
		sendResponse({RACustomKey:localStorage['RACustomKey']});
	}
	
	/**
	 * 
	 * Dosubmit change tab
	 * 
	 * **/
	 //console.log('abc123');
	 if(request.doSubmitChangeTabIcon) {
		 //console.log('here123');
		 //console.log(sender);
		 chrome.tabs.executeScript(sender.tab.id, {
					code: 
						"(function() {console.log('green light!');var link = document.createElement('link');link.type = 'image/x-icon';link.rel = 'icon';link.href='data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2/83n8/+BzvL/Qbjv/4/S8v+P0vL/dMry/7Tf8//29vb/9vb2//b29v/29vb/9vb2//b29v/N5/P/gc7y/0G47/+aAQL/kQAB/48AAP+P0vL/j9Ly/6MKBf+bAAH/nQAE/3TK8v+03/P/9vb2//b29v/29vb/lAYB/5kAAv+XAAL/kwAC/40AAP+SAgH/j9Ly/4/S8v+gAgH/owgD/54BAv+fAwD/owkC/6MGBf/29vb/9vb2/5cEAf+VAQH/jQAC/4sAAf+QAQH/mAMC/4/S8v+P0vL/pA0F/6cTBP+cBQH/nAcA/6IPAP+bBQD/9vb2//b29v+zKAj/lA0A/4YBAP+IAAD/lgAC/6AHAv+P0vL/j9Ly/7UuCv+tGAX/qA8I/6cRAf+tGgH/pxEG//b29v/29vb/5JYQ/8ZjCv+gGQL/mQYB/5gDBP+kGQP/j9Ly/4/S8v+uHQT/owoF/6oZAv+4Lgn/sikL/58UCP/29vb/9vb2/81wBf/lkg7/0mMK/741Cv+mIwL/x2YM/4/S8v+P0vL/pwkB/7kjA//ENg7/ty8N/5EKAf+LAgf/9vb2//b29v+kGgP/rS8D/7s9C/+oIwP/zWsO/+60J/+P0vL/j9Ly/6QFAv+mBQL/nwUB/5UFAf+IAAL/hAAI//b29v/29vb/nwEC/58GAP+mFwT/rygE/8l2Bv/Qhgb/j9Ly/4/S8v+XAAL/nAAB/5kAA/+RAAT/iAAC/4QAAf/29vb/9vb2/50AAf+aAQL/mwMD/7IcA//Sfwj/Tr3x/8Pk9P/C4/P/Tr3x/5kJAP+SAgD/jwAD/4wAA/+JAAH/9/f3//f39/+KAQD/igAE/0698f+b1vL/3e31/9rt9v+O1/b/jtf2/9rt9v/d7fX/m9by/0698f+fBgH/kgMA//f39//39/f/nNfz/93t9f/b7vf/jtf2/zi+9//Uhgb/4ZoL/9J3Bf+zPgL/OL73/4/Y9//a7fb/3u72/5vW8v/4+Pj/+Pj4//j4+P+C1Pf/fgEE/4kJAP/HXAz/zYAD/9OEBv/GXQn/sDcH/5wDAv+RAgD/kgUB/4LU9//4+Pj/+Pj4//j4+P/5+fn/+Pj4//n5+f/L6/j/gtT3/0bC9//CXwf/pCAB/0fD+P+C1Pf/zOz5//j4+P/5+fn/+Pj4//n5+f/5+fn/+fn5//n5+f/5+fn/+fn5//n5+f/5+fn/+fn5//n5+f/5+fn/+fn5//n5+f/5+fn/+fn5//n5+f/5+fn/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';document.getElementsByTagName('head')[0].appendChild(link);})();"
					});
	 
	 
	 
	 
	 }
	/**
	 * 
	 * Captcha change tab icon
	 * 
	 * **/
	 //console.log('abc123');
	 if(request.captchaChangeTabIcon) {
		 //console.log('here123');
		 //console.log(sender);
		 chrome.tabs.executeScript(sender.tab.id, {
					code: 
						"(function() {console.log('green light!');var link = document.createElement('link');link.type = 'image/x-icon';link.rel = 'icon';link.href='data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADs7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/93d3f+Tk5P/YmJi/z4+Pv8jIyP/Dg4O/w4ODv8ODg7/Dg4O/x8fH/89PT3/YmJi/6enp//m5ub/7Ozs/5aWlv8MDAz/IyMj/2BgYP+JiYn/oaGh/7a2tv+9vb3/vb29/7Kysv+YmJj/fn5+/2BgYP8oKCj/GBgY/7S0tP8zMzP/w8PD/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/7S0tP89PT3/YmJi/9PT0//s7Oz/7Ozs/4mJif/s7Oz/7Ozs/9PT0/+YmJj/7Ozs/+zs7P+6urr/u7u7/+zs7P/Z2dn/bW1t/+Li4v+0tLT/7Ozs/+zs7P9eXl7/0tLS/+zs7P/s7Oz/PT09/+Tk5P/s7Oz/5ubm/0pKSv/s7Oz/v7+//+Dg4P/s7Oz/7Ozs/+zs7P/s7Oz/mJiY/3l5ef/s7Oz/7Ozs/21tbf+JiYn/7Ozs/+zs7P9GRkb/ysrK/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/4uLi/9lZWX/7Ozs/+zs7P+Pj4//S0tL/+zs7P/s7Oz/OTk5/7i4uP/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/9fX1/8WFhb/urq6/+zs7P/s7Oz/TU1N/2JiYv/s7Oz/mpqa/yMjI//q6ur/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P9ERET/a2tr/+zs7P/s7Oz/mJiY/wcHB//IyMj/0tLS/xISEv+6urr/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/FxcX/ISEh/+bm5v/s7Oz/zs7O/wsLC/+IiIj/7Ozs/3Jycv9tbW3/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/uLi4/09PT//s7Oz/7Ozs/2NjY/9AQED/7Ozs/+zs7P9lZWX/oaGh/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+rq6v89PT3/7Ozs/+zs7P9KSkr/j4+P/+zs7P/s7Oz/tLS0/3Jycv/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/lZWV/8XFxf/s7Oz/goKC/3R0dP/s7Oz/7Ozs/+zs7P9vb2//7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/g4OD/7Ozs/9/f3/9GRkb/7Ozs/+zs7P/s7Oz/39/f/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/jY2N/9fX1//s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';document.getElementsByTagName('head')[0].appendChild(link);})();"
					});
	}
	 
	
	/**
	 * request.addToTabsQ
	 */
	if(request.addToTabsQ)
	{
		var isTopWindow = request.isTopWindow;
		chrome.tabs.executeScript(sender.tab.id, {
					code: 
						"(function() {var link = document.createElement('link');document.title = 'TQ';link.type = 'image/x-icon';link.rel = 'icon';link.href='data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD9/f0F/Pz8DP///wD///8P////Dv///xL///8P////A////wD///8A/v7+Cf///wX///8A////APv7+wr9/f0D+/v7Dv///wb///81+vv8i/v7/Iv3+PqL4+nxi+ru9JHy9Piu5+zzru3w9ZD+/v5x/v7+H////wr///8A9/f3H/7+/g7///8J////HNDX5Pyaq8j/m6zJ/5esy/+QpcX/larK/5uwzv+MoMH/mqrG/5qlv+7Q0Nty/f3+Af///wD///8A/v7+A////wz+/v6b2d/q/4abvf+Emr7/jKHD/5Gnyf+Uqsz/fpW5/4mXuP/U1OL/e3ui+MPE0l7///8A////AP///wD///8P////Xa680/9/lrr/kafJ/5yy0/+WrM7/nbPT/52uyv+ktM7/1NTi/8LC1f+lpr3n////AP///wD///8A////AP7+/mDo7PL/ytPi/5yv0fehsuXuuMvl0Kq81drS2uf8+/z9bff3+SG5uM1r8vL1ff///wD///8A////AP///wr+/v4H/v7+jufq8umIg/Sut7L9YKul/W7PzvlMnZn03Ozq/x/+/v4H////AP///wD///8A////AP///wD///8A5OH/IpuS/pF3cfPploz/hH5y/6F/dP+gl47/gkw++e7Hwv9Fta//XPj4/gf///8A////AP///wD///8A+vn/BoyB/pGlnf5vfHfxy4mA/JlIOf/lmZD+f1lK/89kWPrPmZD+f9zY/yu3sP5ar6j/ZP///wD///8A6uj/GbSt/l6imv9yVkf/1HBm+MJ5eOrlhX/1s2JY+dRpYPfPv7/zb4+F/41WR//Uloz/hI6E/47///8A////AOro/xmnn/9teW3/qH5y/6HKxf9B9/n7Fc3N9VfMyvlQraj6cbWv/1zj4f4h2tf/Lks7/+NmWP+/0s7/OP///wCvqP9kjoT/jo6E/46Sif+I+vn/Bt3a/ypsX/+5////AH90/6Dj4f4h0Mz/OrWv/1yyq/9gkon/iNzY/yv///8A19P/MvLx/g////8A////APX0/wxvYv6119P/MtzY/ytmWP+/oZj/df///wBQQP/dt7D+Wv///wD///8A////AP///wD///8A////AKyk/2makf9+UUL/283J/z/l4/8f1dH/M////wD///8At7D+Wv39/gH///8A////AP///wD///8A////AP///wDa1/8u2tf/LtrX/y719P8M////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAOAfAADgBwAA4AMAAPABAADwHwAA8d8AAPAfAADonwAA8CEAAOf5AADGvQAA/bcAAP3/AAD//wAA//8AAA==';document.getElementsByTagName('head')[0].appendChild(link);})();"
					});		
		
		var tabId  = sender.tab.id;
		var winId = sender.tab.windowId;
		
		console.log('Recieved "AddTo" from tab: ' + tabId +' window:' + winId);
		console.log('isTopWindow: ' + request.isTopWindow);
		getAllTabsInQ(function(allQTabs) {
			if(allQTabs.length > 0) {

			}
			else {
				//We are the only tab in the Q, so simply jump us there
				console.log('We are the only tab in the Q');
				chrome.tabs.update(tabId, {active: true});
			}
			sendResponse({qProductId: nextTabQId});
			nextTabQId++;
		}, isTopWindow);
		return true;
	}
	
	/**
	 * request.showNextTab
	 */
	if(request.showNextTab)
	{
		var senderTabId = sender.tab.id;
		var isTopWindow = request.isTopWindow;
		function showNextTabAttempt(isTopWindow) {
			var isTopWindow = isTopWindow;
			getAllTabsInQ(function(allQTabs) {
				if(allQTabs.length > 0) {
					//Find the tab with the lowest qProductId and go to that
					var lowestQId = null;
					var nextTabId;
					var lowestTabIndex = 0;

					
					for(var i = 0; i < allQTabs.length; i++) {
						if(!lowestQId || allQTabs[i].qProductId < lowestQId) {
							lowestQId = allQTabs[i].qProductId;
							nextTabId = allQTabs[i].tabId;
							lowestTabIndex = i;
						}
					}
					
					//is the lowest tab the same as the tab sending 'shownexttab', if so, remove from the Q, tell the tab that it's not longer in the Q, and call showNextTabAttempt again.
					
					console.log(sender.tab.id)
					if(senderTabId == nextTabId) {
						allQTabs.splice(lowestTabIndex,1);

												
						//Find the tab with the lowest qProductId and go to that
						var lowestQId = null;
						var nextTabId = null;
						var lowestTabIndex = 0;

						
						for(var i = 0; i < allQTabs.length; i++) {
							if(!lowestQId || allQTabs[i].qProductId < lowestQId) {
								lowestQId = allQTabs[i].qProductId;
								nextTabId = allQTabs[i].tabId;
								lowestTabIndex = i;
							}
						}
						if(!nextTabId) {
							console.log('no next tab to jump to');
						}
						else {
							chrome.tabs.update(nextTabId, {active:true});
							chrome.tabs.sendRequest(nextTabId, {isTopWindow: isTopWindow, focus: true});
						}
						chrome.tabs.sendRequest(senderTabId, {RemoveFromTabsQ: true});
					}
					else {
						chrome.tabs.update(nextTabId, {active:true});
						chrome.tabs.sendRequest(nextTabId, {isTopWindow: isTopWindow, focus: true});
					}
				}
				else {
					//Do nothing
				}
			}, isTopWindow);
		}
		showNextTabAttempt(isTopWindow);
		return true;
	}

	/**
	 * request.match
	 */
	if(request.match)
	{
		//~ console.log("\n Inside match");
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
					//~ console.log("result below");
					//~ console.log(rs);
					//~ console.log("here here");
					
					//kick it back via localStorage, sending a message to global, or sending a response to global?
					//Let's try it as a response
					//sendResponse(rs);
				}
			});	
	}
	
	/**
	 * play_single_sound
	 */
	if(request.method == "play_single_sound")
	{
		AMT___play_single_sound(request.fileName);
	}
	
	if(request.getTabId) {
		sendResponse({id:sender.tab.id});
	}
	
	/**
	 * request.nextTab
	 */
	if(request.nextTab)
	{
		window.request = request;
		chrome.tabs.getAllInWindow(sender.tab.windowId, function(allTabs) {
			
			//~ console.log('Here2');
			//~ console.log(sender);
			
			var currentIndex = -1;
			for(var i = 0; i < allTabs.length; i++)
			{
				if(allTabs[i].active && allTabs[i].id == sender.tab.id)
				{
					var currentIndex = allTabs[i].index;
					break;
				}
			}
			if(currentIndex == -1) {
				//We left the tab that we wanted to switch out of
				//Consider processing option's object even though we will not switch
			}
			else {
				//~ console.log(currentIndex);
				//~ console.log(currentIndex);
				
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
				
				chrome.tabs.update(nextTab, {active: true}, function() {
					//~ alert('here1');
					if(window.request && window.request.options && window.request.options.focusOnPage) {
						console.log('told to focus on page');
						chrome.tabs.sendRequest(nextTab, {focusOnPage: true, isTopWindow:window.request.isTopWindow}, function(response) {
							//squelch response
						});
					}				
				});
			}
			
		});
	}
	
	/**
	 * request.core_nextWindow
	 * 
	 * This will change to the next available window that is not:
	 * a) minimized; and b) focused. It will add this window to an
	 * array of next_window__windowIds[]. When all windows have been
	 * added to the array the window in first position in array
	 * is shifted off of the front, focused, and added to the end
	 * of the array.
	 * 
	 * @param, global: next_window__windowIds = []
	 * [ win1 -changedTo @0.1, win2 -changedTo @0.2, ... winN  -changedTo @0.N ]
	 */
	if(request.core_nextWindow)
	{
		
		//~ chrome.windows.getLastFocused({}, function(window) { // RETURN THE "FOCUSED=TRUE" WINDOW
			//~ console.log(window.id);
		//~ });
		
		chrome.windows.getAll({}, function(windows) { // []
			
			//~ // FIND THE LARGEST WINDOW
			//~ var largest = 0;
			//~ var s = windows[i].height
			
			next_window__windowIds
			
			var available_win = {};
			
			for (var i in windows) {
				if (windows[i].focused) continue;
				if (windows[i].state == 'minimized') continue; // normal, min, maximized, fullscreen
				
				// new win?
				if (!__js_inarray(next_window__windowIds, windows[i].id)) {
					next_window__windowIds.push(windows[i].id);
					chrome.windows.update(windows[i].id, {focused: true});
					return;
				}
				
				// SET THIS TO THE WINDOW OBJECT
				available_win[windows[i].id] = windows[i];
				
				//~ available_win[windows[i]] = true;
				
				//~ available_win.push(windows[i]);
				
				//~ console.log(windows[i]);
				//~ 
			}
			
			// Get first from next_window__windowIds
			// that is in available_win.
			for (var i in next_window__windowIds) {
				//~ if (next_window__windowIds[i].focused) continue;
				//~ if (next_window__windowIds[i].state == 'minimized') continue; // normal, min, maximized, fullscreen
				
				if  (
					available_win.hasOwnProperty(next_window__windowIds[i]) //&&
					//~ !available_win[next_window__windowIds[i]].focused &&
					//~ available_win[next_window__windowIds[i]].state != 'minimized'
					)
				{
					var next = next_window__windowIds[i];
					next_window__windowIds.splice(i, 0, next); // remove and place @ end!
					//next_window__windowIds.splice(i, 0); // remove 
					
					chrome.windows.update(next, {focused: true});
					break;
				}
			}
			
			//~ // add to array
			//~ next_window__windowIds.push(wid);
			//~ 
			//~ // update
			//~ chrome.windows.update(windows[0].id, {active: true});
		});
	}

	/**
	 * The incognito boolean must be known for these
	 */
	/*functions*/
	/**
	 * get_multiple
	 * 
	 * @param id
	 * @param request		object
	 * @param request.keys	array	Array of desired keys (strings)
	 * 
	 * @Returns return_obj	object	An object of requested key/value pairs.
	 */
	function storage__get_multiple(id, request) {
		chrome.tabs.getSelected(id, function(tab) {
			var return_obj = {};
			for (var i in request.keys) {
				var key = request.keys[i];
				if (tab.incognito === true) {
					return_obj[ key ] = localStorage[key + '____INCOGNITO_SESSION'];
				} else {
					return_obj[ key ] = localStorage[key];
				}
			}
			sendResponse({data: return_obj});
		});
	}
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
	// request is a key/data pair. 
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
			if (!request.hasOwnProperty('keys'))
				storage__get(id, request);
			else
				storage__get_multiple(id, request);
		}
		else { // window
			chrome.windows.getCurrent(function(w) {
				if (!request.hasOwnProperty('keys'))
					storage__get(w.id, request);
				else
					storage__get_multiple(id, request);
			});
		}
	}
	// save
	else if (request.method == "saveLocalStorage" && (request.key || request.keys) && request.data) {
		
		var type = (sender.tab) ? 'tab' : 'window';
		var id = (sender.tab) ? sender.tab.windowId : sender.id;
		
		if (type == 'tab') { // tab
			if (request.hasOwnProperty('key'))
				storage__save(id, request);
			else if (request.hasOwnProperty('keys')) {
				for (var i in request.keys) {
					storage__save(id, {
						key:	i,
						data:	request.keys[i]
					});
				}
			}
		}
		else { // window
			chrome.windows.getCurrent(function(w) {
				if (request.hasOwnProperty('key'))
					storage__save(w.id, request);
				else if (request.hasOwnProperty('keys')) {
					for (var i in request.keys) {
						storage__save(id, {
							key:	w.id,
							data:	request.keys[i]
						});
					}
				}
				
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
/**
 * End of onRequest
 */
 
/**
 * Listen for messages from OTHER scripts
 * */
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	/*if (sender.id == 'gcfnekbbpmbgadddbojhlojhddnkcpje') //Don't listen to ourselves (probably won't happen
      return;  // don't allow this extension access*/
    
	//~ /**
     //~ * amIUtilityTab
     //~ */  
    //~ if(request.amIUtilityTab) {
    
	/**
     * amIUtilityTab
     */  
    if(request.amIUtilityTab) {
		console.log('recieved msg from:');
		console.log(sender.tab);
		if(sender.tab.windowId == localStorage['UTILITY_WINDOW']) {
			console.log(UtilityAMTPairs);
			//Set all the global options that every utility tab should have
			
			var optionsToSet = {};
			for(var i in UtilityAMTPairs.options) {
				optionsToSet[i] = UtilityAMTPairs.options[i]
			}

			//UtilityAMTPairs
			
			//Set any options specific to This tab
			for_loop_break:
			for(var i in UtilityAMTPairs) {
				if(UtilityAMTPairs[i] &&
				   UtilityAMTPairs[i].utilities &&
				   UtilityAMTPairs[i].utilities.length > 0) {
					for(var j = 0; j < UtilityAMTPairs[i].utilities.length; j++) {
						if(UtilityAMTPairs[i].utilities[j].tabId == sender.tab.id) {
							console.log('Checking specific options for');
							console.log(UtilityAMTPairs[i].utilities[j]);
							if(UtilityAMTPairs[i].utilities[j].options != undefined) {
								console.log('specific tab options detected!');
								for(var k in UtilityAMTPairs[i].utilities[j].options) {
									optionsToSet[k] = UtilityAMTPairs[i].utilities[j].options[k];
								}
								break for_loop_break;
							}
						}
					}
				}
			}
			console.log('sending:')			
			console.log(optionsToSet);
			if(optionsToSet) {
				optionsToSet.isUtilityTab = true;
				sendResponse(optionsToSet);
			}
		}
		return false;
	}
    
    /**
     * LISTEN FOR ALL PAGES UTILITY WINDOW MESSAGE PASSING
     * 
     * e.g.:
     * {
			util_window_message_passing: true,
			data: {
				key: options.completion_key,
				email_address: this.href.replace(/^ *mailto *:/, '')
			}
	 *	}
     */
    if (request.hasOwnProperty('util_window_message_passing')) {
		console.log('Recieved Msg From Utility Window');
		console.log(UtilityAMTPairs);
		console.log(sender);
		console.log(request);
		
		for_loop_break_dance_if_you_want_to:
		for(var i in UtilityAMTPairs) {
				if(UtilityAMTPairs[i] &&
				   UtilityAMTPairs[i].utilities &&
				   UtilityAMTPairs[i].utilities.length > 0) {
					for(var j = 0; j < UtilityAMTPairs[i].utilities.length; j++) {
						if(UtilityAMTPairs[i].utilities[j].tabId == sender.tab.id) {
						console.log('found ' + i + ' so piping data through'); 	
						request.fromUtilityToParent = true;	
						
						// Activate parent tab
						if(request.focus) {
							chrome.tabs.update(i*1, {active: true});
							// Get windowId
							chrome.tabs.get(i*1, function (tab) {
								// Activate window
								console.log('focusing window');
								chrome.windows.update(tab.windowId, {focused: true}, function (window) {});
							})
						}
						
						
						//
						
						chrome.tabs.sendMessage((i*1), request, function(response) {
								//squelch response
							});
							break for_loop_break_dance_if_you_want_to;
						}
					}
				}
			}
		
		//var tabId = sender.tab.id;
	
		
		
		
	}
      
    /*else if (request.getTargetData)
      sendResponse({targetData: targetData});
    else if (request.activateLasers) {
      var success = activateLasers();
      sendResponse({activateLasers: success});
    }*/

});



/**
 * CAPTCHA_tab_queue
 *
 * localStorage:
 *  CAPTCHA_staggered__stagger_is_active
 *  CAPTCHA_staggered__min_tabs_to_initiate_staggered
 *  CAPTCHA_staggered__staggered_timeout_per_tab
 * 
 * TODO?
 * .getStaggerVars is only called with each new run of the queue. It is called
 * at the start with init_process. In cases where the queue persists, a user
 * could set different stagger localStorage vars. And these would not appear until the 
 * queue resets. Fix?
 */
var CAPTCHA_tab_queue_obj = function(is_incognito) {
	this.queue = [];
	this.queue__obj = {};
	this.is_incognito = (is_incognito) ? '____INCOGNITO_SESSION' : ''; //MT__DOSUBMIT__USER_SET_TYPE____INCOGNITO_SESSION
	this.process_in_progress = false;
	this.num_tabs_at_start = null;
	
	this.is_test = null;
	this.test_url = null;
	this.debug = true;
	this.dbg_ic = (is_incognito) ? '(i) ' : '';
	
	
	this.svars = {
		is_active: null,
		min_tb: null,
		timeout: null
	}
	//~ this.is_test2 = null;
	
}
CAPTCHA_tab_queue_obj.prototype.getQueueLength = function (tabId) {
	this.num_tabs_at_start = this.queue.length;
}
CAPTCHA_tab_queue_obj.prototype.getStaggerVars = function (tabId) {
	if (!localStorage.hasOwnProperty('MT__DOSUBMIT__USER_SET_TYPE' + this.is_incognito)) {
		this.svars.is_active = false;
		this.svars.min_tb = 4;
		this.svars.timeout = 200;
		return; // Done
	}
	try {
		var x = JSON.parse(localStorage['MT__DOSUBMIT__USER_SET_TYPE' + this.is_incognito]);
		this.svars.is_active = x.CAPTCHA_staggered__stagger_is_active;
		this.svars.min_tb = x.CAPTCHA_staggered__min_tabs_to_initiate_staggered;
		this.svars.timeout = x.CAPTCHA_staggered__staggered_timeout_per_tab;
	} catch(e) {
		console.log(e);
		this.svars.is_active = false;
		this.svars.min_tb = 4;
		this.svars.timeout = 200;
	}
}
CAPTCHA_tab_queue_obj.prototype.add = function (tabId) {
	if (!this.queue__obj.hasOwnProperty(tabId)) {
		this.queue__obj[tabId] = true;
		this.queue.push(tabId);
		if (this.debug) {
			console.log('Adding tabId '+this.dbg_ic+''+tabId);
		}
	} else {
		if (this.debug) {
			console.log('TabId already in queue '+this.dbg_ic+'('+tabId+')');
		}
	}
	
	if (this.debug) {
		//~ console.log(this.queue);
		console.log('Queue'+this.dbg_ic+':' + this.queue.join(','));
		console.log('Process in progress'+this.dbg_ic+':' + this.process_in_progress);
	}
}
CAPTCHA_tab_queue_obj.prototype.init_process = function () {
	if (this.process_in_progress) {
		if (this.debug) {
			console.log('Command recieved to process - In progress!');
		}
	} else {
		if (this.debug) {
			console.log('Command recieved to process - Starting!');
		}
		this.process_in_progress = true;
		this.getQueueLength();
		this.getStaggerVars();
		this.process();
	}
}
CAPTCHA_tab_queue_obj.prototype.process = function () {
	
	var next_tab = null;
	while (this.queue && this.queue.length && next_tab == null) {
		var next_tab = this.queue.shift();
		//~ chrome.tabs.get(x, function() {
			//~ 
		//~ });
	}
	// Done?
	if (next_tab == null) {
		this.process_in_progress = false;
		if (this.debug) {
			console.log('There are no more tabs. this.process_in_progress=false.'+this.dbg_ic+'');
		}
		return;
	}
	
	if (this.debug) {
		console.log('Trying tabId '+this.dbg_ic+'' + next_tab);
	}
	if (this.is_test) {
		chrome.tabs.query({url: this.test_url, currentWindow:true}, function(tabs) {
			if(!tabs.length)
			{
				return;
			}
			console.log(tabs[0].id);
			chrome.tabs.sendMessage(tabs[0].id, {CAPTCHA_queue_reload:true}, this.check_response.bind(this));
			//~ chrome.tabs.insertCSS(tabs[0].id, {code:'body{zoom:4;}'});//document.body.style.zoom = 4;
			//~ return;
		}.bind(this));
		return;
	}
	
	// Remove tabId in obj
	delete this.queue__obj[next_tab];
	
	// Next
	// Bind
	chrome.tabs.sendMessage(next_tab, {CAPTCHA_queue_reload:true}, this.check_response.bind(this));
}
CAPTCHA_tab_queue_obj.prototype.check_response = function(response) {
	// @test
	if (this.is_test) {
		alert('test');
	}
	if (this.debug) {
		console.log('Finished processing a page!'+this.dbg_ic+'');
		//~ console.log(this);
		//~ console.log(this.queue);
		console.log('Queue'+this.dbg_ic+':' + this.queue.join(','));
		console.log('Queue length'+this.dbg_ic+':' + this.queue.length);
		console.log('Process in progress'+this.dbg_ic+':' + this.process_in_progress);
		
		//~ return;
	}
	
	//CAPTCHA_queue_reload__tab_recieved
	//"If an error occurs while connecting to the specified tab, the callback will be called with no arguments..."
	// Err?
	if (!response) {
		
		if (this.debug) {
			console.log('no response from tab');
		}
		if (this.is_test) {
			return;
		}
		
		this.process();
		return;
	} else {
		if (this.is_test) {
			return;
		}
	}
	
	// Success
	if (this.debug) {
		console.log('is_active '+this.dbg_ic+''+ this.svars.is_active);
		console.log('min tabs '+this.dbg_ic+''+ this.svars.min_tb);
		console.log('timeout '+this.dbg_ic+''+ this.svars.timeout);
		console.log('.num_tabs_at_start '+this.dbg_ic+''+ this.num_tabs_at_start);
	}
	
	// Is staggering active?
	if  (
		this.svars.is_active &&
		this.svars.min_tb <= this.num_tabs_at_start //this.queue.length
		)
	{
		if (this.debug) {
			console.log('Staggering the reload. '+this.dbg_ic+'Pause... ' + this.svars.timeout + ' ms');
		}
		setTimeout(this.process.bind(this), this.svars.timeout);//.bind(this)
	}
	else {
		if (this.debug) {
			console.log('No stagger.'+this.dbg_ic+'');
		}
		this.process();
	}
}
CAPTCHA_tab_queue_obj.prototype.test = function(type) {
	this.queue.push(1);
	this.queue.push(1);
	this.test_url = 'https://www.mturk.com/mturk/preview?groupId=372YDQ1UKENNIZ3KVPDWH39HKIU8C4&requesterId=&hitId=307FVKVSYQEFIHNAA04X9MGH9DB74J&externalHit=true&canAccept=true';
	this.is_test = true;
	this.process();
	//~ setTimeout(function() {
		//~ CAPTCHA_tab_queue.process();
	//~ }, 10000);
	//~ setTimeout(function() {
		//~ CAPTCHA_tab_queue.process();
	//~ }, 20000);
}
var CAPTCHA_tab_queue = new CAPTCHA_tab_queue_obj(false);
var CAPTCHA_tab_queue__incognito = new CAPTCHA_tab_queue_obj(true);

var turnOnAutoCopy = false;


// NEXT WINDOW
var next_window__windowIds = []
function __js_inarray(array, needle) // //
{
	for (var i in array)
	{
		if (array[i] == needle)
			return true;
	}
	return false;
}

function tabWindowPair(tabId, windowId) {
	console.log('FUNC.tabWindowPair');
	//~ console.log(this);
	//~ console.log('tabId:'+tabId);
	//~ console.log('windowId:'+windowId);
	//~ console.log('Window:'+windowId+';Tab:'+tabId);
	
	this.tabId = tabId;
	this.winId = windowId;
}

var UtilityAMTPairs = {};
function AMTUtilitiesObj(options){
	this.ownerTabId = options.ownerTabId;
	this.utilities = options.utilities;
}

var nextTabQId = 1;

function getAllTabsInQ(callback, isTopWindow) {
	var isTopWindow = isTopWindow;
	var callback = callback;
	chrome.tabs.query({}, function(allTabs) {
		//~ if(!allTabs.length) //Make sure it's an array
		//~ {
			//~ tabs = [allTabs];
		//~ }

		var allTabsRespondCount = 0;
		var didntGetAllResponses = true;
		var allQTabs = [];
		
		console.log('Looping through all ' + allTabs.length + ' tabs');
		
		window.setTimeout(function() {
				if(didntGetAllResponses) {
					callback(allQTabs);
				}
			}, 500);
		
		
		for(var i = 0; i < allTabs.length; i++) {
			chrome.tabs.sendRequest(allTabs[i].id, {isQProduct: true, isTopWindow: isTopWindow}, 
			function(rslt) {
				allTabsRespondCount++;
				if(allTabsRespondCount == allTabs.length)
					didntGetAllResponses = false;
					
				console.log(allTabsRespondCount);
				if(rslt && rslt.isQProduct) {
					if(rslt.tabId === undefined ||
					   rslt.tabId === false ||
					   rslt.tabId === null) {
						//alert('Error, got broken tabId from tabsQ');
						console.log('Error, got broken tabId from tabsQ. tabId:');
						console.log(rslt.tabId);
					}
					else {
						allQTabs.push(rslt);
					}
				}
				if(allTabsRespondCount == allTabs.length) {
					console.log('allQTabs: ');
					console.log(allQTabs);
					callback(allQTabs);
				}
			});
		}
	});
}


//Checks if the new activated tab is already in submission
//If it is, then it switches it forward unless...
//a) this is the SECOND time the user has arrived AFTER a submission has occurred
//or b) this feature is turned off using AMT Core
chrome.tabs.onActivated.addListener(function(tab) {
	chrome.tabs.sendRequest(tab.tabId, {switchTabNotifier: true}, 
	function(rs) {
			//Squelch response
		})
});

var copyInp = false;

function AMT___play_single_sound(fileName) {
	
	
	var sound =  new Audio(fileName);//document.createElement('audio');
	//sound.setAttribute("src", fileName);
	sound.play();
	console.log("got here");
};


function playRandomNextSound() {
		var soundName = 'http://localhost/mturk/.sounds/next/';
		var allSounds = [
		'110314__mrown1__tick.wav',
		'127149__daphne-in-wonderland__ding.wav',
		'136651__stomachache__snarenorattlesclose1.wav',
		'146733__fins__energy.wav',
		'150933__yikitama__wubbadubba.wav',
		'157420__symphoid__lil-bender.wav',
		'159682__duskstep__heavy-snare-10.wav',
		'174721__drminky__watch-tick (1).wav',
		'174721__drminky__watch-tick.wav',
		'198867__corsica-s__squeaktoy-bd.wav',
		'210887__soundscape-leuphana__20131211-clubmatevswastecontainer-h2nextxy.wav',
		'215033__taira-komori__katana1.mp3',
		'215364__reitanna__bee.wav',
		'215671__breizhizou29__youpi.wav',
		'23152__owlstorm__ding.wav',
		'235779__elliotlp__quick-pour.mp3',
		'35903__syna-max__a-duck-sneeze.wav',
		'37154__volivieri__soccer-ball-hit-ground-01.wav',
		'52448__john9__next-please.wav',
		'54999__carbonparlour__tick.wav',
		'57211__mab__mab-clock-tick-1-20080713.wav',
		'678__dropthedyle__dd1.aif',
		'88481__davidou__groovinhouse.wav',
		'93015__cosmicd__44.wav',
		'49952__simon-rue__ratt-placerad-atom-v2.wav',
		'94670__twiggles__woo-hoo.wav',
		'966__flatfly__s2.wav',
		'heavy_medic01.mp3'
		]
		try {
			soundName += allSounds[Math.floor(Math.random() * allSounds.length)];
		}
		catch(e) {
			alert('soundName isnt an int?');
			
		}
		
		//Unused
		//'154506__ecfike__let-s-go-have-a-party-man-2.wav',
		//'156667__unfa__stereo-tick.flac',
		
		AMT___play_single_sound(soundName);
}

/**
 * Play a random sound EVERY time script is reloaded.
 */
//~ playRandomNextSound();


/**
 * 
 * Does outrUtility Window exist? If not, let localStorage know this.
 * Also, if a Utility Window exists, refresh it
 * 
 **/
chrome.windows.getAll({populate:true}, function(allWindows) {
	var utilityWindow = null;
	if(allWindows.length == 1) {
		localStorage['UTILITY_WINDOW'] = 'unset';
	}
	else {
		var found = false;
		for(var i = 0; i < allWindows.length; i++) {
			if(allWindows[i].id == localStorage['UTILITY_WINDOW']) {
				found = true;
				utilityWindow = allWindows[i];
				break;
			}
		}
		if(!found)
			localStorage['UTILITY_WINDOW'] = 'unset';			
		if(found) {
			chrome.tabs.update(utilityWindow.tabs[0].id, {url: 'http://192.168.1.2/mturk/util.php?AMT__utility_window_placeholder&random='+Math.random()});			
			var allCloseTabIds = [];
			for(i = 1; i < utilityWindow.tabs.length; i++) {
				allCloseTabIds.push(utilityWindow.tabs[i].id)
			}
			chrome.tabs.remove(allCloseTabIds);
		}
	}
})


chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){
		if(removeInfo.windowId == localStorage['UTILITY_WINDOW']) {
			for(var i in UtilityAMTPairs) {
				if(
				   UtilityAMTPairs[i] &&
				   UtilityAMTPairs[i].utilities &&
				   UtilityAMTPairs[i].utilities.length > 0) {
				   var hasRemoved = false;
				   for(var j = 0; j < UtilityAMTPairs[i].utilities.length; j++) {
						if(UtilityAMTPairs[i].utilities[j].tabId == tabId) {
							console.log(UtilityAMTPairs[i].utilities[j]);
							chrome.tabs.sendRequest(UtilityAMTPairs[i].ownerTabId, 
													{removeUtilityTab: UtilityAMTPairs[i].utilities[j].id})
							UtilityAMTPairs[i].utilities.splice(j,1);
							console.log('remove tabId'+tabId+ ' from UtilityAMTPairs');
							console.log(UtilityAMTPairs);
							var hasRemoved = true;
							break;
						}
				   }
				   if(hasRemoved)
						break;
				}
			}
		}
		else {
			for(var i in UtilityAMTPairs) {
				console.log(i);
				console.log(UtilityAMTPairs[i]);
				if( UtilityAMTPairs[i] &&
					UtilityAMTPairs[i].ownerTabId  &&
					UtilityAMTPairs[i].ownerTabId == tabId) {
					var tabIdsToRemove = []
					for(var j = 0; j < UtilityAMTPairs[i].utilities.length; j++) {
						tabIdsToRemove.push(UtilityAMTPairs[i].utilities[j].tabId);
					}
					chrome.tabs.remove(tabIdsToRemove);
					delete UtilityAMTPairs[i]; 
					console.log(UtilityAMTPairs);
					break;
				}
			}
		}
	
	
	})


chrome.tabs.onActivated.addListener(function (activeInfo) {
		//If we click on a tab that owns a utility tab, switch to its first utility tab
		if(activeInfo.windowId != localStorage['UTILITY_WINDOW']) {
			for(var i in UtilityAMTPairs) {
				console.log(i);
				console.log(UtilityAMTPairs[i]);
				if(UtilityAMTPairs[i] &&
				   UtilityAMTPairs[i].ownerTabId &&
				   UtilityAMTPairs[i].ownerTabId == activeInfo.tabId) {
					if(UtilityAMTPairs[i].utilities &&
					   UtilityAMTPairs[i].utilities.length > 0) {
						chrome.tabs.update(UtilityAMTPairs[i].utilities[0].tabId, {active:true});
						break;
					}
				}
			}
		}
	})



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


