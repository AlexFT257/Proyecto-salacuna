
export const ModalDeleteActividad = ({showModalDelete, setShowModalDelete, actividades, setActividades}) => {

    const deleteActividad = async (id) => {
        const res = await axios.delete(`${process.env.API_URL}/actividades/${id}`);
        const data = await res.data;
        setActividades(actividades.filter((item) => item._id !== id));
        setShowModalDelete(false);
    };
    
    return (
        <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-fit bg-white rounded-2xl border-2 border-black shadow shadow-slate-900">
                <div className="flex flex-col justify-center items-center m-5 space-y-3">
                <h1 className="text-2xl font-bold">¿Estas seguro de eliminar esta actividad?</h1>
                <div className="flex space-x-3 justify-evenly w-1/2">
                    <button className="bg-red-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" onClick={() => props.deleteActividad(id)}>Eliminar</button>
                    <button className="bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" onClick={() => setShowModalDelete(false)}>Cancelar</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
