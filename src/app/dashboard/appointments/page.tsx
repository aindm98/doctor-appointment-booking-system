"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./../../components/nav/navbar";
import Header from "./../../components/header/header";
import { PlusIcon } from "lucide-react";
import appointment from "./../../api/appointment.json";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";

const Appointments = () => {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "speciality",
      label: "SPECIALITY",
    },
    {
      key: "doctor",
      label: "DOCTOR NAME",
    },
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "time",
      label: "TIME",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <>
      <Navbar>
        <Header />
        <div className="p-5 mt-5  lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-end">
            <Button
              color="primary"
              size="md"
              endContent={<PlusIcon size={20} />}
            >
              Add New Appointment
            </Button>
          </div>
          <Table
            aria-label="Customer table"
            isHeaderSticky
            classNames={{
              wrapper: "shadow-md mt-4",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {appointment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.speciality}</TableCell>
                  <TableCell>{item.doctor}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Navbar>
    </>
  );
};
export default Appointments;
