'use client'

import { Button } from '@/app/_components/ui/button'
import UpsertTransactionDialog from '@/app/_components/upsert-transaction-dialog'
import type { Transaction } from '@prisma/client'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

interface EditTransactionButtonProps {
  transaction: Transaction
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  )
}

export default EditTransactionButton
