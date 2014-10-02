
// global
var SELECT;
var INPUT__PROXY_REDACTED_;
var BTN_SAVE;
var TOGGLE_RA;
var TOGGLE_NTPASSBY;

// load localstorage values
function init_func_doSubmit() {
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
				
			} else {
				
			}
		}
	);
}
// save localstorage values
function save_doSubmit() {
	var d = {
		"type": SELECT.value,
		"_PROXY_REDACTED_": INPUT__PROXY_REDACTED_.value
	};
	//alert(d);
	
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
}

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

function init_func_r_button_nextTab() {
	chrome.extension.sendRequest({getR_Button_NextTab: true}, 
		function(rs) 
		{
			TOGGLE_R_BUTTON_NEXTTAB.value = rs.R_Button_NextTab;
		});	
}

//getNTPassBy
//toggleNAPassBy

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
	TOGGLE_R_BUTTON_NEXTTAB = document.getElementById('Return NexTab');
	
	init_func_doSubmit();
	init_func_toggleRA();
	init_func_getRACustomKey();

	init_func_toggleNTPassBy();
	
	init_func_ra_button_nextTab();
	init_func_r_button_nextTab();
	
	
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
	
	TOGGLE_R_BUTTON_NEXTTAB.onclick = function() {
		this.style.border = '4px solid LightGreen';
		if(this.value == 'On') {
			this.value = 'Off';
		}
		else
			this.value = 'On';
		chrome.extension.sendRequest(
			{toggleR_Button_NextTab: TOGGLE_R_BUTTON_NEXTTAB.value}, 
			function(rs) {
				//squelch rs
			}
		);
	}
	
});










