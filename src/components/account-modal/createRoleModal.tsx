"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface RoleField {
  id: string;
  label: string;
  value: string;
}

interface RoleModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function CreateRole({ show, onClose, onSave }: RoleModalProps) {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState("");
  const [fields, setFields] = useState<RoleField[]>([
    { id: crypto.randomUUID(), label: "Field Type", value: "" },
  ]);

  if (!show) return null;

  const addField = () => {
    setFields([
      ...fields,
      { id: crypto.randomUUID(), label: "Field Type", value: "" },
    ]);
  };

  const updateField = (id: string, value: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSave = () => {
    onSave({
      roleName,
      permissions,
      fields,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-[452px] max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl p-8 relative custom-scroll">
        {/* TRASH */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-600 hover:text-red-500"
        >
          <Trash2 size={22} />
        </button>

        {/* ADD */}
        <button
          onClick={addField}
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm mb-6"
        >
          <Plus size={16} /> Add field
        </button>

        {/* ROLE NAME */}
        <input
          type="text"
          placeholder="Role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full rounded-full bg-white shadow-style p-3 mb-3 text-sm"
        />

        {/* PERMISSIONS */}
        <input
          type="text"
          placeholder="Permissions"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          className="w-full rounded-full bg-white shadow-style p-3 mb-3 text-sm"
        />

        {/* FIELDS */}
        {fields.map((field) => (
          <div key={field.id} className="flex items-center gap-3 mb-3">
            <input
              type="text"
              placeholder={field.label}
              value={field.value}
              onChange={(e) => updateField(field.id, e.target.value)}
              className="flex-1 rounded-full bg-white shadow-style p-3 text-sm"
            />
            <button
              onClick={() => removeField(field.id)}
              className="text-gray-500 hover:text-primary"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {/* SAVE */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-button text-white px-12 py-2 rounded-full"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
