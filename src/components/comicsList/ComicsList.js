import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';

const ComicsList = () => {
    const [comics, setComics] = useState([]),
          [offset, setOffset] = useState(400),
          [comicsEnded, setComicsEnded] = useState(false),
          [listLoading, setListLoading] = useState(false)

    const {loading, error, resetError, getAllComics} = useMarvelService()

    useEffect(() => {
        onLoadingComics()
        // eslint-disable-next-line
    },[])

    const onUpdateList = (newComics) => {
        let ended = false
        if(newComics.length < 8) {
            ended = true
        }
        setListLoading(false)
        setOffset(offset=>offset+8)
        setComicsEnded(ended)
        setComics([...comics, ...newComics])
    }

    const onLoadingComics = (offset) => {
        resetError()
        setListLoading(true)
        getAllComics(offset).then(res=>onUpdateList(res))
    }

    const loaded = loading ? <Spinner/> : null,
          errorMsg = error ? <ErrorMessage/> : null,
          view = !error ? <View listLoading = {listLoading} comics = {comics} 
          onLoadingComics = {onLoadingComics} offset = {offset} comicsEnded = {comicsEnded}/> : null

    return (
        <div className="comics__list">
            {loaded}
            {errorMsg}
            {view}
        </div>
    )
}

const View = ({listLoading, comics, onLoadingComics,offset, comicsEnded}) => {
    return(
        <>
            <ul className="comics__grid">
                {comics.map((it,i)=>{
                    return(
                        <li key={i} className="comics__item">
                            <Link to={`${it.id}`}>
                                <img src={it.thumbnail} alt={it.name} className="comics__item-img"/>
                                <div className="comics__item-name">{it.name}</div>
                                <div className="comics__item-price">{it.price}$</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <button className="button button__main button__long"
                    disabled={listLoading}
                    onClick={() => onLoadingComics(offset)}
                    style= {{'display': comicsEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default ComicsList;