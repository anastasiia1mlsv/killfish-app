import React, { useEffect, useState } from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet} from "react-native";
import axios from "axios";
import { RouteProp} from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import {COLORS} from "../../constants/colors";
import LoaderScreen from "../loader/LoaderScreen";
import {BASE_API_URL} from "../../apiService/urls";

type RouteProps = RouteProp<RootStackParamList, "Menu">;

interface MenuSection {
    id: number;
    title: string;
    parent_id: number;
    menu_count: number;
    childs: number[];
}

interface MenuItem {
    item_id: number;
    title: string;
    price: number;
    parent_id: number;
}

const MenuScreen = ({ route }: { route: RouteProps }) => {
    const { barId, barTitle } = route.params;

    const [menuSections, setMenuSections] = useState<MenuSection[]>([]);
    const [menuItems, setMenuItems] = useState<{ [key: number]: MenuItem[] }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMenuStructure();
    }, []);

    // загружаем menu.structure
    const fetchMenuStructure = async () => {
        try {
            const response = await axios.get<{ structure: Record<string, MenuSection> }>(
                BASE_API_URL + `?action=menu.structure&city_id=1&bar_id=${barId}`
            );
            const structure = response?.data?.structure;
            if (!structure || typeof structure !== "object") {
                throw new Error("Ошибка загрузки меню");
            }
            const sections = Object.values(structure) as MenuSection[];
            setMenuSections(sections);
            sections
                .filter((section) => section.menu_count > 0)
                .forEach((section) => fetchMenuItems(section.id));
        } catch (error) {
            console.error("Ошибка загрузки меню:", error);
        } finally {
            setLoading(false);
        }
    };

    // menu.items - список блюд выбранного бара
    const fetchMenuItems = async (parentId: number) => {
        try {
            const response = await axios.get(BASE_API_URL + `?action=menu.items&city_id=1&bar_id=${barId}&parent_id=${parentId}`);
            setMenuItems((prev) => ({ ...prev, [parentId]: response?.data?.items }));
        } catch (error) {
            console.error(`Ошибка загрузки блюд ${parentId}:`, error);
        }
    };

    if (loading) return <LoaderScreen />

    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>
              {barTitle}
          </Text>
         <View style={styles.roundContainer}>
             <FlatList
                 contentContainerStyle={styles.flatlistContainer}
                 data={menuSections}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({ item }) => (
                     <View style={styles.itemWrapContainer}>
                         <Text style={styles.itemTitle}>{item.title}</Text>
                         {/* Список блюд категории */}
                         {menuItems[item.id] && (
                             <FlatList
                                 data={menuItems[item.id]}
                                 keyExtractor={(menuItem) => menuItem.item_id.toString()}
                                 renderItem={({ item: menuItem }) => (
                                     <View style={styles.itemContainer}>
                                         <Text style={styles.itemName} numberOfLines={2} ellipsizeMode="tail">
                                             {menuItem.title}
                                         </Text>
                                         <Text style={styles.itemPrice}>
                                             {(menuItem.price / 100).toFixed(2)} ₽
                                         </Text>
                                     </View>
                                 )}
                             />
                         )}
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
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15
    },
    roundContainer: {
        flex: 2,
        backgroundColor: COLORS.primary_yellow
    },
    itemTitle : {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10
    },
    itemWrapContainer: {
        flex: 1,
        paddingHorizontal: 16
    },
    flatlistContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.primary_white,
        borderTopRightRadius : 30,
        borderTopLeftRadius: 30
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    itemName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "400",
        marginRight: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MenuScreen;

