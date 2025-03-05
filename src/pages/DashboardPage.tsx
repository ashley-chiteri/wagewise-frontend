import React, { useEffect, useState } from 'react';
import SideNav from "../components/ui/SideNav";
import MonthlyExpenditureChart from "../components/ui/MonthlyExpenditureChart";
import MyCalendar from "../components/ui/Calender";

const DashboardPage: React.FC = () => {

    const [currentDate, setCurrentDate] = useState("");
    const [activeEmployees, setActiveEmployees] = useState(0);
    const [totalSpentLastMonth, setTotalSpentLastMonth] = useState(0);
    const [dueSoonCount, setDueSoonCount] = useState(0);

    //showing the date
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });

        setCurrentDate(formattedDate);
    }, []);

    //fetching total active employees
    useEffect(() => {
        fetch("http://localhost:5000/api/employees/active-count")
            .then((res) => res.json())
            .then((data) => setActiveEmployees(data.totalActiveEmployees))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    //fetching total spent last month
    useEffect(() => {
        fetch("http://localhost:5000/api/payments/last-month-total")
            .then((res) => res.json())
            .then((data) => setTotalSpentLastMonth(data.totalSpent))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    //fetching due soon count
    useEffect(() => {
        fetch("http://localhost:5000/api/payments/due-soon-count") // Adjust the URL if needed
            .then((response) => response.json())
            .then((data) => setDueSoonCount(data.dueSoonCount))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <SideNav />

            {/* Main Content */}
            <div className="flex flex-col gap-5 w-full h-full p-6 max-w-7xl mx-auto">
                {/* Date */}
                <p className="text-[#99A3B3] text-sm">{currentDate}</p>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex-1 min-w-[280px] h-[200px] rounded-lg bg-white shadow-lg">
                        <div className="p-6">
                            <h2 className="text-[#99A3B3] text-lg">Total Employees</h2>
                            <p className="text-3xl">{activeEmployees}</p>
                        </div>
                    </div>
                    <div className="flex-1 min-w-[280px] h-[200px] rounded-lg bg-white shadow-lg">
                        <div className="p-6">
                            <h2 className="text-[#99A3B3] text-lg">Total Spent Last Month</h2>
                            <p className="font-sans text-3xl">KES {totalSpentLastMonth.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex-1 min-w-[280px] h-[200px] rounded-lg bg-white shadow-lg">
                        <div className="p-6">
                            <h2 className="text-[#99A3B3] text-lg">Due Soon</h2>
                            <p className="text-3xl">{dueSoonCount}</p>
                        </div>
                    </div>
                </div>

                {/* Graph & Calendar Section */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 sm:col-span-1 md:col-span-2 h-[350px] rounded-lg bg-white shadow-lg">
                        <MonthlyExpenditureChart />
                    </div>
                    <div className="h-[350px] rounded-lg bg-white shadow-lg">
                        <div className="p-5">
                            <h1 className="text-lg text-[#99A3B3] mb-1">Calendar</h1>
                            <MyCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};
export default DashboardPage;