// JavaScript Document

function getStuff()
{
	$.ajax({
			url:'https://sirgalahad88:pablopablo@api.delicious.com/v1/posts/get?url=http%3A%2F%2Fischool.berkeley.edu',
			dataType: 'jsonp',
			success: function(data) 
			{
				//console.log(data);
				data.forEach(function(entry)
					{
						console.log(entry.u)
					});
			}
		});
}

$(document).ready(function()
	{
		var key ='dj0yJmk9Tk1nSkdPTlM3NDNCJmQ9WVdrOVJrOXZSV1V6TkhNbWNHbzlNVGt6TURVeU5qRTJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD03Yg';
		$.ajax({
			url:'http://feeds.delicious.com/v2/json/sirgalahad88',
			type: "GET",
			dataType: 'jsonp',
			success: function(data) 
			{
				//console.log(data);
				data.forEach(function(entry)
					{
						console.log(entry.u)
					});
			}
		});
	}
);


	
	