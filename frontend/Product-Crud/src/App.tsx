import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import ProductForm from "./components/ProductForm";
import ProductCard from "./components/ProductCard";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./services/productApi";
import type { Product } from "./types/product";



function App() {
  const queryClient = useQueryClient();

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  // GET PRODUCTS
  const {
    data: products = [],
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } =
    useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    });

  // CREATE PRODUCT
  const createMutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  // DELETE PRODUCT
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  // UPDATE PRODUCT
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        price: number;
        image: string;
      };
    }) =>
      updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setEditingProduct(null);
    },
  });

  if (isPending && products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
        <button
          onClick={() => refetch()}
          className="rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] p-6 text-white">
      
      <div className="mx-auto max-w-7xl space-y-8">
        
        <h1 className="text-center text-5xl font-bold">
          Product CRUD
        </h1>
        {isFetching && (
          <p className="text-center text-sm text-zinc-400">Refreshing products...</p>
        )}

        <ProductForm
          key={editingProduct?._id ?? "create-product"}
          onSubmit={(data) => {
            if (editingProduct) {
              updateMutation.mutate({
                id: editingProduct._id,
                data,
              });
            } else {
              createMutation.mutate(data);
            }
          }}
          initialData={
            editingProduct || undefined
          }
          isEdit={!!editingProduct}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {products.map((product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={(id) =>
                deleteMutation.mutate(id)
              }
              onEdit={setEditingProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
