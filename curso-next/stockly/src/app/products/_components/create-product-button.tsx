'use client'

import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import UpsertProductDialogContent from './upsert-dialog-content'

const AddProductButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  function onDialogClose() {
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          New Product
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent onDialogClose={onDialogClose} />
      {/*  Another option would be onDialogClose={() => setIsDialogOpen(false)} */}
    </Dialog>
  )
}

export default AddProductButton
