import './searchForm.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SearchForm = (props) => {
    const {loading, error, resetError, getCharacterByName} = useMarvelService()
    const [char,setChar] = useState(null)

    const onUpdateChar = (char) => {
        setChar(char)
        props.setChar(char)
    }

    const onSearchChar = (char) => {
        resetError()
        getCharacterByName(char).then(res=>onUpdateChar(res))
    }

    return (
        <div className="wrapper">
            <h3 className="form__header">Or find a character by name:</h3>
            <Formik
                initialValues={{name:''}}
                validate = {values => {
                    const errors = {}
                    if(!values.name){
                        errors.name = 'This field is required'
                    }
                    return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                    onSearchChar(values.name)
                    setSubmitting(false);
                    values.name = ''
                }}
            >
            {({isSubmitting}) => (
                <Form className='form'>
                    <Field className='form__input' placeholder='Enter name' name = 'name'></Field>
                    <button className='button button__main form__button' type='submit' disabled={isSubmitting}>
                        <div className="inner">
                            Find
                        </div>
                    </button>
                    <ErrorMessage className='form__msg form__error' name='name' component={'div'}></ErrorMessage>
                    {char === undefined  ? <div className="form__msg">Not found</div> :null }
                    {char && !error && !loading ? 
                        <Link className='form__link' to={`/${char.name}`}>
                            <div className="form__msg"> There is! Visit {char.name} page? </div>
                            <button className='button button__secondary form__toPage' type='submit'>
                                <div className="inner">
                                    To Page
                                </div>
                            </button>
                        </Link>
                        : null
                    }
                </Form>
            )}
            </Formik>
        </div>
    )
}