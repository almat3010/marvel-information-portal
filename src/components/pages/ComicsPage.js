import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import {Helmet} from 'react-helmet'

export const ComicsPage = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
            <title>Comics</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}