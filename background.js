function qst(info){
	//TODO: Implment
	return
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