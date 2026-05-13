import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (data: {
    name: string;
    price: number;
    image: string;
  }) => void;

  initialData?: {
    name: string;
    price: number;
    image: string;
  };

  isEdit?: boolean;
}

export default function ProductForm({
  onSubmit,
  initialData,
  isEdit,
}: Props) {
  const [name, setName] = useState(
    initialData?.name || ""
  );

  const [price, setPrice] = useState(
    initialData?.price || 0
  );

  const [image, setImage] = useState(
    initialData?.image || ""
  );

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onSubmit({
      name,
      price,
      image,
    });

    // Reset only for add mode
    if (!isEdit) {
      setName("");
      setPrice(0);
      setImage("");
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
        <div className="w-[400px] rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-xl">
      
      <h2 className="mb-6 text-2xl font-bold text-white">
        {isEdit
          ? "Update Product"
          : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border-zinc-700 bg-zinc-950"
        />

        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="border-zinc-700 bg-zinc-950"
        />

        <Input
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="border-zinc-700 bg-zinc-950"
        />

        <Button
          type="submit"
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          {isEdit
            ? "Update Product"
            : "Add Product"}
        </Button>
      </form>
    </div>
    </section>
  );
}
