"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";

const API_KEY = "4f96c12a1589f228614daf7b790a28b40c16ad1d"; // Replace with actual API key
const BASE_URL = "api";
const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const pieData = [
  { name: "Stocks", value: 400 },
  { name: "Bonds", value: 300 },
  { name: "Real Estate", value: 300 },
  { name: "Crypto", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const fetchFinancialInsights = async (userData: {
    income: any;
    expenses: any;
    riskTolerance: any;
  }) => {
    const response = await fetch("/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
    console.log("Financial Insights:", data);
    setUserData(data);
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchFinancialInsights({
        income: 500,
        expenses: 500,
        riskTolerance: 500,
      });
    };

    fetchData();
  }, []);
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {/* Overview Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">$45,231.89</div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">$32,123.45</div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                78 active positions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">$2,400.00</div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">7.2/10</div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Moderate risk profile
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-1 md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // <CopilotSidebar
    // defaultOpen={true}
    // instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
    // labels={{
    //   title: "Coyamin Assistant",
    //   initial: "How can I help you today?",
    // }}
    // >
    //   <div className="flex h-[calc(100vh-3.5rem)]">
    //     <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
    //       {/* Overview Cards */}
    //       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-xl sm:text-2xl font-bold">$45,231.89</div>
    //             <p className="text-xs sm:text-sm text-muted-foreground">+20.1% from last month</p>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">Investments</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-xl sm:text-2xl font-bold">$32,123.45</div>
    //             <p className="text-xs sm:text-sm text-muted-foreground">78 active positions</p>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-xl sm:text-2xl font-bold">$2,400.00</div>
    //             <p className="text-xs sm:text-sm text-muted-foreground">+12% from last month</p>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-xl sm:text-2xl font-bold">7.2/10</div>
    //             <p className="text-xs sm:text-sm text-muted-foreground">Moderate risk profile</p>
    //           </CardContent>
    //         </Card>
    //       </div>

    //       {/* Charts */}
    //       <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-4">
    //         <Card className="col-span-1 md:col-span-2 lg:col-span-4">
    //           <CardHeader>
    //             <CardTitle>Portfolio Overview</CardTitle>
    //           </CardHeader>
    //           <CardContent className="h-[250px] sm:h-[300px]">
    //             <ResponsiveContainer width="100%" height="100%">
    //               <LineChart data={chartData}>
    //                 <CartesianGrid strokeDasharray="3 3" />
    //                 <XAxis dataKey="name" />
    //                 <YAxis />
    //                 <Tooltip />
    //                 <Line type="monotone" dataKey="value" stroke="#8884d8" />
    //               </LineChart>
    //             </ResponsiveContainer>
    //           </CardContent>
    //         </Card>

    //         <Card className="col-span-1 md:col-span-2 lg:col-span-3">
    //           <CardHeader>
    //             <CardTitle>Asset Allocation</CardTitle>
    //           </CardHeader>
    //           <CardContent className="h-[250px] sm:h-[300px]">
    //             <ResponsiveContainer width="100%" height="100%">
    //               <PieChart>
    //                 <Pie data={pieData} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
    //                   {pieData.map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //                   ))}
    //                 </Pie>
    //                 <Tooltip />
    //               </PieChart>
    //             </ResponsiveContainer>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </div>
    //   </div>
    // </CopilotSidebar>
  );
}
