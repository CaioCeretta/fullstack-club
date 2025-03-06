import { OrderStatus } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidCpf = (cpf: string): boolean => {
  // Remove the non numerical characters
  const cleanedCpf = cpf.replace(/\D/g, "");

  // Verify if it has 11 digits
  if (cleanedCpf.length !== 11) return false;

  // Verifies if all the digits are the same (ex: "111.111.111-11" is invalid)
  if (/^(\d)\1+$/.test(cleanedCpf)) return false;

  // Function to calculate the "dígitos verificadores"
  const calculateDigit = (baseCpf: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < baseCpf.length; i++) {
      total += parseInt(baseCpf[i]) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calculate the "digitos verificadores"
  const firstDigit = calculateDigit(cleanedCpf.slice(0, 9), 10);
  const secondDigit = calculateDigit(cleanedCpf.slice(0, 10), 11);

  // Verify if the calculated digits are the same as the CPF inserted
  return (
    firstDigit === parseInt(cleanedCpf[9]) &&
    secondDigit === parseInt(cleanedCpf[10])
  );
};

export const removeCpfPunctuation = (cpf: string) => {
  /* remove anything that is not a number*/
  return cpf.replace(/\D/g, "");
};

export const getStatusLabel = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case "FINISHED":
      return "Finished";
      break;
    case "PENDING":
      return "Pending";
      break;
    case "PREPARING":
      return "Preparing";
      break;
  }
};
