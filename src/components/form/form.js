import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';


function Form() {
    const [techWordsValue, setTechWordsValue] = useState('');
    const [ninjaName, setNinjaName] = useState('')


    async function getNinjaName() {
        let formattedTechWords = techWordsValue.replace(/ +(?= )/g,'').split(' ').join(',');
        let url = `https://maxdude132-ninjify.herokuapp.com/ninjify?x=${formattedTechWords}`;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        return data.name;
    }


    function handleChange(event) {
        setTechWordsValue(event.target.value);
    }

    function handleClick() {
        if (!ninjaName) {
            getNinjaName().then(newNinjaName => setNinjaName(newNinjaName));
        } else {
            setNinjaName('');
        }
    }

    function submitOrReset() {
        if (ninjaName) {
            return 'Reset'
        } else {
            return 'Submit'
        }
    }

    return (
        <div className="form"> 
            { ninjaName === ''
                ? <TextField id="tech-words" label="Tech words" variant="filled" value={techWordsValue} onChange={handleChange} required className='pad'></TextField>
                : <h4>Your ninja name is {ninjaName}</h4>
            }
            <Button id="submit-or-reset" variant='contained' onClick={handleClick}>{submitOrReset()}</Button>
        </div>
    );
}

export default Form;