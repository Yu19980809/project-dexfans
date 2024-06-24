import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import Actions from '@/components/layout/actions'
import Sidebar from '@/components/layout/sidebar'

type Props = {
  children: React.ReactNode
}

const RootLayout = async ({ children }: Props) => {
  const session = await auth()
  if (!session || !session.user) redirect('/login')

  return (
    <div className="h-screen">
      {/* <div className="container max-w-6xl h-full mx-auto xl:px-30">
        <div className="grid grid-cols-4 h-full">
          <Sidebar userId={session?.user?.id!} />

          <div className="col-span-3 lg:col-span-2 border-x">
            {children}
          </div>

          <Actions />
        </div>
      </div> */}

      <div className="flex justify-center items-center h-full mx-auto">
        <header className="fixed top-0 left-0 bottom-0 flex-1 flex justify-end w-1/4 lg:w-1/3 h-full pr-4">
          <Sidebar userId={session?.user?.id!} />
        </header>

        <main className="min-w-[300px] w-2/3 lg:w-1/3 h-full">
          {children}
        </main>

        <section className="fixed top-0 right-0 bottom-0 hidden lg:block flex-1 w-1/3 h-full pl-4">
          <Actions />
        </section>
      </div>

      {/* <div className="hidden lg:flex justify-center items-center h-full mx-auto">
        <header className="fixed top-0 left-0 bottom-0 flex-1 flex justify-end w-1/3 h-full pr-4">
          <Sidebar userId={session?.user?.id!} />
        </header>

        <main className="min-w-[300px] w-1/3 h-full border-x">
          {children}
        </main>

        <section className="fixed top-0 right-0 bottom-0 flex-1 w-1/3 h-full pl-4">
          <Actions />
        </section>
      </div>

      <div className="flex lg:hidden justify-center h-full mx-auto">
        <header className="fixed top-0 left-0 bottom-0 flex-1 flex justify-end w-1/4 h-full pr-4">
          <Sidebar userId={session?.user?.id!} />
        </header>

        <main className="min-w-[300px] w-1/2 h-full border-x">
          {children}
        </main>
      </div> */}
    </div>
  )
}

export default RootLayout
