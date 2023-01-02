import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";

export const ModalDeleteActividad = ({id, setShowModalDelete, actividades, setActividades}) => {

    const deleteActividad = async () => {
        try {
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET, true);
            const res = await axios.delete(`${process.env.API_URL}/actividad/delete/${id}`, {
                headers: {
                    "X-Caller-Id": decoded.sub,
                    "Content-Type": "application/json",
                },
            });
            if(res.status === 200){
                setActividades(actividades.filter(actividad => actividad._id !== id));
                setShowModalDelete(false);
                Swal.fire({
                    title: "Actividad eliminada",
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: "Error al eliminar actividad",
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                title: error,
                icon: "error",
                position: "center",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    return (
        <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 max-md:w-11/12 h-fit bg-white rounded-2xl border-2 border-black shadow shadow-slate-900">
                <div className="flex flex-col justify-center items-center m-5 space-y-5">
                    <h1 className="text-2xl text-center font-bold">¿Estas seguro de eliminar esta actividad?</h1>
                    <div className="flex flex-col md:flex-row w-max space-x-3 justify-evenly lg:w-1/2">
                        <button className="bg-red-600 rounded-lg p-2 text-white border-white hover:bg-red-700" onClick={deleteActividad} >Eliminar</button>
                        <button className="bg-emerald-600 rounded-lg p-2 text-white border-white hover:bg-emerald-700" onClick={() => setShowModalDelete(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
