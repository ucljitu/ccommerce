"use client";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, MessageCircle, ExternalLink } from "lucide-react";

const tickets = [
  { id: "#TKT001", subject: "bKash payment not received", priority: "High", status: "Open", created: "Jun 25", updated: "2 hours ago" },
  { id: "#TKT002", subject: "How to add custom domain?", priority: "Normal", status: "Answered", created: "Jun 23", updated: "Jun 24" },
  { id: "#TKT003", subject: "Product import CSV template", priority: "Low", status: "Closed", created: "Jun 20", updated: "Jun 21" },
  { id: "#TKT004", subject: "District delivery charge not saving", priority: "High", status: "Open", created: "Jun 25", updated: "1 hour ago" },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = { Open: "bg-amber-100 text-amber-700", Answered: "bg-blue-100 text-blue-700", Closed: "bg-slate-100 text-slate-600" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[s]}`}>{s}</span>;
};
const priorityBadge = (p: string) => {
  const map: Record<string, string> = { High: "bg-red-100 text-red-700", Normal: "bg-slate-100 text-slate-600", Low: "bg-emerald-100 text-emerald-700" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[p]}`}>{p}</span>;
};

export default function SupportPage() {
  return (
    <>
      <MerchantHeader title="Support" />
      <main className="flex-1 p-6 space-y-5">
        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Help Center", desc: "Browse tutorials and guides", icon: "📚", href: "#" },
            { title: "WhatsApp Support", desc: "Chat with our team instantly", icon: "💬", href: "#" },
            { title: "Video Tutorials", desc: "Step-by-step video guides", icon: "🎥", href: "#" },
          ].map((item, i) => (
            <a key={i} href={item.href} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </a>
          ))}
        </div>

        <Tabs defaultValue="tickets">
          <TabsList><TabsTrigger value="tickets">My Tickets</TabsTrigger><TabsTrigger value="new">New Ticket</TabsTrigger></TabsList>

          <TabsContent value="tickets">
            <div className="bg-white rounded-xl border border-slate-200 mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead><TableHead>Subject</TableHead><TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead>Last Updated</TableHead><TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs text-blue-600">{t.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{t.subject}</TableCell>
                      <TableCell>{priorityBadge(t.priority)}</TableCell>
                      <TableCell>{statusBadge(t.status)}</TableCell>
                      <TableCell className="text-xs text-slate-500">{t.created}</TableCell>
                      <TableCell className="text-xs text-slate-500">{t.updated}</TableCell>
                      <TableCell><Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600 gap-1"><MessageCircle className="w-3.5 h-3.5" />View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="bg-white rounded-xl border border-slate-200 p-6 mt-4 max-w-xl space-y-4">
              <h3 className="font-semibold text-slate-900">Submit a Support Ticket</h3>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Subject *</label><Input placeholder="Brief description of your issue" /></div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Priority</label>
                <select className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Normal</option><option>High</option><option>Low</option>
                </select>
              </div>
              <div><label className="text-xs font-medium text-slate-500 block mb-1.5">Message *</label><Textarea placeholder="Describe your issue in detail..." rows={5} /></div>
              <Button className="gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" />Submit Ticket</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
