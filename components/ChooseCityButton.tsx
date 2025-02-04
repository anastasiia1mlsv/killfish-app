import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {selectCity} from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import {COLORS} from "../constants/colors";

type NavigationProp = StackNavigationProp<RootStackParamList, "CitySelection">;

interface PrimaryButtonProps {
    item: {
        city_id: number;
        title: string;
        bars: { bar_id: number; title: string; address: string }[];
    };
}

const ChooseCityButton: React.FC<PrimaryButtonProps> = ({ item }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                dispatch(selectCity(item));
                navigation.navigate("BarSelection");
            }}
        >
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderColor: COLORS.border_color
    },
    text: {
        fontSize: 16,
        color: COLORS.font_color_secondary,
        fontWeight: "500"
    }
})

export default ChooseCityButton;
