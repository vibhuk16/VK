import React from 'react';
import { addDays, format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const PREDEFINED_RANGES = [
  {
    label: 'Last 24h',
    getValue: () => ({
      from: startOfDay(addDays(new Date(), -1)),
      to: endOfDay(new Date())
    })
  },
  {
    label: 'Last 7 days',
    getValue: () => ({
      from: startOfDay(addDays(new Date(), -7)),
      to: endOfDay(new Date())
    })
  },
  {
    label: 'Last 30 days',
    getValue: () => ({
      from: startOfDay(addDays(new Date(), -30)),
      to: endOfDay(new Date())
    })
  },
  {
    label: 'This week',
    getValue: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date())
    })
  },
  {
    label: 'This month',
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  }
];

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {PREDEFINED_RANGES.map((range) => (
          <Button
            key={range.label}
            variant="outline"
            size="sm"
            onClick={() => onDateRangeChange(range.getValue())}
          >
            {range.label}
          </Button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[260px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                </>
              ) : (
                formatDate(dateRange.from)
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Card>
            <CardContent className="p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range: any) => {
                  if (range?.from && range?.to) {
                    onDateRangeChange({
                      from: startOfDay(range.from),
                      to: endOfDay(range.to)
                    });
                  }
                }}
                numberOfMonths={2}
              />
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeSelector; 