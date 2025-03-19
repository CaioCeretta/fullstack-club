import { deleteSale } from '@/_data/_actions/sale/delete-sale'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

interface DeleteSaleDialogContentProps {
  saleId: string
}

const DeleteSaleDialogContent = ({ saleId }: DeleteSaleDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success('Sale successfully deleted')
    },
    onError: () => {
      toast.error('An error occurred while deleting the sale')
    },
  })

  const handleContinueClick = () => executeDeleteSale({ id: saleId })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          product and remove its data from the server.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteSaleDialogContent
