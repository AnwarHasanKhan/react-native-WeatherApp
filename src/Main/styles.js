import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#efefefff',
    paddingHorizontal:5,
    gap: 5,
    borderRadius: 10,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  firstbox: {
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
    backgroundColor:'#ffffff29',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  daybox: {
    width: '95%',
    backgroundColor:'#ffffff29',
    padding: 15,
    gap: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
});
