(function customize_theme(){

    // set the custom properties here
    // the keys of custom_theme must be css selectors.
    // the values of custom_theme must be:
    //     if the key (css selector) already exist in the Visual Studio Code stylesheet, the value must be an object with css property-values.
    //     else (if the key doesn't exist yet), the value it must be a string with the inner text of a Css rule.
    var custom_theme = {
        /*'.monaco-workbench.vs-dark .explorer-viewlet .monaco-tree .monaco-tree-row > .content .explorer-item.folder-icon': { background: 'linear-gradient(to right, rgba(109,109,72,0.42) 0%,rgba(209,211,96,0) 14%)', color: '#B5B580'},*/
        '.monaco-workbench.vs-dark .explorer-viewlet .monaco-tree .monaco-tree-row > .content .explorer-item.folder-icon': { color: '#B5B580', 'font-weight': 'bold'},
        '.explorer-working-files':'background: #1357A5',
        '.working-file-dirty': 'background-color: #663333',
        '.working-file-dirty .primary-action-bar': 'background-color: #663333 !important',
        '.explorer-working-files .monaco-tree-row.selected': 'background-color: #2367B5 !important',
        '.explorer-working-files .monaco-tree-row:hover': 'background-color: #286CBA !important',
        '.vs-dark .monaco-tree .monaco-tree-row.selected:not(.highlighted) > .content.actions > .primary-action-bar':{'background-color': '#2367B5'},
        '.vs-dark .monaco-tree .monaco-tree-row:hover:not(.highlighted):not(.selected):not(.focused) > .content.actions > .primary-action-bar':{'background-color': '#2367B5'},
        '.is-js > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px',
        '.is-json > .content': 'border-left: 2.5px solid #238795; padding-left: 2.5px',
        /*'.is-html > .content': 'border-left: 2.5px solid transparent; padding-left: 2.5px',*/
        '.is-html > .content': 'color: #81DAF5;',
        '.is-css > .content': 'border-left: 2.5px solid #935765; padding-left: 2.5px',
        '.is-less > .content': 'border-left: 2.5px solid #934755; padding-left: 2.5px',
        '.is-angular-directive > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic;',
        '.is-angular-controller > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic;',
        '.is-angular-service > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic;',
        '.is-angular-provider > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic;',
        '.is-angular-interceptor > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic;',
        '.is-angular-filter > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic;',
        '.is-angular-module > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic; font-weight: bold;',
        '.is-angular-config > .content': 'border-left: 2.5px solid #2367B5; padding-left: 2.5px; font-style: italic; font-weight: bold;',
        '.is-spec > .content': 'border-left: 2.5px solid pink; padding-left: 2.5px; font-style: italic;',
        '.angular-special-folder > .content > .sub-content > .folder-icon > .explorer-item-label > .plain': 'color: #53C03C !important;',
        '.low-opacity-element': 'opacity: .3 !important;'
    }

    var special_rows = [
    	{
    		class : "angular-special-folder",
    		row_names : ["services", "config", "controllers", "directives", "filters", "interceptors", "providers", "view-models"]
    	},
    	{
    		class : "low-opacity-element",
    		row_names : [".bowerrc", "README.md", "tsd.json", "typings", "node_modules", "bower", "bower_components", ".settings"]
    	}
    ];

    var rules = document.styleSheets[1].cssRules;
    var ruleKey;
    var rulesArray = [];
    var ruleIndex;
    var selectedRule;
    var customized_rule_selector;
    var customized_property;
    for(ruleKey in rules){
        if(!isNaN(ruleKey)){
            rulesArray.push(rules[ruleKey]);
        }
    }
    for(customized_rule_selector in custom_theme){
        selectedRule = rulesArray.filter(function(cssRule){ 
            return cssRule.selectorText === customized_rule_selector ;
        })[0];
        if(selectedRule){
            for(customized_property in custom_theme[customized_rule_selector]){
                selectedRule.style[customized_property] = custom_theme[customized_rule_selector][customized_property];
            }
        }else{
            console.log('Unmatched selector rule. Creating a new selector rule: ' + customized_rule_selector);
            document.styleSheets[1].addRule(customized_rule_selector, custom_theme[customized_rule_selector], 1);
        }
    }

	var sidebar = document.getElementById("workbench.parts.sidebar");

	function onSidebarClick(event, isRecursiveCycle){
		var length;
		var counter;
		var target;
		var fileNodes;
		var folderNodes;

		target = event.target;
		if(hasClass(target, 'plain')){
			fileNodes = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("text-file-icon");
		}else{
			fileNodes = target.getElementsByClassName("text-file-icon");
		}
		length = fileNodes.length;
		for(counter = 0; counter < length; counter += 1){

			if(fileNodes[counter].firstChild.firstChild.text === 'visit-sections.html'){
				console.log(fileNodes[counter].firstChild.firstChild);
			}

			stylizeRow(fileNodes[counter].firstChild.firstChild);
		}
		folderNodes = target.getElementsByClassName("folder-icon");
		length = folderNodes.length;
		for(counter = 0; counter < length; counter += 1){
			stylizeRow(folderNodes[counter].firstChild.firstChild);
		}
		/*if(isRecursiveCycle !== true){
			setTimeout(function(){
				onSidebarClick(event, true);
			},200);
		}*/
	}
	sidebar.addEventListener("click",onSidebarClick);
	var sidebarClickEvent = new Event("click");
	sidebar.dispatchEvent(sidebarClickEvent);
	
	sidebar.addEventListener("DOMSubtreeModified",onDOMSubtreeModifiedOnSidebar);

	function onDOMSubtreeModifiedOnSidebar(event){
		var length;
		var counter;
		var target;
		var fileNodes;

		if(event.target.parentNode.classList.contains("text-file-icon") && event.target.firstChild.classList.contains("plain")){
			stylizeRow(event.target.firstChild);
		}
		if(event.target.parentNode.classList.contains("folder-icon") && event.target.firstChild.classList.contains("plain")){
			stylizeRow(event.target.firstChild);
		}
	}

	function stylizeRow(textNode){
		if(textNode.text === 'visit-sections.html'){
			console.log(textNode);
		}
		var rowNode = textNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var counterSpecialFolder;

		/*if(endsWith(textNode.text, ".directive.js")){
			rowNode.classList.add("is-angular-directive");
		}
		else if(endsWith(textNode.text, ".controller.js")){
			rowNode.classList.add("is-angular-controller");
		}
		else if(endsWith(textNode.text, ".service.js")){
			rowNode.classList.add("is-angular-service");
		}
		else if(endsWith(textNode.text, ".filter.js")){
			rowNode.classList.add("is-angular-filter");
		}
		else if(endsWith(textNode.text, ".config.js")){
			rowNode.classList.add("is-angular-config");
		}
		else if(endsWith(textNode.text, ".module.js")){
			rowNode.classList.add("is-angular-module");
		}
		else if(endsWith(textNode.text, ".interceptor.js")){
			rowNode.classList.add("is-angular-interceptor");
		}
		else if(endsWith(textNode.text, ".provider.js")){
			rowNode.classList.add("is-angular-provider");
		}
		else if(endsWith(textNode.text, ".spec.js")){
			rowNode.classList.add("is-spec");
		}
		else if(endsWith(textNode.text, ".js")){
			rowNode.classList.add("is-js");
		}
		else if(endsWith(textNode.text, ".json")){
			rowNode.classList.add("is-json");
		}
		else */if(endsWith(textNode.text, ".html")){
			rowNode.classList.add("is-html");
		}
		/*else if(endsWith(textNode.text, ".css")){
			rowNode.classList.add("is-css");
		}
		else if(endsWith(textNode.text, ".less")){
			rowNode.classList.add("is-less");
		}*/
		else{
			for(counterSpecialFolder = 0; counterSpecialFolder < special_rows.length; counterSpecialFolder += 1){
				if(special_rows[counterSpecialFolder].row_names.indexOf(textNode.text) >= 0){
					rowNode.classList.add(special_rows[counterSpecialFolder].class);
				}
			}
		}
	}

	function endsWith(string, suffix) {
		return string.indexOf(suffix, string.length - suffix.length) !== -1;
	}

	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

})();