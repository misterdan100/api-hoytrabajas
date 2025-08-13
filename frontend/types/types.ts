export type Product = {
  id: number
  name: string
  price: number
}

export type Cart = {
  id: number
  products: Product[]
}

export type BudgetSummary = {
  quantity: number
  totalValue: number
  remainingValue: number
}