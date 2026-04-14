import AdminUsersDailyStatsCard from './components/AdminUsersDailyStatsCard'
import AdminUsersSummaryCard from './components/AdminUsersSummaryCard'
import AdminUsersTableSection from './components/AdminUsersTableSection'
import useAdminUsersPage from './useAdminUsersPage'

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
    onDateRangeChange,
    exportToExcel,
  } = useAdminUsersPage()

  const totalUsers = data.length

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-6" dir="rtl">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-2xl font-bold text-neutral-800">
          کاربران ثبت‌نام‌شده
        </h1>

        {/* Info boxes */}
        <div className="grid gap-4 sm:grid-cols-1">
          <AdminUsersSummaryCard
            totalUsers={totalUsers}
            loading={loading}
            error={error}
          />
          <AdminUsersDailyStatsCard
            dailyStats={dailyStats}
            loading={loading}
            error={error}
          />
        </div>

        <AdminUsersTableSection
          data={data}
          loading={loading}
          error={error}
          pageSize={pageSize}
          table={table}
          columns={columns}
          onPageSizeChange={onPageSizeChange}
          onDateRangeChange={onDateRangeChange}
          exportToExcel={exportToExcel}
        />
      </div>
    </div>
  )
}

export default AdminUsersPage
