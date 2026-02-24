import { Input } from '@/components/atomic/input'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { useLotteryForm } from '@/hooks/useLotteryForm'
import { SuccessModal } from '@/components/atomic/successModal'

import ImgMaster from '@/assets/images/img-henkel.png'
import ImgFooterBackground from '@/assets/images/img-gift-footer.png'

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    showSuccessModal,
    setShowSuccessModal,
  } = useLotteryForm()

  return (
    <div className="min-h-screen w-full">
      <Toaster
        richColors
        dir="rtl"
        position="top-center"
        toastOptions={{
          style: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }}
      />
      <main className="mx-auto flex min-h-screen w-full flex-col" dir="rtl">
        <div className="flex max-h-4/12 justify-center bg-[#B50006]">
          <img
            src={ImgMaster}
            alt="خانواده پریل"
            className="w-full object-contain"
          />
        </div>
        <section
          className="relative flex h-full w-full flex-1 flex-col items-center justify-start gap-4 bg-linear-to-b from-[#B50006] from-35% to-white to-80% text-center sm:gap-5"
          dir="rtl"
        >
          <div className="absolute right-1 left-1 z-0 h-[300px] w-full bg-[url(./assets/images/img-gift-box.png)] bg-contain bg-top bg-no-repeat sm:h-[400px]" />
          <div
            className="relative w-full max-w-xs rounded-[28px] p-6 shadow-2xl sm:max-w-lg sm:p-8"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_2px_8px_8px_rgba(0,0,0,0.25)]"
              style={{ background: 'rgba(255, 255, 255, 0.4)' }}
            />
            <form
              className="relative z-10 flex w-full flex-col items-center gap-4 space-y-1"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid w-full gap-1 text-right">
                <Input
                  id="fullName"
                  className="text-right shadow-sm"
                  placeholder="نام و نام خانوادگی"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  variant="rounded"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-800">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="grid w-full gap-2 text-right">
                <Input
                  id="phone"
                  className="text-right shadow-sm"
                  type="tel"
                  placeholder="شماره تماس"
                  autoComplete="tel"
                  inputMode="numeric"
                  aria-invalid={Boolean(errors.phone)}
                  variant="rounded"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-xs text-red-800">{errors.phone.message}</p>
                )}
              </div>
              <div className="grid w-full gap-2 text-right">
                <Input
                  id="productCode"
                  className="text-right shadow-sm"
                  placeholder="کد ۱۷ رقمی روی محصول"
                  inputMode="numeric"
                  aria-invalid={Boolean(errors.productCode)}
                  variant="rounded"
                  {...register('productCode')}
                />
                {errors.productCode && (
                  <p className="text-xs text-red-800">
                    {errors.productCode.message}
                  </p>
                )}
              </div>
              <Button
                className="h-12 w-fit rounded-[20px] bg-[#059907] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#048006]"
                type="submit"
              >
                ثبت اطلاعات
              </Button>
            </form>
          </div>
          <img
            src={ImgFooterBackground}
            alt="footer"
            className="w-full object-cover opacity-15"
          />
        </section>
      </main>
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={(val) => {          
          setShowSuccessModal(val)
        }}
      />
    </div>
  )
}

export default App
