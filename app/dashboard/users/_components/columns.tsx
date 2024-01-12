"use client";

import { Button } from "@/components/ui/button";
import { UserManagementData } from "@/lib/hooks/useUserManagement";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash } from "iconsax-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function editUser(user: UserManagementData) {
  // edit user logic
  console.log(user, "edit user");
}

function deleteUser(user: UserManagementData) {
  // delete user logic
  console.log(user, "delete user");
}

export const columns: ColumnDef<UserManagementData>[] = [
  {
    header: "Name",
    cell: (info) =>
      `${info.row.original.firstName} ${info.row.original.lastName}`,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "roles",
    cell: (info) => info.row.original.roles[0] || "",
  },
  {
    header: "Access",
    cell: (info) =>
      info.row.original.roles.includes("ClientAdmins") ? "Full" : "Custom",
  },
  {
    header: "Actions",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Edit2 variant="Bulk" onClick={() => editUser(info.row.original)} />
        <Trash variant="Bulk" onClick={() => deleteUser(info.row.original)} />
      </div>
    ),
  },
];
