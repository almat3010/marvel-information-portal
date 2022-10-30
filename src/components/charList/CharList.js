import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import {useState, useEffect, useRef} from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {
    const [chars, setChars] = useState([]),
          [listLoading, setListLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false) 
    
    const {loading, error, getAllCharacters} = useMarvelService()

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    useEffect(()=>{
        onLoadingChars(offset, true)
        // eslint-disable-next-line
    },[])
    const onUpdateChars = (newChars) => {
        let ended = false
        if(newChars.length < 9) {
            ended = true
        }
        setChars(chars=>[...chars, ...newChars])
        setListLoading(false)
        setOffset(offset=>offset+9)
        setCharEnded(ended)
    }

    const onLoadingChars = (offset, initial) => {
        initial ? setListLoading(false) : setListLoading(true)
        getAllCharacters(offset)
            .then(onUpdateChars)
    }   

    function View(chars) {
        return(
            <ul className="char__grid">
            <TransitionGroup component={null}>
                {chars.map((it,i) => {
                    const style = it.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'fill' : 'cover'
                    return(
                        <CSSTransition key = {it.id} timeout={500} classNames="char__item">
                            <li 
                                // key = {it.id}
                                ref = {el => itemRefs.current[i] = el}
                                className="char__item"
                                onClick = {() => {
                                    props.onChangeId(it.id) 
                                    focusOnItem(i)
                                }}>
                                <img style = {{objectFit: style}} src={it.thumbnail} alt="abyss"/>
                                <div className="char__name">{it.name}</div>
                            </li>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
            </ul>
        )
    }
    const spinner = loading && !listLoading ? <Spinner/> : null,
          errorMessage = error ? <ErrorMessage/> : null,
          view = View(chars)
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {view}
                <button className="button button__main button__long"
                    disabled = {listLoading}
                    onClick={ () => onLoadingChars(offset)}
                    style = {{'display': charEnded ? 'none':'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;