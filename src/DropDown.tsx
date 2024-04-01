import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

const DropDown: React.FC<{
  labelText: string;
  //   defaultText: string;
  countriesData: {country: string; code: string; iso: string}[];
}> = ({labelText, /* defaultText, */ countriesData}) => {
  const [selectCountry, setSelectCountry] = useState('Select Country');
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [data, setData] =
    useState<{country: string; code: string; iso: string}[]>(countriesData);
  const searchRef = useRef<TextInput>(null);

  const onSearch = (txt: string) => {
    if (txt !== '') {
      let tempData = data.filter(item => {
        return item.country.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(countriesData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{labelText}</Text>
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => setIsClicked(!isClicked)}>
        <Text>{selectCountry}</Text>
        {isClicked ? (
          <Image source={require('../asset/upload.png')} style={styles.icon} />
        ) : (
          <Image
            source={require('../asset/dropdown.png')}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
      {isClicked ? (
        <View style={styles.dropdownArea}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={text => onSearch(text)}
          />
          <FlatList
            data={data}
            renderItem={({index, item}) => {
              return (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectCountry(item.country);
                    onSearch('');
                    searchRef.current?.clear();
                    setIsClicked(false);
                  }}>
                  <Text>{item.country}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 100,
    alignSelf: 'center',
  },
  dropdownSelector: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    height: 24,
    width: 24,
  },
  dropdownArea: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
  },
  searchInput: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 15,
  },
  countryItem: {
    width: '85%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
