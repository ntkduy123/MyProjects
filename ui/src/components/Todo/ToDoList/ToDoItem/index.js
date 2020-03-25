import React from 'react'
import { Avatar, Badge, Checkbox } from 'antd'

import labels from 'components/Todo/data/labels'
import users from 'components/Todo/data/users'
import PropTypes from 'prop-types'

const ToDoItem = (({
  task
}) => {
  let user = null
  if (task.user > 0) user = users[task.user - 1]
  return (
    <div className="gx-module-list-item">
      <div
        className="gx-module-list-info"
      >
        <div className="gx-module-todo-content">
          <div className="gx-subject gx-text-muted gx-text-strikethrough">
            {task.title}
          </div>
          <div className="gx-manage-margin">
            {labels.map((label, index) => (task.labels).includes(label.id)
                && <Badge key={label.id} count={label.title} style={{ backgroundColor: label.color }} />)}
          </div>
        </div>
        <div className="gx-module-todo-right">
          {user === null ? <Avatar>U</Avatar>
            : (
              <Avatar
                alt={user.name}
                src={user.thumb}
              />
            )}
        </div>
      </div>
    </div>

  )
})

ToDoItem.propTypes = {
  task: PropTypes.shape().isRequired
}

export default ToDoItem
