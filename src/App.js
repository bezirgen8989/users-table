import React, {useEffect, useState} from "react";
import './App.css';
import HeaderTable from "./components/HeaderTable/HeaderTable";
import BodyTable from "./components/BodyTable/BodyTable";
import * as axios from 'axios';
import SearchBlock from "./components/SearchBlock/SearchBlock";
import LoadingPage from "./components/Loading/Loading";

function App() {
    const [currentPage, setCurrentPage] = useState(1)
    const [tableArr, setTableArr] = useState([]);
    const [paginatorStyle, setPaginatorStyle] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectState, setSelectState] = useState('name');
    const [isFetching, setIsFetching] = useState(false);

    let pages = []
    for (let i = 1; i <= 10; i++) {
        pages.push(i)
    }

    useEffect(() => {
        //console.log(selectState)
    }, [selectState])

    useEffect(() => {
        if (paginatorStyle === false){
            setIsFetching(true)
            axios.get(`https://jsonplaceholder.typicode.com/users`, {
                method:"get",
                mode:"no-core",
            })
                .then(res => {
                    setIsFetching(false)
                    setTableArr(res.data)
                    res.config.transformResponse[0]("Access-Control-Allow-Origin", "http://localhost:3000/");
                    console.log(res)
                })
        }else if (paginatorStyle === true){
            setIsFetching(true)
            axios.get(`https://jsonplaceholder.typicode.com/users/${currentPage}`, {
                method:"get",
                mode:"no-core",
                headers: {

                }
            })
                .then(res => {
                    setIsFetching(false)
                    setTableArr([res.data])
                    res.config.transformResponse[0]("Access-Control-Allow-Origin: *");
                })
        }
    }, [currentPage, paginatorStyle]);

    const paginatorChangeStatus = () => {
        setPaginatorStyle(prevState => !prevState);
        console.log(paginatorStyle)
    }

    const inputState = (event) => {
        setInputText(event.target.value);
    }
    const filteredElements = tableArr.filter(item => {
        if (paginatorStyle === false) {
            if (selectState === 'eMail') {
                return item.email.toLowerCase().includes(inputText.toLowerCase())
            } else if (selectState === 'webAddress') {
                return item.website.toLowerCase().includes(inputText.toLowerCase())
            }
            return item.name.toLowerCase().includes(inputText.toLowerCase())
        } else {
            return item
        }

    })
    const selectChange = event => {
        setSelectState(event.target.value)
    }

    return (
        <>
            {isFetching
                ? <LoadingPage/>
                : <div className="App">
                    {!paginatorStyle
                        ? <button onClick={paginatorChangeStatus}>Постраничный показ</button>
                        : <button onClick={paginatorChangeStatus}>Показать всех пользователей</button>
                    }

                    <SearchBlock
                        inputData={inputText}
                        onChangeFoo={inputState}
                        selectFoo={selectChange}
                    />
                    <table className={'table'}>
                        <tbody>
                        <HeaderTable/>
                        {filteredElements.map((item, id) => (
                            <BodyTable
                                key={item.username}
                                name={item.name}
                                eMail={item.email}
                                location={`lat: ${item.address.geo.lat}, lng:${item.address.geo.lng}`}
                                address={item.website}
                            />
                        ))}
                        </tbody>
                    </table>
                    {paginatorStyle
                        ? pages.map(p => {
                            return (
                                <button
                                    key={p}
                                    className={currentPage === p ? 'selectedPage' : ''}
                                    onClick={() => {
                                        setCurrentPage(p)
                                    }}
                                >{p}</button>
                            )
                        })
                        :null
                    }
                </div>
            }
        </>
    );
}

export default App;
