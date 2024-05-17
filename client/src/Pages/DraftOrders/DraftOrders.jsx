import React, { useEffect, useState } from 'react'
import { FaEdit, FaSearch } from 'react-icons/fa'
import InputComponent from '../../components/InputComponent'
import { AiFillDelete } from 'react-icons/ai';
import { Pagination, PaginationItem } from '@mui/material';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import AlertComponent from '../../components/AlertComponent';
import { toast } from 'react-hot-toast'
import DialogComponent from '../../components/DialogComponent';
import OrderView from './OrderView/OrderView';
import MobileTabel from '../../components/MobileTable';

const UserData = [
    {
        sNo: '1',
        name: 'Akshat',
        price: '500',
        email: 'akshat@gmail.com',
        status: 'Active',
    },
    {
        sNo: '2',
        name: 'Kumkum',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Pending',
    },
    {
        sNo: '3',
        name: 'Amit',
        price: '600',
        email: 'akshat@gmail.com',
        status: 'Active',
    },
    {
        sNo: '4',
        name: 'Deepraj',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Rejected',
    },
    {
        sNo: '5',
        name: 'Raj',
        price: '100',
        email: 'akshat@gmail.com',
        status: 'Active',
    }
    ,
    {
        sNo: '6',
        name: 'Raj',
        price: '600',
        email: 'akshat@gmail.com',
        status: 'Rejected',
    }
    ,
    {
        sNo: '7',
        name: 'Raj',
        price: '900',
        email: 'akshat@gmail.com',
        status: 'Active',
    }
    ,
    {
        sNo: '8',
        name: 'Kumkum',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Pending',
    },
    {
        sNo: '9',
        name: 'Amit',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Active',
    },
];
function DraftOrders() {
    /*    States for handling Table Pagination    */
    const [FilteredData, setFilteredData] = useState([])
    const [Page, setcurrentPage] = useState(1);
    const DataPerPage = 5;
    const count = Math?.ceil(UserData?.length / DataPerPage);

    /*  States for search filter  */
    const [searchValue, setSearchValue] = useState('')

    /*   States for handling Actions    */
    const [actionIndex, setActionIndex] = useState([])
    const [selectedIndex, setSelectedIndex] = useState()

    /*  States for handling view */
    const [viewOpen, setViewOpen] = useState(false)

    useEffect(() => {

        let Start = (Page - 1) * DataPerPage;
        let End = Start + DataPerPage;
        let newData = UserData?.slice(Start, End)
        setFilteredData(newData)

    }, [Page, UserData])

    const handlePageChange = (e, value) => {
        let itm = [actionIndex];
        itm[selectedIndex] = false;
        setActionIndex(itm)
        setSelectedIndex('')
        setcurrentPage(value)
    }

    /*  functions for handling actions  */

    const handleActions = (indx) => {
        let itm = [actionIndex];
        setSelectedIndex(indx)

        itm[indx] = true;

        setActionIndex(itm)
    }

    const handleActionsClose = (indx) => {
        let itm = [actionIndex];
        itm[indx] = false;
        setActionIndex(itm)
    }

    /*  functions for handling delete  */

    const handleDeleteYes = () => {
        setTimeout(() => {

            toast.success("Deleted successfully")
        }, 300);
    }

    const handleDelete = (index) => {
        AlertComponent({ handleDeleteYes })
    }

    const handleView = () => {
        setViewOpen(!viewOpen)
    }

    // useEffect(() => {
    //     let newData = [...UserData]

    //     let filteredData =newData?.filter((itm) => {
    //         if (itm.name.toLowerCase().includes(searchValue)) {
    //             return itm
    //         }
    //     })
    //     setFilteredData(filteredData)
    // }, [searchValue])

    return (
        <div className='  bg-white flex py-6   px-6 mt-0   overflow-y-scroll  gap-4 flex-col  w-full h-full '>
            <div className=' w-full flex bg-slate-100  shadow py-2  justify-center   items-center  '>
                <div className='  flex-col gap-5   w-full py-1 px-4 items-center justify-center mr-3 mt-1 flex'>
                    <div className=' w-full flex gap-2 px-2  items-center '>
                        <span className='  text-lg'>Search :</span>
                        <div className=' w-2/3 md:w-1/2 lg:w-1/3 flex items-center gap-1 relative'>
                            <InputComponent onChange={(e) => setSearchValue(e.target.value)} type={'search'} placeholder={'Search Customers'} />
                            <span className=' cursor-text absolute right-3'>
                                <FaSearch />
                            </span>
                        </div>
                    </div>
                    <div className='  w-full flex flex-col gap-5 items-center'>
                        <table className=' hidden md:block  table rounded '>
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
                                    FilteredData.map((itm, indx) => {
                                        return <div key={indx} className=' w-full  bg-slate-100 select-none border-zinc-200 flex justify-between border-b-2   rounded-md  px-1 py-3'>
                                            <span className=' w-1/2 text-[14.5px] flex items-center self-center pl-4'>{itm.sNo} </span>
                                            <span className=' w-11/12 text-[14.5px]'>{itm.name} </span>
                                            <span className=' w-full pl-2 text-[14.5px]'>{itm.email}</span>
                                            <span className=' w-2/3 pl-2 text-[14.5px]'>{itm.price}</span>
                                            <span className=' w-full pl-3 text-[14.5px]'>{itm.status}</span>
                                            <span className=' w-1/4 pr-3 text-[14.5px] relative '> <span className=' flex items-center pt-1 w-1/2 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx) }}><BsThreeDotsVertical /></span>
                                                {
                                                    actionIndex[indx] === true ?
                                                        <>  <span className=' select-none rounded-full lg:right-[80px] w-[130px] divide-x-2 2xl:right-[100px]  gap-1  py-1 px-2 shadow  bottom-0 bg-white absolute flex  items-center justify-between'>
                                                            <span className=' cursor-pointer w-full flex items-center justify-center'><RiEdit2Fill size={17} /></span>
                                                            <span onClick={() => handleDelete(indx)} className=' cursor-pointer w-full flex items-center justify-center'><AiFillDelete size={16} /></span>
                                                            <span onClick={() => handleView()} className=' cursor-pointer w-full flex items-center justify-center'><IoMdEye size={17} /></span>
                                                        </span>
                                                        </>
                                                        : ""
                                                }
                                            </span>
                                        </div>
                                    })
                                }
                            </tbody>
                            <DialogComponent open={viewOpen} maxWidth={'xl'}>
                                <OrderView Id={selectedIndex} onclose={handleView} />
                            </DialogComponent>
                        </table>
                        <table className='  block md:hidden table rounded '>
                        
                            <tbody className=' flex flex-col md:flex-row items-start gap-1  '>
                                {
                                    FilteredData.map((itm, indx) => {
                                        return <div key={indx} className=' w-full  items-start bg-slate-100 select-none sm:flex-col border-zinc-200 flex-col md:flex-row justify-between border-b-2   rounded-md  px-1 py-3'>
                                            <span className=' w-full text-[14.5px] flex justify-between '><span className=' font-semibold'> S.No :</span>  {itm.sNo} </span>
                                            <span className=' w-full text-[14.5px] flex justify-between'> <span className=' font-semibold'>Customer Name : </span>{itm.name} </span>
                                            <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Customer Email :</span> {itm.email}</span>
                                            <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Total Price</span>{itm.price}</span>
                                            <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Order status</span>{itm.status}</span>
                                            <span className=' w-full  text-[14.5px] justify-between relative  flex'> <span className=' font-semibold'>Actions  </span> <span className=' pt-1 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx) }}><BsThreeDotsVertical /></span>
                                                {
                                                    actionIndex[indx] === true ?
                                                        <>  <span className=' select-none rounded-full lg:right-[80px] w-[130px] divide-x-2 2xl:right-[100px]  gap-1  py-1 px-2 shadow  right-5 bottom-0 bg-white absolute flex  items-center justify-between'>
                                                            <span className=' cursor-pointer w-full flex items-center justify-center'><RiEdit2Fill size={17} /></span>
                                                            <span onClick={() => handleDelete(indx)} className=' cursor-pointer w-full flex items-center justify-center'><AiFillDelete size={16} /></span>
                                                            <span onClick={() => handleView()} className=' cursor-pointer w-full flex items-center justify-center'><IoMdEye size={17} /></span>
                                                        </span>
                                                        </>
                                                        : ""
                                                }
                                            </span>
                                        </div>
                                    })
                                }
                            </tbody>
                            <DialogComponent open={viewOpen} maxWidth={'xl'}>
                                <OrderView Id={selectedIndex} onclose={handleView} />
                            </DialogComponent>
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