import { Inter } from 'next/font/google'
import React, { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Blog({posts}) {
  return (
   <div>
    {posts}
   </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/blog');
  console.log(res,"Responser,")
  const posts = await res.json();
  console.log(posts,"posts")

  return {
    props: {
       posts,
    },
  };
}
