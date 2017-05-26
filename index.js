const Discord = require('discord.js');
const client = new Discord.Client();
var cheerio = require('cheerio');
var rp = require('request-promise');

client.on('ready', () => {
  console.log('I am ready!');
});

var onion_pattern = /(^|\s)(nervous man|end of trump's campaign)($|\p|\s)/i
var wh_live_pattern = /(^|\s)(today's disasters)($|\p|\s)/i
var mattering_pattern = /(^|\s|\p)mattering/i
var sad_pattern = /(^|\s)(sad!|low energy)/i
var abuela_pattern = /(^|\s)(hillary|clinton)($|\s|\p)/i
var daniels_pattern = /(^|\s)(voice friend bad|135b|but what if)($|\s|\p)/i
var mlyp_pattern = /(^|\s|\p)(good|shameful|meaningless|garbage|fantastic|wonderful|perfect|sucks|bad|disgusting)($|\s|\p)/i

client.on('message', message => {
  if(message.channel.id == 272035227574992897) {
    if (onion_pattern.test(message.content)) {
      message.reply('<http://www.theonion.com/article/will-be-end-trumps-campaign-says-increasingly-nerv-52002>');
    } else if (mattering_pattern.test(message.content)) {
      message.reply('Who cares, nothing matters, no one knows anything, everything sucks.');
    } else if (daniels_pattern.test(message.content)) {
      message.channel.send('`.---- ...-- ..... -...`');
    } else if (sad_pattern.test(message.content)) {
      var emoji = message.guild.emojis.find('name', 'sad');
      message.react(emoji);
    } else if (abuela_pattern.test(message.content)) {
      var emoji = message.guild.emojis.find('name', 'abuela');
      message.react(emoji);
    } else if (wh_live_pattern.test(message.content)) {
      var url = 'https://www.whitehouse.gov/live';
      var events = [];
      rp(url)
      .then(function(html) {
        var $ = cheerio.load(html);
        $('.view-content').filter(function() {
          var data = $(this);
          data.find('.views-row').each(function(i,v) {
            var eventTime = $(this).find('.date-display-single').first().text();
            var eventName = $(this).find('a').first().text();
            var eventStr = eventTime + ': ' + eventName;
            events.push(eventStr);
          });
          console.log(events.toString());
        });
        message.channel.send(events.join("\n"));
      })
      .catch(function(err) {
        console.log('Crawl failed!');
      });
      
    }  
  } else {
    if (mlyp_pattern.test(message.content)) {
      var emoji = message.guild.emojis.find('name', 'mlyp');
      message.react(emoji);
    }
});

client.login(process.env.app_token);
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('increasingly-nervous-man\n'); })
  .listen(process.env.PORT || 8080);
