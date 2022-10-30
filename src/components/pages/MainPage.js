import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import { SearchForm } from "../searchForm/SearchForm";

export const MainPage = (props) => {
    const [idChar, setIdChar] = useState(null)
    const onChangeId = (id) => {
        setIdChar(id)
    }

    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onChangeId = {onChangeId}/>
                <div className="column">
                    <CharInfo idCharacter = {idChar} />
                    <SearchForm setChar = {props.setChar}></SearchForm>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}