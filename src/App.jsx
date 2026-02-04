import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialData = [
    { id: 1, name: 'Phone', price: 500, liked: false },
    { id: 2, name: 'Laptop', price: 1200, liked: true },
    { id: 3, name: 'Iphone', price: 2000, liked: false },
    { id: 4, name: 'Watch', price: 250, liked: false },
    { id: 5, name: 'Airpods', price: 150, liked: false },
    { id: 6, name: 'Headphones', price: 100, liked: false },
    { id: 7, name: 'Keyboard', price: 80, liked: false },
    { id: 8, name: 'Mouse', price: 40, liked: false },
    { id: 9, name: 'Monitor', price: 300, liked: false },
    { id: 10, name: 'Tablet', price: 400, liked: false }
  ];

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mini_shop_v6');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : initialData;
    }
    return initialData;
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('mini_shop_v6', JSON.stringify(products));
  }, [products]);

  const handleAdd = (e) => {
    e.preventDefault();

    // Narxni raqamga o'tkazamiz
    const numericPrice = Number(price);

    // Tekshirish: Agar narx 1 dan kichik bo'lsa (manfiy bo'lsa ham shu yerga kiradi)
    if (numericPrice < 1) {
      alert("Narx 1 dan yuqori son bo'lsin!"); // SIZ SO'RAGAN ALERT
      setPrice(''); // Inputni tozalash
      return; // Funksiyani to'xtatish (mahsulot qo'shilmaydi)
    }

    // Nomi bo'sh bo'lsa ham qo'shmaslik
    if (!name.trim()) {
      alert("Mahsulot nomini kiriting!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name,
      price: numericPrice,
      liked: false
    };

    setProducts([newProduct, ...products]);
    setName('');
    setPrice('');
  };

  const toggleLike = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, liked: !p.liked } : p
    ));
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="container">
      <div className="card">
        <h1>🛒 Mini Shop</h1>
        <p className="stats">Total products: {products.length}</p>

        <form className="input-group" onSubmit={handleAdd}>
          <input 
            className="input-field"
            placeholder="Product name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            className="input-field"
            type="number"
            placeholder="Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
          <button type="submit" className="add-btn">Add Product</button>
        </form>

        <div className="product-list">
          {products.map(product => (
            <div 
              key={product.id} 
              className={`product-item ${product.liked ? 'liked' : ''}`}
            >
              <span className="p-name">{product.name}</span>
              <span className="p-price">${product.price}</span>
              
              <div className="actions">
                <button className="icon-btn" onClick={() => toggleLike(product.id)}>
                  {product.liked ? '❤️' : '🤍'}
                </button>
                <button className="icon-btn delete-btn" onClick={() => handleDelete(product.id)}>
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="total-footer">
          Total price: <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default App;