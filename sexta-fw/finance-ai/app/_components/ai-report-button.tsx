import { BotIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

const AiReportButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="font-bold">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use a inteligência artifial para gerar um relatório com insights
            sobre suas finanças
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'}>Cancelar</Button>
          </DialogClose>
          <Button>Gerar relatório</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
