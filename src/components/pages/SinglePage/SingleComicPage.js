import './singlePage.scss';
import { useParams, Link } from 'react-router-dom';
import ErrorMessage from '../../errorMessage/ErrorMessage'
import Spinner from '../../spinner/Spinner'
import useMarvelService from '../../../services/MarvelService';
import { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet'


const SingleComicPage = () => {
    const {idComic} = useParams()
    const [comic, setComic] = useState(null)
    const {loading, error, resetError, getComic} = useMarvelService()

    useEffect(() => {
        onLoadingComic()
    },[idComic])

    const onLoadedComic = (comic) => {
        setComic(comic)
    }
    const onLoadingComic = () => {
        resetError()
        getComic(idComic)
            .then(res=>onLoadedComic(res))
    }
    const View = (comic) => {
        const {name, thumbnail, price, description} = comic
        return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content="Marvel information portal"
                    />
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <div className="single-comic__price">{price}$</div>
                </div>
            </>
        )
    }
    const   spinner = loading ? <Spinner/> : null,
            errorMessage = error ? <ErrorMessage/> : null,
            view = !(loading || error || !comic) ? View(comic) : null
    return (
        <>
            <div className="single-comic">
                {spinner}
                {errorMessage}
                {view}
                <Link to='/comics' className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;