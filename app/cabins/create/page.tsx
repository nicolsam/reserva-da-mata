'use client';

import { useForm } from 'react-hook-form';
import { createCabinAction } from "@/src/actions/cabinActions";
import { cabinSchema } from "@/src/lib/cabinSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { toast } from 'sonner';

type CabinFormData = {
    name: string;
    description?: string;
    imageUrl?: string;
    max_capacity: number;
    regular_price: number;
    discount?: number;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating..." : "Create Cabin"}
    </Button>
  );
}

export default function CreateCabinPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CabinFormData>();

  async function onSubmit(data: CabinFormData) {
    const result = await createCabinAction(data as any);
    if (result.success) {
      toast.success("Cabin created successfully!");
    } else {
      toast.error(result.error || "Failed to create cabin");
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Cabin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input 
                id="name" 
                {...register('name', { required: "Name is required" })} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <input 
                id="description" 
                {...register('description')} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">Image URL</label>
              <input 
                id="imageUrl" 
                type="url"
                {...register('imageUrl')} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="max_capacity" className="text-sm font-medium">Max Capacity</label>
                <input 
                  id="max_capacity" 
                  type="number"
                  {...register('max_capacity', { 
                    required: "Capacity is required",
                    min: { value: 1, message: "Capacity must be at least 1" },
                    setValueAs: (value) => value === '' ? NaN : Number(value)
                  })} 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
                {errors.max_capacity && <p className="text-sm text-red-500">{errors.max_capacity.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="regular_price" className="text-sm font-medium">Regular Price</label>
                <input 
                  id="regular_price" 
                  type="number"
                  step="0.01"
                  {...register('regular_price', { 
                    required: "Price is required",
                    min: { value: 0.01, message: "Price must be greater than 0" },
                    setValueAs: (value) => value === '' ? NaN : Number(value)
                  })} 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
                {errors.regular_price && <p className="text-sm text-red-500">{errors.regular_price.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="discount" className="text-sm font-medium">Discount</label>
              <input 
                id="discount" 
                type="number"
                step="0.01"
                defaultValue={0}
                {...register('discount', { valueAsNumber: true })} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
