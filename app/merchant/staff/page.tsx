"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Shield } from "lucide-react";

const staff = [
  { name: "Rafiqul Islam", email: "rafiqul@techzonebd.com", mobile: "01712345678", role: "Owner", status: "Active", added: "Jan 10, 2026" },
  { name: "Tahmina Akter", email: "tahmina@techzonebd.com", mobile: "01812345678", role: "Manager", status: "Active", added: "Feb 5, 2026" },
  { name: "Sajib Hasan", email: "sajib@techzonebd.com", mobile: "01612345678", role: "Support", status: "Active", added: "Mar 12, 2026" },
];

const roleBadge = (r: string) => {
  const map: Record<string, string> = {
    Owner: "bg-purple-100 text-purple-700", Manager: "bg-blue-100 text-blue-700", Support: "bg-emerald-100 text-emerald-700",
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[r]}`}>{r}</span>;
};

const rolePermissions: Record<string, string[]> = {
  Owner: ["Full access to everything"],
  Manager: ["Orders", "Products", "Customers", "Reports", "Coupons"],
  Support: ["Orders (view only)", "Customers (view only)"],
};

export default function StaffPage() {
  return (
    <>
      <MerchantHeader title="Staff Users" />
      <main className="flex-1 p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Invite staff */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
            <h3 className="font-semibold text-slate-900 mb-5">Invite Staff Member</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Full Name</label><Input placeholder="Staff name" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Email Address</label><Input type="email" placeholder="staff@email.com" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Mobile Number</label><Input placeholder="01XXXXXXXXX" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Role</label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Manager</option><option>Support</option>
                </select>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-700 flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" />Role Permissions</p>
                {Object.entries(rolePermissions).filter(([r]) => r !== "Owner").map(([role, perms]) => (
                  <div key={role}>
                    <p className="text-xs font-medium text-slate-600 mb-1">{role}:</p>
                    <div className="flex flex-wrap gap-1">
                      {perms.map((p, i) => <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">{p}</span>)}
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Send Invitation</Button>
            </div>
          </div>

          {/* Staff List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Team Members (3 / 3 used)</h3>
              <p className="text-xs text-slate-500">Growth plan: 3 staff users</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead><TableHead>Mobile</TableHead><TableHead>Role</TableHead>
                    <TableHead>Status</TableHead><TableHead>Added</TableHead><TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((s, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{s.name[0]}</div>
                          <div><p className="font-medium text-sm text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.email}</p></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{s.mobile}</TableCell>
                      <TableCell>{roleBadge(s.role)}</TableCell>
                      <TableCell><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{s.status}</span></TableCell>
                      <TableCell className="text-xs text-slate-500">{s.added}</TableCell>
                      <TableCell>
                        {s.role !== "Owner" && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
