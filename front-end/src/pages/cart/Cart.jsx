import React, { useContext } from 'react'
import "./cart.css"
import{useNavigate} from 'react-router-dom'
import {StoreContext} from "../../Context/StoreContext"


const Cart = () => {

  const{cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          {!cartItems ?
          <>
           <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          </>
           : <h3 >Your Cart Is Empty...!</h3>}
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index)=>{
            if(cartItems[item._id] >0){
              return (
                <div>
                    <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
                </div>
                <hr />
                </div>
               
              )
            }
          })
        }
      </div>
     <div className="cart-bottom">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalCartAmount()=== 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>$ {getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cart-promo-code">
        <div>
          <p>If you have code, Enter it here </p>
          <div className="card-promo-code-input">
            <input type="text"  placeholder='Promo Code'/>
            <button type='submit'> Submit</button>
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Cart