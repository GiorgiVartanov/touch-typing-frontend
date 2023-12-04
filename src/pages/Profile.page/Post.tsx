import UserIcon from "../../components/User/UserIcon"

interface Props {
  username: string
  text: string
  comments: string[]
  postDate: string[]
}

const Post = ({ username, text, comments, postDate }: Props) => {
  return (
    <div className="page profile-page">
      <UserIcon username={username} />
      <p>{text}</p>
      <div>
        <div>{comments}</div>
        <div>{postDate}</div>
      </div>
    </div>
  )
}
export default Post
