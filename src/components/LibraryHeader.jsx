import React from 'react'

function LibraryHeader() {
    const libHeader = "Library Management System"
    return (
        <div>
            <header>
                <h1>{libraryHeader}</h1 *>
                <Link to="/books" style={{paddingRight: "10px"}}>Books</Link>
            </header>
        </div>
    )
}

export default LibraryHeader