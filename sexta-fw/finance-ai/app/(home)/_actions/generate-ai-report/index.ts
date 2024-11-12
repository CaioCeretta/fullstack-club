import { db } from '@/app/_lib/prisma'

export const generateAiReport = async (month: string) => {
  // pegar as transções do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31}`),
      },
    },
  })

  // mandar as transações para o ChatGPT e pedir para ele gerar um relatório com insights
  // pegar o relatório gerado pelo chatgpt e retornar para o usuário
}
