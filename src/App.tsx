import { Input } from "@/components/atomic/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useLotteryForm } from "@/hooks/useLotteryForm";

import masterImage from "@/assets/images/master.jpg";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useLotteryForm();

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#ae191d] to-[#cf212b]">
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
      <main
        className="mx-auto flex h-screen w-full max-w-md flex-col"
        dir="rtl"
      >
        <div className="flex justify-center">
          <img
            src={masterImage}
            alt="خانواده پریل"
            className="w-full object-cover max-w-md"
          />
        </div>
        <section
          className="flex w-full flex-1 flex-col items-center justify-start gap-4 overflow-y-auto bg-[url(./assets/images/bg.png)] bg-cover bg-top bg-no-repeat text-center sm:gap-5"
          dir="rtl"
        >
          <div className="p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/10 p-3 shadow-sm backdrop-blur-xs">
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
                    variant="rounded"
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
                    variant="rounded"
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
                    variant="rounded"
                    {...register("productCode")}
                  />
                  {errors.productCode && (
                    <p className="text-xs text-red-800">
                      {errors.productCode.message}
                    </p>
                  )}
                </div>
                <Button className="w-full rounded-full mt-2" type="submit">
                  ثبت اطلاعات
                </Button>
              </form>
            </div>
            <div className="space-y-2 mt-6">
              <h1 className="text-base font-semibold text-foreground sm:text-xl">
                ما در پریل و پرسیل، قدردانی از همدیگر را آنقدر کار مهمی می‌دانیم
                که هشت سال است هر سال همه را به دانستن قدر همدیگر دعوت می‌کنیم؛
                دانستن قدر دوستی‌ها، مهربانی‌ها، لطف‌ها و کمک‌ها.
              </h1>
              {/* <p className="text-sm text-foreground sm:text-base">
              امسال هم برای ما استثنا نبود اما آنچه که در روزهای گذشته اتفاق
              افتاد، شرایط را آن‌قدر استثنایی کرد که این دعوت به آن شکل که در
              سال‌های گذشته انجام می‌شد ممکن نبود و ما را ناچار کرد
              برنامه‌های‌مان را به زمان بهتری موکول کنیم. اما به پاس همراهی شما
              با ما و اینکه با خرید محصول به این دعوت پیوستید، قرعه‌کشی برای
              اهدای جایزه همچنان به قوت خودش باقی خواهد بود.
            </p> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
