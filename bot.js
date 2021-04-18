const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');
let moment = require('moment');

let path = 'C:/Program Files (x86)/Steam/steamapps/common/Don\'t Starve Together/data/out.lua'; //your folder path (views is an example folder)
let path2 = 'C:/Program Files (x86)/Steam/steamapps/common/Don\'t Starve Together/data/in.lua'; //your folder path (views is an example folder)

let lastModified = 0;
let channelHook = 0;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try{
	  if(!fs.existsSync(path)){
			var str = {message: "", time: Date.now()}
		fs.writeFileSync(path,JSON.stringify(str));
	  }
  }
  catch(err){console.log(err)}
  try{
	  if(!fs.existsSync(path2)){ //if file doesnt exist, make it
		  fs.writeFileSync(path2, "");
	  }
  }
  catch(err){console.log(err)}
	fd = undefined;
  try{
  fd = fs.openSync(path,'r');
  } catch(err){console.log(err)}
	try{
	 var data = fs.statSync(path)
		lastModified = data.mtime.toISOString();
		console.log("last modified changed to " + lastModified);
	}
	catch (err){console.log(err);}
	 try{
		fs.closeSync(fd);
	 }
	 catch(err){
		 console.log(err);
	 }
});

client.on('message', message => {
  if (message.content == "dst!link" && channelHook == 0) { 
	channelHook = message.channel;
	message.delete();
      var interval = setInterval (function () {
			fs.open(path,'r',(err, fd) => {
				if(err){
					console.log(err);
					return;
				} 
				else{ 
					fs.stat(path, (err, data) => {
					let previousLMM = moment(lastModified);
					let rightNow = data.mtime.toISOString();
					let folderLMM = moment(rightNow);
					let res = !(folderLMM.isSame(previousLMM, 'second')); //seconds granularity
					if(res){
						try {
						  let data = JSON.parse(fs.readFileSync(path, 'utf8'))
						  message.channel.send(String(data.name) + ":" + String(data.message));
						} catch (err) {
						  console.error(err);
						}
						lastModified = rightNow;
					}
					try{
						fs.closeSync(fd);
						 }
						 catch(err){
							 console.log(err);
						 }
				});
	}
});
	
      }, 500); 
    }
	
		if(message.content.startsWith("!send ") && message.channel == channelHook){
		SendToDontStarve(message.author.username,message.content.substring(6))
	}
	/*
	examples of custom commands, there is a commented part of the dont starve side where it allows anybody who does a / command to execute custom lua on the serverside. PLEASE SET THIS UP CAREFULLY, GIVING THIS ABILITY TO ANYONE CAN DAMAGE PEOPLE'S GAMES IF USED NEFARIOUSLY.
	if(message.content.startsWith("!ban ") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/TheNet:Ban('" + message.content.substring(5) + "')")
	}
	if(message.content.startsWith("!kick ") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/TheNet:Kick('" + message.content.substring(6) + "')")
	}
	if(message.content.startsWith("!regenerate") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/c_regenerateworld()")
	}
	if(message.content.startsWith("!rollback ") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/c_rollback("+message.content.substring(10)+")")
	}
	if(message.content.startsWith("!listplayers") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/str = '' for i, v in ipairs(AllPlayers) do str = str..string.format('[%d] (%s) %s <%s>', i, v.userid, v.name, v.prefab).. '\\n' end SendToDiscord('[Server]',str)")
	}
	if(message.content.startsWith("!announce ") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/c_announce('" + message.content.substring(10) + "')")
	}
	if(message.content.startsWith("!save") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/c_save()")
	}
	if(message.content.startsWith("!reset") && message.channel == channelHook){
		SendToDontStarve(message.author.username,"/c_reset()")
	}
	
	if(message.content.startsWith("!help") && message.channel == channelHook){
		message.channel.send("!ban                TheNet:Ban(userid) \n!kick               TheNet:Kick(userid)\n!regenerate   c_regenerateworld()\n!rollback        c_rollback(count)\n!listplayers    c_listallplayers\n!announce     c_announce(\"announcement\")\n!save               c_save()\n!reset              c_reset()")
	}*/

});

function SendToDontStarve(_name, _message){
	fs.open(path2,'w',(err, fd) => {
			try {
				var str = {time:Date.now(), name:_name,message:_message}
				  fs.writeFileSync(path2, JSON.stringify(str));
				  
				} catch (err) {
				  console.error(err);
				}
			try{
				fs.closeSync(fd);
				 }
				 catch(err){
					 console.log(err);
				 }
		});
}


client.login('bot token here!');



