"use client";

import { useState } from "react";
import { OrderDetails, ContactDetails } from "@/types/order";
import { OrderTypeForm } from "./steps/order-type-form";
import { DeliveryForm } from "./steps/delivery-form";
import { ContactForm } from "./steps/contact-form";
import { OrderSummary } from "./steps/order-summary";

export function OrderSteps() {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState<Partial<OrderDetails>>({});
  const [contactDetails, setContactDetails] = useState<Partial<ContactDetails>>({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails({ ...orderDetails, ...details });
  };

  const updateContactDetails = (details: Partial<ContactDetails>) => {
    setContactDetails({ ...contactDetails, ...details });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 && (
        <OrderTypeForm
          data={orderDetails}
          onUpdate={updateOrderDetails}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <DeliveryForm
          data={orderDetails}
          onUpdate={updateOrderDetails}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <ContactForm
          data={contactDetails}
          onUpdate={updateContactDetails}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <OrderSummary
          orderDetails={orderDetails as OrderDetails}
          contactDetails={contactDetails as ContactDetails}
          onBack={prevStep}
        />
      )}
    </div>
  );
}