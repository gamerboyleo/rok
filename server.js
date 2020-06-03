// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const discord = require('discord.js')
const roblox = require('noblox.js')
const client = new discord.Client()
const prefix = ";"
const owner = "294291918022508547"

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("over the ROK border", { type: "WATCHING" });
});

roblox.cookieLogin(process.env.COOKIE)
client.login(process.env.TOKEN)


client.on('message', async message => {
  const args = message.content.split(/\s+/g);
  const command = args
    .shift()
    .slice(prefix.length)
    .toLowerCase();
  
  
  if (command == 'imprison') {
    if (!message.member.roles.cache.some(r=>["Federal Overseer"].includes(r.name)) && !message.member.roles.cache.some(r=>["President"].includes(r.name)) && !message.member.roles.cache.some(r=>["Prime Minister"].includes(r.name)));
    let user = args[0]
    const id = await roblox.getIdFromUsername(user)
    let rank = await roblox.getRankInGroup(6125501, id)
    if(rank == 0) return message.reply(`${user} is not in the group.`)
    if (rank == 2) return message.reply(`nice try. ${user} is already imprisoned.`)
    roblox.setRank({group: 6125501, target: id, rank: 2})
    message.reply(`successfully imprisoned ${user}.`)
    client.channels.cache.get('705577671211352158').send(`Hmm... I wonder what ${user} did to get in prison...`)
    const lEmbed = new discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle("Imprisonment")
      .addFields(
        { name: "Username", value: `${user}`, inline: true},
        { name: "Ran by", value: `<@${message.author.id}>`, inline: true}
      )  
    client.channels.cache.get('705577501740499085').send(lEmbed)
  }
    if (command == 'immigrate') {
    if (!message.member.roles.cache.some(r=>["Federal Overseer"].includes(r.name)) && !message.member.roles.cache.some(r=>["President"].includes(r.name)) && !message.member.roles.cache.some(r=>["Prime Minister"].includes(r.name)) && !message.member.roles.cache.some(r=>["NIS"].includes(r.name)));
    let user = args[0]
    const id = await roblox.getIdFromUsername(user)
    let rank = await roblox.getRankInGroup(6125501, id)
    if(rank == 0) return message.reply(`${user} is not in the group.`)
    if (rank >= 2) return message.reply(`nice try. ${user} is already immigrated.`)
    roblox.setRank({group: 6125501, target: id, rank: 3})
    message.reply(`successfully immigrated ${user}.`)
    client.channels.cache.get('705577671211352158').send(`${user} has been immigrated and ranked Citizen.`)
    const lEmbed = new discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle("Immigration")
      .addFields(
        { name: "Username", value: `${user}`, inline: true},
        { name: "Ran by", value: `<@${message.author.id}>`, inline: true}
      )  
    client.channels.cache.get('705577501740499085').send(lEmbed)
  }
  
  if(command == 'rank') {
    if(!message.member.roles.cache.some(r=>["Federal Overseer"].includes(r.name)) && !message.member.roles.cache.some(r=>["President"].includes(r.name)) && !message.member.roles.cache.some(r=>["Prime Minister"].includes(r.name)) && !message.member.roles.cache.some(r=>["Deputy Prime Minister"].includes(r.name)) && !message.member.roles.cache.some(r=>["NIS"].includes(r.name)) && !message.member.roles.cache.some(r=>["patrol-perm"].includes(r.name))) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[0]
        var rankIdentifier = Number(args[1]) ? Number(args[1]) : args[1];
        let groupId = 6125501
        let maximumRank = 10
        if (!rankIdentifier) return message.channel.send("Please enter a rank ID. You may find these by running :rankids.");
        if (username){
            roblox.getIdFromUsername(username)
            .then(async function(id){
                roblox.getRankInGroup(6125501, id)
                .then(function(rank){
                if (rank == 0) return message.reply(`${username} is not in the group.`)
                    if(maximumRank <= rank){
                      message.channel.send('To prevent admin abuse, you cannot rank people to that rank.')
                    } else {
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            const rEmbed = new discord.MessageEmbed()
                                  .setAuthor(
                                    message.author.tag,
                                    message.author.displayAvatarURL({ format: "png", dynamic: true })
                                  )
                                .setColor("#00ff00")
                                .setTitle('Rank')
                                .setThumbnail("https://getdrawings.com/free-icon/android-checkmark-icon-60.png")
                                .setDescription(`Done! ${username} has been ranked to the rank with the rank ID of ${rankIdentifier}.`)
                            const lEmbed = new discord.MessageEmbed()
                              .setColor('#00ff00')
                              .setTitle("Rank")
                              .addFields(
                                { name: "Username", value: `${username}`, inline: true},
                                { name: "New Rank", value: `${rankIdentifier}`, inline: true},
                                { name: "Ran by", value: `<@${message.author.id}>`, inline: true}
                              )  
                            message.channel.send(rEmbed)
                            client.channels.cache.get('705577501740499085').send(lEmbed)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank. <@294291918022508547>, please have a look at this.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
          });
      } else {
          message.channel.send("Please enter a username.")
      }
      return;
  }
  if (command == "ssu") {
    if (!message.member.roles.cache.some(r=>["Federal Overseer"].includes(r.name)) && !message.member.roles.cache.some(r=>["President"].includes(r.name)) && !message.member.roles.cache.some(r=>["Prime Minister"].includes(r.name)) && !message.member.roles.cache.some(r=>["Deputy Prime Minister"].includes(r.name)) && !message.member.roles.cache.some(r=>["Cabinet"].includes(r.name)) && !message.member.roles.cache.some(r=>["President of the National Assembly"].includes(r.name)) && !message.member.roles.cache.some(r=>["Chief Justice of the Supreme Court"].includes(r.name)));
    const argument = args[0]
    if (!argument) return message.reply('You must pick a ssu location. \n\n h = Hillsborough')
    if (argument == "jsa") {
      client.channels.cache.get('704980932787961899').send(`@everyone [SSU] SSU at the Joint Security Area. https://www.roblox.com/games/4974377191/Joint-Security-Area-Panmunjom-V1 \n\n**Hosted by <@${message.author.id}>**`)
    }
  }
  if (command == "simp") {
    if (message.author.id !== owner && message.author.id !== '330733851750170629') return message.channel.send(`<@${message.author.id}> \n\nhttps://cdn.discordapp.com/attachments/388824214448242688/705245750292119572/simp.jpg`)
    let simp = message.mentions.members.first()
    message.channel.send(`<@${simp.id}> \n\nhttps://cdn.discordapp.com/attachments/388824214448242688/705245750292119572/simp.jpg`)
  }
  if (command == "pleb") {
    if (message.author.id !== owner && message.author.id !== '330733851750170629') return message.channel.send(`<@${message.author.id}> \n\nhttps://cdn.discordapp.com/attachments/388824214448242688/705246395413561374/9k.png`)
    let pleb = message.mentions.members.first()
    message.channel.send(`<@${pleb.id}> \n\nhttps://cdn.discordapp.com/attachments/388824214448242688/705246395413561374/9k.png`)
  }
  if (command === "help") {
    let color = message.member.displayHexColor;
    if (color == '#000000') color = message.member.hoistRole.hexColor;
    const helpEmbed = new discord.MessageEmbed()
      .setColor(color)
      .setTitle("Help")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      )
      .addFields(
        { name: ";help", value: "Shows this embed." },
        { name: ";simp", value: "Try this at your own risk." },
        { name: ";pleb", value: "Also try this at your own risk." },
        { name: ";ssu <jsa>", value: "Start an SSU. (Limited to ssu-perm role only)" },
        { name: ";immigrate", value: "Pass someone through immigration. (Limited to NIS+)" },
        { name: ";rank", value: "Rank someone in the ROBLOX group. (Limited to DPM+)" }
      )
    message.channel.send(helpEmbed);
  }
  if (command == 'rankids') {
    message.reply("The rank IDs are as follows:\n\n10 = Cabinet\n9 = President of the National Assembly\n8 = Chief Justice of the Supreme Court\n7 = National Assembly\n6 = Supreme Court of Korea\n5 = Government Employees\n4 = Foreign Ambassadors\n3 = Citizen\n2 = Federal Prison\n1 = Immigrant")
  }
});


let onShout = roblox.onShout(6125501);
    
    onShout.on('data', function(post) {
        client.channels.cache.get('705587691043160124').send(`New Group Shout \n\n${post.poster.username} shouted: ${post.body}`);
    });
    
    onShout.on('error', function (err) {
        console.error(err.stack);
    });