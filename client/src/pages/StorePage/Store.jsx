import React, { useState } from 'react';
import styles from './Store.module.css';
import { Coins } from 'lucide-react';

const INITIAL_COINS = 1000;

const products = [
  {
    id: 1,
    name: 'LeetCode T-Shirt',
    description: 'Premium cotton t-shirt with LeetCode logo',
    price: 300,
    image: 'https://placehold.co/400x300/2d2d2d/white?text=LeetCode+T-Shirt',
    stock: 50
  },
  {
    id: 2,
    name: 'Code Ninja Hoodie',
    description: 'Comfortable hoodie perfect for coding sessions',
    price: 500,
    image: 'https://placehold.co/400x300/2d2d2d/white?text=Code+Ninja+Hoodie',
    stock: 30
  },
  {
    id: 3,
    name: 'Developer Mug',
    description: 'Ceramic mug with funny coding quotes',
    price: 150,
    image: 'https://placehold.co/400x300/2d2d2d/white?text=Developer+Mug',
    stock: 100
  },
  {
    id: 4,
    name: 'Algorithm Stickers Pack',
    description: 'Set of 10 high-quality vinyl stickers',
    price: 100,
    image: 'https://placehold.co/400x300/2d2d2d/white?text=Algorithm+Stickers',
    stock: 200
  },
  {
    id: 5,
    name: 'Premium Backpack',
    description: 'Spacious backpack with laptop compartment',
    price: 800,
    image: 'https://placehold.co/400x300/2d2d2d/white?text=Premium+Backpack',
    stock: 20
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with custom keycaps',
    price: 1000,
    image: 'https://placehold.co/400x300/2d2d2d/white?text=Mechanical+Keyboard',
    stock: 15
  }
];

const Store = () => {
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [inventory, setInventory] = useState(products);

  const handlePurchase = (productId) => {
    const product = inventory.find(p => p.id === productId);
    
    if (product && product.stock > 0 && coins >= product.price) {
      setCoins(prevCoins => prevCoins - product.price);
      setInventory(prevInventory =>
        prevInventory.map(item =>
          item.id === productId
            ? { ...item, stock: item.stock - 1 }
            : item
        )
      );
      alert(`Successfully purchased ${product.name}!`);
    } else if (coins < product.price) {
      alert('Not enough coins!');
    }
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.header}>
        <h1>LeetCode Store</h1>
        <div className={styles.coinsBalance}>
          <Coins className={styles.coinIcon} size={20} />
          <span className={styles.coinAmount}>{coins}</span>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {inventory.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productFooter}>
                <div className={styles.price}>
                  <Coins size={16} /> {product.price}
                </div>
                {product.stock > 0 ? (
                  <button
                    className={styles.buyButton}
                    onClick={() => handlePurchase(product.id)}
                    disabled={coins < product.price}
                  >
                    Buy Now
                  </button>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;