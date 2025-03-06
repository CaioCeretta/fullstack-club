"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/data/actions/order";
import { isValidCpf } from "@/lib/utils";

import { CartContext } from "../contexts/cart";

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const orderSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "CPF is required",
    })
    .refine((value) => isValidCpf(value), {
      message: "Invalid CPF",
    }),
});

type OrderSchemaType = z.infer<typeof orderSchema>;

export const FinishOrderDialog = ({
  open,
  onOpenChange,
}: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();

  const { products } = useContext(CartContext);

  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get(
    "consumptionMethod",
  ) as ConsumptionMethod;

  const [isPending, startTransition] = useTransition();

  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: OrderSchemaType) => {
    try {
      startTransition(async () => {
        await createOrder({
          consumptionMethod: consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products,
          slug,
        });
        onOpenChange(false);
        toast.success("Order completed!");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>Finish order</DrawerTitle>
          <DrawerDescription>
            Insert your information below in order to finish the order.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Type in your CPF"
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant={"destructive"}
                  className="rounded-full"
                  disabled={isPending}
                >
                  {isPending ?? <Loader2Icon className="animate-spin" />}
                  Finish
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="rounded-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </FormProvider>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
