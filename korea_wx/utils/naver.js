const axios = require("axios");

async function naver({type, query, display, start, sort}) {
    let url = ''
    if (type === 'news') {
        url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURI(query)}&display=${display}&start=${start}&sort=sim`
    } else if (type === 'book') {
        url = `https://openapi.naver.com/v1/search/book.json?query=${encodeURI(query)}&display=${display}&start=${start}`
    } else if (type=== 'movie'){
        url = `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(query)}&display=${display}&start=${start}&country=KR`
    }
    return await axios.get(url, {
        headers: {
            'X-Naver-Client-Id': '1hwxGRb5dISwvc1uY_iD',
            'X-Naver-Client-Secret': 'Xn8qBPlv3x'
        }
    })
}

module.exports = naver