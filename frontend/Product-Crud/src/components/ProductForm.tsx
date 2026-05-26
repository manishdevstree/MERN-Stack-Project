import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (data: {
    name: string;
    price: number;
    imageFile?: File | null;
    currentImage?: string;
  }) => void;
  initialData?: {
    name: string;
    price: number;
    image: string;
  };
  isEdit?: boolean;
  onCancel?: () => void;
}

export default function ProductForm({ onSubmit, initialData, isEdit, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price ?? 0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setName(initialData?.name || "");
    setPrice(initialData?.price ?? 0);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEdit && !imageFile) {
      alert("Please select an image");
      return;
    }

    onSubmit({
      name,
      price,
      imageFile,
      currentImage: initialData?.image,
    });

    if (!isEdit) {
      setName("");
      setPrice(0);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-[400px] rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-bold text-white">
          {isEdit ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isEdit && initialData?.image && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-400">Current Image</p>
              <img
                src={initialData.image}
                alt={initialData.name}
                className="h-32 w-full rounded-lg border border-zinc-700 object-cover"
              />
            </div>
          )}

          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-zinc-700 bg-zinc-950"
          />

          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border-zinc-700 bg-zinc-950"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1 text-sm text-zinc-100 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-800 file:px-3 file:py-1 file:text-zinc-100"
          />

          {isEdit && (
            <p className="text-xs text-zinc-400">Leave file empty to keep current image.</p>
          )}

          <div className={isEdit ? "grid grid-cols-2 gap-3" : "grid grid-cols-1"}>
            {isEdit && (
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full rounded-xl border-zinc-600 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}

            <Button type="submit" className="h-10 w-full rounded-xl bg-blue-600 hover:bg-blue-700">
              {isEdit ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
