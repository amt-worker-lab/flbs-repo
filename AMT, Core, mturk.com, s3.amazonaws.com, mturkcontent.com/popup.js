/**
 * TODO
 * bgp localStorage['CAPTCHA_staggered__stagger_is_active']
 * bgp localStorage['CAPTCHA_staggered__min_tabs_to_initiate_staggered']
 * bgp localStorage['CAPTCHA_staggered__staggered_timeout_per_tab']
 * 
 * NOTES
 * CAPTCHA_staggered__min_tabs_to_initiate_staggered:
 * This is greater than or equal to. So a value of 4 is greater than or equal to 4 tabs means turn on.
 * 
 */ 

// global
var SELECT;
var INPUT__PROXY_REDACTED_;
var BTN_SAVE;
var TOGGLE_RA;
var TOGGLE_NTPASSBY;
var EL_STG_ACTIVE, EL_STG_MIN, EL_STG_TO;

// load localstorage values
function init_func_doSubmit() {
	//~ // Send with "keys" to recieve an object of key/value pairs.
	//~ chrome.extension.sendRequest(
		//~ {
			//~ method: "getLocalStorage",
			//~ keys: [
				//~ "MT__DOSUBMIT__USER_SET_TYPE"
			//~ ]
		//~ },
		//~ function(response) {
			//~ if (response.data) {
				//~ 
			//~ }
		//~ }
	//~ );
	//~ console.log('init_func_doSubmit');
	// GET SINGLE
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__USER_SET_TYPE"
		},
		function(response) {
			
			if (response.data) {
				var r = JSON.parse(response.data);
				if (r.type) {
					SELECT.value = r.type;
				}
				if (r._PROXY_REDACTED_) {
					INPUT__PROXY_REDACTED_.value = r._PROXY_REDACTED_;
				} else {
					INPUT__PROXY_REDACTED_.value = 'http://192.168.1.6';
				}
				if (r.CAPTCHA_staggered__stagger_is_active) {
					EL_STG_ACTIVE.checked = true;
					EL_STG_MIN.disabled = false;
					EL_STG_TO.disabled = false;
				} else if (!r.hasOwnProperty('CAPTCHA_staggered__stagger_is_active')) {
					EL_STG_ACTIVE.checked = false; // Default is Off. But could be On.
				} else {
					EL_STG_ACTIVE.checked = false;
				}
				if (r.CAPTCHA_staggered__min_tabs_to_initiate_staggered) {
					EL_STG_MIN.value = r.CAPTCHA_staggered__min_tabs_to_initiate_staggered;
				} else {
					EL_STG_MIN.value = 4;
				}
				if (r.CAPTCHA_staggered__staggered_timeout_per_tab) {
					EL_STG_TO.value = r.CAPTCHA_staggered__staggered_timeout_per_tab;
				} else {
					EL_STG_TO.value = 200;
				}
			}
		}
	);
}
// save localstorage values
function save_doSubmit() {
	var d = {
		"type": SELECT.value,
		"_PROXY_REDACTED_": INPUT__PROXY_REDACTED_.value,
		"CAPTCHA_staggered__stagger_is_active":					EL_STG_ACTIVE.checked,
		"CAPTCHA_staggered__min_tabs_to_initiate_staggered":	EL_STG_MIN.value,
		"CAPTCHA_staggered__staggered_timeout_per_tab":			EL_STG_TO.value
	};
	// THIS IS FOR SENDING A SINGLE KEY
	chrome.extension.sendRequest(
		{
			method: "saveLocalStorage",
			key: "MT__DOSUBMIT__USER_SET_TYPE",
			data: JSON.stringify(d)
		},
		function(response) {
			window.setTimeout(function() {
				BTN_SAVE.style.border = '';
			}, 600);
		}
	);
	
	//~ // Send multiple key/value pairs.
	//~ chrome.extension.sendRequest(
		//~ {
			//~ method: "saveLocalStorage",
			//~ keys: [
				//~ {
					//~ key: "MT__DOSUBMIT__USER_SET_TYPE",
					//~ data: JSON.stringify(d)
				//~ },
				//~ {
					//~ key: "CAPTCHA_staggered__stagger_is_active",
					//~ data: EL_STG_ACTIVE.checked
				//~ },
				//~ {
					//~ key: "CAPTCHA_staggered__min_tabs_to_initiate_staggered",
					//~ data: EL_STG_MIN.value
				//~ },
				//~ {
					//~ key: "CAPTCHA_staggered__staggered_timeout_per_tab",
					//~ data: EL_STG_TO.value
				//~ }
			//~ ]
		//~ },
		//~ function(response) {
			//~ window.setTimeout(function() {
				//~ BTN_SAVE.style.border = '';
			//~ }, 600);
		//~ }
	//~ );
}

