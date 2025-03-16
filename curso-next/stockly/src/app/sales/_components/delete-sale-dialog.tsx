import { deleteProduct } from '@/app/_actions/product/delete-product'
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

const deleteSaleDialogContent = ({ saleId }: DeleteSaleDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success('Product successfully deleted')
    },
    onError: () => {
      toast.error('An error occurred while deleting the product')
    },
  })

  const handleContinueClick = () => executeDeleteSale({ id: saleId })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permantenenly delete this
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

export default DeleteProductDialogContent
