import { useEffect, useState } from 'react';
import './Huevo.css';
import useProveedorProdutos from '../hooks/useProveedorProductos';

const Huevo = ({ contador, clicarHuevo, imagenHuevo }) => {
    const [animar, setAnimar] = useState(false);
    const [huevoRoto, setHuevoRoto] = useState(false);
    const {comprando} = useProveedorProdutos()

    useEffect(() => {
        if (contador === 0) {
            setAnimar(true); // Activar la animación
            setHuevoRoto(true); // Cambiar la imagen del huevo
            const timeout = setTimeout(() => {
                setAnimar(false); // Desactivar la animación
                setHuevoRoto(false); // Cambiar la imagen del huevo
            }, 1000); // Duración de la animación (1s)
            return () => clearTimeout(timeout); // Limpiar el timeout
        }
    }, [contador]);

    return (
        <div className="flex flex-col items-center justify-center mt-12 flex-grow">
            {/* Contador */}
            <div className="font-['Karma-Future'] text-6xl font-bold mb-8">{contador}</div>
            {/* Huevo */}
            <div
                className={`w-[65vmin] h-[55vmin] cursor-pointer flex items-center justify-center ${
                    animar ? 'huevo-shake' : ''} ${huevoRoto ? 'huevo-roto' : ''}`
                }
            >
                <img
                    src={imagenHuevo}
                    alt="Huevo"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                    onClick={() => !comprando && clicarHuevo()}
                />
            </div>
        </div>
    );
};

export default Huevo;