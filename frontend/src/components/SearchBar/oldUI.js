import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar ({ shoes }) {
  const [query, setQuery] = useState('')
  const allShoesIds = Object.keys(shoes)
  const updateQuery = (e) => setQuery(e.target.value)

  const searchResult = allShoesIds.map((id) => {
    if (shoes[id].title.toLowerCase().includes(query.toLowerCase())) {
      return (
        <div hidden={!shoes} key={id}>
          <div className='search-grid'>
            <div className='search-col-one'>
              <a href={`/shoes/${id}`}>
                <img className='search-image' src={`${shoes[id].image}`} alt={shoes[id]} />
              </a>
            </div>

            <div className='search-col-two'>
              <a id='search-shoe' href={`/shoes/${id}`}>
                {shoes[id].title}
              </a>

            </div>

          </div>
        </div>
      )
    } else {
      return null
    }
  })

  if (query.length) {
    document.getElementsByClassName('results-list-container')
  }

  return (

    <div className='searchBar-placement'>

      <div className='search-bar-input-container' style={query.length ? { top: '150px', position: 'relative', left: '65px' } : {}}>
        <input
          className='searchBar-input'
          style={{ width: '500px' }}
          placeholder='Search for a shoe'
          type='text'
          value={query}
          onChange={updateQuery}
        />
      </div>
      <div className='results-list-container' hidden={!query.length}>
        {searchResult}
      </div>

    </div>

  )
}

export default SearchBar
