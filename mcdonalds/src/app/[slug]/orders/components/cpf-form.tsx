import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { isValidCpf } from "@/lib/utils";

export interface CpfFormProps {}

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

export const CpfForm = (props: CpfFormProps) => {
  const form = useForm<CpfSchemaType>({
    resolver: zodResolver(cpfSchema),
  });

  return <></>;
};

export default CpfForm;
