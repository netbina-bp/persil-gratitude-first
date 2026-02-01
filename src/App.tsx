import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useLotteryForm } from "@/hooks/useLotteryForm";

import masterImage from "@/assets/master.jpg";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useLotteryForm();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-b from-[#cf212b] from-0% via-[#cf212b] via-60% to-white to-100% p-6 sm:p-8">
      <Toaster richColors position="top-center" />
      <main
        className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 text-center sm:gap-5"
        dir="rtl"
      >
        <div className="flex w-full justify-center -mx-6 sm:mx-0 flex-1">
          <img
            src={masterImage}
            alt="خانواده پریل"
            className="w-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            شرکت در قرعه‌کشی
          </h1>
          <p className="text-sm text-white sm:text-base">
            برای شرکت در قرعه‌کشی، فرم زیر را با اطلاعات صحیح تکمیل کنید.
            اطلاعات شما محرمانه است و فقط برای این کمپین استفاده می‌شود.
          </p>
        </div>
        <form
          className="w-full space-y-3 sm:space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-2 text-right">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="fullName"
            >
              نام کامل
            </label>
            <Input
              id="fullName"
              className="bg-white/80 text-right shadow-sm"
              placeholder="نام و نام خانوادگی"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-right">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="phone"
            >
              شماره تماس
            </label>
            <Input
              id="phone"
              className="bg-white/80 text-right shadow-sm"
              type="tel"
              placeholder="0912XXXXXXX"
              autoComplete="tel"
              inputMode="numeric"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div className="grid gap-2 text-right">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="productCode"
            >
              کد درج شده روی محصول
            </label>
            <Input
              id="productCode"
              className="bg-white/80 text-right shadow-sm"
              placeholder="کد ۱۷ رقمی روی محصول"
              inputMode="numeric"
              aria-invalid={Boolean(errors.productCode)}
              {...register("productCode")}
            />
            {errors.productCode && (
              <p className="text-xs text-destructive">
                {errors.productCode.message}
              </p>
            )}
          </div>
          <Button className="w-full" type="submit">
            ثبت اطلاعات
          </Button>
        </form>
      </main>
    </div>
  );
};

export default App;
