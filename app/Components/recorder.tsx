import { useState, useRef } from 'react';
import { ClipLoader } from 'react-spinners';

type RecorderProps = {
    recording: boolean; // This defines recording as a boolean
  setRecording: (recording: boolean) => void; // This defines setRecording as a function that takes a boolean argument and returns void
    setAWSURL: (url: string) => void; // This defines setAWSURL as a function that takes a string argument and returns void
  };
  

  export default function Recorder({ setAWSURL, setRecording, recording }: RecorderProps) {

    const [isUploading, setIsUploading] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);  
  const audioChunksRef = useRef<Blob[]>([]);

  const uploadRecording = async (audioBlob: Blob) => {

    setIsUploading(true);

    try {
      const response = await fetch('https://vetbuddy.onrender.com/generate-upload-url');
    //   const response = await fetch('http://localhost:5050/generate-upload-url');
      const { uploadURL, key } = await response.json();

      console.log('Uploading recording to:', uploadURL);
  
      await fetch(uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'audio/wav',
        },
        body: audioBlob
      });
  
      setIsUploading(false);
      alert('Recording uploaded successfully');
      const fileAccessURL = `https://vetbuddy.s3.us-west-2.amazonaws.com/${key}`;
      setAWSURL(fileAccessURL);
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
    <div className='bg-gray-400 mb-10 flex flex-col items-center justify-between p-24'>
      {recording ? (
        <button
          className='bg-slate-600 p-2 rounded mb-2'
          onClick={stopRecording}>Stop Recording</button>
      ) : (
        isUploading ? 
          <ClipLoader color='#ffffff' />
          : (
            <>
              <button 
                className='bg-slate-600 p-2 rounded mb-2'
                onClick={startRecording}>Start Recording</button>
              {audioURL && <audio src={audioURL} controls />}
            </>
          )
      )}
    </div>
  );
  
}
