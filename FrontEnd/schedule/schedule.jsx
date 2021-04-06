import React, { useState } from 'react';

const Schedules = (props => {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');


    return(
        <div>
            <form>
                <label>
                    <input name='text1'
                            type='text'
                            value={text1} />
                    <input name='text2'
                            type='text'
                            value={text2} />
                </label>
            </form>
        </div>
    )
});
export default Schedules;