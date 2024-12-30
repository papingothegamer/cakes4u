"use client";

import { ContactDetails } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  data: Partial<ContactDetails>;
  onUpdate: (data: Partial<ContactDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ContactForm({ data, onUpdate, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Full Name</Label>
          <Input
            value={data.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={data.email || ""}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="Your email address"
            required
          />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="Your phone number"
            required
          />
        </div>

        <div>
          <Label>Delivery Address</Label>
          <Textarea
            value={data.address || ""}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder="Full delivery address"
            required
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button type="submit" className="w-full">
          Review Order
        </Button>
      </div>
    </form>
  );
}