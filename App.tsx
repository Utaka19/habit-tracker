import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";

type Habit = {
  id: string;
  name: string;
  done: boolean;
};

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "筋トレ", done: false },
    { id: "2", name: "英語", done: true },
    { id: "3", name: "読書", done: false },
  ]);

  const today = new Date().toLocaleDateString();

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={{ padding: 20 }}>
        {/* タイトル */}
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Habit Tracker
        </Text>

        {/* 日付 */}
        <Text style={{ color: "#aaa", marginBottom: 20 }}>{today}</Text>

        {/* リスト */}
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleHabit(item.id)}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#1e1e1e",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              {/* チェック */}
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: item.done ? "#4CAF50" : "transparent",
                  borderWidth: 2,
                  borderColor: item.done ? "#4CAF50" : "#555",
                }}
              >
                {item.done && (
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    ✓
                  </Text>
                )}
              </View>

              {/* 習慣名 */}
              <Text style={{ color: "white", fontSize: 16 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* 追加ボタン */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2196F3",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 10,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            ＋ 習慣を追加
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}