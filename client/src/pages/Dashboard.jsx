import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const userId = storedUser.id;

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch notes on mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes`, { params: { userId } })
      .then((res) => setNotes(res.data.notes))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load notes.");
      });
  }, []);

  const handleAddNote = () => {
    const trimmed = newNote.trim();
    if (!trimmed) {
      toast.error("Note cannot be empty.");
      return;
    }

    axios
      .post("http://localhost:5000/api/notes", {
        userId,
        content: trimmed,
      })
      .then((res) => {
        setNotes([res.data.note, ...notes]);
        setNewNote("");
        setOpen(false);
        toast.success("Note added successfully.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add note.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`, {
        data: { userId },
      })
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
        toast.info("Note deleted.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete note.");
      });
  };

  const handleLogout = () => {
    localStorage.clear();

    toast.success("Logged out successfully.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md md:max-w-1/2 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 transition-transform duration-300 ease-in-out hover:scale-[1.01]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
          <button
            className="text-sm text-blue-600 font-medium hover:underline transition-all"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-white shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">
            Welcome, {storedUser.name}
          </p>
          <p className="text-sm text-gray-500">Email: {storedUser.email}</p>
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

        <h2 className="text-sm font-semibold text-gray-800 mb-2">Your Notes</h2>
        <div className="space-y-2">
          {notes.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-4">
              📝 Create your first note!
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-sm text-gray-800">{note.content}</span>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
