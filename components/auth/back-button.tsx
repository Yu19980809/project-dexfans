import Link from 'next/link'

import { Button } from '@/components/ui/button'

type Props = {
  label: string
  href: string
}

const BackButton = ({ label, href }: Props) => {
  return (
    <Button
      asChild
      variant="link"
      size="sm"
      className="w-full font-normal text-muted-foreground"
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton