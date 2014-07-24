
// global
var SELECT;
var INPUT__PROXY_REDACTED_;
var BTN_SAVE;

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

// Once the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
	
	// global!
	SELECT = document.getElementById('select_doSubmit');
	INPUT__PROXY_REDACTED_ = document.getElementById('input__PROXY_REDACTED_');
	BTN_SAVE = document.getElementById('btn_save');
	
	//
	
	init_func_doSubmit();
	
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
	
});










