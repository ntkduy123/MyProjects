import { connect } from 'react-redux'
import { getPostList } from 'appRedux/actions/Blog'
import PostTable from 'components/Blog/PostTable'

const mapStateToProps = ({ blog }) => {
  const { postList, loading } = blog
  return { postList, loading }
}

export default connect(mapStateToProps, { getPostList })(PostTable)
