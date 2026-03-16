import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import { fetchLocations, fetchWeatherForecast } from './api/Weather';
import { weatherImages } from './constants/Index';

const Main = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const currentHour = new Date().getHours();

  const handleLocation = loc => {
    console.log('Location:', loc);
    setLocation([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      console.log('Got forecast', data);
    });
  };

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(data => {
        setLocation(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
      cityName: 'Lucknow',
      days: '7',
    }).then(data => {
      setWeather(data);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location, forecast } = weather || {};

  return (
    <SafeAreaView style={{ backgroundColor: '#1f1f1fff', flex: 1 }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            gap: 10,
          }}
        >
          <ActivityIndicator size="large" color="#0013c2" />
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 18,
              margin: 5,
            }}
          >
            Loading Weather Info...
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            {showSearch ? (
              <View>
                <View style={styles.searchbar}>
                  <TextInput
                    placeholder="Search City"
                    placeholderTextColor={'black'}
                    onChangeText={handleTextDebounce}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      toggleSearch(!showSearch);
                    }}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 13,
                    }}
                  >
                    <Image
                      source={require('./assets/search.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#000',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {locations.length > 0 && showSearch ? (
                  <View
                    style={{
                      width: '95%',
                      backgroundColor: '#efefefff',
                      gap: 5,
                      borderRadius: 10,
                      position: 'absolute',
                      top: 50,
                      zIndex: 1,
                    }}
                  >
                    {locations.map((loc, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => handleLocation(loc)}
                          key={index}
                          style={{
                            padding: 10,
                            borderBottomWidth: 0.5,
                            flexDirection: 'row',
                            gap: 10,
                          }}
                        >
                          <Image
                            source={require('./assets/location.png')}
                            style={{ width: 20, height: 20 }}
                          />
                          <Text>
                            {loc?.name}, {loc?.country}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            ) : (
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                  }}
                >
                  <Image
                    source={require('./assets/location.png')}
                    style={{ width: 20, height: 20, tintColor: '#fff' }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: 18,
                      margin: 5,
                    }}
                  >
                    {location?.name}, {location?.country}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    toggleSearch(!showSearch);
                  }}
                  style={{
                    paddingVertical: 13,
                  }}
                >
                  <Image
                    source={require('./assets/search.png')}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#fff',
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.firstbox}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 45 }}>
                {current?.temp_c}°C
              </Text>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                Feels Like: {current?.feelslike_c}°C
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={weatherImages[current?.condition?.text]}
                  style={{ width: 15, height: 15 }}
                />
                <Text
                  style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
                >
                  {current?.condition?.text}
                </Text>
              </View>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>
                {forecast?.forecastday[0].day.mintemp_c}°C/
                {forecast?.forecastday[0].day.maxtemp_c}°C
              </Text>
            </View>
            <View style={styles.secondbox}>
              <View
                style={{
                  backgroundColor: '#2c2c2cff',
                  width: '48%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <Image
                    source={require('./assets/sunrise.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text
                    style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
                  >
                    Sunrise
                  </Text>
                </View>
                <Text
                  style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
                >
                  {forecast?.forecastday[0].astro.sunrise}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#2c2c2cff',
                  width: '48%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <Image
                    source={require('./assets/sunset.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text
                    style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
                  >
                    Sunset
                  </Text>
                </View>
                <Text
                  style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
                >
                  {forecast?.forecastday[0].astro.sunset}
                </Text>
              </View>
            </View>
            <FlatList
              data={weather?.forecast?.forecastday?.[0]?.hour.slice(
                currentHour,
              )}
              horizontal
              keyExtractor={item => item.time}
              contentContainerStyle={{ marginVertical: 10, gap: 10 }}
              ListEmptyComponent={() => (
                <Text style={{ color: '#fff' }}>No forecast available</Text>
              )}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.timebox}>
                  <Text style={{ color: '#fff' }}>
                    {item.time.split(' ')[1]}
                  </Text>
                  <Image
                    source={weatherImages[item.condition?.text]}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{ color: '#fff' }}>{item.temp_c}°C</Text>
                </View>
              )}
            />
          </View>
          <FlatList
            data={weather?.forecast?.forecastday?.slice(1)}
            keyExtractor={item => item.date}
            ListEmptyComponent={() => (
              <Text style={{ color: '#fff', paddingLeft: 10 }}>
                No forecast available
              </Text>
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              let date = new Date(item.date);
              let options = { weekday: 'long' };
              let dayName = date.toLocaleDateString('en-US', options);
              return (
                <View style={{ alignItems: 'center' }}>
                  <View style={styles.daybox}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ color: '#fff', fontWeight: '600' }}>
                        {dayName}, {item.date}
                      </Text>
                      <Text style={{ color: '#fff' }}>
                        {item.day.mintemp_c}°C/{item.day.maxtemp_c}°C
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={weatherImages[item.day.condition?.text]}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text style={{ color: '#fff' }}>
                        {item.day.condition.text}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  searchbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#efefefff',
    gap: 5,
    borderRadius: 10,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  firstbox: {
    backgroundColor: '#2c2c2cff',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    margin: 10,
  },
  secondbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  timebox: {
    alignItems: 'center',
    width: 70,
    backgroundColor: '#2c2c2cff',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  daybox: {
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cdcdcdff',
    padding: 15,
    gap: 5,
    marginVertical: 5,
  },
});
