'use client'

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/*
   
  The problem we may face with dynamic forms, usually lies on the need to manage an array of fields using useState, or
  create a function to add/remove items, or ensuring each field will have a unique identifier, and others. But with
  useFieldArray from rhf, we are able to do this with validations and lots of re-renders

  1. How does `useFieldArray` solves this?

  `useFieldArray` allow us to manipulate field arrays inside forms in a very efficient way, without the need to manually
  create a useState, so this is how it works.

  Example: Form where the user can add and remove products

    import { useFormn, useFieldArray } from 'react-hook-form'

    export default function myForm() {
      const { register, control, handleSubmit } = useForm({
        defaultValues: { products: [{name: "", price: ""}] }
      })

      const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
      })

      const onSubmit = (data) => console.log(data);

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                {...register(`products.${index}.name`)}
                placeholder="Nome do produto"
              />
              <input
                {...register(`products.${index}.price`)}
                placeholder="Preço"
                type="number"
              />
              <button type="button" onClick={() => remove(index)}>Remover</button>
            </div>
          ))}

          <button type="button" onClick={() => append({ name: "", price: "" })}>
            Adicionar Produto
          </button>
          <button type="submit">Enviar</button>
        </form>
      );
    }
  }

  3. What's happening here?

  . Fields

  - Array containing all the itens inside the products field. Each item automatically receives a field.id, ensuring that
  the reactivity will work well

  . append({name: "", price: ""})

  - This function adds a new field to the array, when the user adds a product, a new set of inputs will show

  . remove(index)

  - Removes a specific field of the array

  . control

  - control is necessary so that rhf can correctly manage the dynamic list, it's an object

    

  

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
