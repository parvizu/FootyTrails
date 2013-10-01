// JavaScript Document

function displayPlayer(player)
{
	console.log(player);
	
	$("#playerInfo").show();
	$("#playerPic").html("<img src='img/players/"+player["l_name"]+".jpg'>");
	
	$("#firstName").text(player["f_name"]);
	$("#lastName").text(player["l_name"]);
	$("#currentTeam").text(player["current_team"]);
	//$("#playerDetails").css("background
	//$("#playerTeam").html("<img class='currentTeam' src='img/teams/"+player['current_team']+".jpg'>");
	
	/*
	$("#playerDetails").html('<ul><li><h5>Name:</h5> '+player["f_name"]+" "+player["l_name"]+'</li><li><h5>Current Team:</h5> '+player["current_team"]+'</li><li><h5>Profile:</h5><a target="_blank" href="'+player["player_url"]+'">'+player["player_url"]+'</a></li></ul>');
	
	*/
	var history = player["history"];
	console.log(history);
	displayHistory(history);
	
	
}

function displayHistory(history)
{
	var hist = $("#playerHistory");
	hist.html("");
	$("#playerShortHistory").html('');
	var hcode;
	for (var key in history)
	{
		$("#playerShortHistory").append("<span class='shortLogo'><img class='shortHistTeam' src='img/teams/"+history[key].t_name+".jpg'></span>");
		
		hcode = "<div class='team' id='"+history[key].t_name.replace(' ','_')+"'>";
		hcode+="<div class='teamLogo'><img src='img/teams/"+history[key].t_name+".jpg'></div>";
		
		hcode+= "<div class='teamInfo'><h5>"+history[key].t_name+"</h5><ul><li>URL:<a class='teamUrl' target='_blank' href='"+history[key].url+"'>"+history[key].url+"</a></li><li>Other players:</li> <span id='"+history[key].t_name.replace(' ','')+"Players'></span></div>";
		
		
		hcode+= "</div>";		
		hist.append(hcode);
		
		//TEST
		//teamplayers(history[key].t_name);
		
	}
	
	
	//get the players that have played for this team at some point
	for (var keys in history)
	{
		var encoded = encodeURIComponent("#"+history[keys].t_name);
		teamplayers(encoded);
	}
	
}


var teamplayers = function(team)
{
	//console.log(team);
	$.ajax({
		url: 'http://feeds.delicious.com/v2/json/sirgalahad88/'+team,
		type: 'GET',
		async: false,
		dataType: 'jsonp',
		error: function(error)
			{
				console.log(error.statusText);	
			},
		success: function(data)
			{
				console.log(data);
				data.forEach(function(entry)
				{	
					for(var i = 0; i<entry.t.length;i++)
					{
						var tag = entry.t[i];
						//console.log(tag);
						if (tag.search("-")!=-1)
						{
							console.log(team);
							var lastname = tag.substring(-(tag.length-2),tag.length-2);
							$("#"+team.replace("%20","").replace("%23","")+"Players").append("<a class='btn btn-primary btn-small otherPlayers' onclick='getPlayerData(\""+lastname+"\")'>"+lastname+"</a>");
							//var t = new GetPlayerName(lastname);
							//players[lastname]=t;
						}
						
					}
				});
			}
	});
	
}


function GetPlayerName(lastname)
{
	//console.log('http://feeds.delicious.com/v2/json/sirgalahad88/'+lastname);
	first_name='';
	$.ajax(
		{
			url: 'http://feeds.delicious.com/v2/json/sirgalahad88/'+lastname,
			type: 'GET',
			dataType: 'jsonp',
			async:false,
			error: function(error) 
				{
					console.log(error);
					console.log("Error: "+error.statusText);
				},
			success: function(data)
			{
				first_name = getname(data);
				console.log("in:" + first_name);
			}	
		});
	console.log("out:" +first_name);
	return first_name;
}


var getname = function(data)
{
	var first= '';
	data.forEach(function(entry)
	{
		for(var i=0;i<entry.t.length;i++)
		{
			if(entry.t[i].charAt(0)=="$")
			{
				first =entry.t[i].split(" ",2)[0].substr(1);
			}
		}
	});
	return first;
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
				var last_name="";
				var first_name="";
				var current_team="";
				var player_url = "";
				var history={};
				var jsonPlayer=new Object();
					//console.log(data.length);
					
				//finds the name of the player from the items received by his lastname tag
				data.forEach(function(entry)
					{
						for(var i=0;i<entry.t.length;i++)
						{
							
							if(entry.t[i].charAt(0)=="$")
							{
								player_url = entry.u;
								last_name=entry.t[i].split(" ",2)[1];
								first_name=entry.t[i].split(" ",2)[0].substr(1);
							}
						}
						//console.log(entry);
					});
				data.forEach(function(entry)
					{
						for(var j=0;j<entry.t.length;j++)
						{
							ct=last_name+"-"+(data.length-1);
							var lname=entry.t[j].split("-",2)[0];
							var num=0;
							var team_name="";
							var team_url="";
							if(ct==entry.t[j])
							{
								for(var i=0;i<entry.t.length;i++)
								{
									if(entry.t[i].charAt(0)=="#")
									{
										current_team=entry.t[i].substr(1);
									}
								}
							}
							if(lname==last_name)
							{
								num=entry.t[j].split("-",2)[1];
								for(var i=0;i<entry.t.length;i++)
								{
									if(entry.t[i].charAt(0)=="#")
									{
										team_name=entry.t[i].substr(1);
										//console.log(team_name);
									}
								}
								team_url=entry.u;
								history[num]={
										"t_name":team_name,
										"url":team_url,
										"tag":"#"+team_name
										
									};
							}
						}
							
					});
				jsonPlayer={
						"f_name":first_name,
						"l_name":last_name,
						"current_team":current_team,
						"history":history,
						"player_url": player_url	
						};
				displayPlayer(jsonPlayer);
			}
	});	
}



$(document).ready(function()
	{
		
		
	}
);


	
	
