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
		fs.writeFileSync(path,Date.now());
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
  if (message.content === "dst!link") { 
	channelhook = message.channel;
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
						  let data = fs.readFileSync(path, 'utf8')
						  message.channel.send(data);
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
	
	if(message.content.startsWith("!send ")){
		console.log(Date.now());
		fs.open(path2,'w',(err, fd) => {
			try {
				  fs.writeFileSync(path2, Date.now() + "\n" + message.author.username + ": " + message.content.substring(6));
				  console.log("wroted");
				  
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
});



client.login('put your token here!');



