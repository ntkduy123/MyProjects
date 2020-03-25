import { connect } from 'react-redux'
import {
  Form
} from 'antd'
import {
  getAllTaskType,
  getAllTaskLabel,
  saveOrUpdateTask
} from 'appRedux/actions/Todo'
import AddTodo from 'components/Todo/AddTodo'

const mapStateToProps = ({ todo }) => {
  const {
    loading,
    taskLabelList,
    taskTypeList
  } = todo
  return {
    loading,
    taskLabelList,
    taskTypeList
  }
}

const WrappedApp = Form.create()(AddTodo)

export default connect(mapStateToProps, {
  getAllTaskType,
  getAllTaskLabel,
  saveOrUpdateTask
})(WrappedApp)
