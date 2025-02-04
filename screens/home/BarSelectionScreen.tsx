import React from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../types/navigation";
import ChooseBarButton from "../../components/ChooseBarButton";
import {COLORS} from "../../constants/colors";
import {STRINGS} from "../../constants/strings";

type RouteProps = RouteProp<RootStackParamList, "BarSelection">;

const BarSelectionScreen = ({ route }: { route: RouteProps }) => {
    const selectedCity = useSelector((state: RootState) => state.selectedCity);

    if (!selectedCity) return <Text>{STRINGS.choose_city}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    {selectedCity.title}
                </Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={styles.flatlistContainer}
                    data={selectedCity.bars}
                    keyExtractor={(item) => item.bar_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.button}>
                            <ChooseBarButton item={item} />
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
        backgroundColor: COLORS.primary_yellow
    },
    headerContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_yellow,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: COLORS.font_color_primary,
    },
    listContainer: {
        flex: 5,
        backgroundColor: COLORS.primary_yellow
    },
    flatlistContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.primary_white,
        borderTopRightRadius : 30,
        borderTopLeftRadius: 30
    },
    button: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 16
    }
})

export default BarSelectionScreen;
