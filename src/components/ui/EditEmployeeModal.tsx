import React, { useState, useEffect } from "react";

interface Employee {
    employee_id: number;
    fullname: string;
    email: string;
    phone: string;
    position: string;
    department: string;
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
    show: boolean;
    handleClose: () => void;
    onEmployeeEdited: () => void;
    employee: Employee | null;
    handleSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
    show,
    handleClose,
    employee,
    onEmployeeEdited,
    handleSave,
}) => {
    const [formData, setFormData] = useState<Employee | null>(null);
    const [backendError, setBackendError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (employee) {
            setFormData({ ...employee }); // Ensure a fresh copy of the employee object
        }
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData ? { ...prevData, [name]: value } : prevData
        );
    };

    const handleSubmit = async () => {
        setBackendError(null);
        setSuccessMessage(null);

        if (!formData) {
            setBackendError("No employee data provided.");
            return;
        }

        // Basic client-side validation
        // if (!formData.fullname || !formData.email || !formData.phone || !formData.position || !formData.department
        //     || !formData.hire_date || !formData.payment_method || !formData.salary || !formData.bank_account
        //     || !formData.status || !formData.bank_name || !formData.bank_code || !formData.KRA_pin || !formData.national_id
        //     || !formData.payment_frequency
        // ) {
        //     setBackendError("Please fill in all required fields.");
        //     return;
        // }

        try {
            const response = await fetch(
                `http://localhost:5000/api/employees/${formData.employee_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update employee");
            }

            setSuccessMessage("Employee updated successfully!");
            alert("Employee updated successfully!");
            onEmployeeEdited();
            const updatedEmployee = await response.json();
            handleSave(updatedEmployee);
            setTimeout(handleClose, 1000); // Close modal after a short delay
        } catch (error: any) {
            console.error("Error updating employee:", error);
            setBackendError(error.message || "An unexpected error occurred.");
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-md z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

                {backendError && (
                    <div className="text-red-600 bg-red-100 p-2 rounded">{backendError}</div>
                )}
                {successMessage && (
                    <div className="text-green-600 bg-green-100 p-2 rounded">{successMessage}</div>
                )}

                {formData && (
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Full Name", name: "fullname", type: "text" },
                                { label: "Email", name: "email", type: "email" },
                                { label: "Phone", name: "phone", type: "text" },
                                { label: "National ID", name: "national_id", type: "text" },
                                { label: "KRA PIN", name: "KRA_pin", type: "text" },
                                { label: "Position", name: "position", type: "text" },
                                { label: "Department", name: "department", type: "text" },
                                { label: "Hire Date", name: "hire_date", type: "date" },
                                { label: "Salary", name: "salary", type: "number" },
                                { label: "Bank Name", name: "bank_name", type: "text" },
                                { label: "Bank Code", name: "bank_code", type: "text" },
                                { label: "Bank Account", name: "bank_account", type: "text" },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof Employee] || ""}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                            ))}

                            {/* Select Fields */}
                            {[
                                {
                                    label: "Payment Method",
                                    name: "payment_method",
                                    options: [
                                        { value: "bank", label: "Bank" },
                                        { value: "mpesa", label: "M-Pesa" },
                                    ],
                                },
                                {
                                    label: "Payment Frequency",
                                    name: "payment_frequency",
                                    options: [
                                        { value: "monthly", label: "Monthly" },
                                        { value: "bi-weekly", label: "Bi-Weekly" },
                                        { value: "weekly", label: "Weekly" },
                                        { value: "hourly", label: "Hourly" },
                                    ],
                                },
                                {
                                    label: "Status",
                                    name: "status",
                                    options: [
                                        { value: "active", label: "Active" },
                                        { value: "inactive", label: "Inactive" },
                                    ],
                                },
                            ].map((select) => (
                                <div key={select.name}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {select.label}
                                    </label>
                                    <select
                                        name={select.name}
                                        value={formData[select.name as keyof Employee] || ""}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    >
                                        {select.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </form>
                )}

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
