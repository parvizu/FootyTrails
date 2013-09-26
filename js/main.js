// JavaScript Document

function getStuff()
{
	$.ajax({
			url:'https://sirgalahad88:pablopablo@api.delicious.com/v1/posts/get',
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

function displayPlayer(lastname)
{
	$("#playerPic").html("<img src='img/players/"+lastname+".jpg'>");
}

function getPlayerData(player)
{
	$.ajax({
		//url:'https://sirgalahad88:pablopablo@api.delicious.com/v1/posts/all',
		//url: 'http://feeds.delicious.com/v2/json/sirgalahad88?count=50',
		url: 'http://feeds.delicious.com/v2/json/sirgalahad88/'+player,
		type: "GET",
		dataType: 'jsonp',
		error: function(error) 
			{
				console.log(error);
				console.log("Error: "+error.statusText);
				
			},
		success: function(data) 
			{
				console.log(data.length);
				data.forEach(function(entry)
					{
						console.log(entry);
					});
			}
	});	
}


$(document).ready(function()
	{
		
		
	}
);


	
	