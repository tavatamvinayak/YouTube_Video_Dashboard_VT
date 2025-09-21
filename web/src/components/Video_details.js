import React from 'react'

export default function Video_details({
    video,
    notes,
    logs,
    newNote,
    setNewNote,
    newComment,
    setNewComment,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    updateVideo,
    addComment,
    addNote,
    deleteNote,
    updateNote,
    startEditNote,
    cancelEditNote,
    editingNote,
    editNoteContent,
    setEditNoteContent }) {
    return (
        <div>
            {/* Video Details */}
            <Detail_video video={video} />
            {/* Edit Video */}
            <Edit_video
                setEditTitle={setEditTitle}
                setEditDescription={setEditDescription}
                editTitle={editTitle}
                editDescription={editDescription}
                updateVideo={updateVideo} />
            {/* Add Comment */}
            <Add_comment
                newComment={newComment}
                setNewComment={setNewComment}
                addComment={addComment}
            />
            {/* Notes Section */}
            <Note_section
                notes={notes}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
                deleteNote={deleteNote}
                updateNote={updateNote}
                startEditNote={startEditNote}
                cancelEditNote={cancelEditNote}
                editingNote={editingNote}
                editNoteContent={editNoteContent}
                setEditNoteContent={setEditNoteContent}
            />
            {/* Event Logs */}
            <Event_logs
                logs={logs} />
        </div>
    )
}

function Detail_video({ video }) {
    return (<>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Video Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p><strong>Title:</strong> {video.snippet.title}</p>
                    <p><strong>Views:</strong> {video.statistics.viewCount}</p>
                    <p><strong>Likes:</strong> {video.statistics.likeCount}</p>
                    <p><strong>Comments:</strong> {video.statistics.commentCount}</p>
                </div>
                <div>
                    <p><strong>Description:</strong></p>
                    <p className="text-sm text-gray-600">{video.snippet.description.substring(0, 200)}...</p>
                </div>
            </div>
        </div>
    </>)
}
function Edit_video({ setEditTitle, setEditDescription, editTitle, editDescription, updateVideo }) {
    return (<>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border rounded h-32"
                />
                <button
                    onClick={updateVideo}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Update Video
                </button>
            </div>
        </div>

    </>)
}
function Add_comment({
    newComment,
    setNewComment,
    addComment
}) {
    return (<>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Comment</h2>
            <div className="flex gap-4">
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 p-2 border rounded h-20"
                />
                <button
                    onClick={addComment}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Comment
                </button>
            </div>
        </div>
    </>)
}
function Note_section({
    notes,
    newNote,
    setNewNote,
    addNote,
    deleteNote,
    updateNote,
    startEditNote,
    cancelEditNote,
    editingNote,
    editNoteContent,
    setEditNoteContent
}) {
    return (<>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Notes</h2>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <textarea
                        placeholder="Add improvement ideas..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="flex-1 p-2 border rounded h-20"
                    />
                    <button
                        onClick={addNote}
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    >
                        Add Note
                    </button>
                </div>
                <div className="space-y-2">
                    {notes.map((note) => (
                        <div key={note._id} className="bg-gray-50 p-3 rounded">
                            {editingNote === note._id ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={editNoteContent}
                                        onChange={(e) => setEditNoteContent(e.target.value)}
                                        className="w-full p-2 border rounded h-20"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateNote(note._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEditNote}
                                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start">
                                    <p className="flex-1">{note.content}</p>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => startEditNote(note)}
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteNote(note._id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}
function Event_logs({
    logs,
}) {
    return (<>
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Event Logs</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.map((log) => (
                    <div key={log._id} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between">
                            <span className="font-medium">{log.eventType}</span>
                            <span className="text-sm text-gray-500">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                        </div>
                        {log.details && Object.keys(log.details).length > 0 && (
                            <p className="text-sm text-gray-600 mt-1">
                                {JSON.stringify(log.details)}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </>)
}
