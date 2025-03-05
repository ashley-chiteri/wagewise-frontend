import SideNav from "../components/ui/SideNav";
import EmployeeTable from "../components/ui/EmployeeTable";

const EmployeePage = () => {
return (
    <div className="flex h-screen bg-gray-50">
            <SideNav />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-medium p-3">Employee management</h1>
                {/* Your dashboard content */}
                <EmployeeTable />
                
            </div>
        </div>
)
}

export default EmployeePage;
