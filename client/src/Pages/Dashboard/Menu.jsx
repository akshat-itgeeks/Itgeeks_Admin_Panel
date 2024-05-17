import React from 'react'
import InputComponent from '../../components/InputComponent'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
/* testing one library table */

function Menu() {

  const UserData = [
    {
      name: 'Akshat',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Kumkum',
      email: 'akshaddddddddt@gmail.com',
      status: 'Active',
    },
    {
      name: 'Amit',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Deepraj',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Raj',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Deepraj',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Raj',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Deepraj',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Raj',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
    {
      name: 'Deeprasdj',
      email: 'dafsdfffffffffsf@gmail.com',
      status: 'Active',
    },
    {
      name: 'Akshat',
      email: 'akshafdfast@gmail.com',
      status: 'Active',
    },
    {
      name: 'Kumkum',
      email: 'akshat@gmail.com',
      status: 'Active',
    },
  ]
  let submit = () => {
    return confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <>
      <div className=' bg-white flex py-4 px-3 overflow-y-scroll  gap-4 flex-col  w-full h-full '>
        <div className=' w-full flex gap-5 px-2 pb-3 items-center '>
          <span className=' font-semibold text-xl'>Users</span>
          <div className=' w-1/4 flex items-center gap-1 relative'>
            <InputComponent type={'search'} placeholder={'Search Users'} />
            <span className=' cursor-text absolute right-3'>
              <FaSearch />
            </span>
          </div>
        </div>
        <Table>
          <Thead>
            <Tr className='   bg-slate-200  rounded pb-2 mb-2  px-2 py-3'>
              <Th className="py-2 pl-3">Name</Th>
              <Th>Email</Th>
              <Th>Status </Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody className="">
            {
              UserData.map((itm) => {
                return <Tr className=' border-b-2 gap-3  rounded-md my-1  px-2 py-3'>
                  <Td className=' my-1  pl-3 sm:py-2 sm:w-1/3'>{itm.name} </Td>
                  <Td className=' sm:py-1 sm:w-1/3 '>{itm.email}</Td>
                  <Td className=' sm:py-1'>{itm.status}</Td>
                  <Td className='  sm:py-1'><span className=' flex items-center cursor-pointer'><span className=' self-center'><FaEdit size={17} /></span> / <span className=' flex items-center self-center cursor-pointer' onClick={() => {
                    submit()
                  }}> <AiFillDelete size={18} /></span></span></Td>
                </Tr>
              })
            }
          </Tbody>
        </Table>
      </div>
    </>
    // <div className=' bg-white flex py-4 px-3 overflow-y-scroll  gap-4 flex-col  w-full h-full '>
    //   <div className=' w-full flex gap-5 px-2 pb-3 items-center '>
    //     <span className=' font-semibold text-xl'>Users</span>
    //     <div className=' w-1/4 flex items-center gap-1 relative'>
    //       <InputComponent type={'search'} placeholder={'Search Users'} />
    //       <span className=' cursor-text absolute right-3'>
    //         <FaSearch />
    //       </span>
    //     </div>
    //   </div>
    //   {/* <span className=' font-semibold text-[32px]  mx-auto'>It's Menu !</span> */}
    //   <div className=' w-full flex flex-col gap-5 items-center'>
    //     <div className=' w-full flex justify-between bg-slate-100 rounded-md  px-2 py-3'>
    //       <span className=' w-full pl-3'>Name </span>
    //       <span className=' w-full'>Email</span>
    //       <span className=' w-full'>Status</span>
    //       <span className=' w-1/2'>Action</span>
    //     </div>
    //   </div>
    //   <div className=' w-full flex flex-col gap-3 items-center'>
    //     {
    //       UserData.map((itm) => {
    //         return <div className=' w-full flex justify-between border  rounded-md  px-2 py-3'>
    //           <span className=' w-full pl-3'>{itm.name} </span>
    //           <span className=' w-full'>{itm.email}</span>
    //           <span className=' w-full'>{itm.status}</span>
    //           <span className=' w-1/2 flex gap-1 items-center'><span className=' cursor-pointer'><FaEdit size={18} /></span> / <span className=' cursor-pointer' onClick={() => { submit()
    //           }}> <AiFillDelete size={19} /></span></span>
    //         </div>
    //       })
    //     }
    //   </div>
    // </div>
  )
}

export default Menu