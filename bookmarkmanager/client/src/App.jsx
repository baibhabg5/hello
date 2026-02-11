import { useState, useEffect } from 'react'

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
const handleDelete = async (id) => {
  await fetch(`http://localhost:5000/api/bookmarks/${id}`, { method: 'DELETE' });
  fetchBookmarks(); // Refresh the list
};
  // Fetch bookmarks
  const fetchBookmarks = () => {
    fetch('http://localhost:5000/api/bookmarks')
      .then((res) => res.json())
      .then((data) => setBookmarks(data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Stop page refresh
    
    const response = await fetch('http://localhost:5000/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url })
    })

    if (response.ok) {
      setTitle('') // Clear input
      setUrl('')   // Clear input
      fetchBookmarks() // Refresh the list
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Bookmark Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <input 
          type="text" placeholder="Site Name (e.g. Google)" 
          value={title} onChange={(e) => setTitle(e.target.value)} 
          required style={{ padding: '8px' }}
        />
        <input 
          type="url" placeholder="URL (https://...)" 
          value={url} onChange={(e) => setUrl(e.target.value)} 
          required style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add Bookmark
        </button>
      </form>

      <div style={{ display: 'grid', gap: '10px' }}>
        {bookmarks.map((bm) => (
          <div key={bm._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#f9f9f9' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{bm.title}</h3>
            <a href={bm.url} target="_blank" rel="noreferrer" style={{ color: '#646cff' }}>{bm.url}</a>
            <button 
            onClick={() => handleDelete(bm._id)} 
            style={{ marginTop: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            [Delete]
          </button>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default App