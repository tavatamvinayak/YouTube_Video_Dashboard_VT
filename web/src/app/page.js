'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Video_details from '@/components/Video_details';
import Video_input from '@/components/Video_input';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

export default function Dashboard() {
  const [videoId, setVideoId] = useState('');
  const [video, setVideo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newComment, setNewComment] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editNoteContent, setEditNoteContent] = useState('');

  const fetchVideo = async () => {
    if (!videoId) return;
    try {
      const response = await axios.get(`${API_BASE}/video/${videoId}`);
      setVideo(response.data);
      setEditTitle(response.data.snippet.title);
      setEditDescription(response.data.snippet.description);
    } catch (error) {
      alert('Error fetching video: ' + error.message);
    }
  };

  const fetchNotes = async () => {
    if (!videoId) return;
    try {
      const response = await axios.get(`${API_BASE}/notes?videoId=${videoId}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchLogs = async () => {
    if (!videoId) return;
    try {
      const response = await axios.get(`${API_BASE}/logs?videoId=${videoId}`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const updateVideo = async () => {
    try {
      await axios.put(`${API_BASE}/video/${videoId}/update`, {
        title: editTitle,
        description: editDescription
      });
      alert('Video updated successfully');
      fetchVideo();
      fetchLogs();
    } catch (error) {
      alert('Error updating video: ' + error.message);
    }
  };

  const addComment = async () => {
    if (!newComment) return;
    try {
      await axios.post(`${API_BASE}/video/${videoId}/comment`, {
        text: newComment
      });
      setNewComment('');
      alert('Comment added successfully');
      fetchLogs();
    } catch (error) {
      alert('Error adding comment: ' + error.message);
    }
  };

  const addNote = async () => {
    if (!newNote) return;
    try {
      await axios.post(`${API_BASE}/notes`, {
        videoId,
        content: newNote
      });
      setNewNote('');
      fetchNotes();
      fetchLogs();
    } catch (error) {
      alert('Error adding note: ' + error.message);
    }
  };
  const updateNote = async (noteId) => {
    if (!editNoteContent) return;
    try {
      await axios.put(`${API_BASE}/notes/${noteId}`, {
        content: editNoteContent
      });
      setEditingNote(null);
      setEditNoteContent('');
      fetchNotes();
      fetchLogs();
    } catch (error) {
      alert('Error updating note: ' + error.message);
    }
  };

  const startEditNote = (note) => {
    setEditingNote(note._id);
    setEditNoteContent(note.content);
  };

  const cancelEditNote = () => {
    setEditingNote(null);
    setEditNoteContent('');
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${API_BASE}/notes/${noteId}`);
      fetchNotes();
      fetchLogs();
    } catch (error) {
      alert('Error deleting note: ' + error.message);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchNotes();
      fetchLogs();
    }
  }, [videoId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">YouTube Video Dashboard</h1>
        
        {/* Video ID Input */}
        <Video_input
        videoId={videoId}
        setVideoId={setVideoId}
        fetchVideo={fetchVideo}
        />

        {video && (
          <>
            {/* Video Details */}
           <Video_details
           video={video}
           notes={notes}
           logs={logs}
           newNote={newNote}
           setNewNote={setNewNote}
           newComment={newComment}
           setNewComment={setNewComment}
           editTitle={editTitle}
           setEditTitle={setEditTitle}
           editDescription={editDescription}
           setEditDescription={setEditDescription}
           updateVideo={updateVideo}
           addComment={addComment}
           addNote={addNote}
           deleteNote={deleteNote}
           updateNote={updateNote}
           startEditNote={startEditNote}
           cancelEditNote={cancelEditNote}
           editingNote={editingNote}
           editNoteContent={editNoteContent}
           setEditNoteContent={setEditNoteContent}
           />
          </>
        )}
      </div>
    </div>
  );
}