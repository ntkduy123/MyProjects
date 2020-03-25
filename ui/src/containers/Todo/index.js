import { connect } from 'react-redux'
import {
  getAllTask,
  getAllTaskType,
  getAllTaskLabel,
  getAllTaskStatus
} from 'appRedux/actions/Todo'
import Todo from 'components/Todo'

const mapStateToProps = ({ todo }) => {
  const {
    taskList,
    taskStatusList,
    taskLabelList,
    loading
  } = todo
  return {
    taskList,
    taskStatusList,
    taskLabelList,
    loading
  }
}

export default connect(mapStateToProps, {
  getAllTask,
  getAllTaskType,
  getAllTaskLabel,
  getAllTaskStatus
})(Todo)
