import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiKey = 'apikey=3006d79a73e512ba344b255a011c1b65'
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _offsetBase = 210
    const {loading, error, resetError, req} = useHttp()

    const getAllCharacters = async (offset = _offsetBase) => {
        const res = await req(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformData)
    }
    const getCharacter = async (id) => {
        const res = await req(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformData(res.data.results[0])
    }
    const getCharacterByName = async (name) => {
        const res = await req(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results[0]
    }
    const getComic = async (id) => {
        const res = await req(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformDataComics(res.data.results[0])
    }
    const getAllComics = async (offset = _offsetBase*2-20) => {
        const res = await req(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformDataComics)
    }
    const _transformDataComics = (comics) => {
        return {
            id: comics.id,
            description: comics.description ? comics.description : 'Not found',
            name: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices[0].price
        }
    }
    const _transformData = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Not found description',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            available: char.comics.available 
        }
    }
    return {loading, error, resetError, getAllCharacters, getCharacter, getAllComics, getComic,getCharacterByName}
}

export default useMarvelService