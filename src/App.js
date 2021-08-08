import './App.css';
import ProductCard from './components/productCard';
import CheckOut from './components/checkout'
import LoginPage from './components/loginPage';
import { Router, Switch, Route } from "react-router-dom";
import {useEffect, useState} from 'react';
import history from '../src/history';

function App() {
  const [productsJson, setproductsJson] = useState([]); 
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [prices, setPrices] = useState([]);

  let subtitle;
  function openModal() {
    setIsOpen(true);
  }


  function getPrice(){
    return (Math.floor(Math.random() * 10) + 6)*100
  }

  function afterOpenModal() {
    
  }

  function closeModal(isOpen) {
    setIsOpen(false);
  }


  useEffect(() => {
    fetch('https://amazon-clone-v-1-0.herokuapp.com/getProducts').then(response=> response.json()).then(
      data=>{
      console.log(data)
      let arr = []
      console.log(data.length)
      for(let i=0;i<data.length; i++)
      {
        arr.push(getPrice())
      }
      console.log(arr)
      setPrices(arr)
      setproductsJson(data)
    }).catch(err => {
      console.log(err)
      alert('Login First')
      history.push('/')
    })
  }, [])

  function checkAuth(){
    if(localStorage.getItem('user') == null)
    {
      console.log(false)
      alert('Need to sign in first')
      history.push('/')
    }
    else{
      var token = localStorage.getItem('user').Token
      console.log(true)
      fetch('https://amazon-clone-v-1-0.herokuapp.com/checkToken', {
            method:'POST',
            mode:'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(token)    
        }).then(response => response.json()).then(data =>{
            console.log(data)
        })
    }
    
  }
 
  return (

    <Router history={history}>
      <div className="App">
        <Switch>

          <Route path='/products'>
          <h1>Products</h1>
          <h3>Hi, {currentUser.Email}</h3>
            <div className='homeRow'>
             
            {
  productsJson.map((product, index) => 
             <ProductCard
                id={product._id}
                title={product.Title}
                price={prices[index]}
                description={product.Description}
                image={product.Photo}
                openModal = {openModal}
                setCurrentProduct = {setCurrentProduct}
    
                >
                </ProductCard>)}

            </div>
          </Route>
          <Route path=''>
            <LoginPage setCurrentUser={setCurrentUser}></LoginPage>
          </Route>

        </Switch>
            <CheckOut 
              modalIsOpen = {modalIsOpen}
              closeModal = {closeModal}
              setIsOpen = {setIsOpen}
              currentProduct = {currentProduct}
              currentUser = {currentUser}
            ></CheckOut>
      </div>
    </Router>
  );
}

export default App;
