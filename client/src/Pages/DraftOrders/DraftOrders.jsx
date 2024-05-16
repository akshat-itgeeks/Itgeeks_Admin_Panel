import React, { useEffect, useState } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import InputComponent from '../../components/InputComponent'
import { AiFillDelete } from 'react-icons/ai';
import { Pagination, PaginationItem }  from '@mui/material';
import { BsThreeDotsVertical } from "react-icons/bs";

function DraftOrders() {
    const UserData = [
        {
            sNo: '1',
            name: 'Akshat',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        },
        {
            sNo: '2',
            name: 'Kumkum',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        },
        {
            sNo: '3',
            name: 'Amit',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        },
        {
            sNo: '4',
            name: 'Deepraj',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        },
        {
            sNo: '5',
            name: 'Raj',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        }
        ,
        {
            sNo: '6',
            name: 'Raj',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        }
        ,
        {
            sNo: '7',
            name: 'Raj',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        }
        ,
        {
            sNo: '8',
            name: 'Kumkum',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        },
        {
            sNo: '9',
            name: 'Amit',
            price: '200',
            email: 'akshat@gmail.com',
            status: 'Active',
        }
    ]
  const [FilteredData, setFilteredData] = useState([])
  const [Page, setcurrentPage] = useState(1);
  const DataPerPage = 5;
  const count = Math?.ceil(UserData?.length / DataPerPage);




    useEffect(() => {

        let Start = (Page - 1) * DataPerPage;
        let End = Start + DataPerPage;
        let newData = UserData?.slice(Start, End)
        setFilteredData(newData)
  
    }, [Page, UserData])

    const handlePageChange = (e, value) => {
        setcurrentPage(value)
      }

    return (
        <div className='  bg-white flex py-6  px-6 mt-0   overflow-y-scroll  gap-4 flex-col  w-full h-full '>
            <div className=' w-full flex bg-slate-100  shadow py-2  justify-center   items-center  '>
                <div className='  flex-col gap-5   w-full py-1 px-4 items-center justify-center mr-3 mt-1 flex'>
                    <div className=' w-full flex gap-2 px-2  items-center '>
                        <span className='  text-lg'>Search :</span>
                        <div className=' w-1/3 flex items-center gap-1 relative'>
                            <InputComponent type={'search'} placeholder={'Search Customers'} />
                            <span className=' cursor-text absolute right-3'>
                                <FaSearch />
                            </span>
                        </div>
                    </div>
                    <div className='  w-full flex flex-col gap-5 items-center'>
                        {/* <div className=' w-full flex justify-between bg-slate-100 rounded-md  px-2 py-2'>
                        <span className=' w-full'>Name </span>
                        <span className=' w-full'>Email</span>
                        <span className=' w-full'>Status</span>
                        <span className=' w-1/2'>Action</span>
                    </div> */}
                        <table className='table rounded '>
                            <thead className='head divide-x-2 bg-slate-500 text-white rounded border-r border-l flex justify-between'>
                                <th className=' w-1/2 font-medium  text-[14px]'>S. NO</th>
                                <th className=' w-full font-medium text-[14px]  uppercase'>Customer Name</th>
                                <th className=' w-full font-medium text-[14px] uppercase'>Customer Email</th>
                                <th className=' w-2/3 font-medium text-[14px]  uppercase'>Total Price</th>
                                <th className=' w-full font-medium text-[14px]  uppercase'>Draft Order status</th>
                                <th className=' w-1/2 font-medium text-[14px] uppercase'>Action</th>
                            </thead>
                            <tbody className=' flex flex-col gap-1  '>
                                {
                                    FilteredData.map((itm) => {
                                        return <div className=' w-full  bg-slate-100 border-zinc-200 flex justify-between border-b-2   rounded-md  px-1 py-3'>
                                            <span className=' w-1/2 text-[14.5px] flex items-center self-center pl-4'>{itm.sNo} </span>
                                            <span className=' w-11/12 text-[14.5px]'>{itm.name} </span>
                                            <span className=' w-full pl-2 text-[14.5px]'>{itm.email}</span>
                                            <span className=' w-2/3 pl-2 text-[14.5px]'>{itm.price}</span>
                                            <span className=' w-full pl-3 text-[14.5px]'>{itm.status}</span>
                                            <span className=' w-1/4 pr-3 text-[14.5px] '> <span className=' flex items-center pt-1 cursor-pointer' onClick={() => {

                                            }}><BsThreeDotsVertical/></span></span>
                                        </div>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className=' py-1 self-end'>
                        <Pagination
                            shape="rounded"
                            variant="outlined"
                            color="standard"
                            page={Page}
                            count={count}
                            onChange={handlePageChange}
                        // renderItem={(item) => <PaginationItem {...item}   className=" shadow-md" />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DraftOrders