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
import { useDeleteStoreMutation, useGetStoreListQuery } from '../../services/StoreServices';
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
    const DataPerPage = 5;
    const [count, setCount] = useState(0)
    const [FilteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState([])
    const [viewOpen, setViewOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    /*   States for handling Actions    */
    const [actionIndex, setActionIndex] = useState([])
    const [selectedIndex, setSelectedIndex] = useState()
    let offset = (Page - 1) * DataPerPage;

    const { data: ListData, isLoading: isListLoading, isFetching: isListFetching } = useGetStoreListQuery({
        limit: DataPerPage,
        offset: offset
    })

    const [DeleteStore] = useDeleteStoreMutation()

    useEffect(() => {
        if (isListLoading || isListFetching) {
            setLoading(true)
        }
        else {
            setUserData(ListData?.result?.rows);
            setCount(  Math.ceil( ListData?.result?.count/DataPerPage))
            setTimeout(() => {
                
                setLoading(false)
            },200);
        }

    }, [ListData, isListFetching, isListLoading])


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

        DeleteStore({ Id: selectedIndex })

            .then((res) => {
                if (res?.error) {
                    console.log(res.error)
                }
                else if(res.data)
                    {
                        setSelectedIndex('');
                        setActionIndex('');
                        toast.success("Store Successfully Deleted")
                    }


            })

    }

    const handleDelete = (index) => {
        AlertComponent({ handleDeleteYes })
    }

    const handleView = () => {
        // setViewOpen(!viewOpen)
    }


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
    useEffect(() => {
        let filteredData = UserData.filter((itm) => {
            if (itm.name.toLowerCase().includes(searchValue.trim())) {
                return itm
            }
        })
        console.log(filteredData)
        setFilteredData(filteredData)

    }, [searchValue, UserData])

    return (
        <div className=' overflow-y-scroll h-full  w-full px-3 py-4  flex flex-col gap-4'>
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
                    <div className=' hidden  md:table rounded w-full '>
                        <div className='head divide-x-2 bg-slate-500 text-white rounded border-r border-l flex justify-between'>
                            <div className=' w-full font-medium  text-[14px] self-center py-3 pl-3 uppercase' >Store name</div>
                            <div className=' w-full font-medium text-[14px] self-center py-3 pl-3  uppercase'>Api access token</div>
                            <div className=' w-full font-medium text-[14px] self-center py-3 pl-3 uppercase'>Store api key</div>
                            <div className=' w-full font-medium text-[14px] self-center py-3 pl-3  uppercase'>Stor api password</div>
                            <div className=' w-2/3 font-medium text-[14px] self-center py-3 pl-3 uppercase'>Action</div>
                        </div>
                        <div className=' flex flex-col gap-2 pt-2  '>
                            {
                                loading ?
                                    <div className=' w-full flex flex-col gap-2'>
                                        {Array(5).fill(0).map((itm) => {
                                            return <div className=' border h-16 rounded w-full bg-slate-200 animate-pulse'></div>
                                        })}
                                    </div>
                                    :
                                    UserData?.length <= 0 ?
                                        "No data" :
                                        UserData?.map((itm, indx) => {
                                            return <div key={indx} className=' w-full  gap-1  border-zinc-400  flex justify-between border   rounded-md  px-1 py-3'>
                                                <span className=' w-[20%]  text-[14.5px] flex items-center   h-6 pl-4  '> <span className=' '>{itm?.name}</span> </span>
                                                <span className='  w-[20%] noScroll flex self-center h-6 md:h-7 py-0  text-[14.2px] pl-2'>{itm?.accessToken}</span>
                                                <span className=' w-[20%] pl-4 text-[14.5px] h-6'>{itm?.apiKey}</span>
                                                <span className=' w-[21%] pl-4 text-[14.5px] h-6'>{itm?.apiPassword}</span>
                                                <span className=' w-[12%] pl-3 text-[14.5px] h-6 relative '> <span className=' flex items-center pt-1 w-1/4 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx, itm?.id) }}><BsThreeDotsVertical /></span>
                                                    {
                                                        actionIndex[indx] === true ?
                                                            <>  <span className=' select-none rounded-full lg:right-[135px] w-[130px] divide-x-2  2xl:right-[170px]  gap-1  py-1 px-2 shadow  bottom-0 bg-white absolute flex  items-center justify-between'>
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
                        </div>
                    </div>
                    <div className='   md:hidden table rounded '>
                        <div className=' flex flex-col md:flex-row items-start gap-1  '>
                            {
                                UserData?.map((itm, indx) => {
                                    return <div key={indx} className=' w-full  items-start bg-white select-none sm:flex-col border-slate-400 flex-col md:flex-row justify-between border-2   rounded-md  px-2 py-3'>
                                        <span className=' w-full text-[13px]  flex justify-between '><span className=' font-semibold'> Store name</span>  {itm.name} </span>
                                        <span className=' w-full text-[13px]  flex justify-between'> <span className=' w-full flex-wrap font-semibold'>Api access toekn : </span> <span className=' flex-wrap text-wrap'>{itm.accessToken}</span> </span>
                                        <span className=' w-full  text-[13px] flex justify-between'><span className=' font-semibold'>Api store Key :</span> {itm.apiKey}</span>
                                        <span className=' w-full  text-[13px] flex justify-between'><span className=' font-semibold'>Api store pass </span>{itm.apiPassword}</span>
                                        <span className=' w-full  text-[13px] justify-between relative  flex'> <span className=' font-semibold'>Actions  </span> <span className=' pt-1 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx,itm?.id) }}><BsThreeDotsVertical /></span>
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
                        </div>
                    </div>
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