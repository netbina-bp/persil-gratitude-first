import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ImgBackground from '@/assets/svg/gold-confetti-fall.svg'

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SuccessModal = ({ open, onOpenChange }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm border-none bg-linear-to-b from-[#B50006] to-white p-0 sm:max-w-xl"
        showCloseButton={false}
      >
        <div className="relative z-10 flex flex-col items-center gap-6 overflow-hidden p-8 text-center">
          <img
            src={ImgBackground}
            className="absolute top-0 right-0 bottom-0 left-0 z-0 overflow-hidden object-fill"
          />
          <DialogHeader className="z-10 w-full">
            <DialogTitle className="pt-4 text-center text-2xl font-bold sm:text-2xl">
              دوست گرامی!
            </DialogTitle>
            <div className="mt-4 space-y-3 text-center">
              <p className="text-2xl font-bold sm:text-2xl">
                از همراهی شما سپاسگزاریم
              </p>
              <p className="text-2xl font-bold sm:text-2xl">
                کد ارسالی‌تان تایید شد و شما وارد قرعه‌کشی شدید
              </p>
              <p className="font-base text-xl">
                لطفا بطری محصول را تا ۳۱ اردیبهشت نزد خودتان نگه‌ دارید
              </p>
            </div>
          </DialogHeader>

          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="z-10 mt-4 rounded-[20px] bg-[#059907] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#048006]"
          >
            تایید
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
