import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [notes, setNotes] = useState(["Note 1", "Note 2"]);
  const [newNote, setNewNote] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddNote = () => {
    const trimmed = newNote.trim();
    if (!trimmed) {
      toast.error("Note cannot be empty.");
      return;
    }
    if (notes.includes(trimmed)) {
      toast.warning("This note already exists.");
      return;
    }

    setNotes([...notes, trimmed]);
    setNewNote("");
    setOpen(false);
    toast.success("Note added successfully.");
  };

  const handleDelete = (index) => {
    const deleted = notes[index];
    setNotes(notes.filter((_, i) => i !== index));
    toast.info(`Deleted: ${deleted}`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md md:max-w-1/2 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 transition-transform duration-300 ease-in-out hover:scale-[1.01]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
          <button
            className="text-sm text-blue-600 font-medium hover:underline transition-all"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Section */}
        <div className="mb-6 p-4 rounded-xl bg-white shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">
            Welcome, Jonas Kahnwald!
          </p>
          <p className="text-sm text-gray-500">Email: xxxxx@xxxx.com</p>
        </div>

        {/* Create Note Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white">
              Create Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm animate-in fade-in zoom-in duration-200">
            <DialogHeader>
              <DialogTitle className="text-lg">Add a new note</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter your note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="mt-2"
            />
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleAddNote}
                className="text-white bg-blue-600 hover:bg-blue-700"
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notes Section */}
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Your Notes</h2>
        <div className="space-y-2">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="text-sm text-gray-800">{note}</span>
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
