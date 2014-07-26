var username;
var api_key;
load();

function load(){
    chrome.storage.local.get('username', function (result) {
    	username = result.username
    }
    chrome.storage.local.get('api_key', function (result) {
    	api_key = result.api_key
    }
}

function qst(info){
	var selection = info.selectionText;
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		function(tabs){
			var url = tabs[0].url
			shorten(url, username, api_key, function(url){
				tweet(selection, url);
			})
		}
	);
}

function tweet(text, url){
	var twitter = "https://twitter.com/intent/tweet?source=webclient&text=";
	var sep = " ";
	window.open(twitter+text+sep+url,'_blank');
}

function shorten(long_url, username, api_key, callback){
	$.ajax({
		url: "http://api.bit.ly/v3/shorten",
		data:{
			longUrl:long_url,
			apiKey:api_key,
			login:username},
		dataType:"jsonp",
	}).done(function(result){
		callback(result.data.url)
	});
}