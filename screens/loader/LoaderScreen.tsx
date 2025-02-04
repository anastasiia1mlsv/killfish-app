import React from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet} from "react-native";
import {COLORS} from "../../constants/colors";

const LoaderScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size="small" color={COLORS.primary_white} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary_yellow
    }
})

export default LoaderScreen;
