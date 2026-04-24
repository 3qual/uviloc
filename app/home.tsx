import BottomMenu from "../components/BottomMenu/BottomMenu";
import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { RootState, useDispatch, useSelector } from "../state/store";
import { useEffect } from "react";
import { View } from "react-native";
import { fetchUserLocation } from "../slices/locationSlice";
import { getData } from "../utils/storage";
import { UserData } from "../types/user";
import { login } from "../slices/authSlice";

const Home = () => {
    const trackers = useSelector((state) => state.trackers.trackers);

    const dispatch = useDispatch();

    useEffect(() => {}, [trackers]);

    useEffect(() => {dispatch(fetchUserLocation())}, []);

    useEffect(() => {
        const checkToken = async () => {
            const storedUserData = await getData('user_data') as UserData;
            
            if (storedUserData) dispatch(login({userData: storedUserData}))
        }

        checkToken();
    }, [])
    
    return (
        <View style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
            <BottomMenu />
        </View>
    )
}

export default Home;
