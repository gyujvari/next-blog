import React, { useState } from 'react';


export default function Blog({posts}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.posts
  .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((post) => selectedCategory === '' || post.categories.includes(selectedCategory))
  .slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
   <div>
      <div className="flex justify-center items-center">
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by title"
              className="px-4 py-2 w-full rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
      </div>
        <div className="mt-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded"
          >
            <option value="">All Categories</option>
            {posts.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="my-4 border p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <img src={post.imageUrl} alt={post.title} className="my-2" />
              <p>{post.excerpt}</p>
              <p className="text-gray-600">Categories: {post.categories.name}</p>
            </div>
          ))
        ) : (
          <p className="mt-4 text-red-500">No matching posts found.</p>
        )}
      </div> 
      <div className="mt-4">
        {Array.from({ length: Math.ceil(currentPosts.length / postsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            } rounded cursor-pointer`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div> 
   </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/hello');
  console.log(res,"Responser,")
  const posts = await res.json();
  console.log(posts,"posts")

  return {
    props: {
       posts,
    },
  };
}
