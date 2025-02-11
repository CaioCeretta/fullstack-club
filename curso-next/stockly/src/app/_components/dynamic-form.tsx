'use client'

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/*
   Full Explanation of the Code:

   Here we created a dynamic form using rhf to manipulate an array of products. Users can add and remove products dynami
   cally, and the values are validated using Zod

   Main Structure

   1. Form configuration with RHF
   2. Fields manipulation with useFieldArray
   3. Styling with tailwind for a more pleasant layout

   Step 1: Form Configuration

   . useForm: Manages the values of the form and validation
   . useFieldArray: Allow us to manipulate input fields in an optimized manner
   . zod: defines the rules of validation
   . zodResolver: Integrates zod to rhf to validate the data automatically

   Step 2: Creating Zod Validation

   We'll use zod to ensure the user will fill the fiels correctly
   so here name needs at least 2 characters and price must be a number

   Step 3: Initializing the Form

   const { register, control, handlSubmit, formState: { errors } } = useForm({
   resolver: zodResolver(schema),
   defaultValues: { products: [{name: "", price: ""}]}
   })

   register - register the fields in the form
   control - required for the useFieldArray
   handleSubmit: deals with the form submitting
   errors: validation errors
   defaultValues: initial values (empty product)

   Step 4: Handling of the Field Array

   const { fields, append, remove } = useFieldArray({
      control,
      name: "products"
   })

   fields: Array with the registered fields
   append({name: "", price: ""}): Adding a new product to the list
   remove(index): Removes a product based on the index

   Step 5: Form Rendering

      <form
         onSubmit={handleSubmit(console.log)}
         className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4"
      > 

   * CRITICAL PART *

   We iterate over the fields array to show the products dynamically

   {fields.map((field, index) => (
         div key={field.id} className="flex gap-4 items-center border-b pb-4">
   ))}

   each field has a unique id key to avoid any problem

   inside the loop we will have the inputs with name and price

   <input {...register(`product.${index}.name)}
      placeholder="Nome do produto"
      className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
   />

   if there is an error we show the message

   {errors.products?.[index]?.name && (
      <p className="text-red-500 text-sm">
         {errors.products[index].name.message}
      </p>
   )}

   the remove, removes the index.

   Step 6: Action buttons

      1. button add

      onClick will simply append a new empty product onClick

      2. form send
         simply send

   
   In summary the main benefits of this approach is that it has optimized performance, less manual code, and robust validation


*/


const schema = z.object({
  products: z.array(
    z.object({
      name: z.string().min(2, "Nome muito curto"),
      price: z.string().regex(/^\d+$/, "Preço deve ser um número"),
    })
  ),
});

export default function MyForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { products: [{ name: "", price: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(console.log)}
        className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Lista de Produtos
        </h2>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center border-b pb-4">
            <div className="flex-1">
              <input
                {...register(`products.${index}.name`)}
                placeholder="Nome do produto"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.products?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {errors.products[index].name.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <input
                {...register(`products.${index}.price`)}
                placeholder="Preço"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.products?.[index]?.price && (
                <p className="text-red-500 text-sm">
                  {errors.products[index].price.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => append({ name: "", price: "" })}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Adicionar Produto
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
