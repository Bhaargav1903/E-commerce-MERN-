
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct.js';
import ProductsList from './components/ProductsList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Nav/>
      <Routes>
        {/* Here in the path we have to give the same /address it,s not case sensitive , 
        but its recommended to give the same address in Nav Component */}
        {/* These routes show us the content after we click a particular link */}
        {/* Link is the particular URL and Route is the content we want to see when we go to the Links */}
        {/* Content to Be Displayed */}
        <Route element={<PrivateRoute/>}>
        <Route path='/' element={<ProductsList/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<h1>Logout Component</h1>}/>
        <Route path='/profile' element={<h1>Profile Component</h1>}/>
        </Route>
        
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      {/* If we have routing in Footer wrap it in the BrowserRouter , otherwise we can use it normally */}
      <Footer/>
      </div>
  );  
}

export default App;
