import { colors } from '@/constants/Colors';
import { adsData, categoriesData } from '@/constants/dummyData';
import {
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
import { useState } from 'react';

export default function HomeScreen() {
  const [text, onChangeText] = useState('');

  const handleSearch = (text) => {
    onChangeText(text);
  };
  const Header = () => (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}
    >
      <View
        style={{ flexDirection: 'row', width: '50%', alignItems: 'center' }}
      >
        <MapPinIcon size={16} color={colors.white} />
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: '600',
            marginRight: 20,
            marginLeft: 10,
          }}
        >
          14, Abimbola Street,...
        </Text>
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
      <View
        style={{
          marginTop: 20,
          width: '90%',
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
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
      <View
        style={{
          width: '85%',

          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          rowGap: 30,
          alignSelf: 'center',
          marginTop: 40,
        }}
      >
        {categoriesData.map((item) => (
          <View style={{ width: '20%', alignItems: 'center' }}>
            <Image
              source={item.image}
              style={{
                height: 26,
                width: 26,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: '6500' }}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const Ads = () => {
    type ItemProps = { title: string; color: string };

    const Item = ({ title, color }: ItemProps) => (
      <View
        style={{
          backgroundColor: color,
          paddingHorizontal: 30,
          paddingVertical: 40,
          width: '96%',

          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 6,
        }}
      >
        <Text style={{ color: 'white' }}>{title}</Text>
      </View>
    );

    return (
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <FlatList
          horizontal
          data={adsData}
          renderItem={({ item }) => (
            <Item title={item.text} color={item.color} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={
            {
              // flex: 1,
              // width: '100%',
            }
          }
        />
      </View>
    );
  };

  const PopularRestaurants = () => {
    type ItemProps = { title: string; color: string };

    const [liked, setLiked] = useState(false);

    const Item = ({ title, color }: ItemProps) => (
      <View>
        <View
          style={{
            backgroundColor: color,
            paddingHorizontal: 30,
            paddingVertical: 40,
            width: '96%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}
        >
          <Text style={{ color: 'white' }}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                height: 24,
                width: 24,
              }}
            />
            <View>
              <Text style={{ fontWeight: '600' }}>Grand Fingers</Text>
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
      <View style={{ width: '100%', marginTop: 20 }}>
        <TitleGen title={'Popular Restaurants'} />
        <View style={{ marginLeft: 20, marginTop: 12 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={adsData}
            renderItem={({ item }) => (
              <Item title={item.text} color={item.color} />
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

    const Item = ({ title, color }: ItemProps) => (
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: color,
            paddingHorizontal: 30,
            paddingVertical: 40,
            height: 160,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        >
          <Text style={{ color: 'white' }}>{title}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              Chicken Republic
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
      <View style={{ width: '100%', marginTop: 20 }}>
        <TitleGen title={'Restaurants'} />
        <View style={{ marginHorizontal: 20, marginTop: 12 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={adsData}
            renderItem={({ item }) => (
              <Item title={item.text} color={item.color} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  const PopularOrders = () => {
    type ItemProps = { title: string; color: 'string' };

    const [liked, setLiked] = useState(false);

    const Item = ({ title, color }: ItemProps) => (
      <View>
        <View
          style={{
            backgroundColor: color,
            paddingHorizontal: 30,
            paddingVertical: 40,
            width: '96%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}
        >
          <Text style={{ color: 'white' }}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                height: 24,
                width: 24,
              }}
            />
            <View>
              <Text style={{ fontWeight: '600' }}>Grand Fingers</Text>
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
      <View style={{ width: '100%', marginTop: 20 }}>
        <TitleGen title={'Popular Orders'} />
        <View style={{ marginLeft: 20, marginTop: 12 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={adsData}
            renderItem={({ item }) => (
              <Item title={item.text} color={item.color} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        animated={true}
        backgroundColor='#61dafb'
        barStyle={'light-content'}
      />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Categories />
        <Ads />
        <PopularRestaurants />
        <Restaurants />
        <PopularOrders />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
