var userName;
var apiKey;
var currVersion = getVersion();
var prevVersion = localStorage['version']

$(document).ready(function() {

	chrome.storage.sync.get('userName', function (result) {
		userName = result.userName
	});

	chrome.storage.sync.get('apiKey', function (result) {
		apiKey = result.apiKey
	});

	chrome.storage.onChanged.addListener(function(changes, namespace){
		if(changes['userName']){
			userName = changes['userName'].newValue;
		}
		if(changes['apiKey']){
			apiKey = changes['apiKey'].newValue;
		}
	});

	chrome.contextMenus.create({
		"title": "Quote, Shorten, Tweet",
		"contexts": ["page", "selection", "image", "link"],
		"onclick" : qst
	});
});



function qst(info){
	var selection = info.selectionText;
	var pageUrl = info.pageUrl;
	shorten(pageUrl, userName, apiKey, function(result){
		if(result.status_code == 200){
			tweet(selection, result.data.url);
		}else{
			tweet(selection, pageUrl)
		}
	});
}

function tweet(text, url){
	var twitter = "https://twitter.com/intent/tweet?source=webclient&text=";
	var string;
	if(text){
		var sep = " ";
		var qt = '"';
		string = qt+text+qt+sep+url
	}else{
		string = url;
	}
	window.open(twitter+string,'_blank');
}

function shorten(long_url, userName, apiKey, callback){
	$.ajax({
		url: "https://api-ssl.bitly.com/v3/shorten",
		data:{
			longUrl:long_url,
			apiKey:apiKey,
			login:userName
		},
		dataType:"jsonp",
	}).done(callback).error(callback);
}

function onInstall() {
	chrome.tabs.create({url: "options.html"});
}

function onUpdate() {
	console.log("Extension Updated");
}

function getVersion() {
	var details = chrome.app.getDetails();
	return details.version;
}

function checkInstall(){
	if (currVersion != prevVersion) {
		if (typeof prevVersion == 'undefined') {
		  onInstall();
		} else {
		  onUpdate();
		}
		localStorage['version'] = currVersion;
	}
}
