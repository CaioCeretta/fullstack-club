"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf, removeCpfPunctuation } from "@/lib/utils";

const cpfSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "cpf is required",
    })
    .refine((value) => isValidCpf(value), {
      message: "invalid cpf",
    }),
});

type CpfSchemaType = z.infer<typeof cpfSchema>;

export const CpfForm = () => {
  const router = useRouter();

  const pathname = usePathname();

  const form = useForm<CpfSchemaType>({
    resolver: zodResolver(cpfSchema),
  });

  const onSubmit = (data: CpfSchemaType) => {
    router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  return (
    <Drawer open>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>View Orders</DrawerTitle>
          <DrawerTitle>Insert your CPF below to check your orders</DrawerTitle>
        </DrawerHeader>
        <div className="">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="px-4">
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
                  className="w-full"
                  variant={"destructive"}
                >
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </FormProvider>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
