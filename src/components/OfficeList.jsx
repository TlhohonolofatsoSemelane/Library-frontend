import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:8081/api/offices'

function OfficeList() {
    const [offices, setOffices] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function loadOffices() {
        try {
            setError('')
            const response = await axios.get(`${API}/all`)
            setOffices(response.data)
        } catch (e) {
            setError('Could not load offices. Is the backend running on port 8081?')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOffices()
    }, [])

    async function deleteOffice(office) {
        if (!window.confirm(`Delete office ${office.roomNumber}${office.name ? ' (' + office.name + ')' : ''}?`)) {
            return
        }
        try {
            await axios.delete(`${API}/delete/${office.id}`)
            // remove from the table without reloading
            setOffices(offices.filter(o => o.id !== office.id))
        } catch (e) {
            const msg = typeof e.response?.data === 'string'
                ? e.response.data
                : 'The office is not deleted. It may be assigned to a doctor.'
            alert(msg)
        }
    }

    function updateOffice(office) {
        // Update will be implemented in the next class
        alert('Update will be implemented in the next class.')
    }

    const keyword = search.trim().toLowerCase()
    const filtered = offices.filter(o =>
        (o.name || '').toLowerCase().includes(keyword) ||
        (o.roomNumber || '').toLowerCase().includes(keyword)
    )

    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
            <h1>Available Offices</h1>

            <input
                type="text"
                placeholder="Search by office name or number..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: 8, marginBottom: 16, boxSizing: 'border-box' }}
            />

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'crimson' }}>{error}</p>}

            {!loading && !error && (
                <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Office Name</th>
                            <th>Office Number</th>
                            <th>Floor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No offices found</td>
                            </tr>
                        ) : (
                            filtered.map((office, index) => (
                                <tr key={office.id}>
                                    <td>{index + 1}</td>
                                    <td>{office.name}</td>
                                    <td>{office.roomNumber}</td>
                                    <td>{office.floor}</td>
                                    <td>
                                        <button onClick={() => updateOffice(office)}>Update</button>{' '}
                                        <button onClick={() => deleteOffice(office)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OfficeList
