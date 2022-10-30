import './charInfo.scss';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService';

import { useState, useEffect } from 'react';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)

    const {loading, error, resetError, getCharacter} = useMarvelService()

    useEffect(()=>{
        onUpdateChar()
        // eslint-disable-next-line
    },[props.idCharacter])

    const onLoadedChar = (char) => {
        setChar(char)
    }

    const onUpdateChar = () => {
        const {idCharacter} = props;
        if (!idCharacter) {
            return;
        }
        resetError()
        getCharacter(idCharacter)
            .then(res=>onLoadedChar(res))
    }

    const spinner = loading ? <Spinner/> : null,
            errorMessage = error ? <ErrorMessage/> : null,
            skeleton = !char && !loading ? <Skeleton/>: null,
            view = !(loading || error || !char) ? <View char ={char}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {view}
        </div>
    )
}
const View = ({char}) => {
    const {name,description, thumbnail, homepage, wiki, comics, available} = char
    const style = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover'
    return (
        <>
            <div className="char__basics">
                    <img style={{objectFit: style}} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">{available === 0 ? 'Not found comics ':'Comics:'}</div>
                <ul className="char__comics-list">
                    {comics.map((it,i)=>{
                        // eslint-disable-next-line
                        if(i>9)return;
                        return (
                            <li key={i} className="char__comics-item">
                                {it.name}
                            </li>
                    )
                    })}
                </ul>
        </>
    )
}
export default CharInfo;