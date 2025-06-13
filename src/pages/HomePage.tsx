import { ProductGrid } from '../components/home/ProductGrid';
import { prepareProducts } from '../helpers';
import { TwoImages } from '../components/home/TwoImages';
import { InfoRow } from '../components/home/InfoRow';
import { useHomeProducts  } from '../hooks/products/useHomeProducts';
import { ProductGridSkeleton } from '../components/skeletons/ProductGridSkeleton';

export const HomePage = () => {
    const { recentProducts, popularProducts, isLoading } = useHomeProducts();

    const preparedRecentProducts = prepareProducts(recentProducts);
    const preparedPopularProducts = prepareProducts(popularProducts);


    return (
        <div>
            <InfoRow />
            {
                isLoading ? (
                   <ProductGridSkeleton numberOfProducts={4} />
                ): (
                    <ProductGrid title="Nuevos Productos" products={preparedRecentProducts} />
                )}
            <TwoImages />
            {
                isLoading ? (
                   <ProductGridSkeleton numberOfProducts={4} />
                ): (
                    <ProductGrid title="Productos Populares" products={preparedPopularProducts} /> 
                )}

        </div>
    );
};

