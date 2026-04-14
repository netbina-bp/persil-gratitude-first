import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'

import DateRangePicker from '@/components/atomic/dateRangePicker'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { PersilGratitudeRecord } from '@/services/api'
import { PAGE_SIZE_OPTIONS } from '../useAdminUsersPage'

type AdminUsersTableSectionProps = {
  data: PersilGratitudeRecord[]
  loading: boolean
  error: string | null
  pageSize: number
  table: TanstackTable<PersilGratitudeRecord>
  columns: ColumnDef<PersilGratitudeRecord, unknown>[]
  onPageSizeChange: (newSize: number) => void
  onDateRangeChange: (range?: { from?: Date; to?: Date }) => void
  exportToExcel: (data: PersilGratitudeRecord[]) => void
}

const AdminUsersTableSection = ({
  data,
  loading,
  error,
  pageSize,
  table,
  columns,
  onPageSizeChange,
  onDateRangeChange,
  exportToExcel,
}: AdminUsersTableSectionProps) => {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1
  const canPrev = table.getCanPreviousPage()
  const canNext = table.getCanNextPage()

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-3 sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-neutral-600">لیست کاربران</span>
        <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-0">
          <DateRangePicker onChange={onDateRangeChange} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToExcel(data)}
            disabled={loading || data.length === 0}
            className="gap-1.5"
          >
            <Download className="size-4" />
            خروجی اکسل
          </Button>
          <span className="text-sm text-neutral-500">تعداد در هر صفحه:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={loading}
            className={cn(
              'rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm',
              'focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none',
              'disabled:cursor-not-allowed disabled:bg-neutral-100',
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

      {loading ? (
        <div className="flex min-h-56 items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-600">
          <p>{error}</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default AdminUsersTableSection
