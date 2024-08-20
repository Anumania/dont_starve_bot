local json = require ("json")

local io = GLOBAL.io
local TheWorld = GLOBAL.TheWorld
local lastTime = GLOBAL.os.time()


GLOBAL.SendToDiscord = function(_name,_message)
	local dir = "out.json"
	local file = io.open(dir, 'w')
	if file == nil then
		print('ERROR! ',err)
	else 
		local encoded = json.encode({
			name = _name,
			message = _message
		})
		file:write(encoded)
		file:close()
	end
end
 
local function starts_with(str, start)
   return str:sub(1, #start) == start
end

local oldUpdate = GLOBAL.Update
GLOBAL.Update = function(x)  
	if(GLOBAL.TheShard:IsMaster() or not GLOBAL.TheNet:GetServerIsDedicated()) then
		local dir = "in.json"
		local file = io.open(dir, 'r')
		if file == nil then
			print('ERROR! ',err)
		else
			fileCont = file:read("*l")
			if(fileCont ~= nil) then
				filed = json.decode(fileCont)
				if filed.time ~= nil then
					local thisTime
					if(GLOBAL.TheNet:GetServerIsDedicated()) then --for some reason, dedicated servers are better at counting.
						thisTime = math.floor(GLOBAL.tonumber(string.match(filed.time, "%d+"))/1000)
					else
						thisTime = math.floor(GLOBAL.tonumber(string.match(filed.time, "%d+")))
					end
					if thisTime > lastTime then
						local fileContent = filed.message
						if(fileContent ~= nil) then
							if(starts_with(fileContent,"/")) then
								local str = fileContent:sub(2)
								--GLOBAL.ExecuteConsoleCommand(str) --uncomment this to allow ANYONE WHO SENDS A MESSAGE THAT STARTS WITH A / TO SEND ANY CUSTOM LUA THEY WANT, SET THIS UP INCREDIBLY CAREFULLY, DO NOT GIVE THIS ABILITY TO ANYONE BUT YOUR MOST TRUSTED.
							else
								GLOBAL.TheNet:SystemMessage(tostring(filed.name) .. ":" ..  tostring(fileContent))
							end
						end
						lastTime = thisTime
						end
					end
				else
					--print("there is an updated version of the synced discord mod, go redownload the bot from the github page")
				end
			file:close()
		end	
	end
	oldUpdate(x)
end

local oldNetworking_Say = GLOBAL.Networking_Say
GLOBAL.Networking_Say = function(guid, userid, name, prefab, message, colour, whisper, isemote, user_vanity)
	if(whisper == false) then
		GLOBAL.SendToDiscord(tostring(name),message)
		--GLOBAL.SendToDiscord("["..tostring(userid).."]-"..tostring(name),message) --uncomment if you want to display user id's next to names for administrator purposes
	else
		--GLOBAL.SendToDiscord("["..tostring(userid).."] [whisper]".."-"..tostring(name),message)  --uncomment if you want to display whispers
	end
	oldNetworking_Say(guid, userid, name, prefab, message, colour, whisper, isemote, user_vanity)
end

local oldNetworking_Announcement = GLOBAL.Networking_Announcement
GLOBAL.Networking_Announcement = function(message, colour, announce_type)
	if announce_type == "default" then
		GLOBAL.SendToDiscord("[Announcement]",message)
	elseif announce_type == "death" then
		GLOBAL.SendToDiscord("[Death]",message)
	elseif(announce_type == "join_game") then
		GLOBAL.SendToDiscord("[Join Game]",message)
	elseif(announce_type == "leave_game") then
		GLOBAL.SendToDiscord("[Leave Game]",message)
	elseif(announce_type == "resurrect") then
		GLOBAL.SendToDiscord("[Resurrect]",message)
	elseif(announce_type == "kicked_from_game") then
		GLOBAL.SendToDiscord("[Kick]",message)
	elseif(announce_type == "banned_from_game") then
		GLOBAL.SendToDiscord("[Ban]",message)
	else
		print("[Discord Link] announcement type was unrecognised, bother me about it if its unintentional")
		GLOBAL.SendToDiscord(announce_type,message)
	end
	oldNetworking_Announcement(message, colour, announce_type)
end