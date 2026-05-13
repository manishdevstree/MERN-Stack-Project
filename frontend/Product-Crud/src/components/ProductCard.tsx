
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface Props {
  product: Product;

  onDelete: (id: string) => void;

  onEdit: (product: Product) => void;
}

export default function ProductCard({
  product,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl">
      
      <img
        src={product?.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        
        <div>
          <h3 className="text-xl font-semibold text-white">
            {product.name}
          </h3>

          <p className="text-zinc-400">
            ₹{product.price}
          </p>
        </div>

        <div className="flex gap-3">
          
          <Button
            className="flex-1 rounded-xl border-blue-600 hover:bg-blue-700"
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>

          <Button
            variant="destructive"
            className="flex-1 rounded-xl border-red-600 hover:bg-red-700 text-white"
            onClick={() =>
              onDelete(product._id)
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}