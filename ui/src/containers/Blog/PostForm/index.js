import {
  Form
} from 'antd'
import { connect } from 'react-redux'
import { getPost, getPostCategoryList, saveOrUpdatePost } from 'appRedux/actions/Blog'
import { hideMessage } from 'appRedux/actions/Common'
import PostForm from 'components/Blog/PostForm'

const mapStateToProps = ({ blog, common }) => {
  const { loading, selectedPost, postCategoryList } = blog
  const { showMessage, message } = common
  return {
    loading,
    selectedPost,
    postCategoryList,
    showMessage,
    message
  }
}

const WrappedApp = Form.create()(PostForm)

export default connect(mapStateToProps,
  {
    getPost,
    getPostCategoryList,
    saveOrUpdatePost,
    hideMessage
  })(WrappedApp)
