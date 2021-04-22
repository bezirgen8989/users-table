import React from "react";
import './HeaderTable.css';

function HeaderTable() {
    return (
        <tr className={'tableHeader'}>
            <th>Имя</th>
            <th>Електронная почта</th>
            <th>Адресс</th>
            <th>Локация</th>
        </tr>
    );
}

export default HeaderTable;
