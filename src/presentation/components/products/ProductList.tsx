import {Layout, List, Text} from '@ui-kitten/components';
import {Product} from '../../../domain/entities/product';
import {ProductCard} from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);


  const onPullToRefresh = async() => {
    setIsRefreshing(true);
    // Sleep 2
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsRefreshing(false);
  }

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
      
      onEndReached={ fetchNextPage }
      onEndReachedThreshold={0.8}

      refreshControl={ 
        <RefreshControl 
          refreshing={ isRefreshing }
          onRefresh={ onPullToRefresh }
        />
      }


    />
  );
};
