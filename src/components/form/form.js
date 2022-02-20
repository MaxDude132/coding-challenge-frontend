import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';


const NINJA_NAME_DEFAULT = '';

const NO_WORDS_ERROR_MESSAGE = 'Please enter a word.';
const UNKOWN_ERROR_MESSAGE = 'An unknown error occured.';


function Form() {
    const [techWordsValue, setTechWordsValue] = useState('');
    const [ninjaName, setNinjaName] = useState(NINJA_NAME_DEFAULT);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getNinjaName() {
        let formattedTechWords = techWordsValue.replace(/ +(?= )/g,'').split(' ').join(',');
        let url = `https://maxdude132-ninjify.herokuapp.com/ninjify?x=${formattedTechWords}`;
        let response;
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let data = await response.json();
            await sleep(1500);
            return data.name;
        } catch {
            setHasError(true);
            setErrorMessage(UNKOWN_ERROR_MESSAGE);
            setIsLoading(false);
        }
        return '';
    }

    function handleChange(event) {
        setTechWordsValue(event.target.value);
    }

    function handleClick() {
        if (techWordsValue === '' && !hasError) {
            setHasError(true);
            setErrorMessage(NO_WORDS_ERROR_MESSAGE);
        } else if (hasError) {
            setHasError(false);
            setTechWordsValue('');
        } else if (!ninjaName) {
            setIsLoading(true);
            getNinjaName().then(newNinjaName => {
                setNinjaName(newNinjaName);
                setIsLoading(false);
            });
        } else {
            setNinjaName(NINJA_NAME_DEFAULT);
        }
    }

    function submitOrReset() {
        if (ninjaName !== NINJA_NAME_DEFAULT || hasError) {
            return 'Reset';
        } else {
            return 'Submit';
        }
    }

    function formDisplay() {
        if (hasError === true) {
            return <h4>{errorMessage}</h4>;
        } else if (isLoading) {
            return <CircularProgress className='pad' />;
        }  else if (ninjaName === NINJA_NAME_DEFAULT) {
            return <TextField id="tech-words" label="Tech words" variant="filled" value={techWordsValue} onChange={handleChange} required className='pad'></TextField>;
        } else {
            return <h4>Your ninja name is {ninjaName}</h4>;
        }
    }

    return (
        <div className="form"> 
            {formDisplay()}
            {!isLoading && <Button id="submit-or-reset" variant='contained' onClick={handleClick}>{submitOrReset()}</Button>}
        </div>
    );
}

export default Form;