"use client";

import { getProducts } from '@/actions/getProducts';
import { ProductPreview } from '@/components/cart/ProductPreview';
import { BudgetSummary, Product } from '@/types/types';
import { useEffect, useState } from "react";

/*
[
  { "id": 3, "name": "Producto 3", "price": 130 },
  { "id": 3, "name": "Producto 3", "price": 120 },
  { "id": 3, "name": "Producto 3", "price": 110 },
	{ "id": 2, "name": "Producto 2", "price": 100 },
	{ "id": 4, "name": "Producto 4", "price": 90 },
	{ "id": 4, "name": "Producto 4", "price": 80 },
	{ "id": 4, "name": "Producto 4", "price": 70 },
	{ "id": 1, "name": "Producto 1", "price": 60 },
	{ "id": 4, "name": "Producto 4", "price": 50 },
]

1. ordenar de mayor a menor
2. seleccionar solo los que estan dentro del rango
   e.g. si el presupuesto es 150 pero hay productos de mas de 150 descartartlos
3. op 1. evaluar que haya algun producto igual al presupuesto, en dado caso, seleccionarlo
4. op 2. tomar el producto de mayor valor, restar el presupuesto y evaluar si hay algun producto igual al resulta
5. op 3. Si no hay un producto igual tomar el siguiente, evaluar restando del presupuesto cuanto sobra de los dos y buscar si hay un producto igual a ese precio
6. continuar tomando productos y comprobando sin pasarse del presupuesto

*/

export default function BudgetPage() {
  const [budget, setBudget] = useState<number>(0);
  const [ products, setProducts ] = useState<Product[] | undefined>(undefined)
  const [ budgetSummary, setBudgetSummary ] = useState<BudgetSummary | undefined>(undefined)

  useEffect(() => {
    if(products) {
      const quantity = products.length
      const totalValue = products.reduce( (total, prod) => total + prod.price, 0)
      const remainingValue = budget - totalValue

      setBudgetSummary({
        quantity,
        totalValue,
        remainingValue
      })
    } else {
      setBudgetSummary(undefined)
    }
  }, [products])

  const findBestCombination = (products: Product[], budget: number) => {

    // convert list in a map

    // 2. select range
    const rangedProducts = products.filter( product => product.price <= budget)
    console.log(rangedProducts)

    // 2.1 case: not products in the budge 
    if(rangedProducts.length === 0) {
      return
    }

    // 2.2 case: only one product in the range
    if(rangedProducts.length === 1) {
      setProducts([...rangedProducts])
      return
    }

    // 3. product equalt to budge
    const equalt = rangedProducts.find( product => product.price === budget)

    if(equalt) {
      setProducts([equalt])
      return
    }

    // 1. order products
    const orderedProduts = rangedProducts.sort( (a, b) => b.price - a.price )
    console.log(orderedProduts)


    const mayorPriceProduct = orderedProduts[0]
    let remainingBudget = budget - mayorPriceProduct.price
    const productsInBudget = []
    
    // 4. tomar el primero y busca el restante exacto
    for(let i = 1; i < rangedProducts.length; i++) {
      if(rangedProducts[i].price === remainingBudget) {
        setProducts([mayorPriceProduct, rangedProducts[i]])
        return
      }
    }

    // 5. loop search
    productsInBudget.push(mayorPriceProduct)

    for( let i = 1; i < rangedProducts.length; i++) {
      if(rangedProducts[i].price <= remainingBudget) {
        remainingBudget -= rangedProducts[i].price
        productsInBudget.push(rangedProducts[i])

        if(remainingBudget === 0 || rangedProducts[i+1]?.price > remainingBudget) {
          setProducts(productsInBudget)
        }
      }
    }

    // 5.1 case: for two products in the range
    setProducts(productsInBudget)


    
    

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reset 
    setProducts(undefined)
    setBudgetSummary(undefined)

    // todo: create a error message
    if(budget <= 0) return

    // get products
    const data = await getProducts()

    // todo: create a error message
    if(!data) return
    findBestCombination(data, budget)
  }

  return (
    <div className="justify-center gap-6 grid grid-cols-2 bg-gray-100 p-6 w-full h-full overflow-y-auto">
      {/* LEFT - Presupuesto, y resumen de presuesto generado */}
      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="gap-2 grid bg-white p-4 rounded-2xl"
        >
          <label htmlFor="" className='font-bold'>Presupuesto:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className='bg-gray-100 px-4 py-2 rounded-xl font-bold'
          />
          <button type="submit"
          className="bg-yellow-300 hover:bg-gray-200 mt-2 py-1 border border-yellow-400 hover:border-gray-300 rounded-lg w-full text-center uppercase transition-colors"
          >Seleccionar Productos</button>
        </form>

        <div className="gap-4 grid bg-white p-4 rounded-2xl">
          <p className='font-bold'>Resumen de Presupuesto:</p>
          {budgetSummary && (
            <div className='gap-4 grid'>
              <div>
                <p className='text-gray-600'>Cantidad de productos:</p>
                <p className='font-bold'>{ budgetSummary.quantity } Productos</p>
              </div>

              <div>
                <p className='text-gray-600'>Valor total:</p>
                <p className='font-bold'>$ { budgetSummary.totalValue }</p>
              </div>

              <div>
                <p className='text-gray-600'>Sobrante:</p>
                <p className='font-bold'>$ { budgetSummary.remainingValue }</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - Resumen de productos */}
      <div className="bg-white p-4 rounded-2xl">
        <p className='font-bold'>Lista de Productos: {products?.length}</p>
        { products && products.map( product => (
          <ProductPreview 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
