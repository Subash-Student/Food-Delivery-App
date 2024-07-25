import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Your Favourite Food Here</h2>
            <p>
                Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. our aim is to satisfy your carving and elevate your dining experience, one delicious meal at a time.
            </p> 
          <a href='#explore-menu'>
          <button >View Menu</button>
            </a> 
        </div>
    </div>
  )
}

export default Header