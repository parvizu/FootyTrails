// JavaScript Document

function historyToggle()
{
	var state = $("#playerHistory").css("display");
	if (state =='none')
	{
		$(".teamData").show();
	}
	$("#playerHistory").slideToggle(400);
}

function historyShortToggle()
{
	var state = $("#playerHistory").css("display");
	
	$(".teamData").slideToggle(300);
	if (state =='none')
	{
		$("#playerHistory").slideToggle(400);
	}
	
}

function historyClose()
{
	var state = $("#playerHistory").css("display");
	if (state !='none')
	{
		$("#playerHistory").slideUp(400);
	}
}

function toggleTeam(teamid)
{
	$("#"+teamid).slideToggle(300);	
}

player_names={};

function displayPlayer(player)
{
	//console.log(player);
	
	$("#playerInfo").show();
	$("#playerPic").html("<img src='img/players/"+player["l_name"]+".jpg'>");
	
	$("#firstName").text(player["f_name"]);
	$("#lastName").text(player["l_name"]);
	$("#currentTeam").text(player["current_team"]);
	$("#nationality").text(player["country"]);
	
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
		//Add small logos to the short list in the player description
		$("#playerShortHistory").append("<span class='shortLogo'><img class='shortHistTeam' src='img/teams/"+history[key].t_name+".jpg'></span>");
		
		
		hcode = "<div class='team' id='"+history[key].t_name.replace(' ','_')+"'><h4 onclick=\"toggleTeam('t_"+history[key].t_name.replace(' ','_')+"')\">"+key+".  "+history[key].t_name+"</h4>";
		hcode += "<div id='t_"+history[key].t_name.replace(' ','_')+"' class='teamData'>";
		hcode+="<div class='teamLogo'><img src='img/teams/"+history[key].t_name+".jpg'></div>";
		
		hcode+= "<div class='teamInfo'><ul><li><span class='label'> URL :</span><a class='teamUrl' target='_blank' href='"+history[key].url+"'>"+history[key].url+"</a></li>";
		hcode+= "<li><span class='label'> League :</span><span class=\"detailsInput\">"+history[key].league+"</li> ";
		hcode+= "<li><span class='label'> Players :</span></li>";
		
		
		hcode+= "<li> <div id='"+history[key].t_name.replace(' ','')+"Players'></div></li></div>";		
		hist.append(hcode);
		
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
							$("#"+team.replace("%20","").replace("%23","")+"Players").append("<a class='btn btn-primary btn-small otherPlayersBtn' onclick='getPlayerData(\""+lastname+"\")'>"+lastname+"</a>");
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
				var nationality="";
				var league="";
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
								if(entry.t[i].indexOf(" ")!=-1){
									last_name=entry.t[i].split(" ",2)[1];
									first_name=entry.t[i].split(" ",2)[0].substr(1);
								}
								else
								{
									last_name=entry.t[i].substr(1);
									first_name=" ";
								}
							}
							if(entry.t[i].charAt(0)=="&")
								{
								nationality=entry.t[i].substr(1);
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
									if(entry.t[i].indexOf("Lg_")==0)
									{
										league=entry.t[i].substr(3);
									}
								}
								team_url=entry.u;
								history[num]={
										"t_name":team_name,
										"url":team_url,
										"tag":"#"+team_name,
										"league":league
										
									};
							}
						}
							
					});
				jsonPlayer={
						"f_name":first_name,
						"l_name":last_name,
						"current_team":current_team,
						"history":history,
						"player_url": player_url,
						"country":nationality
						};
				displayPlayer(jsonPlayer);
			}
	});	
}



$(document).ready(function()
	{

		//$('.carousel').carousel({
			//  interval: 2000
			//});

		$("#historyToggle").hover( 
			function(){ $(this).addClass('')},
			function(){ $(this).removeClass('')});
		
	
		$.ajax({
			url: 'http://feeds.delicious.com/v2/json/tags/sirgalahad88',
			type: "GET",
			dataType: 'jsonp',
			error: function(error) 
				{
					console.log(error);
					console.log("Error: "+error.statusText);
					
				},
			success: function(data) 
				{
				//console.log(data);
				var last_name={};
				var first_name={};
				var names={};
					for(var key in data)
						{
						if(key.charAt(0)=='$')
							{
							if(key.indexOf(' ')!= -1)
								{
								last_name=key.split(" ",2)[1];
								first_name=key.split(" ",2)[0].substr(1);
								names[last_name]=first_name;
								}
							else
								{
								last_name=key.substr(1);
								first_name=" ";
								names[last_name]=first_name;
								}
							}
						}
					loadPlayerPics(names);
					
				}		
			});
		
		function loadPlayerPics(names)
			{
			for(var key in names)
				{
				var link='<a href="" onclick="getPlayerData(\''+key+'\'); return false;" <div class="player-pic"> <img src="img/players/'+key+'.jpg" alt="player pic" id="'+key+'"> <p class="caption">'+key+'</p></div></a>';
				$("#selection").append(link);
				}
			player_names=names;
			//console.log(player_names);
			}
		$(".livepreview").livePreview({
				 	viewWidth: 500,  
				    viewHeight: 500,  
				    targetWidth: 1000,  
				    targetHeight: 800,   
				    offset: 50,
				    position: 'right'		
			});
			
	});
	
