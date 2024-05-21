import DialogComponent from '../../components/DialogComponent'
import AddStore from './AddStore';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import AlertComponent from '../../components/AlertComponent';
import { toast } from 'react-hot-toast'
import EditStore from './EditStore';
import InputComponent from '../../components/InputComponent';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from '@mui/material';
import storeService from '../../services/storeService';
// import {DataTable} from 'primereact/datatable'
// import {Column} from 'primereact/column'
// import DataTable from "react-data-table-component";




const dta = [
    { name: 'hi' }
]

function Settings() {
    /*    States for handling Table Pagination    */
    const [UserData, setUserData] = useState([])
    const [Page, setcurrentPage] = useState(1);
    const DataPerPage = 2;
    const [count, setCount] = useState(0)
    const [filteredData,setFilteredData]= useState([])
    /*  States for search filter  */
    const [searchValue, setSearchValue] = useState('')

    /*   States for handling Actions    */
    const [actionIndex, setActionIndex] = useState([])
    const [selectedIndex, setSelectedIndex] = useState()

    /*  States for handling view */
    const [viewOpen, setViewOpen] = useState(false);

    /*  fetching list  */
    useEffect(() => {
      
        let offset = (Page - 1) * DataPerPage;

        storeService.getStoreList({
            limit: DataPerPage,
            offset: offset
        })
            .then(res => res?.data)
            .then((data) => {
                setUserData(data?.result.rows)
                console.log(data?.result?.count)
                let cunt = Math?.ceil(data.result?.count / DataPerPage);
                setCount(cunt)
            })

        // setFilteredData(newData)

    }, [Page,searchValue])


    useEffect(() => {
        console.log(UserData)
    }, [UserData])


    const handlePageChange = (e, value) => {
        let itm = [actionIndex];
        itm[actionIndex] = false;
        setActionIndex(itm)
        setSelectedIndex('')
        setcurrentPage(value)
    }

    /*  functions for handling actions  */

    const handleActions = (indx, id) => {
        let itm = [actionIndex];
        setSelectedIndex(id)

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
        // setViewOpen(!viewOpen)
    }

    /* States for Add  */
    const [actionOpen, setActionOpen] = useState(false)

    /*  States for Edit */
    const [editOpen, setEditOpen] = useState(false)


    const handleActionOpen = () => {
        setActionOpen(true)
    }

    const handleActionClose = () => {
        setActionOpen(false)
    }

    const handleEdit = () => {
        setEditOpen(!editOpen)
        if (editOpen == true) {
            setActionIndex('')
        }
    }
    /* Static data for datatable */


    const columns = [
        {
            name: "ID",
            selector: row => row.id
        },
        {
            name: "Full Name",
            selector: row => row.fullName
        },
        {
            name: "Height",
            selector: row => row.height
        },
        {
            name: "Weight",
            selector: row => row.weight
        },
    ];

    const rows = [
        {
            id: 1,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 2,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 3,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },
    ];
    useEffect(()=>
    {
        let filteredData = UserData.filter((itm) => {
            if (itm.name.toLowerCase().includes(searchValue.trim())) {
                return itm
            }
        })
        setFilteredData(filteredData)

    },[searchValue])

    return (
        <div className=' overflow-y-scroll h-full  w-full px-3 py-4 w-full flex flex-col gap-4'>
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
                    <AddStore Id={selectedIndex} close={handleActionClose} />
                </DialogComponent>

                <DialogComponent open={editOpen} maxWidth={'md'}>
                    <EditStore Id={selectedIndex} close={handleEdit} />
                </DialogComponent>
            </div>
            <div className=' w-full flex gap-2 px-2  items-center '>
                <span className='  text-lg'>Search :</span>
                <div className=' w-2/3 md:w-1/2 lg:w-1/3 flex items-center gap-1 relative'>
                    <InputComponent onChange={(e) => setSearchValue(e.target.value)} type={'search'} placeholder={'Search Customers'} />
                    <span className=' cursor-text absolute right-3'>
                        <FaSearch />
                    </span>
                </div>
            </div>
            <div className='w-full flex-wrap   rounded '>
                {/* <DataTable  className='w-full flex  flex-wrap flex-col'  value={dta} paginator rows={4} rowsPerPageOptions={[2,5, 10, 25]} >
                    <Column className='  ' field="name" header="Name"  ></Column>
                    <Column className='' field="countryName" header="Country" ></Column>
                    <Column className=' ' field="company" header="Company" ></Column>
                    <Column className=' ' field="representative" header="Representative" ></Column>
                    <Column className='  ' field="representative" header="Representative" ></Column>
                </DataTable> */}
                {/* <DataTable responsive pagination  highlightOnHover columns={columns}  data={rows}/> */}

                <div className='  w-full flex flex-col gap-5 items-center'>
                    <table className=' hidden md:block  table rounded '>
                        <thead className='head divide-x-2 bg-slate-500 text-white rounded border-r border-l flex justify-between'>
                            <th className=' w-full font-medium  text-[14px] uppercase' >Store name</th>
                            <th className=' w-full font-medium text-[14px]  uppercase'>Api access token</th>
                            <th className=' w-full font-medium text-[14px] uppercase'>Store api key</th>
                            <th className=' w-full font-medium text-[14px]  uppercase'>Stor api password</th>
                            <th className=' w-2/3 font-medium text-[14px] uppercase'>Action</th>
                        </thead>
                        <tbody className=' flex flex-col gap-2 pt-2  '>
                            {
                                UserData?.length <= 0 ?
                                    "No data" :
                                    UserData?.map((itm, indx) => {
                                        return <div key={indx} className=' w-full   select-none border-zinc-400 flex justify-between border   rounded-md  px-1 py-3'>
                                            <span className=' w-full text-[14.5px] flex items-center self-center pl-4'>{itm?.name} </span>
                                            <span className=' w-full text-[14.5px]'>{itm?.accessToken} </span>
                                            <span className=' w-full pl-4 text-[14.5px]'>{itm?.apiKey}</span>
                                            <span className=' w-full pl-4 text-[14.5px]'>{itm?.apiPassword}</span>
                                            <span className=' w-2/3 pl-3 text-[14.5px] relative '> <span className=' flex items-center pt-1 w-1/4 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx, itm?.id) }}><BsThreeDotsVertical /></span>
                                                {
                                                    actionIndex[indx] === true ?
                                                        <>  <span className=' select-none rounded-full lg:right-[169px] w-[130px] divide-x-2 2xl:right-[200px]  gap-1  py-1 px-2 shadow  bottom-0 bg-white absolute flex  items-center justify-between'>
                                                            <span onClick={() => handleEdit()} className=' cursor-pointer w-full flex items-center justify-center'><RiEdit2Fill size={17} /></span>
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
                    <table className='  block md:hidden table rounded '>
                        <tbody className=' flex flex-col md:flex-row items-start gap-1  '>
                            {
                                UserData?.map((itm, indx) => {
                                    return <div key={indx} className=' w-full  items-start bg-white select-none sm:flex-col border-slate-400 flex-col md:flex-row justify-between border-2   rounded-md  px-2 py-3'>
                                        <span className=' w-full text-[14.5px] flex justify-between '><span className=' font-semibold'> Store name</span>  {itm.sNo} </span>
                                        <span className=' w-full text-[14.5px] flex justify-between'> <span className=' font-semibold'>Api access toekn : </span>{itm.name} </span>
                                        <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Api store Key :</span> {itm.email}</span>
                                        <span className=' w-full  text-[14.5px] flex justify-between'><span className=' font-semibold'>Api store pass </span>{itm.price}</span>
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
                <div className=' w-full justify-end flex py-1 self-end'>
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
    )
}

export default Settings