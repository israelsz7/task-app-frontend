import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { getTasks, deleteTask } from '../api/tasks';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert('Excluir', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(id);
          loadTasks();
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={[styles.title, item.done && styles.done]}>{item.title}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
        <Text style={styles.status}>{item.done ? '✅ Concluída' : '🕐 Pendente'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => navigation.navigate('Form', { task: item })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa cadastrada.</Text>
        }
        contentContainerStyle={{ padding: 16 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Form', {})}
      >
        <Text style={styles.fabText}>+ Nova</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  card: {
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardContent: { marginBottom: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#e0e0f0' },
  done: { textDecorationLine: 'line-through', color: '#888' },
  description: { fontSize: 14, color: '#aaa', marginTop: 4 },
  status: { fontSize: 13, color: '#7b7bff', marginTop: 6 },
  actions: { flexDirection: 'row', gap: 8 },
  btnEdit: {
    flex: 1,
    backgroundColor: '#4a4af0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnDelete: {
    flex: 1,
    backgroundColor: '#b03060',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#666', marginTop: 60, fontSize: 16 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4a4af0',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 50,
    elevation: 6,
  },
  fabText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
