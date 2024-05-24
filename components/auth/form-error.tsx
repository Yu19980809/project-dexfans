import { AlertTriangle } from 'lucide-react'

const FormError = ({
  message
}: {
  message?: string
}) => {
  if (!message) return null

  return (
    <div className="flex items-center gap-x-2 p-3 rounded-md bg-destructive/15 text-sm text-destructive">
      <AlertTriangle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  )
}

export default FormError