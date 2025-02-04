import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { selectBar } from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import {COLORS} from "../constants/colors";

type NavigationProp = StackNavigationProp<RootStackParamList, "BarSelection">;

interface PrimaryButtonProps {
    item: {
        bar_id: number;
        title: string;
        address: string
    };
}

const ChooseBarButton: React.FC<PrimaryButtonProps> = ({ item }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                dispatch(selectBar(item));
                navigation.navigate("Menu", { barId: item.bar_id, barTitle: item.title });
            }}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.address}>{item.address}</Text>
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
    title: {
        fontSize: 16,
        color: COLORS.font_color_secondary,
        fontWeight: "500"
    },
    address: {
        fontSize: 12,
        color: COLORS.font_color_tertiary,
    }
})

export default ChooseBarButton;
