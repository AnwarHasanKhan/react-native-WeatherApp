import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
