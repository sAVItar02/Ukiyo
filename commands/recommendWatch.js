const request = require("request");
const Data = require("../models/userModel");

module.exports.run = async(bot, message, args) =>{

    if(!(args[0]).startsWith('<@')){
        message.channel.send('If I were you, I\'d recommend that to a user by tagging them 🍜');
        return;
    }

    let user = message.author;
    let tagged = args[0];
    let taggedID = tagged.slice(3,tagged.length-1);
    if(user.id===taggedID) return;

    const url = `https://kitsu.io/api/edge/anime?filter[text]=${args[1]}`;

    request({url}, async(err, response)=>{
        if(err){
            console.log(err);
        }
        else{
            const anime = JSON.parse(response.body).data[0].attributes.titles.en_us;

            Data.findOne({uid: taggedID}, async(err, data)=>{
                if(!data){
                    const newData = new Data({
                        uid: tagged,
                        watchList: [],
                        watchLater: [],
                        recommended: [anime], 
                    });
                    await newData.save().catch((err)=> console.log(err));
                    message.channel.send('Anime recommended!');
                }else{
                    data.recommended.push(anime);
                    await data.save().catch((err) => console.log(err));
                    console.log(data);
                    message.channel.send('Anime recommended!');
                }   
            });
        }
    });
}


module.exports.help = {
    name: "recommend",
    aliases: ['r','rec','rmd',],
  };
  