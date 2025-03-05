import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "./dialog";
import { Button } from "./button";
import { toast } from "sonner";
import axios from "axios";

interface AddEmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddEmployeeDialog = ({ isOpen, onClose, onSubmit }: AddEmployeeDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      status: 'Pending' // Default status
    };
  };


  const handleFormSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:5000/api/employees", data);
      const newEmployee = response.data; // Get the created employee from the response

      // Ensure Sonner is working
      toast.success(" Employee added successfully!", {
        duration: 3000,
      });

      // Step 2: Calculate payroll details
      const salary = data.salary; // Assuming salary is part of the form data
      const payrollDetails = calculatePayrollDetails(salary);

      // Step 3: Add payroll details to Payments_tbl
      await axios.post("http://localhost:5000/api/payments", {
        employee_id: newEmployee.employee_id,
        ...payrollDetails
      });

      toast.success("Employee and payroll processed successfully!", { duration: 3000 });

      onSubmit(newEmployee);
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);

      toast.error(" Failed to add employee!", {
        duration: 3000,
      });
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold m-y-4 text-2xl">Add Employee</DialogTitle>
          <DialogDescription className="sr-only">
        Enter the details of the new employee.
      </DialogDescription>
        </DialogHeader>

        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* {Fullname} */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input type="text" 
              {...register("fullname", { required: "Full name is required" })} 
              className="border p-2 w-full rounded-md" 
              autoFocus/>
              {errors.fullname && <p className="text-red-500 text-xs mt-1">{String(errors.fullname.message)}</p>}
            </div>
            {/* {Email} */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" {...register("email", { required: "Email is required" })} className="border p-2 w-full rounded-md" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* {Phone Number} */}
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input type="tel" {...register("phone", { required: "Phone number is required" })} className="border p-2 w-full rounded-md" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{String(errors.phone.message)}</p>}
            </div>
            {/* {National ID} */}
            <div>
              <label className="block text-sm font-medium">National ID</label>
              <input type="text" {...register("national_id", { required: "National ID is required" })} className="border p-2 w-full rounded-md" />
              {errors.national_id && <p className="text-red-500 text-xs mt-1">{String(errors.national_id.message)}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* sex */}
            <div>
              <label className="block text-sm font-medium">Sex</label>
              <select
                {...register("sex", { required: "Sex is required" })}
                className=" block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.sex && (
                <p className="text-red-500 text-xs mt-1">{String(errors.sex.message)}</p>
              )}
            </div>
            {/* KRA PIN */}
            <div>
              <label className="block text-sm font-medium">KRA Pin</label>
              <input type="text" {...register("KRA_pin", { required: "KRA pin is required" })} className="border p-2 w-full rounded-md" />
              {errors.KRA_pin && <p className="text-red-500 text-xs mt-1">{String(errors.KRA_pin.message)}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* position */}
            <div>
              <label className="block text-sm font-medium">Position</label>
              <input type="text" {...register("position", { required: "Position is required" })} className="border p-2 w-full rounded-md" />
              {errors.position && <p className="text-red-500 text-xs mt-1">{String(errors.position.message)}</p>}
            </div>
            {/* department */}
            <div>
              <label className="block text-sm font-medium">Department</label>
              <input type="text" {...register("department", { required: "Department is required" })} className="border p-2 w-full rounded-md" />
              {errors.department && <p className="text-red-500 text-xs mt-1">{String(errors.department.message)}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* hire date */}
            <div>
              <label className="block text-sm font-medium">Hire Date</label>
              <input type="date" {...register("hire_date", { required: "Hire date is required" })} className="border p-2 w-full rounded-md" />
              {errors.hire_date && <p className="text-red-500 text-xs mt-1">{String(errors.hire_date.message)}</p>}
            </div>
            {/*salary */}
            <div>
              <label className="block text-sm font-medium">Salary</label>
              <input type="number" {...register("salary", { required: "Salary is required" })} className="border p-2 w-full rounded-md" />
              {errors.salary && <p className="text-red-500 text-xs mt-1">{String(errors.salary.message)}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* bank name */}
            <div>
              <label className="block text-sm font-medium">Bank Name</label>
              <input type="text" {...register("bank_name", { required: "Bank name is required" })} className="border p-2 w-full rounded-md" />
              {errors.bank_name && <p className="text-red-500 text-xs mt-1">{String(errors.bank_name.message)}</p>}
            </div>
            {/* bank code */}
            <div>
              <label className="block text-sm font-medium">Bank Code</label>
              <input type="text" {...register("bank_code", { required: "Bank code is required" })} className="border p-2 w-full rounded-md" />
              {errors.bank_code && <p className="text-red-500 text-xs mt-1">{String(errors.bank_code.message)}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* bank account */}
            <div>
              <label className="block text-sm font-medium">Bank Account Number</label>
              <input type="text" {...register("bank_account", { required: "Bank Account Number is required" })} className="border p-2 w-full rounded-md" />
              {errors.bank_account && <p className="text-red-500 text-xs mt-1">{String(errors.bank_account.message)}</p>}
            </div>
            {/* status */}
            <div>
              <label className="block text-sm font-medium">Employee Status</label>
              <select
                {...register("status", { required: "Employee status is required" })}
                className=" block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Leave">Leave</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">{String(errors.status.message)}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* payment frequency */}
            <div>
              <label className="block text-sm font-medium">Payment Frequency</label>
              <select
                {...register("payment_frequency", { required: "Payment frequency is required" })}
                className=" block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-Weekly">Bi-Weekly</option>
                <option value="Hourly">Hourly</option>
              </select>
              {errors.payment_frequency && (
                <p className="text-red-500 text-xs mt-1">{String(errors.payment_frequency.message)}</p>
              )}
            </div>
            {/* payment method */}
            <div>
              <label className="block text-sm font-medium">Payment Methid</label>
              <select
                {...register("payment_method", { required: "Payment method is required" })}
                className=" block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Bank">Bank</option>
                <option value="M-pesa">M-pesa</option>
                <option value="Cash">Cash</option>
              </select>
              {errors.payment_method && (
                <p className="text-red-500 text-xs mt-1">{String(errors.payment_method.message)}</p>
              )}
            </div>
          </div>


          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="cursor-pointer" onClick={onClose}>Cancel</Button>
            <Button className="cursor-pointer" type="submit">Add Employee</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
