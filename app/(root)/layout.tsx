import Actions from '@/components/layout/actions'
import Sidebar from '@/components/layout/sidebar'

type Props = {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <div className="container max-w-6xl h-full mx-auto xl:px-30">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />

          <div className="col-span-3 lg:col-span-2 border-x">
            {children}
          </div>

          <Actions />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
