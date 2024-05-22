import React, { useEffect, useState } from 'react'
import InputComponent from '../../../components/InputComponent'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import DialogComponent from '../../../components/DialogComponent';
import MenuEdit from './MenuEdit';
import { IoWarning } from 'react-icons/io5';
/* testing one library table */

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
  },{
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
  },{
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
function Menu() {

  const [selectedIndex, setSelectedIndex] = useState();
  const [DialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredData,setFilteredData]= useState([])

  /*  Handle Delete onclick */
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

  /* Functions  for handling Edit  */
  const handleEdit = (indx) => {
    setSelectedIndex(indx);
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  useEffect(() => {
    let updatedData = UserData.filter((itm) => {
      if (itm.name.toLowerCase().includes(query.toLowerCase().trim())) {
        return itm
      }
    })
    setFilteredData(updatedData)
  }, [query])

  return (
    <>
      <div className=' bg-white flex py-4 px-3 overflow-y-scroll  gap-4 flex-col  w-full h-full '>
        <div className=' w-full flex gap-5 px-2 pb-3 items-center '>
          <span className=' font-semibold text-xl'>Users</span>
          <div className=' w-1/4 flex items-center gap-1 relative'>
            <InputComponent value={query} onChange={(e) => setQuery(e.target.value)} type={'text'} placeholder={'Search Users'} />
            <span className=' cursor-text absolute right-3'>
              <FaSearch />
            </span>
          </div>
        </div>
        {
          filteredData.length>0 ?
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
              filteredData?.map((itm, indx) => {
                return <Tr key={indx} className=' border-b-2 gap-3  rounded-md my-1  px-2 py-3'>
                  <Td className=' my-1  pl-3 sm:py-2 sm:w-1/3'>{itm.name} </Td>
                  <Td className=' sm:py-1 sm:w-1/3 '>{itm.email}</Td>
                  <Td className=' sm:py-1'>{itm.status}</Td>
                  <Td className='  sm:py-1'><span className=' flex items-center cursor-pointer'><span onClick={() => handleEdit(indx)} className=' self-center'><FaEdit size={17} /></span> / <span className=' flex items-center self-center cursor-pointer' onClick={() => {
                    submit()
                  }}> <AiFillDelete size={18} /></span></span></Td>
                </Tr>
              })
            }
          </Tbody>
        </Table>
          : <div className=' text-lg w-full flex items-center justify-center gap-3'>
            <IoWarning/>
            No data found
          </div>
        }
        
        <DialogComponent maxWidth={'md'} open={DialogOpen}>
          <MenuEdit  close={handleDialogClose} />
        </DialogComponent>
      </div>
    </>

  )
}

export default Menu