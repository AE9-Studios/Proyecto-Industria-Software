import React from 'react'

const ProductCardSimple = ({title, img, url}) => {
  return (
    <a href={`/products/${url}`} className="container-cardProductsCategories  shadow overflow-hidden bg-white text-decoration-none container-cardProduct mb-3 w-50 rounded-4  text-black" style={{ minWidth: '100px' }}>
    <img className="w-100" src={img} alt="lentes" />
    <h3 className=' fs-6 p-2 text-center'>{title}</h3>
  </a>
  )
}

export default ProductCardSimple