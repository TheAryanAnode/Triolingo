import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker"; // use expo-av or react-native-document-picker if not using Expo

export default function App() {
  const [audioFile, setAudioFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/mpeg", // restrict to mp3
      });

      // Some versions of the types don't include a `type` discriminator; check for a URI instead
      if ("uri" in result && result.uri) {
        setAudioFile(result);
        console.log("Selected audio:", result.uri);
      }
    } catch (err) {
      console.error("Error picking audio file:", err);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- PAGE 1 --- */}
      <View style={styles.page}>
        <Text style={styles.title}>Welcome to the Speech Trainer</Text>
        <Text style={styles.text}>
          Scroll down to start practicing your pronunciation.
        </Text>
      </View>

      {/* --- PAGE 2 --- */}
      <View style={styles.page}>
        <Text style={styles.title}>Practice Your Speech</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={pickAudioFile}>
          <Text style={styles.buttonText}>Upload MP3</Text>
        </TouchableOpacity>

        

        {audioFile && (
          "name" in audioFile ? (
            <Text style={styles.fileName}>
              Uploaded: {String((audioFile as any).name)}
            </Text>
          ) : "uri" in audioFile ? (
            <Text style={styles.fileName}>
              Uploaded: {String(audioFile.uri ?? "Audio file selected")}
            </Text>
          ) : (
            <Text style={styles.fileName}>Audio file selected</Text>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  page: {
    height: 600,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
  },
  uploadButton: {
    backgroundColor: "#ff0000ff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fileName: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
});
