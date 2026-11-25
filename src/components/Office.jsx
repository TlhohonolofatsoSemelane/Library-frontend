import React, { use, useState } from 'react'
import LibraryButton from './LibraryButton'
import axios from 'axios'

function Office() {

    const [officeName, setOfficeName] = useState("")
    const [officeNumber, setOfficeNumber] = useState("")

    const [offNumber, setOffNumber] = useState("")

    async function saveOffice() {
        const response = await axios.post("http://localhost:8080/api/offices/save", {
            name: officeName,
            officeNumber: officeNumber
        })
        if (response.status >= 200 && response.status <= 203) {
            alert("Office deleted successfully")
        }
        else {
            alert("The office is not saved.")
        }
    }
    async function deleteOffice(offNumber) {
        const response = await axios.delete(`http://localhost:8080/api/delete/${offNumber}`)
        if (response.status >= 200 && response.status <= 203) {
            alert("Office deleted successfully")
        }
        else {
            alert("The office is not deleted.")
        }
    }

    return (
        <div>
            <h1>SAVE OFFICE</h1>
            <label>Office Name: </label><input type='text' onChange={e => setOfficeName(e.target.value)} /><br />
            <br />
            <label>Office Number: </label><input type='text' onChange={e => setOfficeNumber(e.target.value)} /><br /><br />

            <LibraryButton buttonLabel="SAVE" onClickButton={saveOffice} /><br />

            <h1>DELETE OFFICE</h1>
            <input type='text' onChange={e => setOffNumber(e.target.value)} />
            <LibraryButton buttonLabel="DELETE" onClickButton={deleteOffice} /><br />
        </div>
    )
}

export default Office