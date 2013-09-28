// JavaScript Document


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
			var last_name="";
			var first_name="";
			var current_team="";
			var history={};
			var jsonPlayer=new Object();
				console.log(data.length);
				data.forEach(function(entry)
					{
				
						var i;
						for(i=0;i<entry.t.length;i++){
								if(entry.t[i].charAt(0)=="$"){
										last_name=entry.t[i].split(" ",2)[1];
										first_name=entry.t[i].split(" ",2)[0].substr(1);
								}
						}
						
						console.log(entry);
						
					});
				data.forEach(function(entry){
					for(var j=0;j<entry.t.length;j++){
						ct=last_name+"-"+(data.length-1);
						var lname=entry.t[j].split("-",2)[0];
						var num=0;
						var team_name="";
						var team_url="";
						if(ct==entry.t[j])
							{
							for(var i=0;i<entry.t.length;i++){
								if(entry.t[i].charAt(0)=="#")
									{
									current_team=entry.t[i].substr(1);
									}
							}
							}
						if(lname==last_name)
							{
							num=entry.t[j].split("-",2)[1];
							for(var i=0;i<entry.t.length;i++){
								if(entry.t[i].charAt(0)=="#")
									{
									team_name=entry.t[i].substr(1);
									console.log(team_name);
									}
							}
							team_url=entry.u;
							history[num]={
										"t_name":team_name,
										"url":team_url
									};
								
							
							}
					}
							
					});
				jsonPlayer={
						"f_name":first_name,
						"l_name":last_name,
						"current_team":current_team,
						"history":history
							
						};
					displayPlayer(jsonPlayer);
			}
	});	
}



$(document).ready(function()
	{
		
		
	}
);


	
	
