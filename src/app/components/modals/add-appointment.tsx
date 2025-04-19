'use client';
import Reactjs, { useState } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
  } from "@nextui-org/react";

const AppointmnetModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return(
        <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
               Book Appointment
              </ModalHeader>
              <ModalBody className="mb-5">
               
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

        </>
    );

};
export default AppointmnetModal;