import React, { useEffect } from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCities} from "../../redux/store";
import { RootState, AppDispatch } from "../../redux/store";
import axios from "axios";
import ChooseCityButton from "../../components/ChooseCityButton";
import { Ionicons } from "@expo/vector-icons";
import LoaderScreen from "../loader/LoaderScreen";
import {COLORS} from "../../constants/colors";
import {STRINGS} from "../../constants/strings";
import {BASE_API_URL} from "../../apiService/urls";

const CitySelectionScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cities = useSelector((state: RootState) => state.cities);

    useEffect(() => {
        axios.get(BASE_API_URL + "?action=cities.bars")
            .then(response => dispatch(setCities(response.data.cities)))
            .catch(error => console.error("Ошибка загрузки данных:", error));
    }, [dispatch]);

    if (!cities.length) return <LoaderScreen />

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{STRINGS.choose_city}</Text>
                <Ionicons name="location" size={24} color={COLORS.font_color_primary} />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={styles.flatlistContainer}
                    data={cities}
                    keyExtractor={(item) => item.city_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.buttonContainer}>
                            <ChooseCityButton item={item} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary_yellow,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary_yellow,
    },
    headerText: {
        color: COLORS.font_color_primary,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    },
    listContainer: {
        flex: 2,
        backgroundColor: COLORS.primary_yellow
    },
    flatlistContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.primary_white,
        borderTopRightRadius : 30,
        borderTopLeftRadius: 30
    },
    buttonContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 16
    }
})

export default CitySelectionScreen;
