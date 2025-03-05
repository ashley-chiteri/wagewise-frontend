import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { toast } from "sonner";

interface Employee {
    employee_id: number;
    fullname: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    sex: string;
    hire_date: string;
    payment_method: string;
    salary: number;
    bank_account: string;
    status: string;
    bank_name: string;
    bank_code: string;
    KRA_pin: string;
    national_id: string;
    payment_frequency: string;
}

interface EditEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    onEmployeeEdited: () => void;
    employee: Employee | null;
    handleSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
    open,
    onClose,
    employee,
    onEmployeeEdited,
    handleSave,
}) => {
    const [formData, setFormData] = useState<Employee | null>(null);

    useEffect(() => {
        setFormData(employee ? { ...employee } : null);
    }, [employee]);

    const calculatePayrollDetails = (salary: number) => {
        const personalRelief = 2400; // Personal relief amount
        let taxablePay; // Taxable pay amount



        // Calculate SHIF (2.75% of gross salary)
        const shif = salary * 0.0275;

        // Calculate NSSF (Tier I and Tier II)
        const nssfTierOne = Math.min(salary, 8000) * 0.06;
        const nssfTierTwo = Math.max(0, Math.min(salary, 72000) - 8000) * 0.06;

        // Calculate Housing Levy (1.5% of gross salary)
        const housingLevy = salary * 0.015;
        let allowableDeductions = shif + nssfTierOne + nssfTierTwo + housingLevy;
        taxablePay = salary - allowableDeductions;

        // Calculate PAYE
        let paye = 0;
        if (taxablePay <= 24000) {
            paye = taxablePay * 0.1;
        } else if (taxablePay <= 32333) {
            paye = 24000 * 0.1 + (taxablePay - 24000) * 0.25;
        } else if (taxablePay <= 500000) {
            paye = 24000 * 0.1 + (32333 - 24000) * 0.25 + (taxablePay - 32333) * 0.3;
        } else if (taxablePay <= 800000) {
            paye = 24000 * 0.1 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.3 + (taxablePay - 500000) * 0.325;
        } else {
            paye = 24000 * 0.1 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.3 + (800000 - 500000) * 0.325 + (taxablePay - 800000) * 0.35;
        }
        paye -= personalRelief; // Apply personal relief

        // Calculate Net Salary
        const netSalary = salary - (paye + shif + nssfTierOne + nssfTierTwo + housingLevy);

        return {
            gross_salary: salary,
            paye,
            shif,
            nssf_tier_one: nssfTierOne,
            nssf_tier_two: nssfTierTwo,
            housing_levy: housingLevy,
            net_salary: netSalary,
            pay_date: new Date().toISOString().split('T')[0], // Current date as pay date
            next_pay_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0], // Next month's date
            status: 'Pending', // Default status
        };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === "number" ? Number(value) : value;
        setFormData((prevData) => (prevData ? { ...prevData, [name]: parsedValue } : prevData));
    };

    const handleSelectChange = (name: keyof Employee, value: string) => {
        setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSubmit = async () => {
        if (!formData) {
            toast.error("No employee data provided.", { duration: 3000 });
            return;
        }

        try {
            const response = await fetch(
                `https://wagewise-backend.onrender.com/api/employees/${formData.employee_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update employee");
            }
            const updatedEmployee = await response.json();

            //console.log("Updated employee:", formData.salary);

            //  Step 2: Recalculate payroll details
            const payrollDetails = calculatePayrollDetails(formData.salary);
            //console.log("Payroll details:", payrollDetails);


            toast.success("Employee updated successfully!", { duration: 3000 });
            // Step 3: Update the payment record
            const updatePaymentResponse = await fetch(
                `https://wagewise-backend.onrender.com/api/payments/${formData.employee_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        employee_id: formData.employee_id,
                        ...payrollDetails,
                    }),
                }
            );

            if (!updatePaymentResponse.ok) {
                const errorData = await updatePaymentResponse.json();
                console.error("Failed to update payment record:", errorData);
                throw new Error("Failed to update payment record");
            }

            const updatedPayment = await updatePaymentResponse.json();
            console.log("Updated payment:", updatedPayment);

            // Success messages
            //toast.success("Employee and payment records updated successfully!", { duration: 3000 });



            handleSave(updatedEmployee);
            onEmployeeEdited();
            setTimeout(onClose, 1000);
        } catch (error: any) {
            console.error("Error updating employee:", error);
            toast.error(error.message || "An unexpected error occurred.", { duration: 3000 });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogDescription className="sr-only">
                        Edit the details of the selscted employee.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["fullname", "email", "phone", "national_id", "KRA_pin", "position", "department"].map((field) => (
                            <div key={field}>
                                <Label htmlFor={field}>{field.replace("_", " ")}</Label>
                                <Input id={field} name={field} value={formData?.[field as keyof Employee] || ""} onChange={handleChange} autoFocus />
                            </div>
                        ))}
                        <div>
                            <Label htmlFor="hire_date">Hire Date</Label>
                            <Input id="hire_date" name="hire_date" type="date" value={formData?.hire_date || ""} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary</Label>
                            <Input id="salary" name="salary" type="number" value={formData?.salary || ""} onChange={handleChange} />
                        </div>
                        {["bank_name", "bank_code", "bank_account"].map((field) => (
                            <div key={field}>
                                <Label htmlFor={field}>{field.replace("_", " ")}</Label>
                                <Input id={field} name={field} value={formData?.[field as keyof Employee] || ""} onChange={handleChange} />
                            </div>
                        ))}
                        <div>
                            <Label htmlFor="payment_method">Sex</Label>
                            <Select onValueChange={(value) => handleSelectChange("sex", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={formData?.sex} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="payment_method">Payment Method</Label>
                            <Select onValueChange={(value) => handleSelectChange("payment_method", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={formData?.payment_method} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bank">Bank</SelectItem>
                                    <SelectItem value="M-pesa">M-Pesa</SelectItem>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="payment_frequency">Payment Frequency</Label>
                            <Select onValueChange={(value) => handleSelectChange("payment_frequency", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={formData?.payment_frequency} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="hourly">Hourly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select onValueChange={(value) => handleSelectChange("status", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={formData?.status} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Leave">Leave</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="secondary" className="cursor-pointer" onClick={onClose}>Cancel</Button>
                    <Button className="cursor-pointer" onClick={handleSubmit}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditEmployeeModal;
