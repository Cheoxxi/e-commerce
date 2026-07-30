"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { vi } from "date-fns/locale";

const tasks = [
  { id: "confirm-orders", label: "Xác nhận các đơn hàng mới", done: true },
  { id: "check-stock", label: "Kiểm tra sản phẩm sắp hết hàng", done: true },
  { id: "reply-customers", label: "Phản hồi tin nhắn khách hàng", done: false },
  { id: "update-promo", label: "Cập nhật chương trình khuyến mãi", done: false },
  { id: "review-payment", label: "Đối soát giao dịch trong ngày", done: false },
  { id: "prepare-report", label: "Chuẩn bị báo cáo doanh thu", done: false },
];

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Công việc cần làm</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <CalendarIcon />
            {date ? format(date, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            locale={vi}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {/* LIST */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <Card className="p-4" key={task.id}>
              <div className="flex items-center gap-4">
                <Checkbox id={task.id} defaultChecked={task.done} />
                <label
                  htmlFor={task.id}
                  className="text-sm text-muted-foreground"
                >
                  {task.label}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
