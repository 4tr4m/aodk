// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import TopNavBar from '../Headers/TopNavBar';
// import Header from '../Headers/Header';
// import PreFooter from '../Footer/PreFooter';
// import Footer from '../Footer/Footer';
// import ProductModal from './ProductModal';
// import { useCart } from '../../context/CartContext';
// import products from '../../Data/products-data';
// import categories from '../../Data/category-data'; 
// import './CategoryPage.css';
// import { FaCheckCircle } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const CategoryPage = () => {
//   const { categorySlug } = useParams();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { dispatch } = useCart(); 
//   const [showModal, setShowModal] = useState(false);
//   const [activeButton, setActiveButton] = useState(null);
  
//   const getMainCategory = (slug) => {
//     if (!slug) return null;
    
//     const mainCategory = categories.find(category => category.slug === slug);
//     if (mainCategory) return mainCategory;
    
//     return categories.find(category => 
//       category.items.some(item => item.slug === slug)
//     );
//   };

//   const categoryProducts = categorySlug 
//     ? products.filter(product => {
//         const mainCategory = getMainCategory(categorySlug);
//         if (!mainCategory) return false;

//         if (mainCategory.slug === categorySlug) {
//           return mainCategory.items.some(item => 
//             product.category === item.slug
//           );
//         }

//         return product.category === categorySlug;
//       })
//     : products;

//   const addToCart = (product) => {
//     const productToAdd = {
//       id: product.id,
//       name: product.name,
//       price: typeof product.price === 'string' 
//         ? parseFloat(product.price.replace(',', '.'))
//         : product.price,
//       image: product.image,
//       category: product.category,
//       quantity: 1
//     };
    
//     dispatch({ 
//       type: 'ADD_TO_CART', 
//       payload: productToAdd
//     });

//     setActiveButton(product.id);
//     setShowModal(true);

//     setTimeout(() => {
//       setShowModal(false);
//       setActiveButton(null);
//     }, 2000);
//   };

//   return (
//     <div>
//       <TopNavBar />
//       <Header />
      
//       <div className="category-page-container">
//         <aside className="category-sidebar">
//           {categories.map((category, index) => (
//             <div key={index} className="category-group">
//               <h3 className="category-group-title">
//                 <Link 
//                   to={`/category/${category.slug}`}
//                   className={categorySlug === category.slug ? 'active' : ''}
//                 >
//                   {category.title}
//                 </Link>
//               </h3>
//               <ul className="category-list">
//                 {category.items.map((item, itemIndex) => (
//                   <li key={itemIndex} className={categorySlug === item.slug ? 'active' : ''}>
//                     <Link to={`/category/${item.slug}`}>{item.name}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </aside>

//         <main className="category-main">
//           <div className="category-header">
//             <h1>{getCategoryTitle(categorySlug)}</h1>
//             <div className="breadcrumbs">
//               <Link to="/">Strona główna</Link> / <span>Suplementy diety</span> / <span>{getCategoryTitle(categorySlug)}</span>
//             </div>
//           </div>

//           <div className="products-grid">
//             {categoryProducts.map(product => (
//               <div key={product.id} className="product-card">
//                 <div className="product-image">
//                   <img src={product.image} alt={product.name} />
//                 </div>
//                 <h3 className="product-name">{product.name}</h3>
//                 <p className="product-price">{product.price} zł</p>
//                 <div className="product-actions">
//                   <button 
//                     className={`add-to-cart ${activeButton === product.id ? 'success' : ''}`}
//                     onClick={() => addToCart(product)}
//                     disabled={activeButton === product.id}
//                   >
//                     {activeButton === product.id ? (
//                       <span className="success-text">
//                         <FaCheckCircle /> Dodano do koszyka
//                       </span>
//                     ) : (
//                       'Dodaj do koszyka'
//                     )}
//                   </button>
//                   <button className="read-more" onClick={() => setSelectedProduct(product)}>
//                     Czytaj więcej
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {selectedProduct && (
//         <ProductModal 
//           product={selectedProduct} 
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}

//       <PreFooter />
//       <Footer />

//       <AnimatePresence>
//         {showModal && (
//           <motion.div 
//             className="success-modal"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//           >
//             <FaCheckCircle className="success-icon" />
//             <p>Produkt dodany do koszyka!</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const getCategoryTitle = (slug) => {
//   if (!slug) return 'Wszystkie produkty';

//   const mainCategory = categories.find(category => category.slug === slug);
//   if (mainCategory) return mainCategory.title;

//   const parentCategory = categories.find(category => 
//     category.items.some(item => item.slug === slug)
//   );

//   if (parentCategory) {
//     const subcategory = parentCategory.items.find(item => item.slug === slug);
//     if (subcategory) {
//       return subcategory.name;
//     }
//   }

//   return 'Kategoria nie znaleziona';
// };

// export default CategoryPage;
