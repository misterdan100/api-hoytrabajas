"use client";

import { getProducts } from '@/actions/getProducts';
import { ProductPreview } from '@/components/cart/ProductPreview';
import { BudgetSummary } from '@/components/presupuesto/BudgetSummary';
import { ProductList } from '@/components/products/ProductList';
import { TBudgetSummary, Product } from '@/types/types';
import { useEffect, useState } from "react";

/*
Ejercicio de Logica
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
  const [ budgetSummary, setBudgetSummary ] = useState<TBudgetSummary | undefined>(undefined)

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

    // todo: convert list in a map

    // 2. select range
    const rangedProducts = products.filter( product => product.price <= budget)
    console.log(rangedProducts)

    // 2.1 case: not products in the budge 
    if(rangedProducts.length === 0) {
      return []
    }

    // 2.2 case: only one product in the range
    if(rangedProducts.length === 1) {
      return [...rangedProducts]
    }

    // 3. product equalt to budge
    const equalt = rangedProducts.find( product => product.price === budget)

    if(equalt) {
      return [equalt]
    }

    // 1. order products
    const orderedProduts = rangedProducts.sort( (a, b) => b.price - a.price )
    console.log(orderedProduts)


    const mayorPriceProduct = orderedProduts[0]
    let remainingBudget = budget - mayorPriceProduct.price
    const productsInBudget = []
    
    // 4. tomar el primero y busca el restante exacto
    for(let i = 1; i < orderedProduts.length; i++) {
      if(orderedProduts[i].price === remainingBudget) {
        return [mayorPriceProduct, orderedProduts[i]]
      }
    }

    // 5. loop search
    productsInBudget.push(mayorPriceProduct)

    for( let i = 1; i < orderedProduts.length; i++) {
      if(orderedProduts[i].price <= remainingBudget) {
        remainingBudget -= orderedProduts[i].price
        productsInBudget.push(orderedProduts[i])

        if(remainingBudget === 0) {
          break
        }
      }
    }    
    return productsInBudget
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reset 
    setProducts(undefined)
    setBudgetSummary(undefined)

    // todo: create a error message
    if(budget <= 0) return

    // get products from api
    const data = await getProducts()

    // todo: create a error message
    if(!data) return
    const budgetList = findBestCombination(data, budget)
    setProducts(budgetList)
  }

  return (
    <div className="content-start gap-6 grid md:grid-cols-2 bg-gray-100 p-6 w-full h-full overflow-y-auto">

      {/* LEFT - Presupuesto, y resumen de presuesto generado */}
      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="gap-2 grid bg-white shadow p-4 rounded-2xl"
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

        {budgetSummary && <BudgetSummary budget={budgetSummary}/>}
      </div>

      {/* RIGHT - Resumen de productos */}
      {products && <ProductList products={products}/>}
    </div>
  );
}
