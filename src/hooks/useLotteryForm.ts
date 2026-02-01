import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{17}$/, "کد محصول باید ۱۷ رقم باشد.")
  .superRefine((value, ctx) => {
    const day = Number(value.slice(0, 2));
    const month = Number(value.slice(2, 4));
    const fixed = value.slice(4, 6);
    const segment = Number(value.slice(6, 8));
    const batch = Number(value.slice(8, 10));
    const level = Number(value.slice(10, 11));
    const tail = Number(value.slice(11, 17));

    if (day < 1 || day > 31) {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }

    if (month < 1 || month > 3) {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }

    if (fixed !== "26") {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }

    if (segment < 1 || segment > 7) {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }

    if (batch < 1 || batch > 99) {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }

    if (![1, 2, 3].includes(level)) {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }

    if (tail < 10000 || tail > 900000) {
      ctx.addIssue({
        code: "custom",
        message: "کد درج شده صحیح نمی باشد",
      });
    }
  });

const formSchema = z.object({
  fullName: z.string().trim().min(1, "نام کامل الزامی است."),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره تماس معتبر نیست."),
  productCode: productCodeSchema,
});

export type LotteryFormValues = z.infer<typeof formSchema>;

export const useLotteryForm = () => {
  const form = useForm<LotteryFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: LotteryFormValues) => {
    console.log("Lottery data:", data);
    toast.success("ثبت اطلاعات با موفقیت انجام شد.");
    form.reset();
  };

  return {
    ...form,
    onSubmit,
  };
};
