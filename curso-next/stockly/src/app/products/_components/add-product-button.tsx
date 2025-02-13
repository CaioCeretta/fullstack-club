"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { NumericFormat } from 'react-number-format'
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

const addProductFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "The name of product is required",
    })
    .trim(),
  price: z.coerce.number().min(0.01, {
    message: "Product price is required",
  }),
  stock: z.number().min(0, { message: "Stock is required" }),
});

type AddProductType = z.infer<typeof addProductFormSchema>;

const AddProductButton = () => {
  const form = useForm<AddProductType>({
    shouldUnregister: true,
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      price: 1,
      stock: 0,
    },
  });

  function onSubmit(data: AddProductType) {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          New Product
        </Button>
      </DialogTrigger>
      <DialogContent>
     
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Please enter the information below
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <NumericFormat
                    thousandSeparator=","
                    decimalSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(value) => field.onChange(value.floatValue)}
                    {...field}
                    onChange={() => {}}
                  />

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"  
              render={({field}) => (
                <FormItem>
                  <FormLabel>Available Stock</FormLabel>
                  <FormControl>
                  <Input
                    placeholder="Enter product stock"
                    type="number"
                    {...field}
                    onChange={(event) => {
                      const value = event.target.value;
                      const parsedValue = value ? Number(value).toString() : "";

                      field.onChange(parsedValue)
                    }}
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose asChild>
                <Button variant="secondary" type="reset">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
