import React from "react";
import './BodyTable.css';

function BodyTable({name, eMail, address, location}) {
    return (
        <tr className={'trStyle'}>
            <th> <p>{name}</p> </th>
            <th><a href={eMail}>{eMail}</a></th>
            <th><a href={address}>{address}</a></th>
            <th><p>{location}</p></th>
        </tr>
    );
}

export default BodyTable;
