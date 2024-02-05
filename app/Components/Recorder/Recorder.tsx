import { faMicrophone, faMicrophoneSlash, faSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

type RecorderProps = {
    recording: boolean; // This defines recording as a boolean
  setRecording: (recording: boolean) => void; // This defines setRecording as a function that takes a boolean argument and returns void
    setAWSURL: (url: string) => void; // This defines setAWSURL as a function that takes a string argument and returns void
  };
  

  export default function Recorder({ setAWSURL, setRecording, recording }: RecorderProps) {

  const [isUploading, setIsUploading] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioDuration, setAudioDuration] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);  
  const audioChunksRef = useRef<Blob[]>([]);
  const [dots, setDots] = useState('.');

  const uploadRecording = async (audioBlob: Blob) => {

    setIsUploading(true);

    try {
      const response = await fetch('https://vetbuddy.onrender.com/generate-upload-url');
      const { uploadURL, key } = await response.json();
  
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

  const handleMetadataLoaded = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const duration = event.currentTarget.duration;
    setAudioDuration(new Date(duration * 1000).toISOString().substr(14, 5));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        // Determine the new state based on previous state
        const newDots = prevDots.length < 3 ? prevDots + '.' : '.';
        return newDots;
      });
    }, 500); // Adjust time as needed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); 
  
  return (
    <div className='mt-12 h-18'>
      {recording ? (
        <>
        <button
        className='bg-black rounded p-2 hover:bg-slate-300'
        onClick={stopRecording}>
        <FontAwesomeIcon 
        className='pr-2'
        icon={faMicrophoneSlash} />
          Stop Recording</button>
        <p
        className='text-red-500 font-bold mt-2'
        >Recording in progress {dots}</p>
        </>
      ) : (
        isUploading ? 
          <ClipLoader color='#000' />
          : (
            <div
            className='flex flex-row'
            >
              <button 
                className='bg-black rounded p-2 hover:bg-green-500'
                onClick={startRecording}>
                <FontAwesomeIcon 
                className='pr-2'
                icon={faMicrophone} />
                  Start New Recording
          
                  </button>
              {audioURL && 
              <audio 
              src={audioURL} 
              controls 
              className='ml-4'
              // onLoadedMetadata={handleMetadataLoaded} // Capture audio metadata when loaded
            />
              }
            </div>
          )
      )}
    </div>
  );
  
}
