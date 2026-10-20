import logo from './logo.svg';
import './App.css';
// import N from './navta'
// import H from './homet'
import Nav from "./navbar"
import FoodLoader from './FoodLoader';
// import   P from './prac'
import { Routes,Route } from 'react-router-dom';

import { lazy , Suspense, useState } from 'react';
const About=lazy(()=>import ('./abou'));
const Hom=lazy(()=>import ('./home'));
const Products=lazy(()=>import('./products'))
const Contact=lazy(()=>import('./contact'))

function App() {

  return (
    <div className="App">
{/* <Nav/>
<Home/>
<Routes>
<Route path='/p' element={<P/>}/>


</Routes> */}

<Nav />
<Suspense fallback={<FoodLoader />}>
<Routes>
  <Route path="/" element={<Hom />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products/>}/>
  <Route path="/contact" element={<Contact/>}/>
</Routes> 

</Suspense>

    </div>
  );
}

export default App;
