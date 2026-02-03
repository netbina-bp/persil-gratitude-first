import { Input } from "@/components/atomic/input";
import { Button } from "@/components/ui/button";
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
        className="mx-auto flex w-full flex-col items-center justify-center gap-4 text-center sm:gap-5"
        dir="rtl"
      >
        <div className="flex justify-center">
          <img
            src={masterImage}
            alt="خانواده پریل"
            className="w-full object-cover max-w-md"
          />
        </div>        
        <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/20 p-3 shadow-sm backdrop-blur-md">
          <form
            className="w-full space-y-2"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-1 text-right">
              <label
                className="text-xs font-medium text-foreground"
                htmlFor="fullName"
              >
                نام کامل
              </label>
              <Input
                id="fullName"
                className="text-right shadow-sm"
                placeholder="نام و نام خانوادگی"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-800">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2 text-right">
              <label
                className="text-xs font-medium text-foreground"
                htmlFor="phone"
              >
                شماره تماس
              </label>
              <Input
                id="phone"
                className="text-right shadow-sm"
                type="tel"
                placeholder="0912XXXXXXX"
                autoComplete="tel"
                inputMode="numeric"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-800">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="grid gap-2 text-right">
              <label
                className="text-xs font-medium text-foreground"
                htmlFor="productCode"
              >
                کد درج شده روی محصول
              </label>
              <Input
                id="productCode"
                className="text-right shadow-sm"
                placeholder="کد ۱۷ رقمی روی محصول"
                inputMode="numeric"
                aria-invalid={Boolean(errors.productCode)}
                {...register("productCode")}
              />
              {errors.productCode && (
                <p className="text-xs text-red-800">
                  {errors.productCode.message}
                </p>
              )}
            </div>
            <Button className="w-full" type="submit">
              ثبت اطلاعات
            </Button>
          </form>
        </div>
        <div className="space-y-2">
          <h1 className="text-base font-bold text-foreground sm:text-3xl">
          ما در پریل و پرسیل، قدردانی از همدیگر را آنقدر کار مهمی می‌دانیم که هشت سال است هر سال همه را به دانستن قدر همدیگر دعوت می‌کنیم؛ دانستن قدر دوستی‌ها، مهربانی‌ها، لطف‌ها و کمک‌ها.
          </h1>
          <p className="text-sm text-foreground sm:text-base">
          امسال هم برای ما استثنا نبود اما آنچه که در روزهای گذشته اتفاق افتاد، شرایط را آن‌قدر استثنایی کرد که این دعوت به آن شکل که در سال‌های گذشته انجام می‌شد ممکن نبود و ما را ناچار کرد برنامه‌های‌مان را به زمان بهتری موکول کنیم.
          اما به پاس همراهی شما با ما و اینکه با خرید محصول به این دعوت پیوستید، قرعه‌کشی برای اهدای جایزه همچنان به قوت خودش باقی خواهد بود. 
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
