import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "@/lib/date"
import { DateRange } from "react-day-picker"

interface PeriodSelectorProps {
    className?: string;
    value?: DateRange;
    onChange?: (range?: DateRange) => void;
}

export function PeriodSelector(props: PeriodSelectorProps) {
    const { className, value, onChange } = props;

    return (
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"ghost"}
                className={cn(
                  "w-max text-left font-normal text-sm",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value?.from ? (
                  value.to ? (
                    <>
                      {formatDate(value.from, "LLL dd, y")} - {" "}
                      {formatDate(value.to, "LLL dd, y")}
                    </>
                  ) : (
                    formatDate(value.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      )
}

