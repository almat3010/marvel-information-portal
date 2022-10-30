import './randomChar.scss';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const RandomChar = () => {
    const [char,setChar] = useState({})
    const {loading, error, resetError, getCharacter} = useMarvelService()

    useEffect(()=>{
        onUpdateChar()
        // eslint-disable-next-line
    },[])

    const onLoadedChar = (char) => {
        setChar(char)
    }

    const onUpdateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        resetError()
        getCharacter(id)
            .then(res=>onLoadedChar(res))
    }

    const spinner = loading ? <Spinner/> : null,
          errorMessage = error ? <ErrorMessage/> : null,
          view = !(loading || error) ? <View char ={char} loading = {loading}/> : null
    return (
            <div className="randomchar">
                {spinner}
                {errorMessage}
                {view}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                    onClick = {onUpdateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
    )
}

const View = ({char}) => {

    const {name,description, thumbnail, homepage,wiki} = char
    const style = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover'
    return (
            <div className="randomchar__block">
                <img style={{objectFit: style}} src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;