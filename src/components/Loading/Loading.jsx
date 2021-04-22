import React from 'react';
import './Loading.css'

const LoadingPage = ()=>{
    return (
        <div className={'loadingStyle'}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingPage;