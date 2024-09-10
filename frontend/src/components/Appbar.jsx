import React from 'react'

function Appbar() {
    return (
        <div className="shadow h-16 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                Wallet
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2 ">
                <div className="flex flex-col justify-center h-full text-xl">
                    K
                </div>
            </div>
        </div>
    )
}

export default Appbar