//~ function init_func_toggleRA() {
	//~ chrome.extension.sendRequest({getRAHotkey: true}, 
		//~ function(rs) 
		//~ {
			//~ TOGGLE_RA.value = rs.RAHotkey;
		//~ });
//~ }

function init_func_toggleRA() {
	chrome.extension.sendRequest({getRAHotkey: true}, 
		function(rs) 
		{
			TOGGLE_RA.value = rs.RAHotkey;
		});
}

function init_func_toggleNTPassBy() {
	chrome.extension.sendRequest({getNTPassBy: true}, 
		function(rs) 
		{
			TOGGLE_NTPASSBY.value = rs.NTPassBy;
		});
}

function init_func_getRACustomKey() {
	chrome.extension.sendRequest({getRACustomKey:true}, function(rs) {
			RA_CUSTOMKEY.value = rs.RACustomKey;
		});
}


function init_func_ra_button_nextTab() {
	chrome.extension.sendRequest({getRA_Button_NextTab: true}, 
		function(rs) 
		{
			TOGGLE_RA_BUTTON_NEXTTAB.value = rs.RA_Button_NextTab;
		});	
}

//~ function init_func_r_button_nextTab() {
	//~ chrome.extension.sendRequest({getR_Button_NextTab: true}, 
		//~ function(rs) 
		//~ {
			//~ TOGGLE_R_BUTTON_NEXTTAB.value = rs.R_Button_NextTab;
		//~ });	
//~ }

function init_func_getIsUtilityWindow() {
	chrome.extension.sendRequest({getIsUtilityWindow: true}, 
		function(rs) 
		{
			console.log('got utility window?');
			console.log(rs);
			TOGGLE_IS_UTILITY_WINDOW.value = rs.UTILITY_WINDOW;
		});	
}
function init_func_getIsSpecialWorkflowWindow() {
	chrome.extension.sendRequest({getIsSpecialWorkflowWindow: true}, 
		function(rs) 
		{
			console.log('got special workflow window?');
			console.log(rs);
			TOGGLE_IS_SPECIAL_WORKFLOW_WINDOW.value = rs.SPECIAL_WORKFLOW_WINDOW;
		});	
}


function addLoaderElement(name, value, div) {
	var newDiv = document.createElement('div');
	newDiv.setAttribute('style', "display:inline-block;width:150px;");
	newDiv.innerText = name;
	div.appendChild(newDiv);
	var newInput = document.createElement('input');
	newInput.setAttribute('style',"width:280px;clear:both;");
	div.appendChild(newInput);
	newInput.value = value;
	newInput.name = name;
	newInput.onblur = function() {
		if(this.value != '') {
			setScriptVar(this.name, 'value', this.value);
		}
		else {
			//chrome.storage.local.remove(this.name);
		}
		this.style.border = '2px solid green';
	}
	document.body.appendChild(document.createElement('br'));
}


