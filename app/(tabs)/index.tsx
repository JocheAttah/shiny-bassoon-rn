import { colors } from '@/constants/Colors';
import { categoriesData } from '@/constants/dummyData';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import { HeartIcon as HeartOutlineIcon } from 'react-native-heroicons/outline';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';

const HomeScreen = observer(() => {
  const [text, onChangeText] = useState('');
  const { restaurantStore } = useStores();
  const {
    ads,
    adsLoading,
    restaurants,
    restaurantsLoading,
    popRestaurants,
    popRestaurantsLoading,
    orders,
    ordersLoading,
  } = restaurantStore;

  const handleSearch = (text) => {
    onChangeText(text);
  };
  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <MapPinIcon size={16} color={colors.white} />
        <Text style={styles.headerText}>14, Abimbola Street,...</Text>
        <ChevronDownIcon size={18} color={colors.white} />
      </View>
      <View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Pickup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option]}>
            <StarIcon size={12} color={colors.white} />
            <Text style={[styles.optionText]}>Ratings</Text>
            <ChevronDownIcon size={12} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: '#BFD9CA' }]}
          >
            <Text style={[styles.optionText, { color: '#0C4010' }]}>
              Under 30 min
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Price</Text>
            <ChevronDownIcon size={12} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color={'#5F5F5F'} />
        <TextInput
          style={[styles.textInput, { fontSize: 14 }]}
          onChangeText={handleSearch}
          value={text}
          placeholder='Search'
        />
      </View>
    </View>
  );

  const Categories = () => {
    return (
      <View style={styles.categoriesContainer}>
        {categoriesData.map((item) => (
          <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => console.warn(`${item.text} clicked`)}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Ads = () => {
    type ItemProps = { title: string; color: string };

    return (
      <View style={styles.adsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ads.map((item) => (
            <View style={styles.adContainer}>
              <Image source={{ uri: item.image }} style={styles.adImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const PopularRestaurants = () => {
    type ItemProps = { title: string; color: string };

    const [liked, setLiked] = useState(false);

    const Item = ({ image, title }: ItemProps) => (
      <View>
        <View style={styles.itemContainer}>
          <Image source={{ uri: image }} style={styles.itemImage} />
        </View>
        <View style={styles.itemView}>
          <View style={styles.itemImageContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.itemImageSec}
            />
            <View>
              <Text numberOfLines={1} style={{ fontWeight: '600', width: 140 }}>
                {title}
              </Text>
              <Text style={{ fontSize: 10 }}>
                4.9 mi · 38 min · N1,000 delivery fee{' '}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            {!liked ? (
              <HeartOutlineIcon size={20} color='#5F5F5F' />
            ) : (
              <HeartIcon size={20} color={'red'} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <View style={styles.sectionContainer}>
        <TitleGen title={'Popular Restaurants'} />
        <View style={styles.innerSectionContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popRestaurants}
            renderItem={({ item }) => (
              <Item image={item.image} title={item.title} id={item.id} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  const TitleGen = ({ title }: { title: string }) => (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 18 }}>{title}</Text>
      <TouchableOpacity
        style={{
          width: 26,
          height: 26,
          borderRadius: 50,
          backgroundColor: colors.grey,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ArrowRightIcon size={18} color={colors.black} />
      </TouchableOpacity>
    </View>
  );

  const Restaurants = () => {
    type ItemProps = { title: string; color: string };

    const [liked, setLiked] = useState(false);

    const Item = ({ title, image }: ItemProps) => (
      <View style={styles.margin20utility}>
        <View style={styles.resImageContainer}>
          <Image source={{ uri: image }} style={styles.resImage} />
        </View>
        <View style={{ width: '100%' }}>
          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              style={{ fontWeight: '600', fontSize: 16, width: '80%' }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              {!liked ? (
                <HeartOutlineIcon size={20} color='#5F5F5F' />
              ) : (
                <HeartIcon size={20} color={'red'} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ fontWeight: '500', fontSize: 14 }}>
                Fries, Chicken, Drinks. Popcorn...
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 13 }}>4.4</Text>
                <StarIcon size={10} color={'grey'} />
                <Text style={{ fontSize: 13 }}>1,000+ ratings</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: '500', fontSize: 14 }}>
                100ft · 15 min
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 13 }}>N1,000 delivery fee</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <TitleGen title={'Restaurants'} />
        <View style={styles.restaurantContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={restaurants}
            renderItem={({ item }) => (
              <Item title={item.title} image={item.image} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  const PopularOrders = () => {
    type ItemProps = { title: string; image: 'string'; id: 'string' };

    const [liked, setLiked] = useState(false);

    const Item = ({ title, image }: ItemProps) => (
      <View>
        <View style={styles.itemContainer}>
          <Image source={{ uri: image }} style={styles.itemImage} />
        </View>
        <View style={styles.itemView}>
          <View style={styles.itemImageContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.itemImageSec}
            />
            <View>
              <Text numberOfLines={1} style={{ fontWeight: '600', width: 140 }}>
                {title}
              </Text>
              <Text style={{ fontSize: 10 }}>
                4.9 mi · 38 min · N1,000 delivery fee{' '}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            {!liked ? (
              <HeartOutlineIcon size={20} color='#5F5F5F' />
            ) : (
              <HeartIcon size={20} color={'red'} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <View style={styles.sectionContainer}>
        <TitleGen title={'Popular Orders'} />
        <View style={styles.innerSectionContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={orders}
            renderItem={({ item }) => (
              <Item title={item.title} image={item.image} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    restaurantStore.getAds();
    restaurantStore.getRestaurants();
    restaurantStore.getPopRestaurants();
    restaurantStore.getPopOrders();
  }, []);

  if (
    adsLoading ||
    restaurantsLoading ||
    popRestaurantsLoading ||
    ordersLoading
  ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle={'light-content'} />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, width: '100%' }}
      >
        <Categories />
        <Ads />
        <PopularRestaurants />
        <Restaurants />
        <PopularOrders />
      </ScrollView>
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: '100%' },
  textInput: {
    marginLeft: 10,
  },
  optionsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '25%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTextContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
    marginRight: 20,
    marginLeft: 10,
  },
  searchContainer: {
    marginTop: 20,
    width: '90%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoriesContainer: {
    width: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    rowGap: 30,
    alignSelf: 'center',
    marginTop: 40,
  },
  categoryContainer: { width: '22%', alignItems: 'center' },
  categoryImage: {
    height: 26,
    width: 26,
  },
  categoryText: { fontSize: 15, fontWeight: '600' },
  adsContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  adContainer: {
    width: 220,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 20,
  },
  adImage: {
    width: '100%',
    borderRadius: 6,
    height: '100%',
    resizeMode: 'cover',
  },
  sectionContainer: { width: '100%', marginTop: 20 },
  restaurantContainer: { marginHorizontal: 20, marginTop: 12 },
  innerSectionContainer: { marginLeft: 20, marginTop: 12 },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 220,
    height: 100,
  },
  itemImage: {
    width: '100%',
    borderRadius: 6,
    height: '100%',
    resizeMode: 'cover',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  itemImageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemImageSec: {
    height: 24,
    width: 24,
  },
  resImageContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  margin20utility: { marginBottom: 20 },
  resImage: {
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
});
