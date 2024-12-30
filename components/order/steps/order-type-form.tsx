"use client";

import { OrderDetails } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  data: Partial<OrderDetails>;
  onUpdate: (data: Partial<OrderDetails>) => void;
  onNext: () => void;
};

const cakeTypes = ["Wedding", "Birthday", "Anniversary", "Custom"];
const servingSizes = [10, 20, 30, 50, 100];

export function OrderTypeForm({ data, onUpdate, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Cake Type</Label>
          <Select
            value={data.type}
            onValueChange={(value) => onUpdate({ type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cake type" />
            </SelectTrigger>
            <SelectContent>
              {cakeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Number of Servings</Label>
          <Select
            value={data.servings?.toString()}
            onValueChange={(value) => onUpdate({ servings: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select number of servings" />
            </SelectTrigger>
            <SelectContent>
              {servingSizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} servings
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Occasion</Label>
          <Input
            value={data.occasion || ""}
            onChange={(e) => onUpdate({ occasion: e.target.value })}
            placeholder="What's the special occasion?"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={data.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe your dream cake..."
            className="h-32"
          />
        </div>

        <div>
          <Label>Allergy Information</Label>
          <Textarea
            value={data.allergyInfo || ""}
            onChange={(e) => onUpdate({ allergyInfo: e.target.value })}
            placeholder="Any allergies we should be aware of?"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Next Step
      </Button>
    </form>
  );
}