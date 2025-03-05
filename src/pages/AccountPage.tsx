import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import SideNav from "../components/ui/SideNav";

const AccountPage = () => {
    const [userData, setUserData] = useState<{ username: string; password: string }>({ username: "", password: "" });
    const [orgData, setOrgData] = useState<{ orgName: string; orgAddress: string; orgPhone: string; orgEmail: string }>({ orgName: "", orgAddress: "", orgPhone: "", orgEmail: "" });
    const [editType, setEditType] = useState<"organization" | null>(null);
    const [formData, setFormData] = useState(orgData);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://wagewise-backend.onrender.com/api/users")
        .then(res => res.json())
        .then(data => {
            console.log("User API Response:", data); // ✅ Debugging log

            // ✅ Check if data is an array and extract the first user
            if (Array.isArray(data) && data.length > 0) {
                setUserData({ username: data[0].Username, password: data[0].Password || "" });
            } else {
                console.error("Unexpected user API response format:", data);
            }
        })
        .catch(error => console.error("Error fetching user data:", error));

        fetch("https://wagewise-backend.onrender.com/api/organizations")
            .then(res => res.json())
            .then(data => {
                console.log("Organization API Response:", data); // ✅ Debugging log
                if (data) {
                    setOrgData({
                        orgName: data.org_name || "",
                        orgAddress: data.org_address || "",
                        orgPhone: data.org_phone || "",
                        orgEmail: data.org_email || "",
                    });
                } else {
                    console.error("Unexpected organization API response:", data);
                }
            })
            .catch(error => console.error("Error fetching organization data:", error));
    }, []);

    console.log("Current userData:", userData); // ✅ Confirming state updates

    const handleLogout = () => {
        setIsLogoutOpen(false);
        localStorage.removeItem("authToken");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const openEditModal = () => {
        setEditType("organization");
        setFormData(orgData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        fetch("https://wagewise-backend.onrender.com/api/organizations", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(() => {
            setOrgData(formData);
            setEditType(null);
        });
    };

    return (
        <div className="flex h-screen">
            <SideNav />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
                <Tabs defaultValue="account" className="w-full max-w-2xl">
                    <TabsList className="flex space-x-4 border-b">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="organization">Organization</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="account" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Username:</strong> {userData.username || "Not Set"}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Log Out</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button className="mt-4 bg-red-500">Log out</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to log out? You will need to log in again to access your account.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleLogout} className="bg-red-500 text-white">Confirm Logout</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="organization">
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Name:</strong> {orgData.orgName || "Not Set"}</p>
                                <p><strong>Address:</strong> {orgData.orgAddress || "Not Set"}</p>
                                <p><strong>Phone:</strong> {orgData.orgPhone || "Not Set"}</p>
                                <p><strong>Email:</strong> {orgData.orgEmail || "Not Set"}</p>
                                <Button onClick={openEditModal} className="mt-4">Edit</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Edit Modal */}
            <Dialog open={!!editType} onOpenChange={() => setEditType(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Organization Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input name="orgName" value={formData.orgName} onChange={handleChange} placeholder="Organization Name" required />
                        <Input name="orgAddress" value={formData.orgAddress} onChange={handleChange} placeholder="Organization Address" />
                        <Input name="orgPhone" value={formData.orgPhone} onChange={handleChange} placeholder="Organization Phone" />
                        <Input name="orgEmail" type="email" value={formData.orgEmail} onChange={handleChange} placeholder="Organization Email" />
                        <Button onClick={handleSubmit} className="w-full">Save Changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AccountPage;
