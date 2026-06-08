import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { createTask, updateTask } from '../api/tasks';

export default function FormScreen({ route, navigation }) {
  const existing = route.params?.task;
  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [done, setDone] = useState(existing?.done || false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório.');
      return;
    }
    if (existing) {
      await updateTask(existing.id, { title, description, done });
    } else {
      await createTask({ title, description, done });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição (opcional)"
        placeholderTextColor="#555"
        multiline
        numberOfLines={4}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Concluída</Text>
        <Switch
          value={done}
          onValueChange={setDone}
          trackColor={{ true: '#4a4af0' }}
          thumbColor={done ? '#fff' : '#888'}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>{existing ? 'Salvar Alterações' : 'Criar Tarefa'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', padding: 24 },
  label: { color: '#aaa', fontSize: 14, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: '#1e1e2e',
    color: '#e0e0f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2e2e4e',
  },
  textarea: { height: 100, textAlignVertical: 'top' },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  btn: {
    backgroundColor: '#4a4af0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