function setScriptVar(stringName, key, value) {
	chrome.storage.local.get('scriptVars', function(obj) {
		var scriptVars = obj.scriptVars;
		scriptVars[stringName][key] = value;
		chrome.storage.local.set({'scriptVars': scriptVars});
	});
}


function createGlobal_load_varsUI() {
	var createGlobalBtn = document.createElement('input');
	createGlobalBtn.setAttribute('style', 'width:50%;height:30px;display:inline-block;');
	document.body.appendChild(createGlobalBtn);
	createGlobalBtn.type = 'button';
	createGlobalBtn.value = 'Add New Global';

	var createGlobalField = document.createElement('input');
	createGlobalField.setAttribute('style', 'width:50%;height:30px;display:inline-block;');
	document.body.appendChild(createGlobalField);
	
	var topDiv = document.createElement('div');
	topDiv.setAttribute('style','width:100%;border-top:1px solid #888; border-bottom: 1px solid #888');
	topDiv.setAttribute('id','topDiv');
	document.body.appendChild(topDiv);
	
	
	var bottomDiv = document.createElement('div');
	bottomDiv.setAttribute('style','width:100%;border-bottom: 1px solid #888;');
	bottomDiv.setAttribute('id','bottomDiv');
	document.body.appendChild(bottomDiv);
	
	
	createGlobalBtn.onclick = function() {
		if(createGlobalField.value != '') {
			var obj = {};
			obj[createGlobalField.value] =
			{
				value: 'setMe',
				expirationDate: 0,
				isPersistant: false,
			}
			addLoaderElement(createGlobalField.value, 'setMe');
			chrome.storage.local.set(obj, function(e) {
				
			});
		}
	}

	chrome.storage.local.get(null, function(global_load_vars) {
		if(global_load_vars && global_load_vars.scriptVars) {
			for(var i in global_load_vars.scriptVars) {
				var scriptVar = global_load_vars.scriptVars[i];
				if(scriptVar.isPersistant) {
					addLoaderElement(i, scriptVar.value, topDiv);				
				} else if(scriptVar.expirationDate > new Date().getTime()){
					addLoaderElement(i, scriptVar.value, bottomDiv);
				}
			}
		}
	});
}

