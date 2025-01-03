"use client";

import { useState } from "react";
import { OrderDetails } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, X, Edit, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

type Props = {
  data: Partial<OrderDetails>;
  onUpdate: (data: Partial<OrderDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function DeliveryForm({ data, onUpdate, onNext, onBack }: Props) {
  const [selectedImages, setSelectedImages] = useState<File[]>(data.referenceImages || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
      onUpdate({ referenceImages: [...selectedImages, ...newImages] });
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onUpdate({ referenceImages: updatedImages });
  };

  const handleUpdateImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = e.target.files[0];
      setSelectedImages(updatedImages);
      onUpdate({ referenceImages: updatedImages });
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
          {selectedImages.length > 0 && (
            <div className="mt-4 space-y-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm truncate">{image.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <label>
                    <Button type="button" variant="ghost" size="icon" asChild>
                      <span>
                        <Edit className="h-4 w-4" />
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUpdateImage(index, e)}
                        />
                      </span>
                    </Button>
                  </label>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              You can also email your reference images to{" "}
              <a href="mailto:cakes4ufoods@gmail.com" className="text-pink-600 hover:underline">
                cakes4ufoods@gmail.com
              </a>{" "}
              with your order number in the subject line.
            </p>
          </div>
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

