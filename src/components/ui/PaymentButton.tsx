import { useState } from "react";
import { Button } from "./button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./alert-dialog";
import { toast } from "sonner";

interface Payment {
  id: number;
  employee_id: number;
  fullname: string;
  net_salary: number;
  pay_date: string;
  next_pay_date: string;
  frequency: "weekly" | "bi-weekly" | "monthly";
  status: string;
}

const PaymentButton = ({ payment, setPendingPayments, pendingPayments, generatePayslip }: { 
  payment: Payment, 
  setPendingPayments: (payments: Payment[]) => void, 
  pendingPayments: Payment[], 
  generatePayslip: (payment: Payment) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const getNextPayDate = (currentDate: string, frequency: string): string => {
    const date = new Date(currentDate);
    switch (frequency) {
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "bi-weekly":
        date.setDate(date.getDate() + 14);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
    }
    return date.toISOString().split("T")[0];
  };

  const handleConfirmPay = async () => {
    setIsPaying(true);
    setIsOpen(false);

    const paymentDetails = {
      employee_id: payment.employee_id,
      net_salary: payment.net_salary,
      pay_date: payment.pay_date,
    };

    try {
      const response = await fetch("http://localhost:5000/api/payments/individual-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Payment successful for ${payment.fullname}. Transaction ID: ${result.transactionId}`);
        generatePayslip(payment);

        const updatedPayments = pendingPayments.map((p) =>
          p.id === payment.id ? { ...p, status: "paid" } : p
        );
        setPendingPayments(updatedPayments);

        setTimeout(async () => {
          const newPayDate = getNextPayDate(payment.next_pay_date, payment.frequency);
          const newPaymentRecord = { ...payment, pay_date: payment.next_pay_date, next_pay_date: newPayDate, status: "pending" };

          await fetch("http://localhost:5000/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPaymentRecord),
          });

          toast.info(`Next payment record created for ${payment.fullname} on ${newPayDate}`);
        }, 24 * 60 * 60 * 1000);
      } else {
        toast.error(`Payment failed for ${payment.fullname}. Reason: ${result.error}`);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="default">Pay</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to process payment for <strong>{payment.fullname}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPay} disabled={isPaying}>
              {isPaying ? "Processing..." : "Confirm & Pay"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaymentButton;
