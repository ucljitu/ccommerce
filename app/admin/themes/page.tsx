"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Star, CheckCircle, X } from "lucide-react";

type Theme = {
  id: string;
  name: string;
  desc: string;
  preview: string;
  popular: boolean;
  active: boolean;
  category: string;
};

const initialThemes: Theme[] = [
  { id: "t1", name: "Classic Blue", desc: "Clean, professional look with blue accents. Great for general stores.", preview: "🔵", popular: true, active: true, category: "General" },
  { id: "t2", name: "Fashion Dark", desc: "Elegant dark theme with gold accents. Perfect for fashion & luxury.", preview: "🖤", popular: false, active: true, category: "Fashion" },
  { id: "t3", name: "Fresh Green", desc: "Natural green palette, ideal for organic, food, and agro stores.", preview: "🟢", popular: false, active: true, category: "Food & Agro" },
  { id: "t4", name: "Tech Minimal", desc: "Ultra-clean white & gray. Best for electronics and gadget stores.", preview: "⚪", popular: true, active: true, category: "Electronics" },
  { id: "t5", name: "Warm Craft", desc: "Earthy tones for handmade, craft, and artisan shops.", preview: "🟤", popular: false, active: false, category: "Crafts" },
  { id: "t6", name: "Baby Pastel", desc: "Soft pastel colors for baby, kids, and toy stores.", preview: "🩷", popular: false, active: true, category: "Baby & Kids" },
];

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      {msg}
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

function loadThemes(): Theme[] {
  if (typeof window === "undefined") return initialThemes;
  try {
    const raw = localStorage.getItem("admin_themes");
    return raw ? JSON.parse(raw) : initialThemes;
  } catch { return initialThemes; }
}

export default function AdminThemesPage() {
  const [themes, setThemes] = useState(initialThemes);

  useEffect(() => { setThemes(loadThemes()); }, []);

  const saveThemes = (updated: Theme[]) => {
    setThemes(updated);
    localStorage.setItem("admin_themes", JSON.stringify(updated));
  };
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [editTheme, setEditTheme] = useState<Theme | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTheme, setNewTheme] = useState({ name: "", desc: "", preview: "🎨", category: "General" });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleToggle = (id: string) => {
    const updated = themes.map(t => t.id === id ? { ...t, active: !t.active } : t);
    saveThemes(updated);
    const theme = updated.find(t => t.id === id)!;
    showToast(`${theme.name} ${theme.active ? "activated" : "deactivated"}.`);
  };

  const handleEditSave = () => {
    if (!editTheme) return;
    saveThemes(themes.map(t => t.id === editTheme.id ? editTheme : t));
    showToast(`${editTheme.name} updated!`);
    setEditTheme(null);
  };

  const handleAddTheme = () => {
    if (!newTheme.name) return;
    const t: Theme = {
      id: `t${Date.now()}`,
      name: newTheme.name,
      desc: newTheme.desc,
      preview: newTheme.preview || "🎨",
      category: newTheme.category,
      popular: false,
      active: true,
    };
    saveThemes([...themes, t]);
    setNewTheme({ name: "", desc: "", preview: "🎨", category: "General" });
    setShowAdd(false);
    showToast(`Theme "${t.name}" added!`);
  };

  const activeCount = themes.filter(t => t.active).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Theme Management</h1>
        <p className="text-slate-500 text-sm mt-1">Manage storefront themes available to merchants on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Themes", value: String(themes.length), color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active", value: String(activeCount), color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Most Used", value: "Classic Blue", color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Coming Soon", value: "3", color: "text-slate-600", bg: "bg-slate-100" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4`}>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Themes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {themes.map((theme) => (
          <div key={theme.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="w-full h-28 bg-slate-50 rounded-xl flex items-center justify-center text-5xl mb-4 relative">
              {theme.preview}
              {theme.popular && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-medium px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3" /> Popular
                </div>
              )}
              {!theme.active && (
                <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Inactive</span>
                </div>
              )}
            </div>

            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-slate-900">{theme.name}</h3>
                <Badge variant="secondary" className="text-xs mt-1">{theme.category}</Badge>
              </div>
              <Switch checked={theme.active} onCheckedChange={() => handleToggle(theme.id)} />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">{theme.desc}</p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5 text-xs"
                onClick={() => setPreviewTheme(theme)}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </Button>
              <Button
                size="sm"
                className="flex-1 gradient-primary text-white border-0 text-xs"
                onClick={() => setEditTheme({ ...theme })}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Theme */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
        <p className="text-slate-500 mb-3">Want to add a new theme to the marketplace?</p>
        <Button className="gradient-primary text-white border-0" onClick={() => setShowAdd(true)}>
          + Add New Theme
        </Button>
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewTheme} onOpenChange={() => setPreviewTheme(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Theme Preview — {previewTheme?.name}</DialogTitle></DialogHeader>
          {previewTheme && (
            <div className="space-y-4">
              <div className="w-full h-48 bg-slate-50 rounded-xl flex items-center justify-center text-8xl border border-slate-100">
                {previewTheme.preview}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">{previewTheme.name}</h3>
                  <Badge variant="secondary">{previewTheme.category}</Badge>
                  {previewTheme.popular && <Badge className="bg-amber-100 text-amber-700 border-0">Popular</Badge>}
                </div>
                <p className="text-sm text-slate-500">{previewTheme.desc}</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gradient-primary text-white border-0" onClick={() => { setPreviewTheme(null); setEditTheme({ ...previewTheme }); }}>Edit Theme</Button>
                <Button variant="outline" className="flex-1" onClick={() => setPreviewTheme(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editTheme} onOpenChange={() => setEditTheme(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit Theme — {editTheme?.name}</DialogTitle></DialogHeader>
          {editTheme && (
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Theme Name</Label>
                <Input value={editTheme.name} onChange={e => setEditTheme({ ...editTheme, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Input value={editTheme.category} onChange={e => setEditTheme({ ...editTheme, category: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <textarea
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  value={editTheme.desc}
                  onChange={e => setEditTheme({ ...editTheme, desc: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-3">
                <Label>Popular</Label>
                <Switch checked={editTheme.popular} onCheckedChange={v => setEditTheme({ ...editTheme, popular: v })} />
                <Label className="ml-4">Active</Label>
                <Switch checked={editTheme.active} onCheckedChange={v => setEditTheme({ ...editTheme, active: v })} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 gradient-primary text-white border-0" onClick={handleEditSave}>Save Changes</Button>
                <Button variant="outline" className="flex-1" onClick={() => setEditTheme(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Theme Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Theme</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Theme Name *</Label>
              <Input placeholder="e.g. Ocean Blue" value={newTheme.name} onChange={e => setNewTheme({ ...newTheme, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Input placeholder="e.g. Fashion" value={newTheme.category} onChange={e => setNewTheme({ ...newTheme, category: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Preview Emoji</Label>
                <Input placeholder="🎨" value={newTheme.preview} onChange={e => setNewTheme({ ...newTheme, preview: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <textarea
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Describe this theme..."
                value={newTheme.desc}
                onChange={e => setNewTheme({ ...newTheme, desc: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 gradient-primary text-white border-0" onClick={handleAddTheme}>Add Theme</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
