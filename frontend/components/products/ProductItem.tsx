import { Product } from '@/types/types';
import Image from "next/image";
import Link from "next/link";

export const ProductItem = ({product}: {product: Product}) => {
  const {id, name, price} = product
  return (
    <div className="bg-white p-2 rounded-xl">
      <Link href={"/"} className="flex flex-col gap-4">
        <div className="overflow-hidden">
          <Image
            src="/not-found.png"
            width={200}
            height={200}
            alt="product-1"
            className="hover:rotate-3 hover:scale-105 transition-all"
          />
        </div>

        <h3 className="font-bold">{name}</h3>
      </Link>

      <p>$ {price}</p>

      <button className="bg-gray-100 hover:bg-yellow-300 mt-2 py-1 border border-gray-300 hover:border-yellow-500 rounded-lg w-full text-center transition-colors">
        Agregar al carrito
      </button>
    </div>
  );
};
