import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars'

import PropTypes from 'prop-types'
import ToDoItem from './ToDoItem'

const ToDoList = (({
  taskList
}) => (
  <div className="gx-module-list">
    <CustomScrollbars className="gx-module-content-scroll">
      {taskList.map((task, index) => (
        <ToDoItem
          key={task.title}
          index={index}
          todo={task}
        />
      ))}
    </CustomScrollbars>
  </div>
))

ToDoList.propTypes = {
  taskList: PropTypes.shape().isRequired
}

export default ToDoList
