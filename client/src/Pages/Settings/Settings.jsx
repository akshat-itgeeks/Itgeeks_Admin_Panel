import DialogComponent from '../../components/DialogComponent'
import AddStore from './AddStore';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import AlertComponent from '../../components/AlertComponent';
import { toast } from 'react-hot-toast'
// import DialogComponent from '../../components/DialogComponent';
// import OrderView from './OrderView/OrderView';

const UserData = [
    {
        sNo: 'Store 1',
        name: 'Akshat',
        price: '500',
        email: 'akshat@gmail.com',
        status: 'Active',
    },
    {
        sNo: 'Store 2',
        name: 'Kumkum',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Pending',
    },
    {
        sNo: 'Store 3',
        name: 'Amit',
        price: '600',
        email: 'akshat@gmail.com',
        status: 'Active',
    },
    {
        sNo: 'Store 4',
        name: 'Deepraj',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Rejected',
    },
    {
        sNo: 'Store 5',
        name: 'Raj',
        price: '100',
        email: 'akshat@gmail.com',
        status: 'Active',
    }
    ,
    {
        sNo: 'Store 6',
        name: 'Raj',
        price: '600',
        email: 'akshat@gmail.com',
        status: 'Rejected',
    }
    ,
    {
        sNo: 'Store 7',
        name: 'Raj',
        price: '900',
        email: 'akshat@gmail.com',
        status: 'Active',
    }
    ,
    {
        sNo: 'Store 8',
        name: 'Kumkum',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Pending',
    },
    {
        sNo: 'Store 9',
        name: 'Amit',
        price: '200',
        email: 'akshat@gmail.com',
        status: 'Active',
    },
];
function Settings() {
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
    /* States for Add  */
    const [actionOpen, setActionOpen] = useState(false)


    const handleActionOpen = () => {
        setActionOpen(true)
    }

    const handleActionClose = () => {
        setActionOpen(false)
    }

    const dta = [
        { "name": 'a', "countryName": "Aewas", "company": "ItGeeks", "representative": "Shopify" },
        { "name": 'a', "countryName": "Dewas", "company": "ItGeeks", "representative": "Shopify" },
        { "name": 'a', "countryName": "Zewas", "company": "ItGeeks", "representative": "Shopify" },
        { "name": 'a', "countryName": "Dewas", "company": "ItGeeks", "representative": "Shopify" },
        { "name": 'a', "countryName": "Dewas", "company": "ItGeeks", "representative": "Shopify" },
        { "name": 'a', "countryName": "Dewas", "company": "ItGeeks", "representative": "Shopify" },

    ]


    return (
        <div className=' overflow-y-scroll h-full  px-3 py-4 w-full flex flex-col gap-4'>
            <div className=' w-full flex justify-between '>
                <div>
                    <span className=' font-semibold text-xl'>Stores</span>
                </div>
                <div>
                    <span onClick={handleActionOpen} className=' bg-slate-500 text-white py-2 px-4 cursor-pointer rounded'>
                        Add
                    </span>
                </div>
                <DialogComponent open={actionOpen} maxWidth={'md'}>
                    <AddStore close={handleActionClose} />
                </DialogComponent>
            </div>
            <div className='  w-full flex-wrap   rounded '>
                {/* <DataTable  className='w-full flex  flex-col' resizableColumns value={dta} paginator rows={4} rowsPerPageOptions={[2,5, 10, 25]} >
                    <Column className='  ' field="name" header="Name"  ></Column>
                    <Column className='' field="countryName" header="Country" ></Column>
                    <Column className=' ' field="company" header="Company" ></Column>
                    <Column className=' ' field="representative" header="Representative" ></Column>
                    <Column className='  ' field="representative" header="Representative" ></Column>
                </DataTable> */}
                
                  <div className='  w-full flex flex-col gap-5 items-center'>
                        <table className=' hidden md:block  table rounded '>
                            <thead className='head divide-x-2 bg-slate-500 text-white rounded border-r border-l flex justify-between'>
                                <th className=' w-full font-medium  text-[14px] uppercase' >Store name</th>
                                <th className=' w-full font-medium text-[14px]  uppercase'>Api access token</th>
                                <th className=' w-full font-medium text-[14px] uppercase'>Store api key</th>
                                <th className=' w-full font-medium text-[14px]  uppercase'>Stor api password</th>
                                {/* <th className=' w-full font-medium text-[14px]  uppercase'>Store status</th> */}
                                <th className=' w-2/3 font-medium text-[14px] uppercase'>Action</th>
                            </thead>
                            <tbody className=' flex flex-col gap-2 pt-2  '>
                                {
                                    UserData.map((itm, indx) => {
                                        return <div key={indx} className=' w-full   select-none border-zinc-400 flex justify-between border   rounded-md  px-1 py-3'>
                                            <span className=' w-full text-[14.5px] flex items-center self-center pl-4'>{itm.sNo} </span>
                                            <span className=' w-full text-[14.5px]'>{itm.name} </span>
                                            <span className=' w-full pl-4 text-[14.5px]'>{itm.email}</span>
                                            <span className=' w-full pl-4 text-[14.5px]'>{itm.price}</span>
                                            {/* <span className=' w-full pl-3 text-[14.5px]'>{itm.status}</span> */}
                                            <span className=' w-2/3 pl-3 text-[14.5px] relative '> <span className=' flex items-center pt-1 w-1/4 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx) }}><BsThreeDotsVertical /></span>
                                                {
                                                    actionIndex[indx] === true ?
                                                        <>  <span className=' select-none rounded-full lg:right-[169px] w-[130px] divide-x-2 2xl:right-[200px]  gap-1  py-1 px-2 shadow  bottom-0 bg-white absolute flex  items-center justify-between'>
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
                            {/* <DialogComponent open={viewOpen} maxWidth={'xl'}>
                                <OrderView Id={selectedIndex} onclose={handleView} />
                            </DialogComponent> */}
                        </table>
                        <table className='  block md:hidden table rounded '>
                        
                            <tbody className=' flex flex-col md:flex-row items-start gap-1  '>
                                {
                                    FilteredData.map((itm, indx) => {
                                        return <div key={indx} className=' w-full  items-start bg-white select-none sm:flex-col border-slate-400 flex-col md:flex-row justify-between border-2   rounded-md  px-2 py-3'>
                                            <span className=' w-full text-[14.5px] flex justify-between '><span className=' font-semibold'> Store name</span>  {itm.sNo} </span>
                                            <span className=' w-full text-[14.5px] flex justify-between'> <span className=' font-semibold'>Api access toekn : </span>{itm.name} </span>
                                            <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Api store Key :</span> {itm.email}</span>
                                            <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Api store pass </span>{itm.price}</span>
                                            {/* <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Order status</span>{itm.status}</span> */}
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
                        </table>
                    </div>
            </div>

        </div>
    )
}

export default Settings