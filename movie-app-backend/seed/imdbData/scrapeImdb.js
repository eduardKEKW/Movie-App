require('dotenv/config');

const request = require('request');
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const webpage = "http://www.imdb.com/chart/top";
const omdb = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;

const getData = () => {
    request({
        url: webpage,
        headers: {
            "accept-language": "en"
        }
    }, function (error, response, body) {

        const ids = Array.from(Object
            .values($('td > a',body))
            .filter(e => e && e.attribs && e.attribs.href)
            .reduce((acc,curr) => {
                acc.add(/\/title\/(.+)\/\?/g.exec(curr.attribs.href)[1]);
                return acc;
            },new Set()));

        const seedIds = ids;

        const movieData = seedIds.map(_id => rp(`${omdb}&i=${_id}&type=movie&plot=full`));

        Promise.all(movieData).then(res => {

            fs.writeFileSync('seed/imdbData/imdb.json', JSON.stringify(res) , function (err) {
                console.log('err!',err);
            });
        })
        .catch(err => console.log(err));

    });
}

getData();