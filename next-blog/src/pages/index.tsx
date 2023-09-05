import React, { useState } from 'react';


export default function Blog({posts}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.posts
  .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((post) => selectedCategory === '' || post.categories.includes(selectedCategory))
  .slice(indexOfFirstPost, indexOfLastPost);
  return (
   <div>
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
