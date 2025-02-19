// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'

// import { NumericFormat } from 'react-number-format'
// import { Button } from '@/app/_components/ui/button'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/app/_components/ui/dialog'
// import { Loader2Icon, PlusIcon } from 'lucide-react'
// import { useForm } from 'react-hook-form'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/app/_components/ui/form'
// import { Input } from '@/app/_components/ui/input'

// import { useState } from 'react'
// import {
//   createProductSchema,
//   type CreateProductType,
// } from '@/app/_actions/product/upsert-product/schema'
// import { createProduct } from '@/app/_actions/product/upsert-product'

// const CreateProductButton = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

//   const form = useForm<CreateProductType>({
//     shouldUnregister: true,
//     resolver: zodResolver(createProductSchema),
//     defaultValues: {
//       name: '',
//       price: 1,
//       stock: 0,
//     },
//   })

//   async function onSubmit(data: CreateProductType) {
//     try {
//       /*await createProduct({
//         name: data.name,
//         price: data.price,
//         stock: data.stock,
//       }) OR simply
//       */
//       console.log(isDialogOpen)
//       await createProduct(data)
//       /*
//       The reason why the second approach work, where we don't need to specify the object keys, is because of the implicit
//       destructuring, because object data already has the necessary structure for the createProduct function, because when
//       we pass data directly

//       await createProduct(data), if the function createProduct, expects an object with the same structure of data, (that is
//       name, price and stock) as properties of the object, we can simply pass the whole object

//       on the first example, where we use destructuring on it, we are basically creatubg a new object and extracing the
//       priperties from data to it. This is useful if we want to ensure that only some of the properties of the original
//       object are being passed to the function or we want to make a transformation on it

//       But both approaches we are passing an object with the needed properties, when we pass data directly, we are passing
//       the whole object, which is enough for the function.

//       */
//       setIsDialogOpen(false)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button className="gap-2">
//           <PlusIcon size={20} />
//           New Product
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create Product</DialogTitle>
//           <DialogDescription>
//             Please enter the information below
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter product name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <NumericFormat
//                     thousandSeparator=","
//                     decimalSeparator="."
//                     fixedDecimalScale
//                     decimalScale={2}
//                     prefix="$ "
//                     allowNegative={false}
//                     customInput={Input}
//                     onValueChange={(value) => field.onChange(value.floatValue)}
//                     {...field}
//                     onChange={() => {}}
//                   />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="stock"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Available Stock</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter product stock"
//                       type="number"
//                       {...field}
//                       onChange={(event) => {
//                         const value = event.target.value
//                         const parsedValue = value ? Number(value) : 0

//                         field.onChange(parsedValue)
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <DialogFooter>
//               <Button disabled={form.formState.isSubmitting} type="submit">
//                 {form.formState.isSubmitting && (
//                   <Loader2Icon size={16} className="animate-spin" />
//                 )}
//                 Save
//               </Button>
//               <DialogClose asChild>
//                 <Button variant="secondary" type="reset">
//                   Cancel
//                 </Button>
//               </DialogClose>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CreateProductButton
