"use client";

import { useEffect, useState } from "react";

import { GOLANG_API_BASE_URL } from "./config/constants";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${GOLANG_API_BASE_URL}/admin/get-posts`)
      .then(res => res.json())
      .then(json => {
        console.log("API response:", json);
        setPosts(Array.isArray(json) ? json : json?.data || []);
      })
      .catch(err => console.error("API fetch error", err));
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 p-6 md:p-10 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center">Fetched Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No posts found or still loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-lg flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              {post.thumbnailUrl && (
                <img
                  src={post.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-bold mb-1">{post.postTitle}</h2>
                  <p className="text-sm text-gray-400 mb-1">By {post.author}</p>
                  <p className="text-sm text-gray-400 mb-2">Category: {post.category}</p>
                  <div
                    className="text-sm text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: post.postContent.substring(0, 250) + "...",
                    }}
                  />
                </div>

                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                  <span>👁 {post.views}</span>
                  <span>❤️ {post.likes}</span>
                  <span>🔁 {post.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
