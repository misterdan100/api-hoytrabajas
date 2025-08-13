import { TBudgetSummary } from "@/types/types"

export const BudgetSummary = ({ budget }: { budget: TBudgetSummary }) => {
  const { quantity, remainingValue, totalValue } = budget
  return (
    <div className="gap-4 grid bg-white shadow p-4 rounded-2xl">
      <p className="font-bold">Resumen de Presupuesto:</p>
      {budget && (
        <div className="gap-4 grid">
          <div>
            <p className="text-gray-600">Cantidad de productos:</p>
            <p className="font-bold">{quantity} {quantity === 1 ? 'producto' : 'productos'}</p>
          </div>

          <div>
            <p className="text-gray-600">Valor total:</p>
            <p className="font-bold">$ {totalValue}</p>
          </div>

          <div>
            <p className="text-gray-600">Sobrante:</p>
            <p className="font-bold">$ {remainingValue}</p>
          </div>
        </div>
      )}
    </div>
  )
};
