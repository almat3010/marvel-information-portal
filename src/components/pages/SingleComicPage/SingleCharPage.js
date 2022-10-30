import './singleComicPage.scss';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet'

const SingleCharPage = (props) => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
            <title>{props.char.name}</title>
            </Helmet>
            <div className="single-comic">
                <img  src={`${props.char.thumbnail.path}.${props.char.thumbnail.extension}`} alt={props.char.name} className="single-char__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{props.char.name}</h2>
                    <p className="single-comic__descr">{props.char.description}</p>
                </div>
                <Link to='/' className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleCharPage;