import React from 'react'

export default function Video_input({
    videoId,
    setVideoId,
    fetchVideo
}) {
    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Load Video</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter YouTube Video ID"
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        onClick={fetchVideo}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Load Video
                    </button>
                </div>
            </div>
        </div>
    )
}
