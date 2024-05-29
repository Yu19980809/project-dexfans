import PremiumList from '@/components/premium/premium-list'

const Premium = () => {
  return (
    <div className="flex flex-col gap-y-8 justify-center items-center h-full">
      <h1 className="font-bold text-6xl">
        Upgrade to Premium
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.
      </p>

      <PremiumList />
    </div>
  )
}

export default Premium
