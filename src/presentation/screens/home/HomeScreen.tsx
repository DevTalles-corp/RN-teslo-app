import {getProductsByPage} from '../../../actions/products/get-products-by-page';
import {useQuery} from '@tanstack/react-query';
import {MainLayout} from '../../layouts/MainLayout';
import { Text } from '@ui-kitten/components';


export const HomeScreen = () => {
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title="TesloShop - Products"
      subTitle="Aplicación administrativa"
      >
        <Text>Hola Mundo</Text>
      </MainLayout>
  );
};
