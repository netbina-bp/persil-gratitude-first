import { Users } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'

type AdminUsersSummaryCardProps = {
  totalUsers: number
  loading: boolean
  error: string | null
}

const AdminUsersSummaryCard = ({
  totalUsers,
  loading,
  error,
}: AdminUsersSummaryCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <Users className="size-6" />
      </div>
      <div>
        <p className="text-sm text-neutral-500">کل کاربران</p>
        {loading ? (
          <Spinner className="mt-1 size-5" />
        ) : error ? (
          <p className="text-sm text-red-600">خطا در دریافت آمار</p>
        ) : (
          <p className="font-sans text-2xl font-semibold text-neutral-800 tabular-nums">
            {totalUsers}
          </p>
        )}
      </div>
    </div>
  )
}

export default AdminUsersSummaryCard
