import { Calendar as CalendarIcon } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'

type DailyStat = {
  date: string
  count: number
}

type AdminUsersDailyStatsCardProps = {
  dailyStats: DailyStat[]
  loading: boolean
  error: string | null
}

const AdminUsersDailyStatsCard = ({
  dailyStats,
  loading,
  error,
}: AdminUsersDailyStatsCardProps) => {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-neutral-600">
        <CalendarIcon className="size-5" />
        <span className="text-sm font-medium">ثبت‌ به تفکیک روز</span>
      </div>
      {loading ? (
        <div className="flex min-h-24 items-center justify-center">
          <Spinner className="size-6" />
        </div>
      ) : error ? (
        <div className="py-4 text-center text-sm text-red-600">
          خطا در دریافت آمار روزانه
        </div>
      ) : (
        <div className="max-h-40 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">تاریخ</TableHead>
                <TableHead className="text-right">تعداد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyStats.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-neutral-500"
                  >
                    داده‌ای وجود ندارد
                  </TableCell>
                </TableRow>
              ) : (
                dailyStats.map(({ date, count }) => (
                  <TableRow key={date}>
                    <TableCell className="font-medium">
                      {date.replace(/-/g, '/')}
                    </TableCell>
                    <TableCell>{count}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default AdminUsersDailyStatsCard
