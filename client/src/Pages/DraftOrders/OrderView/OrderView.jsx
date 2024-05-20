import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

function OrderView(
    {
        onclose,
        Id,
    }
) {
    const UserData = [
        {
            img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Standard Watches',
            size: '1x44',
            shape: 'custom',
            finish: 'matte',
            artWork: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            quantity: '80',
            total: '1200'

        },
        {
            img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Standard Drinks',
            size: '10x20',
            shape: 'circular',
            finish: 'matte',
            artWork: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            quantity: '20',
            total: '500'

        }
        
    ];

    return (
        <div className=' px-4 h-80vh] w-full '>
            <div className=' w-full flex flex-col gap-5'>

                <span className=' bg-slate-500 px-3  py-1 rounded-lg text-white self-end cursor-pointer ' onClick={() => onclose()}>X</span>
                <div className=' w-full flex justify-between'>
                    <div className=' flex flex-col gap-1'>
                        <span className=' pb-1 font-semibold'>Customer Details :</span>
                        <span>Akshat binjwa</span>
                        <span>orders@gmail.com</span>
                    </div>
                    <div className='  flex flex-col gap-1'>
                        <span className=' pb-1 font-semibold'>Order Note :</span>
                        <span>Im a React dev</span>
                    </div>
                </div>
                <div>
                    <div className=' w-full flex flex-col gap-3 items-center'>
                        <div className=' w-full flex justify-between bg-slate-500 text-white rounded-md  px-2 py-3'>
                            <span className=' w-full pl-3 uppercase '>Product </span>
                            <span className=' w-1/3 uppercase'>Quantity</span>
                            <span className=' w-1/4 uppercase'>Total</span>
                        </div>
                        <div className=' w-full divide-y-2 flex-col  bg-slate-100 rounded-md px-2 py-2'>
                            {
                                UserData?.map((itm, indx) => {
                                    return <div key={indx} className=' w-full items-center   select-none border-zinc-200 flex justify-between    rounded-md  px-1 py-3'>
                                        <div className=' w-full  gap-3 text-[14.5px] flex items-center self-center '>
                                            <img src={itm.img} className='border object-center p-[3px] shadow-md rounded min-w-28 w-28 h-28 object-cover' alt="" />
                                            <div className=' flex flex-col'>
                                                <span className=' font-semibold text-[16px]'>{itm.name}</span>
                                                <span>{itm.size}</span>
                                                <span> Shape : {itm.shape}</span>
                                                <span> Finish : {itm.finish}</span>
                                                <a target='_blank' href={itm.artWork}>
                                                <LinesEllipsis
                                                    text={'Preview : ' + itm.artWork}
                                                    maxLine='1'
                                                    ellipsis='...'
                                                    trimRight
                                                    basedOn='letters'
                                                    />
                                                    </a>

                                            </div>
                                        </div>
                                        <span className=' w-1/3 pl-4 text-[14.5px]'>{itm.quantity} </span>
                                        <span className=' w-1/4 pl-3 text-[14.5px]'>${itm.total}</span>
                                    </div>
                                })
                            }
                        </div>
                        <div className=' w-full flex justify-end py-2'>
                            <div className=' w-[160px] flex flex-col gap-1'>
                                <span className=' flex w-full justify-between font-semibold text-[15px]'><span>Subtotal : </span>  <span> $7500 </span></span>
                                <span className=' flex w-full justify-between font-semibold text-[15px]'><span>Total : </span>  <span> $13800 </span></span>
                            </div>
                        </div>
                    </div>

                    {/* OrderView */}
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae exercitationem, dolores veniam deserunt maxime aut laborum, expedita unde perferendis repellendus adipisci animi neque iste asperiores. Temporibus labore perspiciatis eius dolor.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores illo quisquam similique aut vero veniam est officiis iste debitis tempora? Voluptas, quisquam. Placeat earum laboriosam accusantium iure, debitis eum temporibus fuga nobis distinctio omnis quos saepe, cupiditate molestiae dolore modi sapiente non doloremque possimus fugiat autem ratione rerum harum commodi voluptate. Similique iure dolorem ipsum enim quidem nisi facilis odit debitis accusamus veritatis, odio laudantium quos nobis sunt laborum explicabo vero. Mollitia debitis, suscipit dolor voluptate qui temporibus fugiat officiis consequatur aperiam hic beatae vitae, obcaecati error officia voluptas eum delectus iusto facere, eaque praesentium reiciendis porro omnis neque dignissimos.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem facere, praesentium nobis ab fuga recusandae obcaecati! Dolor minus facilis aut a veniam adipisci nisi eum expedita ipsum aperiam! Dignissimos, non consectetur? Ullam, accusantium perspiciatis dicta cumque repudiandae quia maiores eius!
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto voluptas nam dolore beatae magnam? Praesentium saepe facere autem a rem! Ducimus dolorem illum dicta reiciendis necessitatibus, natus et similique at error enim a adipisci itaque, tempora mollitia nesciunt? Voluptatum qui, natus earum porro minus numquam facilis ratione aut nobis sequi? Temporibus, adipisci amet magni voluptates asperiores earum, id dolores veniam ipsam, fugiat at cupiditate. Ut ea repellat nesciunt tenetur vero iure consequuntur laboriosam maxime, alias exercitationem neque sint beatae porro.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minima doloribus non incidunt, ex commodi perferendis rem, tempore aspernatur hic corrupti suscipit eligendi rerum exercitationem maiores, neque ipsam ullam fugiat accusantium repellendus odit. Similique, illo officia. Tenetur sapiente exercitationem voluptates nemo officia nesciunt quos? Velit possimus facilis adipisci mollitia. Ex quae ea vel reprehenderit! Velit, doloribus provident cumque explicabo nisi ad repellat labore in necessitatibus, unde magni officia, minima voluptates nulla reprehenderit perferendis veniam. Saepe, accusantium est in similique rem amet praesentium laboriosam alias. Quasi nam tempora voluptatum suscipit maiores, harum non autem soluta similique iusto, ad, temporibus dicta earum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ratione minima excepturi dicta doloremque possimus numquam quod officia, qui iste eius veritatis ab velit voluptatum. Distinctio fugit illo ex assumenda eius laboriosam iusto aspernatur, totam perspiciatis magnam impedit consequatur corporis. Vero dolore quae quod. Aliquid cum consectetur maxime quisquam. Repudiandae! */}
                </div>
            </div>
        </div>
    )
}

export default OrderView