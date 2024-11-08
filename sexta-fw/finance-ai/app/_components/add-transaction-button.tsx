'use client'

import { ArrowDownUp } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import UpsertTransactionDialog from './upsert-transaction-dialog'

const AddTransactionButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setIsOpen(true)}
      >
        Adicionar transação
        <ArrowDownUp />
      </Button>
      <UpsertTransactionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default AddTransactionButton
