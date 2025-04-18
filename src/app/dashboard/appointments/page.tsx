"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./../../components/nav/navbar";
import Header from "./../../components/nav/header";
import { MdDelete } from "./../../components/ui/icons/icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

const Appointments = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
    {
      key: "action",
      label: "ACTION",
    },
  ];

  const appointments = [
    {
      id: 1,
      name: "John Doe",
      speciality: "Cardiology",
      doctor: "Dr. Smith",
      date: "2023-10-01",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Jane Smith",
      speciality: "Dermatology",
      doctor: "Dr. Johnson",
      date: "2023-10-02",
      time: "11:00 AM",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      speciality: "Pediatrics",
      doctor: "Dr. Brown",
      date: "2023-10-03",
      time: "12:00 PM",
      status: "Cancelled",
    },
    {
      id: 4,
      name: "Bob Williams",
      speciality: "Orthopedics",
      doctor: "Dr. Davis",
      date: "2023-10-04",
      time: "01:00 PM",
      status: "Confirmed",
    },
    {
      id: 5,
      name: "Charlie Brown",
      speciality: "Neurology",
      doctor: "Dr. Wilson",
      date: "2023-10-05",
      time: "02:00 PM",
      status: "Pending",
    },
  ];

  return (
    <>
      <Navbar>
        <Header />
        <div className="p-5 mt-5  lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-end">
            <Button
              onPress={onOpen}
              color="primary"
              size="md"
              //   endContent={<PlusIcon size={20} />}
            >
              Schedule Appointment
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
              {appointments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.speciality}</TableCell>
                  <TableCell>{item.doctor}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        onPress={onOpen}
                        variant="light"
                        radius="full"
                        size="sm"
                        color="danger"
                        isIconOnly
                      >
                        <MdDelete size={20} />
                      </Button>
                    </div>
                  </TableCell>
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
