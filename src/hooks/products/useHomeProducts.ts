import { useQueries } from '@tanstack/react-query';
import { getRecentProducts, getRandomProducts } from '../../actions'; // Asegúrate de importar las funciones correctamente

export const useHomeProducts = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['recentProducts'],
                queryFn: getRecentProducts,
            },
            {
                queryKey: ['popularProducts'],
                queryFn: getRandomProducts,
            },
        ],
    });

    // Desestructurar los resultados del array
    const [recentProductsResult, popularProductsResult] = results;

    const isLoading = recentProductsResult.isLoading || popularProductsResult.isLoading;
    const error = recentProductsResult.error || popularProductsResult.error;

    return {
        recentProducts: recentProductsResult.data || [],
        popularProducts: popularProductsResult.data || [],
        isLoading,
        error,
    };
};
