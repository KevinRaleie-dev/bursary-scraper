const axios = require('axios');
const cheerio = require('cheerio');

const getBursaryData = async (url) => {

    console.log('Busy crawling the web..🕷');

    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const parseResult = (data) => {
    const $ = cheerio.load(data);

    const bursaries = [];
    const title = $('.entry-content > h1').text();
    $('.entry-content > ul > li').each((_idx, el) => {
        const bursary = $(el).text();
        bursaries.push(bursary);
    });

    // find bursaries that are open all year round
    const alwaysOpen = [];
    for (let index = 0; index < bursaries.length; index += 1) {
        if (!bursaries[index].includes('closing') && !bursaries[index].includes('Closing')) {
            alwaysOpen.push(bursaries[index]);
        }
    }
    
    return {
        title,
        bursaries,
        alwaysOpen
    }
}

async function main() {
    const url = 'https://www.zabursaries.co.za/bursaries-closing-in-september-2021/';
    const getData = await getBursaryData(url);
    const {alwaysOpen, bursaries, title} = parseResult(getData);
    const data = {
        title,
        allBursaries: bursaries,
        alwaysOpen
    }


    console.log(data);
}

main();