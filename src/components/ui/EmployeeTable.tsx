import { useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import Loader from "./Loader";
import AddEmployeeDialog from "./AddEmployeeDialog";
import EditEmployeeModal from "./EditEmployeeDialog";
import { Pencil, Trash, Plus, CheckSquare, Square, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function EmployeeTable() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState<Set<number>>(new Set());
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/employees");
            const data: Employee[] = await response.json();
            setEmployees(data);
        } catch (error) {
            toast.success(" Error fetching employees", {
                duration: 3000,
              });
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (employee: Employee) => {
        setEditingEmployee(employee);
        setShowEditModal(true);
    };

    const handleSave = (updatedEmployee: Employee) => {
        setEmployees((prev) => prev.map((emp) => emp.employee_id === updatedEmployee.employee_id ? updatedEmployee : emp));
        setShowEditModal(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this employee?")) return;
        try {
            await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" });
            setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));
            toast.success("Employee deleted successfully", {
                duration: 3000,
              });
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedEmployees((prev) => {
            const newSelection = new Set(prev);
            newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
            return newSelection;
        });
    };

    const toggleSelectAll = () => {
        setSelectedEmployees(new Set(selectedEmployees.size === currentEmployees.length ? [] : currentEmployees.map(emp => emp.employee_id)));
    };

    const filteredEmployees = employees.filter((emp) =>
        emp && emp.fullname && emp.fullname.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / employeesPerPage));
    const currentEmployees = filteredEmployees.slice((currentPage - 1) * employeesPerPage, currentPage * employeesPerPage);

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            {loading && <Loader />}

            <div className="flex justify-between mb-4">
                <Input
                    type="text"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3"
                />
                <Button className="bg-blue-600 cursor-pointer text-white flex items-center" onClick={() => setShowAddEmployeeModal(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Add Employee
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">
                            <button onClick={toggleSelectAll}>
                                {selectedEmployees.size === currentEmployees.length ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                            </button>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentEmployees.map((emp) => (
                        <TableRow key={emp.employee_id}>
                            <TableCell>
                                <button onClick={() => toggleSelect(emp.employee_id)}>
                                    {selectedEmployees.has(emp.employee_id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                </button>
                            </TableCell>
                            <TableCell>{emp.fullname}</TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.position}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" onClick={() => handleEditClick(emp)} size="icon">
                                    <Pencil className="w-4 h-4 cursor-pointer" />
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(emp.employee_id)}>
                                    <Trash className="w-4 h-4 cursor-pointer" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button variant="outline" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            {showAddEmployeeModal && <AddEmployeeDialog
                isOpen={showAddEmployeeModal}
                onClose={() => setShowAddEmployeeModal(false)}
                onSubmit={(newEmployee) => {
                    setEmployees((prev) => [...prev, newEmployee]); // Update table with new employee
                    setShowAddEmployeeModal(false);
                }}
            />}
            {showEditModal && editingEmployee && <EditEmployeeModal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                employee={editingEmployee}
                handleSave={handleSave}
                onEmployeeEdited={() => fetchEmployees()}
            />}
        </div>
    );
}
