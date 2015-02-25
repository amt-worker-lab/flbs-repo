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
var INPUT__PROXY_REDACTED_;
var BTN_SAVE;
/*var TOGGLE_RA;
var TOGGLE_NTPASSBY;
var EL_STG_ACTIVE, EL_STG_MIN, EL_STG_TO;*/

// load localstorage values
function init_func_doSubmit() {
	// GET SINGLE
	chrome.extension.sendRequest(
		{
			method: "getLocalStorage",
			key: "MT__DOSUBMIT__USER_SET_TYPE"
		},
		function(response) {
			
			if (response.data) {
				var r = JSON.parse(response.data);
				if (r._PROXY_REDACTED_) {
					INPUT__PROXY_REDACTED_.value = r._PROXY_REDACTED_;
				} else {
					INPUT__PROXY_REDACTED_.value = 'http://192.168.1.6';
				}
			}
		}
	);
}
// save localstorage values
function save_doSubmit() {
	var d = {
		"_PROXY_REDACTED_": INPUT__PROXY_REDACTED_.value,
		/*"CAPTCHA_staggered__stagger_is_active":					EL_STG_ACTIVE.checked,
		"CAPTCHA_staggered__min_tabs_to_initiate_staggered":	EL_STG_MIN.value,
		"CAPTCHA_staggered__staggered_timeout_per_tab":			EL_STG_TO.value*/
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
}

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
//getNTPassBy
//toggleNAPassBy

// Once the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
	
	// global!
	INPUT__PROXY_REDACTED_ = document.getElementById('input__PROXY_REDACTED_');
	BTN_SAVE = document.getElementById('btn_save');
	TOGGLE_IS_UTILITY_WINDOW = document.getElementById('isUtilityWindow');
	TOGGLE_IS_SPECIAL_WORKFLOW_WINDOW = document.getElementById('isSpecialWorkflowWindow');
	
	init_func_doSubmit();
	init_func_getIsUtilityWindow();
	init_func_getIsSpecialWorkflowWindow();
	
	BTN_SAVE.onclick = function() {
		this.style.border = '4px solid LightGreen';
		save_doSubmit();
	}
	
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
});










