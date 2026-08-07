"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageCircle, Clock, CheckCircle, AlertCircle, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Ticket = {
  id: string;
  merchant: string;
  subject: string;
  priority: string;
  status: string;
  time: string;
  message: string;
};

const initialTickets: Ticket[] = [
  { id: "#T-2041", merchant: "Dhaka Fashion Hub", subject: "Payment gateway not working", priority: "High", status: "Open", time: "2 hours ago", message: "I added my bKash credentials but the payment option isn't showing at checkout. Please help." },
  { id: "#T-2038", merchant: "Tech Gadgets BD", subject: "Custom domain not connecting", priority: "High", status: "In Progress", time: "5 hours ago", message: "I pointed the CNAME to stores.ccommerce.com.bd but the site still shows an error." },
  { id: "#T-2035", merchant: "Green Agro Store", subject: "Products not showing on storefront", priority: "Medium", status: "Open", time: "1 day ago", message: "I published my products but customers can't see them in the shop." },
  { id: "#T-2030", merchant: "Baby World Shop", subject: "How to add staff member?", priority: "Low", status: "Resolved", time: "2 days ago", message: "I want to add an employee to manage orders but can't find the option." },
  { id: "#T-2025", merchant: "Sylhet Handicrafts", subject: "Invoice PDF download issue", priority: "Low", status: "Resolved", time: "3 days ago", message: "When I click Download Invoice, nothing happens." },
];

const priorityBadge = (p: string) => {
  if (p === "High") return <Badge variant="destructive">{p}</Badge>;
  if (p === "Medium") return <Badge variant="warning">{p}</Badge>;
  return <Badge variant="secondary">{p}</Badge>;
};

const statusBadge = (s: string) => {
  if (s === "Open") return <Badge className="bg-blue-100 text-blue-700 border-0">{s}</Badge>;
  if (s === "In Progress") return <Badge variant="warning">{s}</Badge>;
  return <Badge variant="success">{s}</Badge>;
};

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

function loadTickets(): Ticket[] {
  if (typeof window === "undefined") return initialTickets;
  try {
    const raw = localStorage.getItem("admin_tickets");
    return raw ? JSON.parse(raw) : initialTickets;
  } catch { return initialTickets; }
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(initialTickets[0]);
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState("tickets");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadTickets();
    setTickets(loaded);
    setSelectedTicket(loaded[0]);
  }, []);

  const saveTickets = (updated: Ticket[]) => {
    setTickets(updated);
    localStorage.setItem("admin_tickets", JSON.stringify(updated));
  };

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = tickets.filter(t => {
    const matchSearch = t.merchant.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || t.status === statusFilter;
    const matchPriority = priorityFilter === "All Priority" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const handleOpenTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyText("");
    setActiveTab("reply");
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    const updated = tickets.map(t =>
      t.id === selectedTicket.id ? { ...t, status: "In Progress" } : t
    );
    saveTickets(updated);
    setReplyText("");
    showToast(`Reply sent to ${selectedTicket.merchant}!`);
  };

  const handleMarkResolved = () => {
    const updated = tickets.map(t =>
      t.id === selectedTicket.id ? { ...t, status: "Resolved" } : t
    );
    saveTickets(updated);
    setSelectedTicket({ ...selectedTicket, status: "Resolved" });
    showToast(`Ticket ${selectedTicket.id} marked as resolved.`);
  };

  const openCount = tickets.filter(t => t.status === "Open").length;
  const inProgressCount = tickets.filter(t => t.status === "In Progress").length;
  const resolvedToday = tickets.filter(t => t.status === "Resolved").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
        <p className="text-slate-500 text-sm mt-1">Handle merchant support requests from the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Open Tickets", value: String(openCount), icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "In Progress", value: String(inProgressCount), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Resolved Today", value: String(resolvedToday), icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg. Response", value: "2.4h", icon: MessageCircle, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4 flex items-center gap-3`}>
            <s.icon className={`w-8 h-8 ${s.color}`} />
            <div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="reply">
            Reply to Ticket {selectedTicket && <span className="ml-1 text-xs opacity-70">{selectedTicket.id}</span>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-9"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <select
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none"
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
              >
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Ticket", "Merchant", "Subject", "Priority", "Status", "Time", "Actions"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-10 text-slate-400">No tickets found</td></tr>
                  ) : filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">{t.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{t.merchant}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{t.subject}</td>
                      <td className="px-4 py-3">{priorityBadge(t.priority)}</td>
                      <td className="px-4 py-3">{statusBadge(t.status)}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{t.time}</td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          className="gradient-primary text-white border-0 text-xs"
                          onClick={() => handleOpenTicket(t)}
                        >
                          Open
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reply" className="mt-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-2xl space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-slate-900">Reply to {selectedTicket.id}</h3>
              {statusBadge(selectedTicket.status)}
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-900 mb-1">{selectedTicket.merchant} — &ldquo;{selectedTicket.subject}&rdquo;</p>
              <p>{selectedTicket.message}</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Your Reply</label>
              <Textarea
                rows={5}
                placeholder="Type your response here..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                className="gradient-primary text-white border-0"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
              >
                Send Reply
              </Button>
              <Button
                variant="outline"
                onClick={handleMarkResolved}
                disabled={selectedTicket.status === "Resolved"}
              >
                Mark as Resolved
              </Button>
              <Button variant="ghost" className="ml-auto text-slate-500" onClick={() => setActiveTab("tickets")}>
                ← Back to Tickets
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
