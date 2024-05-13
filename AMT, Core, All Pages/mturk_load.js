function checkIfLocalScriptVarsExists(callback) {
	chrome.storage.local.get('scriptVars', function(storageObj) {
		if(!storageObj.scriptVars) {
			chrome.storage.local.set({'scriptVars': {}},function(asdf) {
				initializePermanentScriptVars();
			})
		}
		else {
			initializePermanentScriptVars();
		}
	});
}

function initializePermanentScriptVars() {
	
	chrome.storage.local.get('scriptVars', function(storageObj) {
		var scriptVars = storageObj.scriptVars;
		
		var hasChanged = false;
		
		//Get rid of any persistent vars in scriptvars that's not in the global
		for(var i in scriptVars) {
			if(scriptVars[i] && scriptVars[i].isPersistant) {
				if(!AMT__Global_Vars.associativeArrayofDPSV.hasOwnProperty(i)) {
					hasChanged = true;
					delete scriptVars[i];
				}
			}
		}
		
		//Put variables into scriptVars that aren't already there.
		for(var i = 0; i < AMT__Global_Vars.defaultPersistantScriptVars.length; i++) {
			if(!scriptVars.hasOwnProperty(AMT__Global_Vars.defaultPersistantScriptVars[i].name)) {
				hasChanged = true;
				scriptVars[AMT__Global_Vars.defaultPersistantScriptVars[i].name] = AMT__Global_Vars.defaultPersistantScriptVars[i];
			}
		}
		if(hasChanged) {
			chrome.storage.local.set({'scriptVars': scriptVars}, function() {
				loadGlobalsFromBird();
			}); 
		}
		else {
			loadGlobalsFromBird();
		}
	});
}

function addScriptVarsListener() {
	chrome.storage.onChanged.addListener(function(change) {
		//write scriptVars back into Global
		var scriptVars = change.scriptVars.newValue;
		if(scriptVars) {
			for(var i in scriptVars) {
				AMT__Global_Vars.scriptVars[i] = scriptVars[i].value;
			}
		}
	});
}

function loadGlobalsFromBird() {	
	chrome.storage.local.get(null, function(global_load_vars) {
		if(global_load_vars && global_load_vars.scriptVars) {
			for(var i in global_load_vars.scriptVars) {
				if(global_load_vars.scriptVars[i] != undefined)
					AMT__Global_Vars.scriptVars[i] = global_load_vars.scriptVars[i].value;
			}
		}
		ih = initializeIh();
		addScriptVarsListener();

		// RUN
//console.log('LOAD ALL PAGES');
		var loader = new load();
		if (loader.global_vars.is_running_on_amt) {
			if(loader.AMT__init_utility_window) {
				loader.AMT__init_utility_window();
			}
		}
	});
	
}

/**
 * RUN DOCUMENT
 *
 * 
 * 
 * 
 * 
 * 
 *  
**/
var ih;

function initializeIh() {
	var MyString = function(str) {
	  this._value = str;
	  this.length = str.length;
	  // very rough to instantiate
	  for (var i = 0, l = str.length; i < l; i++) {
		this[i] = str[i];
	  }
	};

	Object.getOwnPropertyNames(String.prototype).forEach(function(key) {
	  var func = String.prototype[key];
	  MyString.prototype[key] = function() {
		return func.apply(this._value, arguments);
	  };
	});
	
	// Not sure why document.body.innerHTML is failing.
	if (!document || !document.body || !document.body.innerHTML)
		return '';
		
	var tmpIh = document.body.innerHTML;
	tmpIh = new MyString(tmpIh);
	tmpIh.oldIndexOf = tmpIh.indexOf;
	tmpIh.indexOf = function(str) {
		if(this.oldIndexOf(str) != -1) {
			AMT__Global_Vars.sStrings.push(str);
			if(AMT__Global_Vars.startTimerOnSMatch && AMT__Global_Vars.sStrings.length == 1) {
				new AMT___items_factory().startJobTimer();
			}
			if(AMT__Global_Vars.scriptVars['Record Job Timings'] != '0') {
				new AMT___items_factory().createJobTimer();
				//new AMT___items_factory().startJobTimer();
			}
		}
		return this.oldIndexOf(str);
	};
	return tmpIh;
}

if (document.readyState == "complete" || document.readyState == "interactive") {
	checkIfLocalScriptVarsExists();
}
else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			checkIfLocalScriptVarsExists();
		}
	}
}
