import { createContext, useState} from 'react'
export const PaginationContext = createContext()

const PaginationContextProvider = ({ children }) => {
    const [elementosPorPagina] = useState(10); // indicar cantidad de elementos a mostrar por página
    const [paginaActual, setPaginaActual] = useState(1);

    const paginateItems = (arrayItems, cantidadElementos) => {
        const indiceInicio = (paginaActual - 1) * elementosPorPagina;
        const indiceFin = paginaActual * elementosPorPagina;
        const itemsPagina = arrayItems.slice(indiceInicio, indiceFin);
        const totalPaginas = Math.ceil(arrayItems.length / elementosPorPagina);
        return { itemsPagina, totalPaginas, paginaActual }
    }
    const cambiarPagina = (nuevaPagina, containerID) => {
        setPaginaActual(nuevaPagina);
        const ContainerRef = document.getElementById(containerID);
        if (ContainerRef) ContainerRef.scrollIntoView({ behavior: 'smooth' }) 
    }
    const renderPaginateButtons = (totalPaginas, containerID) => {
        return Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numeroPagina) => (
            <button key={numeroPagina} onClick={() => cambiarPagina(numeroPagina, containerID)}>
                {numeroPagina}
            </button>
        ))
    }

    let data = { paginateItems, cambiarPagina, renderPaginateButtons };
    return <PaginationContext.Provider value={data}> {children} </PaginationContext.Provider>;
}

export default PaginationContextProvider