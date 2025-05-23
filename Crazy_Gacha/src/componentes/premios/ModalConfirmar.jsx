import Swal from 'sweetalert2';
import useProveedorPremios from '../hooks/useProveedorPremios.js';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import { useEffect } from 'react';

const ModalConfirmar = ({ datos, quitarModal }) => {
    const { venderRepetidos } = useProveedorPremios();
    const { obtenerUsuario, idUsuario } = useProveedorSesion();

    useEffect(() => {
        Swal.fire({
            title: "¿Seguro que quieres vender este premio?",
            text: "No podrás deshacer esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Sí, vender",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Mostrar animación de carga
                Swal.fire({
                    title: "Vendiendo...",
                    html: `<div class="flex justify-center items-center">
                              <span class="animate-spin inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
                           </div>
                           <p class="mt-4">Procesando venta...</p>`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                const error = await venderRepetidos(datos.id);

                if (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error,
                    }).then(() => {
                        quitarModal();
                    });
                } else {
                    await obtenerUsuario(idUsuario);
                    Swal.fire({
                        title: "¡Vendido!",
                        text: "El premio ha sido vendido.",
                        icon: "success",
                        confirmButtonColor: "#22c55e"
                    }).then(() => {
                        quitarModal();
                    });
                }
            } else {
                quitarModal();
            }
        });
        // eslint-disable-next-line
    }, []);

    return null;
};

export default ModalConfirmar;