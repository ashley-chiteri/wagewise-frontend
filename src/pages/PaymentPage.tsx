import { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import SideNav from "../components/ui/SideNav";
//import PaymentButton from "../components/ui/PaymentButton";

interface Payment {
  id: number;
  employee_id: number;
  fullname: string;
  paye: number;
  shif: number;
  department: string;
  national_id: string;
  KRA_pin: string;
  nssf_tier_one: number;
  nssf_tier_two: number;
  housing_levy: number;
  gross_salary: number;
  net_salary: number;
  pay_date: string;
  status: string;
  next_pay_date: string;
  frequency: "weekly" | "bi-weekly" | "monthly";

}

const PaymentPage = () => {
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    // Fetch data from the API endpoint
    const fetchPendingPayments = async () => {
      try {
        const response = await fetch("https://wagewise-backend.onrender.com/api/payments/pending-payments");
        const data = await response.json();
        setPendingPayments(data);
      } catch (error) {
        console.error("Error fetching pending payments:", error);
      }
    };

    fetchPendingPayments();
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2 });
  };

  const generatePayslip = async (payment: Payment): Promise<void> => {
    const {
      fullname = "N/A",
      gross_salary = 0,
      paye = 0,
      shif = 0,
      nssf_tier_one = 0,
      nssf_tier_two = 0,
      housing_levy = 0,
      net_salary = 0,
      pay_date = "N/A",
      department = "N/A",
      employee_id = "N/A",
      KRA_pin = "N/A",
      national_id = "N/A",
    } = payment;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = 650;

    const drawText = (text: string, x: number, y: number, bold = false, background = false) => {
      if (background) {
        page.drawRectangle({
          x: x - 5,
          y: y - 2,
          width: 360,
          height: 16,
          color: rgb(0.9, 0.9, 0.9),
        });
      }
      page.drawText(text, {
        x,
        y,
        size: 12,
        font: bold ? boldFont : font,
        color: rgb(0, 0, 0),
      });
    };

    drawText("A.I.P.C.A", 50, y, true);
    drawText(`PAY SLIP - ${pay_date}`, 50, y - 20, true);

    y -= 40;
    drawText(`Name: ${fullname}`, 50, y, true);
    drawText(`Department: ${department}`, 50, y - 20, true);
    drawText(`Employee NO: ${employee_id}`, 50, y - 40, true);
    drawText(`PIN: ${KRA_pin}`, 50, y - 60, true);
    drawText(`IDNO: ${national_id}`, 50, y - 80, true);

    y -= 100;
    drawText("Description", 50, y, true);
    drawText("Amount", 300, y, true);
    page.drawLine({ start: { x: 45, y: y - 5 }, end: { x: 405, y: y - 5 }, thickness: 1, color: rgb(0, 0, 0) });

    y -= 20;
    const drawRow = (description: string, amount: number, bold = false, highlight = false) => {
      drawText(description, 50, y, bold, highlight);
      drawText(formatNumber(amount), 300, y, bold, highlight);
      y -= 20;
    };

    drawRow("Basic", gross_salary);
    drawRow("GROSS PAY", gross_salary, true, true);
    drawRow("PAYE", paye);
    drawRow("SHIF", shif);
    drawRow("Housing Levy", housing_levy);
    drawRow("NSSF Tier1", nssf_tier_one);
    drawRow("NSSF Tier2", nssf_tier_two);

    const totalDeductions = paye + shif + nssf_tier_one + nssf_tier_two + housing_levy;
    drawRow("TOTAL DEDUCTIONS", totalDeductions, true, true);

    const taxableIncome = gross_salary - (shif + nssf_tier_one + nssf_tier_two + housing_levy);
    drawRow("Taxable Income KSh", taxableIncome);
    drawRow("Relief of Month(-)", 2400.00);
    drawRow("NET PAY", net_salary, true, true);

    y -= 40;
    page.drawLine({ start: { x: 45, y }, end: { x: 405, y }, thickness: 1, color: rgb(0, 0, 0) });
    drawText("Signature EFT", 50, y - 20, true);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `payslip_${fullname}_${pay_date}.pdf`;
    link.click();
    toast.info(`Payslip generated for ${payment.fullname}`);
  };

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


  const handlePay = async (payment: Payment, setPendingPayments: (payments: Payment[]) => void, pendingPayments: Payment[], generatePayslip: (payment: Payment) => void) => {
    const paymentDetails = {
      employee_id: payment.employee_id,
      net_salary: payment.net_salary,
      pay_date: payment.pay_date,
    };

    try {
      const response = await fetch("https://wagewise-backend.onrender.com/api/payments/individual-payment", {
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

          await fetch("https://wagewise-backend.onrender.com/api/payments", {
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
    }
  };

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Employee</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.fullname}</TableCell>
                    <TableCell>{payment.gross_salary.toFixed(2)}</TableCell>
                    <TableCell>{payment.pay_date}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button
                        onClick={async () => {
                          setIsPaying(true); // Show loading state
                          await handlePay(payment, setPendingPayments, pendingPayments, generatePayslip);
                          setIsPaying(false); // Reset after payment
                        }}
                        disabled={isPaying} // Disable button while processing
                        variant="default"
                      >
                        {isPaying ? "Processing..." : "Pay"} 
                      </Button> 
                      {/* ✅ Replace old button with PaymentButton */}
                      {/* <PaymentButton
                        payment={payment}
                        setPendingPayments={setPendingPayments}
                        pendingPayments={pendingPayments}
                        generatePayslip={generatePayslip}
                      /> */}

                      <Button variant="outline" onClick={() => generatePayslip(payment)}>
                        Payslip
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;