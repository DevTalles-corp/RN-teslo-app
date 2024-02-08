import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';


export const HomeScreen = () => {

  const { logout } = useAuthStore();

  getProductsByPage(0);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>


      {/* <Icon name="facebook" /> */}

      <Button
        accessoryLeft={ <Icon name="log-out-outline" /> }
        onPress={ logout }
      >
        Cerrar sesión
      </Button>
      
    </Layout>
  )
}