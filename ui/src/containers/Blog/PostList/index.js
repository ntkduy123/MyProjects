import { connect } from 'react-redux'
import { getPostList, getPostCategoryList } from 'appRedux/actions/Blog'
import PostList from 'components/Blog/PostList'

const mapStateToProps = ({ blog }) => {
  const { postList, loading, postCategoryList } = blog
  return { postList, loading, postCategoryList }
}

export default connect(mapStateToProps, { getPostList, getPostCategoryList })(PostList)
