"use client";

import { OrderDetails } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";

type Props = {
  data: Partial<OrderDetails>;
  onUpdate: (data: Partial<OrderDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function DeliveryForm({ data, onUpdate, onNext, onBack }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpdate({ referenceImages: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Delivery Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.deliveryDate ? (
                  format(data.deliveryDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.deliveryDate}
                onSelect={(date) => onUpdate({ deliveryDate: date })}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Reference Images</Label>
          <div className="mt-2">
            <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Upload reference images
                </span>
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {data.referenceImages && data.referenceImages.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {data.referenceImages.length} images selected
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button type="submit" className="w-full">
          Next Step
        </Button>
      </div>
    </form>
  );
}