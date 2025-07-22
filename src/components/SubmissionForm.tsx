import React, { useState, useRef } from 'react';
import { X, Mic, Square, Play, Trash2 } from 'lucide-react';

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  country: { name: string; code: string; lat: number; lng: number } | null;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ 
  isOpen, 
  onClose, 
  country 
}) => {
  const [phrase, setPhrase] = useState('');
  const [language, setLanguage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phrase.trim() || !country) {
      alert('Please enter a phrase');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('phrase', phrase.trim());
      formData.append('language', language.trim());
      formData.append('country', country.name);
      formData.append('countryCode', country.code);
      formData.append('region', country.name); // Using country as region for now
      formData.append('lat', country.lat.toString());
      formData.append('lng', country.lng.toString());
      formData.append('timestamp', new Date().toISOString());

      if (audioBlob) {
        formData.append('audio', audioBlob, 'recording.wav');
      }

      const response = await fetch('/api/submissions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      
      // Reset form
      setPhrase('');
      setLanguage('');
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
      
      alert('Submission successful!');
      onClose();

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !country) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-[9999] transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
            <p className="text-sm text-gray-600">Share your language</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Word or Phrase *
              </label>
              <textarea
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Enter a word or phrase in your local language..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                required
              />
            </div>

            {/* Language Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language/Dialect
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g., Spanish, Mandarin, Local dialect..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Audio Recording */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Audio Recording (Optional)
              </label>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                {!audioBlob && !isRecording && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={startRecording}
                      className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Mic className="h-6 w-6" />
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Click to start recording</p>
                  </div>
                )}

                {isRecording && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="bg-red-500 text-white p-4 rounded-full animate-pulse shadow-lg"
                    >
                      <Square className="h-6 w-6" />
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      Recording... {formatTime(recordingTime)}
                    </p>
                    <p className="text-xs text-gray-500">Click to stop</p>
                  </div>
                )}

                {audioBlob && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={playRecording}
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-700">
                        Recording ready ({formatTime(recordingTime)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={deleteRecording}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata Display */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Metadata</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Country:</strong> {country.name}</p>
                <p><strong>Region:</strong> {country.name}</p>
                <p><strong>Coordinates:</strong> {country.lat.toFixed(2)}, {country.lng.toFixed(2)}</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Language Data'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};