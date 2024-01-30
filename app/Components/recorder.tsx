import { useState, useRef } from 'react';

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);  
  const audioChunksRef = useRef<Blob[]>([]);

  const uploadRecording = async (audioBlob: Blob) => {
    try {
      const response = await fetch('https://vetbuddy.onrender.com/generate-upload-url');
      const { uploadURL } = await response.json();

      console.log('Uploading recording to:', uploadURL);
  
      await fetch(uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'audio/wav',
        },
        body: audioBlob
      });
  
      alert('Recording uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    }
  };
  

  const startRecording = async () => {
    // Revoke the previous audio URL to free up memory
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL('');
    }
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      // Reset audio chunks
      audioChunksRef.current = [];
  
      mediaRecorderRef.current.addEventListener('dataavailable', event => {
        audioChunksRef.current.push(event.data);
      });
  
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      });
  
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error in starting recording:', err);
    }
  };
  

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
  
    mediaRecorderRef.current.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);
  
      // Call the upload function
      uploadRecording(audioBlob);
    });
  
    mediaRecorderRef.current.stop();
    setRecording(false);
  };
  

  return (
    <div
    className='bg-gray-400 mb-10 flex flex-col items-center justify-between p-24'
    >
      {recording ? (
        <button
        className='bg-slate-600 p-2 rounded mb-2'
        onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button 
        className='bg-slate-600 p-2 rounded mb-2'
        onClick={startRecording}>Start Recording</button>
      )}
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
}
