export const samplePostData = [
  {
    postId: 12313,
    name: "Evelyn Parker",
    imgUrl:
      "https://images.squarespace-cdn.com/content/v1/58858eefebbd1a30e9955e4f/1595904246262-BLKW3O9CST71546ULMJ3/erin-valkner-photography-new-braunfels-headshot-photographer",
    content: `Hey everyone!

Just wanted to share a quick update on my reading goal for the year. I'm thrilled to report that I've made some great progress! 

So far, I've read 15 out of the 30 books I set out to read this year. 📚✨
I've explored a variety of genres, from gripping thrillers to insightful non-fiction, and it's been an incredible journey. Some of my favorites include "The Silent Patient" by Alex Michaelides and "Educated" by Tara Westover. Each book has broadened my perspective and enriched my understanding of different topics and storytelling techniques.`,
    date: "2 Hours Ago",
  },
  {
    postId: 15387,
    name: "Liam Henderson",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5V3R_RugXoPd5Uq1yjIjPsBm_oo0ZkGuNMA&s",
    content: `As I look back on the past six months, I'm filled with a sense of accomplishment and growth regarding my writing goal. 

At the start of the year, I set out to write at least 500 words every day, aiming to complete my first novel by the end of the year.

This journey has been both challenging and rewarding. I’ve managed to write consistently, reaching the halfway point of my novel with 45,000 words penned so far. Each day, sitting down to write has become a cherished part of my routine. It hasn't always been easy – there were days when the words flowed effortlessly, and others when every sentence felt like a battle. However, pushing through those tougher days has taught me resilience and the importance of discipline in creative endeavors.
One of the most significant breakthroughs was finding my voice as a writer. Initially, I struggled with self-doubt and perfectionism, constantly second-guessing my work. But as I continued to write, I began to trust my instincts and embrace my unique style. This shift has not only made the process more enjoyable but has also improved the quality of my writing.`,
    date: "6 Hours Ago",
  },
  {
    posId: 42482,
    name: "Donald Swan",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nisi unde tempore consequuntur porro soluta consectetur et dicta accusantium eligendi. Obcaecati, hic assumenda alias fugiat odit voluptatibus nesciunt aliquid nihil.",
    date: "1 Day Ago",
  },
];

import Avatar from "./avatar";
import { CommentButton, LikeIconButton, GoToGoalButton } from "./iconButton";

function PostActionBar() {
  return (
    <div className="flex flex-row gap-x-4 border-t pt-2">
      <LikeIconButton />
      <CommentButton />
      <GoToGoalButton />
    </div>
  );
}

function PostProfileHeader({ name, imgUrl, date }) {
  return (
    <div className="flex flex-row items-center gap-x-4">
      <Avatar variant={"large"} src={imgUrl} />
      <div className="leading-tight">
        <div>{name}</div>
        <div className="font-light">{date}</div>
      </div>
    </div>
  );
}

function PostContent({ content }) {
  return (
    <div className="hover:bg-stone-50 py-2">
      <div className="line-clamp-3 hover:cursor-pointer ">{content}</div>
    </div>
  );
}

function Post({ name, content, imgUrl, date }) {
  return (
    <div className="my-4 p-4 rounded-xl bg-white">
      <div className="flex flex-col gap-y-4">
        <PostProfileHeader name={name} imgUrl={imgUrl} date={date} />
        <PostContent content={content} />
        <PostActionBar />
      </div>
    </div>
  );
}

export default function PostList({ posts = [] }) {
  return (
    <div className="pr-4 w-[500px] flex flex-col overflow-y-scroll">
      {posts.map(({ name, content, date, postId, imgUrl }) => (
        <Post
          name={name}
          content={content}
          date={date}
          imgUrl={imgUrl}
          key={postId}
        />
      ))}
    </div>
  );
}
