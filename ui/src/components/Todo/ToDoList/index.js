import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars'

import PropTypes from 'prop-types'
import ToDoItem from './ToDoItem'

const ToDoList = (({
  toDos, onTodoSelect, onTodoChecked, onMarkAsStart
}) => (
  <div className="gx-module-list">
    <CustomScrollbars className="gx-module-content-scroll">
      {toDos.map((todo, index) => (
        <ToDoItem
          key={todo.title}
          index={index}
          todo={todo}
          onTodoSelect={onTodoSelect}
          onMarkAsStart={onMarkAsStart}
          onTodoChecked={onTodoChecked}
        />
      ))}
    </CustomScrollbars>
  </div>
))

ToDoList.propTypes = {
  onTodoSelect: PropTypes.func.isRequired,
  onTodoChecked: PropTypes.func.isRequired,
  onMarkAsStart: PropTypes.func.isRequired,
  toDos: PropTypes.shape().isRequired
}

export default ToDoList
