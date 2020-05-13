const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');
let moment = require('moment');

let path = 'D:/benis/steamapps/common/Don\'t Starve Together/data/out.lua'; //your folder path (views is an example folder)
let path2 = 'D:/benis/steamapps/common/Don\'t Starve Together/data/in.lua'; //your folder path (views is an example folder)

let lastModified = 0;
let channelHook = 0;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  fs.open(path,'r',(err, fd) =>{
	 fs.stat(path,(err,data) =>{
		lastModified = data.mtime.toISOString();
		console.log("last modified changed to " + lastModified);
	 });
	 try{
	fs.closeSync(fd);
	 }
	 catch(err){
		 console.log(err);
	 }
  });
});

client.on('message', message => {
  if (message.content === '') {
    message.reply('Pong!');
  }
  if (message.content === "dst!startup") { 
		
  }
  if (message.content === "dst!dstlink") { 
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
					console.log('check if file/folder last modified date, was it after my last check ');
					let previousLMM = moment(lastModified);
					let bruh = data.mtime.toISOString();
					let folderLMM = moment(bruh);
					let res = !(folderLMM.isSame(previousLMM, 'second')); //seconds granularity
					console.log(folderLMM);
					console.log(previousLMM);
					if(res){
						try {
						  let data = fs.readFileSync(path, 'utf8')
						  console.log(data);
						  message.channel.send(data);
						} catch (err) {
						  console.error(err)
						}
						lastModified = bruh;
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
	
	if(message.content.startsWith("!send")){
		//message.delete();
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



client.login('bot login here');



