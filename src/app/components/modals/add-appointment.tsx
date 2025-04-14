"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Input,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import Select from "./../forms/Select";
import { ChevronDown } from "lucide-react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { time } from "console";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  selectedEvent?: Event;
}


interface IFormInput {
  name: String;
  doctor: String;
  startDate: Date | null;
  endDate: Date | null;
  speciality: String;
  time: string;
}

const AddAppointment = ({ isOpen, onClose, onOpenChange, selectedEvent }: ModalProps) => {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      doctor: "",
      startDate: new Date(),
      endDate: new Date(),
      time: "",
    },
  });


  const options = [
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Neurologist", label: "Neurologist" },
    { value: "Surgeon", label: "Surgeon" },
    { value: "Orthopedic", label: "Orthopedic" },
    { value: "Gynecologist", label: "Gynecologist" },
  ];

  const onSubmit = (data: FieldValues) => {
    console.log("data", data);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="center" className=" p-6 lg:p-10">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-3 lg:p-5">
                Schedule An Appointment
                {selectedEvent ? "Edit Event" : "Add Event"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                  <form className="flex flex-col gap-5">
                    <label className=" block text-sm font-medium text-gray-700 dark:text-gray-400">
                     Name
                    </label>
                    <input
                      id="event-title"
                      type="text"
                      {...register("name", { required: true })}
                      className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                     Doctor Name
                    </label>
                    <input
                      id="event-title"
                      type="text"
                      {...register("doctor", { required: true })}
                      className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                    <div>
                      <label className=" block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Event Title
                      </label>
                      <div className="relative mt-5">
  <Controller
    name="speciality"
    control={control}
    render={({ field }) => (
      <div>
        <Select
          {...field}
          options={options}
          placeholder="Select Option"
          className="react-select-container"
          
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <ChevronDown />
        </span>
      </div>
    )}
  />
</div>
                    </div>
                    
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter Start Date
              </label>
              <div className="relative">
                <input
                  id="event-start-date"
                  type="date"
                  // value={eventStartDate}
                  // onChange={(e) => setEventStartDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              
            </div>

            
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter End Date
              </label>
              <div className="relative">
                <input
                  id="event-end-date"
                  type="date"
                  // value={eventEndDate}
                  // onChange={(e) => setEventEndDate(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
          
            </div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Time
              </label>
              <input
                      // {...register("time", { required: true })}
                      type="time"
                      required
                      min="00:00"
                      max="24:00"
                      className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

<Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={handleSubmit(onSubmit)}>
                      Book Appointment
                    </Button>
                  </form>
                </div>

                {/* <form
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    label="Name"
                    labelPlacement="outside"
                    isRequired
                    {...register("name", { required: true })}
                    placeholder="Enter your name"
                  />
                  <Select
                    label="Speciality"
                    labelPlacement="outside"
                    className="mt-2"
                    {...register("speciality")}
                    isRequired
                    placeholder="Select speciality"
                  >
                    <SelectItem key="Cardiologist">Cardiologist</SelectItem>
                    <SelectItem key="Neurologist">Neurologist</SelectItem>
                    <SelectItem key="Gynecologist">Gynedcologist</SelectItem>
                    <SelectItem key="Orthopedic">Orthopeic</SelectItem>
                    <SelectItem key="Surgeon">Surgeon</SelectItem>
                  </Select>
                  <Input
                    label="Doctor Name"
                    className="mt-2"
                    labelPlacement="outside"
                    {...register("doctor", { required: true })}
                    isRequired
                    placeholder="Enter doctor name"
                  />

                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                        isRequired
                        className=""
                        
                        onChange={(e) => field.onChange(e)}
                        value={field?.value}
                        label="Start Date"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePicker
                        isRequired
                        className=""
                        onChange={(e) => field.onChange(e)}
                        
                        value={field?.value}
                        label="End Date"
                      />
                    )}
                  />

                  <label
                    htmlFor="time"
                    className="block text-sm font-medium 5 dark:text-white"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <Input
                      {...register("time", { required: true })}
                      type="time"
                      required
                      min="00:00"
                      max="24:00"
                      className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                   
                  </div>
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center md:justify-end xl:justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={handleSubmit(onSubmit)}>
                      Book Appointment
                    </Button>
                  </div>
                </form> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAppointment;
