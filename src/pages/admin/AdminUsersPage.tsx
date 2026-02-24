import { flexRender } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Download,
} from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import useAdminUsersPage, { PAGE_SIZE_OPTIONS } from './useAdminUsersPage'

const AdminUsersPage = () => {
  const {
    data,
    error,
    loading,
    pageSize,
    table,
    dailyStats,
    columns,
    onPageSizeChange,
    exportToExcel,
  } = useAdminUsersPage()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  const totalUsers = data.length
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1
  const canPrev = table.getCanPreviousPage()
  const canNext = table.getCanNextPage()

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-6" dir="rtl">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-2xl font-bold text-neutral-800">
          کاربران ثبت‌نام‌شده
        </h1>

        {/* Info boxes */}
        <div className="grid gap-4 sm:grid-cols-1">
          <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">کل کاربران</p>
              <p className="text-2xl font-semibold text-neutral-800">
                {totalUsers}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-neutral-600">
              <Calendar className="size-5" />
              <span className="text-sm font-medium">ثبت‌ به تفکیک روز</span>
            </div>
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
          </div>
        </div>

        {/* Main data table */}
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-4 py-3 sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-neutral-600">لیست کاربران</span>
            <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToExcel(data)}
                disabled={data.length === 0}
                className="gap-1.5"
              >
                <Download className="size-4" />
                خروجی اکسل
              </Button>
              <span className="text-sm text-neutral-500">
                تعداد در هر صفحه:
              </span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className={cn(
                  'rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm',
                  'focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none',
                )}
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((h) => (
                      <TableHead key={h.id} className="text-right">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center text-neutral-500"
                    >
                      کاربری ثبت نشده است
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 px-4 py-3">
            <p className="text-sm text-neutral-600">
              صفحه {currentPage} از {pageCount || 1}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!canPrev}
                className="gap-1"
              >
                <ChevronRight className="size-4" />
                قبلی
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!canNext}
                className="gap-1"
              >
                بعدی
                <ChevronLeft className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage
