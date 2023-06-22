import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function LogoutButton() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    window.location.href = '/login';
  };

  return (
    <>
      <Button className='bg-red-600 hover:bg-red-700' onClick={() => props.setOpenModal('pop-up')} >Logout</Button>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout
            </h3>
            <div className="flex justify-center gap-4">
              <Button className='bg-red-600 hover:bg-red-700' onClick={handleLogout}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}