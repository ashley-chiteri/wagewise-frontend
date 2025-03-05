import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Button } from "../components/ui/button";
import SideNav from "../components/ui/SideNav";
import { saveAs } from "file-saver";

// Sample data for charts
const sampleData = [
  { name: "Salaries", value: 60000 },
  { name: "Taxes", value: 15000 },
  { name: "Benefits", value: 10000 },
  { name: "Operational Costs", value: 20000 },
];

const barData = [
  { month: "Jan", salary: 20000, tax: 5000 },
  { month: "Feb", salary: 22000, tax: 5500 },
  { month: "Mar", salary: 25000, tax: 6000 },
];

const COLORS = ["#7F5EFD", "#8884d8", "#82ca9d", "#ffc658"];

const ReportPage = () => {
  const [format, setFormat] = useState("pdf");
  const [reportType, setReportType] = useState("employees");

  const handleDownload = () => {
    let data = "";

    if (reportType === "employees") {
      data = "Employee Report\nID, Name, Position\n1, John Doe, Engineer\n2, Jane Doe, Manager";
    } else if (reportType === "spending") {
      data = "Spending Report\nCategory, Amount\nSalaries,60000\nTaxes,15000\nBenefits,10000\nOperational Costs,20000";
    } else if (reportType === "taxes") {
      data = "Tax Report\nMonth, Tax Amount\nJan,5000\nFeb,5500\nMar,6000";
    }

    const blob = new Blob([data], { type: format === "pdf" ? "application/pdf" : "text/csv" });
    saveAs(blob, `${reportType}-report.${format}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Report</h1>

        {/* Report Selection & Download Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700">Generate Report</h2>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
            {/* Report Type Selection */}
            <select
              className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="employees">Employees Report</option>
              <option value="spending">Spending Report</option>
              <option value="taxes">Taxes Report</option>
            </select>

            {/* Format Selection */}
            <select
              className="border border-gray-300 p-2 rounded-md w-full md:w-auto mt-2 md:mt-0"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>

            {/* Download Button */}
            <Button onClick={handleDownload} className="bg-[#7F5EFD] text-white mt-2 md:mt-0">
              Download {format.toUpperCase()}
            </Button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spending Breakdown PieChart */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Spending Breakdown</h2>
            <PieChart width={350} height={350}>
              <Pie data={sampleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {sampleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Monthly Salary & Tax BarChart */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Salary & Tax</h2>
            <BarChart width={350} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#7F5EFD" />
              <Bar dataKey="tax" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
