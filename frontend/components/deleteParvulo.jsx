// modal para eliminar parvulo

import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jwt-simple";

export const ModalDeleteParvulo = ({showModalDeleteParvulo, setShowModalDeleteParvulo,rut,serRut,setParvulos,parvulos}) => {


    const deleteParvulo = async () => {
        try{
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY,true);
            const res = await axios.delete(`${process.env.API_URL}/parvulo/delete/${rut}`,{
                headers: {
                    "X-Caller-Id": decoded.sub
                },
            });
            if(res.status === 200){
                setParvulos(parvulos.filter(parvulo => parvulo.rut !== rut));
                setShowModalDeleteParvulo(false);
            }

        }catch(err){
            console.log(err);
        }
    
    }
    return (
        <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
            <divc className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-fit bg-white rounded-2xl border-2 border-black shadow shadow-slate-900">
                <div className="flex flex-col justify-center items-center m-5 space-y-3">
                <h1 className="text-2xl font-bold">¿Estas seguro de eliminar el parvulo</h1>
                <div className="flex space-x-3 justify-evenly w-1/2">
                    <button className="bg-red-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" onClick={deleteParvulo()} >Eliminar</button>
                    <button className="bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" onClick={() => setShowModalDeleteParvulo(false)}>Cancelar</button>
                </div>
                </div>
            </divc>
        </div>
        </>
    );
}
