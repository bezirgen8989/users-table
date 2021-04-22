import React from 'react';
import './SearchBlock.css'

const SearchBlock = ({inputData, onChangeFoo, selectFoo}) => {
    return (
        <div className={'SearchBlock'}>
            <span>Фильтрация по
                <select onChange={selectFoo}>
                    <option value='name'>имени</option>
                    <option value='eMail'>eMail</option>
                    <option value='webAddress'>адрессу</option>
                </select>
            </span>
            <input
                type="text"
                placeholder={'Enter your search data'}
                value={inputData}
                onChange={onChangeFoo}
            />
        </div>
    )
}
export default SearchBlock;