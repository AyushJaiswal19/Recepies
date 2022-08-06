import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';

function App() {
  const APP_ID = 'fee8b712'
  const APP_KEY = '253ea1a7ce01212c1cf5546fb3e0b142'

  const [recipe, setRecipe] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  useEffect(() => {
    function getRecipe() {
      fetch('https://api.edamam.com/search?q=' + query + "&app_id=" + APP_ID + "&app_key=" + APP_KEY)
        .then(res => res.json())
        .then(data => setRecipe(data.hits))
    }
    getRecipe()
  }, [query])

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className='recipe'>
        {recipe.map((recipe, idx) =>
          <Recipe
            key={idx}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />)}
      </div>

    </div>
  )
}

export default App;
