"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { PlusCircleIcon, X } from "lucide-react";

import {
  NewProduct,
  NewProductParams,
  insertProductParams,
  insertProductSchema,
} from "@/lib/db/schema/product";
import { StoreId } from "@/lib/db/schema/store";
import { insertImageParams } from "@/lib/db/schema/image";
import { NewCategory, insertCategoryParams } from "@/lib/db/schema/category";

const ProductForm = ({
  storeId,
  setIsOpen,
}: {
  storeId: StoreId;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { toast } = useToast();

  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertProductParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertProductParams),
    defaultValues: {
      name: "",
      description: "",
      status: "INACTIVE",
      storeId: storeId,
      shortDescription: "",
      price: 0,
      stock: 100,
      discount: 0,
      priority: 1,
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.stores.getStore.invalidate();
    // router.refresh();
    setIsOpen(false);
    toast({
      title: "Success 👏",
      description: `Store ${action}d!`,
      variant: "default",
    });
  };

  const onError = (msg: string) => {
    utils.stores.getStore.invalidate();
    // router.refresh();
    setIsOpen(true);
    toast({
      title: "Error",
      description: msg,
      variant: "destructive",
    });
  };

  const { mutate: createProduct, isLoading: isCreating } =
    trpc.products.createProduct.useMutation({
      onSuccess: () => onSuccess("create"),
      onError: (error) => onError(error.message),
    });

  const { mutate: updateProduct, isLoading: isUpdating } =
    trpc.products.updateProduct.useMutation({
      onSuccess: () => onSuccess("update"),
      onError: (error) => onError(error.message),
    });

  const handleSubmit = (product: NewProductParams) => {
    console.log(JSON.stringify(product, null, 4));
    console.log("here2");
    createProduct({ product: product });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        className="flex grow flex-col justify-start"
      >
        <div className="grow space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="e.g. My Shoe Store..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your customers will see this name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="e.g. desc"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Short description <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="short"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="123"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>discount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="123"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Stock <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="123"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="status"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="w-[300px]"
                    autoComplete="off"
                    placeholder="1-100"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-red-700">
            <p>* required fields</p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 border-t-2 border-dashed py-4 pr-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="space-x-1 pr-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4" />
            <span>Close</span>
          </Button>

          <Button
            type="submit"
            size="lg"
            variant="highlight"
            disabled={isCreating || isUpdating}
            className="space-x-1 pr-4"
          >
            <PlusCircleIcon className="h-4" />
            <span>Creat{isCreating ? "ing..." : "e"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
