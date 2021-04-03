const axios = require("axios");

const VOICEURL = 'https://dict.youdao.com/dictvoice?audio='

async function getYouDao(word) {
    const searchResult = await axios.get(`http://dict.youdao.com/jsonapi?q= ${encodeURI(word)}&client=mobile&le=ko`)
    let wordTranslationList = []
    let sentenceList = []
    let pos = ''
    if (searchResult.data["meta"]["guessLanguage"] !== 'ko') {
        return '请输入韩文后重新搜索'
    }
    if (searchResult.data["meta"]["dicts"].includes('fanyi')) {
        return searchResult.data["fanyi"]
    }
    if (searchResult.data["web_trans"] !== undefined) {
        const webT = searchResult.data["web_trans"]["web-translation"].filter(item => item['@same'] !== undefined)
        if (webT.length !== 0) {
            webT[0]["trans"].forEach(item => wordTranslationList.push(item.value))
        }
    }
    if (searchResult.data["blng_sents_part"] !== undefined) {
        searchResult.data["blng_sents_part"]["sentence-pair"].forEach(
            item => {
                sentenceList.push({
                    'sentence': item['sentence'],
                    'sentence_translation': item['sentence-translation'],
                    'sentence_speech': VOICEURL + item['sentence-speech']
                })
            }
        )
    }
    if (searchResult.data["longchao-kc"] !== undefined) {
        pos = searchResult.data["longchao-kc"]["dataList"][0]["pos"]
    }
    if (searchResult.data["kc"] !== undefined) {
        if (pos === '') {
            pos = searchResult.data["kc"]["word"][0]["trs"][0]["pos"]
        }
        if (wordTranslationList.length === 0) {
            searchResult.data["kc"]["word"][0]["trs"][0]["tr"].forEach(item => {
                wordTranslationList.push(item["l"]["i"][0].replace(/[\。|\.|\?]/g, ""))
            })
        }
    }
    return {
        'pos': pos,
        'translation': wordTranslationList.join(','),
        'sentence': sentenceList,
        'sound': VOICEURL + searchResult.data["simple"]["word"][0]["speech"]
    }
}

async function getYouDaoList(wordList) {
    let result = []
    for (const item of wordList) {
        result.push(await getYouDao(item))
    }
    return result
}

module.exports = {getYouDao,getYouDaoList}