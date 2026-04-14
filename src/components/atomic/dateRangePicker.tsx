import { useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { faIR } from 'date-fns-jalali/locale'
import { format as formatJalaliDate } from 'date-fns-jalali'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DateRangePickerProps = {
  onChange: (range?: DateRange) => void
  placeholder?: string
}

const DateRangePicker = ({
  onChange,
  placeholder = 'فیلتر بازه تاریخ (شمسی)',
}: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'min-w-56 justify-start text-right font-normal',
            !dateRange && 'text-neutral-500',
          )}
        >
          <CalendarIcon className="ml-2 size-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {formatJalaliDate(dateRange.from, 'yyyy/MM/dd', {
                  locale: faIR,
                })}{' '}
                -{' '}
                {formatJalaliDate(dateRange.to, 'yyyy/MM/dd', {
                  locale: faIR,
                })}
              </>
            ) : (
              formatJalaliDate(dateRange.from, 'yyyy/MM/dd', {
                locale: faIR,
              })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => {
            setDateRange(range)
            onChange(range)
          }}
          locale={faIR}
          numberOfMonths={2}
        />
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              setDateRange(undefined)
              onChange(undefined)
            }}
          >
            حذف فیلتر تاریخ
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DateRangePicker