// Once the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
	
	// global!
	SELECT = document.getElementById('select_doSubmit');
	INPUT__PROXY_REDACTED_ = document.getElementById('input__PROXY_REDACTED_');
	BTN_SAVE = document.getElementById('btn_save');
	TOGGLE_RA = document.getElementById('toggleRAHotkey');
	RA_CUSTOMKEY = document.getElementById('rACustomKey')
	TOGGLE_NTPASSBY = document.getElementById('toggleNTPassBy');
	TOGGLE_RA_BUTTON_NEXTTAB = document.getElementById('R&A NextTab');
	//TOGGLE_R_BUTTON_NEXTTAB = document.getElementById('Return NexTab'); //deprecated
	TOGGLE_IS_UTILITY_WINDOW = document.getElementById('isUtilityWindow');
	TOGGLE_IS_SPECIAL_WORKFLOW_WINDOW = document.getElementById('isSpecialWorkflowWindow');
	EL_STG_ACTIVE	= document.getElementById('CAPTCHA_stagger_is_active');
	EL_STG_MIN		= document.getElementById('CAPTCHA_min_tabs_to_initiate_staggered');
	EL_STG_TO		= document.getElementById('CAPTCHA_staggered_timeout_per_tab');
	
	init_func_doSubmit();
	init_func_toggleRA();
	init_func_getRACustomKey();

	init_func_toggleNTPassBy();
	init_func_getIsUtilityWindow();
	init_func_getIsSpecialWorkflowWindow();
	
	init_func_ra_button_nextTab();
	//init_func_r_button_nextTab();
	
	
	SELECT.onfocus = function() {
		//SELECT.style.border = '2px solid LightGreen';
	}
	SELECT.onblur = function () {
		//save_doSubmit();
	}
	
	BTN_SAVE.onclick = function() {
		this.style.border = '4px solid LightGreen';
		save_doSubmit();
	}
	
	TOGGLE_RA.onclick = function() {
		this.style.border = '4px solid LightGreen';
		if(this.value == 'On') {
			this.value = 'Off';
		}
		else
			this.value = 'On';
		chrome.extension.sendRequest(
			{toggleRAHotkey: TOGGLE_RA.value}, 
			function(rs) {
				//squelch rs
			}
		);
	}
	
	RA_CUSTOMKEY.onblur = function() {
		this.style.border = '4px solid LightGreen';
		chrome.extension.sendRequest({
				setRACustomKey: RA_CUSTOMKEY.value
			}
		);	
	}
	
	TOGGLE_NTPASSBY.onclick = function() {
		this.style.border = '4px solid LightGreen';
		if(this.value == 'On') {
			this.value = 'Off';
		}
		else
			this.value = 'On';
		chrome.extension.sendRequest(
			{toggleNTPassBy: TOGGLE_NTPASSBY.value}, 
			function(rs) {
				//squelch rs
			}
		);
	}
	
	TOGGLE_RA_BUTTON_NEXTTAB.onclick = function() {
		this.style.border = '4px solid LightGreen';
		if(this.value == 'On') {
			this.value = 'Off';
		}
		else
			this.value = 'On';
		chrome.extension.sendRequest(
			{toggleRA_Button_NextTab: TOGGLE_RA_BUTTON_NEXTTAB.value}, 
			function(rs) {
				//squelch rs
			}
		);
	}
	
	//~ TOGGLE_R_BUTTON_NEXTTAB.onclick = function() {
		//~ this.style.border = '4px solid LightGreen';
		//~ if(this.value == 'On') {
			//~ this.value = 'Off';
		//~ }
		//~ else
			//~ this.value = 'On';
		//~ chrome.extension.sendRequest(
			//~ {toggleR_Button_NextTab: TOGGLE_R_BUTTON_NEXTTAB.value}, 
			//~ function(rs) {
				//~ //squelch rs
			//~ }
		//~ );
	//~ }
	
	
	TOGGLE_IS_UTILITY_WINDOW.onclick = function() {
		this.style.border = '4px solid LightGreen';
		chrome.extension.sendRequest(
			{setUTILITY_WINDOW: TOGGLE_IS_UTILITY_WINDOW.value}, 
			function(rs) {
				if(rs.UTILITY_WINDOW) {
					TOGGLE_IS_UTILITY_WINDOW.value =rs.UTILITY_WINDOW;
				}
			}
		);
	}
	
	TOGGLE_IS_SPECIAL_WORKFLOW_WINDOW.onclick = function() {
		this.style.border = '4px solid LightGreen';
		chrome.extension.sendRequest(
			{setSPECIAL_WORKFLOW_WINDOW: TOGGLE_IS_SPECIAL_WORKFLOW_WINDOW.value}, 
			function(rs) {
				if(rs.SPECIAL_WORKFLOW_WINDOW) {
					TOGGLE_IS_SPECIAL_WORKFLOW_WINDOW.value =rs.SPECIAL_WORKFLOW_WINDOW;
				}
			}
		);
	}
	
	
	
	createGlobal_load_varsUI();
	
	
	SELECT.onchange = SELECT.onblur = EL_STG_MIN.onchange = EL_STG_MIN.onblur = EL_STG_TO.onchange = EL_STG_TO.onblur = function() {
		BTN_SAVE.click();
	}
	EL_STG_ACTIVE.onclick = function(e) {
		if (!this.checked) {
			EL_STG_MIN.disabled = true;
			EL_STG_TO.disabled = true;
		} else {
			EL_STG_MIN.disabled = false;
			EL_STG_TO.disabled = false;
		}
		BTN_SAVE.click();
		//~ e.stopPropagation();
		//~ e.preventDefault();
		//~ return false; // stop prop.
	}
	
});










