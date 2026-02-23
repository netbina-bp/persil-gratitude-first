import { useEffect, useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  createColumnHelper,
  type ColumnDef,
} from '@tanstack/react-table'

import { getUsersList, type PersilGratitudeRecord } from '@/services/api'
import { toPersianDateKey, formatPersianDateTime } from '@/lib/date'

export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const

const useAdminUsersPage = () => {
  const [data, setData] = useState<PersilGratitudeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState<number>(10)

  const groupByDate = (
    records: PersilGratitudeRecord[],
  ): { date: string; count: number }[] => {
    const map = new Map<string, number>()
    for (const r of records) {
      const dateStr = toPersianDateKey(r.created_at)
      map.set(dateStr, (map.get(dateStr) ?? 0) + 1)
    }
    return Array.from(map.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date))
  }

  const getData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getUsersList()
      setData(res.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا در بارگذاری')
    } finally {
      setLoading(false)
    }
  }

  const dailyStats = useMemo(() => groupByDate(data), [data])

  const columnHelper = createColumnHelper<PersilGratitudeRecord>()
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('id', {
          header: 'شناسه',
          cell: (c) => c.getValue(),
        }),
        columnHelper.accessor('name', {
          header: 'نام',
          cell: (c) => c.getValue(),
        }),
        columnHelper.accessor('phone_number', {
          header: 'شماره تماس',
          cell: (c) => c.getValue(),
        }),
        columnHelper.accessor('code', {
          header: 'کد',
          cell: (c) => c.getValue(),
        }),
        columnHelper.accessor('created_at', {
          header: 'تاریخ ثبت',
          cell: (c) => formatPersianDateTime(c.getValue()),
        }),
      ] as ColumnDef<PersilGratitudeRecord, unknown>[],
    [columnHelper],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  const onPageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    table.setPageSize(newSize)
    table.setPageIndex(0)
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    data,
    loading,
    error,
    pageSize,
    columns,
    table,
    dailyStats,
    onPageSizeChange,
  }
}

export default useAdminUsersPage
