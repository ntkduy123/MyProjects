import { connect } from 'react-redux'
import { getPost } from 'appRedux/actions/Blog'
import Post from 'components/Blog/Post'

const mapStateToProps = ({ blog }) => {
  const { selectedPost, loading } = blog
  return { selectedPost, loading }
}

export default connect(mapStateToProps, { getPost })(Post)
