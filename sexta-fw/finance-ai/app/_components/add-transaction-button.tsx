'use client'

import { ArrowDownUp } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import UpsertTransactionDialog from './upsert-transaction-dialog'

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar transação
              <ArrowDownUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              'Você atingiu o limite de transações. Atualize o seu plano para criar transações ilimitadas'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default AddTransactionButton
