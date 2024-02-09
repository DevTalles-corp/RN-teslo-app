import {ButtonGroup, Input, Layout, Button, useTheme, Text} from '@ui-kitten/components';
import {MainLayout} from '../../layouts/MainLayout';
import {useQuery} from '@tanstack/react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';
import {FadeInImage} from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';



const sizes: Size[] =[Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];



interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme =useTheme();

  const {data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  // useMutation

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <MainLayout title={product.title} subTitle={`Precio: ${product.price}`}>
      <ScrollView style={{flex: 1}}>
        {/* Imágenes de el producto */}
        <Layout>
          {/* TODO: tener en consideración cuando no hay imágenes */}
          <FlatList
            data={product.images}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <FadeInImage
                uri={item}
                style={{width: 300, height: 300, marginHorizontal: 7}}
              />
            )}
          />
        </Layout>

        {/* Formulario */}
        <Layout style={{marginHorizontal: 10}}>
          <Input
            label="Título"
            value={product.title}
            style={{marginVertical: 5}}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{marginVertical: 5}}
          />
          <Input
            label="Descripción"
            value={product.description}
            multiline
            numberOfLines={5}
            style={{marginVertical: 5}}
          />
        </Layout>

        {/* Precio e inventario */}
        <Layout
          style={{
            marginVertical: 5,
            marginHorizontal: 15,
            flexDirection: 'row',
            gap: 10,
          }}>
          <Input
            label="Precio"
            value={product.price.toString()}
            style={{flex: 1}}
          />

          <Input
            label="Inventario"
            value={product.stock.toString()}
            style={{flex: 1}}
          />
        </Layout>

        {/* Selectores */}
          <ButtonGroup 
            style={{  margin:2, marginTop: 20, marginHorizontal: 15}}
            size="small"
            appearance="outline"
          >
            {
              sizes.map((size) => (   
                <Button 
                  key={size}
                  style={{ 
                    flex: 1,
                    backgroundColor: true ? theme['color-primary-200'] : undefined
                }}
                >{size}</Button>
              ))
            }  
          </ButtonGroup>


          <ButtonGroup 
            style={{  margin:2, marginTop: 20, marginHorizontal: 15}}
            size="small"
            appearance="outline"
          >
            {
              genders.map((gender) => (
                <Button 
                  key={gender}
                  style={{ 
                    flex: 1,
                    backgroundColor: true ? theme['color-primary-200'] : undefined
                }}
                >{gender}</Button>
              ))
            }  
          </ButtonGroup>


        {/* Botón de guardar */}
        <Button
          accessoryLeft={ <MyIcon name="save-outline" white /> }
          onPress={() => console.log('Guardar')}
          style={{margin: 15}}
        >
          Guardar
        </Button>

        <Text>{ JSON.stringify(product, null, 2) }</Text>


        <Layout style={{height: 200}} />
      </ScrollView>
    </MainLayout>
  );
};
