import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importar íconos

interface Props {
    totalItems: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({ totalItems, page, setPage }) => {
    const itemsPerPage = 10;
    const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            {/* Botón Anterior */}
            <button
                className="btn-paginated"
                onClick={handlePrevPage}
                disabled={page === 1}
            >
                <FaChevronLeft />
            </button>

            {/* Botones de página */}
            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        className={`btn-paginated ${page === pageNumber ? "bg-slate-700 text-white" : ""}`}
                        onClick={() => setPage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {/* Botón Siguiente */}
            <button
                className="btn-paginated"
                onClick={handleNextPage}
                disabled={page === totalPages}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};
