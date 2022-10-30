import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { ComicsPage } from "../pages/ComicsPage";
import ErrorMessage from "../errorMessage/ErrorMessage";
import SingleComicPage from "../pages/SinglePage/SingleComicPage"
import { useState } from "react";
import SingleCharPage from "../pages/SinglePage/SingleCharPage";
import {Helmet} from 'react-helmet'

const App = () => {
    const [char, setChar] = useState('null')
    return (
        <>  
            <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel information portal</title>
            </Helmet>
            <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element = { <MainPage setChar={setChar} /> } />
                        <Route path="/comics" element = {<ComicsPage/>} />
                        <Route path="/comics/:idComic" element = {<SingleComicPage/>} />
                        <Route path= "/:nameChar" element = {<SingleCharPage char={char}/>} />
                        <Route path ="*" element = { <ErrorMessage/>} />
                    </Routes>
                </main>
            </div>
            </Router>
        </>
    )
}

export default App;