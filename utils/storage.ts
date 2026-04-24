import AsyncStorage from "@react-native-async-storage/async-storage";

interface StoreDataType {
    key: string, 
    value: string | unknown
}

const storeData = async ({ key, value }: StoreDataType): Promise<void> => {
    try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, stringValue);
    } 
    catch (e) {
        console.error('Error saving data', e);
    }
};

const getData = async (key: string): Promise<string | unknown | null> => {
    try {
        const rawValue = await AsyncStorage.getItem(key);
        if (rawValue === null) return null;

        try {
            return JSON.parse(rawValue);
        } 
        catch (e) {
            return rawValue;
        }
    } 
    catch (e) {
        console.error('Error reading data', e);
        return null;
    }
};

const removeData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data', e);
    }
};

export { storeData, getData, removeData };
